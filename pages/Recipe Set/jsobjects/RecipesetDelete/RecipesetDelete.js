export default {
	RecipeSetDelete: () => {
		console.log('Ajay')
	 var recipeSetCtg=Tabulator1.actionRow.CATEGORY;
	 if(recipeSetCtg=="Standard"){
			closeModal('DeleteModal');
			//showAlert('Standard Recipeset Can Not Be Deleted.','error');
		  storeValue('errMsgStr','Standard Recipeset can not be deleted.',true);
			showModal('msgModal');
		}
		else{
			DeleteRecipeSet.run((result) => {
		  closeModal('DeleteModal'); 
			console.log(String(result));
			if(String(result) =='1'){
					storeValue('errMsgStr','Recipeset associated with calculation plan.',true);			
					showModal('msgModal');
			}else{
				showAlert('RecipeSet deleted Successfully');
		  	GetFilteredRecipeSet.run();
			}
		},
	  () => showAlert('Failed to delete RecipeSet .','error'));
		}
 },
	callDeleteModal: () =>{
		const modifNo = ModificationNumberSearch.text;
		if(modifNo.length == 0 || modifNo == "") {
			storeValue('errMsgStr','Please input modification number.',true);			
			showModal('msgModal');
		}else {
			GetRecipesOfRecipeSet.run();
		getCalcPlanCnt.run();
		var recipeSetCtg=Tabulator1.actionRow.CATEGORY; 
		var recipeSetStatus=Tabulator1.actionRow.STATUS;
		if(recipeSetCtg=="Standard"){
			closeModal('DeleteModal');
			if(recipeSetStatus=="History"){
				//showAlert('Historic Recipeset Can Not Be Deleted.','error');
				storeValue('errMsgStr','Historic Recipeset can not be deleted.',true);
				showModal('msgModal');
			} else {
				storeValue('errMsgStr','Standard Recipeset can not be deleted.',true);
				showModal('msgModal');
				//showAlert('Standard Recipeset Can Not Be Deleted.','error');					
			}
		}
		else{
			StandardRecipeSetHistory.run((result)=>{
				if(String(result)!='0'){
					storeValue('errMsgStr','Historic Recipeset can not be deleted.',true);
					showModal('msgModal');
					//showAlert('Historic Recipeset Can Not Be Deleted.','error');			
				}else{
					showModal('DeleteModal'); 
				}
			});
		}
		}
	}
}