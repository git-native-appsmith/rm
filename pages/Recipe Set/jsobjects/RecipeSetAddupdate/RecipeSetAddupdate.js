export default {
	SaveRecipeSet: () => {
		const inputs =Tabulator1.editedRows;
		const modifNo = ModificationNumberSearch.text;
		if(modifNo.length == 0 || modifNo == "") {
			storeValue('errMsgStr','Please input modification number.',true);			
			showModal('msgModal');
		} else {
			if(inputs.length > 0) 
			{
				IsModificNoExist.run((result) => {
				if(String(result) != ModificationNumberSearch.text.trim()){
					 showModal('ModificationNumberAlert');
				} else {
					 const CreatedInput = Tabulator1.editedRows.filter( x => x.RECIPE_SET_NUMBER == "");
					 if(CreatedInput.length > 0){
						 if(CreatedInput.length == 1)
							 {
									if(CreatedInput[0].CATEGORY == 'Standard'){
										StandardRecipeSetExist.run((result)=>{
											if(String(result)!='0'){
												closeModal('InsertModel');
												storeValue('errMsgStr','Standard Recipeset already exist.',true);
												showModal('msgModal');
											}else{
												CreateRecipeSet.run( () => {
												closeModal('InsertModel');
												GetFilteredRecipeSet.run();
												showAlert('RecipeSet Saved successfully');
												},
												() => showAlert('Failed to Create RecipeSet'));
											}
										});
									}else{
										let selectedrows = Tabulator1.editedRows.filter( x => x.RECIPE_SET_NUMBER == "");
										let errorFlag=0;
										for(let i=0;i<selectedrows.length;i++){
												if(selectedrows[i].VERSION_NUMBER=='' || selectedrows[i].VERSION_NUMBER==0 || selectedrows[i].VERSION_NUMBER== null){
												 errorFlag=1;
												}
											}
											if(errorFlag==1){
												storeValue('errMsgStr','Version number is mandaotory.',true);
												showModal('msgModal');
											}else{
												CreateRecipeSet.run(() => {
													closeModal('InsertModel');
													GetFilteredRecipeSet.run();
													showAlert('RecipeSet Saved successfully');
												},
												() => showAlert('Failed to Create RecipeSet'));
											}
									}
							 }else{
								 let selectedrows = Tabulator1.editedRows.filter( x => x.RECIPE_SET_NUMBER == "");
								 let errorFlag=0;
								 for(let i=0;i<selectedrows.length;i++){
									 if(selectedrows[i].VERSION_NUMBER==''  || selectedrows[i].VERSION_NUMBER==0 || selectedrows[i].VERSION_NUMBER== null){
										 errorFlag=1;
									 }
								}
								if(errorFlag==1){
									storeValue('errMsgStr','Version number is mandaotory.',true);
									showModal('msgModal');
								}else{
									CreateRecipeSet.run(() => {
										closeModal('InsertModel');
										GetFilteredRecipeSet.run();
										showAlert('RecipeSet Saved successfully');
									},
									() => showAlert('Failed to Create RecipeSet'));
								} 
								}
				}
				}
				},
				() => showAlert('Failed to Validate Modification number'));			
			}
		}
	},
	CreateApiInput: () => {
		debugger
		let selectedrows = Tabulator1.editedRows.filter( x => x.RECIPE_SET_NUMBER == "");
		selectedrows.forEach( (x) => {
			let temp = RecipeSetUtil.convertDateToISO(x.BASED_ON_DATE);
			if(temp != new Date('1970-01-01').toISOString()) {
		   x.BASED_ON_DATE = temp;
			}
			if(x.BASED_ON_DATE == ""){
				x.BASED_ON_DATE = null;
			}
			let temp1 ;
			if(RecipeSetAddupdate.isIsoDate(x.START_DATE)){
				temp1 = x.START_DATE;
			}else{
				temp1 = RecipeSetReset.convertDateToISO(x.START_DATE);
			}
			if(temp1 != new Date('1970-01-01').toISOString()) {
		   x.START_DATE = temp1;
			}
			if(x.START_DATE == ""){
					if(x.CATEGORY=="Standard"){
						x.START_DATE = new Date().toISOString();
					}else{
						x.START_DATE = null
					}
			}
			let temp2 ;
			if(RecipeSetAddupdate.isIsoDate(x.END_DATE)){
				temp2 = x.END_DATE;
			}else{
				temp2 = RecipeSetReset.convertDateToISO(x.END_DATE);
			}
			if(temp2 != new Date('1970-01-01').toISOString()) {
		   x.END_DATE = temp2;
			}
			if(x.END_DATE == ""){
				x.END_DATE = null;
			}
			if(x.Recipe_UPTIME == ""){
				x.Recipe_UPTIME = null;
			}
			if(x.Recipe_CRTIME == ""){
				x.Recipe_CRTIME = null;
			}
			if(x.MODIF_NUMBER_CREATED_DATE == ""){
				x.MODIF_NUMBER_CREATED_DATE = null;
			}
			x.MODIF_NUMBER = Number(appsmith.store.modificNo.toString());
			x.RECIPE_SET_NUMBER = 0;
			x.BASED_ON_RECIPE_SET = 0;
			x.CRUSER="";
			if(x.VERSION_NUMBER==''||x.VERSION_NUMBER=='0'){
				x.VERSION_NUMBER=null;
			}
			return x;
		});
		console.log(JSON.stringify(selectedrows));
		return selectedrows;
	},
	callinsertModal: () =>{
		const inputs =Tabulator1.editedRows;
		const modifNo = ModificationNumberSearch.text;
		if(modifNo.length == 0 || modifNo == "") {
			storeValue('errMsgStr','Please input modification number.',true);			
			showModal('msgModal');
		} else {
			storeValue('showErrorMessage',false,false);
			if(inputs.length > 0) 
			{
					IsModificNoExist.run((result) => {
						if(String(result) != ModificationNumberSearch.text.trim()){
							 showModal('ModificationNumberAlert');
						} else {
								if(appsmith.store.modificCTG=='PN' ||appsmith.store.modificCTG==null){
									UniqueRecipeSetName.run((result)=>{
									if(String(result) =='1'){
										storeValue('errMsgStr','Recipeset Name Already Exist.',true);			
										showModal('msgModal');
									}else{
										showModal('InsertModel');
									}
								});
							}else{
								storeValue('errMsgStr','Modification number already assocaited with planned recipes.',true);			
								showModal('msgModal');
							}
						}
					},
					() => showAlert('Failed to Validate Modification number'));			
			}
		}
	},
	isIsoDate:(str)=>{
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
  const d = new Date(str); 
  return d instanceof Date && !isNaN(d) && d.toISOString()===str; // valid date 
	}
}