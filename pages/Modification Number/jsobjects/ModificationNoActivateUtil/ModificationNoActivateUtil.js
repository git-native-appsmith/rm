export default {
	myVar1: [],
	myVar2: {},
	myFun1: () => {
		//write code here
	},
	myFun2: async () => {
		//use async-await or promises
	},
	ActivateMenuItemClick: async () => {
		await GetRecipeClassification.run((result) => {
	     if(String(result) == "ST") {
				 AssociatedRecipesByModifNumber.run();
		     showModal('AssociateRecipesModal');
			 } else if(String(result) == "PN") {
				 showModal('PlanRecipeActivationModal');
			 } else {
				 showModal('NoRecipeAssociateModal');
			 }
			 },
			() => showAlert('Failed to Get Recipe Classification'));
	},
	CreateModificationNumberButtonClick: () => {
  CreateModificationNumber.run( () => { ModificationNoActivateUtil.OnSuccessCreateModifNumber();}, 
  () => {
		CreateModificationNumber.run( () => { ModificationNoActivateUtil.OnSuccessCreateModifNumber();}, 
  () => {
		showAlert('Create Failed','error');
	   });
	   });

	},
	OnSuccessCreateModifNumber: () => {
		 GetFilteredModificationNumber.run( () => { storeValue('modificNo',GetFilteredModificationNumber.data[0].MODIF_NUMBER,true); 
																								storeValue('uptime',GetFilteredModificationNumber.data[0].START_DATE,true);
																							}, () => { showAlert('Failed to reload modification Number','error'); });
 		resetWidget('CreateDescriptionInput'); 
		resetWidget('CreateSHEQMultiSelect');
		resetWidget('SafetyExpectedImpactText');
		resetWidget('HealthExpectedImpactText');
		resetWidget('EnvironmentExpectedImpactText');
		resetWidget('QualityExpectedImpactText');	
		resetWidget('HygieneExpectedImpactText');		
		resetWidget('CostExpectedImpactText');
		closeModal('CreateModificationModal');
	},
	ModifNumberUpdateButtonClick: () => {
		UpdateModifNumWithCategories.run( () => {
			GetFilteredModificationNumber.run();     
 			closeModal('UpdateModificationModal');
			showAlert('Modification number updated successfully.','success');
		}, 
  () => {
		UpdateModifNumWithCategories.run( () => {
			GetFilteredModificationNumber.run();     
 			closeModal('UpdateModificationModal');
			showAlert('Modification number updated successfully.','success');
		}, 
  () => {
		showAlert('Create Failed','error');
	   });
	   });
	},
	RecipeSetMenuItemClick : async () => {
		await AssociateRecipeSetByModifNo.run();
		if(AssociateRecipeSetByModifNo.data && AssociateRecipeSetByModifNo.data.length == 1) {
			await ModificationNoActivateUtil.BindRecipeSetToStore();
			navigateTo('Recipe',{},'SAME_WINDOW');
		} else if(AssociateRecipeSetByModifNo.data && AssociateRecipeSetByModifNo.data.length > 1) {
			showModal('AssociateRecipeSetModal');
		}
	},
	BindRecipeSetToStore: () => {
		var recipeSetData = AssociateRecipeSetByModifNo.data[0];
		storeValue('RecipeSetNumber',recipeSetData.RECIPE_SET_NUMBER,true);
	  storeValue('RecipeSetDesc',recipeSetData.DESCRIPTION,true);
		storeValue('RecipeSetName',recipeSetData.NAME,true);
	},
	AssociateRecipeSetSelectedRowModal: async () => {
		await ModificationNoActivateUtil.BindRecipeSetStoreForAssociateRecipeSetModal();
		navigateTo('Recipe',{},'SAME_WINDOW');
	},
	BindRecipeSetStoreForAssociateRecipeSetModal: () => {
		var recipeSetData = AssociateRecipeSetTable.selectedRow;
		storeValue('RecipeSetNumber',recipeSetData.RECIPE_SET_NUMBER,true);
	  storeValue('RecipeSetDesc',recipeSetData.DESCRIPTION,true);
		storeValue('RecipeSetName',recipeSetData.NAME,true);
	},
	
}