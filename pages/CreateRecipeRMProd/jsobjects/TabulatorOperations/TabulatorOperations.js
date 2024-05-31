export default {
	onPageLoad: async () => {
		//let columnConfig = await GetRecipeColumnConfig.run();		
		const recipeData = await GetProductionRecipeForView.run();
		const recipeType = Number(recipeData.RECIPE_TYPE_NUMBER);
		const targetDryContent = Number(recipeData.DRY_CONTENT, true);
		const mainMaterialBoneDry = Number(recipeData.RECIPE_SIZE, true);
		const weightUnit=appsmith.store.SIZE_UNIT1;
		const volumeUnit=appsmith.store.SIZE_UNIT2;
		if(CreateEditCS.RecipeEditButtonClick) {
			//console.log(CreateEditCS.RecipeEditButtonClick);
			let calculatedField = {};
			calculatedField.sv_mainMtrlBoneDry=Number(recipeData.RECIPE_SIZE,true);
			calculatedField.sv_spwt=Number(recipeData.SPECIFIC_WEIGHT,true);	
			calculatedField.sv_gbt=Number(recipeData.BONEDRY_WGT_PER_VOLUME,true);
			calculatedField.sv_per=Number(recipeData.RECIPE_SIZE_IN_PER,true);
			calculatedField.sv_totalWeightWet=Number(recipeData.TOTAL_WEIGHT_WET,true);
			calculatedField.sv_totalVolume=Number(recipeData.BATCH_SIZE,true);	
			calculatedField.sv_filler=Number(recipeData.FILLER_CONTENT,true);
			calculatedField.sv_tdc=Number(recipeData.DRY_CONTENT_IN_PER,true);
			calculatedField.sv_dc=Number(recipeData.DRY_CONTENT,true);	
			await storeValue("calculatedField",calculatedField,true);
			CreateEditCS.RecipeEditButtonClick = 0;
		}
		const calculatedFields = appsmith.store.calculatedField;
		const specWeight = Number(calculatedFields.sv_spwt).toFixed(2);
		const totalWeight = Number(calculatedFields.sv_totalWeightWet).toFixed(2);
		const filler = Number(calculatedFields.sv_filler).toFixed(2);
		const gbt = Number(calculatedFields.sv_gbt).toFixed(2);		
		const calculatedDryContent = Number(calculatedFields.sv_tdc).toFixed(2);		
		const mainMaterial = Number(calculatedFields.sv_per).toFixed(2);
		const maxVolume = Number(recipeData.MAX_VOLUME).toFixed(2);
		const totalVolume = Number(calculatedFields.sv_totalVolume).toFixed();
		
		postWindowMessage({
				message: "EDIT",
				data : {"BASEURL": appsmith.store.baseurl, "RECIPE_NUMBER": appsmith.URL.queryParams.rno, "RECIPE_SET_NUMBER": 20136, "MACHINE_GROUP": recipeData.MACHINE_GROUP, "RECIPE_CLASS": recipeData.RECIPE_CLASS, "RESOURCE_SELECT": recipeData.MACHINE_GROUP, "TARGET_DRY_CONTENT": targetDryContent, "MAIN_MATERIAL_BONE_DRY": mainMaterialBoneDry, "SPEC_WEIGHT": specWeight, "TOTAL_WEIGHT": totalWeight, "FILLER": filler, "GBT": gbt, "CALCULATED_DRY_CONTENT": calculatedDryContent, "MAIN_MATERIAL": mainMaterial, "MAX_VOLUME": maxVolume, "TOTAL_VOLUME": totalVolume,"INTER_MEDIATE_MATERIAL_CODE":GetProductionRecipeForView.data.INTER_MAT_CODE,"RECIPE_TYPE": recipeType,"WEIGHT_UNIT": weightUnit,"VOLUME_UNIT": volumeUnit}
			}, 'Iframe1', '*');
		
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
			storeValue('SV_TBL', receivedMessage.Message.tableData);
			errorPopUp.showErrorTgt();
		} else if(receivedMessage.messageEmitterName === 'CALCULATED_VALUE_WITH_RECIPE_ERROR_MESSAGE') {
			TabulatorOperations.storeCalculatedValue(receivedMessage.Message.mainMaterialBoneDry, receivedMessage.Message.SPWT, receivedMessage.Message.GBT, receivedMessage.Message.PER, receivedMessage.Message.totalWeight, receivedMessage.Message.totalVolumn, receivedMessage.Message.filler, receivedMessage.Message.TDC, receivedMessage.Message.DC);
			
			storeValue('CreateRecipeErrMsg', receivedMessage.Message.errorMessage, true);
			//showModal('msgModalInfo');
		} else if(receivedMessage.messageEmitterName === 'CALCULATED_VALUE_WITHOUT_RECIPE_ERROR_MESSAGE') {
			TabulatorOperations.storeCalculatedValue(receivedMessage.Message.mainMaterialBoneDry, receivedMessage.Message.SPWT, receivedMessage.Message.GBT, receivedMessage.Message.PER, receivedMessage.Message.totalWeight, receivedMessage.Message.totalVolumn, receivedMessage.Message.filler, receivedMessage.Message.TDC, receivedMessage.Message.DC);
		}
	},
	
	RedirectToAssociateRecipe: (message) => {
		storeValue("recipeNumberView", message.ASSOCIATE_RECIPE_NUMBER, true);				
		navigateTo('CreateRecipeRM', {"RecipeAction" : "Edit"}, 'NEW_WINDOW');
	},
	
	storeCalculatedValue:(sv_mainMtrlBoneDry,sv_spwt,sv_gbt,sv_per,sv_totalWeightWet,sv_totalVolume,sv_filler,sv_tdc,sv_dc)=>{
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		let calculatedField = {};
						calculatedField.sv_mainMtrlBoneDry=sv_mainMtrlBoneDry;
						calculatedField.sv_spwt=sv_spwt;	
						calculatedField.sv_gbt=sv_gbt;
						calculatedField.sv_per=sv_per;
						calculatedField.sv_totalWeightWet=sv_totalWeightWet;
						calculatedField.sv_totalVolume=sv_totalVolume;	
						calculatedField.sv_filler=sv_filler;
						calculatedField.sv_tdc=sv_tdc;	
						calculatedField.sv_dc=sv_dc;	
						storeValue("calculatedField",calculatedField,true);
	},
}