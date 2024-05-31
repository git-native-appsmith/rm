export default {
	onTotalmaterialChange: () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		var d = new Date();
		console.log(d.toLocaleString());
		let mainMaterialBoneDry = MainMaterialInput.text;
		//storeValue('sv_mainMtrlBoneDry',JSObject5.roundFunction(mainMaterialBoneDry,1),true);
		let sv_mainMtrlBoneDry = JSObject5.roundFunction(mainMaterialBoneDry,1);
		//storeValue('sv_dc',JSObject5.roundFunction(DryContentInput.text,2),true);
		let sv_dc =JSObject5.roundFunction(DryContentInput.text,2);
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
						boneDry=Number(mainMaterialBoneDry*per/100);
					  totFiller=totFiller+(boneDry*filler/100);
						if(tbl[i].RECIPE_FUNCTION=='FIX'){
							weight =(mainMaterialBoneDry*per/100)/(dc/100);
							volume =weight/Number(sp_wt);
							totalper=totalper+Number(tbl[i].VALUE_PERCENTAGE);
						}else if(tbl[i].RECIPE_FUNCTION=='AB'){
							weight =Number(boneDry*100/dc);
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
						tbl[i].TARGET_VALUE_WEIGHT=weight;
						tbl[i].VOLUME=volume;
						totalBoneDry=Number(totalBoneDry)+boneDry;
						totalWeight=totalWeight+weight;
						totalVolume=totalVolume+volume;
					}
			}
		}
		let total_NoCal=totalWeight;
		let dryContentInput = DryContentInput.text;
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
		 storeValue('sv_tdc',JSObject5.roundFunction(tdc,2),true);
		 storeValue('sv_spwt',JSObject5.roundFunction(spwt,0),true);
		 storeValue('sv_gbt',JSObject5.roundFunction(gbt,2),true);
		 storeValue('sv_per',JSObject5.roundFunction(totalper,1),true);
		 storeValue('sv_totalWeightWet',String(JSObject5.roundFunction(totalWeight,2)),true);			
		 storeValue('sv_totalVolume',String(JSObject5.roundFunction(totalVolume,0)),true);*/
		 storeValue('SV_TBL',tbl,true);
		 console.log(appsmith.store.SV_TBL)
		var d1 = new Date();
		if(DryContentInput.text!=''){
			let dcI = Number(DryContentInput.text).toFixed(2);
			if(dcI > tdc) {
				storeValue('CreateRecipeErrMsg','Target dry content can not be achieved.',true);
				showModal('msgModalInfo');
				//showAlert('Target Dry Content Can Not Be Achieved','error');
			}
			if(dcI < tdc) {
				storeValue('CreateRecipeErrMsg','Calculated dry content can not be more than target dry content.',true);
				showModal('msgModalInfo');
				//showAlert('Calculated Dry Content Can Not Be More Than Target Dry Content','error');
			}
		} 
		
			if(errorMsg){
				//showAlert('Dry Content Can Not Be Calculated','error');
			}else{
				TargetValue.dryContent();
			}
	},
	onMainBoneDry: () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		if(appsmith.store.RecipeClassDropDown=="RM" || appsmith.store.RecipeClassDropDown=="CO" || appsmith.store.RecipeClassDropDown=="ST"){
			CalculateOnBoneDryChange.onTotalmaterialChange();
		}else if(appsmith.store.RecipeClassDropDown=="PD"){
			BoneDryAndPercentageChangePulp.onTotalBoneDryPulp();
		}
	},
	onVolumeChange:()=>{
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		if(appsmith.store.RecipeClassDropDown=="RM" || appsmith.store.RecipeClassDropDown=="CO" || appsmith.store.RecipeClassDropDown=="ST"){
			CalculateOnBoneDryChange.onTotalVolumeChange();
		}else if(appsmith.store.RecipeClassDropDown=="PD"){
			BoneDryAndPercentageChangePulp.onTotalVolumeChange();
		}
	},
	onTotalVolumeChange:()=>{
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		//showAlert('Volume change called');
		//storeValue('sv_dc',JSObject5.roundFunction(DryContentInput.text,2),true);
		let sv_dc =JSObject5.roundFunction(DryContentInput.text,2);
		let oldvolume=Number(appsmith.store.sv_totalVolume);
		//showAlert(String(oldvolume));
		let newVolume = TotalVolumeInput.text;
		//showAlert(String(newVolume));
		let mainMaterialBoneDry = 0;
		if(appsmith.store.sv_mainMtrlBoneDry!='')
			mainMaterialBoneDry=Number(appsmith.store.sv_mainMtrlBoneDry);
		//showAlert(String(mainMaterialBoneDry));
		let perChange=0;
		perChange=(newVolume-oldvolume)*100/oldvolume;
		//showAlert(String(perChange));
		if(oldvolume > newVolume){
			perChange=(oldvolume - newVolume)*100/oldvolume;
			mainMaterialBoneDry=mainMaterialBoneDry - mainMaterialBoneDry*perChange/100;
		}else{
			mainMaterialBoneDry=mainMaterialBoneDry + mainMaterialBoneDry*perChange/100;
		}
		let sv_mainMtrlBoneDry = JSObject5.roundFunction(mainMaterialBoneDry,1);
		let totalBoneDry=0;let totalVolume=0;let totalWeight=0;let totalper=0;let totFiller=0;
		let tbl=appsmith.store.SV_TBL;
		let WT=appsmith.store.SV_WT;
		let VL=appsmith.store.SV_VL;
		let errorMsg=false;
		for(let i=0; i <tbl.length;i++)
		{
			if(tbl[i].RECIPE_ITEM_TYPE != 'CMD'){
				let weight =0;let volume =0;let per=0;let boneDry=0;let filler=0;
				let dc =tbl[i].DC_CONCENTRATION==''?0:tbl[i].DC_CONCENTRATION;
				let sp_wt=tbl[i].SPECIFIC_WEIGHT==''?0:tbl[i].SPECIFIC_WEIGHT;
				per = tbl[i].VALUE_PERCENTAGE==''?0:tbl[i].VALUE_PERCENTAGE;
				filler = tbl[i].FILLER==''?0:tbl[i].FILLER;
				if(tbl[i].RECIPE_FUNCTION != 'CAL'){
						weight=Number(tbl[i].TARGET_VALUE_WEIGHT);
						volume=Number(tbl[i].VOLUME);
						boneDry=Number(mainMaterialBoneDry*per/100);
					  totFiller=totFiller+(boneDry*filler/100);
						if(tbl[i].RECIPE_FUNCTION=='FIX'){
							weight =(mainMaterialBoneDry*per/100)/(dc/100);
							volume =weight/Number(sp_wt);
							totalper=totalper+Number(tbl[i].VALUE_PERCENTAGE);
						}else if(tbl[i].RECIPE_FUNCTION=='AB'){
							weight =Number(boneDry*100/dc);
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
						tbl[i].TARGET_VALUE_WEIGHT=weight;
						tbl[i].VOLUME=volume;
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
					if(weight<= 0){
						errorMsg=true;
						weight=0;
						volume=0;
					}
					tbl[i].TARGET_VALUE_WEIGHT=weight;
					tbl[i].VOLUME=volume;
					totalWeight=totalWeight+weight;
					totalVolume=totalVolume+volume;
				}
			}
		}
		let sv_filler			= JSObject5.roundToTwo(totFiller*100/mainMaterialBoneDry);
		let sv_tdc			= JSObject5.roundFunction(totalBoneDry*100/totalWeight,2);
		let sv_spwt			= JSObject5.roundFunction(totalWeight/totalVolume,0);
		let sv_gbt			= JSObject5.roundFunction(1000*totalBoneDry/totalVolume,2);
		let sv_per			= JSObject5.roundFunction(totalper,1);
		let sv_totalWeightWet	= String(JSObject5.roundFunction(totalWeight,2));			
		let sv_totalVolume	= String(JSObject5.roundFunction(totalVolume,0));
		JSObject5.storeCalculatedValue(sv_mainMtrlBoneDry,sv_spwt,sv_gbt,sv_per,sv_totalWeightWet,sv_totalVolume,sv_filler,sv_tdc,sv_dc);
		/*storeValue('sv_filler',JSObject5.roundToTwo(totFiller*100/mainMaterialBoneDry),true);
		storeValue('sv_tdc',JSObject5.roundFunction(totalBoneDry*100/totalWeight,2),true);
		storeValue('sv_spwt',totalWeight/totalVolume,true);
		storeValue('sv_gbt',JSObject5.roundFunction(1000*totalBoneDry/totalVolume,2),true);
		storeValue('sv_per',totalper,true);
		storeValue('sv_totalWeightWet',JSObject5.roundFunction(totalWeight,2),true);			
		storeValue('sv_totalVolume',JSObject5.roundFunction(totalVolume,0),true);*/
		storeValue('SV_TBL',tbl,true);	
		/*if(totalper != 100){
			showAlert('Fix Percentage Should Be 100%','error');
		}*/
		let tdc =0;
		if(totalWeight >0){
			tdc=(totalBoneDry*100/totalWeight).toFixed(2);
		}
		let dcI = Number(DryContentInput.text).toFixed(2);
		if(DryContentInput.text!=''){
			let dcI = Number(DryContentInput.text);
			if(dcI > tdc) {
				storeValue('CreateRecipeErrMsg','Target dry content can not be achieved.',true);
				showModal('msgModalInfo');
				//showAlert('Target Dry Content Can Not Be Achieved','error');
			}
			if(dcI < tdc) {
				storeValue('CreateRecipeErrMsg','Calculated dry content can not be more than target dry content.',true);
				showModal('msgModalInfo');
				//showAlert('Calculated Dry Content Can Not Be More Than Target Dry Content','error');
			}
		}
		if(errorMsg){
			//showAlert('Dry Content Can Not Be Calculated','error');
		}else{
			TargetValue.dryContent();
		}
	}
}