export default {
	pageLoad: async () => {
		storeValue("ProductFilterNumberAfterCreate",undefined,true);
		if(appsmith.URL.queryParams.filterAction == "Edit") {
			storeValue("SaveProductFilterButtonText","Update",true);
			GetProductFilterItem.run();
			GetProductFilterSearch.run();
		} else if(appsmith.URL.queryParams.filterAction == "Create") {
			storeValue("SaveProductFilterButtonText","Create",true);
		}
	},
	DefaultRecipeType: () => {
		if(appsmith.URL.queryParams.filterAction == "Edit") {
			var recipeTypes = GetProductFilterSearch.data[0].ASSOCIATE_RECIPETYPE_NAMES;
			var defaultRecipeTypes = [];
			var splitRecipeTypes = recipeTypes.split(',');
			for(var i =0; i< splitRecipeTypes.length; i++) {
				defaultRecipeTypes.push(Number(splitRecipeTypes[i]));
			}
			return defaultRecipeTypes;
		} else {
			return [];
		}
	},
	SaveProductFilterButtonClick: () => {
		var saveButtonlabel =  SaveProductFilterButton.text;
		if(appsmith.URL.queryParams.filterAction == "Create" && saveButtonlabel == "Create") {
			//call CreateProductFilter API
			CreateProductFilter.run((result) => {
				storeValue("SaveProductFilterButtonText","Update",true);// after create button name will be Update
				storeValue("ProductFilterNumberAfterCreate",result,true);// after create keep Product Filter number for update
				GetProductFilterOption.run();
			},() => { showAlert("Failed to create Product Filter.") });
		} else if(saveButtonlabel == "Update") {
			var productFilterNumber = 0;
			if(appsmith.URL.queryParams.filterAction == "Edit"){
				productFilterNumber = Number(appsmith.URL.queryParams.filterNumber);
			} else {
				productFilterNumber = Number(appsmith.store.ProductFilterNumberAfterCreate);
			}
			const params= {"productFilter":{"PRODUCT_FILTER_NUMBER": productFilterNumber,"NAME": FilterNameInput.text,"DESCRIPTION":FilterDescInput.text,"RECIPETYPE_NUMBERS": RecipeTypeMultiSelect.selectedOptionValues,"USER": appsmith.user.name }};
			UpdateProductFilter.run(() => { GetProductFilterItem.run(); showAlert("Product Filter updated successfully.");},() => {showAlert("Product Filter update failed.");} , params);
		}
	},
	test: () => {
		const params = { "PRODUCT_FILTER_NAME": "",	"PRODUCT_FILTER_NUMBER": 2, "OPRTYPE": 2};
		return Api1.run(params);
	},
	AddProductFilterItem: async () => {
		var productFilterNumber = 0;
		if(appsmith.URL.queryParams.filterAction == "Edit"){
			productFilterNumber = Number(appsmith.URL.queryParams.filterNumber);
		} else {
			productFilterNumber = Number(appsmith.store.ProductFilterNumberAfterCreate);
		}
		var operator = "";
		if(OperatorSelect.selectedOptionLabel == "Select") {
			operator = "";
		} else {
			operator = OperatorSelect.selectedOptionLabel;
		}
		const params = {"PRODUCT_FILTER_NUMBER": productFilterNumber,"GROUP_NUMBER": Number(GroupNoInput.text),"OPERATOR": operator,"GRAMMAGE_TO": Number(GsmToInput.text),"GRAMMAGE_FROM": Number(GsmFromInput.text),"GRADES":GradeMultiSelect.selectedOptionValues,"USER": appsmith.user.name};
		 CreateProductFilterItem.run(() => {storeValue("EditedProductFilterItem",undefined,true);GetProductFilterItem.run(); showAlert("Product Filter Item created");resetWidget('Form2',true);},() => { showAlert("Product Filter Item failed to create.");GetProductFilterItem.run();},params);
	storeValue("EditedProductFilterItem",undefined,true);
		 GetProductFilterItem.run();
		resetWidget('Form2',true);
	},
	EditFilterItemClick: () => {
		var editedItemRow = ProductFilterItemTable.triggeredRow;
		storeValue("EditedProductFilterItem",editedItemRow,true);
	},
	DefaultGrades: () => {
		var grades = appsmith.store.EditedProductFilterItem.GRADES;
		var defaulGrades = [];
		var splitGrades = grades.split(',');
		for(var i =0; i< splitGrades.length; i++) {
			defaulGrades.push(splitGrades[i]);
		}
		return defaulGrades;
	},
	UpdateProductFilterItem: () => {
		var operator = "";
		if(OperatorSelect.selectedOptionLabel == "Select") {
			operator = "";
		} else {
			operator = OperatorSelect.selectedOptionLabel;
		}
		var itemNumber = Number(appsmith.store.EditedProductFilterItem.PRODUCT_FILTER_ITEM_NUMBER);
		if(itemNumber > 0) {
			const params =  {"productFilterItem": {"PRODUCT_FILTER_ITEM_NUMBER": itemNumber,"GROUP_NUMBER":Number(GroupNoInput.text),"OPERATOR": operator,"GRAMMAGE_TO": Number(GsmToInput.text),"GRAMMAGE_FROM": Number(GsmFromInput.text),"GRADES": GradeMultiSelect.selectedOptionValues,"USER": appsmith.user.name}};
			UpdateProductFilterItem.run(() => {storeValue("EditedProductFilterItem",undefined,true); GetProductFilterItem.run(); showAlert("Product Filter Item updated");resetWidget('Form2',true);resetWidget('GroupNoInput');},() => {showAlert("Product Filter Item failed to create.");},params);
		} else {
			showAlert("Please click the edit menu button to edit Product Filter item.")
		}
	},
	DeleteYesButtonClick: () => {
		DeleteProductFilterItem.run( () => {
			GetProductFilterItem.run();
			closeModal('DeleteModal');
			showAlert("Product Group Filter Item Deleted successfully");
		},() => showAlert('Failed to Delete Recipe'));
	},
	IsDisableAddUpdateButton: () => {
		if(GroupNoInput.text == "" || GsmFromInput.text == "" || GsmToInput.text == "" || GradeMultiSelect.selectedOptionValues.length == 0) {
			return true;
		} else {
			return false;
		}
	}
}