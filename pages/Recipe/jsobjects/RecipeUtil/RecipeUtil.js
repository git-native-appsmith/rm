export default {
	RecipeSetIdForFilter: () => {
		let ret;
		if(RecipeSetId.text.trim() == ''){
			ret = 'NA';
		} else {
			ret = RecipeSetId.text.trim();
		}
		return ret.replace(/ /gi, "%20");
	},
	ValidDateForSearch: () => {
		const selectedDate = new Date(ValidFromDatePicker.selectedDate);
		const d = new Date('01-MAR-2022');
		let validDate = '';
		validDate = selectedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric'}).replace(/ /g, '-');
		if(validDate === 'Invalid-Date') {
			validDate = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric'}).replace(/ /g, '-');
		}
		return validDate;
	},
	updateFromNum: () => {
	let ret =1;
		if(!Number(FromNumInput.text)){
			ret = 1;
		} else {
			ret = FromNumInput.text;
		}
		return  ret;
	},
	updateToNum : () => {
		let retValue = 9999999;
		if(!Number(ToNumInput.text)) {
			retValue = 9999999;
		} else {
			retValue = ToNumInput.text;
		}
		return retValue;
	},
	updateUser : () => {
		let ret;
		if(UserSelect.selectedOptionValue == 'Select'){
			ret = 'NA';
		} else {
			ret = UserSelect.selectedOptionValue.replace(" ","%20");
		}
		return ret;
	},
	LoadRecipeTypeDropDown :async () => {
		const recipeClass = ClassSelect.selectedOptionValue;
		let defaultDropDownValue = appsmith.store.defaultDropDownValue;
		defaultDropDownValue.RecipeClassDropDown = recipeClass;
		defaultDropDownValue.RecipeTypeDropDown = "";//CLEAR RECIPE TYPE DROPDOWN
		await storeValue("defaultDropDownValue",defaultDropDownValue,true);
		await storeValue('RecipeTypeDropDownName',"",true);//CLEAR RECIPE TYPE DROPDOWN
		await storeValue('RecipeClassDropDown',recipeClass,true);
		await storeValue('RecipeClassDropDownName',ClassSelect.selectedOptionLabel,true);
		GetRecipeTyeOptionData.run();
	},
	onchangeResourceDropDown: async () => {
		const resource = ResourceSelect.selectedOptionValue;
		let defaultDropDownValue = appsmith.store.defaultDropDownValue;
		defaultDropDownValue.ResourceGroupDropDown =resource;
		await storeValue("defaultDropDownValue",defaultDropDownValue,true);
		await storeValue("ResourceGroupDropDown",resource,true);
		await storeValue("ResourceGroupDropDownName",ResourceSelect.selectedOptionLabel,true);
		GetRecipeTyeOptionData.run();
	},
	RedirectToRecipeViewPage1: () => {
		storeValue("recipeNumberView",RecipeTable.selectedRow.RECIPE_NUMBER,false);
		navigateTo('ViewRecipe', {},'SAME_WINDOW');
	},
	OnModificNoTextChange: () => {
	const modifNo = ModificationNumberSearch.text;
		if(modifNo.length == 0 || modifNo == "") {
			storeValue('showErrorMessage',true,false);
		} else {
			storeValue('showErrorMessage',false,false);
		}
 },
	DeleteRecipeData : async () => {
		const modifNo = ModificationNumberSearch.text;
		if(modifNo.length == 0 || modifNo == "") {
			storeValue('showErrorMessage',true,false);
		} else {
			storeValue('showErrorMessage',false,false);
			// First validate the Modific No then call API
			await IsModificNoExist.run((result) => {
	     if(String(result) != ModificationNumberSearch.text.trim()){
		     showModal('ModificationNumberAlert');
			 } else {
				 if(appsmith.store.IframeSelRecipeStatus == 'N') {
						storeValue("DeleteMessage","Are you sure,do you want to delete Recipe ? Click Yes to Continue, No to cancel",true);
					 } else if(appsmith.store.IframeSelRecipeStatus == 'A') {
							storeValue("DeleteMessage","The recipe will be deleted after activation of this modification number. Do you want to continue? Click Yes to Continue, No to cancel",true);
						}
			  showModal('DeleteModal');
			 }
			 },
			() => showAlert('Failed to Validate Modification number'));
		}
 },
	DeleteYesButtonClick: () => {
		Button9.isDisabled=true;
		DeleteRecipe.run( () => {
		 TabulatorAction.SearchButtonClick();
		 closeModal('DeleteModal');
		 showAlert("Recipe Deleted successfully");
		 Button9.isDisabled=false;
		},
	 () => showAlert('Failed to Delete Recipe'));
	
	}
}