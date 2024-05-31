export default {myVar1: [],
	onBaleChange:()=>{
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		let totalBoneDry=0;let totalVolume=0;let totalWeight=0;let totalper=0;let totFiller=0;
		let tbl=appsmith.store.SV_TBL;
		let bale_per =0;
		let errorMsg=false;
		let WT=appsmith.store.SV_WT;
		let VL=appsmith.store.SV_VL;
		/*On Bale Change  calculate the bone dry weight*/
		for(let i=0; i <tbl.length;i++){
			if(tbl[i].RECIPE_ITEM_TYPE != 'CMD'){
				let weight =0;let volume =0;let per=0;let boneDry=0;
				let dc =tbl[i].DC_CONCENTRATION==''?0:tbl[i].DC_CONCENTRATION;
				let sp_wt=tbl[i].SPECIFIC_WEIGHT==''?0:tbl[i].SPECIFIC_WEIGHT;
				per = tbl[i].VALUE_PERCENTAGE==''?0:tbl[i].VALUE_PERCENTAGE;
				let bales =tbl[i].BALES==''?0:Math.round(tbl[i].BALES);
				let baleWeight =tbl[i].BALE_WEIGHT==''?0:Number(tbl[i].BALE_WEIGHT);
				if(tbl[i].RECIPE_FUNCTION != 'CAL'){
						if(tbl[i].RECIPE_FUNCTION=='FIX' && baleWeight > 0 ){
							weight =Number(bales*baleWeight);
							//showAlert('weight: '+String(weight));
							boneDry=Number(weight*dc/100);
							//showAlert('BoneDry: '+String(boneDry));
							volume =weight/Number(sp_wt);
							totalBoneDry=Number(totalBoneDry)+boneDry;
							//showAlert('Total BoneDry: '+String(totalBoneDry));
						}else if(tbl[i].RECIPE_FUNCTION=='FIX' && baleWeight == 0){
							bale_per=bale_per+per;
						}else if(tbl[i].RECIPE_FUNCTION=='AB'){
							weight =Number(bales*baleWeight);
							boneDry=Number(weight*dc/100);
							volume =weight/Number(sp_wt);
						}
					}
			}
		}
		let x=100-bale_per;
		let main_totalBoneDry=totalBoneDry*100/x;
		let mainMaterialBoneDry = main_totalBoneDry;
		//storeValue('sv_mainMtrlBoneDry',JSObject5.roundFunction(mainMaterialBoneDry,1),true);
		let sv_mainMtrlBoneDry = JSObject5.roundFunction(mainMaterialBoneDry,1);

		//storeValue('sv_dc',JSObject5.roundFunction(DryContentInput.text,2),true);
		let sv_dc =JSObject5.roundFunction(DryContentInput.text,2);
		totalBoneDry=0;
		/*End Here*/
		for(let i=0; i <tbl.length;i++)
		{
			if(tbl[i].RECIPE_ITEM_TYPE != 'CMD'){
				let weight =0;let volume =0;let per=0;let boneDry=0;let filler=0;
				let dc =tbl[i].DC_CONCENTRATION==''?0:tbl[i].DC_CONCENTRATION;
				let sp_wt=tbl[i].SPECIFIC_WEIGHT==''?0:tbl[i].SPECIFIC_WEIGHT;
				per = tbl[i].VALUE_PERCENTAGE==''?0:tbl[i].VALUE_PERCENTAGE;
				filler = tbl[i].FILLER==''?0:tbl[i].FILLER;
				let bales =tbl[i].BALES==''?0:Math.round(tbl[i].BALES);
				let baleWeight =tbl[i].BALE_WEIGHT==''?0:tbl[i].BALE_WEIGHT;
				if(tbl[i].RECIPE_FUNCTION != 'CAL'){
						weight=tbl[i].TARGET_VALUE_WEIGHT==''?0:Number(tbl[i].TARGET_VALUE_WEIGHT);
						volume=tbl[i].VOLUME==''?0:Number(tbl[i].VOLUME);
						if(tbl[i].RECIPE_FUNCTION=='FIX'){
							if(baleWeight > 0){
								weight =Number(bales*baleWeight);
								boneDry=Number(weight*dc/100);
								totFiller=totFiller+(boneDry*filler/100);
								per =boneDry*100/mainMaterialBoneDry;
								volume =weight/Number(sp_wt);
							}else{
								boneDry=Number(mainMaterialBoneDry*per/100);
								weight =boneDry*100/dc;
								volume =weight/Number(sp_wt);
							}
							totalper=totalper+Number(per);
						}else if(tbl[i].RECIPE_FUNCTION=='AB'){
							weight =Number(bales*baleWeight);
							boneDry=Number(weight*dc/100);
							totFiller=totFiller+(boneDry*filler/100);
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
						tbl[i].VALUE_PERCENTAGE=JSObject5.roundToTwo(per);
						tbl[i].BALES=bales;
						tbl[i].TARGET_VALUE_WEIGHT=JSObject5.roundToTwo(weight);
						tbl[i].VOLUME=JSObject5.roundToTwo(volume);
						totalBoneDry=Number(totalBoneDry)+boneDry;
						totalWeight=totalWeight+weight;
						totalVolume=totalVolume+volume;
					}
			}
		}
		let total_NoCal=totalWeight;
		let dryContentInput = Number(DryContentInput.text);
		for(let i=0; i <tbl.length;i++)
		{
			if(tbl[i].RECIPE_ITEM_TYPE != 'CMD'){
				let weight =0;let volume =0;
				let sp_wt=tbl[i].SPECIFIC_WEIGHT==''?0:tbl[i].SPECIFIC_WEIGHT;
				if(tbl[i].RECIPE_FUNCTION=='CAL'){
					
					weight=Number(totalBoneDry*100/dryContentInput)-total_NoCal;
					volume=Number(weight/sp_wt);
					if(weight< 0){
						errorMsg=true;
						weight=0;
						volume=0;
					}
					tbl[i].TARGET_VALUE_WEIGHT=JSObject5.roundToTwo(weight);
					tbl[i].VOLUME=JSObject5.roundToTwo(volume);

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
		let sv_filler			= JSObject5.roundToTwo(totFiller*100/mainMaterialBoneDry);
		let sv_tdc			= JSObject5.roundFunction(tdc,2);
		let sv_spwt			= JSObject5.roundFunction(spwt,0);
		let sv_gbt			= JSObject5.roundFunction(gbt,2);
		let sv_per			= JSObject5.roundFunction(totalper,1);
		let sv_totalWeightWet	= String(JSObject5.roundFunction(totalWeight,2));			
		let sv_totalVolume	= String(JSObject5.roundFunction(totalVolume,0));
		JSObject5.storeCalculatedValue(sv_mainMtrlBoneDry,sv_spwt,sv_gbt,sv_per,sv_totalWeightWet,sv_totalVolume,sv_filler,sv_tdc,sv_dc);
		/*storeValue('sv_filler',JSObject5.roundToTwo(totFiller*100/mainMaterialBoneDry),true);
		storeValue('sv_tdc',JSObject5.roundToTwo(tdc),true);
		storeValue('sv_spwt',JSObject5.roundToTwo(spwt),true);
		storeValue('sv_gbt',JSObject5.roundFunction(gbt,2),true);
		storeValue('sv_per',JSObject5.roundFunction(totalper,1),true);
		storeValue('sv_totalWeightWet',JSObject5.roundFunction(totalWeight,2),true);			
		storeValue('sv_totalVolume',JSObject5.roundFunction(totalVolume,0),true);*/
		storeValue('SV_TBL',tbl,true);
		let dcI = Number(DryContentInput.text).toFixed(2);
		if(dcI > tdc) {
			storeValue('CreateRecipeErrMsg','Dry content can not be achieved.',true);
			showModal('msgModalInfo');
			//showAlert('Dry Content Can Not Be Achieved','error');
		}
		if(dcI < tdc) {
			storeValue('CreateRecipeErrMsg','Calculated dry content can not be more than target dry Con.',true);
			showModal('msgModalInfo');
			//showAlert('Calculated Dry Content Can Not Be More Than Target Dry Con','error');
		}
		if(errorMsg){
			//showAlert('Dry Content Can Not Be Calculated','error');
		}else{
			TargetValue.dryContent();
		}
	}
}