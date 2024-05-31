export default {
	PageLoadViewRecipe:async() => {
		GetFilteredRecipeView.run(() => {}, () => { GetFilteredRecipeView.run();  } );
		GetRecipeItem.run(() => {}, () => { GetRecipeItem.run();  } );
	},
	getRecipeClass: () => {
		let recipeClassCode = '';
		const classlist = ["CO","EN","CS","MS","PD","PR","RM","ST","SU"];
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