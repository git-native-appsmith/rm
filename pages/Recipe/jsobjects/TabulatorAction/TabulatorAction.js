export default {
	SearchButtonClick: () => {
		if(Number(appsmith.store.RecipeSetNumber) > 0){
			StandardRecipeSetHistory.run(() => { storeValue("standardRecipeHistory", StandardRecipeSetHistory.data)});}
		if(Number(appsmith.store.modificNo) > 0 && Number(appsmith.store.RecipeSetNumber) > 0) {
			IsDifferentModifNo.run(() => { storeValue("isDiffModifNo", IsDifferentModifNo.data)});}
		
		var baseurl = appsmith.store.baseurl;//THIS SHOULD COME FROM APP LANDING PAGE
		postWindowMessage({
			message: "View",
			data : { "recipeSetName":RecipeSetNameInput.text,
							 "machineGroup": ModalPopUpLogic.machineGroupInput(),
							 "recipeClass":  BindDropDown.RecipeClassInputForRecipeFiltered(),
							 "recipeTypeNumber": Number(ModalPopUpLogic.RecipeTypeNumberInput()),
							 "productGroupNumber":0,
							 "productCode":ProductCodeInput.text == "" ? null : ProductCodeInput.text,
							 "intermediate_Mat_Code":InterMatCodeInput.text == "" ? null : InterMatCodeInput.text,
							 "property_Code":appsmith.URL.queryParams.PROPERTY_CODE == undefined ? null : appsmith.URL.queryParams.PROPERTY_CODE,
							 "recipenumber":appsmith.URL.queryParams.RecipeNumber == undefined ? 0 : Number(appsmith.URL.queryParams.RecipeNumber),
							 "BASE_URL":baseurl,
							 "MODIF_NUMBER":appsmith.store.modificNo,
							 "RecipeSetCategory":appsmith.store.RecipeSetCategory
						 }

		}, 'RecipeIframe', '*');
	},
	TabulatorOperations: async () => {
		var receivedMessage = RecipeIframe.message;
		if(receivedMessage.messageEmitterName === 'VIEW') {
			TabulatorAction.ViewMenuItemClick(receivedMessage.Message.rowData);
		} else if (receivedMessage.messageEmitterName === 'EDIT') {
			//REDIRECT TO RESPECTIVE PAGE
			TabulatorAction.RedirectToEditRecipePage(receivedMessage.Message.rowData)
		}else if (receivedMessage.messageEmitterName === 'DELETE') {
			TabulatorAction.DeleteItemClick(receivedMessage.Message.rowData)
		}else if (receivedMessage.messageEmitterName === 'ASSOCIATE') {
			TabulatorAction.AssocciateItemClick(receivedMessage.Message.rowData)
		}else if (receivedMessage.messageEmitterName === 'INCONSISTENCIES') {
			TabulatorAction.InconsistenciesItemClick(receivedMessage.Message.rowData)
		}
		
	},
	DeleteItemClick: async (rowData) => {
		storeValue('IframeSelRecipe',rowData.RECIPE_NUMBER);
		storeValue('IframeSelRecipeStatus',rowData.RECIPE_STATUS);
		console.log(rowData);
		await IsDifferentModifNo.run( async (result) => { 
			if(result == false) {
				await storeValue('RecipeErrMsg','Planned and standard recipe should use different modification number.',true);
				showModal('msgModal');
		 		return;
			}else{
				RecipeCheck.DeleteRecipe();
			}
		},() => showAlert('Failed to check IsDifferentModifNo.') );
		
	},
	AssocciateItemClick: async (rowData) => {
		storeValue('IframeSelRecipe',rowData.RECIPE_NUMBER);
		console.log(rowData);
		GetAssociateRecipeSets.clear();
		GetAssociateRecipeSets.run();
		showModal('AsssociateRecipeSetModal');
	},
	InconsistenciesItemClick: async (rowData) => {
		storeValue('IframeSelRecipe',rowData.RECIPE_NUMBER);
		console.log(rowData);
		RecipeDataCheck.run();
		showModal('Inconsistent_Recipe');
	},
	ViewMenuItemClick: async (rowData) => {
		console.log(rowData);
		navigateTo('ViewRecipeDetail',{"rno":rowData.RECIPE_NUMBER,"rsno":appsmith.store.RecipeSetNumber},'NEW_WINDOW');
	},
	EmptyTabulator: () => {
		postWindowMessage({
			message: "Reset"
		}, 'RecipeIframe', '*');
	},
	RedirectToEditRecipePage: async (rowData) => {
		storeValue('IframeSelRecipe',rowData.RECIPE_NUMBER);
		console.log(rowData);
		await IsDifferentModifNo.run( async (result) => { 
			if(result == false) {
				await storeValue('RecipeErrMsg','Planned and standard recipe should use different modification number.',true);
				showModal('msgModal');
		 		return;
			}else{
				RecipeCheck.EditRecipe(rowData);
			}
		},() => showAlert('Failed to check IsDifferentModifNo.') );
		
	}

}