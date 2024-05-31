export default {
	onClickPassData:()=>{
		debugger
		let selectedRows=DataTable.selectedRows;
		let result = selectedRows.map(data => (
																						{ 
																							RECIPE_NUMBER: data.RECIPE_NUMBER,
																						  RECIPE_ITEM_NUMBER: data.RECIPE_ITEM_NUMBER,
																							MATERIAL_CODE:data.MATERIAL_CODE,
																							PROPERTY_CODE:data.PROPERTY_CODE,
																					 	}
																					)
																 );
		let Recipe_Mat='';
		let Recipe_Prop='';
		let arrNew = [];
		if(result.length>0){
			for(let i=0; i < result.length;i++){
				let recipeArr=(result[i].RECIPE_NUMBER).split(',');
				for(let j=0; j <recipeArr.length;j++){
					const arr = {};	
					arr.SEQ_NO = recipeArr[j];
					arrNew.push(arr);
				}
				if(result[i].MATERIAL_CODE != null){
					if(Recipe_Mat.length == 0){
						Recipe_Mat=result[i].MATERIAL_CODE
					}else{
						Recipe_Mat=Recipe_Mat+','+result[i].MATERIAL_CODE;
					}
				}
				//if(result[i].PROPERTY_CODE != null){
					if(result[i].PROPERTY_CODE==null){
						storeValue('MassUpdateRecipeErrMsg','Please select valid data with property code.',true);
						showModal('msgModal');
						return;
					}
					if(Recipe_Prop.length == 0){
						Recipe_Prop=result[i].PROPERTY_CODE;
					}else{
						Recipe_Prop=Recipe_Prop+','+result[i].PROPERTY_CODE;
					}
				//}
			}
			storeValue('Recipe_Sel',arrNew,true);
			storeValue('Recipe_Mat',Recipe_Mat,true);
			storeValue('Recipe_Prop',Recipe_Prop,true);
			navigateTo('MassUpdateMR',{})
		}else{
			storeValue('MassUpdateRecipeErrMsg','Please select atleast one line item.',true);
			showModal('msgModal');
			return;
		}
	}
}