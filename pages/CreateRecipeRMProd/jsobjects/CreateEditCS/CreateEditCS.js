export default {
	RecipeEditButtonClick : 0,
	OnPageLoad: async () => {
		storeValue("IsCreate_RecipeLoadFirstTime",true,true);
		storeValue('SIZE_UNIT1','',true);
		storeValue('SIZE_UNIT2','',true);
		const fileteredRecpData = await GetProductionRecipeForView.run(); 
		storeValue('SIZE_UNIT1',fileteredRecpData.SIZE_UNIT1,true);
		storeValue('SIZE_UNIT2',fileteredRecpData.SIZE_UNIT2,true);
		let calculatedField = {};
		calculatedField.sv_mainMtrlBoneDry=Number(fileteredRecpData.RECIPE_SIZE,true);
		calculatedField.sv_spwt=Number(fileteredRecpData.SPECIFIC_WEIGHT,true);	
		calculatedField.sv_gbt=Number(fileteredRecpData.BONEDRY_WGT_PER_VOLUME,true);
		calculatedField.sv_per=Number(fileteredRecpData.RECIPE_SIZE_IN_PER,true);
		calculatedField.sv_totalWeightWet=Number(fileteredRecpData.TOTAL_WEIGHT_WET,true);
		calculatedField.sv_totalVolume=Number(fileteredRecpData.BATCH_SIZE,true);	
		calculatedField.sv_filler=Number(fileteredRecpData.FILLER_CONTENT,true);
		calculatedField.sv_tdc=Number(fileteredRecpData.DRY_CONTENT_IN_PER,true);	
		calculatedField.sv_dc=Number(fileteredRecpData.DRY_CONTENT,true);	
		await storeValue("calculatedField",calculatedField,true);
		resetWidget('DatePicker1',false);
		TabulatorOperations.onPageLoad();
	},
	getRecipeClass: () => {
		let recipeClassCode = '';
		const classlist = ["CO","RM","ST"];
		switch(GetProductionRecipeForView?.data?.RECIPE_CLASS) {
			case classlist[0]:	
				recipeClassCode = "Coating";
				break;
			case classlist[1]:	
				recipeClassCode = "Raw Material";
				break;
			case classlist[2]:	
				recipeClassCode = "Stock";
				break;
			default:
				recipeClassCode = "";
		}
		return recipeClassCode;
	},
	SaveRecipe :async () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		if(GetProductionRecipeForView.data.CLASSIFICATION == 'ST') {
			var dateEnd= new Date(DatePicker1.selectedDate.toString());//input date
			var dst = ((GetProductionRecipeForView.data.DATE_START.split(' ')[0]).split('-').reverse()).join('-') + ' ' + GetProductionRecipeForView.data.DATE_START.split(' ')[1];
			var dateStart = new Date(dst);
			if(dateEnd <= dateStart){
				storeValue('CreateRecipeErrMsg',"Please select date greater than  date from.",true);
				showModal('msgModalInfo');
			}else {
				SaveSTRecipe.run( () =>  {
					navigateTo('ProductionRecipeList', {},'SAME_WINDOW');
					showAlert('Recipe Save Successfully','success');
				} , () => { 
					showAlert("Failed to Save Recipe",'error');
				});
			}
		}else {
			if(DatePicker1.selectedDate == ""){
				//update-production-recipe
				UpdatePRRecipe.run( () => {showAlert('Recipe Save Successfully','success');CreateEditCS.OnPageLoad();},() => showAlert("Failed to Save Recipe",'error') );
			}else if(GetProductionRecipeForView.data.RECIPE_STATUS == 'A') {
				//save-production-recipe where user select the Date for PR recipe
				var rowslength = await CreateEditCS.ValidateEqualDate();
				if( rowslength > 0) {
					storeValue('CreateRecipeErrMsg',"Selected date should not be same as existing production recipe date start or date end.",true);
					showModal('msgModalInfo');
					return;
				}
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
				// HERE WHEN USER WANT TO EDIT THE HISTORY RECIPE WITH DATE FIELD FILLED .THEN CALL API
				var rowslength1 = await CreateEditCS.ValidateEqualDate();
				if( rowslength1 > 0) {
					storeValue('CreateRecipeErrMsg',"Selected date should not be same as existing production recipe date start or date end.",true);
					showModal('msgModalInfo');
					return;
				}
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

	},
	ValidateEqualDate:async () => {
		var dateEnd1 = DatePicker1.selectedDate.toString();//input date
		if(GetPRHistoricRecipe.data == undefined) {
			await GetPRHistoricRecipe.run();
		}
		var sameDateEndRows = GetPRHistoricRecipe.data.filter(x => x.DATE_START == dateEnd1);
		return sameDateEndRows.length;
	},
	ValidateDate: () => {
		var dateEnd= new Date(DatePicker1.selectedDate.toString());//input date
		var dst = ((GetProductionRecipeForView.data.DATE_START.split(' ')[0]).split('-').reverse()).join('-') + ' ' + GetProductionRecipeForView.data.DATE_START.split(' ')[1];
		var dateStart = new Date(dst);
		var classification = GetProductionRecipeForView.data.CLASSIFICATION;
		if(classification == 'ST') {
			//here input date should be greater that date from
			if(dateEnd < dateStart){
				storeValue('CreateRecipeErrMsg',"Please select date greater than  date from.",true);
				showModal('msgModalInfo');
			}
		} else {
			ValidateRecipeDateEnd.run( (result) => {  
				if(!result) {
					storeValue('CreateRecipeErrMsg',"Please select date greater than Standard Active Recipe date from.",true);
					showModal('msgModalInfo');
				}
			}, () =>  showAlert("Failed to Validate Date.",'error'));
		}
	},
	RecipeClassification:() => {
		let recipeClassCode = '';
		const classlist = ["PN","PR","ST"];
		switch(GetProductionRecipeForView.data.CLASSIFICATION) {
			case classlist[0]:	
				recipeClassCode = "Planned";
				break;
			case classlist[1]:	
				recipeClassCode = "Production";
				break;
			case classlist[2]:	
				recipeClassCode = "Standard";
				break;
			default:
				recipeClassCode = "";
		}
		return recipeClassCode;
	},
	RecipeStatus:() => {
		let recipeClassCode = '';
		const classlist = ["A","H","N","P"];
		switch(GetProductionRecipeForView.data.RECIPE_STATUS) {
			case classlist[0]:	
				recipeClassCode = "Active";
				break;
			case classlist[1]:	
				recipeClassCode = "History";
				break;
			case classlist[2]:	
				recipeClassCode = "New";
				break;
			case classlist[3]:	
				recipeClassCode = "Planned";
				break;
			default:
				recipeClassCode = "";
		}
		return recipeClassCode;
	},
	EditHostoryRecipe: () => {
		this.RecipeEditButtonClick = 1;
		closeModal('HistoricRecipeModal');
		navigateTo('CreateRecipeRMProd', {"rno":Table1.triggeredRow.RECIPE_NUMBER},'SAME_WINDOW');
		CreateEditCS.OnPageLoad();		
	}
}