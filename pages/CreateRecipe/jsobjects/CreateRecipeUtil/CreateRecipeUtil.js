export default {
	loadProductGroupOption : () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		if(appsmith.store.RecipeClassDropDownName == 'Raw Material' || appsmith.store.RecipeClassDropDownName == 'Pulp Dissolving' || appsmith.store.RecipeClassDropDownName == 'Coating') {
			storeValue('productGroupOption',[{ "label": "Product Code", "value": 2  }],false);
		} else {
			storeValue('productGroupOption',[{ "label": "Product Group", "value": 1 },{ "label": "Product Code", "value": 2  }],false);
		}
	},
	loadProductGroupOptionOnPageLoad : () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		return [{ "label": "Product Group", "value": 1 },{ "label": "Product Code", "value": 2  }];
	},
	AddProductCodes: () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		var productsCodes = [];
		var ProductCodeInput = "";
		Table1.selectedRows.forEach( (pc) => {
			productsCodes.push(pc.PRODUCT_CODE);
			if(ProductCodeInput == ""){
				ProductCodeInput = pc.PRODUCT_CODE;
			} else {
				ProductCodeInput = ProductCodeInput + " , " + pc.PRODUCT_CODE;
			}
			
		});
		storeValue('productCodes',ProductCodeInput,false);
		storeValue('productCodes',ProductCodeInput,false);
		closeModal('ProductCodeModal');
	},
	DefaultTabulator : () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		//ModificationNumberSearch.text = appsmith.URL.queryParams.modifNo;
		storeValue('modificNo',appsmith.URL.queryParams.modifNo,true)
		return [{"GROUP_NUMBER":null,
"SEQ_NO": null,
"RECIPE_ITEM_TYPE":null,
"PRODUCT_COMMAND_CODE":null,
"PRODUCT_COMMAND":null,
"NID":null,
"RECIPE_FUNCTION":null,
"VALUE_PER":null,
"TARGET_VALUE":null,
"VOLUME":null,
"UNIT":null,
"DC":null,
"SP_WEIGHT":null,
"FILTER":null}];
	},
	ComputeRecipeSetCategory: (currentRow) => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
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
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		await CreateRecipeUtil.setStore();
		closeModal('RecipeSetSearchModal');
	},
	getRecipeClass: () => {
		let recipeClassCode = '';
		const classlist = ["CO","EN","CS","MS","PD","PR","RM","ST","SU"];
		switch(GetFilteredRecipe.data.RECIPE_CLASS) {
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
	getMachineGroupDDL:()=>{
		let machinegroup = GetFilteredRecipe.data.MACHINE_GROUP + "-" +GetFilteredRecipe.data.MACHINE_GROUP_NAME_SHORT
		return machinegroup
	}
}