export default {
	OnPageLoad: async () => {
		let tbl=[];
		let reset=0;
		let resetCal=0;
		storeValue("IsCreate_RecipeLoadFirstTime",true,true);
		
		if(appsmith.URL.queryParams.RecipeAction == "Create") {
			let calculatedField = { "sv_mainMtrlBoneDry":resetCal,"sv_spwt":reset,"sv_gbt":reset,"sv_per":reset,"sv_totalWeightWet":reset,"sv_totalVolume":reset,"sv_filler":reset};
			storeValue('SV_TBL',tbl,true);
			storeValue("calculatedField",calculatedField,true);
			await storeValue("Remark","",true);
			await storeValue("ProductCode","",true);
			await storeValue("ProductName","",true);
		}
		await TabulatorOperations.onPageLoad();
	},
	modalProductGroupCode:()=>{
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		if(GetProductGrades.data == undefined || GetProductGrades.data.length <= 0) {
			GetProductGrades.run();
		}
		storeValue("PopupOpenFrom","Header",true);
		showModal('ProductCodeModal');
	},
	ProductCodeBind: async () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		if(appsmith.store.PopupOpenFrom == "Header") {
			await CreateEditCS.StoreProductCodetData();
		} else if(appsmith.store.PopupOpenFrom == "RecipeItemRow") {
			//CreateEditCS.onCoatClick();
			//closeModal('ProductCodeModal');
			//TabulatorOperations.onSelectMaterialData(); 
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
					 storeValue('errMsgStr','Recipe already exist for this product and recipe type.',true);
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
	CallAfterRecipeUpdate: () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		GetRecipeItem.run( () => {
			storeValue("SV_TBL", GetRecipeItem.data ,true);
		} );
	}
}