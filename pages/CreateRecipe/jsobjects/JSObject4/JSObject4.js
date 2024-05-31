export default {
	RedirectToAssociateRecipe: () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		const recipeCass = GetFilteredRecipe.data.RECIPE_CLASS;
		if(recipeCass == "RM" || recipeCass == "CO" || recipeCass == "ST" ) {
				 	storeValue("recipeNumberView",Tabulator1.actionRow.ASSOCIATE_RECIPE_NUMBER,true);
		      //storeValue("recipeStatus",Tabulator1.actionRow.RECIPE_STATUS,true);
				} else if(recipeCass == "PD") {
					storeValue("recipeNumberView",Tabulator2.actionRow.ASSOCIATE_RECIPE_NUMBER,true);
		      //storeValue("recipeStatus",Tabulator1.actionRow.RECIPE_STATUS,true);
				} else if(recipeCass == "CS") {
					storeValue("recipeNumberView",Tabulator3.actionRow.ASSOCIATE_RECIPE_NUMBER,true);
		      //storeValue("recipeStatus",Tabulator1.actionRow.RECIPE_STATUS,true);
				} else if(recipeCass == "MS") {
					storeValue("recipeNumberView",Tabulator4.actionRow.ASSOCIATE_RECIPE_NUMBER,true);
		      //storeValue("recipeStatus",Tabulator1.actionRow.RECIPE_STATUS,true);
				} else{
				  showAlert('Recipe Class Not Implemented');
					return;
			  }
		 navigateTo('CreateRecipe',{"RecipeAction":"Edit"},'NEW_WINDOW');
	},
	FillTabulator : () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		if(appsmith.URL.queryParams.RecipeAction == "Edit") {
			return GetRecipeItem1.data;
		} else {
		return [];//GetRecipeItem.data.filter( x => x.RECIPE_NUMBER == 0);
		}
	},
	checkValue:() =>{
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		var editedActionRow=Tabulator1.editedRowsData; 
		//showAlert(JSON.stringify(editedActionRow));
		let maxFixed=100;
		let tableFix=0
		for(let i=0; i <editedActionRow.length;i++)
			{
				var dataArr= editedActionRow[i];
				if(dataArr.data.RECIPE_FUNCTION=='FIX')
					tableFix=Number(tableFix)+Number(dataArr.data.VALUE_PERCENTAGE);
				
				if(tableFix > maxFixed)
					{
						storeValue('CreateRecipeErrMsg','Fix can not be more than 100.',true);
						showModal('msgModalInfo');
						//showAlert('Fix Can Not Be More Than 100');
					}
				//showAlert(dataArr.data.VALUE_PERCENTAGE);
			}
		},
	enableDOS_CMD_icon:() =>{
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		var editedActionRow=Tabulator2.actionRowWithIndex;
		if(appsmith.store.RecipeClassDropDown=="RM" || appsmith.store.RecipeClassDropDown=="CO" || appsmith.store.RecipeClassDropDown=="ST"){
			editedActionRow=Tabulator1.actionRowWithIndex; 
		}else if(appsmith.store.RecipeClassDropDown=="PD"){
			editedActionRow=Tabulator2.actionRowWithIndex; 
		}
		if(editedActionRow.data.RECIPE_ITEM_TYPE=='DOS' || editedActionRow.data.RECIPE_ITEM_TYPE=='CMD'){
			return false;
		}else{
			return true;
		}
	},
	clearDOS_CMD_Data:() =>{
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		var editedActionRow=Tabulator2.actionRowWithIndex;
		if(appsmith.store.RecipeClassDropDown=="RM" || appsmith.store.RecipeClassDropDown=="CO" || appsmith.store.RecipeClassDropDown=="ST"){
			editedActionRow=Tabulator1.actionRowWithIndex; 
			editedActionRow.data.MATERIAL_COMMAND_CODE='';
			editedActionRow.data.MATERIAL_COMMAND='';
			editedActionRow.data.NID='';
			editedActionRow.data.DC_CONCENTRATION='';
			editedActionRow.data.SPECIFIC_WEIGHT='';
			editedActionRow.data.FILLER='';
			editedActionRow.data.UNIT='';
			editedActionRow.data.VOLUME='';
			editedActionRow.data.BALES='';
			editedActionRow.data.VALUE_PERCENTAGE='';
			editedActionRow.data.TARGET_VALUE_WEIGHT='';
			//editedActionRow.data.LOSS_GROUP_NUMBER=MaterialPropertyTbl.selectedRow.WEIGHT;
		}else if(appsmith.store.RecipeClassDropDown=="PD"){
			editedActionRow=Tabulator2.actionRowWithIndex; 
			editedActionRow.data.MATERIAL_COMMAND_CODE='';
			editedActionRow.data.MATERIAL_COMMAND='';
			editedActionRow.data.NID='';
			editedActionRow.data.DC_CONCENTRATION='';
			editedActionRow.data.SPECIFIC_WEIGHT='';
			editedActionRow.data.FILLER='';
			editedActionRow.data.UNIT='';
			editedActionRow.data.BALE_WEIGHT='';
			editedActionRow.data.VOLUME='';
			editedActionRow.data.BALES='';
			editedActionRow.data.VALUE_PERCENTAGE='';
			editedActionRow.data.TARGET_VALUE_WEIGHT='';
		}
		let tbl=appsmith.store.SV_TBL || [];
		if(tbl[editedActionRow.index] == undefined){
			tbl.push(editedActionRow.data);
		}else{
			//showAlert(JSON.stringify(editedActionRow.data));
			tbl[editedActionRow.index] = editedActionRow.data;
		}
		storeValue('SV_TBL',tbl,true);
	},
	getMaterialPropertyModal: () =>{
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		var actionRow = Tabulator2.actionRow;
		if(appsmith.store.RecipeClassDropDown=="RM" || appsmith.store.RecipeClassDropDown=="CO" || appsmith.store.RecipeClassDropDown=="ST"){
			actionRow=Tabulator1.actionRow; 
		}else if(appsmith.store.RecipeClassDropDown=="PD"){
			actionRow=Tabulator2.actionRow; 
		}
		if(actionRow.RECIPE_ITEM_TYPE=='DOS'){
			storeValue('sv_lbl','Search Material Code',false);
			storeValue('sv_header_code','MATERIAL CODE',false); 
			storeValue('sv_header_name','MATERIAL NAME',false);
			storeValue('is_visible', true,false);
		}else{
			storeValue('sv_lbl','Search Property Code',false);
			storeValue('sv_header_code','PROPERTY CODE',false); 
			storeValue('sv_header_name','PROPERTY NAME',false);
			storeValue('is_visible', false,false);
		}
		GetMaterialProperty.clear();
		GetMaterialProperty.run( () => { }, () => { GetMaterialProperty.run() } );
		showModal('MaterialPropertyModal');
	},
	setSV_TBL:()=>{
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		var editedActionRow=Tabulator2.actionRowWithIndex; 
		if(appsmith.store.RecipeClassDropDown=="RM" || appsmith.store.RecipeClassDropDown=="CO" || appsmith.store.RecipeClassDropDown=="ST"){
			editedActionRow=Tabulator1.actionRowWithIndex; 
		}else if(appsmith.store.RecipeClassDropDown=="PD"){
			editedActionRow=Tabulator2.actionRowWithIndex; 
		}else if(appsmith.store.RecipeClassDropDown=="CS"){
			editedActionRow=Tabulator3.actionRowWithIndex;
			if(editedActionRow.data.TARGET_VALUE == '' || editedActionRow.data.TARGET_VALUE ==  null) {
				editedActionRow.data.IN_VAL='';
				editedActionRow.data.INPUT_MINIMUM='';
				editedActionRow.data.INPUT_MAXIMUM='';
				editedActionRow.data.CALC_MINIMUM='';
				editedActionRow.data.CALC_MAXIMUM='';
			}
		}else if(appsmith.store.RecipeClassDropDown=="MS" || appsmith.store.RecipeClassDropDown=="SU"){
			editedActionRow=Tabulator4.actionRowWithIndex;
			if(editedActionRow.data.TARGET_VALUE == '' || editedActionRow.data.TARGET_VALUE ==  null) {
				editedActionRow.data.IN_VAL='';
				editedActionRow.data.INPUT_MINIMUM='';
				editedActionRow.data.INPUT_MAXIMUM='';
				editedActionRow.data.CALC_MINIMUM='';
				editedActionRow.data.CALC_MAXIMUM='';
			}
		}
		let tbl=appsmith.store.SV_TBL || [];
		if(tbl[editedActionRow.index] == undefined){
			tbl.push(editedActionRow.data);
		}else{
			//showAlert(JSON.stringify(editedActionRow.data));
			tbl[editedActionRow.index] = editedActionRow.data;
		}
		storeValue('SV_TBL',tbl,true);
	},
	onClickBindData: async ()=>{
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		var editedActionRow=Tabulator2.actionRowWithIndex; 
		if(appsmith.store.RecipeClassDropDown=="RM" || appsmith.store.RecipeClassDropDown=="CO" || appsmith.store.RecipeClassDropDown=="ST"){
			editedActionRow=Tabulator1.actionRowWithIndex; 
			editedActionRow.data.MATERIAL_COMMAND_CODE=MaterialPropertyTbl.selectedRow.MATERIAL_CODE;
			editedActionRow.data.MATERIAL_COMMAND=MaterialPropertyTbl.selectedRow.MATERIAL_NAME_SHORT;
			editedActionRow.data.NID=MaterialPropertyTbl.selectedRow.NID;
			editedActionRow.data.DC_CONCENTRATION=MaterialPropertyTbl.selectedRow.CONCENTRATION;
			editedActionRow.data.SPECIFIC_WEIGHT=MaterialPropertyTbl.selectedRow.SPECIFIC_WEIGHT;
			editedActionRow.data.FILLER=MaterialPropertyTbl.selectedRow.FILLER;
			if(editedActionRow.data.RECIPE_ITEM_TYPE != 'DOS') {
			  editedActionRow.data.UNIT=MaterialPropertyTbl.selectedRow.UNIT;
		  }
			//editedActionRow.data.LOSS_GROUP_NUMBER=MaterialPropertyTbl.selectedRow.WEIGHT;
		}else if(appsmith.store.RecipeClassDropDown=="PD"){
			editedActionRow=Tabulator2.actionRowWithIndex; 
			editedActionRow.data.MATERIAL_COMMAND_CODE=MaterialPropertyTbl.selectedRow.MATERIAL_CODE;
			editedActionRow.data.MATERIAL_COMMAND=MaterialPropertyTbl.selectedRow.MATERIAL_NAME_SHORT;
			editedActionRow.data.NID=MaterialPropertyTbl.selectedRow.NID;
			editedActionRow.data.DC_CONCENTRATION=MaterialPropertyTbl.selectedRow.CONCENTRATION;
			editedActionRow.data.SPECIFIC_WEIGHT=MaterialPropertyTbl.selectedRow.SPECIFIC_WEIGHT;
			editedActionRow.data.FILLER=MaterialPropertyTbl.selectedRow.FILLER;
			if(editedActionRow.data.RECIPE_ITEM_TYPE != 'DOS') {
			  editedActionRow.data.UNIT=MaterialPropertyTbl.selectedRow.UNIT;
		  }
			editedActionRow.data.BALE_WEIGHT=MaterialPropertyTbl.selectedRow.WEIGHT;
		}
		else if(appsmith.store.RecipeClassDropDown=="CS"){
			editedActionRow=Tabulator3.actionRowWithIndex; 
			editedActionRow.data.PROPERTY_CODE=PropertyTbl.selectedRow.MATERIAL_CODE;
			editedActionRow.data.COMMAND_TYPE=PropertyTbl.selectedRow.MATERIAL_NAME_SHORT;
			editedActionRow.data.UNIT=PropertyTbl.selectedRow.UNIT;
		}else if(appsmith.store.RecipeClassDropDown=="MS"||appsmith.store.RecipeClassDropDown=="SU"){
			editedActionRow=Tabulator4.actionRowWithIndex; 
			editedActionRow.data.PROPERTY_CODE=PropertyTbl.selectedRow.MATERIAL_CODE;
			editedActionRow.data.COMMAND_TYPE=PropertyTbl.selectedRow.MATERIAL_NAME_SHORT;
			editedActionRow.data.UNIT=PropertyTbl.selectedRow.UNIT;
		}
		
		let tbl=appsmith.store.SV_TBL;
		if(tbl[editedActionRow.index] == undefined){
			tbl.push(editedActionRow.data);
		}else{
			tbl[editedActionRow.index] = editedActionRow.data;
		}
		await storeValue('SV_TBL',tbl,true);
	},
	onCoatClick:()=>{
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		var editedActionRow=Tabulator3.actionRowWithIndex; 
		if(appsmith.store.RecipeClassDropDown=="CS"){
			editedActionRow=Tabulator3.actionRowWithIndex; 
			if(editedActionRow.data.RECIPE_FUNCTION == "AB") {
				editedActionRow.data.COAT_ID=MaterialTbl.selectedRow.MATERIAL_CODE;
				editedActionRow.data.COATING=MaterialTbl.selectedRow.MATERIAL_NAME_SHORT;
			} else if(editedActionRow.data.RECIPE_FUNCTION == "BP") {
				editedActionRow.data.COAT_ID=Table1.selectedRow.PRODUCT_CODE;
				editedActionRow.data.COATING=Table1.selectedRow.PRODUCT_NAME_SHORT;
				editedActionRow.data.TARGET_VALUE=Table1.selectedRow.GRAMMAGE;
			}
		}
		if(appsmith.store.RecipeClassDropDown=="SU" || appsmith.store.RecipeClassDropDown=="MS"){
			editedActionRow=Tabulator4.actionRowWithIndex; 
			editedActionRow.data.COAT_ID=MaterialTbl.selectedRow.MATERIAL_CODE;
	  	editedActionRow.data.COATING=MaterialTbl.selectedRow.MATERIAL_NAME_SHORT;
		}
		let tbl=appsmith.store.SV_TBL;
		if(tbl[editedActionRow.index] == undefined){
			tbl.push(editedActionRow.data);
		}else{
			tbl[editedActionRow.index] = editedActionRow.data;
		}
		storeValue('SV_TBL',tbl,true);
		
	},
	ArrangeSEQNumber1: () => {
		if(!appsmith.store.IsCreate_RecipeLoadFirstTime) return false;
		var editedActionRow=Tabulator2.actionRowWithIndex; 
		if(appsmith.store.RecipeClassDropDown=="RM" || appsmith.store.RecipeClassDropDown=="CO" || appsmith.store.RecipeClassDropDown=="ST"){
			editedActionRow=Tabulator1.actionRowWithIndex; 
		}else if(appsmith.store.RecipeClassDropDown=="PD"){
			editedActionRow=Tabulator2.actionRowWithIndex; 
		}else if(appsmith.store.RecipeClassDropDown=="CS"){
			editedActionRow=Tabulator3.actionRowWithIndex;
		}else if(appsmith.store.RecipeClassDropDown=="MS" || appsmith.store.RecipeClassDropDown=="SU"){
			editedActionRow=Tabulator4.actionRowWithIndex;
		}
		if(editedActionRow.data.SEQ_NO != "" && !isNaN(Number(editedActionRow.data.SEQ_NO))) {
			let tbl=appsmith.store.SV_TBL || [];

			if(tbl[editedActionRow.index] == undefined){
				tbl.push(editedActionRow.data);
			}else{
				//showAlert(JSON.stringify(editedActionRow.data));
				tbl[editedActionRow.index] = editedActionRow.data;
			}
			//find all row having seq > action row seq
			let tempSeqNo = Number(editedActionRow.data.SEQ_NO);
			let greaterSeqRow = tbl.filter(x => Number(x.SEQ_NO) > tempSeqNo);
			let count = 1;
			greaterSeqRow.forEach( (x) => { 
				x.SEQ_NO =tempSeqNo + count;
				count++;
				return x;
			} );
			const sortedlist = tbl.sort((r1, r2) => (Number(r1.SEQ_NO) > Number(r2.SEQ_NO)) ? 1 : (Number(r1.SEQ_NO) < Number(r2.SEQ_NO) ? -1 : 0));
			storeValue('SV_TBL',sortedlist,true);
		}
	}

}