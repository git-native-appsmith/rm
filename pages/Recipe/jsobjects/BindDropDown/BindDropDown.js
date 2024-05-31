export default {
	GetRecipeClassDropDown:  () => {
		var recipeClass = GetRecipeClass.data.filter(x => x.value != 'All');
		if(recipeClass.filter(x => x.value == 'Select').length == 0){
			const te =  {"label":"Select","value":"Select"};
			recipeClass.splice(0, 0, te);
		}
		return recipeClass;
	},
	MachineGroupDropDown: () => {
		var machineGroup = GetAllMachineGroups.data;
		if(machineGroup.filter(x => x.value == 'Select').length == 0) {
			const te =  {"label":"Select","value":"Select"};
			machineGroup.splice(0, 0, te);
		}
		return machineGroup;
	},
	RecipeTypeDropDown:() => {
		var recipeType = GetRecipeTyeOptionData.data;
		if(recipeType.filter(x => x.value == 'Select').length == 0) {
			const te =  {"label":"Select","value":"Select"};
			recipeType.splice(0, 0, te);
		}
		return recipeType;
	},
	RecipeClassInputForRecipeType: () => {
		if(ClassSelect.selectedOptionValue == "Select" || ClassSelect.selectedOptionValue === undefined){
			return "NA";
		} else {
			return appsmith.store.RecipeClassDropDown;
		}
	},
	MachineGroupInputForRecipeType: () => {
		if(ResourceSelect.selectedOptionValue == "Select" || ResourceSelect.selectedOptionValue === undefined){
			return "NA";
		} else {
			return appsmith.store.ResourceGroupDropDown;
		}
	},
	RecipeClassInputForRecipeFiltered: () => {
		if(ClassSelect.selectedOptionValue == "Select" || ClassSelect.selectedOptionValue === undefined){
			return null;
		} else {
			return appsmith.store.RecipeClassDropDown;
		}
	},
	DisableProductInput: () => {
		if(ClassSelect.selectedOptionValue == 'RM' || ClassSelect.selectedOptionValue == 'PD' || ClassSelect.selectedOptionValue=='CO' || ClassSelect.selectedOptionValue=='WP') {
			return true;
			//showModal('IntermediateMaterialModal');
		} else {
			return false;//showModal('ProductCodeModal');
		}
	},
	DisableInterMatCodeInput: () => {
		if(ClassSelect.selectedOptionValue == 'RM' || ClassSelect.selectedOptionValue == 'PD' || ClassSelect.selectedOptionValue=='CO' || ClassSelect.selectedOptionValue=='WP' || ClassSelect.selectedOptionLabel=='Select' || ClassSelect.selectedOptionValue === undefined) {
			return false;
			//showModal('IntermediateMaterialModal');
		} else {
			return true;//showModal('ProductCodeModal');
		}
	},
	ProductCodeInputDefault: () => {
		if(BindDropDown.DisableProductInput()) {
			storeValue("productCodes","",true);
			storeValue("productCodes",undefined,true);
			return "";
		} else {
			return appsmith.store.productCodes;
		}
	},
	InterMediateCodeDefault: () => {
		if(BindDropDown.DisableInterMatCodeInput()) {
			storeValue("RecipeList_InterMaterial","",true);
			storeValue("RecipeList_InterMaterial",undefined,true);
			return "";
		} else {
			return appsmith.store.RecipeList_InterMaterial;
		}
	}
}