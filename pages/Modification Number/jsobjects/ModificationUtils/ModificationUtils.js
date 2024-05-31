export default {
	Defaultdate: new Date(),
	updateFromDate : () => {
		const d = new Date();
		switch(SelectFromDate.selectedOptionValue){
			case 'today':
				d.setDate(d.getDate());
				storeValue('fromDate',d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric'}).replace(/ /g, '-'),false);
				break;
			case 'last2Days':
				d.setDate(d.getDate()-2);
				storeValue('fromDate',d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric'}).replace(/ /g, '-'),false);
				break;
			case 'last7Days':
				d.setDate(d.getDate()-7);
				storeValue('fromDate',d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric'}).replace(/ /g, '-'),false);
				break;
			case 'last30Days':
				d.setDate(d.getDate()-30);
				storeValue('fromDate',d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric'}).replace(/ /g, '-'),false);
				break;
			case 'last6Months':
				d.setDate(d.getDate()-181);
				storeValue('fromDate',d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric'}).replace(/ /g, '-'),false);
				break;
			case 'last1Year':
				d.setDate(d.getDate()-365);
				storeValue('fromDate',d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric'}).replace(/ /g, '-'),false);
				break;
			case 'fromDate':
				let customDate = new Date(DateFromDate.selectedDate);
				storeValue('fromDate',customDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric'}).replace(/ /g, '-'),false);
				break;
		}
	},
	changeDateFormat : (dateparam) => {
		let dateValue = new Date(dateparam);
		dateValue = dateValue.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric'}).replace(/ /g, '-');
		return dateValue;
	},
	updateSHEQArray : () => {
		let sheqArray = [];
		if(GetModifCategoryByModifNumber.data[0].Safety_Expected_Impact || GetModifCategoryByModifNumber.data[0].Safety_Actual_Impact){
			sheqArray.push('S');
		}
		if(GetModifCategoryByModifNumber.data[0].Health_Expected_Impact || GetModifCategoryByModifNumber.data[0].Health_Actual_Impact){
			sheqArray.push('H');
		}
		if(GetModifCategoryByModifNumber.data[0].Environment_Expected_Impact || GetModifCategoryByModifNumber.data[0].Environment_Actual_Impact){
			sheqArray.push('E');
		}
		if(GetModifCategoryByModifNumber.data[0].Quality_Expected_Impact || GetModifCategoryByModifNumber.data[0].Quality_Actual_Impact){
			sheqArray.push('Q');
		}
		if(GetModifCategoryByModifNumber.data[0].Hygiene_Expected_Impact || GetModifCategoryByModifNumber.data[0].Hygiene_Actual_Impact){
			sheqArray.push('HY');
		}
		if(GetModifCategoryByModifNumber.data[0].Cost_Expected_Impact || GetModifCategoryByModifNumber.data[0].Cost_Actual_Impact){
			sheqArray.push('C');
		}
		return sheqArray;
	},
	onSHEQChange: ()=>{
		let unselectedItems = SHEQMultiSelect.options.map(x=>x.value).filter(x => !SHEQMultiSelect.selectedOptionValues.includes(x));
		unselectedItems.map(function(x){
			switch(x){
				case 'S':
					UpdateSafetyExpectedImpactText.text="";
					UpdateSafetyActualImpactText.text="";
					break;
				case 'H':
					UpdateHealthExpectedImpactText.text="";
					UpdateHealthActualImpactText.text="";
					break;
				case 'E':
					UpdateEnvExpectedImpactText.text="";
					UpdateEnvActualImpactText.text="";
					break;
				case 'Q':
					UpdateQualitExpectedImpactText.text="";
					UpdateQualityActualImpactText.text="";
					break;
				case 'C':
					UpdateCostActualImpactText.text="";
					UpdateCostActualImpactText.text="";
					break;
				case 'HY':
					UpdateHygieneExpectedImpactTex.text="";
					UpdateHygieneActualImpactText.text="";
					break;
				}	
		});
	},
	SelectedDate: () => {
	 if(SelectFromDate.selectedOptionValue == "") {
		 return '01-MAR-1970';
	 } else {
		 return appsmith.store.fromDate;
	 }
},
	DisableApplyButton : () => {
		if(InputFromNumber.text == null && InputToNumber.text == null) {
			return false;
		} else if(parseInt(InputFromNumber.text) >= 0 && InputToNumber.text == null) {
			return true;
		}else if((InputFromNumber.text == null)  && InputToNumber.text >= 0){
			return true;
		} else if (parseInt(InputFromNumber.text)>parseInt(InputToNumber.text)) {
			return true;
		} else if(SelectFromDate.selectedOptionValue == 'fromDate' && DateFromDate.selectedDate=='') {
			return true;
		} else {
			return false;
		}
	},
	PageLoad: async () => {
		//use async-await or promises
		await ModificationUtils.BaseUrl();
		storeValue('ActualImpactDays',10,true);
		storeValue('DisableEditControls',false,true);
		const d = new Date();
		d.setDate(d.getDate()-30);
		await storeValue('fromDate',d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric'}).replace(/ /g, '-'),false);
		GetFilteredModificationNumber.run();
	},
	BaseUrl: async () => {
		storeValue("apibaseurl","http://rrs-dev:9001",true);
		storeValue("baseurl","https://apibuilderserver.armtest01.abb.com/arm/v36",true);// https://apibuilderserver.iomdev.abb.com/arm/v3
	},
	ApplyButtonClick: () => {
		GetFilteredModificationNumber.run( () => { } , () => { GetFilteredModificationNumber.run(() => {} , () => { showAlert('Failed to retrieve data','error');  })  });
	},
	ConverttoLocattimezone: (d1) => {
		//debugger;
		//d1='08-07-2023 07:55';
		if(d1 == null)
			return ""
		let t1 = new Date();
		let offset =  t1.getTimezoneOffset();
		let d2= new Date(d1);
		let result =  new Date(d2.setTime(d2.getTime() + (offset * -1 * 60000)));//d2.setTime(d2.getTime() + (offset * -1 * 60000))  this is in mili second
		return moment(result).format('DD-MM-YYYY HH:mm');
	},
	onActualImpactDay:()=>{
		let retdata=false;
		if(appsmith.store.row == "Closed" && appsmith.store.actFlag==0){
			retdata=true;
		}
		if(appsmith.store.row == "Cancelled"){
			retdata=true;
		}
		return retdata;
	}
}