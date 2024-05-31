export default {
	UpdateRecipeSet: async () => {
		const modifNo = ModificationNumberSearch.text;
		if(modifNo.length == 0 || modifNo == "") {
			storeValue('errMsgStr','Please input modification number.',true);			
			showModal('msgModal');
		}else {
			// First validate the Modific No then call API
			await IsModificNoExist.run((result) => {
				if(String(result) != ModificationNumberSearch.text.trim()){
					showModal('ModificationNumberAlert');
				} else {
					UpdateRecipeSet.run( () => {
						closeModal('UpdateModal');
						GetFilteredRecipeSet.run();
						showAlert('RecipeSet Updated successfully');
					},() => showAlert('Failed to Update RecipeSet'));

				}
			},() => showAlert('Failed to Validate Modification number'));
		}
	},
	UpdateApiInput: () => {
		try {
			let selectedrow = Tabulator1.actionRow;
			//let temp = RecipeSetUtil.convertDateToISO(selectedrow.BASED_ON_DATE);
			let temp ;
			if(RecipeSetAddupdate.isIsoDate(selectedrow.BASED_ON_DATE)){
				temp = selectedrow.BASED_ON_DATE;
			}else{
				temp = RecipeSetUtil.convertDateToISO(selectedrow.BASED_ON_DATE);
			}
			if(temp != new Date('1970-01-01').toISOString()) {
				selectedrow.BASED_ON_DATE = temp;
			}
			//let temp1 =  RecipeSetCopy.convertDateToISO(selectedrow.START_DATE);
			//let temp1 =  selectedrow.START_DATE;
			let temp1 ;
			if(RecipeSetAddupdate.isIsoDate(selectedrow.START_DATE)){
				temp1 = selectedrow.START_DATE;
			}else{
				temp1 =  RecipeSetReset.convertDateToISO(selectedrow.START_DATE);
				if(temp1 != new Date('1969-01-01').toISOString()) {
					selectedrow.START_DATE = temp1;
				}
			}
			/*if(temp1==null){
			selectedrow.START_DATE = null;
		}else{
			if(selectedrow.START_DATE.indexOf('T') <= 0 && selectedrow.START_DATE.indexOf('Z') <= 0) {
				if(selectedrow.START_DATE.indexOf('-') > 0){
					temp1 =  RecipeSetCopy.convertDateToISO(selectedrow.START_DATE);
				}else{
					temp1 =  RecipeSetUtil.convertDateToISO(selectedrow.START_DATE);
				}
				if(temp1 != new Date('1969-01-01').toISOString()) {
					selectedrow.START_DATE = temp1;
				}
			}
		}*/
			//let temp2 =  RecipeSetCopy.convertDateToISO(selectedrow.END_DATE);
			//let temp2 =  selectedrow.END_DATE;
			let temp2 ;
			if(RecipeSetAddupdate.isIsoDate(selectedrow.END_DATE)){
				temp2 = selectedrow.END_DATE;
			}else{
				temp2 =  RecipeSetReset.convertDateToISO(selectedrow.END_DATE);
				if(temp2 != new Date('1969-01-01').toISOString()) {
					selectedrow.END_DATE = temp2;
				}
			}
			/*if(temp2==null){
			selectedrow.END_DATE = null;
		}else{
			if(selectedrow.END_DATE.indexOf('T') <= 0 && selectedrow.END_DATE.indexOf('Z') <= 0) {
				if(selectedrow.END_DATE.indexOf('-') > 0){
					temp2 =  RecipeSetCopy.convertDateToISO(selectedrow.END_DATE);
				}else{
					temp2 =  RecipeSetUtil.convertDateToISO(selectedrow.END_DATE);
				}
				if(temp2 != new Date('1970-01-01').toISOString()) {
					selectedrow.END_DATE = temp2;
				}
			}
		}*/

			if(selectedrow.START_DATE == ""){
				if(selectedrow.CATEGORY=="Standard"){
					selectedrow.START_DATE = new Date().toISOString();
				}else{
					selectedrow.START_DATE = null
				}
			}
			if(selectedrow.END_DATE == ""){
				selectedrow.END_DATE = null;
			}
			selectedrow.BASED_ON_RECIPE_SET = Number(selectedrow.BASED_ON_RECIPE_SET);

			selectedrow.MODIF_NUMBER = Number(appsmith.store.modificNo.toString());
			if(selectedrow.BASED_ON_DATE == ""){
				selectedrow.BASED_ON_DATE = null;
			}
			selectedrow.UPTIME = null;
			if(selectedrow.Recipe_UPTIME == ""){
				selectedrow.Recipe_UPTIME = null;
			}
			if(selectedrow.Recipe_CRTIME == ""){
				selectedrow.Recipe_CRTIME = null;
			}
			if(selectedrow.MODIF_NUMBER_CREATED_DATE == ""){
				selectedrow.MODIF_NUMBER_CREATED_DATE = null;
			}
			if(selectedrow.VERSION_NUMBER==''||selectedrow.VERSION_NUMBER=='0'){
				selectedrow.VERSION_NUMBER=null;
			}
			//x.MODIF_NUMBER = Number(ModificationNumberSearch.text);
			selectedrow.UPUSER="";
			//console.log(JSON.stringify(selectedrow));
			return selectedrow;
		} catch (e) {
			var msg = e.message;
			console.log(msg + "UpdateApiInput");
		}
	},
	callupdateModal: () =>{
		var recipeSetCtg=Tabulator1.actionRow.CATEGORY; 
		var recipeSetStatus=Tabulator1.actionRow.STATUS;
		if(recipeSetCtg=="Standard"){
			closeModal('UpdateModal');
			if(recipeSetStatus=="History"){
				storeValue('errMsgStr','Historic Recipeset can not be updated.',true);
				showModal('msgModal');
			} else {
				storeValue('errMsgStr','Standard Recipeset can not be updated.',true);
				showModal('msgModal');
			}
		}
		else{
			StandardRecipeSetHistory.run((result)=>{
				if(String(result)!='0'){
					storeValue('errMsgStr','Historic Recipeset can not be updated.',true);
					showModal('msgModal');
				}else{
					UniqueRecipeSetName.run((result)=>{
						if(String(result) =='1'){
							storeValue('errMsgStr','Recipeset name already exist.',true);	
							showModal('msgModal');
						}else{
							showModal('UpdateModal');
						}
					});
				}
			});
		}
	}
}