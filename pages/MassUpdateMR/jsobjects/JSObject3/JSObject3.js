export default {
	getOprtype: () => {
		console.log('A')
		let oprtype=1;
		if(appsmith.store.RecipeClassDropDown=='RM'	||	
			 appsmith.store.RecipeClassDropDown=='CO'	||	
			 appsmith.store.RecipeClassDropDown=='PD'	||	
			 appsmith.store.RecipeClassDropDown=='ST'){
			 let ddlDosCmd =  ddlDOSCMD.selectedOptionValue; 
			 if(ddlDosCmd=='DOS'){
			 	oprtype=1;
			}
			if(ddlDosCmd=='CMD'){
			 	oprtype=2;
			}
		}
		return oprtype;
	}
}