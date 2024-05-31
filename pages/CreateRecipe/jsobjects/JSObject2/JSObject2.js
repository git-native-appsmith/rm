export default {
	DefaultTabulator21 : () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		if(appsmith.URL.queryParams.RecipeAction == "Edit") {
			return GetRecipeItem1.data;
		} else {
		return [];//GetRecipeItem.data.filter( x => x.RECIPE_NUMBER == 0);
		}
	}
}