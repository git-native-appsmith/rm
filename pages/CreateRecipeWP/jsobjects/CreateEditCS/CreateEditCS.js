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
  SaveRecipe : () => {
		debugger
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		if(appsmith.URL.queryParams.RecipeAction == "Edit") {
			const recipeCass = appsmith.store.RecipeClassDropDown;
			if(appsmith.store.recipeStatus == 'N' || appsmith.store.recipeStatus == 'P') {
				 if(recipeCass == "WP") {
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
				  if(recipeCass == "WP") {
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
						 if(appsmith.store.RecipeClassDropDown=="WP"){
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
						storeValue('errorFlag',2,true) 
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
		GetIntermediateMaterial.run();
		showModal('IntermediateMaterialModal');	
	},
	IntermediateMaterialOnRowSelected: () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		RecipeClassTypeValidIntMat.run((result) => {
	      if(result) {
						storeValue('InterMaterial',MaterialTable.selectedRow.MATERIAL_CODE,false);
						storeValue('InterMaterialName',MaterialTable.selectedRow.MATERIAL_NAME_SHORT,false);
						closeModal('IntermediateMaterialModal');
						postWindowMessage({
							message: "IntermediateMaterialOnRowSelected",
							data : {"INTER_MEDIATE_MATERIAL_CODE":appsmith.store.InterMaterial}
						}, 'Iframe1', '*');
			} else {
					storeValue('errMsgStr','Recipe already exist for this material.',true);
					storeValue('errorFlag',2,true) 
					showModal('msgModal');
				}
			 },
			() => showAlert('Failed to Validate Create Recipe'));

	}
}