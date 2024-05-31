export default {
	OpenComparisionPopup: () => {
		if(appsmith.store.recipeStatus == "A" && GetFilteredRecipe.data.REVISION_NO > 1) {
			GetComparasionForRecipeEdit.run();
			showModal("CreateRecipeComparasionModal");
		} else if((appsmith.store.recipeStatus == "N" || appsmith.store.recipeStatus == "P") && GetFilteredRecipe.data.REVISION_NO > 1) {
			GetComparasionForRecipeEdit.run();
			showModal("CreateRecipeComparasionModal");
		} else {
			TabulatorOperations.closeLoader();
			showAlert("There is no recipe to Comparison");
		}
	},
	LeftSideModifNo: () => {
		if(appsmith.store.recipeStatus == "A") {
			return appsmith.store.modificNo.toString();
		} else {
			return GetFilteredRecipe.data.MODIF_NUMBER;
		}
	},
	LeftSideActiveFrom: () => {
		if(appsmith.store.recipeStatus == "A") {
			return appsmith.store.modifStartDate;
		} else {
			return GetFilteredRecipe.data.MODIF_START_DATE;
		}
	},
	LeftSideRecipeStatus: () => {
		if(appsmith.store.recipeStatus == "A") {
			return "N";
		} else {
			return appsmith.store.recipeStatus;
		}
	},
	RightSideModifNo: () => {
		if(appsmith.store.recipeStatus == "A") {
			return GetFilteredRecipe.data.MODIF_NUMBER;
		} else {
			//return n-1 recipe modif no;
			return GetComparasionForRecipeEdit.data.rightSideRecipeDetail.MODIF_NUMBER;
		}
	},
	RightSideActiveFrom: () => {
		if(appsmith.store.recipeStatus == "A") {
			return GetFilteredRecipe.data.MODIF_START_DATE;
		} else {
			//return n-1 recipe modif MODIF_START_DATE;
			return moment(GetComparasionForRecipeEdit.data.rightSideRecipeDetail.START_DATE).format("DD-MM-YYYY h:mm");
		}
	},
	RightSideRecipeStatus: () => {
		if(appsmith.store.recipeStatus == "A") {
			return appsmith.store.recipeStatus;
		} else {
			//return n-1 recipe status;
			return GetComparasionForRecipeEdit.data.rightSideRecipeDetail.STATUS;
		}
	},
	ComparedRecipeItemPropertyCode: (currentRow) => {
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
			var compRecipeItemByProductRow = GetComparasionForRecipeEdit.data.ComparedRecipeItems.filter( x => x.ROW_INDEX == currentRow.ROW_INDEX);
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
	ComparedRecipeItemTargetValue: (currentRow) => {
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
			var compRecipeItemByProductRow = GetComparasionForRecipeEdit.data.ComparedRecipeItems.filter( x => x.ROW_INDEX == currentRow.ROW_INDEX);
			if(compRecipeItemByProductRow && compRecipeItemByProductRow.length == 1 && compRecipeItemByProductRow[0].RECIPE_ITEM_NUMBER != null) {
				if(currentRow.TARGET_VALUE == compRecipeItemByProductRow[0].TARGET_VALUE) {
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
	OnChangeComparedBy: () => {
		if(ComparedBySelect.selectedOptionValue == 1) {
			if(GetComparisonByStepNo.data == null || GetComparisonByStepNo.data == undefined) {
					GetComparisonByStepNo.run();
			}
	  }
	}

}