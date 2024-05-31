export default {
	OnPageLoad: async () => {
		await GetFilteredRecipe.run();
		
		let recipeClass = await GetFilteredRecipe.data.RECIPE_CLASS;
		if(recipeClass == "RM" || recipeClass == "CO" || recipeClass == "ST" || recipeClass == "PD" || recipeClass == "WP" || recipeClass == "PU") {
			GetItemRMCOSTPDWPPU.run();
		} else if (recipeClass == "CS" || recipeClass == "MS" || recipeClass == "SU" || recipeClass == "WS" || recipeClass == "BL" || recipeClass == "DR") {
			GetItemCSMSSUWSBLDR.run();
		}
	},
	getRecipeClass: () => {
		let recipeClassCode = '';
		const classlist = ["CO","EN","CS","MS","PD","PR","RM","ST","SU","DR","WS","WP","PU","BL"];
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
			case classlist[9]:	
				recipeClassCode = "Drying";
				break;
			case classlist[10]:	
				recipeClassCode = "Washing";
				break;
			case classlist[11]:	
				recipeClassCode = "Wood Processing";
				break;
			case classlist[12]:	
				recipeClassCode = "Pulp";
				break;
			case classlist[13]:	
				recipeClassCode = "Bleaching";
				break;
			default:
				recipeClassCode = "";
		}
		
		return recipeClassCode;
	},
	getProductCode:() => {
		if(GetFilteredRecipe.data.PRODUCT_CODE == null ){
			return GetFilteredRecipe.data.INTER_MAT_CODE;	
		} else{
			return GetFilteredRecipe.data.PRODUCT_CODE;
		}
	},
	getProductName:() => {
		if(GetFilteredRecipe.data.PRODUCT_CODE == null ){
			return GetFilteredRecipe.data.MATERIAL_NAME_SHORT;	
		} else{
			return GetFilteredRecipe.data.PRODUCT_NAME_SHORT;
		}
	},
	RecipeStatus:() => {
		let recipeClassCode = '';
		const classlist = ["A","H","N","P"];
		switch(GetFilteredRecipe.data.RECIPE_STATUS) {
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
	}
}