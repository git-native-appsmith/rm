export default {
	onRecipeinfoClick: () => {
		showModal('RecipeOverModal');
		GetModelRecipe.run()
	},
	onRecipeSet: () =>{
		closeModal('RecipeOverModal');
		Checkbox1Copy.isChecked=false;
		chkPlan.isChecked=true;
		showModal('RecipeSetModal');
		let oprtype =7;
		if(chkPlan.isChecked){
			oprtype=7;
		}
		if(Checkbox1Copy.isChecked){
			oprtype=9;
		}
		if(chkPlan.isChecked && Checkbox1Copy.isChecked){
			oprtype=8;
		}
		
		storeValue('Recipe_Set_opr',oprtype);
		GetModelRecipeSet.run();
	},
	onRecipeHistoryP:()=>{
		let oprtype =7;
		if(chkPlan.isChecked){
			oprtype=7;
		}
		if(Checkbox1Copy.isChecked){
			oprtype=9;
		}
		if(chkPlan.isChecked && Checkbox1Copy.isChecked){
			oprtype=8;
		}
		storeValue('Recipe_Set_opr',oprtype);
		GetModelRecipeSet.run();
	},
	onCancelClick:()=>{
		GetMassRecipeData.clear();
		GetMassRecipeData.run()
	}
}