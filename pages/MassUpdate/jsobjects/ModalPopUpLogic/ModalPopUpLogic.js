export default {
	machineGroupInput: () => {
		return appsmith.store.ResourceGroupDropDown == null || appsmith.store.ResourceGroupDropDown == undefined ? ResourceSelect.selectedOptionValue : appsmith.store.ResourceGroupDropDown;
	},
	RecipeTypeNumberInput: () => {
		return RecipeTypeSelect.selectedOptionValue == null ? appsmith.store.RecipeTypeDropDown : RecipeTypeSelect.selectedOptionValue;
	}
}