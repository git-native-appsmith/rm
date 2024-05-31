export default {
	checkUniqueRecipeSetname: () => {
		UniqueRecipeSetName.run((result)=>{
				if(String(result) =='1'){
					storeValue('errMsgStr','Recipeset Name Already Exist.',true);			
					showModal('msgModal');
				}
			});
	},
	checkVersionOverLap:()=>{
		GetRecipeSetVersionLst.run(()=>{
												if(GetRecipeSetVersionLst.data.length>0){
													showModal('Version_List');
												}
											});
		
	},
	cellBg:(currentRow)=>{
		const index = GetRecipeSetRecipe.data.findIndex(item => item.RECIPE_NUMBER === currentRow.RECIPE_NUMBER);
		if(index >= 0){
			return '#86efac'
		}else{
			return ''
		}
	}
}