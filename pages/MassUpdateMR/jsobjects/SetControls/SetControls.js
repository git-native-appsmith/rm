export default {
	setPropertyCode:()=>{
		let storeArr={};
		storeArr.PropertyCode=PropertyTbl.selectedRow.PROPERTY_CODE;
		storeArr.MaterialCode='';
		storeArr.BP=0;
		storeArr.MaterialProperty='';
		storeValue('SV_reArr',storeArr,true);
	},
	setMaterialCode:()=>{
		let storeArr={};
		storeArr.PropertyCode='';
		storeArr.MaterialCode=MaterialTbl.selectedRow.MATERIAL_CODE;
		storeArr.MaterialProperty='';
		storeArr.BP=MaterialTbl.selectedRow.BP;
		storeValue('SV_reArr',storeArr,true);
	},
	showSelectMaterialProperty:()=>{
			GetMaterial.run();
			showModal('MaterialCMDModal');
	},
	setMaterialProperty:()=>{
		console.log(MaterialTblCopy.selectedRow.MATERIAL_CODE);
		let storeArr={};
		storeArr.PropertyCode='';
		storeArr.MaterialCode=appsmith.store.SV_reArr.MaterialCode;
		storeArr.MaterialProperty=MaterialTblCopy.selectedRow.MATERIAL_CODE;
		storeArr.BP=appsmith.store.BP;
		storeValue('SV_reArr',storeArr,true);
		let Recipe_Mat= appsmith.store.Recipe_Mat;
		if(Recipe_Mat.length>0){
			Recipe_Mat=Recipe_Mat+','+MaterialTblCopy.selectedRow.MATERIAL_CODE
		}else{
			Recipe_Mat=MaterialTblCopy.selectedRow.MATERIAL_CODE
		}
		storeValue('Recipe_Mat',Recipe_Mat,true);
	},
	getSetPropertyValue:()=>{
			SetControls.setPropertyCode();
			closeModal('PropertyModal');
	},
	getSetMaterialValue:()=>{
		SetControls.setMaterialCode();
		closeModal('MaterialModal');
	},
	getSetMaterialCMDValue:()=>{
		SetControls.setMaterialProperty();
		closeModal('MaterialCMDModal');
		showModal('MaterialPropertyModal');
	},
	setMaterialAdd:()=>{
		let storeArrAdd={};
		storeArrAdd.PropertyCodeAdd=appsmith.store.SV_reArrAdd.PropertyCodeAdd;
		storeArrAdd.MaterialCodeAdd=MaterialTblAdd.selectedRow.MATERIAL_CODE;
		storeValue('SV_reArrAdd',storeArrAdd,true);
		let Recipe_Mat= appsmith.store.Recipe_Mat;
		if(Recipe_Mat.length>0){
			Recipe_Mat=Recipe_Mat+','+MaterialTblAdd.selectedRow.MATERIAL_CODE
		}else{
			Recipe_Mat=MaterialTblAdd.selectedRow.MATERIAL_CODE
		}
		storeValue('Recipe_Mat',Recipe_Mat,true);
	},
	setPropertyAdd:()=>{
		let storeArrAdd={};
		storeArrAdd.PropertyCodeAdd=PropertyTblAdd.selectedRow.MATERIAL_CODE;
		storeArrAdd.MaterialCodeAdd=appsmith.store.SV_reArrAdd.MaterialCodeAdd;
		storeValue('SV_reArrAdd',storeArrAdd,true);
	},
	onAddModalClick:()=>{
		let storeArrAdd={};
		storeArrAdd.PropertyCodeAdd='';
		storeArrAdd.MaterialCodeAdd='';
		storeValue('SV_reArrAdd',storeArrAdd,true);
		showModal('AddNewRow');
	},
	onSeqAddBlurNew:()=>{
		console.log('Aj')
		if(SeqAdd.text!=null){
			GetDuplicateSeq.run(() => {
											if(GetDuplicateSeq.data.length>0){
												showAlert('Seq No Already Exist in Selected Recipes.');	
												return;
												}
										});
			}
		}
}