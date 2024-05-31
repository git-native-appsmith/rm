export default {
	GetRecipeFunctionByClass: (recipeClass) => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		if(recipeClass == 'RM') {
			return [
				{
					"label": "Above 100%",
					"value": "AB"
				},
				{
					"label": "Calculated",
					"value": "CAL"
				},
				{
					"label": "Constant",
					"value": "CON"
				},
				{
					"label": "Fixed",
					"value": "FIX"
				},
				{
					"label": "RIW/ST",
					"value": "RIW/ST"
				}
			];
		} else if(recipeClass == 'CO') {
			return [
				{
					"label": "Above 100%",
					"value": "AB"
				},
				{
					"label": "Calculated",
					"value": "CAL"
				},
				{
					"label": "Constant",
					"value": "CON"
				},
				{
					"label": "Fixed",
					"value": "FIX"
				},
				{
					"label": "Sollwert",
					"value": "SOW"
				}
			];
		} else if (recipeClass == 'ST') {
			return [
				{
					"label": "Above 100%",
					"value": "AB"
				},
				{
					"label": "Constant",
					"value": "CON"
				},
				{
					"label": "Fixed",
					"value": "FIX"
				},
				{
					"label": "RIW",
					"value": "RIW"
				},
				{
					"label": "RIW/ST",
					"value": "RIW/ST"
				},
				{
					"label": "Sollwert",
					"value": "SOW"
				},{
					"label": "Strauf",
					"value": "Strauf"
				}
			];
		} else if(recipeClass == 'SU') {
			return [
				{
					"label": "GESTR",
					"value": "GESTR"
				},
				{
					"label": "RIW",
					"value": "RIW"
				},
				{
					"label": "RIW/ST",
					"value": "RIW/ST"
				},
				{
					"label": "Rohp",
					"value": "ROHP"
				},
				{
					"label": "Sollwert",
					"value": "SOW"
				},{
					"label": "UNGES",
					"value": "UNGES"
				}
			];
		} else if(recipeClass == 'PD') {
			return [
				{
					"label": "Above 100%",
					"value": "AB"
				},
				{
					"label": "Calculated",
					"value": "CAL"
				},
				{
					"label": "Constant",
					"value": "CON"
				},
				{
					"label": "Fixed",
					"value": "FIX"
				}
			];
		} else if(recipeClass == 'CS') {
			return [
				{
					"label": "Above 100%",
					"value": "AB"
				},
				{
					"label": "Base Paper",
					"value": "BP"
				}
			];
		} else if(recipeClass == 'EN') {
			return [
				{
					"label": "Above 100%",
					"value": "AB"
				},
				{
					"label": "Calculated",
					"value": "CAL"
				},
				{
					"label": "Constant",
					"value": "CON"
				},
				{
					"label": "Fixed",
					"value": "FIX"
				},
				{
					"label": "Sollwert",
					"value": "SOW"
				}
			];
		} else if(recipeClass == 'MS') {
			return [
				{
					"label": "Above 100%",
					"value": "AB"
				},
				{
					"label": "RIW",
					"value": "RIW"
				},
				{
					"label": "Rohp",
					"value": "ROHP"
				},
				{
					"label": "Sollwert",
					"value": "SOW"
				}
			];
		} else if(recipeClass == 'PR') {
			return [
				{
					"label": "Above 100%",
					"value": "AB"
				},
				{
					"label": "Calculated",
					"value": "CAL"
				},
				{
					"label": "Constant",
					"value": "CON"
				},
				{
					"label": "Fixed",
					"value": "FIX"
				},
				{
					"label": "RIW",
					"value": "RIW"
				},
				{
					"label": "Sollwert",
					"value": "SOW"
				}
			];
		}
	}
}