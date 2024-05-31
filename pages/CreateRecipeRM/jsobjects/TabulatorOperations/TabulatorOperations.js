export default {
	onPageLoad: async () => {
		const resourceSelect = appsmith.store.ResourceGroupDropDown;	
		const baseURL = appsmith.store.baseurl;
		//let columnConfig = await GetRecipeColumnConfig.run();
		const recipeType = Number(appsmith.store.RecipeTypeDropDown);
		const calculatedFields = appsmith.store.calculatedField;
		const specWeight = Number(calculatedFields.sv_spwt).toFixed(2);
		const totalWeight = Number(calculatedFields.sv_totalWeightWet).toFixed(2);
		const filler = Number(calculatedFields.sv_filler).toFixed(2);
		const gbt = Number(calculatedFields.sv_gbt).toFixed(2);		
		const calculatedDryContent = Number(calculatedFields.sv_tdc).toFixed(2);		
		const mainMaterial = Number(calculatedFields.sv_per).toFixed(2);
		const maxVolume = Number(appsmith.store.MaxVolume).toFixed(2);
		const totalVolume = Number(calculatedFields.sv_totalVolume).toFixed();
		const weightUnit=appsmith.store.SIZE_UNIT1;
		const volumeUnit=appsmith.store.SIZE_UNIT2;
		//Recipe Limit
			if(GetRecipeLimits.data == undefined || GetRecipeLimits.data.length <= 0) {
				await GetRecipeLimits.run( () => {
					storeValue("SV_TBL_Limit", GetRecipeLimits.data ,true);
				} );
			}
			//Recipe Limit
		if(appsmith.URL.queryParams.RecipeAction == "Create") {
			postWindowMessage({
				message: "CREATE",
				data : {"BASEURL": baseURL, "RECIPE_CLASS": appsmith.store.RecipeClassDropDown, "RESOURCE_SELECT": resourceSelect, "TARGET_DRY_CONTENT": 0, "MAIN_MATERIAL_BONE_DRY": 1000, "SPEC_WEIGHT": specWeight, "TOTAL_WEIGHT": totalWeight, "FILLER": filler, "GBT": gbt, "CALCULATED_DRY_CONTENT": calculatedDryContent, "MAIN_MATERIAL": mainMaterial, "MAX_VOLUME": maxVolume, "TOTAL_VOLUME": totalVolume,"RECIPE_TYPE": recipeType,"WEIGHT_UNIT": weightUnit,"VOLUME_UNIT": volumeUnit, "SV_TBL_Limit": appsmith.store.SV_TBL_Limit, "MACHINE_GROUP_NAME": appsmith.store.ResourceGroupDropDownName, "RECIPE_TYPE_NAME": appsmith.store.RecipeTypeDropDownName, "RECIPE_NAME": appsmith.store.InterMaterialName, "CALC_FIELD": appsmith.store.Calc_dryContentSpecWeightLimitField}
			}, 'Iframe1', '*');
		}
		else if(appsmith.URL.queryParams.RecipeAction == "Edit") {			
			postWindowMessage({
				message: "EDIT",
				data : {"BASEURL": baseURL, "RECIPE_NUMBER": appsmith.store.recipeNumberView, "RECIPE_SET_NUMBER": appsmith.store.RecipeSetNumber, "MACHINE_GROUP": appsmith.store.recipeMachineGroup, "RECIPE_CLASS": appsmith.store.recipeClassCode, "RESOURCE_SELECT": resourceSelect, "TARGET_DRY_CONTENT": Number(calculatedFields.sv_dc), "MAIN_MATERIAL_BONE_DRY": Number(calculatedFields.sv_mainMtrlBoneDry), "SPEC_WEIGHT": specWeight, "TOTAL_WEIGHT": totalWeight, "FILLER": filler, "GBT": gbt, "CALCULATED_DRY_CONTENT": calculatedDryContent, "MAIN_MATERIAL": mainMaterial, "MAX_VOLUME": maxVolume, "TOTAL_VOLUME": totalVolume, "INTER_MEDIATE_MATERIAL_CODE":appsmith.store.InterMaterial, "RECIPE_TYPE": recipeType,"WEIGHT_UNIT": weightUnit,"VOLUME_UNIT": volumeUnit, "SV_TBL_Limit": appsmith.store.SV_TBL_Limit, "MACHINE_GROUP_NAME": appsmith.store.ResourceGroupDropDownName, "RECIPE_TYPE_NAME": appsmith.store.RecipeTypeDropDownName, "RECIPE_NAME": appsmith.store.InterMaterialName, "CALC_FIELD": appsmith.store.Calc_dryContentSpecWeightLimitField}
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
			storeValue("MaxVolume",receivedMessage.Message.MAX_VOLUME,true);
			let modifStatus =  await GetModifStatus.run();
			if(modifStatus == "CO") {
				storeValue('errMsgStr','Modification number status is Closed.',true);
				storeValue('errorFlag',2,true) 
				showModal('msgModal');
				return;
			}
			if(modifStatus == "CN") {
				storeValue('errMsgStr','Modification number status is Cancelled.',true);
				storeValue('errorFlag',2,true) 
				showModal('msgModal');
				return;
			}
			// if(appsmith.store.SV_TBL_Limit != undefined) {
				// var limitsData = appsmith.store.SV_TBL_Limit;
				// var recipeItemFromLimits = limitsData.filter( x => x.ROW_NAME == "RECIPEITEM");
				// var recipeItemFromMainPage = receivedMessage.Message.tableData; //appsmith.store.SV_TBL;
				// for(let i = 0; i < recipeItemFromLimits.length; i++) {
					// var tempRecipeItem = recipeItemFromMainPage.filter( x => x.PROPERTY_CODE == recipeItemFromLimits[i].PROPERTY_CODE && x.RECIPE_ITEM_TYPE == "DOS");
					// for(let j = 0; j < tempRecipeItem.length; j++) {
						// if(tempRecipeItem[j].TARGET_VALUE != '' || tempRecipeItem[j].TARGET_VALUE !=  null) {
							// tempRecipeItem[j].IN_VAL = recipeItemFromLimits[i].IN
							// tempRecipeItem[j].INPUT_MINIMUM = recipeItemFromLimits[i].INPUT_MIN
							// tempRecipeItem[j].INPUT_MAXIMUM = recipeItemFromLimits[i].INPUT_MAX
							// tempRecipeItem[j].CALC_MINIMUM = recipeItemFromLimits[i].CALCULATED_MIN
							// tempRecipeItem[j].CALC_MAXIMUM = recipeItemFromLimits[i].CALCULATED_MAX
						// }
					// }
				// }
				// storeValue("SV_TBL", recipeItemFromMainPage, true);
			// } else {
				storeValue('SV_TBL', receivedMessage.Message.tableData);
			//}
			errorPopUp.showErrorTgt();
		} else if(receivedMessage.messageEmitterName === 'CALCULATED_VALUE_WITH_RECIPE_ERROR_MESSAGE') {
			Calculation.storeCalculatedValue(receivedMessage.Message.mainMaterialBoneDry, receivedMessage.Message.SPWT, receivedMessage.Message.GBT, receivedMessage.Message.PER, receivedMessage.Message.totalWeight, receivedMessage.Message.totalVolumn, receivedMessage.Message.filler, receivedMessage.Message.TDC, receivedMessage.Message.DC);
			storeValue('CreateRecipeErrMsg', receivedMessage.Message.errorMessage, true);
		} else if(receivedMessage.messageEmitterName === 'CALCULATED_VALUE_WITHOUT_RECIPE_ERROR_MESSAGE') {
			Calculation.storeCalculatedValue(receivedMessage.Message.mainMaterialBoneDry, receivedMessage.Message.SPWT, receivedMessage.Message.GBT, receivedMessage.Message.PER, receivedMessage.Message.totalWeight, receivedMessage.Message.totalVolumn, receivedMessage.Message.filler, receivedMessage.Message.TDC, receivedMessage.Message.DC);
		} else if(receivedMessage.messageEmitterName === 'CHECK') {
			storeValue('SV_TBL', receivedMessage.Message.tableData);
			RecipeComparisonUtil.OpenComparisionPopup();
		} else if(receivedMessage.messageEmitterName ==='LIMIT_DATA_MESSAGE') {
			storeValue('Calc_dryContentSpecWeightLimitField', receivedMessage.Message.Calc_dryContentSpecWeightLimitField);
			//storeValue('SV_TBL_Limit', receivedMessage.Message.SV_TBL_Limit);
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