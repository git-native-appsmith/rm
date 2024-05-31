export default {
	DisableValueField: (currentRow) => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		let disable = false;
		if( currentRow.RECIPE_FUNCTION == '') {
			return disable = true;
		} else {
			if(currentRow.RECIPE_ITEM_TYPE =='CMD') {
				return disable = false;//enable value field
			} else if(currentRow.RECIPE_ITEM_TYPE =='DOS'){
				if(currentRow.RECIPE_FUNCTION=='CAL' || currentRow.RECIPE_FUNCTION=='CON') {
					disable = true;
				} else {
					disable = false;
				}
			} else {
				disable = true;
			}
		}
		return disable;
	},
	DisableWeightField: (currentRow) => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		let disable = false;
		if( currentRow.RECIPE_FUNCTION == '') {
			return disable = true;
		} else {
			if(currentRow.RECIPE_ITEM_TYPE =='CMD') {
				return disable = true;//disable weight field
			} else if(currentRow.RECIPE_ITEM_TYPE =='DOS'){
				if(currentRow.RECIPE_FUNCTION=='CAL' || currentRow.BALE_WEIGHT > 0) {
					disable = true;
				} else {
					disable = false;
				}
			} else {
				disable = true;
			}
		}
		return disable;
	},
	DisableVolumnField: (currentRow) => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		let disable = false;
		if( currentRow.RECIPE_FUNCTION == '') {
			return disable = true;
		} else {
			if(currentRow.RECIPE_ITEM_TYPE =='CMD') {
				return disable = true;//disable Volumn field
			} else if(currentRow.RECIPE_ITEM_TYPE =='DOS'){
				if(currentRow.RECIPE_FUNCTION=='CAL' || currentRow.BALE_WEIGHT > 0) {
					disable = true;
				} else {
					disable = false;
				}
			} else {
				disable = true;
			}
		}
		return disable;
	}
}