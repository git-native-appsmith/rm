export default {
	onRecipeinfoClick: () => {
		showModal('RecipeOverModal');
		GetModelRecipe.run()
	},
	onRecipeSet: () =>{
		closeModal('RecipeOverModal');
		Checkbox1Copy.isChecked=false;
		chkPlan.isChecked=true;
		showModal('RecipeSetModal');
		let oprtype =7;
		if(chkPlan.isChecked){
			oprtype=7;
		}
		if(Checkbox1Copy.isChecked){
			oprtype=9;
		}
		if(chkPlan.isChecked && Checkbox1Copy.isChecked){
			oprtype=8;
		}

		storeValue('Recipe_Set_opr',oprtype);
		GetModelRecipeSet.run();
	},
	onRecipeHistoryP:()=>{
		let oprtype =7;
		if(chkPlan.isChecked){
			oprtype=7;
		}
		if(Checkbox1Copy.isChecked){
			oprtype=9;
		}
		if(chkPlan.isChecked && Checkbox1Copy.isChecked){
			oprtype=8;
		}
		storeValue('Recipe_Set_opr',oprtype);
		GetModelRecipeSet.run();
	},
	onSearchClick:()=>{
		if(MaterialTxt.text=="" && PropertyTxt.text==""){
			showAlert('Please Select Material or Property Code.','error');
			return;
		}else{
			GetMPData.clear();
			GetMPData.run();
		}
	},
	onEditClick:()=>{
		Resetobject.ResetInputWidget();
		resetWidget("ddlARP",true);
		resetWidget("txtTargetValue",true);
		showModal('MaterialPropertyModal');
	},
	onsearchMaterialClick:()=>{
		GetMaterialOfRecipe.run(); 
		showModal('MaterialModal');
	},
	onsearchPropertyClick:()=>{
		GetPropertyOfRecipe.run(); 
		showModal('PropertyModal')
	},
	onUpdateClickNew:()=>{
		let ddlSel =  ddlARP.selectedOptionValue; 
		if(txtTargetValue.text=='' && txtCode.text==''){
			storeValue('MassUpdateMRErrMsg','Please input material code or target value.',true);
			showModal('msgModal');
			return;
		}else{
			if(txtTargetValue.text!=''){
				var val = txtTargetValue.text;
				var floatValues =  /[+-]?([0-9]*[.])?[0-9]+/;
				if (String(val).match(floatValues) && !isNaN(val)) {
				}else{
					storeValue('MassUpdateMRErrMsg','Only numeric Or float value allowed in target value column.',true);
					showModal('msgModal');
					return;
				}
				if(ddlSel==undefined || ddlSel ==''){
					storeValue('MassUpdateMRErrMsg','Please select ARP value.',true);
					showModal('msgModal');
					return;
				}else{
					//TableDataJs.setTableData();
					GetMPDataLoad.clear();
					GetMPDataLoad.run();

				}
			}else{
				//TableDataJs.setTableData();
				GetMPDataLoad.clear();
				GetMPDataLoad.run();
			}
			closeModal('MaterialPropertyModal');
			Resetobject.ResetInputWidget();
			resetWidget("ddlARP",true);
			resetWidget("txtTargetValue",true);
		}
	},
	onSaveClickNew:async()=>{
		debugger
		let arrNew = [];
		let updatedRows=DataTable.updatedRows;
		//let selectedRows=DataTable.tableData;
		let selectedRows=DataTable.selectedRows;
		if(selectedRows.length <= 0){
			storeValue('MassUpdateMRErrMsg','Please select atleast one row item.',true);
			showModal('msgModal');
			return;
		}
		let modifStatus =  await GetModifStatus.run();
				if(modifStatus == "CO") {
					storeValue('MassUpdateMRErrMsg','Modification number status is Closed.',true);
					showModal('msgModal');
					return;
				}
				if(modifStatus == "CN") {
					storeValue('MassUpdateMRErrMsg','Modification number status is Cancelled.',true);
					showModal('msgModal');
					return;
				}
		for(let j=0;j <selectedRows.length;j++){
			const arr_row={};
			let selFlag=0
			let mat_code='';
			let inVal='';
			let mat_code_flag='';
			let inVal_flag='';
			for(let i=0; i <updatedRows.length;i++){
				let data=updatedRows[i].allFields;
				if(data.RECIPE_NUMBER===selectedRows[j].RECIPE_NUMBER && data.RECIPE_ITEM_NUMBER===selectedRows[j].RECIPE_ITEM_NUMBER){
					selFlag=1;
					mat_code=(data.NEW_MCODE==null||data.NEW_MCODE=='')?data.MATERIAL_CODE:data.NEW_MCODE
					inVal=(data.IN_VAL==null||data.IN_VAL=='')?data.TARGET_VALUE:data.IN_VAL
					mat_code_flag=data.NEW_MCODE
					inVal_flag=data.IN_VAL
				}
			}
			if(selFlag==1){
				arr_row.RECIPE_NUMBER= selectedRows[j].RECIPE_NUMBER
				arr_row.RECIPE_ITEM_NUMBER= selectedRows[j].RECIPE_ITEM_NUMBER
				arr_row.TARGET_VALUE=inVal
				arr_row.MATERIAL_CODE=mat_code
				arr_row.PROPERTY_CODE=selectedRows[j].PROPERTY_CODE
				arr_row.TARGET_VALUE_M=(inVal==null?0:1)
				arr_row.MATERIAL_CODE_M=(mat_code==null?0:1)
				arr_row.RECIPE_CLASS=appsmith.store.RecipeClassDropDown
				arr_row.MACHINE=appsmith.store.ResourceGroupDropDown
				arr_row.RECIPE_TYPE=appsmith.store.RecipeTypeDropDown
				arr_row.MODIFICATION_NO=appsmith.store.modificNo
				arr_row.RECIPESET=appsmith.store.RecipeSetName
				arr_row.ARP=selectedRows[j].IN_VAL
			}else{
				if(appsmith.store.RecipeClassDropDown=='RM' || appsmith.store.RecipeClassDropDown=='PD' || appsmith.store.RecipeClassDropDown=='CO' || appsmith.store.RecipeClassDropDown=='ST'){
					await storeValue('AllCode',selectedRows[j].NEW_MCODE,true)
					await storeValue('rowFun',selectedRows[j].RECIPE_FUNCTION,true)
					let propCode= appsmith.store.Recipe_Prop;
					await GetPropertyUnitAll.run((result) => {
					if(propCode.length>0){
							propCode=propCode+','+result.PROPERTY_CODE
						}else{
							propCode=result.PROPERTY_CODE
						}
					})
					await storeValue('Recipe_Prop',propCode,true)
				}
				
				arr_row.RECIPE_NUMBER= selectedRows[j].RECIPE_NUMBER
				arr_row.RECIPE_ITEM_NUMBER= selectedRows[j].RECIPE_ITEM_NUMBER
				arr_row.TARGET_VALUE=(selectedRows[j].IN_VAL==null?selectedRows[j].TARGET_VALUE:selectedRows[j].IN_VAL)
				arr_row.MATERIAL_CODE=(selectedRows[j].NEW_MCODE==''?selectedRows[j].MATERIAL_CODE:selectedRows[j].NEW_MCODE)
				arr_row.PROPERTY_CODE=selectedRows[j].PROPERTY_CODE
				arr_row.TARGET_VALUE_M=(selectedRows[j].IN_VAL==null?0:1)
				arr_row.MATERIAL_CODE_M=(selectedRows[j].NEW_MCODE==null?0:1)
				arr_row.RECIPE_CLASS=appsmith.store.RecipeClassDropDown
				arr_row.MACHINE=appsmith.store.ResourceGroupDropDown
				arr_row.RECIPE_TYPE=appsmith.store.RecipeTypeDropDown
				arr_row.MODIFICATION_NO=appsmith.store.modificNo
				arr_row.RECIPESET=appsmith.store.RecipeSetName
				arr_row.ARP=selectedRows[j].IN_VAL
			}
			arrNew.push(arr_row);
		}
		let result = arrNew.map(data => (
			{ 
				RECIPE_NUMBER: data.RECIPE_NUMBER,
				RECIPE_ITEM_NUMBER: data.RECIPE_ITEM_NUMBER,
				TARGET_VALUE:data.TARGET_VALUE,
				MATERIAL_CODE:data.MATERIAL_CODE,
				PROPERTY_CODE:data.PROPERTY_CODE,
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
			MassUpdateMP.run((result) => {
				showAlert('Recipes Updated successfully');
				console.log(JSON.stringify(result));
				let recipeRef= appsmith.store.Recipe_Sel;
				let recipeUpdate= result;
				for(let  i=0; i <recipeRef.length;i++){
					for(let  j=0; j <recipeUpdate.length;j++){
						if(recipeRef[i].SEQ_NO==recipeUpdate[j].RECIPE_NUMBER){
							recipeRef[i].SEQ_NO=recipeUpdate[j].RECIPE_NUMBER_NEW;
						}
					}
				}
				storeValue('Recipe_Sel',recipeRef,true);
				GetModelData.run(()=>{
					if(GetModelData.data.length>0){
						showModal('Differ100Modal');
					}
				});
				GetMPDataLoad.clear()
				GetMPDataLoad.run()
			},
			() => showAlert('Failed to Update Recipes'));
		}

		return;
	},
	onRowMaterial: async ()=>{
		let errorFlag_value=0;
		await isMaterialExist.run((result) => {
			if(result[0].CNT==0){
				storeValue('MassUpdateMRErrMsg','Input material does not exist',true);
				showModal('msgModal');
				errorFlag_value=1;
				return;
			}
		})
		if(appsmith.store.RecipeClassDropDown=='RM' || appsmith.store.RecipeClassDropDown=='PD' || appsmith.store.RecipeClassDropDown=='CO' || appsmith.store.RecipeClassDropDown=='ST'){
			let propCode= appsmith.store.Recipe_Prop;
			 await GetPropertyUnit.run((result) => {
				//console.log(JSON.stringify(result));
				if(propCode.length>0){
					propCode=propCode+','+result.PROPERTY_CODE
				}else{
					propCode=result.PROPERTY_CODE
				}
			})
			storeValue('Recipe_Prop',propCode,true)				
		}
	},
	onRowSelFun:()=>{
		return DataTable.updatedRow.RECIPE_FUNCTION.trim()
	},
	onRowSelMat:()=>{
		return DataTable.updatedRow.NEW_MCODE.trim()
	}
}