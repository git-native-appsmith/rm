export default {
	OnSaveClickValidation:() => {
		var validationMsg = "";
		var count = 1;
		if(appsmith.store.RecipeClassDropDown=="PD" || appsmith.store.RecipeClassDropDown=="RM" || appsmith.store.RecipeClassDropDown=="CO") {
			if(isNaN(Number(MaxVolumeInput.text)) || Number(MaxVolumeInput.text) < 0) {
				validationMsg = validationMsg + count + ".Max volume Should be non negative number. ";
				count++;
			}
			if(isNaN(Number(TotalVolumeInput.text)) || Number(TotalVolumeInput.text) < 0) {
				validationMsg = validationMsg + count + ".Total Volume Should be non negative number. ";
				count++;
			}
			if(isNaN(Number(TotalVolumeInput.text)) || Number(DryContentInput.text) < 0) {
				validationMsg = validationMsg + count +".Dry Content Should be non negative number. ";
					count++;
			}
		}
		if(appsmith.store.RecipeClassDropDown=="PD" || appsmith.store.RecipeClassDropDown=="CS" || appsmith.store.RecipeClassDropDown=="ST" || appsmith.store.RecipeClassDropDown=="RM" ) {
			if(isNaN(Number(MainMaterialInput.text)) || Number(MainMaterialInput.text) < 0) {
				validationMsg = validationMsg + count +".Main Material Should be non negative number. ";
					count++;
			}
		}
		return validationMsg;
	}
}