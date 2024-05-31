export default {
	onAddRow:async()=>{
		if(appsmith.store.RecipeClassDropDown=='RM'	|| appsmith.store.RecipeClassDropDown=='PD'	|| appsmith.store.RecipeClassDropDown=='SU'	||
			 appsmith.store.RecipeClassDropDown=='CO'	|| appsmith.store.RecipeClassDropDown=='CS'	|| appsmith.store.RecipeClassDropDown=='WP'	||
			 appsmith.store.RecipeClassDropDown=='PD'	|| appsmith.store.RecipeClassDropDown=='MS'	|| appsmith.store.RecipeClassDropDown=='PU'	||
			 appsmith.store.RecipeClassDropDown=='ST' ){
			if(GrpAdd.text=='' || GrpAdd.text== null){
				showAlert('Please input group number.');
				return;
			}
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
		if(appsmith.store.RecipeClassDropDown=='RM'	||	appsmith.store.RecipeClassDropDown=='WP'	||
			 appsmith.store.RecipeClassDropDown=='CO'	||	appsmith.store.RecipeClassDropDown=='PU'	||
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
		if(appsmith.store.RecipeClassDropDown=='MS'	|| appsmith.store.RecipeClassDropDown=='WS'	|| appsmith.store.RecipeClassDropDown=='BL'	||
			 appsmith.store.RecipeClassDropDown=='CS'	|| appsmith.store.RecipeClassDropDown=='DR'	||
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
		await GetPropertyUnit.run((result) => {
				storeValue('addRowProp',result.PROPERTY_CODE,true)
			}
		)
		let arr=GetRecipeForAdd.data;
		let arrNew = [];
		storeValue('activeFlag',0,true);
		debugger
		for(let i=0; i <arr.length;i++){
			const arr_row={};
			let opr=JSObject2.getOprtype();
			arr_row.RECIPE_NUMBER=arr[i].RECIPE_NUMBER;
			arr_row.TARGET_VALUE=TargetAdd.text;
			//arr_row.MATERIAL_CODE=(ddlDOSCMD.selectedOptionValue=='DOS'?MaterialAdd.text:PropertyAdd.text);
			arr_row.MATERIAL_CODE=(opr==1?MaterialAdd.text:PropertyAdd.text);
			arr_row.PROPERTY_CODE=(opr==1?PropertyAdd.text:MaterialAdd.text);
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
		MassUpdateAdd.run((result) => {
											closeModal('AddNewRow');
											showAlert('New row added successfully.');
											let recipeRef= appsmith.store.SV_RECIPE;
											let recipeUpdate= result;
											for(let  i=0; i <recipeRef.length;i++){
												for(let  j=0; j <recipeUpdate.length;j++){
													if(recipeRef[i].SEQ_NO==recipeUpdate[j].RECIPE_NUMBER){
														recipeRef[i].SEQ_NO=recipeUpdate[j].RECIPE_NUMBER_NEW;
													}
												}
											}
											storeValue('SV_RECIPE',recipeRef,true);
											//if(Number(appsmith.store.activeFlag)>0){
											//	navigateTo('MassUpdate',{})
											//}else{
												GetModelData.run(()=>{
													if(GetModelData.data.length>0){
														showModal('Differ100Modal');
													}
												});
													GetMassRecipeData.clear();
													GetMassRecipeData.run();
											//}
										},() => showAlert('Failed to add recipes'));
	},
	getOprtype: () => {
		let oprtype=1;
		if(appsmith.store.RecipeClassDropDown=='RM'	||	appsmith.store.RecipeClassDropDown=='WP'	||
			 appsmith.store.RecipeClassDropDown=='CO'	||	appsmith.store.RecipeClassDropDown=='PU'	||
			 appsmith.store.RecipeClassDropDown=='PD'	||	
			 appsmith.store.RecipeClassDropDown=='ST'){
			 let ddlDosCmd =  ddlDOSCMD.selectedOptionValue; 
			 if(ddlDosCmd=='DOS'){
			 	oprtype=1;
			  if(appsmith.store.RecipeClassDropDown=='WP' || appsmith.store.RecipeClassDropDown=='PU'){
					oprtype=9;
				}
			}
			if(ddlDosCmd=='CMD'){
			 	oprtype=2;
			}
			if(ddlDosCmd=='ENG'){
			 	oprtype=6;
			}
	}
		
		return oprtype;
},
	onAddModalClick: async ()=>{
		let storeArrAdd={};
		storeArrAdd.PropertyCodeAdd='';
		storeArrAdd.MaterialCodeAdd='';
		let modifStatus =  await GetModifStatus.run();
			if(modifStatus == "CO") {
				showAlert("Modification number status is Closed.",'error');
				return;
			}
			if(modifStatus == "CN") {
				showAlert("Modification number status is Cancelled.",'error');
				return;
			}
		storeValue('SV_reArrAdd',storeArrAdd,true);
		showModal('AddNewRow');
	},
	recipeFunction:()=>{
		let recipeClass= appsmith.store.RecipeClassDropDown
		let ddl=[];
		if(recipeClass=='WS'||recipeClass=='BL'||recipeClass=='DR'){
			ddl.push({"label":"Calculated","value":"CAL"});
			ddl.push({"label":"Constant","value":"CON"});
			ddl.push({"label":"Fixed","value":"FIX"}); 
			ddl.push({"label":"GESTR","value":"GESTR"}); 
			ddl.push({"label":"RIW","value":"RIW"});
			ddl.push({"label":"RIW/ST","value":"RIW/ST"});
			ddl.push({"label":"ROHP","value":"ROHP"});
			ddl.push({"label":"SOW","value":"SOW"});
			ddl.push({"label":"Strauf","value":"Strauf"});
			ddl.push({"label":"UNGES","value":"UNGES"});
			ddl.push({"label":"Input Pulp","value":"IP"});
		}
		if(recipeClass=='CS'){
				ddl.push({"label":"Above 100%","value":"AB"});
				//ddl.push({"label":"Base Paper","value":"BP"});
			}
		if(recipeClass=='WP'||recipeClass=='PU'){
			ddl.push({"label":"Constant","value":"CON"});
			ddl.push({"label":"Fixed","value":"FIX"}); 
		}
		if(recipeClass=='RM' || recipeClass=='CO' || recipeClass=='ST' || recipeClass=='PD'){
				ddl.push({"label":"Above 100%","value":"AB"});
				ddl.push({"label":"Calculated","value":"CAL"});
				ddl.push({"label":"Constant","value":"CON"});
				ddl.push({"label":"Fixed","value":"FIX"}); 
				if(recipeClass!='PD'){
					ddl.push({"label":"RIW/ST","value":"RIW/ST"});
				}
		}
		return ddl;
	},
	setMaterialAdd:()=>{
		let storeArrAdd={};
		storeArrAdd.PropertyCodeAdd=appsmith.store.SV_reArrAdd.PropertyCodeAdd;
		storeArrAdd.MaterialCodeAdd=MaterialTblAdd.selectedRow.MATERIAL_CODE;
		storeValue('SV_reArrAdd',storeArrAdd,true);
	},
	setPropertyAdd:()=>{
		let storeArrAdd={};
		storeArrAdd.PropertyCodeAdd=PropertyTblAdd.selectedRow.MATERIAL_CODE;
		storeArrAdd.MaterialCodeAdd=appsmith.store.SV_reArrAdd.MaterialCodeAdd;
		storeValue('SV_reArrAdd',storeArrAdd,true);
	},
	onSeqAddBlurNew:()=>{
		if(SeqAdd.text!=null){
			GetDuplicateSeq.run(() => {
				if(GetDuplicateSeq.data.length>0){
					showAlert('Seq No Already Exist in Selected Recipes.');	
					return;
				}
			});
			}
	},
	recipeDOSCMD:()=>{
		let recipeClass= appsmith.store.RecipeClassDropDown
		let ddl=[];
		if(recipeClass=='RM'||recipeClass=='CO' || recipeClass=='ST'||recipeClass=='PD'){
			ddl.push({"label":"Dosing","value":"DOS"});
			ddl.push({"label":"Command","value":"CMD"});
			//ddl.push({"label":"Energy","value":"ENG"});
		}
		if(recipeClass=='WP'||recipeClass=='PU'){
			ddl.push({"label":"Dosing","value":"DOS"});
			ddl.push({"label":"Command","value":"CMD"});
			ddl.push({"label":"Energy","value":"ENG"});
			ddl.push({"label":"By Product","value":"BYP"}); 
		}
		if(recipeClass=='WS'||recipeClass=='BL'||recipeClass=='DR'){
			ddl.push({"label":"Command","value":"CMD"});
			ddl.push({"label":"By Product","value":"BYP"}); 
		}
		return ddl;
	},
}