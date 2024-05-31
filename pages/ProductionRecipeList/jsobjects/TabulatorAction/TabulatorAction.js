export default {
	SearchButtonClick: () => {
		var baseurl = appsmith.store.baseurl;//THIS SHOULD COME FROM APP LANDING PAGE
		//var d = RecipeStartDatePicker.formattedDate;
		//var startDate = d.split("-").reverse().join("-");
		var startDate = RecipeStartDatePicker.selectedDate;
		//startDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric'}).replace(/ /g, '-');
		if(startDate == "") {
			startDate = '1900-01-01';
		}
		else {
				startDate = moment(RecipeStartDatePicker.selectedDate).format("YYYY-MM-DD");
			}
		postWindowMessage({
			message: "View",
			data : {"MACHINE_GROUP": MachineGroupSelect.selectedOptionValue,"RECIPE_CLASS": RecipeClassSelect.selectedOptionValue,"RECIPE_TYPE_NUMBER":  Number(RecipeTypeSelect.selectedOptionValue),"PRODUCT_CODE": ProductCodeInput.text,"INTER_MAT_CODE": InterMatCodeInput.text,"START_DATE":startDate,"BASE_URL":baseurl
						 }
		}, 'ProductionRecipeIframe', '*');
	},
	TabulatorOperations: async () => {
		var receivedMessage = ProductionRecipeIframe.message;
		if(receivedMessage.messageEmitterName === 'VIEW') {
			TabulatorAction.ViewMenuItemClick(receivedMessage.Message.rowData);
		} else if (receivedMessage.messageEmitterName === 'EDIT') {
			//REDIRECT TO RESPECTIVE PAGE
			TabulatorAction.RedirectToEditRecipePage(receivedMessage.Message.rowData)
		}
	},
	ViewMenuItemClick: async (rowData) => {
		let PRDefaultValue = appsmith.store.PRDefaultValue;
		PRDefaultValue.Selected_RECIPE_NUMBER = rowData.RECIPE_NUMBER;
		PRDefaultValue.Selected_RECIPE_CLASS = rowData.RECIPE_CLASS_CODE;
		PRDefaultValue.Selected_MACHINE_GROUP = rowData.MACHINE_GROUP;
		PRDefaultValue.Selected_RECIPE_CLASSIFICATION = rowData.CLASSIFICATION;
		await storeValue("PRDefaultValue",PRDefaultValue,true);
		console.log(rowData);
		navigateTo('ViewRecipeDetailProd',{"rno":rowData.RECIPE_NUMBER},'NEW_WINDOW');
		//GetProductionRecipeForView.run();
		//GetRecipeItem.run();
		//showModal('RecipeModal');
		//console.log(rowData);
	},
	ResetButtonClick: () => {
		let PRDefaultValue = appsmith.store.PRDefaultValue;
		PRDefaultValue.ResourceGroupDropDown = "";
		PRDefaultValue.RecipeClassDropDown = "";
		PRDefaultValue.RecipeTypeDropDown = "";
		PRDefaultValue.productCodes = "";
		PRDefaultValue.InterMaterial = "";
		PRDefaultValue.StartDate = "";
		PRDefaultValue.Selected_RECIPE_NUMBER = "";
		PRDefaultValue.Selected_RECIPE_CLASS = "";
		PRDefaultValue.Selected_MACHINE_GROUP = "";
		PRDefaultValue.Selected_RECIPE_CLASSIFICATION = "";
		storeValue("PRDefaultValue",PRDefaultValue,true);
		TabulatorAction.EmptyTabulator();

	},
	EmptyTabulator: () => {
		postWindowMessage({
			message: "Reset"
		}, 'ProductionRecipeIframe', '*');
	},
	RedirectToEditRecipePage: (rowData) => {
		if(rowData.RECIPE_CLASS_CODE=='CS'){
			navigateTo('CreateRecipeCSProd', {"rno":rowData.RECIPE_NUMBER},'SAME_WINDOW');
		}else if(rowData.RECIPE_CLASS_CODE== "MS" || rowData.RECIPE_CLASS_CODE== "SU"){
			navigateTo('CreateRecipeMS_SUProd',{"rno":rowData.RECIPE_NUMBER});
		}else if(rowData.RECIPE_CLASS_CODE== "RM" || rowData.RECIPE_CLASS_CODE== "CO" || rowData.RECIPE_CLASS_CODE== "ST"){
			navigateTo('CreateRecipeRMProd',{"rno":rowData.RECIPE_NUMBER},'SAME_WINDOW');
		}else if(rowData.RECIPE_CLASS_CODE== "PD"){
			navigateTo('CreateRecipePDProd',{"rno":rowData.RECIPE_NUMBER},'SAME_WINDOW');
		}else{
			navigateTo('CreateRecipe', {"rno":rowData.RECIPE_NUMBER},'SAME_WINDOW');
		}

	}

}