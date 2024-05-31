export default {
	onChangetargetValue:()=>{
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		let tbl = appsmith.store.SV_TBL;
		let totalTargetValue=0;
		for(let i=0; i <tbl.length;i++){
			totalTargetValue=totalTargetValue+Number(tbl[i].TARGET_VALUE);
		}
		let calculatedField = {};
		calculatedField.sv_mainMtrlBoneDry=JSObject5.roundToTwo(totalTargetValue);
		storeValue("calculatedField",calculatedField,true);
		//storeValue('sv_mainMtrlBoneDry',JSObject5.roundToTwo(totalTargetValue),true);		
		TargetValue.onChangetargetCal();
	},
	dryContent:()=>{
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		let calDC=Number(appsmith.store.sv_tdc);
		let enDC=Number(DryContentInput.text);
		if(calDC!=enDC){
			//showAlert('Dry Content Can Not Be Computed','error');
		}
	},
	onChangeInMin:()=>{
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		let tbl=appsmith.store.SV_TBL;
		for(let i=0; i <tbl.length;i++){
			if(tbl[i].IN_VAL == 'A') {
				tbl[i].CALC_MINIMUM = tbl[i].INPUT_MINIMUM;
			} else if(tbl[i].IN_VAL == 'R') {
				tbl[i].CALC_MINIMUM = Number(tbl[i].TARGET_VALUE) - Number(tbl[i].INPUT_MINIMUM);
			} else if(tbl[i].IN_VAL == 'P') {
				var per = (Number(tbl[i].TARGET_VALUE) * Number(tbl[i].INPUT_MINIMUM)) / 100;
				tbl[i].CALC_MINIMUM = Number(tbl[i].TARGET_VALUE) - Number(per);
			}
		}
		storeValue('SV_TBL',tbl,true);
	},
	onChangeInMax:()=>{
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		let tbl=appsmith.store.SV_TBL;
		for(let i=0; i <tbl.length;i++){
			if(tbl[i].IN_VAL == 'A') {
				tbl[i].CALC_MAXIMUM = tbl[i].INPUT_MAXIMUM;
			} else if(tbl[i].IN_VAL == 'R') {
				tbl[i].CALC_MAXIMUM = Number(tbl[i].TARGET_VALUE) + Number(tbl[i].INPUT_MAXIMUM);
			} else if(tbl[i].IN_VAL == 'P') {
				var per = (Number(tbl[i].TARGET_VALUE) * Number(tbl[i].INPUT_MAXIMUM)) / 100;
				tbl[i].CALC_MAXIMUM = Number(tbl[i].TARGET_VALUE) + Number(per);
			}
		}
		storeValue('SV_TBL',tbl,true);
	},
	onChangetargetCal:()=>{
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		let tbl=appsmith.store.SV_TBL;
		for(let i=0; i <tbl.length;i++){
			if(tbl[i].IN_VAL == 'A') {
				tbl[i].CALC_MINIMUM = tbl[i].INPUT_MINIMUM;
				tbl[i].CALC_MAXIMUM = tbl[i].INPUT_MAXIMUM;
			} else if(tbl[i].IN_VAL == 'R') {
				if(tbl[i].INPUT_MINIMUM != null && tbl[i].INPUT_MINIMUM != "") {
					tbl[i].CALC_MINIMUM = Number(tbl[i].TARGET_VALUE) - Number(tbl[i].INPUT_MINIMUM);
				}
				if(tbl[i].INPUT_MAXIMUM != null && tbl[i].INPUT_MAXIMUM != "") {
					tbl[i].CALC_MAXIMUM = Number(tbl[i].TARGET_VALUE) + Number(tbl[i].INPUT_MAXIMUM);
				}
			} else if(tbl[i].IN_VAL == 'P') {
				if(tbl[i].INPUT_MINIMUM != null && tbl[i].INPUT_MINIMUM != "") {
					var per = (Number(tbl[i].TARGET_VALUE) * Number(tbl[i].INPUT_MINIMUM)) / 100;
					tbl[i].CALC_MINIMUM = Number(tbl[i].TARGET_VALUE) - Number(per);
				}
				if(tbl[i].INPUT_MAXIMUM != null && tbl[i].INPUT_MAXIMUM != "") {
					var per1 = (Number(tbl[i].TARGET_VALUE) * Number(tbl[i].INPUT_MAXIMUM)) / 100;
					tbl[i].CALC_MAXIMUM = Number(tbl[i].TARGET_VALUE) + Number(per1);
				}
			}
		}
		storeValue('SV_TBL',tbl,true);
	}
}