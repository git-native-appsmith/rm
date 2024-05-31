export default {
	onMPClick:()=>{
		if(appsmith.store.RecipeClassDropDown=='DG' || appsmith.store.RecipeClassDropDown=='EN'){
			storeValue('MassUpdateErrMsg','Recipe class is not implemented for mass update',true);
			showModal('msgModal');
			return
		}
		let selectedRows=RecipeTable.selectedRows;
		let selectedCnt=0
		var result = selectedRows.map(data => //(
																	{ 
			const arr = {};															
			if(data.RECIPE_STATUS =='A' || data.RECIPE_STATUS =='P' || data.RECIPE_STATUS =='N'|| data.RECIPE_STATUS =='H'){
				arr.SEQ_NO = data.RECIPE_NUMBER;
			}else{
				arr.SEQ_NO = "0";
				selectedCnt=selectedCnt+1
			}
			return arr;																		
		});
		if(RecipeTable.selectedRows.length == selectedCnt){
			storeValue('MassUpdateErrMsg','Select valid recipes for modification.',true);
			showModal('msgModal');
			return
		}
		storeValue('SV_RECIPE',result,true);
		if(ModificationNumberSearch.text==''){
				storeValue('MassUpdateErrMsg','Select modification number.',true);
				showModal('msgModal');
			//showAlert('Select Modification number.','error');
		}else{
			if(result.length == 0){
				storeValue('MassUpdateErrMsg','Please select atleast one recipe.',true);
				showModal('msgModal');
				//showAlert('Please Select Atleast One row.','error');
			}else{
				navigateTo('MassUpdateMR', {},'SAME_WINDOW');
			}
		}

	},
	onRecipeClick: async ()=>{
		if(appsmith.store.RecipeClassDropDown=='DG' || appsmith.store.RecipeClassDropDown=='EN'){
			storeValue('MassUpdateErrMsg','Recipe class is not implemented for mass update',true);
			showModal('msgModal');
			return
		}
		storeValue('RecipeClassDropDown',ClassSelect.selectedOptionValue,true);
		storeValue('RecipeClassName',ClassSelect.selectedOptionLabel,true);
		storeValue('RecipeTypeDropDown',RecipeTypeSelect.selectedOptionValue,true);
		storeValue('RecipeTypeName',RecipeTypeSelect.selectedOptionLabel,true)
		let selectedRows=RecipeTable.selectedRows;
		let selectedCnt=0
		var result = selectedRows.map(data => 
																	{ 
			const arr = {};															
			if(data.RECIPE_STATUS =='A' || data.RECIPE_STATUS =='P' || data.RECIPE_STATUS =='N' || data.RECIPE_STATUS =='H'){
				arr.SEQ_NO = data.RECIPE_NUMBER;
			}else{
				arr.SEQ_NO = "0";
				selectedCnt=selectedCnt+1
			}
			return arr;																		
		});
		
		if(RecipeTable.selectedRows.length == selectedCnt){
			storeValue('MassUpdateErrMsg','Select valid recipes for modification.',true);
			showModal('msgModal');
			return
		}
		storeValue('SV_RECIPE',result,true);
		if(ModificationNumberSearch.text==''){
			storeValue('MassUpdateErrMsg','Select modification number.',true);
			showModal('msgModal');
			//showAlert('Select Modification number.','error');
		}else{
			let isDiffModifNo = await IsDifferentModifNo.run( (result) => { 
					if(result == false) {
						storeValue('MassUpdateErrMsg','Planned and standard recipe should use different modification number.',true);
					}
				},() => showAlert('Failed to check IsDifferentModifNo.') );
				
			if(result.length == 0){
				storeValue('MassUpdateErrMsg','Please select atleast one recipe.',true);
				showModal('msgModal');
				//showAlert('Please Select Atleast One row.','error');
			}else if (IsDifferentModifNo.data == false){
					showModal('msgModal');
			} else {
				navigateTo('MassUpdateRecipe',{},'SAME_WINDOW');
			}
		}
	},
	onRecipeViewClick:()=>{
			GetFilteredRecipeView.run();
			GetRecipeItem.run();
			showModal('RecipeModal')
	}
}
