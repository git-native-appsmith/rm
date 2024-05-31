export default {
	RecipeStatus: (currentRow) => {
		debugger
		if(ModificationNumberSearch.text == "" || ModificationNumberSearch.text.length == 0 || appsmith.store.modificNo == undefined) {
			return String(currentRow.RECIPE_STATUS).toLowerCase();
		} else {
			if(String(currentRow.RECIPE_STATUS) == 'N') {
				if(Number(currentRow.MODIF_NUMBER) == Number(ModificationNumberSearch.text)) {
					return String(currentRow.RECIPE_STATUS).toUpperCase();
				} else {
					return String(currentRow.RECIPE_STATUS).toLowerCase();
				}

			} else { //status is A and P
				if(appsmith.store.RecipeSetCategory == 'Standard') {
					if(currentRow.IS_RECIPE_EXIST_WITH_SAME_REVISION) {
						return String(currentRow.RECIPE_STATUS).toLowerCase();
					} else {
						return String(currentRow.RECIPE_STATUS).toUpperCase();
					}
				} else {
					return String(currentRow.RECIPE_STATUS).toUpperCase();
				}
			}

		}
	},
	DisableEditDeleteButton: (currentRow) => {
		if(ModificationNumberSearch.text == "" || ModificationNumberSearch.text.length == 0 || appsmith.store.modificNo == undefined) {
			return true;//String(currentRow.RECIPE_STATUS).toLowerCase();
		} else {
			if(String(currentRow.RECIPE_STATUS) == 'N') {
				if(Number(currentRow.MODIF_NUMBER) == Number(ModificationNumberSearch.text)) {
					return false;//String(currentRow.RECIPE_STATUS).toUpperCase();
				} else {
					return true;//String(currentRow.RECIPE_STATUS).toLowerCase();
				}
				
			} else { //status is A
				if(currentRow.IS_RECIPE_EXIST_WITH_SAME_REVISION) {
					return true;//String(currentRow.RECIPE_STATUS).toLowerCase();
				} else {
					return false;//String(currentRow.RECIPE_STATUS).toUpperCase();
				}
			}
			
		}
	},
	ComputeRecipeSetCategory: (currentRow) => {
	if(currentRow.CATEGORY == "BD") {
		return "Budget";
	} else if(currentRow.CATEGORY == "FR") {
		return "Forecast";
	} else if(currentRow.CATEGORY == "ST") {
		return "Standard";
	}else if(currentRow.CATEGORY == "TR") {
		return "Trial";
	} else {
		return currentRow.CATEGORY;
	}
	},
	RecipeSetRowSelected: async () => {
		await RecipeStatusLogic.test();
		closeModal('RecipeSetSearchModal');
	},
	test: () => {
		 storeValue('RecipeSetNumber',RecipeSetTable.selectedRow.RECIPE_SET_NUMBER,true);
	   storeValue('RecipeSetDesc',RecipeSetTable.selectedRow.DESCRIPTION,true);
		 storeValue('RecipeSetName',RecipeSetTable.selectedRow.NAME,true);
		 storeValue('RecipeSetCtg',RecipeSetTable.selectedRow.CATEGORY,true);
	},
	ResetButtonClick: async () => {
		storeValue('RecipeSetCtg',undefined,true);
		storeValue('RecipeSetName',undefined,true);
		storeValue('RecipeSetNumber',undefined,true);
		storeValue('RecipeSetDesc',undefined,true);
		storeValue('ResourceGroupDropDown',undefined,true);
		storeValue('RecipeClassDropDown',undefined,true);
		storeValue('RecipeTypeDropDown',undefined,true);
		storeValue('InterMaterial',undefined,true);
		storeValue('productCodes',undefined,true);
		storeValue('modificNo',undefined,true);
		storeValue('uptime',undefined,true);
		resetWidget("SearchForm");
		storeValue("RecipesByProductFilter",[],true);
		storeValue('MasterRecipeNo',undefined,true);
		storeValue('ProductGroupFilterDropDown',"",true);
		GetFilteredRecipe.clear();
	},
	IntermediateMaterialRowSelection: async () => {
		await storeValue('InterMaterial',MaterialTable.selectedRow.material_code,true);
		closeModal('IntermediateMaterialModal');
	},
	setModifNo:()=>{
		if(ModificationNoTable.selectedRow.MODIF_STATUS=="Closed" || ModificationNoTable.selectedRow.MODIF_STATUS=="Cancelled"){
			var msg = "Selected Modification Number is " + String(ModificationNoTable.selectedRow.MODIF_STATUS); 
			showAlert(msg,'error');
			storeValue('modificNo',undefined,true);
			storeValue('showErrorMessage',false,false);
			storeValue('uptime',undefined,true);
		}else{
			storeValue('modificNo',ModificationNoTable.selectedRow.MODIF_NUMBER,true);
			storeValue('showErrorMessage',false,false);
			storeValue('uptime',ModificationNoTable.selectedRow.UPTIME,true);
			closeModal('SearchModificationNumberModal');
		}
	}
	
	
}