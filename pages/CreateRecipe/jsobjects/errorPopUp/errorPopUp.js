export default {
	showErrorModal: async () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		var validationMsg = ValidationOnSave.OnSaveClickValidation();
		if(validationMsg != ""){
			storeValue('CreateRecipeErrMsg',validationMsg,true);
			showModal('msgModalInfo');
		} else {
		let mPer = Number(RecipeSizeInPerInput.text);
		let errorFlag=0;
		let errMsg='';
		if(mPer <100){
			errorFlag=1;
			errMsg='Main Material Bone Dry should Not Be Less Than 100%. Do You Want To Continue?';
		}
		if(mPer > 100){
			errorFlag=1;
			errMsg='Main Material Bone Dry should Not Be More Than 100%. Do You Want To Continue?';
		}
		if(appsmith.store.RecipeClassDropDown=="RM" || appsmith.store.RecipeClassDropDown=="CO" || appsmith.store.RecipeClassDropDown=="ST" || appsmith.store.RecipeClassDropDown=="PD"){

		}else{
			errorFlag=0;
			errMsg='';
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
		let mVolume = Number(MaxVolumeInput.text);
		let tVolume = Number(TotalVolumeInput.text);
		let errorFlag=0;
		let errMsg='';
		if(tVolume > mVolume){
			errMsg='Total Volume should Not Be More Than Max Volume. Do You Want To Continue?';
		}
		if(appsmith.store.RecipeClassDropDown=="RM" || appsmith.store.RecipeClassDropDown=="CO" || appsmith.store.RecipeClassDropDown=="ST" || appsmith.store.RecipeClassDropDown=="PD"){

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
			JSObject3.SaveRecipe();
			closeModal('msgModal');
		}else{
			showModal('msgModal');
		}
	},
	callSave: ()=>{
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		if(appsmith.store.errorFlag==1){
			errorPopUp.showErrorModalNew();
		}else{
			JSObject3.SaveRecipe();
			closeModal('msgModal');
		}
	},
	setMainboneDryDefault:()=>{
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		if(appsmith.store.RecipeClassDropDown=="RM" || appsmith.store.RecipeClassDropDown=="CO" || appsmith.store.RecipeClassDropDown=="ST" || appsmith.store.RecipeClassDropDown=="PD"){

		}else{
			storeValue('sv_mainMtrlBoneDry',0,true);
		}
	}
}