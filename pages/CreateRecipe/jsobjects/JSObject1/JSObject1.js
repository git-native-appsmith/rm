export default {
	OnPageLoad: async () => {
		//use async-await or promises
		console.log('page')
		CreateRecipeUtil.loadProductGroupOption();//CreateRecipeUtil.LoadRecipeTypeDropDown();
		let tbl=[];
		let reset=0;
		let resetCal=0;
		if(appsmith.store.RecipeClassDropDown=="RM" || appsmith.store.RecipeClassDropDown=="CO" || appsmith.store.RecipeClassDropDown=="ST" ||appsmith.store.RecipeClassDropDown=="PD")		 {
			resetCal=1000;
		}
		let defaultDropDownValue = {}
		defaultDropDownValue.ResourceGroupDropDown = appsmith.store.ResourceGroupDropDown;
		defaultDropDownValue.RecipeClassDropDown = appsmith.store.RecipeClassDropDown;
		defaultDropDownValue.RecipeTypeDropDown = appsmith.store.RecipeTypeDropDown;
		storeValue("defaultDropDownValue",defaultDropDownValue,true);
		storeValue("IsCreate_RecipeLoadFirstTime",true,true);
		if(appsmith.URL.queryParams.RecipeAction == "Edit") {
			GetRecipeItem1.run( () => {
				storeValue("SV_TBL", GetRecipeItem1.data ,true);
			} );
			
			GetFilteredRecipe.run( () => {
				 let dryContentSpecWeightLimitField = { "DC_IN_VAL":"","DC_IN_MIN":0,"DC_IN_MAX":0,"DC_CALC_MIN":0,"DC_CALC_MAX":0,"SW_IN_VAL":"","SW_IN_MIN":0,"SW_IN_MAX":0,"SW_CALC_MIN":0,"SW_CALC_MAX":0 };
				dryContentSpecWeightLimitField.DC_IN_VAL = GetFilteredRecipe.data.DC_IN_VAL;
				dryContentSpecWeightLimitField.DC_IN_MIN = Number(GetFilteredRecipe.data.DC_IN_MIN);
				dryContentSpecWeightLimitField.DC_IN_MAX = Number(GetFilteredRecipe.data.DC_IN_MAX);
				dryContentSpecWeightLimitField.DC_CALC_MIN = Number(GetFilteredRecipe.data.DC_CALC_MIN);
				dryContentSpecWeightLimitField.DC_CALC_MAX = Number(GetFilteredRecipe.data.DC_CALC_MAX);
				dryContentSpecWeightLimitField.SW_IN_VAL = GetFilteredRecipe.data.SW_IN_VAL;
				dryContentSpecWeightLimitField.SW_IN_MIN = Number(GetFilteredRecipe.data.SW_IN_MIN);
				dryContentSpecWeightLimitField.SW_IN_MAX = Number(GetFilteredRecipe.data.SW_IN_MAX);
				dryContentSpecWeightLimitField.SW_CALC_MIN = Number(GetFilteredRecipe.data.SW_CALC_MIN);
				dryContentSpecWeightLimitField.SW_CALC_MAX = Number(GetFilteredRecipe.data.SW_CALC_MAX);
				storeValue("Calc_dryContentSpecWeightLimitField",dryContentSpecWeightLimitField,true);
						let calculatedField = {};
						calculatedField.sv_mainMtrlBoneDry=Number(GetFilteredRecipe.data.RECIPE_SIZE,true);
						calculatedField.sv_spwt=Number(GetFilteredRecipe.data.SPECIFIC_WEIGHT,true);	
						calculatedField.sv_gbt=Number(GetFilteredRecipe.data.BONEDRY_WGT_PER_VOLUME,true);
						calculatedField.sv_per=Number(GetFilteredRecipe.data.RECIPE_SIZE_IN_PER,true);
						calculatedField.sv_totalWeightWet=Number(GetFilteredRecipe.data.TOTAL_WEIGHT_WET,true);
						calculatedField.sv_totalVolume=Number(GetFilteredRecipe.data.BATCH_SIZE,true);	
						calculatedField.sv_filler=Number(GetFilteredRecipe.data.FILLER_CONTENT,true);
						calculatedField.sv_tdc=Number(GetFilteredRecipe.data.DRY_CONTENT_IN_PER,true);	
						calculatedField.sv_dc=Number(GetFilteredRecipe.data.DRY_CONTENT,true);	
						storeValue("calculatedField",calculatedField,true);
						storeValue("RecipeClassDropDown",GetFilteredRecipe.data.RECIPE_CLASS,true);
						storeValue("RecipeClassDropDownName",CreateRecipeUtil.getRecipeClass(),true);
						storeValue("RecipeTypeDropDown",GetFilteredRecipe.data.RECIPE_TYPE_NUMBER,true); 
				    storeValue("RecipeTypeDropDownName",GetFilteredRecipe.data.RECIPETYPE_NAME,true);
						storeValue("ResourceGroupDropDown",GetFilteredRecipe.data.MACHINE_GROUP,true);
						storeValue("ResourceGroupDropDownName",GetFilteredRecipe.data.MACHINE_GROUP_NAME_SHORT,true); 
				    
			}, () => { }
			);
		}
		if(appsmith.URL.queryParams.RecipeAction == "Create") {
			let calculatedField = { "sv_mainMtrlBoneDry":resetCal,"sv_spwt":reset,"sv_gbt":reset,"sv_per":reset,"sv_totalWeightWet":reset,"sv_totalVolume":reset,"sv_filler":reset};
			storeValue('SV_TBL',tbl,true);
			storeValue("calculatedField",calculatedField,true);
			CreateRecipeUtil.loadProductGroupOption();
		}
	},
	DefaultTabulator1 : () => {
		if(appsmith.URL.queryParams.RecipeAction == "Edit") {
			return GetRecipeItem.data;
		} else {
		return [];//GetRecipeItem.data.filter( x => x.RECIPE_NUMBER == 0);
		}
	},
	SaveRecipe : () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		if(appsmith.URL.queryParams.RecipeAction == "Edit") {
			 if(appsmith.store.recipeStatus == 'N') {
				 	UpdateRecipe.run( () =>  { 
			    navigateTo('Recipe', {},'SAME_WINDOW');
			} , () => { 
			showAlert("Failed to Save Recipe",'error');
			});
			 } else if(appsmith.store.recipeStatus == 'A') {
					SaveAsRecipe.run( () =>  { 
			    navigateTo('Recipe', {},'SAME_WINDOW');
			} , () => { 
			showAlert("Failed to Save Recipe",'error');
			}); 
			 }
		} else if(appsmith.URL.queryParams.RecipeAction == "Create") {
			CreateRecipeApi.run( () =>  { 
			    navigateTo('Recipe', {},'SAME_WINDOW');
			} , () => { 
			showAlert("Failed to create Recipe",'error');
			});
		}
	},
	FormatRecipeItemInput: () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		let selectedrows = Tabulator1.editedRows;
		selectedrows.forEach( (x) => {
			if(x.RECIPE_NUMBER == ""){
			x.RECIPE_NUMBER = null;
			} else {
			x.RECIPE_NUMBER = Number(x.RECIPE_NUMBER);
			}
			if(x.RECIPE_ITEM_NUMBER == ""){
			x.RECIPE_ITEM_NUMBER = null;
			} else {
			x.RECIPE_ITEM_NUMBER = Number(x.RECIPE_ITEM_NUMBER);
			}
			if(x.GROUP_NUMBER == ""){
			x.GROUP_NUMBER = null;
			} else {
			x.GROUP_NUMBER = Number(x.GROUP_NUMBER);
			}
			if(x.SEQ_NO == ""){
			x.GROUP_NUMBER = null;
			} else {
			x.SEQ_NO = Number(x.SEQ_NO);
			}
			x.IS_DELETE = false;
			return x;
		});
		return selectedrows;
	},
	ClassInputForRecipeType: () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
	 return appsmith.URL.queryParams.RecipeAction == "Create" ? appsmith.store.RecipeClassDropDown : GetFilteredRecipe.data.RECIPE_CLASS;
  },
	MachineInputForRecipeType:() => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		return appsmith.URL.queryParams.RecipeAction == "Create" ? appsmith.store.Res : GetFilteredRecipe.data.MACHINE_GROUP;
	},
	RecipeNumberForColumnConfiguration: () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		return appsmith.URL.queryParams.RecipeAction == "Create" ? appsmith.store.Recipetyp : GetFilteredRecipe.data.RECIPE_TYPE_NUMBER;
	}
}