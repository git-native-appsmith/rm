export default {
	setTableData:()=>{
		debugger;
		let arrNew = [];
		let updatedRows=DataTable.updatedRows
		//let updatedRows=DataTable.selectedRows
		for(let i=0; i <updatedRows.length;i++){
			const arr_row={};
			let data=updatedRows[i].allFields;
			
			arr_row.RECIPE_NUMBER= data.RECIPE_NUMBER
			arr_row.RECIPE_ITEM_NUMBER= data.RECIPE_ITEM_NUMBER
			arr_row.TARGET_VALUE=(data.IN_VAL==null?data.TARGET_VALUE:data.IN_VAL)
			arr_row.MATERIAL_CODE=(data.NEW_MCODE==''?data.MATERIAL_CODE:data.NEW_MCODE)
			arr_row.PROPERTY_CODE=data.PROPERTY_CODE
			arr_row.TARGET_VALUE_M=(data.IN_VAL==null?0:1)
			arr_row.MATERIAL_CODE_M=(data.NEW_MCODE==null?0:1)
			arr_row.RECIPE_CLASS=appsmith.store.RecipeClassDropDown
			arr_row.MACHINE=appsmith.store.ResourceGroupDropDown
			arr_row.RECIPE_TYPE=appsmith.store.RecipeTypeDropDown
			arr_row.MODIFICATION_NO=appsmith.store.modificNo
			arr_row.RECIPESET=appsmith.store.RecipeSetName
			arr_row.ARP=data.IN_VAL
			arrNew.push(arr_row);
		}
		let selectedRows=arrNew;
		let result = selectedRows.map(data => (
																						{ 
																							RECIPE_NUMBER: data.RECIPE_NUMBER,
																						  RECIPE_ITEM_NUMBER: data.RECIPE_ITEM_NUMBER,
																						  //TARGET_VALUE:(data.IN_VAL==null?data.TARGET_VALUE:data.IN_VAL),
																						 	//MATERIAL_CODE:(data.NEW_MCODE==''?data.MATERIAL_CODE:data.NEW_MCODE),
																							TARGET_VALUE:data.TARGET_VALUE,
																						 	MATERIAL_CODE:data.MATERIAL_CODE,
																							PROPERTY_CODE:data.PROPERTY_CODE,
																						 	//TARGET_VALUE_M:(data.IN_VAL==null?0:1),
																							//MATERIAL_CODE_M:(data.NEW_MCODE==null?0:1),
																							TARGET_VALUE_M:data.TARGET_VALUE_M,
																							MATERIAL_CODE_M:data.MATERIAL_CODE_M,
																						 	RECIPE_CLASS:appsmith.store.RecipeClassDropDown,
																							MACHINE:appsmith.store.ResourceGroupDropDown,
																							RECIPE_TYPE:appsmith.store.RecipeTypeDropDown,
																							MODIFICATION_NO:appsmith.store.modificNo,
																							RECIPESET:appsmith.store.RecipeSetName,
																							ARP:data.IN_VAL
																					 	}
																					)
																 );
		let errorFlag_ARP=0,errorFlag_value=0;
		for(let i=0; i < result.length;i++){
			if(result[i].TARGET_VALUE != null){
				var val = result[i].TARGET_VALUE;
				var floatValues =  /[+-]?([0-9]*[.])?[0-9]+/;
				 if (String(val).match(floatValues) && !isNaN(val)) {
					// your function
				}else{
					storeValue('MassUpdateMRErrMsg','Only numeric Or float value allowed in target value column.',true);
					showModal('msgModal');
					errorFlag_value=1;
					return;
				}
			}else{
				storeValue('MassUpdateMRErrMsg','Empty Or Null value in selected rows editable fields.',true);
				showModal('msgModal');
				return;
			}
		}
		if(errorFlag_value == 0 && errorFlag_ARP == 0){
			
		let arr=GetRecipeForAdd.data;
		storeValue('activeFlag',0,true);
		for(let i=0; i <arr.length;i++){
			if(arr[i].STATUS=='A'){
				storeValue('activeFlag',1,true);
			}
		}
			
			
		  storeValue('SV_RECIPEMASS',result,true)
			MassUpdateMP.run( () => {
									showAlert('Recipes Updated successfully');
									if(Number(appsmith.store.activeFlag)>0){
												navigateTo('MassUpdate',{})
											}else{
												GetModelData.run(()=>{
													if(GetModelData.data.length>0){
														showModal('Differ100Modal');
													}
												});
													GetMPDataLoad.clear()
													GetMPDataLoad.run()
											}
									},
									() => showAlert('Failed to Update Recipes'));
		}
	}
}