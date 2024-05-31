export default {
	PageLoad: async () => {
		//use async-await or promises
		GetAllMachineGroups.run( () => { }, () => { 
		GetAllMachineGroups.run();
		});
	},
	SaveRecipeType: async () => {
		const inputs =Tabulator1.editedRows;
	  if(inputs.length > 0) {
			const CreatedInput = Tabulator1.editedRows.filter( x => x.RECIPE_TYPE_NUMBER == "");
		  const updatedInput = Tabulator1.editedRows.filter( x => Number(x.RECIPE_TYPE_NUMBER) > 0);
			if(CreatedInput.length > 0){
			  CreateRecipeType.run(
        () => {
				GetFilteredMachineGroups.run();
				showAlert('RecipeType Saved successfully');
				},
			  () => showAlert('Failed to Create RecipeType'));
			}
			if(updatedInput.length > 0) {
				UpdateRecipeType.run( () => { 
				GetFilteredMachineGroups.run();
				showAlert('RecipeType Saved Successfully');
				}, () => showAlert('Failed to Saved RecipeSet'));
			}
		}
	},
	CreateApiInput: () => {
		let selectedrows = Tabulator1.editedRows.filter( x => x.RECIPE_TYPE_NUMBER == "");
		selectedrows.forEach( (x) => {
			if(x.RECIPE_TRANSFER_WITH_RECIPE_TYPE == ""){
			 x.RECIPE_TRANSFER_WITH_RECIPE_TYPE = null;
			}
			x.CRUSER = appsmith.user.name;
			return x;
		});
		return selectedrows;
	},
	RecipeTypeDelete: () => {
	 DeleteRecipeType.run((result) => {
		 closeModal('DeleteModal');
		 if(result == 0) {
			 GetFilteredMachineGroups.run( () => {
				 showAlert('RecipeType deleted Successfully');
			 });
		 } else {
			 showAlert('Recipe Type is associated with recipe(s), it cannot be deleted.');
		 }
	 },
	() => showAlert('Failed to delete RecipeType .','error'));
 },
	SearchButtonClick: () => {
		try {
		GetFilteredMachineGroups.run(() => { showAlert('RecipeType load successfully.') }, () => { GetFilteredMachineGroups.run(() => { showAlert('RecipeType load successfully.') }, () => showAlert('Failed to retrieve data','error'));  }  );
		}
		catch (e) {
			console.log(e.message);
		}
	},
	UpdateApiInput: () => {
		let selectedrows =Tabulator1.editedRows.filter( x => Number(x.RECIPE_TYPE_NUMBER) > 0);
		selectedrows.forEach( (x) => {
			//if(x.RECIPE_TRANSFER_WITH_RECIPE_TYPE == ""){
				//x.RECIPE_TRANSFER_WITH_RECIPE_TYPE = 0;
			//}
			x.CRUSER = appsmith.user.name;
			return x;
		});
		console.log(selectedrows)
		return selectedrows;
	}
	
}