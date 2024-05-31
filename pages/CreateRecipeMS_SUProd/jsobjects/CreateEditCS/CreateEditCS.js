export default {
	OnPageLoad: async () => {
		storeValue("IsCreate_RecipeLoadFirstTime",true,true);
		const fileteredRecpData = await GetProductionRecipeForView.run(); 
		storeValue('SIZE_UNIT1',fileteredRecpData.SIZE_UNIT1,true);
		storeValue('SIZE_UNIT2',fileteredRecpData.SIZE_UNIT2,true);
		resetWidget('DatePicker1',false);
		TabulatorOperations.onPageLoad();
		},
	getRecipeClass: () => {
		let recipeClassCode = '';
		const classlist = ["MS","SU"];
		switch(GetProductionRecipeForView?.data?.RECIPE_CLASS) {
			case classlist[0]:	
				recipeClassCode = "Machine Spec";
				break;
			case classlist[1]:	
				recipeClassCode = "Supplement";
				break;
			default:
				recipeClassCode = "";
		}
		return recipeClassCode;
	},
	ProductCodeBind: async () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		if(appsmith.store.PopupOpenFrom == "RecipeItemRow") {
			closeModal('ProductCodeModal');
		}
	},
	SearchProductCodeApiInput: () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		if(appsmith.store.PopupOpenFrom == "Header") {
			return "NA";
		} else if(appsmith.store.PopupOpenFrom == "RecipeItemRow") {
			return "BP";
		} else {
			return "NA";
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
		closeModal('HistoricRecipeModal');
		navigateTo('CreateRecipeMS_SUProd', {"rno":Table1.triggeredRow.RECIPE_NUMBER},'SAME_WINDOW');
		CreateEditCS.OnPageLoad();
	}


}