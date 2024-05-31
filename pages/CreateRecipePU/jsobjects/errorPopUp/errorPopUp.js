export default {
	showErrorModal: async () => {
		
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		var validationMsg = errorPopUp.OnSaveClickValidation();
		if(validationMsg != ""){
			storeValue('errorFlag',2,true);
			storeValue('errMsgStr',validationMsg,true);
			showModal('msgModal');
		} else {
			let errorFlag=0;
			let errMsg='';
			storeValue('errorFlag',errorFlag,true);
			storeValue('errMsgStr',errMsg,true);
			if(errMsg==''){
				errorPopUp.showErrorModalNew();
			}else{
				showModal('msgModal');
			}
		}
	},
	showErrorModalNew: async () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		let errMsg='';
		storeValue('errMsgStr',errMsg,true);
		storeValue('errorFlag',0,true)
		if(errMsg==''){
			CreateEditCS.SaveRecipe();
			closeModal('msgModal');
		}else{
			showModal('msgModal');
		}
	},
	callSave: ()=>{
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		if(appsmith.store.errorFlag1==1){
			storeValue('errorFlag1',0,true);
			errorPopUp.showErrorModal()
		}else{
			if(appsmith.store.errorFlag==1){
				errorPopUp.showErrorModalNew();
			}else{
				CreateEditCS.SaveRecipe();
				closeModal('msgModal');
			}
		}

	},
	OnSaveClickValidation:() => {
		var validationMsg = "";
		var count = 1;
		if(appsmith.store.RecipeClassDropDown=="WP") {
			if(isNaN(Number(appsmith.store.calculatedField.sv_mainMtrlBoneDry)) || Number(appsmith.store.calculatedField.sv_mainMtrlBoneDry) < 0) {
				validationMsg = validationMsg + count +".Main Material Should be non negative number. ";
				count++;
			}
		}
		return validationMsg;
	},
	showErrorTgt:()=>{
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		let errorFlag=0;
		let errMsg='';
		
		
		if(appsmith.store.InterMaterial==''){
			errorFlag=2;
			errMsg='Please input product code.';
			storeValue('errorFlag',errorFlag,true);
			storeValue('errMsgStr',errMsg,true);
			showModal('msgModal');
		}else {
			if(appsmith.store.workplace== ''){
				storeValue('errMsgStr','Select workplace first!.',true);
				storeValue('errorFlag',2,true) 
				showModal('msgModal');
				return;
			}
			storeValue('errorFlag',errorFlag,true);
			storeValue('errorFlag1',errorFlag,true);
			storeValue('errMsgStr',errMsg,true);
			if(errMsg==''){
				errorPopUp.showErrorModal();
			}else{
				showModal('msgModal');
			}
		}
	}
}