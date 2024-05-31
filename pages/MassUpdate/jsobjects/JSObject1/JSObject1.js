export default {

	PageLoadRecipe: async  () => {
		debugger;
		//use async-await or promises
		//storeValue("recipeNumberView",null,false);
		//storeValue("recipeStatus",null,false);
		//storeValue("ResourceDropDowmSame1",undefined);
		//storeValue("MasterRecipeNo",undefined,true);
		//storeValue("MasterRecipeCellColor",undefined,true);
		//storeValue("RecipesByProductFilter",[],true);
		if(appsmith.URL.queryParams.RedirectFromEditRecipe){
			//means Active recipe,call product filter search
			storeValue("EditFromProductFilter",false,true);
			await EditRecipesByProductFilter.run(() => { showAlert('Recipe load successfully','success');}, () => showAlert('Recipe load failed','error'));
			if(EditRecipesByProductFilter.data == undefined){
				await EditRecipesByProductFilter.run();
			}
			var masterRecipeNo = appsmith.store.MasterRecipeNo;
			let masterRecipes = EditRecipesByProductFilter.data.filter(x => x.RECIPE_NUMBER == masterRecipeNo);
			for(var i=0;i<  masterRecipes.length;i++) {
				masterRecipes[i].MASTER_RECIPE = true;
			}
			await storeValue("RecipesByProductFilter",EditRecipesByProductFilter.data,true);
		} else if(appsmith.store.ProductGroupFilterDropDown != undefined && appsmith.store.ProductGroupFilterDropDown != "" && ProductFilterSelect.selectedOptionValue != "" ) {
			storeValue("EditFromProductFilter",false,true);
			await EditRecipesByProductFilter.run();
			if(EditRecipesByProductFilter.data == undefined){
				console.log("in-Data");
				console.log(EditRecipesByProductFilter.data);
				await EditRecipesByProductFilter.run();
			}
			var masterRecipeNo1 = appsmith.store.MasterRecipeNo;
			if(masterRecipeNo1 != undefined && EditRecipesByProductFilter.data && EditRecipesByProductFilter.data.length > 0) {
				let masterRecipes = EditRecipesByProductFilter.data.filter(x => x.RECIPE_NUMBER == masterRecipeNo1);
				for(var j=0;j<  masterRecipes.length;j++) {
					masterRecipes[j].MASTER_RECIPE = true;
				}
			}
			console.log("Data");
			console.log(EditRecipesByProductFilter.data);
			await storeValue("RecipesByProductFilter",EditRecipesByProductFilter.data,true);
		}
		GetAllMachineGroups.run();
		if(appsmith.store.ProductGroupFilterDropDown == "" || ProductFilterSelect.selectedOptionValue == "" ) {
			if(ResourceSelect.selectedOptionValue != null && appsmith.store.RecipeClassDropDown != null && RecipeTypeSelect.selectedOptionValue != null) {
				GetFilteredRecipe.run();
			}
			if(appsmith.store.ResourceGroupDropDown != null && appsmith.store.RecipeClassDropDown != null && appsmith.store.RecipeTypeDropDown != null) {
				GetFilteredRecipe.run();
			}
		}
	},
	RedirectToCreateRecipePage1: () => {

		const modifNo = ModificationNumberSearch.text;
		if(modifNo.length == 0 || modifNo == "") {
			modificNoValidationmsg.isVisible = true;
			storeValue('showErrorMessage',true,false);
		} else {
			modificNoValidationmsg.isVisible = false;
			storeValue('showErrorMessage',false,false);
			// First validate the Modific No then call API
			IsModificNoExist.run((result) => {
				if(String(result) != ModificationNumberSearch.text.trim()){
					showModal('ModificationNumberAlert');
				} else {
					storeValue("recipeNumberView",RecipeTable.selectedRow.RECIPE_NUMBER,true);
					storeValue("recipeStatus",RecipeTable.selectedRow.RECIPE_STATUS,true);
					storeValue("recipeClassCode",RecipeTable.selectedRow.RECIPE_CLASS_CODE,true);
					storeValue("recipeMachineGroup",RecipeTable.selectedRow.MACHINE_GROUP,true);
					navigateTo('CreateRecipe', {"RecipeAction":"Edit"},'SAME_WINDOW');
				}
			},
													 () => showAlert('Failed to Validate Modification number'));
		}
	},
	CreateRecipeButtonOnClick: () => {
		storeValue('ResourceGroupDropDown',ResourceSelect.selectedOptionValue,true);
		storeValue('RecipeClassDropDown',ClassSelect.selectedOptionValue,true);
		storeValue('RecipeTypeDropDown',RecipeTypeSelect.selectedOptionValue,true);
		storeValue('recipeNumberView',0,true);
		navigateTo('CreateRecipe',{"RecipeAction":"Create"});
	},
	DefaultValueClassDropDown: () => {
		if(ClassSelect.selectedOptionValue == null) {
			return appsmith.store.RecipeClassDropDown;
		} else {
			return ClassSelect.selectedOptionValue;
		}
	},
	RedirectToRecipeViewPage1: async() => {
		await JSObject1.viewPage();
	},
	viewPage: () => {
		storeValue("recipeNumberView",RecipeTable.selectedRow.RECIPE_NUMBER,true);
		storeValue("recipeClassCode",RecipeTable.selectedRow.RECIPE_CLASS_CODE,true);
		storeValue("recipeMachineGroup",RecipeTable.selectedRow.MACHINE_GROUP,true);
		navigateTo('ViewRecipe', {},'SAME_WINDOW');
	},
	SearchButtonClick2: async () => {
		storeValue("MasterRecipeNo",undefined,true);
		storeValue("MasterRecipeCellColor",undefined,true);
		if(ProductFilterSelect.selectedOptionValue == "") {
			GetFilteredRecipe.run(() => showAlert('Recipe load successfully','success'), () => showAlert('Recipe load failed','error'));
		} else {
			await GetRecipeByProductFilter.run(() => { showAlert('Recipe load successfully','success');}, () => showAlert('Recipe load failed','error'));
			await storeValue("RecipesByProductFilter",GetRecipeByProductFilter.data,true);
		}
	},
	SetMasterRecipe3:() => {
		let masterRecipe = RecipeByProductFilter.triggeredRow.RECIPE_NUMBER;
		storeValue("MasterRecipeNo",masterRecipe,true);
		storeValue("MasterRecipeCellColor","#CCF0FC",true);//#CCF0FC
		let recipeData = appsmith.store.RecipesByProductFilter;
		let masterRecipes = recipeData.filter(x => x.MASTER_RECIPE == true);
		for(var i=0;i<  masterRecipes.length;i++) {
			masterRecipes[i].MASTER_RECIPE = false;
		}
		recipeData.filter(x => x.RECIPE_NUMBER == masterRecipe)[0].MASTER_RECIPE = true;
		storeValue("RecipesByProductFilter",recipeData,true);
	},
	UndoMasterRecipe1:() => {
		storeValue("MasterRecipeNo",undefined,true);
		storeValue("MasterRecipeCellColor",undefined,true);
	},
	NextButtonClick:async () => {
		var masterRecipeData = appsmith.store.RecipesByProductFilter.filter(x => x.RECIPE_NUMBER == appsmith.store.MasterRecipeNo);
		var modifNo = ModificationNumberSearch.text;
		if(modifNo==''){
			storeValue('MassUpdateErrMsg','Select modification number.',true);
			showModal('msgModal');
		}else if(appsmith.store.MasterRecipeNo == "" || appsmith.store.MasterRecipeNo == undefined) {
			storeValue('MassUpdateErrMsg','Please set a master recipe.',true);
			showModal('msgModal');
		}else if (masterRecipeData[0].IS_VALID == 1){
			storeValue('MassUpdateErrMsg','Please select valid recipe as master recipe.',true);
			showModal('msgModal');
		}else{
			var recipeDatawithStatusN = appsmith.store.RecipesByProductFilter.filter(x => x.RECIPE_STATUS == 'N' && x.RECIPE_NUMBER != appsmith.store.MasterRecipeNo);
			let error = 0;
			for(var i=0;i< recipeDatawithStatusN.length;i++) {
				if(recipeDatawithStatusN[i].MODIF_NUMBER != modifNo){
					error = 1;
					break;
				}
			}
			if(error == 1) {
				storeValue('MassUpdateErrMsg','All Child Recipes with Status N should have the same modification number as the selected modif number.',true);
				showModal('msgModal');
			} else{
				let isDiffModifNo = await IsDifferentModifNo.run( (result) => { 
					if(result == false) {
						storeValue('MassUpdateErrMsg','Planned and standard recipe should use different modification number.',true);
					}
				},() => showAlert('Failed to check IsDifferentModifNo.') );
				if(IsDifferentModifNo.data){
					navigateTo('Copy From Master',{"RecipeAction":"Create"});
				} else {
					showModal('msgModal');
				}
			}
		}
	},
	EditMasterRecipe:async() => {
		var modifNo = ModificationNumberSearch.text;
		if(modifNo==''){
			storeValue('MassUpdateErrMsg','Select modification number.',true);
			showModal('msgModal');
		}else {
			let isDiffModifNo = await IsDifferentModifNo.run( (result) => { 
				if(result == false) {
					storeValue('MassUpdateErrMsg','Planned and standard recipe should use different modification number.',true);
				}
			},() => showAlert('Failed to check IsDifferentModifNo.') );
			if(IsDifferentModifNo.data){
				let triggerRow = RecipeByProductFilter.triggeredRow;
				await storeValue("recipeNumberView",triggerRow.RECIPE_NUMBER,true);
				await storeValue("recipeStatus",triggerRow.RECIPE_STATUS,true);
				await storeValue("recipeClassCode",triggerRow.RECIPE_CLASS_CODE,true);
				await storeValue("recipeMachineGroup",triggerRow.MACHINE_GROUP,true);
				await storeValue("EditFromProductFilter",true,true);

				const fileteredRecpData = await GetFilteredRecipeView.run();
				let dryContentSpecWeightLimitField ={"DC_IN_VAL":"","DC_IN_MIN":0,"DC_IN_MAX":0,"DC_CALC_MIN":0,"DC_CALC_MAX":0,"SW_IN_VAL":"","SW_IN_MIN":0,"SW_IN_MAX":0,"SW_CALC_MIN":0,"SW_CALC_MAX":0 };
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
				if(triggerRow.RECIPE_CLASS_CODE=='CS'){
					navigateTo('CreateRecipeCS', {"RecipeAction":"Edit"},'SAME_WINDOW');
				}else if(triggerRow.RECIPE_CLASS_CODE== "MS" || triggerRow.RECIPE_CLASS_CODE == "SU"){
					navigateTo('CreateRecipeMS_SU',{"RecipeAction":"Edit"});
				}else if(triggerRow.RECIPE_CLASS_CODE== "ST"){
					navigateTo('CreateRecipeRM',{"RecipeAction":"Edit"},'SAME_WINDOW');
				}else if(triggerRow.RECIPE_CLASS_CODE== "BL" ||triggerRow.RECIPE_CLASS_CODE== "WS" || triggerRow.RECIPE_CLASS_CODE== "DR") {
					navigateTo('CreateRecipeBL_WS',{"RecipeAction":"Edit"},'SAME_WINDOW');
				}else if(triggerRow.RECIPE_CLASS_CODE == "PU" ){
					navigateTo('CreateRecipePU',{"RecipeAction":"Edit"},'SAME_WINDOW');
				}else{
					//navigateTo('CreateRecipe', {"RecipeAction":"Edit"},'SAME_WINDOW');
				}

			} else {
				showModal('msgModal');
			}
		}
	},
	DisableEditRecipeMenu:(currentRow) => {
		if(currentRow.MASTER_RECIPE) {
			if(currentRow.RECIPE_STATUS == "N" && (Number(currentRow.MODIF_NUMBER) == Number(appsmith.store.modificNo))) {
				return false;
			}else if(currentRow.RECIPE_STATUS == "A"){
				return false;
			} else {
				return true;
			}
		} else {
			return true;//disable
		}

	}
}