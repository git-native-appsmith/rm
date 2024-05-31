export default {
	PageLoad: async () => {
		let PRDefaultValue = {}
		if(appsmith.store.PRDefaultValue == undefined || appsmith.store.PRDefaultValue == "") {
			PRDefaultValue.ResourceGroupDropDown = "";
			PRDefaultValue.RecipeClassDropDown = "";
			PRDefaultValue.RecipeTypeDropDown = "";
			PRDefaultValue.productCodes = "";
			PRDefaultValue.InterMaterial = "";
			PRDefaultValue.StartDate = "";
			PRDefaultValue.Selected_RECIPE_NUMBER = "";
			PRDefaultValue.Selected_RECIPE_CLASS = "";
			PRDefaultValue.Selected_MACHINE_GROUP = "";
			PRDefaultValue.Selected_RECIPE_CLASSIFICATION = "";
			await storeValue("PRDefaultValue",PRDefaultValue,true);
		}
		TabulatorAction.SearchButtonClick();
	},
	RecipeClassInputForRecipeType: () => {
        if(RecipeClassSelect.selectedOptionValue == ""){
            return "NA";
        } else {
            return RecipeClassSelect.selectedOptionValue;//appsmith.store.RecipeClassDropDown
        }
    },
    MachineGroupInputForRecipeType: () => {
        if(MachineGroupSelect.selectedOptionValue == ""){
            return "NA";
        } else {
            return MachineGroupSelect.selectedOptionValue;// appsmith.store.ResourceGroupDropDown
        }
    },
	DisableProductInput: () => {
		if(RecipeClassSelect.selectedOptionValue == "") {
			if(InterMatCodeInput.text == "") {
				return false;
			} else{
				return true;
			}
		}
		else if(RecipeClassSelect.selectedOptionLabel == 'Raw Material' || RecipeClassSelect.selectedOptionLabel == 'Pulp Dissolving' || RecipeClassSelect.selectedOptionLabel=='Coating') {
			return true;
			//showModal('IntermediateMaterialModal');
		} else {
			return false;//showModal('ProductCodeModal');
		}
	},
	DisableInterMatCodeInput: () => {
		if(RecipeClassSelect.selectedOptionValue == "") {
			if(ProductCodeInput.text == "") {
				return false;
			} else{
				return true;
			}
		}
		if(RecipeClassSelect.selectedOptionLabel == 'Raw Material' || RecipeClassSelect.selectedOptionLabel == 'Pulp Dissolving' || RecipeClassSelect.selectedOptionLabel=='Coating' || RecipeClassSelect.selectedOptionValue === undefined) {
			return false;
			//showModal('IntermediateMaterialModal');
		} else {
			return true;//showModal('ProductCodeModal');
		}
	},
	ProductCodeInputDefault: () => {
		if(ProductionRecipeUtil.DisableProductInput()) {
			storeValue("productCodes","",true);
			storeValue("productCodes",undefined,true);
			return "";
		} else {
			return appsmith.store.PR_productCodes;
		}
	},
	InterMediateCodeDefault: () => {
		if(ProductionRecipeUtil.DisableInterMatCodeInput()) {
			storeValue("InterMaterial","",true);
			storeValue("InterMaterial",undefined,true);
			return "";
		} else {
			return appsmith.store.PR_RecipeList_InterMaterial;
		}
	},
	onchangeResourceDropDown: async () => {
		TabulatorAction.EmptyTabulator();
		const resource = MachineGroupSelect.selectedOptionValue;
		let PRDefaultValue = appsmith.store.PRDefaultValue;
		PRDefaultValue.ResourceGroupDropDown =resource;
		await storeValue("PRDefaultValue",PRDefaultValue,true);
		GetRecipeTypes.run();
	},
	LoadRecipeTypeDropDown :async () => {
		TabulatorAction.EmptyTabulator();
		const recipeClass = RecipeClassSelect.selectedOptionValue;
		let PRDefaultValue = appsmith.store.PRDefaultValue;
		PRDefaultValue.RecipeClassDropDown = recipeClass;
		await storeValue("PRDefaultValue",PRDefaultValue,true);
		GetRecipeTypes.run();
	},
	OnChangeRecipeTypeDropDown: async () => {
		TabulatorAction.EmptyTabulator();
		let PRDefaultValue = appsmith.store.PRDefaultValue;
		PRDefaultValue.RecipeTypeDropDown = RecipeTypeSelect.selectedOptionValue;
		await storeValue("PRDefaultValue",PRDefaultValue,true);
	},
	ProductCodeRowSelection: () => {
		let PRDefaultValue = appsmith.store.PRDefaultValue;
		PRDefaultValue.productCodes = Table1.selectedRow.PRODUCT_CODE;
		storeValue("PRDefaultValue",PRDefaultValue,true);
		closeModal('ProductCodeModal');
	},
	IntermediateMaterialRowSelection: () => {
		let PRDefaultValue = appsmith.store.PRDefaultValue;
		PRDefaultValue.InterMaterial = MaterialTable.selectedRow.MATERIAL_CODE;
		storeValue("PRDefaultValue",PRDefaultValue,true);
		closeModal('IntermediateMaterialModal');
	},
	ProductCodeInputOnBlur: () => {
		let PRDefaultValue = appsmith.store.PRDefaultValue;
		PRDefaultValue.productCodes = ProductCodeInput.text;
		storeValue("PRDefaultValue",PRDefaultValue,true);
	},
	InterMediateMaterialInputOnBlur: () => {
		let PRDefaultValue = appsmith.store.PRDefaultValue;
		PRDefaultValue.InterMaterial = InterMatCodeInput.text;
		storeValue("PRDefaultValue",PRDefaultValue,true);
	},
	OnStartDateChanged: () => {
		TabulatorAction.EmptyTabulator();
		let PRDefaultValue = appsmith.store.PRDefaultValue;
		PRDefaultValue.StartDate = RecipeStartDatePicker.selectedDate;
		storeValue("PRDefaultValue",PRDefaultValue,true);
	},
	getRecipeClass: () => {
		let recipeClassCode = '';
		const classlist = ["CO","EN","CS","MS","PD","PR","RM","ST","SU"];
		switch(GetProductionRecipeForView.data.RECIPE_CLASS) {
			case classlist[0]:	
				recipeClassCode = "Coating";
				break;
			case classlist[1]:	
				recipeClassCode = "Energy";
				break;
			case classlist[2]:	
				recipeClassCode = "Coating to Sheet";
				break;
			case classlist[3]:	
				recipeClassCode = "Machine Spec";
				break;
			case classlist[4]:	
				recipeClassCode = "Pulp Dissolving";
				break;
			case classlist[5]:	
				recipeClassCode = "Pulp Recipe";
				break;
			case classlist[6]:	
				recipeClassCode = "Raw Material";
				break;
			case classlist[7]:	
				recipeClassCode = "Stock";
				break;
			case classlist[8]:	
				recipeClassCode = "Supplement";
				break;
			default:
				recipeClassCode = "";
		}
		return recipeClassCode;
	},
	getProductCode:() => {
		if(GetProductionRecipeForView.data.PRODUCT_CODE == null ){
			return GetProductionRecipeForView.data.INTER_MAT_CODE;	
		} else{
			return GetProductionRecipeForView.data.PRODUCT_CODE;
		}
	},
	getProductName:() => {
		if(GetProductionRecipeForView.data.PRODUCT_CODE == null ){
			return GetProductionRecipeForView.data.MATERIAL_NAME_SHORT;	
		} else{
			return GetProductionRecipeForView.data.PRODUCT_NAME_SHORT;
		}
	},
	RecipeStatus:() => {
		let recipeClassCode = '';
		const classlist = ["A","H","N","P"];
		switch(GetProductionRecipeForView.data.RECIPE_STATUS) {
			case classlist[0]:	
				recipeClassCode = "Active";
				break;
			case classlist[1]:	
				recipeClassCode = "History";
				break;
			case classlist[2]:	
				recipeClassCode = "New";
				break;
			case classlist[3]:	
				recipeClassCode = "Planned";
				break;
			default:
				recipeClassCode = "";
		}
		return recipeClassCode;
	},
	RecipeClassification:() => {
		let recipeClassCode = '';
		const classlist = ["PN","PR","ST"];
		switch(GetProductionRecipeForView.data.CLASSIFICATION) {
			case classlist[0]:	
				recipeClassCode = "Planned";
				break;
			case classlist[1]:	
				recipeClassCode = "Production";
				break;
			case classlist[2]:	
				recipeClassCode = "Standard";
				break;
			default:
				recipeClassCode = "";
		}
		return recipeClassCode;
	}
	
}