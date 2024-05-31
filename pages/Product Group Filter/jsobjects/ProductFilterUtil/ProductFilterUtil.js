export default {
	myVar1: [],
	myVar2: {},
	myFun1: () => {
		//write code here
	},
	ViewMenuClick: () => {
		GetProductFilterItems.run();
		showModal('ProductFilterDetailModal');
	},
	ResetProductFilterClick: () => {
		GetProductFilterSearch.clear();
		resetWidget("SearchForm",true);
	},
	NewButtonClick: () => {
		navigateTo('CreateProductGroupFilter',{"filterAction":"Create"});
	},
	EditMenuClick: () => {
		navigateTo('CreateProductGroupFilter',{"filterAction":"Edit","filterNumber":ProductFilterTable.triggeredRow.PRODUCT_FILTER_NUMBER});
	},
	DeleteYesButtonClick: () => {
		DeleteProductFilter.run( () => {
		 GetProductFilterSearch.run();
		 closeModal('DeleteModal');
		 showAlert("Product Group Filter Deleted successfully");
      },
	 () => showAlert('Failed to Delete Recipe'));
	
	}
}