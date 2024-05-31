export default {
	onPageLoad: async () => {
		let baseURL = appsmith.store.baseurl;
		const resourceSelect = appsmith.store.ResourceGroupDropDown;
		const recipeType = Number(appsmith.store.RecipeTypeDropDown);
		//await GetProperty.run();
		//await GetMaterial.run();
		//let columnConfig = await GetRecipeColumnConfig.run();
		//const propertyCode = await GetProperty.data;
		//const materialCode = await GetMaterial.data;
		if(appsmith.URL.queryParams.RecipeAction == "Create") {
			postWindowMessage({
				message: "CREATE",
				data : {"BASEURL": baseURL, "RESOURCE_SELECT": resourceSelect, "TARGET_DRY_CONTENT": 0, "MAIN_MATERIAL_BONE_DRY": 0, "RECIPE_CLASS": appsmith.store.RecipeClassDropDown, "RECIPE_TYPE": recipeType}
			}, 'Iframe1', '*');
		}
		else if(appsmith.URL.queryParams.RecipeAction == "Edit") {
			postWindowMessage({
				message: "EDIT",
				data : {"BASEURL": baseURL, "RECIPE_NUMBER": appsmith.store.recipeNumberView, "RECIPE_SET_NUMBER": appsmith.store.RecipeSetNumber, "MACHINE_GROUP": appsmith.store.recipeMachineGroup, "RECIPE_CLASS": appsmith.store.recipeClassCode, "RESOURCE_SELECT": resourceSelect, "TARGET_DRY_CONTENT": 0, "MAIN_MATERIAL_BONE_DRY": 0, "RECIPE_TYPE": recipeType}
			}, 'Iframe1', '*');
		}		
	},

	tabulatorOperations: async () => {
		var receivedMessage = Iframe1.message;
		if(receivedMessage.Message?.rowData && receivedMessage.Message?.tableData) {
			storeValue('iFrame_RW', receivedMessage.Message.rowData);
			storeValue('iFrame_TBL', receivedMessage.Message.tableData);
		}
		if(receivedMessage.messageEmitterName === 'VIEW') {
			TabulatorOperations.RedirectToAssociateRecipe(receivedMessage.Message.rowData);
		} else if(receivedMessage.messageEmitterName === 'CREATE') {
			storeValue('SV_TBL', receivedMessage.Message.tableData);
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
				if(appsmith.store.ProductCode=='' && !Number(appsmith.store.gradeIndependent)){
					let errMsg='Please input product code.';
					storeValue('errMsgStr',errMsg,true);
					showModal('msgModalShow');
					return;
				}

				if(Number(appsmith.store.gradeIndependent)) {
					RecipeClassTypeValid.run( (result) => { 
						if(result == false) {
							storeValue('errMsgStr','Recipe already exist for this product and recipe type.',true);
							showModal('msgModalShow');
						} else {
							IsDifferentModifNo.run((isdiffModif) => {  
								if(isdiffModif) {
									CreateMSRecipeApi.run(() => {
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
						}
					}, () => {  showAlert("Failed to validate recipe", 'error'); } );
				} else {
					RecipeClassTypeValidForProduct.run( (result) => { 
						if(result == false) {
							storeValue('errMsgStr','Recipe already exist for this product and recipe type.',true);
							showModal('msgModalShow');
						} else { 
							IsDifferentModifNo.run((isdiffModif) => {  
								if(isdiffModif) {
									CreateMSRecipeApi.run(() => {
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
						} }, () => {  showAlert("Failed to validate recipe", 'error'); } );
				}
			} else if(appsmith.URL.queryParams.RecipeAction == "Edit") {
				if(appsmith.store.recipeStatus == 'N' || appsmith.store.recipeStatus == 'P') {
					await UpdateRecipeMS.run(() => {
						showAlert('Recipe saved successfully', 'success');
						CreateEditCS.OnPageLoad();
						//postWindowMessage({message: "Refresh"}, 'Iframe1', '*');
					}, () => {
						showAlert("Failed to save recipe", 'error');
					});
				} else if(appsmith.store.recipeStatus == 'A') {
					await SaveAsRecipeMS.run( (result) =>  {
						if(appsmith.store.EditFromProductFilter) {//
							storeValue("MasterRecipeNo",result,true);
							navigateTo('MassUpdate', {"RedirectFromEditRecipe":true},'SAME_WINDOW');
							showAlert('Recipe Save Successfully','success');
						}else {
							navigateTo('Recipe', {},'SAME_WINDOW');
							showAlert('Recipe Save Successfully','success');
						} }, () => { 
						showAlert("Failed to Save Recipe",'error');
					});
				}
			}
		} else if(receivedMessage.messageEmitterName === 'CALCULATED_VALUE') {
			let calculatedField = {};
			calculatedField.sv_mainMtrlBoneDry = receivedMessage.Message;
			storeValue("calculatedField", calculatedField, true);
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