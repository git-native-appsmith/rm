export default {
	onPageLoad: async () => {
		const resourceSelect = appsmith.store.ResourceGroupDropDown;
		const baseURL = appsmith.store.baseurl;
		const weightUnit=appsmith.store.SIZE_UNIT1;
		const volumeUnit=appsmith.store.SIZE_UNIT2;
		//let columnConfig = await GetRecipeColumnConfig.run();
		let recipeType = Number(appsmith.store.RecipeTypeDropDown);
		if(appsmith.URL.queryParams.RecipeAction == "Create") {
			postWindowMessage({
				message: "CREATE",
				data : {"BASEURL": baseURL, "RESOURCE_SELECT": resourceSelect, "TARGET_DRY_CONTENT": 0, "MAIN_MATERIAL_BONE_DRY": 1000, "RECIPE_TYPE": recipeType,"WEIGHT_UNIT": weightUnit,"VOLUME_UNIT": volumeUnit,"RECIPE_CLASS": appsmith.store.recipeClassCode}
			}, 'Iframe1', '*');
		}
		else if(appsmith.URL.queryParams.RecipeAction == "Edit") {
			postWindowMessage({
				message: "EDIT",
				data : {"BASEURL": baseURL, "RECIPE_NUMBER": appsmith.store.recipeNumberView, "RECIPE_SET_NUMBER": appsmith.store.RecipeSetNumber, "MACHINE_GROUP": appsmith.store.recipeMachineGroup, "RECIPE_CLASS": appsmith.store.recipeClassCode, "RESOURCE_SELECT": resourceSelect, "TARGET_DRY_CONTENT": Number(appsmith.store.calculatedField.sv_dc), "MAIN_MATERIAL_BONE_DRY": Number(appsmith.store.calculatedField.sv_mainMtrlBoneDry), "PER" : Number(appsmith.store.calculatedField.sv_per), "RECIPE_TYPE": recipeType,"WEIGHT_UNIT": weightUnit,"VOLUME_UNIT": volumeUnit}
			}, 'Iframe1', '*');
		}
	},

	tabulatorOperations: async () => {
		const receivedMessage = Iframe1.message;
		if(receivedMessage.Message?.rowData && receivedMessage.Message?.tableData) {
			storeValue('iFrame_RW', receivedMessage.Message.rowData);
			storeValue('iFrame_TBL', receivedMessage.Message.tableData);
		}
		if(receivedMessage.messageEmitterName === 'VIEW') {
			TabulatorOperations.RedirectToAssociateRecipe(receivedMessage.Message.rowData);
		} else if(receivedMessage.messageEmitterName === 'CREATE') {
			let modifStatus =  await GetModifStatus.run();
			if(modifStatus == "CO") {
				await storeValue('errMsgStr','Modification number status is Closed.',true);
				await storeValue('errorFlag',2,true);
				showModal('msgModal');
				return;
			}
			if(modifStatus == "CN") {
				await storeValue('errMsgStr','Modification number status is Cancelled.',true);
				await storeValue('errorFlag',2,true);
				showModal('msgModal');
				return;
			}
			storeValue('SV_TBL', receivedMessage.Message.tableData);
			errorPopUp.showErrorTgt();
		} else if(receivedMessage.messageEmitterName === 'CALCULATED_VALUE_WITH_RECIPE_ERROR_MESSAGE') {
			Calculation.storeCalculatedValue(receivedMessage.Message.mainMaterialBoneDry, receivedMessage.Message.SPWT, receivedMessage.Message.GBT, receivedMessage.Message.PER, receivedMessage.Message.totalWeight, receivedMessage.Message.totalVolumn, receivedMessage.Message.filler, receivedMessage.Message.TDC, receivedMessage.Message.DC);
			storeValue('CreateRecipeErrMsg', receivedMessage.Message.errorMessage, true);
		} else if(receivedMessage.messageEmitterName === 'CALCULATED_VALUE_WITHOUT_RECIPE_ERROR_MESSAGE') {
			Calculation.storeCalculatedValue(receivedMessage.Message.mainMaterialBoneDry, receivedMessage.Message.SPWT, receivedMessage.Message.GBT, receivedMessage.Message.PER, receivedMessage.Message.totalWeight, receivedMessage.Message.totalVolumn, receivedMessage.Message.filler, receivedMessage.Message.TDC, receivedMessage.Message.DC);
		} else if(receivedMessage.messageEmitterName === 'CHECK') {
			storeValue('SV_TBL', receivedMessage.Message.tableData);
			RecipeComparisonUtil.OpenComparisionPopup();
		}
	},

	RedirectToAssociateRecipe: (message) => {
		navigateTo('ViewRecipeDetail',{"rno": message.ASSOCIATE_RECIPE_NUMBER,"rsno":appsmith.store.RecipeSetNumber},'NEW_WINDOW');
	},

	closeLoader: () => {
		postWindowMessage({
			message: "CLOSE_LOADER",
		}, 'Iframe1', '*');
	}
}