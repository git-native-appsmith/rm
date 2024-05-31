export default {
	onMainBoneDry: () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		Calculation.onTotalmaterialChange();
	},
	roundFunction:(num,fixDec)=>{
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		return +(Math.round(num + "e+"+fixDec)  + "e-"+fixDec);
	},
	onTotalmaterialChange: () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		var d = new Date();
		console.log(d.toLocaleString());
		let mainMaterialBoneDry = appsmith.store.calculatedField.sv_mainMtrlBoneDry;
		let sv_mainMtrlBoneDry = Calculation.roundFunction(mainMaterialBoneDry, 1);
		let sv_dc =Calculation.roundFunction(appsmith.store.calculatedField.sv_dc, 2);
		let totalBoneDry=0;let totalVolume=0;let totalWeight=0;let totalper=0; let totFiller=0;
		let tbl=appsmith.store.SV_TBL;
		let WT=appsmith.store.SV_WT;
		
		let VL=appsmith.store.SV_VL;
		let errorMsg=false;
		//console.log(JSON.stringify(tbl));
		for(let i=0; i <tbl.length;i++)
		{
			if(tbl[i].RECIPE_ITEM_TYPE != 'CMD'){
				let weight =0;let volume =0;let per=0;let boneDry=0; let filler=0;
				let dc =tbl[i].DC_CONCENTRATION==''?0:tbl[i].DC_CONCENTRATION;
				let sp_wt=tbl[i].SPECIFIC_WEIGHT==''?0:tbl[i].SPECIFIC_WEIGHT;
				per = tbl[i].VALUE_PERCENTAGE==''?0:tbl[i].VALUE_PERCENTAGE;
				filler = tbl[i].FILLER==''?0:tbl[i].FILLER;
				if(tbl[i].RECIPE_FUNCTION != 'CAL'){
						weight=Number(tbl[i].TARGET_VALUE_WEIGHT);
						volume=Number(tbl[i].VOLUME);
						//boneDry=Number(mainMaterialBoneDry*per/100);
					  if(tbl[i].RECIPE_FUNCTION=='FIX'){
							weight =(mainMaterialBoneDry*per/100)/(dc/100);
							volume =weight/Number(sp_wt);
							boneDry=Number(dc*weight/100);
							totalper=totalper+Number(tbl[i].VALUE_PERCENTAGE);
						}else if(tbl[i].RECIPE_FUNCTION=='AB'){
							weight =(mainMaterialBoneDry*per/100)/(dc/100);
							boneDry=Number(dc*weight/100);
							volume =weight/Number(sp_wt);
							boneDry=Number(mainMaterialBoneDry*per/100);
						}else if(tbl[i].RECIPE_FUNCTION=='CON'){
							boneDry=Number(weight*dc/100);
						}else{
							if(WT=='1'){
								volume=Number(tbl[i].TARGET_VALUE_WEIGHT)/sp_wt; 
							}
							if(VL=='1'){
								 weight=Number(tbl[i].VOLUME)*sp_wt;
							}
							storeValue('SV_WT',0,true);
							storeValue('SV_VL',0,true);
						}
					  totFiller=totFiller+(boneDry*filler/100);
						tbl[i].TARGET_VALUE_WEIGHT=Calculation.roundFunction(weight,3);
						tbl[i].VOLUME=Calculation.roundFunction(volume,3);
						totalBoneDry=Number(totalBoneDry)+boneDry;
						totalWeight=totalWeight+weight;
						totalVolume=totalVolume+volume;
					}
			}
		}
		let total_NoCal=totalWeight;
		let dryContentInput = appsmith.store.calculatedField.sv_dc;
		for(let i=0; i <tbl.length;i++)
		{
			if(tbl[i].RECIPE_ITEM_TYPE != 'CMD'){
				let weight =0;let volume =0;let boneDry=0; 
				let dc =tbl[i].DC_CONCENTRATION==''?0:tbl[i].DC_CONCENTRATION;
				let sp_wt=tbl[i].SPECIFIC_WEIGHT==''?0:tbl[i].SPECIFIC_WEIGHT;
				if(tbl[i].RECIPE_FUNCTION=='CAL'){
					weight=Number(totalBoneDry*100/dryContentInput)-total_NoCal;
					boneDry=Number(weight*dc/100);
					volume=Number(weight/sp_wt);
					if(weight<= 0){
						errorMsg=true;
						weight=0;
						volume=0;
					}
					totalBoneDry=Number(totalBoneDry)+boneDry;
					tbl[i].TARGET_VALUE_WEIGHT=Calculation.roundFunction(weight,3);
					tbl[i].VOLUME=Calculation.roundFunction(volume,3);
					totalWeight=totalWeight+weight;
					totalVolume=totalVolume+volume;
				}
			}
		}
		let tdc =0;
		if(totalWeight >0){
			tdc=(totalBoneDry*100/totalWeight).toFixed(2);
		}
		let spwt =0;
		let gbt=0;
		if(totalVolume >0){
			spwt=totalWeight/totalVolume;
			gbt=1000*totalBoneDry/totalVolume;
		}
		let sv_filler		= Calculation.roundFunction(totFiller*100/mainMaterialBoneDry,2);
		let sv_tdc			= Calculation.roundFunction(tdc,2);
		let sv_spwt			= Calculation.roundFunction(spwt,0);
		let sv_gbt			= Calculation.roundFunction(gbt,2);
		let sv_per			= Calculation.roundFunction(totalper,1);
		let sv_totalWeightWet	= String(Calculation.roundFunction(totalWeight,2));			
		let sv_totalVolume	= String(Calculation.roundFunction(totalVolume,0));
		Calculation.storeCalculatedValue(sv_mainMtrlBoneDry,sv_spwt,sv_gbt,sv_per,sv_totalWeightWet,sv_totalVolume,sv_filler,sv_tdc,sv_dc);
		storeValue('SV_TBL',tbl,true);
		var d1 = new Date();
		if(appsmith.store.calculatedField.sv_dc !=''){
			let dcI = Number(appsmith.store.calculatedField.sv_dc).toFixed(2);
			if(dcI > tdc) {
				storeValue('CreateRecipeErrMsg','Target dry content can not be achieved.',true);
				showModal('msgModalInfo');
			}
			if(dcI < tdc) {
				storeValue('CreateRecipeErrMsg','Calculated dry content can not be more than target dry content.',true);
				showModal('msgModalInfo');
			}
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