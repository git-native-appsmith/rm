export default {
	onPageLoad: async () => {
		const recipeData = await GetProductionRecipeForView.run();
		const targetDryContent = Number(recipeData.DRY_CONTENT, true);
		const mainMaterialBoneDry = Number(recipeData.RECIPE_SIZE, true);
		let recipeType = Number(appsmith.store.RecipeTypeDropDown);
		const weightUnit=appsmith.store.SIZE_UNIT1;
		const volumeUnit=appsmith.store.SIZE_UNIT2;
		//await GetProperty.run();
		//await GetMaterial.run();
		//let columnConfig = await GetRecipeColumnConfig.run();
		//const propertyCode = await GetProperty.data;
		//const materialCode = await GetMaterial.data;
		postWindowMessage({
			message: "EDIT",
			data : {"BASEURL": appsmith.store.baseurl, "RECIPE_NUMBER": appsmith.URL.queryParams.rno, "RECIPE_SET_NUMBER": 20136, "MACHINE_GROUP": recipeData.MACHINE_GROUP, "RECIPE_CLASS": recipeData.RECIPE_CLASS, "RESOURCE_SELECT": recipeData.MACHINE_GROUP, "TARGET_DRY_CONTENT": targetDryContent, "MAIN_MATERIAL_BONE_DRY": mainMaterialBoneDry, "RECIPE_TYPE": recipeType,"WEIGHT_UNIT": weightUnit,"VOLUME_UNIT": volumeUnit}
		}, 'Iframe1', '*');
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
			if(GetProductionRecipeForView.data.CLASSIFICATION == 'ST') {
				var dateEnd= new Date(DatePicker1.selectedDate.toString());//input date
				var dst = ((GetProductionRecipeForView.data.DATE_START.split(' ')[0]).split('-').reverse()).join('-') + ' ' + GetProductionRecipeForView.data.DATE_START.split(' ')[1];
				var dateStart = new Date(dst);
				if(dateEnd < dateStart){
					storeValue('errMsgStr',"Please select date greater than  date from.",true);
					showModal('msgModalShow');
				}else {
					SaveSTRecipe.run( () =>  {
						navigateTo('ProductionRecipeList', {},'SAME_WINDOW');
						showAlert('Recipe Save Successfully','success');
					} , () => { 
						showAlert("Failed to Save Recipe",'error');
					});
				}
			}else{
				if(DatePicker1.selectedDate == ""){
					//update-production-recipe
					UpdatePRRecipe.run( () => {showAlert('Recipe Save Successfully','success');CreateEditCS.OnPageLoad();},() => showAlert("Failed to Save Recipe",'error') );
				}else if(GetProductionRecipeForView.data.RECIPE_STATUS == 'A') {
					var rowslength = await CreateEditCS.ValidateEqualDate();
					if( rowslength > 0) {
						storeValue('CreateRecipeErrMsg',"Selected date should not be same as existing production recipe date start or date end.",true);
						showModal('msgModalInfo');
						return;
					}
					//save-production-recipe where user select the Date for PR recipe
					ValidateRecipeDateEnd.run( (result) => {  
						if(!result) {
							storeValue('CreateRecipeErrMsg',"Please select date greater than Standard Active Recipe date from.",true);
							showModal('msgModalInfo');
						} else {
							SavePRRecipe.run( () => { 
								showAlert('Recipe Save Successfully','success');
								navigateTo('ProductionRecipeList', {},'SAME_WINDOW'); },() => showAlert("Failed to Save Recipe",'error') );
						}
					}, () =>  showAlert("Failed to Validate Date.",'error'));

				} else if(GetProductionRecipeForView.data.RECIPE_STATUS == 'H') {
					var rowslength1 = await CreateEditCS.ValidateEqualDate();
					if( rowslength1 > 0) {
						storeValue('CreateRecipeErrMsg',"Selected date should not be same as existing production recipe date start or date end.",true);
						showModal('msgModalInfo');
						return;
					}
					// HERE WHEN USER WANT TO EDIT THE HISTORY RECIPE WITH DATE FIELD FILLED .THEN CALL API

					//Validation 1 . user selected date should be greater than ST-A start date and less than PR-A Date start 
					var dateEnd1 = new Date(DatePicker1.selectedDate.toString());//input date
					var recipeST_startDate = new Date((GetPRHistoricRecipe.data.filter(x => x.CLASSIFICATION == 'ST')[0]).DATE_START);
					var recipePR_startDate = new Date((GetPRHistoricRecipe.data.filter(x => x.CLASSIFICATION == 'PR' && x.STATUS == 'A')[0]).DATE_START);
					if(dateEnd1 < recipeST_startDate) {
						storeValue('CreateRecipeErrMsg',"Please select date greater than Standard Active Recipe date from.",true);
						showModal('msgModalInfo');
					} else if(dateEnd1 < recipePR_startDate){
						//means we need to create PR H recipe between ST-A and PR-A
						SavePRHistoryRecipe.run( () => { 
							showAlert('Recipe Save Successfully','success');
							//navigateTo('ProductionRecipeList', {},'SAME_WINDOW');
						},() => showAlert("Failed to Save Recipe",'error') );
					} else {
						// this will execute when selected date is > than PR-A recipe

					}
				}

			}

		} else if(receivedMessage.messageEmitterName === 'CALCULATED_VALUE') {
			let calculatedField = {};
			calculatedField.sv_mainMtrlBoneDry = receivedMessage.Message;
			storeValue("calculatedField", calculatedField, true);
		}		
	},

	//View Start
	RedirectToAssociateRecipe: (message) => {
		storeValue("recipeNumberView", message.ASSOCIATE_RECIPE_NUMBER, true);				
		navigateTo('CreateRecipeMS_SU', {"RecipeAction" : "Edit"}, 'NEW_WINDOW');
	},
	//View End
}