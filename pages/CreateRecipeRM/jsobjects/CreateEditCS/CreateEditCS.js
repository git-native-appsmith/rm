export default {
	OnPageLoad: async () => {
		let reset=0;
		let resetCal=1000;
		storeValue("IsCreate_RecipeLoadFirstTime",true,true);
		if(appsmith.URL.queryParams.RecipeAction == "Create") {
			let calculatedField = { "sv_mainMtrlBoneDry":resetCal,"sv_spwt":reset,"sv_gbt":reset,"sv_dc":reset,"sv_tdc":reset,"sv_per":reset,"sv_totalWeightWet":reset,"sv_totalVolume":reset,"sv_filler":reset};
			storeValue("calculatedField",calculatedField,true);
			await storeValue("InterMaterial","",true);
			await storeValue("InterMaterialName","",true);
			await storeValue("Remark","",true);
			await storeValue("ProductCode","",true);
      await storeValue("ProductName","",true);
			await storeValue("MaxVolume","",true);	
			await storeValue("TRANSFER_OUTPUT_MAT",false,true);	
		}
		TabulatorOperations.onPageLoad();

	},
	getRecipeClass: () => {
		let recipeClassCode = 'RM';
		const classlist = ["CO","RM","ST"];
		switch(appsmith.store.RecipeClassDropDown) {
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
  SaveRecipe : async () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		if(appsmith.URL.queryParams.RecipeAction == "Edit") {
			const recipeCass = appsmith.store.RecipeClassDropDown;
			if(appsmith.store.recipeStatus == 'N' || appsmith.store.recipeStatus == 'P') {
				 if(recipeCass == "RM"||recipeCass == "CO"||recipeCass == "ST") {
					UpdateRecipe.run( () =>  { 
			    	CreateEditCS.OnPageLoad();
						showAlert('Recipe Save Successfully','success');
					} , () => { 
					showAlert("Failed to Save Recipe",'error');
					});
				}  else{
				showAlert('Recipe Class Not Implemented');
			  }
			 } else if(appsmith.store.recipeStatus == 'A') {
				  if(recipeCass == "RM"||recipeCass == "CO"||recipeCass == "ST") {
					SaveAsRecipe.run( (result) =>  {
					if(appsmith.store.EditFromProductFilter && recipeCass == "ST") {//
						storeValue("MasterRecipeNo",result,true);
						navigateTo('MassUpdate', {"RedirectFromEditRecipe":true},'SAME_WINDOW');
						showAlert('Recipe Save Successfully','success');
					}else {
			    navigateTo('Recipe', {},'SAME_WINDOW');
						showAlert('Recipe Save Successfully','success');
					} } , () => { 
					showAlert("Failed to Save Recipe",'error');
					});
				} else{
				showAlert('Recipe Class Not Implemented');
			  }
			 }
		} else if(appsmith.URL.queryParams.RecipeAction == "Create") {
			 RecipeClassTypeValid.run((result) => {
	      if(result) {
					IsDifferentModifNo.run( (isdiffModif) =>  {  
					if(isdiffModif) {
						 if(appsmith.store.RecipeClassDropDown=="RM" || appsmith.store.RecipeClassDropDown=="CO" || appsmith.store.RecipeClassDropDown=="ST"){
				CreateRecipeApi.run(()=>{ 
																	navigateTo('Recipe', {},'SAME_WINDOW');
																	showAlert('Recipe Create Successfully','success');
																	},()=>{ 
																					showAlert("Failed to create Recipe",'error');
														 						});
			}	else {
				showAlert('Recipe Class Not Implemented');
			   }
					} else {
						storeValue('CreateRecipeErrMsg','Planned and standard recipe should use different modification number.',true);
						storeValue('errorFlag',2,true); 
						showModal('msgModal');
					}
					} , () => showAlert('Failed to Validate Different Modif Number'));
		} else {
					 storeValue('errMsgStr','Recipe already exist with Same Class and Recipe Type.',true);
					 storeValue('errorFlag',2,true) 
					 showModal('msgModal');
				}
			 },
			() => showAlert('Failed to Validate Create Recipe'));
		}
	},
	modalProductGroupCode:()=>{
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		if(appsmith.store.RecipeClassDropDown=='ST'){
			if(GetProductGrades.data == undefined || GetProductGrades.data.length <= 0) {
					GetProductGrades.run();
			  }
				storeValue("PopupOpenFrom","Header",true);
				showModal('ProductCodeModal');
		}else{
			GetIntermediateMaterial.run();
			showModal('IntermediateMaterialModal');	
		}
	},
	IntermediateMaterialOnRowSelected: () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		RecipeClassTypeValidIntMat.run((result) => {
	      if(result) {
					if(appsmith.store.RecipeClassDropDown=="ST" ){
							storeValue('InterMaterial',Table1.selectedRow.PRODUCT_CODE,false);
							storeValue('InterMaterialName',Table1.selectedRow.PRODUCT_NAME_SHORT,false);
							closeModal('ProductCodeModal');
						}else{
							storeValue('InterMaterial',MaterialTable.selectedRow.MATERIAL_CODE,false);
							storeValue('InterMaterialName',MaterialTable.selectedRow.MATERIAL_NAME_SHORT,false);
							closeModal('IntermediateMaterialModal');
							postWindowMessage({
								message: "IntermediateMaterialOnRowSelected",
								data : {"INTER_MEDIATE_MATERIAL_CODE":appsmith.store.InterMaterial}
							}, 'Iframe1', '*');
						}
		  		  
		  } else {
					 if(appsmith.store.RecipeClassDropDown=="ST" ){
							storeValue('errMsgStr','Recipe already exist for this product and recipe type.',true);
						}else{
							storeValue('errMsgStr','Recipe already exist for this material.',true);
						}
					 storeValue('errorFlag',2,true) 
					 showModal('msgModal');
				}
			 },
			() => showAlert('Failed to Validate Create Recipe'));

	},
	ProductCodeOnRowSelected:() => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		RecipeClassTypeValid.run((result) => {
	      if(result) {
					if(appsmith.store.RecipeClassDropDown=="ST" ){
							storeValue('InterMaterial',Table1.selectedRow.PRODUCT_CODE,false);
							storeValue('InterMaterialName',Table1.selectedRow.PRODUCT_NAME_SHORT,false);
							closeModal('ProductCodeModal');
						}else{
							storeValue('InterMaterial',MaterialTable.selectedRow.MATERIAL_CODE,false);
							storeValue('InterMaterialName',MaterialTable.selectedRow.MATERIAL_NAME_SHORT,false);
							closeModal('IntermediateMaterialModal');
							postWindowMessage({
								message: "IntermediateMaterialOnRowSelected",
								data : {"INTER_MEDIATE_MATERIAL_CODE":appsmith.store.InterMaterial}
							}, 'Iframe1', '*');
						}
		  		  
		  } else {
					 if(appsmith.store.RecipeClassDropDown=="ST" ){
							storeValue('errMsgStr','Recipe already exist for this product and recipe type.',true);
						}else{
							storeValue('errMsgStr','Recipe already exist for this material.',true);
						}
					 storeValue('errorFlag',2,true) 
					 showModal('msgModal');
				}
			 },
			() => showAlert('Failed to Validate Create Recipe'));

	}
}