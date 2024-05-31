export default {
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
	ChildRecipeAPIInput:() => {
		var childRecipeInputs = [];
		var childRecipes = appsmith.store.RecipesByProductFilter.filter(x => x.MASTER_RECIPE == false);
		for(let i=0;i<childRecipes.length;i++){
			let child = {"CHILD_RECIPE_NUMBER":0,"STATUS":""};
			child.CHILD_RECIPE_NUMBER = Number(childRecipes[i].RECIPE_NUMBER);
			child.STATUS = childRecipes[i].RECIPE_STATUS;
			childRecipeInputs.push(child);
		}
		return childRecipeInputs;
	},
	UpdateButtonClik:async () => {
		let modifStatus =  await GetModifStatus.run();
		if(modifStatus == "CO") {
			showAlert("Modification number status is Closed.",'error');
			return;
		}
		if(modifStatus == "CN") {
			showAlert("Modification number status is Cancelled.",'error');
			return;
		}
		MasterRecipe.run(() => {
			//storeValue("RecipesByProductFilter",[],true);
			storeValue("MasterRecipeNo","",true);
			showAlert('Child Recipes Created/Modified successfully.','success');},
										 () => showAlert('Failed to create child recipe.','error'));
	}

}