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
		await storeValue('RecipeClassDropDown',recipeClass,true);
		await storeValue('RecipeClassName',ClassSelect.selectedOptionLabel,true);
		GetRecipeTyeOptionData.run();
	},
	onchangeResourceDropDown: async () => {
		const resource = ResourceSelect.selectedOptionValue;
		await storeValue("ResourceGroupDropDown",resource,true);
		GetRecipeTyeOptionData.run();
	},
	OnModificNoTextChange: () => {
	const modifNo = ModificationNumberSearch.text;
		if(modifNo.length == 0 || modifNo == "") {
			storeValue('showErrorMessage',true,false);
		} else {
			storeValue('showErrorMessage',false,false);
		}
 }
}