export default {
	myVar1: [],
	myVar2: {},
	myFun2: async () => {
		//use async-await or promises
	},
	RedirectToViewRecipe: async () => {
		await GetAssociateRecipeSet.run();
		var recipeSetid = GetAssociateRecipeSet.data[0].RECIPE_SET_NUMBER;
		var viewRecipeSet = false;
		if(GetAssociateRecipeSet.data.length == 1) {
			viewRecipeSet = true;
		}
		navigateTo('ViewRecipe',{"recipeNumberView":IdenticalRecipeTable.selectedRow.RECIPE_NUMBER,"RecipeSetNumber":recipeSetid,													"recipeMachineGroup":IdenticalRecipeTable.selectedRow.MACHINE_GROUP,"recipeClassCode":IdenticalRecipeTable.selectedRow.RECIPE_CLASS,"viewRecipeSet":viewRecipeSet},'NEW_WINDOW');
	},
		onRecipeViewClick: ()=>{
			var selRow = IdenticalRecipeTable.selectedRow;
			
			if(selRow.RECIPE_NUMBER=="") {
				showAlert('Please Select A Row.','error');
			} else {
				//GetFilteredRecipeView.run();
				//GetRecipeItem.run();
				//showModal('RecipeModal');
				navigateTo('ViewRecipeDetail',{"rno":selRow.RECIPE_NUMBER,"rsno":selRow.RECIPE_SET_NUMBER},'NEW_WINDOW');
			}
	 },
	GetTargetValueInput: () => {
		let modifiedRecipeDetails = [];
		GetIdenticalRecipe.data.IdenticalRecipe.forEach( x => {
			var existrecipe = modifiedRecipeDetails.filter(y => y.RECIPE_NUMBER == x.RECIPE_NUMBER);
			if(existrecipe && existrecipe.length == 0) {
				if(x.STATUS == "A" || x.STATUS == "N") {
					let modifiedRecipeDetail = {};
					modifiedRecipeDetail.RECIPE_NUMBER = x.RECIPE_NUMBER;
					modifiedRecipeDetail.RECIPE_TYPE_NUMBER = x.RECIPE_TYPE_NUMBER;
					modifiedRecipeDetail.RECIPE_CODE = x.RECIPE_CODE;
					modifiedRecipeDetail.CLASSIFICATION = x.CLASSIFICATION;
					modifiedRecipeDetail.REVISION_NO = x.REVISION_NO;
					modifiedRecipeDetail.MACHINE_GROUP = x.MACHINE_GROUP;
					modifiedRecipeDetail.PRODUCT_NAME_SHORT = x.PRODUCT_NAME_SHORT;
					modifiedRecipeDetail.MATERIAL_NAME_SHORT = x.MATERIAL_NAME_SHORT;
					modifiedRecipeDetails.push(modifiedRecipeDetail);
				}
			}
		});
		return modifiedRecipeDetails;
	},
	OnTabSelectedAPICall: () => {
		if(GetTargetValue.data == null || GetTargetValue.data == undefined) {
			GetTargetValue.run();
		}
	}
}