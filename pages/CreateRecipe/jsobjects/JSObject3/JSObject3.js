export default {
	SaveRecipe : () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		if(appsmith.URL.queryParams.RecipeAction == "Edit") {
			const recipeCass = GetFilteredRecipe.data.RECIPE_CLASS;
			 if(appsmith.store.recipeStatus == 'N' || appsmith.store.recipeStatus == 'P') {
				 if(recipeCass == "RM" || recipeCass == "CO" || recipeCass == "ST" ) {
				 	UpdateRecipe.run( () =>  { 
			    //navigateTo('Recipe', {},'SAME_WINDOW');
						JSObject3.CallAfterRecipeUpdate();
						showAlert('Recipe Saved Successfully','success');
					} , () => { 
					showAlert("Failed to Save Recipe",'error');
					});
				} else if(recipeCass == "PD") {
					UpdateRecipePD.run( () =>  { 
			    //navigateTo('Recipe', {},'SAME_WINDOW');
						JSObject3.CallAfterRecipeUpdate();
						showAlert('Recipe Save Successfully','success');
					} , () => { 
					showAlert("Failed to Save Recipe",'error');
					});
				} else if(recipeCass == "CS") {
					UpdateRecipeCS.run( () =>  { 
			    //navigateTo('Recipe', {},'SAME_WINDOW');
						JSObject3.CallAfterRecipeUpdate();
						showAlert('Recipe Save Successfully','success');
					} , () => { 
					showAlert("Failed to Save Recipe",'error');
					});
				} else if(recipeCass == "MS" || recipeCass == "SU") {
					UpdateRecipeMS.run( () =>  { 
			    //navigateTo('Recipe', {},'SAME_WINDOW');
						JSObject3.CallAfterRecipeUpdate();
						showAlert('Recipe Save Successfully','success');
					} , () => { 
					showAlert("Failed to Save Recipe",'error');
					});
				} else{
				showAlert('Recipe Class Not Implemented');
			  }
			 } else if(appsmith.store.recipeStatus == 'A') {
				 if(recipeCass == "RM" || recipeCass == "CO" || recipeCass == "ST" ) {
					SaveAsRecipe.run( () =>  { 
			    navigateTo('Recipe', {},'SAME_WINDOW');
						showAlert('Recipe Save Successfully','success');
					} , () => { 
					showAlert("Failed to Save Recipe",'error');
					});
			   } else if(recipeCass == "PD") {
					SaveAsRecipePD.run( () =>  { 
			    navigateTo('Recipe', {},'SAME_WINDOW');
						showAlert('Recipe Save Successfully','success');
					} , () => { 
					showAlert("Failed to Save Recipe",'error');
					});
				} else if(recipeCass == "CS") {
					SaveAsRecipeCS.run( () =>  { 
			    navigateTo('Recipe', {},'SAME_WINDOW');
						showAlert('Recipe Save Successfully','success');
					} , () => { 
					showAlert("Failed to Save Recipe",'error');
					});
				} else if(recipeCass == "MS" || recipeCass == "SU") {
					SaveAsRecipeMS.run( () =>  { 
			    navigateTo('Recipe', {},'SAME_WINDOW');
						showAlert('Recipe Save Successfully','success');
					} , () => { 
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
			} else if(appsmith.store.RecipeClassDropDown=="PD"){
				CreatePulpRecipeApi.run(()=>{ 
																		  navigateTo('Recipe', {},'SAME_WINDOW');
																			showAlert('Recipe Create Successfully','success');
																	},()=>{ 
																					showAlert("Failed to create Recipe",'error');
														 						});
			}	else if(appsmith.store.RecipeClassDropDown=="CS"){
				CreateCTSRecipeApi.run(()=>{ 
																	navigateTo('Recipe', {},'SAME_WINDOW');
																	showAlert('Recipe Create Successfully','success');
																	},()=>{ 
																					showAlert("Failed to create Recipe",'error');
														 						});
			}	else if(appsmith.store.RecipeClassDropDown=="MS" || appsmith.store.RecipeClassDropDown == "SU") {
				CreateMSRecipeApi.run(()=>{ 
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
						 showModal('msgModalInfo');
						 //showAlert('Planned and standard recipe should use different modification number');
					}
					} , () => showAlert('Failed to Validate Different Modif Number'));
		     
		} else {
					 storeValue('errMsgStr','Recipe already exist with Same Class and Recipe Type.',true);
					 storeValue('errorFlag',1,true)
					 showModal('msgModalShow');
				}
			 },
			() => showAlert('Failed to Validate Create Recipe'));
			
		}
	},
	DefaultTabulator2 : () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		if(appsmith.URL.queryParams.RecipeAction == "Edit") {
			return GetRecipeItem1.run();
		} else {
		//return GetRecipeItem1.run();//GetRecipeItem.data.filter( x => x.RECIPE_NUMBER == 0);
			return {
    "RECIPE_ITEM_NUMBER": null,
    "GROUP_NUMBER": null,
    "SEQ_NO": null,
    "MATERIAL_COMMAND_CODE": null,
    "RECIPE_ITEM_TYPE": null,
    "MATERIAL_COMMAND": null,
    "RECIPE_FUNCTION": null,
    "TARGET_VALUE_WEIGHT": null,
    "NID": null,
    "VALUE_PERCENTAGE": "",
    "VOLUME": "",
    "UNIT": null,
    "DC_CONCENTRATION": null,
    "SPECIFIC_WEIGHT": null,
    "FILLER": null,
    "RECIPE_NUMBER": null,
    "BALES": null,
    "LOSS_GROUP_NUMBER": null,
    "PROPERTY_CODE": null,
    "COMMAND_TYPE": null,
    "TARGET_VALUE": null,
    "COAT_ID": null,
    "COATING": null,
    "IN_VAL": null,
    "INPUT_MINIMUM": null,
    "INPUT_MAXIMUM": null,
    "CALC_MINIMUM": null,
    "CALC_MAXIMUM": null,
    "TARGET_V": null
  };

		}
	},
	UpdateRecipeApiInput: () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		 if(appsmith.URL.queryParams.RecipeAction == "Edit") { 
			 if(appsmith.store.RecipeClassDropDown=="RM" || appsmith.store.RecipeClassDropDown=="CO" || appsmith.store.RecipeClassDropDown=="ST") { 
				 return Tabulator1.editedRows;
			 }
		 }
	},
	CallAfterRecipeUpdate: () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		GetRecipeItem1.run( () => {
			storeValue("SV_TBL", GetRecipeItem1.data ,true);
		} );
	}
}