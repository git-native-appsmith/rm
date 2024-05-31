export default {
	OnChangeFunctionDropDown: async () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		//showAlert(JSON.stringify(editedActionRow));
		await GetPropertyUnit.run( (result) => {
			if(result) {
				//showAlert(JSON.stringify(result));
				var editedActionRow=SetPropertyUnit.EditedActionRow();
				editedActionRow.data.PROPERTY_CODE=result.PROPERTY_CODE;
				editedActionRow.data.UNIT=result.UNIT;
				let tbl=appsmith.store.SV_TBL || [];
				if(tbl[editedActionRow.index] == undefined){
					tbl.push(editedActionRow.data);
				}else{
					//showAlert(JSON.stringify(editedActionRow.data));
					tbl[editedActionRow.index] = editedActionRow.data;
				}
				storeValue('SV_TBL',tbl,true);
			}
		} );

	},
	FunctionCodeInput: () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		var editedActionRow=SetPropertyUnit.EditedActionRow();
		return editedActionRow.data.RECIPE_FUNCTION;
	},
	MaterialCodeInput: () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		var editedActionRow=SetPropertyUnit.EditedActionRow();
		return editedActionRow.data.MATERIAL_COMMAND_CODE;
	},
	EditedActionRow: () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		var editedActionRow=Tabulator2.actionRowWithIndex; 
		if(appsmith.store.RecipeClassDropDown=="RM" || appsmith.store.RecipeClassDropDown=="CO" || appsmith.store.RecipeClassDropDown=="ST"){
			editedActionRow=Tabulator1.actionRowWithIndex; 
		}else if(appsmith.store.RecipeClassDropDown=="PD"){
			editedActionRow=Tabulator2.actionRowWithIndex; 
		}else if(appsmith.store.RecipeClassDropDown=="CS"){
			editedActionRow=Tabulator3.actionRowWithIndex; 
		}else if(appsmith.store.RecipeClassDropDown=="MS" || appsmith.store.RecipeClassDropDown=="SU"){
			editedActionRow=Tabulator4.actionRowWithIndex; 
		}
		return editedActionRow;
	},

	SetPropertyUnitOnFctChange: () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		var editedActionRow=SetPropertyUnit.EditedActionRow();
		if(editedActionRow.data.RECIPE_ITEM_TYPE=='DOS') {
			SetPropertyUnit.OnChangeFunctionDropDown()
		} else {
			JSObject4.setSV_TBL();
		}
	},
	getPropertMaterialAPIInput: () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		var actionRow = Tabulator2.actionRow;
		if(appsmith.store.RecipeClassDropDown=="RM" || appsmith.store.RecipeClassDropDown=="CO" || appsmith.store.RecipeClassDropDown=="ST"){
			actionRow=Tabulator1.actionRow; 
		}else if(appsmith.store.RecipeClassDropDown=="PD"){
			actionRow=Tabulator2.actionRow; 
		}
		if(actionRow.RECIPE_ITEM_TYPE=='DOS'){
			return 1;
		}else{
			return 2;
		}
	},
	ProductGroupBind: async () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		await SetPropertyUnit.StoreProductGrouptData1();
	},
	StoreProductGrouptData1: () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		storeValue('ProductGroupCode',Table2.selectedRow.PRODUCT_GRP_NUMBER,true);
		storeValue('ProductgroupNumber',Table2.selectedRow.PRODUCT_GRP_NUMBER_KEY,true);
		storeValue('ProductgroupName',Table2.selectedRow.NAME,true);
		closeModal('ProductGroupModal');
	},
	ProductCodeBind: async () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		if(appsmith.store.PopupOpenFrom == "Header") {
			await SetPropertyUnit.StoreProductCodetData();
		} else if(appsmith.store.PopupOpenFrom == "RecipeItemRow") {
			JSObject4.onCoatClick();
			closeModal('ProductCodeModal');
		}
	},
	StoreProductCodetData: () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		RecipeClassTypeValidForProduct.run((result) => {
	      if(result) {
		  		storeValue('ProductCode',Table1.selectedRow.PRODUCT_CODE,true);
					storeValue('ProductName',Table1.selectedRow.PRODUCT_NAME_SHORT,true);
					closeModal('ProductCodeModal');
		  } else {
					 storeValue('errMsgStr','Recipe already exist with Same Class and Recipe Type.',true);
					 storeValue('errorFlag',1,true)
					 showModal('msgModalShow');
				}
			 },
			() => showAlert('Failed to Validate Create Recipe'));
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
	OpenProductCodeOrMaterialPopup: () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		var actionRow = Tabulator3.actionRow;
		if(actionRow.RECIPE_FUNCTION == 'BP') {
			storeValue("PopupOpenFrom","RecipeItemRow",true);
			showModal('ProductCodeModal');
		} else if(actionRow.RECIPE_FUNCTION == 'AB') {
			if(appsmith.URL.queryParams.RecipeAction == "Edit") {
				if(GetMaterial.data == undefined || GetMaterial.data.length <= 0) {
					GetMaterial.run();
				}
			} else {
				GetMaterial.run();
			}
			showModal('MaterialModal');
		}
	},
	clearFCT_Data: () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		var editedActionRow=Tabulator3.actionRowWithIndex;
		if(appsmith.store.RecipeClassDropDown=="CS") {
			editedActionRow.data.TARGET_VALUE='';
			editedActionRow.data.IN_VAL='';
			editedActionRow.data.INPUT_MINIMUM='';
			editedActionRow.data.INPUT_MAXIMUM='';
			editedActionRow.data.CALC_MINIMUM='';
			editedActionRow.data.CALC_MAXIMUM='';
			editedActionRow.data.COAT_ID='';
			editedActionRow.data.COATING='';
		}
		let tbl=appsmith.store.SV_TBL || [];
		if(tbl[editedActionRow.index] == undefined){
			tbl.push(editedActionRow.data);
		}else{
			//showAlert(JSON.stringify(editedActionRow.data));
			tbl[editedActionRow.index] = editedActionRow.data;
		}
		storeValue('SV_TBL',tbl,true);
	},
	IntermediateMaterialOnRowSelected1: () => {
		RecipeClassTypeValidIntMat.run((result) => {
	      if(result) {
		  		  storeValue('InterMaterial',MaterialTable.selectedRow.MATERIAL_CODE,false);
						storeValue('InterMaterialName',MaterialTable.selectedRow.MATERIAL_NAME_SHORT,false);
						closeModal('IntermediateMaterialModal');
		  } else {
					 storeValue('errMsgStr','Recipe already exist with Same Class and Recipe Type.',true);
					 storeValue('errorFlag',1,true)
					 showModal('msgModalShow');
				}
			 },
			() => showAlert('Failed to Validate Create Recipe'));

	}
}