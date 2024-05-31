export default {
	OnResetClick: async () => {
		//use async-await or promises
		resetWidget("SearchRecipeSetForm",true);
		resetWidget("ModificationNumberSearch");
		await storeValue("modificNo",undefined,true);
		GetFilteredRecipeSet.clear();
	},
	setModifNo:()=>{
		if(ModificationNoTable.selectedRow.MODIF_STATUS=="Closed" || ModificationNoTable.selectedRow.MODIF_STATUS=="Cancelled"){
			var msg = "Selected Modification Number is " + String(ModificationNoTable.selectedRow.MODIF_STATUS); 
			showAlert(msg,'error');
			storeValue('modificNo',undefined,true);
			storeValue('showErrorMessage',false,false);
			storeValue('uptime',undefined,true);
			storeValue('modificCTG',undefined,true);
			//closeModal('SearchModificationNumberModal');
		}else{
			storeValue('modificNo',ModificationNoTable.selectedRow.MODIF_NUMBER,true);
			storeValue('showErrorMessage',false,false);
			storeValue('uptime',ModificationNoTable.selectedRow.UPTIME,true);
			storeValue('modificCTG',ModificationNoTable.selectedRow.CTG,true);
			closeModal('SearchModificationNumberModal');
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
	}
}