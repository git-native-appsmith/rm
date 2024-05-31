export default {
	RecipeStatus: (currentRow) => {
		if(ModificationNumberSearch.text == "" || ModificationNumberSearch.text.length == 0 || appsmith.store.modificNo == undefined) {
			return String(currentRow.RECIPE_STATUS).toLowerCase();
		} else {
				if(appsmith.store.RecipeSetCtg != 'Standard'){
					return String(currentRow.RECIPE_STATUS).toUpperCase();
				}else{
						if(String(currentRow.RECIPE_STATUS) == 'N') {
						if(Number(currentRow.MODIF_NUMBER) == Number(ModificationNumberSearch.text)) {
							return String(currentRow.RECIPE_STATUS).toUpperCase();
						} else {
							return String(currentRow.RECIPE_STATUS).toLowerCase();
						}

					} else { //status is A
						if(currentRow.IS_RECIPE_EXIST_WITH_SAME_REVISION) {
							return String(currentRow.RECIPE_STATUS).toLowerCase();
						} else {
							return String(currentRow.RECIPE_STATUS).toUpperCase();
						}
					}
				}
		}
	}
}