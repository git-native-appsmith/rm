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
			//CreateEditCS.loadProductGroupOption();
		}
		TabulatorOperations.onPageLoad();
	},
	getMachineGroupDDL:()=>{
		let machinegroup = GetFilteredRecipe.data.MACHINE_GROUP + "-" +GetFilteredRecipe.data.MACHINE_GROUP_NAME_SHORT
		return machinegroup
	},
	getRecipeClass: () => {
		let recipeClassCode = '';
		const classlist = ["MS","SU","BL","WS","PU","DR"];
		switch(GetFilteredRecipe?.data?.RECIPE_CLASS) {
			case classlist[0]:	
				recipeClassCode = "Machine Spec";
				break;
			case classlist[1]:	
				recipeClassCode = "Supplement";
				break;
			case classlist[2]:	
				recipeClassCode = "Bleaching";
				break;
			case classlist[3]:	
				recipeClassCode = "Washing";
				break;
			case classlist[4]:	
				recipeClassCode = "Pulp";
				break;
			case classlist[3]:	
				recipeClassCode = "Drying";
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
		//storeValue("PopupOpenFrom","Header",true);
		showModal('ProductCodeModal');
	},
	ProductCodeBind: async () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
			await CreateEditCS.StoreProductCodetData();
	},
	StoreProductCodetData: async () => {
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
	}
}