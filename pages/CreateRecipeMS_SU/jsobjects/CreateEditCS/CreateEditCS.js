export default {
	OnPageLoad: async () => {
		let tbl=[];
		let reset=0;
		storeValue("IsCreate_RecipeLoadFirstTime",true,true);
		
		if(appsmith.URL.queryParams.RecipeAction == "Create") {
			let calculatedField = { "sv_mainMtrlBoneDry":reset,"sv_spwt":reset,"sv_gbt":reset,"sv_per":reset,"sv_totalWeightWet":reset,"sv_totalVolume":reset,"sv_filler":reset};
			storeValue('SV_TBL',tbl,true);
			storeValue("calculatedField",calculatedField,true);
			storeValue("Remark","",true);
			storeValue("ProductCode","",true);
			storeValue("ProductName","",true);
		}
		TabulatorOperations.onPageLoad();
	},
	getRecipeClass: () => {
		let recipeClassCode = '';
		const classlist = ["MS","SU"];
		switch(appsmith.store.RecipeClassDropDown) {
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
	},
	BindProductCode: () => {
		if(appsmith.URL.queryParams.RecipeAction == "Create" && Number(appsmith.store.gradeIndependent) ) {
			return '*';
		} else{
			return appsmith.store.ProductCode;
		}
		
	},
	BindProductCodeName: () => {
		if(appsmith.URL.queryParams.RecipeAction == "Create" && Number(appsmith.store.gradeIndependent) ) {
			return '*';
		}else if(appsmith.URL.queryParams.RecipeAction == "Edit" && Number(appsmith.store.gradeIndependent)) {
			return '*';
		} else{
			return appsmith.store.ProductName;
		}
	}
}