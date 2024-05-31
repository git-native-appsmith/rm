export default {
	DataSetPageLoad: () =>{
		storeValue('PropertyCode',undefined,true);
		if(appsmith.URL.queryParams.RecipeNumber != undefined){
			storeValue('urlRecipeNo',Number(appsmith.URL.queryParams.RecipeNumber),true);
			storeValue('ResourceGroupDropDown',undefined,true);
		  storeValue('RecipeClassDropDown',undefined,true);
			storeValue('RecipeSetDesc',undefined,true);
			storeValue('RecipeSetName',undefined,true);
			storeValue('RecipeSetNumber',undefined,true);
			storeValue('RecipeTypeDropDown',undefined,true);
			storeValue('PropertyCode',undefined,true);
			storeValue('urlRecipeNo',Number(appsmith.URL.queryParams.RecipeNumber),true);
		}
		if(appsmith.URL.queryParams.PROPERTY_CODE != undefined && 
			 appsmith.URL.queryParams.RECIPE_TYPE_NUMBER != undefined && 
			 appsmith.URL.queryParams.RCOUNT != undefined  ){
				GetStandardRecipeSet.run(()=>{
																		if(GetStandardRecipeSet.data.length>0){
																			storeValue('RecipeSetDesc',GetStandardRecipeSet.data[0].DESCRIPTION,true);
																			storeValue('RecipeSetName',GetStandardRecipeSet.data[0].NAME,true);
																			storeValue('RecipeSetNumber',GetStandardRecipeSet.data[0].RECIPE_SET_NUMBER,true);
																			storeValue('RecipeTypeDropDown',Number(appsmith.URL.queryParams.RECIPE_TYPE_NUMBER),true);
																			storeValue('PropertyCode',appsmith.URL.queryParams.PROPERTY_CODE,true);
																			storeValue('ResourceGroupDropDown',undefined,true);
		  																storeValue('RecipeClassDropDown',undefined,true);
																			storeValue('urlRecipeNo',undefined,true);
																			storeValue('RecipeSetDesc',GetStandardRecipeSet.data[0].DESCRIPTION,true);
																			storeValue('RecipeSetName',GetStandardRecipeSet.data[0].NAME,true);
																			storeValue('RecipeSetNumber',GetStandardRecipeSet.data[0].RECIPE_SET_NUMBER,true);
																			storeValue('RecipeTypeDropDown',Number(appsmith.URL.queryParams.RECIPE_TYPE_NUMBER),true);
																			storeValue('PropertyCode',appsmith.URL.queryParams.PROPERTY_CODE,true);
																		}
																	 });
		}
		storeValue('ProductGroupCode',undefined,true);
		storeValue('ProductgroupNumber',undefined,true);
		storeValue('ProductgroupName',undefined,true);
		storeValue('ProductCode',undefined,true);
		storeValue('ProductName',undefined,true);
		storeValue("IsCreate_RecipeLoadFirstTime",undefined,true);
		GetAllMachineGroups.run( () => {}, () => { 
			GetAllMachineGroups.run();
		});
	},
	PageLoadRecipe:() => {
		//use async-await or promises
		JSObject1.DataSetPageLoad();
		storeValue("InterMaterial",undefined,true);
		storeValue("ProductCode",undefined,true);
		storeValue("SV_TBL",[],true);
		storeValue("gradeIndependent",0,true);
		let defaultDropDownValue = {}
		if(appsmith.store.defaultDropDownValue == undefined || appsmith.store.defaultDropDownValue == "") {
			defaultDropDownValue.ResourceGroupDropDown = "";
			defaultDropDownValue.RecipeClassDropDown = "";
			defaultDropDownValue.RecipeTypeDropDown = "";
		} else {
			let temp = appsmith.store.defaultDropDownValue;
			defaultDropDownValue.ResourceGroupDropDown = temp.ResourceGroupDropDown;
			defaultDropDownValue.RecipeClassDropDown = temp.RecipeClassDropDown;
			defaultDropDownValue.RecipeTypeDropDown = temp.RecipeTypeDropDown;
		}
		storeValue("defaultDropDownValue",defaultDropDownValue,true);
		if(RecipeSetNameInput.text != "" && appsmith.store.RecipeSetName != undefined) {
				GetFilteredRecipe.run();
		}
	},
	RedirectToCreateRecipePage1: async () => {
		const modifNo = ModificationNumberSearch.text;
		if(modifNo == "" || modifNo.length == 0) {
			modificNoValidationmsg.isVisible = true;
			await storeValue('showErrorMessage',true,false);
		} else {
			modificNoValidationmsg.isVisible = false;
			 await storeValue('showErrorMessage',false,false);
			// First validate the Modific No then call API
			 await storeValue("recipeNumberView",RecipeTable.actionRow.RECIPE_NUMBER,true);
			await storeValue("recipeStatus",RecipeTable.actionRow.RECIPE_STATUS,true);
			await	storeValue("recipeClassCode",RecipeTable.actionRow.RECIPE_CLASS_CODE,true);
			await	storeValue("recipeMachineGroup",RecipeTable.actionRow.MACHINE_GROUP,true);
				if(RecipeTable.actionRow.RECIPE_CLASS_CODE=='CS'){
					navigateTo('CreateRecipeCS', {"RecipeAction":"Edit"},'SAME_WINDOW');
				}else if(RecipeTable.actionRow.RECIPE_CLASS_CODE== "MS" || RecipeTable.actionRow.RECIPE_CLASS_CODE== "SU"){
					navigateTo('CreateRecipeMS_SU',{"RecipeAction":"Edit"});
				}else if(RecipeTable.actionRow.RECIPE_CLASS_CODE== "RM" || RecipeTable.actionRow.RECIPE_CLASS_CODE== "CO" || RecipeTable.actionRow.RECIPE_CLASS_CODE== "ST"){
					navigateTo('CreateRecipeRM',{"RecipeAction":"Edit"},'SAME_WINDOW');
				}else if(RecipeTable.actionRow.RECIPE_CLASS_CODE== "PD"){
					navigateTo('CreateRecipePD',{"RecipeAction":"Edit"},'SAME_WINDOW');
				}else{
					navigateTo('CreateRecipe', {"RecipeAction":"Edit"},'SAME_WINDOW');
				}
		}
	},
	CreateRecipeButtonOnClick: () => {
		storeValue('ResourceGroupDropDown',ResourceSelect.selectedOptionValue,true);
    storeValue('RecipeClassDropDown',ClassSelect.selectedOptionValue,true);
    storeValue('RecipeTypeDropDown',RecipeTypeSelect.selectedOptionValue,true);
		storeValue('recipeNumberView',0,true);
		navigateTo('CreateRecipe',{"RecipeAction":"Create"});
	},
	DefaultValueClassDropDown: () => {
		if(ClassSelect.selectedOptionValue == null) {
			return appsmith.store.RecipeClassDropDown;
		} else {
			return ClassSelect.selectedOptionValue;
		}
	},
	RedirectToRecipeViewPage1: async() => {
			await JSObject1.viewPage();
	},
	viewPage: () => {
		const recipeSetNumber = appsmith.store.RecipeSetNumber;
		const recipeNumberView = RecipeTable.actionRow.RECIPE_NUMBER;
		const recipeClassCode = RecipeTable.actionRow.RECIPE_CLASS_CODE;
		const recipeMachineGroup = RecipeTable.actionRow.MACHINE_GROUP;
		 //storeValue("recipeNumberView",RecipeTable.actionRow.RECIPE_NUMBER,true);
			//storeValue("recipeClassCode",RecipeTable.actionRow.RECIPE_CLASS_CODE,true);
			//storeValue("recipeMachineGroup",RecipeTable.actionRow.MACHINE_GROUP,true);
			// storeValue("recipeStatus",RecipeTable.actionRow.RECIPE_STATUS,true);
			//navigateTo('ViewRecipe', {},'SAME_WINDOW');
		navigateTo('ViewRecipe',{"recipeNumberView":recipeNumberView,"RecipeSetNumber":recipeSetNumber,
"recipeMachineGroup":recipeMachineGroup,"recipeClassCode":recipeClassCode,"viewRecipeSet":true},'SAME_WINDOW');
	},
	OnViewRecipeMenuClick: () => {
		GetFilteredRecipeView.run();
		GetRecipeItem.run();
		showModal('RecipeModal')
	},
	ViewRecipeNewTab: () => {
		navigateTo('ViewRecipeDetail',{"rno":RecipeTable.actionRow.RECIPE_NUMBER,"rsno":appsmith.store.RecipeSetNumber},'NEW_WINDOW');
	},
	GetRecipeTypeUnit: async () =>{
		debugger
		storeValue('SIZE_UNIT1','',true);
		storeValue('SIZE_UNIT2','',true);
		await GetRecipeTypeUnit.run(()=>{
			storeValue('SIZE_UNIT1',GetRecipeTypeUnit.data.SIZE_UNIT1,true);
			storeValue('SIZE_UNIT2',GetRecipeTypeUnit.data.SIZE_UNIT2,true);
		})
	}
}