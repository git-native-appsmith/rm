export default {
	getHtml: () => `
		<!DOCTYPE html>
		<html>
			<head>
				<title>Tabulator1</title>
				<meta charset="UTF-8" />
			</head>
			<style>
				.tabulator{position:relative;border:1px solid #999;background-color:#888;font-size:14px;text-align:left;overflow:hidden;-webkit-transform:translateZ(0);-moz-transform:translateZ(0);-ms-transform:translateZ(0);-o-transform:translateZ(0);transform:translateZ(0)}.tabulator[tabulator-layout=fitDataFill] .tabulator-tableholder .tabulator-table{min-width:100%}.tabulator[tabulator-layout=fitDataTable]{display:inline-block}.tabulator.tabulator-block-select{user-select:none}.tabulator .tabulator-header{position:relative;box-sizing:border-box;width:100%;border-bottom:1px solid #999;background-color:#e6e6e6;color:#555;font-weight:700;white-space:nowrap;overflow:hidden;-moz-user-select:none;-khtml-user-select:none;-webkit-user-select:none;-o-user-select:none}.tabulator .tabulator-header.tabulator-header-hidden{display:none}.tabulator .tabulator-header .tabulator-header-contents{position:relative;overflow:hidden}.tabulator .tabulator-header .tabulator-header-contents .tabulator-headers{display:inline-block}.tabulator .tabulator-header .tabulator-col{display:inline-flex;position:relative;box-sizing:border-box;flex-direction:column;justify-content:flex-start;border-right:1px solid #aaa;background:#e6e6e6;text-align:left;vertical-align:bottom;overflow:hidden}.tabulator .tabulator-header .tabulator-col.tabulator-moving{position:absolute;border:1px solid #999;background:#cdcdcd;pointer-events:none}.tabulator .tabulator-header .tabulator-col .tabulator-col-content{box-sizing:border-box;position:relative;padding:4px}.tabulator .tabulator-header .tabulator-col .tabulator-col-content .tabulator-header-popup-button{padding:0 8px}.tabulator .tabulator-header .tabulator-col .tabulator-col-content .tabulator-header-popup-button:hover{cursor:pointer;opacity:.6}.tabulator .tabulator-header .tabulator-col .tabulator-col-content .tabulator-col-title-holder{position:relative}.tabulator .tabulator-header .tabulator-col .tabulator-col-content .tabulator-col-title{box-sizing:border-box;width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;vertical-align:bottom}.tabulator .tabulator-header .tabulator-col .tabulator-col-content .tabulator-col-title.tabulator-col-title-wrap{white-space:normal;text-overflow:clip}.tabulator .tabulator-header .tabulator-col .tabulator-col-content .tabulator-col-title .tabulator-title-editor{box-sizing:border-box;width:100%;border:1px solid #999;padding:1px;background:#fff}.tabulator .tabulator-header .tabulator-col .tabulator-col-content .tabulator-col-title .tabulator-header-popup-button+.tabulator-title-editor{width:calc(100% - 22px)}.tabulator .tabulator-header .tabulator-col .tabulator-col-content .tabulator-col-sorter{display:flex;align-items:center;position:absolute;top:0;bottom:0;right:4px}.tabulator .tabulator-header .tabulator-col .tabulator-col-content .tabulator-col-sorter .tabulator-arrow{width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-bottom:6px solid #bbb}.tabulator .tabulator-header .tabulator-col.tabulator-col-group .tabulator-col-group-cols{position:relative;display:flex;border-top:1px solid #aaa;overflow:hidden;margin-right:-1px}.tabulator .tabulator-header .tabulator-col .tabulator-header-filter{position:relative;box-sizing:border-box;margin-top:2px;width:100%;text-align:center}.tabulator .tabulator-header .tabulator-col .tabulator-header-filter textarea{height:auto!important}.tabulator .tabulator-header .tabulator-col .tabulator-header-filter svg{margin-top:3px}.tabulator .tabulator-header .tabulator-col .tabulator-header-filter input::-ms-clear{width:0;height:0}.tabulator .tabulator-header .tabulator-col.tabulator-sortable .tabulator-col-title{padding-right:25px}.tabulator .tabulator-header .tabulator-col.tabulator-sortable.tabulator-col-sorter-element:hover{cursor:pointer;background-color:#cdcdcd}.tabulator .tabulator-header .tabulator-col.tabulator-sortable[aria-sort=none] .tabulator-col-content .tabulator-col-sorter{color:#bbb}.tabulator .tabulator-header .tabulator-col.tabulator-sortable[aria-sort=none] .tabulator-col-content .tabulator-col-sorter.tabulator-col-sorter-element .tabulator-arrow:hover{cursor:pointer;border-bottom:6px solid #555}.tabulator .tabulator-header .tabulator-col.tabulator-sortable[aria-sort=none] .tabulator-col-content .tabulator-col-sorter .tabulator-arrow{border-top:none;border-bottom:6px solid #bbb}.tabulator .tabulator-header .tabulator-col.tabulator-sortable[aria-sort=ascending] .tabulator-col-content .tabulator-col-sorter{color:#666}.tabulator .tabulator-header .tabulator-col.tabulator-sortable[aria-sort=ascending] .tabulator-col-content .tabulator-col-sorter.tabulator-col-sorter-element .tabulator-arrow:hover{cursor:pointer;border-bottom:6px solid #555}.tabulator .tabulator-header .tabulator-col.tabulator-sortable[aria-sort=ascending] .tabulator-col-content .tabulator-col-sorter .tabulator-arrow{border-top:none;border-bottom:6px solid #666}.tabulator .tabulator-header .tabulator-col.tabulator-sortable[aria-sort=descending] .tabulator-col-content .tabulator-col-sorter{color:#666}.tabulator .tabulator-header .tabulator-col.tabulator-sortable[aria-sort=descending] .tabulator-col-content .tabulator-col-sorter.tabulator-col-sorter-element .tabulator-arrow:hover{cursor:pointer;border-top:6px solid #555}.tabulator .tabulator-header .tabulator-col.tabulator-sortable[aria-sort=descending] .tabulator-col-content .tabulator-col-sorter .tabulator-arrow{border-bottom:none;border-top:6px solid #666;color:#666}.tabulator .tabulator-header .tabulator-col.tabulator-col-vertical .tabulator-col-content .tabulator-col-title{writing-mode:vertical-rl;text-orientation:mixed;display:flex;align-items:center;justify-content:center}.tabulator .tabulator-header .tabulator-col.tabulator-col-vertical.tabulator-col-vertical-flip .tabulator-col-title{transform:rotate(180deg)}.tabulator .tabulator-header .tabulator-col.tabulator-col-vertical.tabulator-sortable .tabulator-col-title{padding-right:0;padding-top:20px}.tabulator .tabulator-header .tabulator-col.tabulator-col-vertical.tabulator-sortable.tabulator-col-vertical-flip .tabulator-col-title{padding-right:0;padding-bottom:20px}.tabulator .tabulator-header .tabulator-col.tabulator-col-vertical.tabulator-sortable .tabulator-col-sorter{justify-content:center;left:0;right:0;top:4px;bottom:auto}.tabulator .tabulator-header .tabulator-frozen{position:sticky;left:0;z-index:10}.tabulator .tabulator-header .tabulator-frozen.tabulator-frozen-left{border-right:2px solid #aaa}.tabulator .tabulator-header .tabulator-frozen.tabulator-frozen-right{border-left:2px solid #aaa}.tabulator .tabulator-header .tabulator-calcs-holder{box-sizing:border-box;min-width:600%;background:#f3f3f3!important;border-top:1px solid #aaa;border-bottom:1px solid #aaa}.tabulator .tabulator-header .tabulator-calcs-holder .tabulator-row{background:#f3f3f3!important}.tabulator .tabulator-header .tabulator-calcs-holder .tabulator-row .tabulator-col-resize-handle{display:none}.tabulator .tabulator-header .tabulator-frozen-rows-holder{min-width:600%}.tabulator .tabulator-header .tabulator-frozen-rows-holder:empty{display:none}.tabulator .tabulator-tableholder{position:relative;width:100%;white-space:nowrap;overflow:auto;-webkit-overflow-scrolling:touch}.tabulator .tabulator-tableholder:focus{outline:none}.tabulator .tabulator-tableholder .tabulator-placeholder{box-sizing:border-box;display:flex;align-items:center;justify-content:center;width:100%}.tabulator .tabulator-tableholder .tabulator-placeholder[tabulator-render-mode=virtual]{min-height:100%;min-width:100%}.tabulator .tabulator-tableholder .tabulator-placeholder .tabulator-placeholder-contents{display:inline-block;text-align:center;padding:10px;color:#ccc;font-weight:700;font-size:20px;white-space:normal}.tabulator .tabulator-tableholder .tabulator-table{position:relative;display:inline-block;background-color:#fff;white-space:nowrap;overflow:visible;color:#333}.tabulator .tabulator-tableholder .tabulator-table .tabulator-row.tabulator-calcs{font-weight:700;background:#e2e2e2!important}.tabulator .tabulator-tableholder .tabulator-table .tabulator-row.tabulator-calcs.tabulator-calcs-top{border-bottom:2px solid #aaa}.tabulator .tabulator-tableholder .tabulator-table .tabulator-row.tabulator-calcs.tabulator-calcs-bottom{border-top:2px solid #aaa}.tabulator .tabulator-footer{border-top:1px solid #999;background-color:#e6e6e6;color:#555;font-weight:700;white-space:nowrap;user-select:none;-moz-user-select:none;-khtml-user-select:none;-webkit-user-select:none;-o-user-select:none}.tabulator .tabulator-footer .tabulator-footer-contents{display:flex;flex-direction:row;align-items:center;justify-content:space-between;padding:5px 10px}.tabulator .tabulator-footer .tabulator-footer-contents:empty{display:none}.tabulator .tabulator-footer .tabulator-calcs-holder{box-sizing:border-box;width:100%;text-align:left;background:#f3f3f3!important;border-bottom:1px solid #aaa;border-top:1px solid #aaa;overflow:hidden}.tabulator .tabulator-footer .tabulator-calcs-holder .tabulator-row{display:inline-block;background:#f3f3f3!important}.tabulator .tabulator-footer .tabulator-calcs-holder .tabulator-row .tabulator-col-resize-handle{display:none}.tabulator .tabulator-footer .tabulator-calcs-holder:only-child{margin-bottom:-5px;border-bottom:none}.tabulator .tabulator-footer>*+.tabulator-page-counter{margin-left:10px}.tabulator .tabulator-footer .tabulator-page-counter{font-weight:400}.tabulator .tabulator-footer .tabulator-paginator{flex:1;text-align:right;color:#555;font-family:inherit;font-weight:inherit;font-size:inherit}.tabulator .tabulator-footer .tabulator-page-size{display:inline-block;margin:0 5px;padding:2px 5px;border:1px solid #aaa;border-radius:3px}.tabulator .tabulator-footer .tabulator-pages{margin:0 7px}.tabulator .tabulator-footer .tabulator-page{display:inline-block;margin:0 2px;padding:2px 5px;border:1px solid #aaa;border-radius:3px;background:hsla(0,0%,100%,.2)}.tabulator .tabulator-footer .tabulator-page.active{color:#d00}.tabulator .tabulator-footer .tabulator-page:disabled{opacity:.5}.tabulator .tabulator-footer .tabulator-page:not(.disabled):hover{cursor:pointer;background:rgba(0,0,0,.2);color:#fff}.tabulator .tabulator-col-resize-handle{position:relative;display:inline-block;width:6px;margin-left:-3px;margin-right:-3px;z-index:10;vertical-align:middle}.tabulator .tabulator-col-resize-handle:hover{cursor:ew-resize}.tabulator .tabulator-col-resize-handle:last-of-type{width:3px;margin-right:0}.tabulator .tabulator-alert{position:absolute;display:flex;align-items:center;top:0;left:0;z-index:100;height:100%;width:100%;background:rgba(0,0,0,.4);text-align:center}.tabulator .tabulator-alert .tabulator-alert-msg{display:inline-block;margin:0 auto;padding:10px 20px;border-radius:10px;background:#fff;font-weight:700;font-size:16px}.tabulator .tabulator-alert .tabulator-alert-msg.tabulator-alert-state-msg{border:4px solid #333;color:#000}.tabulator .tabulator-alert .tabulator-alert-msg.tabulator-alert-state-error{border:4px solid #d00;color:#590000}.tabulator-row{position:relative;box-sizing:border-box;min-height:22px;background-color:#fff}.tabulator-row.tabulator-row-even{background-color:#efefef}.tabulator-row.tabulator-selectable:hover{background-color:#bbb;cursor:pointer}.tabulator-row.tabulator-selected{background-color:#9abcea}.tabulator-row.tabulator-selected:hover{background-color:#769bcc;cursor:pointer}.tabulator-row.tabulator-row-moving{border:1px solid #000;background:#fff}.tabulator-row.tabulator-moving{position:absolute;border-top:1px solid #aaa;border-bottom:1px solid #aaa;pointer-events:none;z-index:15}.tabulator-row .tabulator-row-resize-handle{position:absolute;right:0;bottom:0;left:0;height:5px}.tabulator-row .tabulator-row-resize-handle.prev{top:0;bottom:auto}.tabulator-row .tabulator-row-resize-handle:hover{cursor:ns-resize}.tabulator-row .tabulator-responsive-collapse{box-sizing:border-box;padding:5px;border-top:1px solid #aaa;border-bottom:1px solid #aaa}.tabulator-row .tabulator-responsive-collapse:empty{display:none}.tabulator-row .tabulator-responsive-collapse table{font-size:14px}.tabulator-row .tabulator-responsive-collapse table tr td{position:relative}.tabulator-row .tabulator-responsive-collapse table tr td:first-of-type{padding-right:10px}.tabulator-row .tabulator-cell{display:inline-block;position:relative;box-sizing:border-box;padding:4px;border-right:1px solid #aaa;vertical-align:middle;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.tabulator-row .tabulator-cell.tabulator-frozen{display:inline-block;position:sticky;left:0;background-color:inherit;z-index:10}.tabulator-row .tabulator-cell.tabulator-frozen.tabulator-frozen-left{border-right:2px solid #aaa}.tabulator-row .tabulator-cell.tabulator-frozen.tabulator-frozen-right{border-left:2px solid #aaa}.tabulator-row .tabulator-cell.tabulator-editing{border:1px solid #1d68cd;outline:none;padding:0}.tabulator-row .tabulator-cell.tabulator-editing input,.tabulator-row .tabulator-cell.tabulator-editing select{border:1px;background:transparent;outline:none}.tabulator-row .tabulator-cell.tabulator-validation-fail{border:1px solid #d00}.tabulator-row .tabulator-cell.tabulator-validation-fail input,.tabulator-row .tabulator-cell.tabulator-validation-fail select{border:1px;background:transparent;color:#d00}.tabulator-row .tabulator-cell.tabulator-row-handle{display:inline-flex;align-items:center;justify-content:center;-moz-user-select:none;-khtml-user-select:none;-webkit-user-select:none;-o-user-select:none}.tabulator-row .tabulator-cell.tabulator-row-handle .tabulator-row-handle-box{width:80%}.tabulator-row .tabulator-cell.tabulator-row-handle .tabulator-row-handle-box .tabulator-row-handle-bar{width:100%;height:3px;margin-top:2px;background:#666}.tabulator-row .tabulator-cell .tabulator-data-tree-branch{display:inline-block;vertical-align:middle;height:9px;width:7px;margin-top:-9px;margin-right:5px;border-bottom-left-radius:1px;border-left:2px solid #aaa;border-bottom:2px solid #aaa}.tabulator-row .tabulator-cell .tabulator-data-tree-control{display:inline-flex;justify-content:center;align-items:center;vertical-align:middle;height:11px;width:11px;margin-right:5px;border:1px solid #333;border-radius:2px;background:rgba(0,0,0,.1);overflow:hidden}.tabulator-row .tabulator-cell .tabulator-data-tree-control:hover{cursor:pointer;background:rgba(0,0,0,.2)}.tabulator-row .tabulator-cell .tabulator-data-tree-control .tabulator-data-tree-control-collapse{display:inline-block;position:relative;height:7px;width:1px;background:transparent}.tabulator-row .tabulator-cell .tabulator-data-tree-control .tabulator-data-tree-control-collapse:after{position:absolute;content:"";left:-3px;top:3px;height:1px;width:7px;background:#333}.tabulator-row .tabulator-cell .tabulator-data-tree-control .tabulator-data-tree-control-expand{display:inline-block;position:relative;height:7px;width:1px;background:#333}.tabulator-row .tabulator-cell .tabulator-data-tree-control .tabulator-data-tree-control-expand:after{position:absolute;content:"";left:-3px;top:3px;height:1px;width:7px;background:#333}.tabulator-row .tabulator-cell .tabulator-responsive-collapse-toggle{display:inline-flex;align-items:center;justify-content:center;-moz-user-select:none;-khtml-user-select:none;-webkit-user-select:none;-o-user-select:none;height:15px;width:15px;border-radius:20px;background:#666;color:#fff;font-weight:700;font-size:1.1em}.tabulator-row .tabulator-cell .tabulator-responsive-collapse-toggle:hover{opacity:.7;cursor:pointer}.tabulator-row .tabulator-cell .tabulator-responsive-collapse-toggle.open .tabulator-responsive-collapse-toggle-close{display:initial}.tabulator-row .tabulator-cell .tabulator-responsive-collapse-toggle.open .tabulator-responsive-collapse-toggle-open{display:none}.tabulator-row .tabulator-cell .tabulator-responsive-collapse-toggle svg{stroke:#fff}.tabulator-row .tabulator-cell .tabulator-responsive-collapse-toggle .tabulator-responsive-collapse-toggle-close{display:none}.tabulator-row .tabulator-cell .tabulator-traffic-light{display:inline-block;height:14px;width:14px;border-radius:14px}.tabulator-row.tabulator-group{box-sizing:border-box;border-bottom:1px solid #999;border-right:1px solid #aaa;border-top:1px solid #999;padding:5px 5px 5px 10px;background:#ccc;font-weight:700;min-width:100%}.tabulator-row.tabulator-group:hover{cursor:pointer;background-color:rgba(0,0,0,.1)}.tabulator-row.tabulator-group.tabulator-group-visible .tabulator-arrow{margin-right:10px;border-left:6px solid transparent;border-right:6px solid transparent;border-top:6px solid #666;border-bottom:0}.tabulator-row.tabulator-group.tabulator-group-level-1{padding-left:30px}.tabulator-row.tabulator-group.tabulator-group-level-2{padding-left:50px}.tabulator-row.tabulator-group.tabulator-group-level-3{padding-left:70px}.tabulator-row.tabulator-group.tabulator-group-level-4{padding-left:90px}.tabulator-row.tabulator-group.tabulator-group-level-5{padding-left:110px}.tabulator-row.tabulator-group .tabulator-group-toggle{display:inline-block}.tabulator-row.tabulator-group .tabulator-arrow{display:inline-block;width:0;height:0;margin-right:16px;border-top:6px solid transparent;border-bottom:6px solid transparent;border-right:0;border-left:6px solid #666;vertical-align:middle}.tabulator-row.tabulator-group span{margin-left:10px;color:#d00}.tabulator-popup-container{position:absolute;display:inline-block;box-sizing:border-box;background:#fff;border:1px solid #aaa;box-shadow:0 0 5px 0 rgba(0,0,0,.2);font-size:14px;overflow-y:auto;-webkit-overflow-scrolling:touch;z-index:10000}.tabulator-popup{padding:5px;border-radius:3px}.tabulator-tooltip{max-width:Min(500px,100%);padding:3px 5px;border-radius:2px;box-shadow:none;font-size:12px;pointer-events:none}.tabulator-menu .tabulator-menu-item{position:relative;box-sizing:border-box;padding:5px 10px;user-select:none}.tabulator-menu .tabulator-menu-item.tabulator-menu-item-disabled{opacity:.5}.tabulator-menu .tabulator-menu-item:not(.tabulator-menu-item-disabled):hover{cursor:pointer;background:#efefef}.tabulator-menu .tabulator-menu-item.tabulator-menu-item-submenu{padding-right:25px}.tabulator-menu .tabulator-menu-item.tabulator-menu-item-submenu:after{display:inline-block;position:absolute;top:calc(5px + .4em);right:10px;height:7px;width:7px;content:"";border-color:#aaa;border-style:solid;border-width:1px 1px 0 0;vertical-align:top;transform:rotate(45deg)}.tabulator-menu .tabulator-menu-separator{border-top:1px solid #aaa}.tabulator-edit-list{max-height:200px;font-size:14px;overflow-y:auto;-webkit-overflow-scrolling:touch}.tabulator-edit-list .tabulator-edit-list-item{padding:4px;color:#333;outline:none}.tabulator-edit-list .tabulator-edit-list-item.active{color:#fff;background:#1d68cd}.tabulator-edit-list .tabulator-edit-list-item.active.focused{outline:1px solid hsla(0,0%,100%,.5)}.tabulator-edit-list .tabulator-edit-list-item.focused{outline:1px solid #1d68cd}.tabulator-edit-list .tabulator-edit-list-item:hover{cursor:pointer;color:#fff;background:#1d68cd}.tabulator-edit-list .tabulator-edit-list-placeholder{padding:4px;color:#333;text-align:center}.tabulator-edit-list .tabulator-edit-list-group{border-bottom:1px solid #aaa;padding:6px 4px 4px;color:#333;font-weight:700}.tabulator-edit-list .tabulator-edit-list-group.tabulator-edit-list-group-level-2,.tabulator-edit-list .tabulator-edit-list-item.tabulator-edit-list-group-level-2{padding-left:12px}.tabulator-edit-list .tabulator-edit-list-group.tabulator-edit-list-group-level-3,.tabulator-edit-list .tabulator-edit-list-item.tabulator-edit-list-group-level-3{padding-left:20px}.tabulator-edit-list .tabulator-edit-list-group.tabulator-edit-list-group-level-4,.tabulator-edit-list .tabulator-edit-list-item.tabulator-edit-list-group-level-4{padding-left:28px}.tabulator-edit-list .tabulator-edit-list-group.tabulator-edit-list-group-level-5,.tabulator-edit-list .tabulator-edit-list-item.tabulator-edit-list-group-level-5{padding-left:36px}.tabulator.tabulator-ltr{direction:ltr}.tabulator.tabulator-rtl{text-align:initial;direction:rtl}.tabulator.tabulator-rtl .tabulator-header .tabulator-col{text-align:initial;border-left:1px solid #aaa;border-right:initial}.tabulator.tabulator-rtl .tabulator-header .tabulator-col.tabulator-col-group .tabulator-col-group-cols{margin-right:0;margin-left:-1px}.tabulator.tabulator-rtl .tabulator-header .tabulator-col.tabulator-sortable .tabulator-col-title{padding-right:0;padding-left:25px}.tabulator.tabulator-rtl .tabulator-header .tabulator-col .tabulator-col-content .tabulator-col-sorter{left:8px;right:auto}.tabulator.tabulator-rtl .tabulator-row .tabulator-cell{border-right:initial;border-left:1px solid #aaa}.tabulator.tabulator-rtl .tabulator-row .tabulator-cell .tabulator-data-tree-branch{margin-right:0;margin-left:5px;border-bottom-left-radius:0;border-bottom-right-radius:1px;border-left:initial;border-right:2px solid #aaa}.tabulator.tabulator-rtl .tabulator-row .tabulator-cell .tabulator-data-tree-control{margin-right:0;margin-left:5px}.tabulator.tabulator-rtl .tabulator-row .tabulator-cell.tabulator-frozen.tabulator-frozen-left{border-left:2px solid #aaa}.tabulator.tabulator-rtl .tabulator-row .tabulator-cell.tabulator-frozen.tabulator-frozen-right{border-right:2px solid #aaa}.tabulator.tabulator-rtl .tabulator-row .tabulator-col-resize-handle:last-of-type{width:3px;margin-left:0;margin-right:-3px}.tabulator.tabulator-rtl .tabulator-footer .tabulator-calcs-holder{text-align:initial}.tabulator-print-fullscreen{position:absolute;top:0;bottom:0;left:0;right:0;z-index:10000}body.tabulator-print-fullscreen-hide>:not(.tabulator-print-fullscreen){display:none!important}.tabulator-print-table{border-collapse:collapse}.tabulator-print-table .tabulator-data-tree-branch{display:inline-block;vertical-align:middle;height:9px;width:7px;margin-top:-9px;margin-right:5px;border-bottom-left-radius:1px;border-left:2px solid #aaa;border-bottom:2px solid #aaa}.tabulator-print-table .tabulator-print-table-group{box-sizing:border-box;border-bottom:1px solid #999;border-right:1px solid #aaa;border-top:1px solid #999;padding:5px 5px 5px 10px;background:#ccc;font-weight:700;min-width:100%}.tabulator-print-table .tabulator-print-table-group:hover{cursor:pointer;background-color:rgba(0,0,0,.1)}.tabulator-print-table .tabulator-print-table-group.tabulator-group-visible .tabulator-arrow{margin-right:10px;border-left:6px solid transparent;border-right:6px solid transparent;border-top:6px solid #666;border-bottom:0}.tabulator-print-table .tabulator-print-table-group.tabulator-group-level-1 td{padding-left:30px!important}.tabulator-print-table .tabulator-print-table-group.tabulator-group-level-2 td{padding-left:50px!important}.tabulator-print-table .tabulator-print-table-group.tabulator-group-level-3 td{padding-left:70px!important}.tabulator-print-table .tabulator-print-table-group.tabulator-group-level-4 td{padding-left:90px!important}.tabulator-print-table .tabulator-print-table-group.tabulator-group-level-5 td{padding-left:110px!important}.tabulator-print-table .tabulator-print-table-group .tabulator-group-toggle{display:inline-block}.tabulator-print-table .tabulator-print-table-group .tabulator-arrow{display:inline-block;width:0;height:0;margin-right:16px;border-top:6px solid transparent;border-bottom:6px solid transparent;border-right:0;border-left:6px solid #666;vertical-align:middle}.tabulator-print-table .tabulator-print-table-group span{margin-left:10px;color:#d00}.tabulator-print-table .tabulator-data-tree-control{display:inline-flex;justify-content:center;align-items:center;vertical-align:middle;height:11px;width:11px;margin-right:5px;border:1px solid #333;border-radius:2px;background:rgba(0,0,0,.1);overflow:hidden}.tabulator-print-table .tabulator-data-tree-control:hover{cursor:pointer;background:rgba(0,0,0,.2)}.tabulator-print-table .tabulator-data-tree-control .tabulator-data-tree-control-collapse{display:inline-block;position:relative;height:7px;width:1px;background:transparent}.tabulator-print-table .tabulator-data-tree-control .tabulator-data-tree-control-collapse:after{position:absolute;content:"";left:-3px;top:3px;height:1px;width:7px;background:#333}.tabulator-print-table .tabulator-data-tree-control .tabulator-data-tree-control-expand{display:inline-block;position:relative;height:7px;width:1px;background:#333}.tabulator-print-table .tabulator-data-tree-control .tabulator-data-tree-control-expand:after{position:absolute;content:"";left:-3px;top:3px;height:1px;width:7px;background:#333}
/*# sourceMappingURL=tabulator.min.css.map */
			</style>
			<style>
					.textinput {
						width: 9%;
						padding: 6px 10px;
						margin: 3px 0;
						display: inline-block;
						border: 1px solid #ccc;
						border-radius: 20px;
						box-sizing: border-box;
					}
					.calculationDiv {
						border-radius: 5px;
						background-color: #f2f2f2;
						padding: 1px 0px 0px 10px;
						margin-top: 1px;
					}
				</style>
			<body>
				<link href="https://unpkg.com/tabulator-tables/dist/css/tabulator.min.css" rel="stylesheet">
				<script type="text/javascript" src="https://unpkg.com/tabulator-tables/dist/js/tabulator.min.js"></script>
				<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js"></script>
			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css" />
			<script src="https://cdn.jsdelivr.net/npm/i18next@X.X.X/dist/umd/i18next.min.js"></script>
			
			<div id="property-div" class="modal" style="position:absolute; top: 5%; left: 5%; max-width: 100%!important">
				<div id="iFrame-property-table"></div>
			</div>
			<div id="material-div" class="modal" style="position:absolute; top: 5%; left: 5%; max-width: 100%!important">
				<div id="iFrame-material-table"></div>
			</div>
			<script>
				let propertyTable;
				function setupPropertyTabulator(rowData, tableData) {
					let tableConfig = getPropertyColumnsConfig();
					propertyTable = new Tabulator("#iFrame-property-table", {						
						ajaxURL: baseURL + "/getMaterialProperty",
						ajaxContentType: {
							body: function(url, config, params) {
								return JSON.stringify({ "machineGroup": resourceSelect, "OPRTYPE": 2});
							},
						},
						ajaxConfig: {
							method:"POST",
							headers: {
								"Accept": "application/json",
								"Content-type": 'application/json; charset=utf-8',
								"Authorization": getCookie("tokensso"),
							},
						},
						ajaxResponse: function (url, params, response) {
							let last_page = 1;
							return {
								data: response,
								last_page
							};
						},
						selectable: 1,
						pagination: true,
						maxHeight:"450px",
						paginationMode: "remote",
						layout:"fitColumns",
						locale: true,
						langs: {        
							"de": { //German language definition
								"pagination":{
									"first":"Erste",
									"last":"Letzte",
									"prev":"Vorige",
									"next":"Nächste"									
								},
							},
						},
						...tableConfig
					});

					propertyTable.on("rowSelected", function() {						
						var selectedData = propertyTable.getSelectedData();
						const index = tableData.findIndex(x => JSON.stringify(x) === JSON.stringify(rowData));
						tableData.splice(index, 1);	
						rowData.PROPERTY_CODE = selectedData[0].MATERIAL_CODE;
						rowData.COMMAND_TYPE = selectedData[0].MATERIAL_NAME_SHORT;
						rowData.UNIT = selectedData[0].UNIT;						
						tableData.push(rowData);
						
						const sortedlist = tableData.sort((r1, r2) => (Number(r1.SEQ_NO) > Number(r2.SEQ_NO)) ? 1 : (Number(r1.SEQ_NO) < Number(r2.SEQ_NO) ? -1 : 0));
						table.replaceData(sortedlist);
						
						$('#property-div').modal().hide();						
            $('.jquery-modal').removeClass('blocker');
						updateSearchViewButtonText();
					});
				};
				function getPropertyColumnsConfig() {
					var columnsConfig =  {
						columns: [
							{ title: i18next.t("PROPERTY CODE"), field: "MATERIAL_CODE", headerFilter: true},
							{ title: i18next.t("NAME"), field: "MATERIAL_NAME_SHORT", headerFilter: true},
							{ title: i18next.t("UNIT"), field: "UNIT"}
						],
						placeholder: i18next.t("No Data Available")
					}
					return columnsConfig;
				};
				
				let materailTable;
				function setupMaterialTabulator(rowData, tableData) {
					let tableConfig = getMaterialColumnsConfig();
					materailTable = new Tabulator("#iFrame-material-table", {
						ajaxURL: baseURL + "/getMaterialProperty",
						ajaxContentType: {
							body: function(url, config, params) {
								return JSON.stringify({ "machineGroup": resourceSelect, "OPRTYPE": 1});
							},
						},
						ajaxConfig: {
							method:"POST",
							headers: {
								"Accept": "application/json",
								"Content-type": 'application/json; charset=utf-8',
								"Authorization": getCookie("tokensso"),
							},
						},
						ajaxResponse: function (url, params, response) {
							let last_page = 1;
							return {
								data: (rowData.TARGET_V == 'PE' || rowData.TARGET_V == 'TE' || rowData.TARGET_V == 'TBP' || rowData.TARGET_V == 'TPD' || rowData.TARGET_V == 'TRR') ? response.filter( x => x.MATERIAL_ORIGIN == 4) : response,
								last_page
							};
						},
						selectable: 1,
						pagination: true,
						maxHeight:"450px",
						paginationMode: "remote",
						layout:"fitColumns",
						locale: true,
						langs: {        
							"de": { //German language definition
								"pagination":{
									"first":"Erste",
									"last":"Letzte",
									"prev":"Vorige",
									"next":"Nächste"									
								},
							},
						},
						...tableConfig
					});

					materailTable.on("rowSelected", function() {						
						var selectedData = materailTable.getSelectedData();
						const index = tableData.findIndex(x => JSON.stringify(x) === JSON.stringify(rowData));
						tableData.splice(index, 1);
						rowData.COAT_ID = selectedData[0].MATERIAL_CODE;
						rowData.COATING = selectedData[0].MATERIAL_NAME_SHORT;
						tableData.push(rowData);
						
						const sortedlist = tableData.sort((r1, r2) => (Number(r1.SEQ_NO) > Number(r2.SEQ_NO)) ? 1 : (Number(r1.SEQ_NO) < Number(r2.SEQ_NO) ? -1 : 0));
						table.replaceData(sortedlist);

						$('#material-div').modal().hide();						
            $('.jquery-modal').removeClass('blocker');
						updateSearchViewButtonText();
					});
				};
				function getMaterialColumnsConfig() {
					var columnsConfig =  {
						columns: [
							{ title: i18next.t("MATERIAL CODE"), field: "MATERIAL_CODE", headerFilter: true},
							{ title: i18next.t("NAME"), field: "MATERIAL_NAME_SHORT", headerFilter: true}
						],
						placeholder: i18next.t("No Data Available")
					}
					return columnsConfig;
				};
				
				function getColumnConfiguration(recipeType) {
					$.ajax({
						url: baseURL + "/recipe/column-configuration/" + recipeType,
            type: "GET",
						headers : {'Authorization': getCookie("tokensso") },
						async: false,
            success: function (data) {
							columnConfiguration = data;
							checkedCheckBoxconfig();
            },
            error: function (error) { }
          });
				}
				
				function getCookie(name) {
        	const value = "; "+document.cookie+"";
        	const parts = value.split("; "+name+"=");
        	if (parts.length === 2) return parts.pop().split(';').shift();
      	}
				</script>
				<br>
				<div id='columnVisibilityDiv' class='calculationDiv' hidden>
				  <label id="lblcolumnvisibility" for="bdry">Column visibility</label>
					<input style="margin-left: 15px;" type="checkbox" id="chkbdry" name="bdry" onclick="chkBdryClick()" />
					<label id="lblbdry" for="bdry"> %BDRY</label>
				</div><br><br>
				<div id='buttonDiv' style="float: right; margin: 7px;" hidden>
					<button id="recipeButton" onclick="createRecipe()">Save</button>	
					<button id="newButton" onclick="addNewRow()">New</button>
				</div><br><br>
				<div id="iFrame-table"></div>
				<script>
					let table; let tableData = []; let message = {};
					let apiURL; let apiBody; let baseURL;
					let resourceSelect; let targetDryContent = 0; let mainMaterialBoneDry = 0;
					let recipeClass;let columnConfiguration = [];
					function setupTabulator() {
						let tableConfig = getColumnsConfig();
						if(apiURL != undefined) {
							document.getElementById('recipeButton').innerText = i18next.t('Save Recipe');
							table = new Tabulator("#iFrame-table", {
								ajaxURL: apiURL,
								ajaxContentType:{
									body: function(url, config, params){
										return JSON.stringify(apiBody);
									},
								},
								ajaxConfig:{
									method:"POST",
									headers: {
										"Accept": "application/json",
										"Content-type": 'application/json; charset=utf-8',
										"Authorization": getCookie("tokensso"),
									},
								},
								ajaxResponse: !tableConfig?.isEmpty && function (url, params, response) {
									let last_page = 1;
									return {
										data: response,
										last_page
									};
								},
								dataLoaderLoading: i18next.t('Loading'),
								dataLoaderError: i18next.t('Error'),
								pagination: true,
								maxHeight:"500px",
								rowFormatter:function(row){
								let data = row.getData();
								row.getCells().forEach((cell) => {
									let fieldName = cell.getField();
									const field = ["PROPERTY_CODE","COMMAND_TYPE","UNIT","COAT_ID","COATING","CALC_MINIMUM","CALC_MAXIMUM","TARGET_VALUE"];
									if(field.includes(fieldName)) {
									  	cell.getElement().style.backgroundColor="#dbdbdb";
										} else if(fieldName == 'ACTUAL_VALUE') {
											if((data.PROPERTY_CODE == '' || data.PROPERTY_CODE == null || data.TARGET_V == '' || data.TARGET_V == null)){
												cell.getElement().style.backgroundColor="#dbdbdb";
											} else {
											  cell.getElement().style.backgroundColor="";
											}
										}else if(fieldName == 'IN_VAL') {
											if((data.ACTUAL_VALUE == "" || data.ACTUAL_VALUE == null)) {
												cell.getElement().style.backgroundColor="#dbdbdb";
											} else {
											  cell.getElement().style.backgroundColor="";
											}
										}else if(fieldName == 'INPUT_MINIMUM') {
											if(data.ACTUAL_VALUE == "" || data.ACTUAL_VALUE == null || data.IN_VAL == "" || data.IN_VAL == null) {
												cell.getElement().style.backgroundColor="#dbdbdb";
											} else {
											  cell.getElement().style.backgroundColor="";
											}
										} else if(fieldName == 'INPUT_MAXIMUM') {
											if(data.ACTUAL_VALUE == "" || data.ACTUAL_VALUE == null || data.IN_VAL == "" || data.IN_VAL == null) {
												cell.getElement().style.backgroundColor="#dbdbdb";
											} else {
											  cell.getElement().style.backgroundColor="";
											}
										}
									
								});

								},
								layout:"fitColumns",
								paginationMode: "remote",
								locale: true,
								langs: {        
									"de": { //German language definition
										"pagination":{
											"first":"Erste",
											"last":"Letzte",
											"prev":"Vorige",
											"next":"Nächste"									
										},
									},
								},
								...tableConfig
							});
						} else {
							document.getElementById('recipeButton').innerText = i18next.t('Create Recipe');
							table = new Tabulator("#iFrame-table", {								
								data: tableData,
								maxHeight:"500px",
								pagination: true,
								paginationSize: 1,
								rowFormatter:function(row){
								let data = row.getData();
								row.getCells().forEach((cell) => {
									let fieldName = cell.getField();
									const field = ["PROPERTY_CODE","COMMAND_TYPE","UNIT","COAT_ID","COATING","CALC_MINIMUM","CALC_MAXIMUM","TARGET_VALUE"];
									if(field.includes(fieldName)) {
									  	cell.getElement().style.backgroundColor="#dbdbdb";
										} else if(fieldName == 'ACTUAL_VALUE') {
											if((data.PROPERTY_CODE == '' || data.PROPERTY_CODE == null || data.TARGET_V == '' || data.TARGET_V == null)){
												cell.getElement().style.backgroundColor="#dbdbdb";
											} else {
											  cell.getElement().style.backgroundColor="";
											}
										}else if(fieldName == 'IN_VAL') {
											if((data.ACTUAL_VALUE == "" || data.ACTUAL_VALUE == null)) {
												cell.getElement().style.backgroundColor="#dbdbdb";
											} else {
											  cell.getElement().style.backgroundColor="";
											}
										}else if(fieldName == 'INPUT_MINIMUM') {
											if(data.ACTUAL_VALUE == "" || data.ACTUAL_VALUE == null || data.IN_VAL == "" || data.IN_VAL == null) {
												cell.getElement().style.backgroundColor="#dbdbdb";
											} else {
											  cell.getElement().style.backgroundColor="";
											}
										} else if(fieldName == 'INPUT_MAXIMUM') {
											if(data.ACTUAL_VALUE == "" || data.ACTUAL_VALUE == null || data.IN_VAL == "" || data.IN_VAL == null) {
												cell.getElement().style.backgroundColor="#dbdbdb";
											} else {
											  cell.getElement().style.backgroundColor="";
											}
										}
									
								});

								},
								paginationMode: "remote",
								layout:"fitColumns",
								locale: true,
								langs: {        
									"de": { //German language definition
										"pagination":{
											"first":"Erste",
											"last":"Letzte",
											"prev":"Vorige",
											"next":"Nächste"									
										},
									},
								},
								...tableConfig
							});
						}
						
						table.on("dataProcessed", function() {							
							updateSearchViewButtonText();
						});	

						table.on("scrollVertical", function(top){
							updateSearchViewButtonText();
						});
					};
					
					function getColumnsConfig() {
						var columnsConfig =  {
							columns: [								
								{ title: i18next.t("SEQ"), field: "SEQ_NO", editor:"input", tooltip:true,
									cellEdited: function(cell) {
										let rowData = cell.getRow().getData();
										if(rowData.SEQ_NO != "" && !isNaN(Number(rowData.SEQ_NO))) {
											let tableData = table.getData();
											let tempSeqNo = Number(rowData.SEQ_NO);
											let greaterSeqRow = tableData.filter(x => Number(x.SEQ_NO) > tempSeqNo);
											let count = 1;
											greaterSeqRow.forEach((x) => { 
												x.SEQ_NO = tempSeqNo + count;
												count++;
												return x;
											});
											const sortedlist = tableData.sort((r1, r2) => (Number(r1.SEQ_NO) > Number(r2.SEQ_NO)) ? 1 : (Number(r1.SEQ_NO) < Number(r2.SEQ_NO) ? -1 : 0));
											table.replaceData(sortedlist);
										}
									},
								},
								{ title: i18next.t("SEARCH"), align:"center", formatter: cellSearch,
									cellClick: function(e, cell) {
										setupPropertyTabulator(cell.getRow().getData(), table.getData());
										$('#property-div').modal('show');
										//message.messageEmitterName = 'PROPERTY_SEARCH';
										//message.Message = {"rowData" : cell.getRow().getData(), "tableData" : table.getData()};
										//window.parent.postMessage(message, '*');
									},
								},
								{ title: i18next.t("PROPERTY CODE"), field: "PROPERTY_CODE", tooltip:true },
								{ title: i18next.t("NAME"), field: "COMMAND_TYPE", tooltip:true },
								{ title: i18next.t("FCT"), field: "TARGET_V", editor:"list", tooltip:true,
									editorParams: {values: trgOption()
									},
									cellEdited: function(cell) {
										onUpdateTable(cell);
									}
								},
								{ title: i18next.t("TARGET"), field: "TARGET_VALUE", tooltip:true},
								{ title: i18next.t("VALUE"), field: "ACTUAL_VALUE", editor:"input", tooltip:true,visible: columnConfiguration.includes('%BDRY') ? true: false,
									editable: function(cell) {
										let rowData = cell.getRow().getData();
										return rowData.PROPERTY_CODE == '' || rowData.PROPERTY_CODE == null || rowData.TARGET_V == '' || rowData.TARGET_V == null? false : true;
									},
									cellEdited: function(cell) {
										onUpdateTable(cell);
										onTargetValueChange();
									}
								},								
								{ title: i18next.t("UNIT"), field: "UNIT", tooltip:true },
								{ title: i18next.t("SEARCH"), align:"center", formatter: cellSearch,
									cellClick: function(e, cell) {
										setupMaterialTabulator(cell.getRow().getData(), table.getData());
										$('#material-div').modal('show');
										//message.messageEmitterName = 'MATERIAL_SEARCH';
										//message.Message = {"rowData" : cell.getRow().getData(), "tableData" : table.getData()};
										//window.parent.postMessage(message, '*');
									},
								},
								{ title: i18next.t("Material/Prop.C"), field: "COAT_ID", tooltip:true },
								{ title: i18next.t("NAME"), field: "COATING", tooltip:true },								
								{ title: i18next.t("LIMIT TYPE"), field: "IN_VAL", editor:"list", tooltip:true,
									editorParams: {values: {"A" : "Absolute", "P" : "Percentage", "R" : "Relative"}},
									editable: function(cell) {
										let rowData = cell.getRow().getData();
										return rowData.ACTUAL_VALUE == "" || rowData.ACTUAL_VALUE == null? false : true;
									},
									cellEdited: function(cell) {
										onUpdateTable(cell);
										onTargetValueChange();
									}
								},
								{ title: i18next.t("MIN"), field: "INPUT_MINIMUM", editor:"input", tooltip:true,
									editable: function(cell) {
										let rowData = cell.getRow().getData();
										return rowData.ACTUAL_VALUE == "" || rowData.ACTUAL_VALUE == null || rowData.IN_VAL == "" || rowData.IN_VAL == null? false : true;
									},
									cellEdited: function(cell) {
										onUpdateTable(cell);
										onTargetValueChange();
									}
								},
								{ title: i18next.t("MAX"), field: "INPUT_MAXIMUM", editor:"input", tooltip:true,
									editable: function(cell) {
										let rowData = cell.getRow().getData();
										return rowData.ACTUAL_VALUE == "" || rowData.ACTUAL_VALUE == null || rowData.IN_VAL == "" || rowData.IN_VAL == null? false : true;
									},
									cellEdited: function(cell) {
										onUpdateTable(cell);
										onTargetValueChange();
									}
								},
								{ title: i18next.t("CAL MIN"), field: "CALC_MINIMUM", tooltip:true },
								{ title: i18next.t("CAL MAX"), field: "CALC_MAXIMUM", tooltip:true },
								{ title: i18next.t("VIEW"), align:"center", formatter: cellView,visible:false,
									editable: function(cell) {
										let rowData = cell.getRow().getData();
										return rowData.ASSOCIATE_RECIPE_NUMBER == ''? false : true;
									},
									cellClick: function(e, cell) {
										message.messageEmitterName = 'VIEW';
										message.Message = {"rowData" : cell.getRow().getData(), "tableData" : table.getData()};
										window.parent.postMessage(message, '*');
									},
								}
							],
							placeholder: i18next.t("No Data Available")
						}
						return columnsConfig;
					};									
					var cellView = function(cell, formatterParams, onRendered) { 
						return '<button class="viewButton" type="button">View</button>';
					};
					var cellSearch = function(cell, formatterParams, onRendered) { 
						return '<button class="searchButton" type="button">Search</button>';
					};
					
					function addNewRow() {	
						let rowCount  = table.getData().length;
						const sampleRow = getColumnsConfig();
      			const newRow = { ...sampleRow };
     				Object.keys(newRow).forEach((i) => (newRow[i] = ""));
      			table.addRow(newRow, false,rowCount);
						
						updateSearchViewButtonText();
					};
					function trgOption() {
						return recipeFCTOption;
					};
					function createRecipe() {
						message.messageEmitterName = 'CREATE';
						message.Message = {"rowData" : undefined, "tableData" : table.getData()};
						window.parent.postMessage(message, '*');
					};
					
					function roundFunction(num, fixDec) {
						return +(Math.round(num + "e+" + fixDec)  + "e-" + fixDec);
					}
					
					function onUpdateTable(cell) {
						let rowData = cell.getRow().getData();
						if(rowData.ACTUAL_VALUE == '' || rowData.ACTUAL_VALUE ==  null) {
							cell.getRow().update({
								"IN_VAL" : '',
								"INPUT_MINIMUM" : '',
								"INPUT_MAXIMUM" : '',
								"CALC_MINIMUM" : '',
								"CALC_MAXIMUM" : ''
							});
						}
					}
					
					function onTargetValueChange() {
						let tableData = table.getData();
						for(let i = 0; i < tableData.length; i++) {
							if(tableData[i].IN_VAL == 'A') {
								tableData[i].CALC_MINIMUM = tableData[i].INPUT_MINIMUM;
								tableData[i].CALC_MAXIMUM = tableData[i].INPUT_MAXIMUM;
							} else if(tableData[i].IN_VAL == 'R') {
								if(tableData[i].INPUT_MINIMUM != null && tableData[i].INPUT_MINIMUM != "") {
									tableData[i].CALC_MINIMUM = Number(tableData[i].ACTUAL_VALUE) - Number(tableData[i].INPUT_MINIMUM);
								}
								if(tableData[i].INPUT_MAXIMUM != null && tableData[i].INPUT_MAXIMUM != "") {
									tableData[i].CALC_MAXIMUM = Number(tableData[i].ACTUAL_VALUE) + Number(tableData[i].INPUT_MAXIMUM);
								}
							} else if(tableData[i].IN_VAL == 'P') {
								if(tableData[i].INPUT_MINIMUM != null && tableData[i].INPUT_MINIMUM != "") {
									var per = (Number(tableData[i].ACTUAL_VALUE) * Number(tableData[i].INPUT_MINIMUM)) / 100;
									tableData[i].CALC_MINIMUM = Number(tableData[i].ACTUAL_VALUE) - Number(per);
								}
								if(tableData[i].INPUT_MAXIMUM != null && tableData[i].INPUT_MAXIMUM != "") {
									var per1 = (Number(tableData[i].ACTUAL_VALUE) * Number(tableData[i].INPUT_MAXIMUM)) / 100;
									tableData[i].CALC_MAXIMUM = Number(tableData[i].ACTUAL_VALUE) + Number(per1);
								}
							}							
						}
						if(tableData.length > 0) {
							table.replaceData(tableData);
						}						
					};
					function postData(oprType) {
								 return fetch(baseURL + "/recipe/get-recipe-itemtype-fct", {
										method: 'POST',
										headers:  {'Authorization': getCookie("tokensso") },
										body: JSON.stringify({ "recipeClass": recipeClass, "oPRType": oprType}),
								})
								.then(response => {
										return response.json();
								});
						};
					async function initTranslation(callback) {
						var host =  window.parent.location.host
						var browserLang = navigator.language
						let langResponse; let langData;
						try {
							langResponse = await fetch("https://" + host + "/locales/" + browserLang + ".json");
						} catch (error) {							
							console.log('There was an error', error);							
						}						
						if (langResponse?.ok) {
  						langData = await langResponse.json();
						} else {
							langResponse = await fetch("https://" + host + "/locales/en.json");
							langData = await langResponse.json();
						}	
						var resObj = {}
						resObj[browserLang] = {
							translation:langData
						}
						i18next.init({
							fallbackLng: "en",
							lng: navigator.language,
							debug: true,
							resources: resObj
					 });
						// Make two asynchronous POST requests
						
						const promise2RecipeFCT = postData(1);
					// Use Promise.all to wait for both promises to complete
					Promise.all([promise2RecipeFCT])
							.then(responseArray => {
									// responseArray contains the results of both POST requests
									
									recipeFCTOption = responseArray[0];
									updatei18nextText();
									callback();
									// Continue with any further processing...
							})
							.catch(error => {
									console.error('Error:', error.message);
							});
					};
					function updatei18nextText() {
						document.getElementById('newButton').innerText = i18next.t("New");
						document.getElementById('lblcolumnvisibility').innerText = i18next.t("Column Visibility");
						document.getElementById('lblbdry').innerText = i18next.t("%BDRY");
						document.getElementById('buttonDiv').removeAttribute("hidden");
						document.getElementById('columnVisibilityDiv').removeAttribute("hidden");
					};
					function updateSearchViewButtonText() {
						var searchButtons = document.getElementsByClassName('searchButton');						
						Array.prototype.forEach.call(searchButtons, function(btn) {
    					btn.innerText = i18next.t("Search");
						});

						var viewBottons = document.getElementsByClassName('viewButton');
						Array.prototype.forEach.call(viewBottons, function(btn) {
    					btn.innerText = i18next.t("View");
						});
					};
					function chkBdryClick() {
					  const chk = document.getElementById("chkbdry");
						if(chk.checked) {
							table.showColumn('ACTUAL_VALUE');
						} else {
							table.hideColumn('ACTUAL_VALUE');
						}
					};
					function checkedCheckBoxconfig() {
					 	if(columnConfiguration.includes('%BDRY')) {
							document.querySelector("#chkbdry").checked = true;
						}
					};
					window.addEventListener("message", (event) => {
						if(event.data.message == "CREATE") {
							let message = event.data.data;
							baseURL = message.BASEURL;
							resourceSelect = message.RESOURCE_SELECT;
							targetDryContent = message.TARGET_DRY_CONTENT;
							mainMaterialBoneDry = message.MAIN_MATERIAL_BONE_DRY;
							propertyCodeData = message.PROPERTY_DATA;
							materialCodeData = message.MATERIAL_DATA;
							
							apiURL = undefined;
							initTranslation(setupTabulator);
						} else if(event.data.message == "EDIT") {
							let message = event.data.data;
							baseURL = message.BASEURL;
							resourceSelect = message.RESOURCE_SELECT;
							targetDryContent = message.TARGET_DRY_CONTENT;
							mainMaterialBoneDry = message.MAIN_MATERIAL_BONE_DRY;
							recipeClass = message.RECIPE_CLASS;
							//propertyCodeData = message.PROPERTY_DATA;
							//materialCodeData = message.MATERIAL_DATA;							
							//columnConfiguration = message.COLUMN_CONFIG;
							//checkedCheckBoxconfig(columnConfiguration);
							getColumnConfiguration(message.RECIPE_TYPE);
							apiURL = baseURL + "/recipeitem/search-for-production-recipe"
							apiBody = {RECIPE_NUMBER: message.RECIPE_NUMBER};
							initTranslation(setupTabulator);
						} else if(event.data.message == "Refresh") {
							initTranslation(setupTabulator);
						} else if(event.data.message == "onSelectPropertyData") {
							table.replaceData(event.data.data);
						} else if(event.data.message == "onSelectMaterialData") {
							table.replaceData(event.data.data);
						}						
					});
				</script>
			</body>
		</html>
	`
}