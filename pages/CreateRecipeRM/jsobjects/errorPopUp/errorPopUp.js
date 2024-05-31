export default {
	showErrorModal: async () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		var validationMsg = errorPopUp.OnSaveClickValidation();
		if(validationMsg != ""){
			storeValue('CreateRecipeErrMsg',validationMsg,true);
			showModal('msgModal');
		} else {
		let mPer = Number(appsmith.store.calculatedField.sv_per);
		let errorFlag=0;
		let errMsg='';
		if(mPer!=''){
			if(mPer <100){
				errorFlag=1;
				errMsg='Main Material Bone Dry should Not Be Less Than 100%. Do You Want To Continue?';
			}
			if(mPer > 100){
				errorFlag=1;
				errMsg='Main Material Bone Dry should Not Be More Than 100%. Do You Want To Continue?';
			}
		}
		
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
		let mVolume = Number(appsmith.store.MaxVolume);
		let tVolume = Number(appsmith.store.calculatedField.sv_totalVolume);
		let errorFlag=0;
		let errMsg='';
		if(tVolume > mVolume){
			errMsg='Total Volume should Not Be More Than Max Volume. Do You Want To Continue?';
		}
		if(appsmith.store.RecipeClassDropDown=="RM" || appsmith.store.RecipeClassDropDown=="CO" || appsmith.store.RecipeClassDropDown=="ST" || appsmith.store.RecipeClassDropDown=="PD")		{

		}else{
			errorFlag=0;
			errMsg='';
		}
		if(mVolume==''){
			errorFlag=0;
			errMsg='';
		}
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
		if(appsmith.store.RecipeClassDropDown=="PD" || appsmith.store.RecipeClassDropDown=="RM" || appsmith.store.RecipeClassDropDown=="CO") {
			if(isNaN(Number(appsmith.store.MaxVolume)) || Number(appsmith.store.MaxVolume) < 0) {
				validationMsg = validationMsg + count + ".Max volume Should be non negative number. ";
				count++;
			}
			if(isNaN(Number(appsmith.store.calculatedField.sv_totalVolume)) || Number(appsmith.store.calculatedField.sv_totalVolume) < 0) {
				validationMsg = validationMsg + count + ".Total Volume Should be non negative number. ";
				count++;
			}
			if(isNaN(Number(appsmith.store.calculatedField.sv_dc)) || Number(appsmith.store.calculatedField.sv_dc) < 0) {
				validationMsg = validationMsg + count +".Dry Content Should be non negative number. ";
					count++;
			}
		}
		if(appsmith.store.RecipeClassDropDown=="PD" || appsmith.store.RecipeClassDropDown=="CS" || appsmith.store.RecipeClassDropDown=="ST" || appsmith.store.RecipeClassDropDown=="RM" ) {
			if(isNaN(Number(appsmith.store.calculatedField.sv_mainMtrlBoneDry)) || Number(appsmith.store.calculatedField.sv_mainMtrlBoneDry) < 0) {
				validationMsg = validationMsg + count +".Main Material Should be non negative number. ";
					count++;
			}
		}
		return validationMsg;
	},
	showErrorTgt:()=> {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		let errorFlag=0;
		let errMsg='';
		if(appsmith.store.InterMaterial==''){
			errorFlag=1;
			errMsg='Please input intermediate material.';
			if(appsmith.store.RecipeClassDropDown=="ST" ){
				errMsg='Please input product code.';
			}
			storeValue('errMsgStr',errMsg,true);
			showModal('msgModal');
		}else{
			if(appsmith.store.RecipeClassDropDown != "ST"){
				let sv_tdc =Number(appsmith.store.calculatedField.sv_tdc).toFixed(2);
				let dcI = Number(appsmith.store.calculatedField.sv_dc).toFixed(2);
				if(dcI > sv_tdc) {
					errorFlag=1;
					errMsg='Target dry content can not be achieved.';
				}
				if(dcI < sv_tdc) {
					errorFlag=1;
					errMsg='Calculated dry content can not be more than target dry content.';
				}
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