export default {
	onPageLoad: async () => {
		let targetDryContent = appsmith.store.calculatedField.sv_dc?Number(appsmith.store.calculatedField.sv_dc).toFixed() : 0;
		let mainMaterialBoneDry = Number(appsmith.store.calculatedField.sv_mainMtrlBoneDry).toFixed();
		const recipeType = Number(appsmith.store.RecipeTypeDropDown);
		const recipeData = await GetProductionRecipeForView.run();
		const weightUnit=appsmith.store.SIZE_UNIT1;
		const volumeUnit=appsmith.store.SIZE_UNIT2;
		if(CreateEditCS.RecipeEditButtonClick) {
			//console.log(CreateEditCS.RecipeEditButtonClick);			
			mainMaterialBoneDry = Number(recipeData.RECIPE_SIZE).toFixed();
			targetDryContent = Number(recipeData.DRY_CONTENT);
			let calculatedField = {};
			calculatedField.sv_mainMtrlBoneDry = Number(recipeData.RECIPE_SIZE);
			await storeValue("calculatedField", calculatedField, true);
		}		
		//await GetProperty.run();
		//await GetMaterial.run();
		//await GetProductGrades.run();
		//const propertyCode = await GetProperty.data;
		//const materialCode = await GetMaterial.data;
		//const productGrades = await GetProductGrades.data;
		//let columnConfig = await GetRecipeColumnConfig.run();
		postWindowMessage({
				message: "EDIT",
				data : {"BASEURL": appsmith.store.baseurl, "RECIPE_NUMBER": appsmith.URL.queryParams.rno, "RECIPE_SET_NUMBER": 20136, "MACHINE_GROUP": recipeData.MACHINE_GROUP, "RECIPE_CLASS": recipeData.RECIPE_CLASS, "RESOURCE_SELECT": recipeData.MACHINE_GROUP, "TARGET_DRY_CONTENT": targetDryContent, "MAIN_MATERIAL_BONE_DRY": mainMaterialBoneDry, "RECIPE_TYPE": recipeType,"WEIGHT_UNIT": weightUnit,"VOLUME_UNIT": volumeUnit}
			}, 'Iframe1', '*');
	},
	
	tabulatorOperations: async () => {
		var messageReceived = Iframe1.message;
		if(messageReceived.Message?.rowData && messageReceived.Message?.tableData) {
			storeValue('iFrame_RW', messageReceived.Message.rowData);
			storeValue('iFrame_TBL', messageReceived.Message.tableData);
		}
		if(messageReceived.messageEmitterName === 'VIEW') {
			TabulatorOperations.RedirectToAssociateRecipe(messageReceived.Message.rowData);
		} else if(messageReceived.messageEmitterName === 'CREATE') {
			storeValue('SV_TBL', messageReceived.Message.tableData);
			CreateEditCS.SaveRecipe();
		} else if(messageReceived.messageEmitterName === 'CALCULATED_VALUE') {
			let calculatedField = {};
			calculatedField.sv_mainMtrlBoneDry = messageReceived.Message;
			storeValue("calculatedField", calculatedField, true);
		}		
	},
	
	//View Start
	RedirectToAssociateRecipe: (message) => {
		storeValue("recipeNumberView", message.ASSOCIATE_RECIPE_NUMBER, true);				
		navigateTo('CreateRecipeCS', {"RecipeAction" : "Edit"}, 'NEW_WINDOW');
	}
	//View End
}