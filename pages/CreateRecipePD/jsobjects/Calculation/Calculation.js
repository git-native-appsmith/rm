export default {
	onMainBoneDry: () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		Calculation.onTotalBoneDryPulp();
	},
	roundFunction:(num,fixDec)=>{
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		return +(Math.round(num + "e+"+fixDec)  + "e-"+fixDec);
	},
	onTotalBoneDryPulp: () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		let mainMaterialBoneDry = appsmith.store.calculatedField.sv_mainMtrlBoneDry;
		let sv_mainMtrlBoneDry = Calculation.roundFunction(mainMaterialBoneDry,1);
		let sv_dc =Calculation.roundFunction(appsmith.store.calculatedField.sv_dc, 2);
		let totalBoneDry=0;let totalVolume=0;let totalWeight=0;let totalper=0;let totFiller=0;
		let tbl=appsmith.store.SV_TBL;
		let WT=appsmith.store.SV_WT;
		let VL=appsmith.store.SV_VL;
		let errorMsg=false;
		if(tbl.length >0){
			for(let i=0; i <tbl.length;i++)
			{
			if(tbl[i].RECIPE_ITEM_TYPE != 'CMD'){
				let weight =0;let volume =0;let per=0;let boneDry=0;let filler=0;
				let dc =tbl[i].DC_CONCENTRATION==''?0:tbl[i].DC_CONCENTRATION;
				let sp_wt=tbl[i].SPECIFIC_WEIGHT==''?0:tbl[i].SPECIFIC_WEIGHT;
				per = tbl[i].VALUE_PERCENTAGE==''?0:tbl[i].VALUE_PERCENTAGE;
				filler = tbl[i].FILLER==''?0:tbl[i].FILLER;
				let bales =0;
				let baleWeight = tbl[i].BALE_WEIGHT==''?0:tbl[i].BALE_WEIGHT
				if(tbl[i].RECIPE_FUNCTION != 'CAL'){
						weight=tbl[i].TARGET_VALUE_WEIGHT==''?0:Number(tbl[i].TARGET_VALUE_WEIGHT);
						volume=tbl[i].VOLUME==''?0:Number(tbl[i].VOLUME);
						boneDry=Number(mainMaterialBoneDry*per/100);
					  totFiller=totFiller+(boneDry*filler/100);
						if(tbl[i].RECIPE_FUNCTION=='FIX'){
							if(baleWeight > 0){
								weight =Number(boneDry*100/Number(dc));
								bales= Math.round(weight/baleWeight);
								weight=bales*baleWeight;
								boneDry =weight*dc/100;
							}else{
								boneDry=Number(mainMaterialBoneDry*per)/100;
								weight=boneDry*100/dc;
							}
							per =boneDry*100/mainMaterialBoneDry;
							volume =weight/Number(sp_wt);
							totalper=totalper+Number(per);
						}else if(tbl[i].RECIPE_FUNCTION=='AB'){
							weight =Number(boneDry*100/Number(dc));
							bales= Math.round(weight/baleWeight);
							weight=bales*baleWeight;
							boneDry =weight*dc/100;
							per =boneDry*100/mainMaterialBoneDry;
							volume =weight/Number(sp_wt);
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
						tbl[i].VALUE_PERCENTAGE=Calculation.roundFunction(per,0);
						tbl[i].BALES=bales;
						tbl[i].TARGET_VALUE_WEIGHT=Calculation.roundFunction(weight,3);
						tbl[i].VOLUME=Calculation.roundFunction(volume,3);
						totalBoneDry=Number(totalBoneDry)+boneDry;
						totalWeight=totalWeight+weight;
						totalVolume=totalVolume+volume;
					}
			}
		}
		let total_NoCal=totalWeight;
		let dryContentInput = Number(appsmith.store.calculatedField.sv_dc);
		for(let i=0; i <tbl.length;i++)
		{
			if(tbl[i].RECIPE_ITEM_TYPE != 'CMD'){
				let weight =0;let volume =0;
				let sp_wt=tbl[i].SPECIFIC_WEIGHT==''?0:tbl[i].SPECIFIC_WEIGHT;
				if(tbl[i].RECIPE_FUNCTION=='CAL'){
					weight=Number(totalBoneDry*100/dryContentInput)-total_NoCal;
					volume=Number(weight/sp_wt);
					if(weight<= 0){
						errorMsg=true;
						weight=0;
						volume=0;
					}
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
		let sv_filler		= Calculation.roundFunction(totFiller*100/mainMaterialBoneDry,0);
		let sv_tdc			= Calculation.roundFunction(tdc,2);
		let sv_spwt			= Calculation.roundFunction(spwt,0);
		let sv_gbt			= Calculation.roundFunction(gbt,2);
		let sv_per			= Calculation.roundFunction(totalper,1);
		let sv_totalWeightWet	= String(Calculation.roundFunction(totalWeight,2));			
		let sv_totalVolume	= String(Calculation.roundFunction(totalVolume,0));
		Calculation.storeCalculatedValue(sv_mainMtrlBoneDry,sv_spwt,sv_gbt,sv_per,sv_totalWeightWet,sv_totalVolume,sv_filler,sv_tdc,sv_dc);
		storeValue('SV_TBL',tbl,true);
		let dcI = Number(appsmith.store.calculatedField.sv_dc).toFixed(2);
		if(dcI > tdc){
			storeValue('CreateRecipeErrMsg','Dry content can not be achieved.',true);
			showModal('msgModalInfo');
		}
		if(dcI < tdc) {
			storeValue('CreateRecipeErrMsg','Calculated dry content can not be more than target dry con.',true);
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