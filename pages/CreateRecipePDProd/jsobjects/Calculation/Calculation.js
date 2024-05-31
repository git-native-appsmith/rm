export default {
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