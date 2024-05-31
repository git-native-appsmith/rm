export default {
	RecipeStatus: (currentRow) => {
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
				if(appsmith.store.RecipeSetCategory == 'Standard') {
					if(currentRow.IS_RECIPE_EXIST_WITH_SAME_REVISION) {
						return true;//String(currentRow.RECIPE_STATUS).toLowerCase();
					} else {
						return false;//String(currentRow.RECIPE_STATUS).toUpperCase();
					}
				} else {
					return false;
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
		GetFilteredRecipe.clear();
		TabulatorAction.EmptyTabulator();
	},
	test: () => {
		storeValue('RecipeSetNumber',RecipeSetTable.selectedRow.RECIPE_SET_NUMBER,true);
		storeValue('RecipeSetDesc',RecipeSetTable.selectedRow.DESCRIPTION,true);
		storeValue('RecipeSetName',RecipeSetTable.selectedRow.NAME,true);
		storeValue('RecipeSetCategory',RecipeSetTable.selectedRow.CATEGORY,true);
	},
	ResetButtonClick: async () => {
		await RecipeStatusLogic.ResetStore(); 
		GetRecipeTyeOptionData.run( () => { GetRecipeTyeOptionData.run(); },{});
		resetWidget("SearchForm");
		GetFilteredRecipe.clear();
	},
	ResetStore: () => {
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
		storeValue("RecipeTypeDropDownName",undefined,true);
		storeValue("RecipeList_InterMaterial",undefined,true);
		let defaultDropDownValue = {}
		defaultDropDownValue.ResourceGroupDropDown = "";
		defaultDropDownValue.RecipeClassDropDown = "";
		defaultDropDownValue.RecipeTypeDropDown = "";
		storeValue('defaultDropDownValue',defaultDropDownValue,true);
	},
	IntermediateMaterialRowSelection: async () => {
		await storeValue('RecipeList_InterMaterial',MaterialTable.selectedRow.MATERIAL_CODE,true);

		closeModal('IntermediateMaterialModal');
	},
	setModifNo:()=>{
		if(ModificationNoTable.selectedRow.MODIF_STATUS=="Closed" || ModificationNoTable.selectedRow.MODIF_STATUS=="Cancelled"){
			var msg = "Selected Modification Number is " + String(ModificationNoTable.selectedRow.MODIF_STATUS); 
			//console.log(msg);
			showAlert(msg,'error');
			storeValue('modificNo',undefined,true);
			storeValue('showErrorMessage',false,false);
			storeValue('uptime',undefined,true);
			storeValue('modifStartDate',undefined,true);
			//closeModal('SearchModificationNumberModal');
		}else{
			storeValue('modificNo',ModificationNoTable.selectedRow.MODIF_NUMBER,true);
			storeValue('showErrorMessage',false,false);
			if(ModificationNoTable.selectedRow.UPTIME== null){
				storeValue('uptime',ModificationNoTable.selectedRow.START_DATE,true);
			}else{
				storeValue('uptime',ModificationNoTable.selectedRow.UPTIME,true);
			}
			storeValue('modifStartDate',ModificationNoTable.selectedRow.START_DATE,true);
			closeModal('SearchModificationNumberModal');
			if(appsmith.store.RecipeSetName != undefined){
				TabulatorAction.SearchButtonClick();
			}
			
		}
	},
	AssociateDefaultRecipeSetChecked: () => {
		let arr = [];
		for(var i =0;i< GetAssociateRecipeSets.data.AssociateRecipeSetWithOutHistory.length; i++) {
			arr.push(i);
		}
		return arr;
	},
	AssociateRecipeSetInput:() => {
		var associatedRecipeSetNumber = GetAssociateRecipeSets.data.AssociateRecipeSetWithOutHistory.map(x => Number(x.RECIPE_SET_NUMBER));
		var recipeSetNo = [];
		var selectedRecipeSets = AssociateRecipeSetTable.selectedRows;
		selectedRecipeSets.forEach( x => {
			if(!associatedRecipeSetNumber.includes(Number(x.RECIPE_SET_NUMBER))) {
				recipeSetNo.push(Number(x.RECIPE_SET_NUMBER));
			}
		});
		return recipeSetNo;
	},
	AssociateRecipeButtonClick: () => {
		AssociateRecipeSets.run( () => { showAlert('RecipeSet associated successfully.'); closeModal('AsssociateRecipeSetModal'); }, () => showAlert("Associate Recipe Set Failed."));

	}

}