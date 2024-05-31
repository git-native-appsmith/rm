export default {
	setSV_WT:()=>{
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		var editedActionRow=Tabulator2.actionRowWithIndex;
		if(appsmith.store.RecipeClassDropDown=="RM" || appsmith.store.RecipeClassDropDown=="CO" || appsmith.store.RecipeClassDropDown=="ST"){
			editedActionRow=Tabulator1.actionRowWithIndex; 
		}else if(appsmith.store.RecipeClassDropDown=="PD"){
			editedActionRow=Tabulator2.actionRowWithIndex; 
		}
		let tbl=appsmith.store.SV_TBL || [];
		if(tbl[editedActionRow.index] == undefined){
			tbl.push(editedActionRow.data);
		}else{
			//showAlert(JSON.stringify(editedActionRow.data));
			tbl[editedActionRow.index] = editedActionRow.data;
		}
		storeValue('SV_TBL',tbl,true);
		storeValue('SV_WT',1,true);
	},
	setSV_VL:()=>{
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		var editedActionRow=Tabulator2.actionRowWithIndex; 
		if(appsmith.store.RecipeClassDropDown=="RM" || appsmith.store.RecipeClassDropDown=="CO" || appsmith.store.RecipeClassDropDown=="ST"){
			editedActionRow=Tabulator1.actionRowWithIndex; 
		}else if(appsmith.store.RecipeClassDropDown=="PD"){
			editedActionRow=Tabulator2.actionRowWithIndex; 
		}
		let tbl=appsmith.store.SV_TBL || [];
		if(tbl[editedActionRow.index] == undefined){
			tbl.push(editedActionRow.data);
		}else{
			//showAlert(JSON.stringify(editedActionRow.data));
			tbl[editedActionRow.index] = editedActionRow.data;
		}
		storeValue('SV_TBL',tbl,true);
		storeValue('SV_VL',1,true);
	},
	roundToTwo:(num)=> {
    //return +(Math.round(num + "e+2")  + "e-2");
		return num;
	},
	roundFunction:(num,fixDec)=>{
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		return +(Math.round(num + "e+"+fixDec)  + "e-"+fixDec);
	},
	modalProductGroupCode:()=>{
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		if(ProductGroupSelect.selectedOptionValue == 2){
			if(appsmith.store.RecipeClassDropDownName == 'Raw Material' || appsmith.store.RecipeClassDropDownName == 'Pulp Dissolving' || appsmith.store.RecipeClassDropDownName == 'Coating'){
				GetIntermediateMaterial.run();
				showModal('IntermediateMaterialModal');				
			}else{
				if(GetProductGrades.data == undefined || GetProductGrades.data.length <= 0) {
					GetProductGrades.run();
			  }
				storeValue("PopupOpenFrom","Header",true);
				showModal('ProductCodeModal');
			}
		}else{
			if(GetProductGrades.data == undefined || GetProductGrades.data.length <= 0) {
					GetProductGrades.run();
			  }
			showModal('ProductGroupModal');
		}
	},
	storeCalculatedValue:(sv_mainMtrlBoneDry,sv_spwt,sv_gbt,sv_per,sv_totalWeightWet,sv_totalVolume,sv_filler,sv_tdc,sv_dc)=>{
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		let calculatedField = {};
						calculatedField.sv_mainMtrlBoneDry=sv_mainMtrlBoneDry;
						calculatedField.sv_spwt=sv_spwt;	
						calculatedField.sv_gbt=sv_gbt;
						calculatedField.sv_per=sv_per;
						calculatedField.sv_totalWeightWet=sv_totalWeightWet;
						calculatedField.sv_totalVolume=sv_totalVolume;	
						calculatedField.sv_filler=sv_filler;
						calculatedField.sv_tdc=sv_tdc;	
						calculatedField.sv_dc=sv_dc;	
						storeValue("calculatedField",calculatedField,true);
	}
}