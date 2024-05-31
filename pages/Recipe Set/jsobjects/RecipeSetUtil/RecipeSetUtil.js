export default {
	updateFromNum: () => {
	let ret =1;
		if(!Number(FromNumInput.text)){
			ret = 1;
		} else {
			ret = FromNumInput.text;
		}
		return  ret;
	},
	updateToNum : () => {
		let retValue = 9999999;
		if(!Number(ToNumInput.text)) {
			retValue = 9999999;
		} else {
			retValue = ToNumInput.text;
		}
		return retValue;
	},
	updateUser : () => {
		let ret;
		if(UserSelect.selectedOptionValue == 'Select'){
			ret = 'NA';
		} else {
			ret = UserSelect.selectedOptionValue.replace(" ","%20");
		}
		return ret;
	},
	myFun2: () => {
		//write code here
		//const test = Tabulator1Original.tableData;
		//let te = Table1.selectedRows;
		//let editedRow = Tabulator1Original.tableData[Tabulator1Original.editedRowIndex].RECIPE_SET_NUMBER;
		//const selected = Tabulator1Original.selectedRows;
	 //const res= await IsModificNoExist.run();
	//	let ret = "";
	 //if(String(res) === ModificationNumberSearch.text.trim()){
	//	 ret = "if"
	 //}
		//const rows = Tabulator1Original.editedRows;	
		let ret;
		if(FromNumInput.text == ''){
			ret = '0';
		} else {
			ret = FromNumInput.text.length;
		}
		return FromNumInput.text.length;
	},
	SaveRecipeSet: async () => {
		const inputs =Tabulator1.editedRows;
		//const CreatedInput = Tabulator1.editedRows.filter( x => x.RECIPE_SET_NUMBER == "");
		//const updatedInput = Tabulator1.editedRows.filter( x => Number(x.RECIPE_SET_NUMBER) > 0);
		const modifNo = ModificationNumberSearch.text;
		if(modifNo.length == 0 || modifNo == "") {
			storeValue('showErrorMessage',true,false);
		} else {
			
			storeValue('showErrorMessage',false,false);
		if(inputs.length > 0) {
			// First validate the Modific No then call API
			await IsModificNoExist.run((result) => {
	     if(String(result) != ModificationNumberSearch.text.trim()){
		     showModal('ModificationNumberAlert');
			 } else {
				 const CreatedInput = Tabulator1.editedRows.filter( x => x.RECIPE_SET_NUMBER == "");
		     const updatedInput = Tabulator1.editedRows.filter( x => Number(x.RECIPE_SET_NUMBER) > 0);
				 if(CreatedInput.length > 0){
			  CreateRecipeSet.run(
        () => {
				GetFilteredRecipeSet.run();
				showAlert('RecipeSet Saved successfully');
				},
			() => showAlert('Failed to Create RecipeSet'));
			}
			   if(updatedInput.length > 0) {
				UpdateRecipeSet.run( () => { 
				GetFilteredRecipeSet.run();
				showAlert('RecipeSet Saved successfully');
				}, () => showAlert('Failed to Saved RecipeSet'));
			}
			 }
			 },
			() => showAlert('Failed to Validate Modification number'));
			
		}
		}
	},
	RecipeSetIdForFilter: () => {
		let ret;
		if(RecipeSetId.text.trim() == ''){
			ret = 'NA';
		} else {
			ret = RecipeSetId.text.trim();
		}
		return ret.replace(/ /gi, "%20");
	},
	CreateNewRecipeSetClick:  () => {
		const modificationNumber = ModificationNumberSearch.text.trim();
		if(modificationNumber == '') {
		} else if(modificationNumber.length > 0) {
			// Need to verify modificationNumber API call
			 IsModificNoExist.run((result) => {
	     if(String(result) != ModificationNumberSearch.text.trim()){
		     showModal('ModificationNumberAlert');
			 }
			 },
			() => showAlert('Failed to Validate Modification number'));
		}
	},
	CategoryData: async () => {
		const allOption = { label : "All", value: "All" };
		let category = await GetRecipeSetCategory.run();
		let res= category;
		res.unshift(allOption);
		return res;
		},
	ValidDateForSearch: () => {
		const selectedDate = new Date(ValidFromDatePicker.selectedDate);
		const d = new Date('01-MAR-2022');
		let validDate = '';
		validDate = selectedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric'}).replace(/ /g, '-');
		if(validDate === 'Invalid-Date') {
			validDate = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric'}).replace(/ /g, '-');
		}
		return validDate;
	},
	UpdateApiInput: () => {
		let selectedrows = Tabulator1.editedRows.filter( x => Number(x.RECIPE_SET_NUMBER) > 0);
		selectedrows.forEach( (x) => {
			let temp = RecipeSetUtil.convertDateToISO(x.BASED_ON_DATE);
			if(temp != new Date('1970-01-01').toISOString()) {
		   x.BASED_ON_DATE = temp;
			}
			let temp1 = RecipeSetUtil.convertDateToISO(x.START_DATE);
			if(temp1 != new Date('1970-01-01').toISOString()) {
		   x.START_DATE = temp1;
			}
			return x;
		});
		return selectedrows;
	},
	convertDateToISO: (dateinput) => {
		if(dateinput && dateinput.length > 0){
				var date = "";
				if(dateinput.indexOf('-') > 0){
		  	let datesplit = dateinput.split(' ');
			  let datearr = datesplit[0].split('-');
			  date = datearr[2]+'-'+datearr[1] + '-'+datearr[0] + ' ' + datesplit[1];
				} else if(dateinput.indexOf('/') > 0) {
					let datearr = dateinput.split(' ');
					let dateSplit = datearr[0].split('/');
			    date= dateSplit[2]+'-'+dateSplit[1]+'-'+dateSplit[0] + ' ' + datearr[1];
				}
			return new Date(date).toISOString();
		  } else {
				return dateinput;
			} 
	},
	test: () => {
		return RecipeSetUtil.convertDateToISO("31-03-2022 00:00");
	},
	CreateApiInput: () => {
		let selectedrows = Tabulator1.editedRows.filter( x => x.RECIPE_SET_NUMBER == "");
		selectedrows.forEach( (x) => {
			let temp = RecipeSetUtil.convertDateToISO(x.BASED_ON_DATE);
			if(temp != new Date('1970-01-01').toISOString()) {
		   x.BASED_ON_DATE = temp;
			}
			if(x.BASED_ON_DATE == ""){
				x.BASED_ON_DATE = null;
			}
			let temp1 = RecipeSetUtil.convertDateToISO(x.START_DATE);
			if(temp1 != new Date('1970-01-01').toISOString()) {
		   x.START_DATE = temp1;
			}
			x.MODIF_NUMBER = Number(ModificationNumberSearch.text);
			x.RECIPE_SET_NUMBER = 0;
			return x;
		});
		return selectedrows;
	},
	OnModificNoTextChange: () => {
	const modifNo = ModificationNumberSearch.text;
		if(modifNo.length == 0 || modifNo == "") {
			storeValue('showErrorMessage',true,false);
		} else {
			storeValue('showErrorMessage',false,false);
		}
 },
 RecipeSetDelete: () => {
	 DeleteRecipeSet.run(() => {
		 closeModal('DeleteModal'); 
		 showAlert('RecipeSet deleted Successfully');
		 GetFilteredRecipeSet.run();
	 },
	() => showAlert('Failed to delete RecipeSet .','error'));
 },
 CopyApiInput: () => {
		let selectedrow = Tabulator1.actionRow;
			let temp = RecipeSetUtil.convertDateToISO(selectedrow.BASED_ON_DATE);
			if(temp != new Date('1970-01-01').toISOString()) {
		   selectedrow.BASED_ON_DATE = temp;
			}
			let temp1 = RecipeSetUtil.convertDateToISO(selectedrow.START_DATE);
			if(temp1 != new Date('1970-01-01').toISOString()) {
		   selectedrow.START_DATE = temp1;
			}
			if(selectedrow.BASED_ON_RECIPE_SET == "" || Number(selectedrow.BASED_ON_RECIPE_SET) == 0){
				selectedrow.BASED_ON_RECIPE_SET = null;
			} else {
				selectedrow.BASED_ON_RECIPE_SET = Number(selectedrow.BASED_ON_RECIPE_SET);
			}
	    selectedrow.MODIF_NUMBER = Number(ModificationNumberSearch.text);
		return selectedrow;
	},
	SaveAsRecipeSet: async () => {
		const modifNo = ModificationNumberSearch.text;
		if(modifNo.length == 0 || modifNo == "") {
			storeValue('showErrorMessage',true,false);
		}else {
			storeValue('showErrorMessage',false,false);
			// First validate the Modific No then call API
			await IsModificNoExist.run((result) => {
	     if(String(result) != ModificationNumberSearch.text.trim()){
		     showModal('ModificationNumberAlert');
			 } else {
			 CopyRecipeSet.run( () => {
				GetFilteredRecipeSet.run();
				showAlert('RecipeSet Copied successfully');
				},
			  () => showAlert('Failed to Copy RecipeSet'));
			 }
			 },
			() => showAlert('Failed to Validate Modification number'));
		}
	},
	recipeSetPageLoad: async () => {
		GetFilteredRecipeSet.run( () => { GetFilteredRecipeSet.run(); }, () => { } );
	}
	
}