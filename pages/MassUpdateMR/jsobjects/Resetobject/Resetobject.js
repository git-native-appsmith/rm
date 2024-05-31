export default {
	ResetInputWidget:()=>{
		let storeArr=[];
		storeArr.PropertyCode='';
		storeArr.MaterialCode='';
		storeArr.MaterialProperty='';
		storeArr.clicktype=0;
		storeArr.BP='';
		storeValue('SV_reArr',storeArr,true);
	},
	recipeFunction:()=>{
		let recipeClass= appsmith.store.RecipeClassDropDown
		let ddl=[];
		if(recipeClass=='CS'){
			ddl.push({"label":"Above 100%","value":"AB"});
			//ddl.push({"label":"Base Paper","value":"BP"});
		}else{
			ddl.push({"label":"Above 100%","value":"AB"});
			ddl.push({"label":"Calculated","value":"CAL"});
			ddl.push({"label":"Constant","value":"CON"});
			ddl.push({"label":"Fixed","value":"FIX"}); 
			if(recipeClass!='PD'){
				ddl.push({"label":"RIW/ST","value":"RIW/ST"});
			}
		}
		return ddl;
	}
}