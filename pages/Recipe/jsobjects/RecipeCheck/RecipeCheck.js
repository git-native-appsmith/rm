export default {
	CreateRecipe: async () =>{
		let errorMsg=''
		let recipeSetNo= appsmith.store.RecipeSetNumber;
		let machineGrp= appsmith.store.ResourceGroupDropDown;
		let recipeClass = appsmith.store.RecipeClassDropDown;
		let recipetype= appsmith.store.RecipeTypeDropDownName;
		let modifNo = appsmith.store.modificNo;
		let gradeIndependent;

		if(recipeSetNo== undefined || recipeSetNo ==''){
			errorMsg='Please select recipeset.'
		}
		if(machineGrp== undefined || machineGrp =='' || ResourceSelect.selectedOptionLabel == "Select"){
			if(errorMsg==''){
				errorMsg='Please select machine group.'
			}else{
				errorMsg=errorMsg +'<br>' + 'Please select machine group.'
			}
		}
		if(recipeClass== undefined || recipeClass =='' || ClassSelect.selectedOptionLabel == "Select"){
			if(errorMsg==''){
				errorMsg='Please select recipe class.'
			}else{
				errorMsg=errorMsg + '<br>' +'Please select recipe class.'
			}
		}
		if(recipetype== undefined || recipetype =='' || RecipeTypeSelect.selectedOptionLabel == "Select"){
			if(errorMsg==''){
				errorMsg='Please select recipe type.'
			}else{
				errorMsg=errorMsg + '<br>' +'Please select recipe type.'
			}
		}
		if(modifNo== undefined || modifNo ==''){
			if(errorMsg==''){
				errorMsg='Please select modification number.'
			}else{
				errorMsg=errorMsg + '<br>' +'Please select modification number.'
			}
		}
		if(errorMsg==''){
			if(ClassSelect.selectedOptionValue == 'MS') {
				gradeIndependent = await GetGradeIndependent.run();
			}
			if(recipeSetNo != null){
				StandardRecipeSetHistory.run((result)=>{
					RecipeCheck.recheckRecipeSet(result,gradeIndependent);
				},() => {StandardRecipeSetHistory.run((result)=>{
					RecipeCheck.recheckRecipeSet(result,gradeIndependent);
				})});
			}else{
				if(recipeClass== "CS"){
					navigateTo('CreateRecipeCS',{"RecipeAction":"Create"});
				}else if(recipeClass== "MS" || recipeClass== "SU"){
					navigateTo('CreateRecipeMS_SU',{"RecipeAction":"Create"});
				}else if(recipeClass== "RM" || recipeClass== "CO" || recipeClass== "ST"){
					navigateTo('CreateRecipeRM',{"RecipeAction":"Create"});
				}else if(recipeClass== "PD"){
					navigateTo('CreateRecipePD',{"RecipeAction":"Create"});
				}else if(recipeClass == "BL" ||recipeClass == "WS" ||recipeClass == "DR"){
					navigateTo('CreateRecipeBL_WS',{"RecipeAction":"Create"},'SAME_WINDOW');
				}else if(recipeClass == "WP" ){
					navigateTo('CreateRecipeWP',{"RecipeAction":"Create"},'SAME_WINDOW');
				}else if(recipeClass == "PU" ){
					navigateTo('CreateRecipePU',{"RecipeAction":"Create"},'SAME_WINDOW');
				}else{
					showAlert('Recipe class not implemented','error');
				}
			}
		}else{
			storeValue('RecipeErrMsg',errorMsg,true) 
			showModal('msgModal');
		}

	},
	EditRecipe:async (rowData) =>{
		debugger
		let gradeIndependent;
		let errorMsg='';
		let recipeSetNo= appsmith.store.RecipeSetNumber;
		if(recipeSetNo== undefined || recipeSetNo ==''){
			errorMsg='Please select recipeset.'
		}
		//let standardRecipeHistory=0;
		//standardRecipeHistory = await StandardRecipeSetHistory.run();
		//await IsDifferentModifNo.run( async (result) => { 
		//if(result == false) {
		//await storeValue('RecipeErrMsg','Planned and standard recipe should use different modification number.',true);
		//showModal('msgModal');
		//return;
		//}
		//},() => showAlert('Failed to check IsDifferentModifNo.') );
		//if(errorMsg=='' && IsDifferentModifNo.data){
		if(errorMsg=='' && appsmith.store.isDiffModifNo) {
			if(recipeSetNo != null){
				//if(RecipeSetTable.selectedRow.STATUS == "H" || standardRecipeHistory==1) {
				if(RecipeSetTable.selectedRow.STATUS == "H" || appsmith.store.standardRecipeHistory) {
					storeValue('RecipeErrMsg','Recipe updation not allowed in historic Recipeset.',true);
					showModal('msgModal');
					//showAlert('Recipe Updation Not Allowed In Historic Recipeset.','error');			
				}else{
					const modifNo = ModificationNumberSearch.text;
					if(modifNo == "" || modifNo.length == 0) {
						storeValue('RecipeErrMsg','Please select modification number.',true);
						showModal('msgModal');
					} else {

						storeValue('showErrorMessage',false,false);
						// First validate the Modific No then call API
						await  storeValue("recipeNumberView",rowData.RECIPE_NUMBER,true);
						await storeValue("recipeStatus",rowData.RECIPE_STATUS,true);
						await storeValue("recipeClassCode",rowData.RECIPE_CLASS_CODE,true);
						await storeValue("recipeMachineGroup",rowData.MACHINE_GROUP,true);

						const fileteredRecpData = await GetFilteredRecipeRow.run(); 
						let dryContentSpecWeightLimitField = { "DC_IN_VAL":"","DC_IN_MIN":0,"DC_IN_MAX":0,"DC_CALC_MIN":0,"DC_CALC_MAX":0,"SW_IN_VAL":"","SW_IN_MIN":0,"SW_IN_MAX":0,"SW_CALC_MIN":0,"SW_CALC_MAX":0 };
						dryContentSpecWeightLimitField.DC_IN_VAL = fileteredRecpData.DC_IN_VAL;
						dryContentSpecWeightLimitField.DC_IN_MIN = Number(fileteredRecpData.DC_IN_MIN);
						dryContentSpecWeightLimitField.DC_IN_MAX = Number(fileteredRecpData.DC_IN_MAX);
						dryContentSpecWeightLimitField.DC_CALC_MIN = Number(fileteredRecpData.DC_CALC_MIN);
						dryContentSpecWeightLimitField.DC_CALC_MAX = Number(fileteredRecpData.DC_CALC_MAX);
						dryContentSpecWeightLimitField.SW_IN_VAL = fileteredRecpData.SW_IN_VAL;
						dryContentSpecWeightLimitField.SW_IN_MIN = Number(fileteredRecpData.SW_IN_MIN);
						dryContentSpecWeightLimitField.SW_IN_MAX = Number(fileteredRecpData.SW_IN_MAX);
						dryContentSpecWeightLimitField.SW_CALC_MIN = Number(fileteredRecpData.SW_CALC_MIN);
						dryContentSpecWeightLimitField.SW_CALC_MAX = Number(fileteredRecpData.SW_CALC_MAX);

						await storeValue("Calc_dryContentSpecWeightLimitField",dryContentSpecWeightLimitField,true);
						let calculatedField = {};
						calculatedField.sv_mainMtrlBoneDry=Number(fileteredRecpData.RECIPE_SIZE,true);
						calculatedField.sv_spwt=Number(fileteredRecpData.SPECIFIC_WEIGHT,true);	
						calculatedField.sv_gbt=Number(fileteredRecpData.BONEDRY_WGT_PER_VOLUME,true);
						calculatedField.sv_per=Number(fileteredRecpData.RECIPE_SIZE_IN_PER,true);
						calculatedField.sv_totalWeightWet=Number(fileteredRecpData.TOTAL_WEIGHT_WET,true);
						calculatedField.sv_totalVolume=Number(fileteredRecpData.BATCH_SIZE,true);	
						calculatedField.sv_filler=Number(fileteredRecpData.FILLER_CONTENT,true);
						calculatedField.sv_tdc=Number(fileteredRecpData.DRY_CONTENT_IN_PER,true);	
						calculatedField.sv_dc=Number(fileteredRecpData.DRY_CONTENT,true);	
						storeValue("calculatedField",calculatedField,true);
						await storeValue("RecipeClassDropDown",fileteredRecpData.RECIPE_CLASS,true);
						//storeValue("RecipeClassDropDownName",CreateEditCS.getRecipeClass(),true);
						await storeValue("RecipeTypeDropDown",fileteredRecpData.RECIPE_TYPE_NUMBER,true); 
						await storeValue("RecipeTypeDropDownName",fileteredRecpData.RECIPETYPE_NAME,true);
						await storeValue("ResourceGroupDropDown",fileteredRecpData.MACHINE_GROUP,true);
						await storeValue("ResourceGroupDropDownName",fileteredRecpData.MACHINE_GROUP + '-' + fileteredRecpData.MACHINE_GROUP_NAME_SHORT,true);
						await storeValue("Remark",fileteredRecpData.REMARKS,true);
						const MaxVolume= Number(fileteredRecpData.MAX_VOLUME)==0?'':Number(fileteredRecpData.MAX_VOLUME).toFixed();
						await storeValue("MaxVolume",MaxVolume,true);	
						await storeValue("TRANSFER_OUTPUT_MAT",fileteredRecpData.TRANSFER_OUTPUT_MAT,true);	
						await storeValue("gradeIndependent",fileteredRecpData.RECIPE_TYPE_GRADE_INDEPENDENT,true);
						await storeValue("SIZE_UNIT1",fileteredRecpData.SIZE_UNIT1,true);
						await storeValue("SIZE_UNIT2",fileteredRecpData.SIZE_UNIT2,true);
						if(fileteredRecpData.RECIPE_CLASS== "PU"){
							await storeValue("workplace",fileteredRecpData.STATION_CODE,true);
						}
						if(fileteredRecpData.RECIPE_CLASS=='ST' || fileteredRecpData.RECIPE_CLASS== "PU"){
							await storeValue("InterMaterial",fileteredRecpData.PRODUCT_CODE,true);
							await storeValue("InterMaterialName",fileteredRecpData.PRODUCT_NAME_SHORT,true);
						}if(fileteredRecpData.RECIPE_CLASS=='RM'|| fileteredRecpData.RECIPE_CLASS=='CO' || fileteredRecpData.RECIPE_CLASS=='PD' || fileteredRecpData.RECIPE_CLASS == 'WP'){
							await storeValue("InterMaterial",fileteredRecpData.INTER_MAT_CODE,true);
							await storeValue("InterMaterialName",fileteredRecpData.MATERIAL_NAME_SHORT,true);
						}
						if(fileteredRecpData.RECIPE_CLASS=='CS'|| fileteredRecpData.RECIPE_CLASS== "MS" || fileteredRecpData.RECIPE_CLASS== "SU" || fileteredRecpData.RECIPE_CLASS == 'BL' || fileteredRecpData.RECIPE_CLASS == 'WS' || fileteredRecpData.RECIPE_CLASS == 'DR' ){
							await storeValue("ProductCode",fileteredRecpData.PRODUCT_CODE,true);
							await storeValue("ProductName",fileteredRecpData.PRODUCT_NAME_SHORT,true);
						}
						/* */



						if(rowData.RECIPE_CLASS_CODE=='CS'){
							navigateTo('CreateRecipeCS', {"RecipeAction":"Edit"},'SAME_WINDOW');
						}else if(rowData.RECIPE_CLASS_CODE== "MS" || rowData.RECIPE_CLASS_CODE== "SU"){
							navigateTo('CreateRecipeMS_SU',{"RecipeAction":"Edit"});
						}else if(rowData.RECIPE_CLASS_CODE== "RM" || rowData.RECIPE_CLASS_CODE== "CO" || rowData.RECIPE_CLASS_CODE== "ST"){
							navigateTo('CreateRecipeRM',{"RecipeAction":"Edit"},'SAME_WINDOW');
						}else if(rowData.RECIPE_CLASS_CODE== "PD"){
							navigateTo('CreateRecipePD',{"RecipeAction":"Edit"},'SAME_WINDOW');
						}else if(rowData.RECIPE_CLASS_CODE== "BL" || rowData.RECIPE_CLASS_CODE== "WS" || rowData.RECIPE_CLASS_CODE== "DR") {
							navigateTo('CreateRecipeBL_WS',{"RecipeAction":"Edit"},'SAME_WINDOW');
						}else if(rowData.RECIPE_CLASS_CODE == "WP" ){
							navigateTo('CreateRecipeWP',{"RecipeAction":"Edit"},'SAME_WINDOW');
						}else if(rowData.RECIPE_CLASS_CODE == "PU" ){
							navigateTo('CreateRecipePU',{"RecipeAction":"Edit"},'SAME_WINDOW');
						}else{
							navigateTo('CreateRecipe', {"RecipeAction":"Edit"},'SAME_WINDOW');
						}
					}
				}
			}
		}else{

			showModal('msgModal');
		}
	},
	DeleteRecipe:() =>{
		StandardRecipeSetHistory.run((result)=>{
			if(String(result)!='0'){
				storeValue('RecipeErrMsg','Recipe deletion not allowed in historic Recipeset.',true);
				showModal('msgModal');
				//showAlert('Recipe Deletion Not Allowed In Historic Recipeset.','error');			
			}else{
				RecipeUtil.DeleteRecipeData();
			}
		});
	},
	recheckRecipeSet:async (result,gradeIndependent)=>{
		await IsDifferentModifNo.run( async (result) => { 
			if(result == false) {
				await storeValue('RecipeErrMsg','Planned and standard recipe should use different modification number.',true);
			}
		},() => showAlert('Failed to check IsDifferentModifNo.') );
		if(String(result)!='0'){
			storeValue('RecipeErrMsg','New Recipe can not be added in historic Recipeset.',true);
			showModal('msgModal');
			//showAlert('New Recipe Can Not Be Added In Historic Recipeset.','error');
		} else if(IsDifferentModifNo.data == false) {
			storeValue('RecipeErrMsg','Planned and standard recipe should use different modification number.',true);
			showModal('msgModal');
		} else {
			if(appsmith.store.RecipeClassDropDown== "CS"){
				navigateTo('CreateRecipeCS',{"RecipeAction":"Create"});
			}else if(appsmith.store.RecipeClassDropDown== "MS" || appsmith.store.RecipeClassDropDown== "SU"){
				if(gradeIndependent) {
					await storeValue("gradeIndependent",gradeIndependent,true);
				}else {
					await storeValue("gradeIndependent",0,true);
				}
				navigateTo('CreateRecipeMS_SU',{"RecipeAction":"Create"});
			}else if(appsmith.store.RecipeClassDropDown== "RM" || appsmith.store.RecipeClassDropDown== "CO" || appsmith.store.RecipeClassDropDown== "ST"){
				navigateTo('CreateRecipeRM',{"RecipeAction":"Create"});
			}else if(appsmith.store.RecipeClassDropDown== "PD"){
				navigateTo('CreateRecipePD',{"RecipeAction":"Create"});
			}else if(appsmith.store.RecipeClassDropDown == "BL" || appsmith.store.RecipeClassDropDown == "WS" || appsmith.store.RecipeClassDropDown == "DR"){
				navigateTo('CreateRecipeBL_WS',{"RecipeAction":"Create"},'SAME_WINDOW');
			}else if(appsmith.store.RecipeClassDropDown == "WP" ){
				navigateTo('CreateRecipeWP',{"RecipeAction":"Create"},'SAME_WINDOW');
			}else if(appsmith.store.RecipeClassDropDown == "PU" ){
				navigateTo('CreateRecipePU',{"RecipeAction":"Create"},'SAME_WINDOW');
			}else{
				showAlert('Recipe class not implemented','error');
			}
		}
	}
}