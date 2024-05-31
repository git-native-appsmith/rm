export default {
	getRecipeClass: () => {
		let recipeClassCode = '';
		const classlist = ["CO","EN","CS","MS","PD","PR","RM","ST","SU","WP","BL","WS","PU"];
		switch(GetFilteredRecipeView.data.RECIPE_CLASS) {
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
				recipeClassCode = "Wood Processing";
				break;
			case classlist[10]:	
				recipeClassCode = "Bleaching";
				break;
			case classlist[11]:	
				recipeClassCode = "Washing";
				break;
			case classlist[12]:	
				recipeClassCode = "Pulp";
				break;
			default:
				recipeClassCode = "";
		}
		
		return recipeClassCode;
	},
	getProductCode:() => {
		if(GetFilteredRecipeView.data.PRODUCT_CODE == null ){
			return GetFilteredRecipeView.data.INTER_MAT_CODE;	
		} else{
			return GetFilteredRecipeView.data.PRODUCT_CODE;
		}
	},
	getProductName:() => {
		if(GetFilteredRecipeView.data.PRODUCT_CODE == null ){
			return GetFilteredRecipeView.data.MATERIAL_NAME_SHORT;	
		} else{
			return GetFilteredRecipeView.data.PRODUCT_NAME_SHORT;
		}
	}
}