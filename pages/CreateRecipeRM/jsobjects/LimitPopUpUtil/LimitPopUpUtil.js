export default {
	onLimitMenuClick: async () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		//use async-await or promises
		if(GetRecipeLimits.data == undefined || GetRecipeLimits.data.length <= 0) {
			await GetRecipeLimits.run( () => {
				storeValue("SV_TBL_Limit", GetRecipeLimits.data ,true);
			} );
		}
		showModal('LimitModal');
	},
	setSV_TBL_Limit:()=> {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		var editedActionRow=LimitTabulator.actionRowWithIndex; 
		let tbl=appsmith.store.SV_TBL_Limit || [];
		if(tbl[editedActionRow.index] == undefined){
			tbl.push(editedActionRow.data);
		}else {
			//showAlert(JSON.stringify(editedActionRow.data));
			tbl[editedActionRow.index] = editedActionRow.data;
		}
		storeValue('SV_TBL_Limit',tbl,true);
	},
	onChangeInputMin : () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		var editedActionRow=LimitTabulator.actionRowWithIndex;
		var dataRow = editedActionRow.data;
		let tbl=appsmith.store.SV_TBL_Limit || [];
		if(tbl[editedActionRow.index] == undefined){
			tbl.push(editedActionRow.data);
		}else {
			//showAlert(JSON.stringify(editedActionRow.data));
			if(dataRow.IN == 'A') {
				dataRow.CALCULATED_MIN = dataRow.INPUT_MIN;
				//dataRow.CALCULATED_MAX = dataRow.INPUT_MAX;
			} else if(dataRow.IN == 'R') {
				dataRow.CALCULATED_MIN = Number(dataRow.TARGET_VALUE) - Number(dataRow.INPUT_MIN);
				//dataRow.CALCULATED_MAX = Number(dataRow.TARGET_VALUE) + Number(dataRow.INPUT_MAX);
			} else if(dataRow.IN == 'P') {
				var per = (Number(dataRow.TARGET_VALUE) * Number(dataRow.INPUT_MIN)) / 100;
				dataRow.CALCULATED_MIN = Number(dataRow.TARGET_VALUE) - Number(per);
			}
			tbl[editedActionRow.index] = dataRow;
		}
		storeValue('SV_TBL_Limit',tbl,true);
	},
	onChangeInputMax : () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		var editedActionRow=LimitTabulator.actionRowWithIndex;
		var dataRow = editedActionRow.data;
		let tbl=appsmith.store.SV_TBL_Limit || [];
		if(tbl[editedActionRow.index] == undefined){
			tbl.push(editedActionRow.data);
		}else {
			//showAlert(JSON.stringify(editedActionRow.data));
			if(dataRow.IN == 'A') {
				dataRow.CALCULATED_MAX = dataRow.INPUT_MAX;
			} else if(dataRow.IN == 'R') {
				dataRow.CALCULATED_MAX = Number(dataRow.TARGET_VALUE) + Number(dataRow.INPUT_MAX);
			} else if(dataRow.IN == 'P') {
				var per = (Number(dataRow.TARGET_VALUE) * Number(dataRow.INPUT_MAX)) / 100;
				dataRow.CALCULATED_MAX = Number(dataRow.TARGET_VALUE) + Number(per);
			}
			tbl[editedActionRow.index] = dataRow;
		}
		storeValue('SV_TBL_Limit',tbl,true);
	},
	onChangeTargetValue : () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		var editedActionRow=LimitTabulator.actionRowWithIndex;
		var dataRow = editedActionRow.data;
		let tbl=appsmith.store.SV_TBL_Limit || [];
		if(tbl[editedActionRow.index] == undefined){
			tbl.push(editedActionRow.data);
		}else {
			//showAlert(JSON.stringify(editedActionRow.data));
			if(dataRow.IN == 'A') {
				dataRow.CALCULATED_MIN = dataRow.INPUT_MIN;
				dataRow.CALCULATED_MAX = dataRow.INPUT_MAX;
			} else if(dataRow.IN == 'R') {
				if(dataRow.INPUT_MIN != null && dataRow.INPUT_MIN != "") {
					dataRow.CALCULATED_MIN = Number(dataRow.TARGET_VALUE) - Number(dataRow.INPUT_MIN);
				}
				if(dataRow.INPUT_MAX != null && dataRow.INPUT_MAX != "") {
					dataRow.CALCULATED_MAX = Number(dataRow.TARGET_VALUE) + Number(dataRow.INPUT_MAX);
				}
			} else if(dataRow.IN == 'P') {
				if(dataRow.INPUT_MIN != null &&  dataRow.INPUT_MIN != "") {
					var per = (Number(dataRow.TARGET_VALUE) * Number(dataRow.INPUT_MIN)) / 100;
					dataRow.CALCULATED_MIN = Number(dataRow.TARGET_VALUE) - Number(per);
				}
				if(dataRow.INPUT_MAX != null && dataRow.INPUT_MAX != "") {
					var per1 = (Number(dataRow.TARGET_VALUE) * Number(dataRow.INPUT_MAX)) / 100;
					dataRow.CALCULATED_MAX = Number(dataRow.TARGET_VALUE) + Number(per1);
				}
			}
			tbl[editedActionRow.index] = dataRow;
		}
		storeValue('SV_TBL_Limit',tbl,true);
	},
	SaveLimitsDataOld: () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		SaveLimits.run( () => { 
			GetRecipeItem.run( () => {
				storeValue("SV_TBL", GetRecipeItem.data ,true);
			} );
					showAlert('Recipe Limit Save successfully','success');
								}, 
					() => showAlert('Recipe Limit save failed.','error'));
	},
	SaveLimitsData:async () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		//Need to update recipe  data limit related property GetFilteredRecipe
		var limitsData = appsmith.store.SV_TBL_Limit;
		var PropertyDryContentFromLimits = limitsData.filter( x => x.ROW_NAME == "DRYCONTENT");
		var PropertySpecWeightFromLimits = limitsData.filter( x => x.ROW_NAME == "SPECWEIGHT");
		var calcField = appsmith.store.Calc_dryContentSpecWeightLimitField;
		if(PropertyDryContentFromLimits && PropertyDryContentFromLimits.length == 1) {
			calcField.DC_IN_VAL = PropertyDryContentFromLimits[0].IN
			calcField.DC_IN_MIN = PropertyDryContentFromLimits[0].INPUT_MIN
			calcField.DC_IN_MAX = PropertyDryContentFromLimits[0].INPUT_MAX
			calcField.DC_CALC_MIN = PropertyDryContentFromLimits[0].CALCULATED_MIN
			calcField.DC_CALC_MAX = PropertyDryContentFromLimits[0].CALCULATED_MAX
		}
		if(PropertySpecWeightFromLimits && PropertySpecWeightFromLimits.length == 1) {
			calcField.SW_IN_VAL = PropertySpecWeightFromLimits[0].IN
			calcField.SW_IN_MIN = PropertySpecWeightFromLimits[0].INPUT_MIN
			calcField.SW_IN_MAX = PropertySpecWeightFromLimits[0].INPUT_MAX
			calcField.SW_CALC_MIN = PropertySpecWeightFromLimits[0].CALCULATED_MIN
			calcField.SW_CALC_MAX = PropertySpecWeightFromLimits[0].CALCULATED_MAX  
		}
		storeValue("Calc_dryContentSpecWeightLimitField",calcField,true);
		//Need to update recipeItem from limit popup
		/*var recipeItemFromLimits = limitsData.filter( x => x.ROW_NAME == "RECIPEITEM");
		var recipeItemFromMainPage = appsmith.store.SV_TBL;
		for(let i=0; i < recipeItemFromLimits.length; i++) {
			var tempRecipeItem = recipeItemFromMainPage.filter( x => x.PROPERTY_CODE == recipeItemFromLimits[i].PROPERTY_CODE && x.RECIPE_ITEM_TYPE == "DOS");
			for(let j=0; j < tempRecipeItem.length;j++) {
				tempRecipeItem[j].IN_VAL = recipeItemFromLimits[i].IN
				tempRecipeItem[j].INPUT_MINIMUM = recipeItemFromLimits[i].INPUT_MIN
				tempRecipeItem[j].INPUT_MAXIMUM = recipeItemFromLimits[i].INPUT_MAX
				tempRecipeItem[j].CALC_MINIMUM = recipeItemFromLimits[i].CALCULATED_MIN
				tempRecipeItem[j].CALC_MAXIMUM = recipeItemFromLimits[i].CALCULATED_MAX
			}
		}
		storeValue("SV_TBL",recipeItemFromMainPage,true);*/
	}
}