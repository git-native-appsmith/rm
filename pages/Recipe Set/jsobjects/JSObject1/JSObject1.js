export default {
	RecipeSetIdForFilter: () => {
		let ret;
		if(RecipeSetIdModal.text.trim() == ''){
			ret = 'NA';
		} else {
			ret = RecipeSetIdModal.text.trim();
		}
		return ret.replace(/ /gi, "%20");
	},
	ValidDateForSearch: () => {
		const selectedDate = new Date(ValidFromDatePickerModal.selectedDate);
		const d = new Date('01-MAR-2022');
		let validDate = '';
		validDate = selectedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric'}).replace(/ /g, '-');
		if(validDate === 'Invalid-Date') {
			validDate = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric'}).replace(/ /g, '-');
		}
		return validDate;
	},
	RecipeSetRowSelected: async () => {
		await JSObject1.test();
		closeModal('RecipeSetSearchModal');
		//GetFilteredRecipe.clear();
	},
	test: () => {
		 storeValue('RecipeSetNumber',RecipeSetTable.selectedRow.RECIPE_SET_NUMBER,true);
	   storeValue('RecipeSetDesc',RecipeSetTable.selectedRow.DESCRIPTION,true);
		 storeValue('RecipeSetName',RecipeSetTable.selectedRow.NAME,true);
	},
	GetRecipeClassDropDown:  () => {
		var recipeClass = GetRecipeClass.data.filter(x => x.value != 'All');
		if(recipeClass.filter(x => x.value == 'Select').length == 0){
			const te =  {"label":"Select","value":"Select"};
			recipeClass.splice(0, 0, te);
		}
		return recipeClass;
	},
	MachineGroupDropDown: () => {
		var machineGroup = GetAllMachineGroups.data;
		if(machineGroup.filter(x => x.value == 'Select').length == 0) {
			const te =  {"label":"Select","value":"Select"};
			machineGroup.splice(0, 0, te);
		}
		return machineGroup;
	},
	RecipeTypeDropDown:() => {
		var recipeType = GetRecipeTyeOptionData.data;
		if(recipeType.filter(x => x.value == 'Select').length == 0) {
			const te =  {"label":"Select","value":"Select"};
			recipeType.splice(0, 0, te);
		}
		return recipeType;
	},
	RecipeClassInputForRecipeType: () => {
		if(ClassSelect.selectedOptionValue == "Select" || ClassSelect.selectedOptionValue === undefined){
			return "NA";
		} else {
			return appsmith.store.RecipeClassDropDown;
		}
	},
	MachineGroupInputForRecipeType: () => {
		if(ResourceSelect.selectedOptionValue == "Select" || ResourceSelect.selectedOptionValue === undefined){
			return "NA";
		} else {
			return appsmith.store.ResourceGroupDropDown;
		}
	},
	RecipeClassInputForRecipeFiltered: () => {
		if(ClassSelect.selectedOptionValue == "Select" || ClassSelect.selectedOptionValue === undefined){
			return null;
		} else {
			return appsmith.store.RecipeClassDropDown;
		}
	},
	LoadRecipeTypeDropDown :async () => {
		const recipeClass = ClassSelect.selectedOptionValue;
		await storeValue('RecipeClassDropDown',recipeClass,true);
		GetRecipeTyeOptionData.run();
	},
	onchangeResourceDropDown: async () => {
		const resource = ResourceSelect.selectedOptionValue;
		await storeValue("ResourceGroupDropDown",resource,true);
		GetRecipeTyeOptionData.run();
	},
	machineGroupInput: () => {
		if(ResourceSelect.selectedOptionValue == "Select" || ResourceSelect.selectedOptionValue === undefined){
			return null;
		} else {
			return appsmith.store.ResourceGroupDropDown;
		}
	},
	RecipeTypeNumberInput: () => {
		if(appsmith.store.RecipeTypeDropDown== undefined){
			if(RecipeTypeSelect.selectedOptionValue == "Select" || RecipeTypeSelect.selectedOptionValue === undefined){
				return null;
			} else {
				return appsmith.store.RecipeTypeDropDown;
			}
		}else{
			return appsmith.store.RecipeTypeDropDown;
		}
	},
	LoadRecipe: () => {
		let selectedrow = Tabulator1.actionRow;
		var beforeChangeRecipeSetCat = GetFilteredRecipeSet.data.filter( x => x.RECIPE_SET_NUMBER == selectedrow.RECIPE_SET_NUMBER)[0].CATEGORY;
		if(beforeChangeRecipeSetCat == 'Standard') {
			return GetFilteredRecipe.data.filter(x => x.RECIPE_STATUS == 'A' || x.RECIPE_STATUS == 'H' || x.RECIPE_STATUS == 'P');
		} else {
			return GetFilteredRecipe.data.filter(x => x.RECIPE_STATUS != 'N');
		}
	},
	ResetButtonClick: async () => {
		await JSObject1.ResetStore(); 
		GetRecipeTyeOptionData.run( () => { GetRecipeTyeOptionData.run(); },{});
		resetWidget("SearchForm");
		GetFilteredRecipe.clear();
	},
	ResetStore: () => {
		storeValue('RecipeSetName',undefined,true);
		storeValue('RecipeSetNumber',undefined,true);
		storeValue('RecipeSetDesc',undefined,true);
		storeValue('ResourceGroupDropDown',undefined,true);
		storeValue('RecipeClassDropDown',undefined,true);
		storeValue('RecipeTypeDropDown',undefined,true);
		storeValue('InterMaterial',undefined,true);
		storeValue('productCodes',undefined,true);
		//storeValue('modificNo',undefined,true);
		storeValue('uptime',undefined,true);
	},
	onSearchModal:() =>{
		if(RecipeSetNameInput.text==''){
			showAlert('Please input recipeset id number.')
		}else{
			GetFilteredRecipe.run();
		}
	},
	AddupdateRecipeSetOkButtonClick: () => {
		if(RecipeSetNameInput.text=== Tabulator1.actionRow.NAME){
			showAlert('Source and target recipeset can not be same.');
		}else{
			CopyRecipeCopy.run( () => {
			GetFilteredRecipeSet.run();
			closeModal('AddRecipeModal');
			showAlert('Recipes Copied successfully');
		},
		() => showAlert('Failed to Copy RecipeSet'));
		}
	},
	RecipeCopyApiInput: () => {
		try {
			let selectedrow = Tabulator1.actionRow;
			let temp ;
			if(RecipeSetAddupdate.isIsoDate(selectedrow.BASED_ON_DATE)){
				temp = selectedrow.BASED_ON_DATE;
			}else{
				temp = RecipeSetUtil.convertDateToISO(selectedrow.BASED_ON_DATE);
			}
			if(temp != new Date('1970-01-01').toISOString()) {
				selectedrow.BASED_ON_DATE = temp;
			}
			let temp1 ;
			if(RecipeSetAddupdate.isIsoDate(selectedrow.START_DATE)){
				temp1 = selectedrow.START_DATE;
			}else{
					temp1 =  RecipeSetReset.convertDateToISO(selectedrow.START_DATE);
					if(temp1 != new Date('1969-01-01').toISOString()) {
						selectedrow.START_DATE = temp1;
					}
			}
			let temp2 ;
			if(RecipeSetAddupdate.isIsoDate(selectedrow.END_DATE)){
				temp2 = selectedrow.END_DATE;
			}else{
					temp2 =  RecipeSetReset.convertDateToISO(selectedrow.END_DATE);
					if(temp2 != new Date('1969-01-01').toISOString()) {
						selectedrow.END_DATE = temp2;
					}
			}
			if(selectedrow.START_DATE == ""){
				if(selectedrow.CATEGORY=="Standard"){
					selectedrow.START_DATE = new Date().toISOString();
				}else{
					selectedrow.START_DATE = null
				}
			}
			if(selectedrow.END_DATE == ""){
				selectedrow.END_DATE = null;
			}
			if(selectedrow.BASED_ON_RECIPE_SET == "" || Number(selectedrow.BASED_ON_RECIPE_SET) == 0){
				selectedrow.BASED_ON_RECIPE_SET = null;
			} else {
				//selectedrow.BASED_ON_RECIPE_SET = Number(selectedrow.BASED_ON_RECIPE_SET);
				selectedrow.BASED_ON_RECIPE_SET = selectedrow.BASED_ON_RECIPE_SET;
			}
			selectedrow.CRUSER=appsmith.user.email.split('@')[0];
			selectedrow.MODIF_NUMBER = Number(appsmith.store.modificNo.toString());
			if(selectedrow.BASED_ON_DATE == ""){
				selectedrow.BASED_ON_DATE = null;
			}
			if(selectedrow.Recipe_UPTIME == ""){
				selectedrow.Recipe_UPTIME = null;
			}else{
				selectedrow.Recipe_UPTIME = new Date().toISOString();
			}
			if(selectedrow.Recipe_CRTIME == ""){
				selectedrow.Recipe_CRTIME = null;
			}
			if(selectedrow.MODIF_NUMBER_CREATED_DATE == ""){
				selectedrow.MODIF_NUMBER_CREATED_DATE = null;
			}
			//selectedrow.RECIPE_NUMBER = RecipeTableCopy.selectedRows.map(x => x.RECIPE_NUMBER);
			selectedrow.RECIPE_NUMBER = (RecipeTableCopy.selectedRows.filter(x => x.RECIPE_NUMBER != undefined)).map(x => x.RECIPE_NUMBER);
			selectedrow.RECIPESET_CPY_DESC= RecipeSetNameInput.text;
			return selectedrow;
		}
		catch (e) {
			var errormsg = e.message;
			console.log(errormsg + "CopyApiInput" );
		}
	},
	LoadModalRecipeSetDate:()=>{
		return GetFilteredRecipeSetModal.data.filter(x => x.RECIPE_SET_NUMBER != Tabulator1.actionRow.RECIPE_SET_NUMBER);
	},
	LoadSelectedRecipe_Set:()=>{
		let arr=[];
		for(let i=0; i < GetRecipeSetRecipe.data.length; i++){
			const recipe_no =GetRecipeSetRecipe.data[i].RECIPE_NUMBER
			const data =JSObject1.LoadRecipe()
			const index = data.findIndex(item => item.RECIPE_NUMBER === recipe_no);
			arr.push(index)
		}
		return arr;
	},
	DisableProductInput: () => {
		if(ClassSelect.selectedOptionLabel == 'Raw Material' || ClassSelect.selectedOptionLabel == 'Pulp Dissolving' || ClassSelect.selectedOptionLabel=='Coating') {
			return true;
			//showModal('IntermediateMaterialModal');
		} else {
			return false;//showModal('ProductCodeModal');
		}
	},
	DisableInterMatCodeInput: () => {
		if(ClassSelect.selectedOptionLabel == 'Raw Material' || ClassSelect.selectedOptionLabel == 'Pulp Dissolving' || ClassSelect.selectedOptionLabel=='Coating' || ClassSelect.selectedOptionLabel=='Select' || ClassSelect.selectedOptionValue === undefined) {
			return false;
			//showModal('IntermediateMaterialModal');
		} else {
			return true;//showModal('ProductCodeModal');
		}
	},
	ProductCodeInputDefault: () => {
		if(JSObject1.DisableProductInput()) {
			storeValue("productCodes","",true);
			storeValue("productCodes",undefined,true);
			return "";
		} else {
			return appsmith.store.productCodes;
		}
	},
	InterMediateCodeDefault: () => {
		if(JSObject1.DisableInterMatCodeInput()) {
			storeValue("InterMaterial","",true);
			storeValue("InterMaterial",undefined,true);
			return "";
		} else {
			return appsmith.store.InterMaterial;
		}
	},
	copyRecipeModifNoCheck:()=>{
		let selectedrow = Tabulator1.actionRow;
						if(selectedrow.CATEGORY == 'Standard'){
							//StandardRecipeSetExist.run((result)=>{
								//if(String(result)!='0'){
							if(appsmith.store.modificCTG=='ST' ||appsmith.store.modificCTG==null){
									//showAlert('Standard Recipeset Already exist','error');
									JSObject1.ResetButtonClick();				
								  GetRecipeSetRecipe.run();							
								  showModal('AddRecipeModal')
								}else{
									//Open associate recipe list modal
									storeValue('errMsgStr','Modification number already assocaited with planned recipes.',true);
									showModal('msgModal');
									return;
								}
							//});
						}else{
							if(appsmith.store.modificCTG=='PN' ||appsmith.store.modificCTG==null){
									//Open associate recipe list modal
									JSObject1.ResetButtonClick();				
								  GetRecipeSetRecipe.run();							
								  showModal('AddRecipeModal')
							}else{
								storeValue('errMsgStr','Modification number already assocaited with standard recipes.',true);			
								showModal('msgModal');
							}
						}  
	}
}
