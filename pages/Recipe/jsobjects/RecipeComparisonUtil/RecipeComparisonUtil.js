export default {
	CompRecipeItemPropertyCode: (currentRow) => {
		var colurCode = 'black';
		if(ComparedBySelect.selectedOptionValue == 1) {
			var compRecipeItem = GetComparisonByStepNo.data.ComparasionRecipeItems.filter( x => x.ROW_INDEX == currentRow.ROW_INDEX);
			if(compRecipeItem && compRecipeItem.length == 1 && compRecipeItem[0].RECIPE_ITEM_NUMBER != null) {
				if(currentRow.PROPERTY_CODE === compRecipeItem[0].PROPERTY_CODE) {
					colurCode = 'black';
				} else {
					colurCode = 'red'
				}
			}else {
				colurCode = 'red'
			}
		} else if(ComparedBySelect.selectedOptionValue == 2) {
			var compRecipeItemByProductRow = GetComparison.data.ComparasionRecipeItems.filter( x => x.ROW_INDEX == currentRow.ROW_INDEX);
			if(compRecipeItemByProductRow && compRecipeItemByProductRow.length == 1 && compRecipeItemByProductRow[0].RECIPE_ITEM_NUMBER != null) {
				if(currentRow.PROPERTY_CODE === compRecipeItemByProductRow[0].PROPERTY_CODE) {
					colurCode = 'black';
				} else {
					colurCode = 'red'
				}
			}else {
				colurCode = 'red'
			} 
		}
		return colurCode;
	},
	CompRecipeItemTargetValue: (currentRow) => {
		var colurCode = 'black';
		if(ComparedBySelect.selectedOptionValue == 1) {
			var compRecipeItem = GetComparisonByStepNo.data.ComparasionRecipeItems.filter( x => x.ROW_INDEX == currentRow.ROW_INDEX);
			if(compRecipeItem && compRecipeItem.length == 1 && compRecipeItem[0].RECIPE_ITEM_NUMBER != null) {
				if(currentRow.TARGET_VALUE === compRecipeItem[0].TARGET_VALUE) {
					colurCode = 'black';
				} else {
					colurCode = 'red'
				}
			} else {
				colurCode = 'red'
			}
		} else if(ComparedBySelect.selectedOptionValue == 2) {
			var compRecipeItemByProductRow = GetComparison.data.ComparasionRecipeItems.filter( x => x.ROW_INDEX == currentRow.ROW_INDEX);
			if(compRecipeItemByProductRow && compRecipeItemByProductRow.length == 1 && compRecipeItemByProductRow[0].RECIPE_ITEM_NUMBER != null) {
				if(currentRow.TARGET_VALUE === compRecipeItemByProductRow[0].TARGET_VALUE) {
					colurCode = 'black';
				} else {
					colurCode = 'red'
				}
			}else {
				colurCode = 'red'
			}
		}
		return colurCode;
	},
	CompRecipeItemValuePer: (currentRow) => {
		var colurCode = 'black';
		if(ComparedBySelect.selectedOptionValue == 1) {
			var compRecipeItem = GetComparison.data.ComparasionRecipeItems.filter( x => x.SEQ_NO == currentRow.SEQ_NO && x.GROUP_NUMBER == currentRow.GROUP_NUMBER);
			if(compRecipeItem && compRecipeItem.length == 1) {
				if(currentRow.VALUE_PER === compRecipeItem[0].VALUE_PER) {
					colurCode = 'black';
				} else {
					colurCode = 'red'
				}
			} else {
				colurCode = 'red'
			}
		} else if(ComparedBySelect.selectedOptionValue == 2) {
			var compRecipeItemByProductRow = GetComparison.data.ComparasionRecipeItems.filter( x => x.ROW_INDEX == currentRow.ROW_INDEX);
			if(compRecipeItemByProductRow && compRecipeItemByProductRow.length == 1 && compRecipeItemByProductRow[0].RECIPE_ITEM_NUMBER != null) {
				if(currentRow.VALUE_PER === compRecipeItemByProductRow[0].VALUE_PER) {
					colurCode = 'black';
				} else {
					colurCode = 'red'
				}
			}else {
				colurCode = 'red'
			}
		}
		return colurCode;
	},
	CompRecipeItemMaterialCode: (currentRow) => {
		var colurCode = 'black';
		if(ComparedBySelect.selectedOptionValue == 1) {
			var compRecipeItem = GetComparison.data.ComparasionRecipeItems.filter( x => x.SEQ_NO == currentRow.SEQ_NO && x.GROUP_NUMBER == currentRow.GROUP_NUMBER);
			if(compRecipeItem && compRecipeItem.length == 1) {
				if(currentRow.MATERIAL_NAME_SHORT === compRecipeItem[0].MATERIAL_NAME_SHORT) {
					colurCode = 'black';
				} else {
					colurCode = 'red'
				}
			} else {
				colurCode = 'red'
			}
		} else if(ComparedBySelect.selectedOptionValue == 2) {
			var compRecipeItemByProductRow = GetComparison.data.ComparasionRecipeItems.filter( x => x.ROW_INDEX == currentRow.ROW_INDEX);
			if(compRecipeItemByProductRow && compRecipeItemByProductRow.length == 1 && compRecipeItemByProductRow[0].RECIPE_ITEM_NUMBER != null) {
				if(currentRow.MATERIAL_NAME_SHORT === compRecipeItemByProductRow[0].MATERIAL_NAME_SHORT) {
					colurCode = 'black';
				} else {
					colurCode = 'red'
				}
			}else {
				colurCode = 'red'
			}
		}
		return colurCode;
	},
	OpenComparisionPopup: () => {
		var recipeStatus = GetFilteredRecipeView.data.RECIPE_STATUS;
		if((recipeStatus == "A" || recipeStatus == "a") && GetFilteredRecipeView.data.REVISION_NO > 1) {
			if(GetComparison.data == null || GetComparison.data == undefined) {
				GetComparison.run();
			}
			showModal("RecipeViewComparisionModal");
		} else if((recipeStatus == "n" || recipeStatus == "N" || recipeStatus == "P" || recipeStatus == "p") && GetFilteredRecipeView.data.REVISION_NO > 1) {
			if(GetComparison.data == null || GetComparison.data == undefined) {
				GetComparison.run();
			}
			showModal("RecipeViewComparisionModal");
		} else {
			storeValue('RecipeErrMsg','There is no recipe to Comparison.',true);
			showModal('msgModal');
			//showAlert("There is no recipe to Comparison");
		}
	},
	OnChangeComparedBy: () => {
		if(ComparedBySelect.selectedOptionValue == 1) {
			if(GetComparisonByStepNo.data == null || GetComparisonByStepNo.data == undefined) {
					GetComparisonByStepNo.run();
			}
	  }
	}
}