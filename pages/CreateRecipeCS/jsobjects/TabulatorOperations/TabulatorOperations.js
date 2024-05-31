export default {
	onPageLoad: async () => {
		const baseURL = appsmith.store.baseurl;
		let targetDryContent = appsmith.store.calculatedField.sv_dc?Number(appsmith.store.calculatedField.sv_dc).toFixed() : 0;
		let mainMaterialBoneDry = Number(appsmith.store.calculatedField.sv_mainMtrlBoneDry).toFixed();
		let resourceSelect = appsmith.store.ResourceGroupDropDown;
		let recipeType = Number(appsmith.store.RecipeTypeDropDown);
		//await GetProperty.run();
		//await GetMaterial.run();
		//await GetProductGrades.run();
		//let columnConfig = await GetRecipeColumnConfig.run();
		//const propertyCode = await GetProperty.data;
		//const materialCode = await GetMaterial.data;
		//const productGrades = await GetProductGrades.data;
		if(appsmith.URL.queryParams.RecipeAction == "Create") {
			postWindowMessage({
				message: "CREATE",
				data : {"BASEURL": baseURL, "RESOURCE_SELECT": resourceSelect, "TARGET_DRY_CONTENT": targetDryContent, "MAIN_MATERIAL_BONE_DRY": mainMaterialBoneDry, "RECIPE_TYPE": recipeType,"RECIPE_CLASS": appsmith.store.recipeClassCode}
			}, 'Iframe1', '*');
		}
		else if(appsmith.URL.queryParams.RecipeAction == "Edit") {			
			postWindowMessage({
				message: "EDIT",
				data : {"BASEURL": baseURL, "RECIPE_NUMBER": appsmith.store.recipeNumberView, "RECIPE_SET_NUMBER": appsmith.store.RecipeSetNumber, "MACHINE_GROUP": appsmith.store.recipeMachineGroup, "RECIPE_CLASS": appsmith.store.recipeClassCode, "RESOURCE_SELECT": resourceSelect, "TARGET_DRY_CONTENT": targetDryContent, "MAIN_MATERIAL_BONE_DRY": mainMaterialBoneDry, "RECIPE_TYPE": recipeType}
			}, 'Iframe1', '*');
		}		
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
			if(appsmith.store.ProductCode==''){
				let errMsg='Please input product code.';
				storeValue('errMsgStr',errMsg,true);
				showModal('msgModalShow');
				TabulatorOperations.onPageLoad();
				return;
			}
			let modifStatus =  await GetModifStatus.run();
			if(modifStatus == "CO") {
				storeValue('errMsgStr','Modification number status is Closed.',true);
				showModal('msgModalShow');
				return;
			}
			if(modifStatus == "CN") {
				storeValue('errMsgStr','Modification number status is Cancelled.',true);
				showModal('msgModalShow');
				return;
			}
			if(appsmith.URL.queryParams.RecipeAction == "Create") {
				RecipeClassTypeValid.run((result) => {
	      	if(result) {
						IsDifferentModifNo.run((isdiffModif) => {  
							if(isdiffModif) {
								CreateCTSRecipeApi.run(() => {
									navigateTo('Recipe', {}, 'SAME_WINDOW');
									showAlert('Recipe created successfully', 'success');
								}, () => {
									showAlert("Failed to create Rrecipe", 'error');
								});
							} else {
						 		storeValue('CreateRecipeErrMsg', 'Planned and standard recipe should use different modification number', true);
						 		showModal('msgModalInfo');
							}
						}, () => showAlert('Failed to validate different modification number'));
					} else {
						storeValue('errMsgStr', 'Recipe already exist with same class and recipe type', true);
						storeValue('errorFlag', 1, true);
						showModal('msgModalShow');
				}
				}, () => showAlert('Failed to validate create recipe'));
			} else if(appsmith.URL.queryParams.RecipeAction == "Edit") {
				if(appsmith.store.recipeStatus == 'N' || appsmith.store.recipeStatus == 'P') {
					await UpdateRecipeCS.run(() => {
						showAlert('Recipe saved successfully', 'success');
						CreateEditCS.OnPageLoad();
						//postWindowMessage({message: "Refresh"}, 'Iframe1', '*');
					}, () => {
						showAlert("Failed to save recipe", 'error');
					});
				} else if(appsmith.store.recipeStatus == 'A') {
					await SaveAsRecipeCS.run( (result) =>  {
					if(appsmith.store.EditFromProductFilter) {//
						storeValue("MasterRecipeNo",result,true);
						navigateTo('MassUpdate', {"RedirectFromEditRecipe":true},'SAME_WINDOW');
						showAlert('Recipe Save Successfully','success');
					}else {
			    navigateTo('Recipe', {},'SAME_WINDOW');
						showAlert('Recipe Save Successfully','success');
					} } , () => { 
					showAlert("Failed to Save Recipe",'error');
					});
				}
			}
		} else if(messageReceived.messageEmitterName === 'CALCULATED_VALUE') {
			let calculatedField = {};
			calculatedField.sv_mainMtrlBoneDry = messageReceived.Message;
			storeValue("calculatedField", calculatedField, true);
		} else if(messageReceived.messageEmitterName === 'CHECK') {
			storeValue('SV_TBL', messageReceived.Message.tableData);
			RecipeComparisonUtil.OpenComparisionPopup();
		}
	},
	
	RedirectToAssociateRecipe: (message) => {
		navigateTo('ViewRecipeDetail', {"rno": message.ASSOCIATE_RECIPE_NUMBER, "rsno":appsmith.store.RecipeSetNumber}, 'NEW_WINDOW');
	},
	
	closeLoader: () => {
		postWindowMessage({
				message: "CLOSE_LOADER",
			}, 'Iframe1', '*');
	}	
}