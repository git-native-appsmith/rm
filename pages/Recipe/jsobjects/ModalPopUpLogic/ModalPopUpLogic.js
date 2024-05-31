export default {
	SearchProductCodeClick: async () => {
		if(ClassSelect.selectedOptionLabel == 'Raw Material' || ClassSelect.selectedOptionLabel == 'Pulp Dissolving' || ClassSelect.selectedOptionLabel=='Coating') {
			await GetIntermediateMaterial.run();
			showModal('IntermediateMaterialModal');
		} else {
			showModal('ProductCodeModal');
		}
	},
	machineGroupInput: () => {
		if(ResourceSelect.selectedOptionValue == "Select" || ResourceSelect.selectedOptionValue === undefined){
			return null;
		} else {
			return appsmith.store.ResourceGroupDropDown;
		}
	},
	RecipeTypeNumberInput: () => {
		if(appsmith.store.RecipeTypeDropDown== undefined){
			if(RecipeTypeSelect.selectedOptionValue == "Select" || RecipeTypeSelect.selectedOptionValue === undefined){
				return 0;
			} else {
				return appsmith.store.RecipeTypeDropDown;
			}
		} else{
			if(RecipeTypeSelect.selectedOptionValue == "Select" || RecipeTypeSelect.selectedOptionValue === undefined){
				return 0;
			} else {
				return appsmith.store.RecipeTypeDropDown;
			}
		}
		
		
	}
	
}