export default {
	set_sv_tbl: () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		let mainMaterialBoneDry = MainMaterialInput.text;
		//storeValue('sv_mainMtrlBoneDry',JSObject5.roundFunction(mainMaterialBoneDry,1),true);
		let sv_mainMtrlBoneDry = JSObject5.roundFunction(mainMaterialBoneDry,1);
		//storeValue('sv_dc',JSObject5.roundFunction(DryContentInput.text,2),true);
		let sv_dc =JSObject5.roundFunction(DryContentInput.text,2);
		let totalBoneDry=0;let totalVolume=0;let totalWeight=0;let totalper=0; let totFiller=0;
		let WT=appsmith.store.SV_WT;
		let VL=appsmith.store.SV_VL;
		var editedActionRow=Tabulator2.actionRowWithIndex; 
		if(appsmith.store.RecipeClassDropDown=="RM" || appsmith.store.RecipeClassDropDown=="CO" || appsmith.store.RecipeClassDropDown=="ST"){
			editedActionRow=Tabulator1.actionRowWithIndex; 
			if(editedActionRow.data.RECIPE_ITEM_TYPE != 'CMD'){
				let weight =0;let volume =0;let per=0;let boneDry=0; let filler=0;
				let dc =editedActionRow.data.DC_CONCENTRATION==''?0:editedActionRow.data.DC_CONCENTRATION;
				let sp_wt=editedActionRow.data.SPECIFIC_WEIGHT==''?0:editedActionRow.data.SPECIFIC_WEIGHT;
				per = editedActionRow.data.VALUE_PERCENTAGE==''?0:editedActionRow.data.VALUE_PERCENTAGE;
				filler = editedActionRow.data.FILLER==''?0:editedActionRow.data.FILLER;
				if(editedActionRow.data.RECIPE_FUNCTION != 'CAL')
				{
						weight=Number(editedActionRow.data.TARGET_VALUE_WEIGHT);
						volume=Number(editedActionRow.data.VOLUME);
						boneDry=Number(mainMaterialBoneDry*per/100);
					  totFiller=totFiller+(boneDry*filler/100);
						if(editedActionRow.data.RECIPE_FUNCTION=='FIX'){
							weight =(mainMaterialBoneDry*per/100)/(dc/100);
							volume =weight/Number(sp_wt);
							totalper=totalper+Number(editedActionRow.data.VALUE_PERCENTAGE);
						}else if(editedActionRow.data.RECIPE_FUNCTION=='AB'){
							weight =Number(boneDry*100/dc);
							volume =weight/Number(sp_wt);
						}else{
							if(WT=='1'){
								volume=Number(editedActionRow.data.TARGET_VALUE_WEIGHT)/sp_wt; 
							}
							if(VL=='1'){
								 weight=Number(editedActionRow.data.VOLUME)*sp_wt;
							}
							storeValue('SV_WT',0,true);
							storeValue('SV_VL',0,true);
						}
						editedActionRow.data.TARGET_VALUE_WEIGHT=weight;
						editedActionRow.data.VOLUME=volume;
						totalBoneDry=Number(totalBoneDry)+boneDry;
						totalWeight=totalWeight+weight;
						totalVolume=totalVolume+volume;
				}
			}
		}else if(appsmith.store.RecipeClassDropDown=="PD"){
			editedActionRow=Tabulator2.actionRowWithIndex; 
		}else if(appsmith.store.RecipeClassDropDown=="CS"){
			editedActionRow=Tabulator3.actionRowWithIndex;
			if(editedActionRow.data.TARGET_VALUE == '' || editedActionRow.data.TARGET_VALUE ==  null) {
				editedActionRow.data.IN_VAL='';
				editedActionRow.data.INPUT_MINIMUM='';
				editedActionRow.data.INPUT_MAXIMUM='';
				editedActionRow.data.CALC_MINIMUM='';
				editedActionRow.data.CALC_MAXIMUM='';
			}
		}else if(appsmith.store.RecipeClassDropDown=="MS" || appsmith.store.RecipeClassDropDown=="SU"){
			editedActionRow=Tabulator4.actionRowWithIndex;
			if(editedActionRow.data.TARGET_VALUE == '' || editedActionRow.data.TARGET_VALUE ==  null) {
				editedActionRow.data.IN_VAL='';
				editedActionRow.data.INPUT_MINIMUM='';
				editedActionRow.data.INPUT_MAXIMUM='';
				editedActionRow.data.CALC_MINIMUM='';
				editedActionRow.data.CALC_MAXIMUM='';
			}
		}
		let tbl=appsmith.store.SV_TBL || [];
		if(tbl[editedActionRow.index] == undefined){
			tbl.push(editedActionRow.data);
		}else{
			//showAlert(JSON.stringify(editedActionRow.data));
			tbl[editedActionRow.index] = editedActionRow.data;
		}
		storeValue('SV_TBL',tbl,true);
	},
	calc_cal:()=>{
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		console.log('Test');
		var editedActionRow=Tabulator1.actionRowWithIndex; 
		editedActionRow.data.TARGET_VALUE_WEIGHT=editedActionRow.data.VALUE_PERCENTAGE*100;
		editedActionRow.data.VOLUME=editedActionRow.data.VALUE_PERCENTAGE*100;
						
		let tbl=appsmith.store.SV_TBL || [];
		if(tbl[editedActionRow.index] == undefined){
			tbl.push(editedActionRow.data);
		}else{
			//showAlert(JSON.stringify(editedActionRow.data));
			tbl[editedActionRow.index] = editedActionRow.data;
		}
		storeValue('SV_TBL',tbl,true);
	}
}