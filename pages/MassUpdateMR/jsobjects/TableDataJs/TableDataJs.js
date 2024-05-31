export default {
	setTableData:()=>{
		//let dataRows = DataTable.tableData;
		let dataRows=DataTable.selectedRows;
		var result = dataRows.map(data => (
																						{ 
																							RECIPE_NUMBER: data.RECIPE_NUMBER,
																						  RECIPE_ITEM_NUMBER: data.RECIPE_ITEM_NUMBER,
																						  TARGET_VALUE:data.TARGET_VALUE,
																						 	MATERIAL_CODE:data.MATERIAL_CODE,
																							PROPERTY_CODE:data.PROPERTY_CODE,
																						 	TARGET_VALUE_M:(txtTargetValue.text==''?0:1),
																						 	MATERIAL_CODE_M:(txtCode.text==''?0:1),
																							RECIPE_CLASS:appsmith.store.RecipeClassDropDown,
																							MACHINE:appsmith.store.ResourceGroupDropDown,
																							RECIPE_TYPE:appsmith.store.RecipeTypeDropDown,
																							MODIFICATION_NO:appsmith.store.modificNo,
																							RECIPESET:appsmith.store.RecipeSetName,
																							ARP:data.IN_VAL
																						}
																					)
																 );
		
		storeValue('SV_RECIPEMASS',result,true);
		MassUpdateMP.run(() => {
											closeModal('MaterialPropertyModal');
											showAlert('Recipes Updated successfully');
											GetModelData.run(()=>{
												if(GetModelData.data.length>0){
													showModal('Differ100Modal');
												}
											});
											GetMPDataLoad.clear();
											GetMPDataLoad.run();
										},() => showAlert('Failed to Update Recipes')
									);
	}
}