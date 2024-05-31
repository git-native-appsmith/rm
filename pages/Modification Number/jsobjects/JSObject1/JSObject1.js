export default {
	RecipeCheck:() => {
		RecipeDataCheck.run(()=>{
			if(RecipeDataCheck.data.length>0){
				showModal('RecipeWithInvalidDataModal');
			}
		});
	},
	ActivateModifNumber:()=>{
		RecipeDataCheck.run(()=>{
			if(RecipeDataCheck.data.length>0){
				showModal('RecipeWithInvalidDataModal');
			}else{
				ActivateModificationNumber.run( () => { 
																								GetFilteredModificationNumber.run();
																								storeValue('modificNo',undefined,true);
																								storeValue('uptime',undefined,true);
																								storeValue('modifStartDate',undefined,true);
																								closeModal('AssociateRecipesModal');
																								TransferDataToQdm.run(() => {},() => { TransferDataToQdm.run();})
																								}, () => showAlert('Activation Failed','error')
																			)}
		});
	},
	onRowSelect:(row)=>{
		storeValue('row',row.MODIF_STATUS);
		storeValue('actFlag',row.ACTDAYFLAG);
        },
	UnDoModifNumber: () => {
		UndoModificationNumber.run(() => {
			if(Number(appsmith.store.modificNo) == RecipeModificationsTable.triggeredRow.MODIF_NUMBER) {
				storeValue('modificNo',undefined,true);
			}
			
			GetFilteredModificationNumber.run();
				closeModal('UndoModal');													 },
															 () => showAlert('Undo Failed','error'));
	}
}