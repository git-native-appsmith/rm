export default {
	onAddRow:()=>{
		if(GrpAdd.text=='' || GrpAdd.text== null){
			showAlert('Please input group number.');
			return;
		}
		if(SeqAdd.text=='' || SeqAdd.text== null ){
			showAlert('Please input sequence number.');
			return;
		}else{
			if(GetDuplicateSeq.data.length >0){
				showAlert('Sequence number already exist in selected recipes.');
				return;
			}
		}
		if(appsmith.store.RecipeClassDropDown=='RM'	||	
			 appsmith.store.RecipeClassDropDown=='CO'	||	
			 appsmith.store.RecipeClassDropDown=='PD'	||	
			 appsmith.store.RecipeClassDropDown=='ST'){
			 let ddlDosCmd =  ddlDOSCMD.selectedOptionValue; 
			 if(ddlDosCmd==undefined || ddlDosCmd ==''){
			 	showAlert('Please select Dosing/Command.');
				return;
			}
			if(MaterialAdd.text == ''){
				showAlert('Please input material code.');
				return;
			}
		}
		let ddlfun =  ddlFunAdd.selectedOptionValue; 
		if(ddlfun==undefined || ddlfun ==''){
			showAlert('Please select function.');
			return;
		}
		if(appsmith.store.RecipeClassDropDown=='MS'	||	
			 appsmith.store.RecipeClassDropDown=='CS'	||	
			 appsmith.store.RecipeClassDropDown=='SU'	){
			 if(PropertyAdd.text == ''){
				showAlert('Please input property code.');
				return;
			}
		}
		if(TargetAdd.text == ''  || TargetAdd.text== null){
				showAlert('Please input target value.');
				return;
		}
		if(Number(TargetAdd.text) == 0 ){
				showAlert('Target value can not be zero.');
				return;
		}
		let arr=GetRecipeForAdd.data;
		let arrNew = [];
		console.log(JSON.stringify(arr));
		for(let i=0; i <arr.length;i++){
			const arr_row={};
			let opr=JSObject3.getOprtype();
			arr_row.RECIPE_NUMBER=arr[i].RECIPE_NUMBER;
			arr_row.TARGET_VALUE=TargetAdd.text;
			//arr_row.MATERIAL_CODE=(ddlDOSCMD.selectedOptionValue=='DOS'?MaterialAdd.text:PropertyAdd.text);
			arr_row.MATERIAL_CODE=(opr==1?MaterialAdd.text:PropertyAdd.text);
			arr_row.PROPERTY_CODE=(ddlDOSCMD.selectedOptionValue=='CMD'?MaterialAdd.text:PropertyAdd.text);
			arr_row.TARGET_VALUE_M=1;
			arr_row.RECIPE_CLASS=appsmith.store.RecipeClassDropDown;
			arr_row.MACHINE=appsmith.store.ResourceGroupDropDown;
			arr_row.RECIPE_TYPE=appsmith.store.RecipeTypeDropDown;
			arr_row.MODIFICATION_NO=appsmith.store.modificNo;
			arr_row.RECIPESET=appsmith.store.RecipeSetNumber;
			arr_row.ARP=arr[i].STATUS;
			if(arr[i].STATUS=='A'){
				storeValue('activeFlag',1,true);
			}
			arrNew.push(arr_row);
		}
		storeValue('SV_RECIPEMASSADD',arrNew,true);
		MassUpdateAdd.run(() => {
											closeModal('AddNewRow');
											showAlert('New row added successfully.');
											
											/*if(Number(appsmith.store.activeFlag)>0){
												navigateTo('MassUpdate',{})
											}else{*/
												GetModelData.run(()=>{
													if(GetModelData.data.length>0){
														showModal('Differ100Modal');
													}
												});
													GetMPDataLoad.clear();
													GetMPDataLoad.run();
											//}
										},() => showAlert('Failed to add recipes'));
	},
	onMaterialSelect:()=>{
		debugger
		let selRow=  DataTable.triggeredRowIndex;
		let mattable =  MaterialTblCopyCopy.selectedRow.MATERIAL_CODE; 
		DataTable.tableData[selRow].NEW_MCODE=mattable
	}
}