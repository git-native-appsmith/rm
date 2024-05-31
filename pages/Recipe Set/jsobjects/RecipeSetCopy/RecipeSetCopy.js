export default {
	CopyApiInput: () => {
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
		//let temp1 =  RecipeSetCopy.convertDateToISO(selectedrow.START_DATE);
		//let temp1 =  selectedrow.START_DATE;
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
			/*let temp1 =  selectedrow.START_DATE;
			if(temp1==null){
				selectedrow.START_DATE = null;
			}else{
				if(selectedrow.START_DATE.indexOf('T') <= 0 && selectedrow.START_DATE.indexOf('Z') <= 0) {
					if(selectedrow.START_DATE.indexOf('-') > 0){
						temp1 =  RecipeSetCopy.convertDateToISO(selectedrow.START_DATE);
					}else{
						temp1 =  RecipeSetUtil.convertDateToISO(selectedrow.START_DATE);
					}
					if(temp1 != new Date('1969-01-01').toISOString()) {
						selectedrow.START_DATE = temp1;
					}
				}
			}
			let temp2 =  selectedrow.END_DATE;
			if(temp2==null){
				selectedrow.END_DATE = null;
			}else{
				if(selectedrow.END_DATE.indexOf('T') <= 0 && selectedrow.END_DATE.indexOf('Z') <= 0) {
					if(selectedrow.END_DATE.indexOf('-') > 0){
						temp2 =  RecipeSetCopy.convertDateToISO(selectedrow.END_DATE);
					}else{
						temp2 =  RecipeSetUtil.convertDateToISO(selectedrow.END_DATE);
					}
					if(temp2 != new Date('1970-01-01').toISOString()) {
						selectedrow.END_DATE = temp2;
					}
				}
			}*/

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
				selectedrow.BASED_ON_RECIPE_SET = selectedrow.RECIPE_SET_NUMBER;
			}
			selectedrow.CRUSER="";
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
			if(selectedrow.VERSION_NUMBER==''||selectedrow.VERSION_NUMBER=='0'){
				selectedrow.VERSION_NUMBER=null;
			}
			selectedrow.RECIPE_NUMBER = RecipeTable.selectedRows.map(x => x.RECIPE_NUMBER);
			return selectedrow;
		}
		catch (e) {
			var errormsg = e.message;
			console.log(errormsg + "CopyApiInput" );
		}
	},
	SaveAsRecipeSet:() => {
		const modifNo = ModificationNumberSearch.text;
		//let ver_no = Tabulator1.actionRow.;
		if(modifNo.length == 0 || modifNo == "") {
			storeValue('errMsgStr','Please input modification number.',true);			
			showModal('msgModal');
		}else {
			// First validate the Modific No then call API
			IsModificNoExist.run((result) => {
				if(String(result) != ModificationNumberSearch.text.trim()){
					showModal('ModificationNumberAlert');
				} else {
						let selectedrow = Tabulator1.actionRow;
						if(selectedrow.CATEGORY == 'Standard'){
							StandardRecipeSetExist.run((result)=>{
								if(String(result)!='0'){
									//showAlert('Standard Recipeset Already exist','error');
									storeValue('errMsgStr','Standard Recipeset already exist.',true);
									showModal('msgModal');
								}else{
									//Open associate recipe list modal
									GetAssociateRecipeByRecipeSet.run();
									showModal('AssociateRecipeModal');
								}
							});
						}else{
							if(appsmith.store.modificCTG=='PN' ||appsmith.store.modificCTG==null){
									UniqueRecipeSetNameForCopy.run((result)=>{
									if(String(result) =='1'){
										storeValue('errMsgStr','Recipeset name already exist.',true);			
										showModal('msgModal');
									}else{
										//Open associate recipe list modal
										GetAssociateRecipeByRecipeSet.run();
										showModal('AssociateRecipeModal');
									}
								});
							}else{
								storeValue('errMsgStr','Modification number already assocaited with standard recipes.',true);			
								showModal('msgModal');
							}
						}              
				}
			},
			() => showAlert('Failed to Validate Modification number'));
		}
	},
	test: () => {
		var date="31/05/2022 10:11";
		if(date.indexOf('-') > 0){
			return RecipeSetCopy.convertDateToISO(date);
		}else{
			return RecipeSetUtil.convertDateToISO(date);
		}
	},
	convertDateToISO: (dateinput) => {
		try {
			if(dateinput && dateinput.length > 0){
				var date = "";
				if(dateinput.indexOf('-') > 0){
					let datesplit = dateinput.split(' ');
					let datearr = datesplit[0].split('-');
					if(dateinput.indexOf(' ') > 0){
						date = datearr[2]+'-'+datearr[1] + '-'+datearr[0] + ' ' + datesplit[1];
					} else {
						date = datearr[2]+'-'+datearr[1] + '-'+datearr[0] + ' 05:30'  ;
					}

				} else if(dateinput.indexOf('/') > 0) {
					let datearr = dateinput.split(' ');
					let dateSplit = datearr[0].split('/');
					if(dateinput.indexOf(' ') > 0){
						date = dateSplit[2]+'-'+dateSplit[1] + '-'+dateSplit[0] + ' ' + datearr[1];
					} else {
						date = dateSplit[2]+'-'+dateSplit[1] + '-'+dateSplit[0] + ' 05:30'  ;
					}                                                           
				}
				return new Date(date).toISOString();
			} else {
				return dateinput;
			}
		} catch (e) {
			console.log('RecipeSetCopy.convertDateToISO' + e.message);
		}
	},
	RedirectToRecipeViewPage1: () => {
		storeValue("RecipeSetName",Tabulator1.actionRow.NAME,false);
		storeValue("RecipeSetNumber",Tabulator1.actionRow.RECIPE_SET_NUMBER,false);
		navigateTo('Recipe', {},'SAME_WINDOW')
	},
	GetRecipeByRecipeSetApiInput:() => {
		let selectedrow = Tabulator1.actionRow;
		var beforeChangeRecipeSetName = GetFilteredRecipeSet.data.filter( x => x.RECIPE_SET_NUMBER == selectedrow.RECIPE_SET_NUMBER)[0].NAME;
		return beforeChangeRecipeSetName;
	},
	CopyRecipeSetOkButtonClick: () => {
		CopyRecipeSet.run( () => {
			GetFilteredRecipeSet.run();
			closeModal('AssociateRecipeModal');
			showAlert('RecipeSet Copied successfully');
		},
		() => showAlert('Failed to Copy RecipeSet'));
	},
	LoadRecipe: () => {
		let selectedrow = Tabulator1.actionRow;
		var beforeChangeRecipeSetCat = GetFilteredRecipeSet.data.filter( x => x.RECIPE_SET_NUMBER == selectedrow.RECIPE_SET_NUMBER)[0].CATEGORY;
		if(beforeChangeRecipeSetCat == 'Standard') {
			return GetAssociateRecipeByRecipeSet.data.filter(x => x.RECIPE_STATUS == 'A');
		} else {
			return GetAssociateRecipeByRecipeSet.data.filter(x => x.RECIPE_STATUS != 'N');
		}
	},
	DefaultRecipeRowSelected: () => {
		let selectedrow = Tabulator1.actionRow;
		var beforeChangeRecipeSetCat = GetFilteredRecipeSet.data.filter( x => x.RECIPE_SET_NUMBER == selectedrow.RECIPE_SET_NUMBER)[0].CATEGORY;
		if(beforeChangeRecipeSetCat == 'Standard') {
			return GetAssociateRecipeByRecipeSet.data.filter(x => x.RECIPE_STATUS == 'A').map(function(e,index) {
							return index;
			});
		} else {
			return GetAssociateRecipeByRecipeSet.data.filter(x => x.RECIPE_STATUS != 'N').map(function(e,index) {
				return index;
			});
		}
	}
}
