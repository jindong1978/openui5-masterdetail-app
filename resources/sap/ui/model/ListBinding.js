/*!

 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Binding","./Filter","./Sorter"],function(t,e,i){"use strict";var n=t.extend("sap.ui.model.ListBinding",{constructor:function(n,o,s,a,h,u){t.call(this,n,o,s,u);this.aSorters=r(a,i);this.aFilters=[];this.aApplicationFilters=r(h,e);this.oCombinedFilter=null;this.bUseExtendedChangeDetection=false;this.bDetectUpdates=true},metadata:{abstract:true,publicMethods:["getContexts","getCurrentContexts","sort","attachSort","detachSort","filter","attachFilter","detachFilter","getDistinctValues","isGrouped","getLength","isLengthFinal"]}});function r(t,e){if(Array.isArray(t)){return t}return t instanceof e?[t]:[]}n.prototype.getCurrentContexts=function(){return this.getContexts()};n.prototype.getLength=function(){return 0};n.prototype.isLengthFinal=function(){return true};n.prototype.getDistinctValues=function(t){return null};n.prototype.attachSort=function(t,e){this.attachEvent("sort",t,e)};n.prototype.detachSort=function(t,e){this.detachEvent("sort",t,e)};n.prototype._fireSort=function(t){this.fireEvent("sort",t)};n.prototype.attachFilter=function(t,e){this.attachEvent("filter",t,e)};n.prototype.detachFilter=function(t,e){this.detachEvent("filter",t,e)};n.prototype._fireFilter=function(t){this.fireEvent("filter",t)};n.prototype.isGrouped=function(){return!!(this.aSorters&&this.aSorters[0]&&this.aSorters[0].fnGroup)};n.prototype.getGroup=function(t){return this.aSorters[0].getGroup(t)};n.prototype.enableExtendedChangeDetection=function(t,e){this.bUseExtendedChangeDetection=true;this.bDetectUpdates=t;if(typeof e==="string"){this.getEntryKey=function(t){return t.getProperty(e)}}else if(typeof e==="function"){this.getEntryKey=e}if(this.update){this.update()}};n.prototype.getContextData=function(t){var e;if(this.getEntryKey&&!this.bDetectUpdates){e=this.getEntryKey(t);if(this.isGrouped()){e+="-"+this.getGroup(t).key}}else{e=this.getEntryData(t)}return e};n.prototype.getEntryData=function(t){return JSON.stringify(t.getObject())};n.prototype.getFilterInfo=function(t){if(this.oCombinedFilter){return this.oCombinedFilter.getAST(t)}return null};n.prototype.checkDataState=function(t){var e=this.getDataState(),i=this.oModel?this.oModel.resolve(this.sPath,this.oContext):null,n=this;function r(){n.fireEvent("AggregatedDataStateChange",{dataState:e});e.changed(false);n._sDataStateTimout=null}if(!t||i&&i in t){if(i){e.setModelMessages(this.oModel.getMessagesByPath(i))}if(e&&e.changed()){if(this.mEventRegistry["DataStateChange"]){this.fireEvent("DataStateChange",{dataState:e})}if(this.bIsBeingDestroyed){r()}else if(this.mEventRegistry["AggregatedDataStateChange"]){if(!this._sDataStateTimout){this._sDataStateTimout=setTimeout(r,0)}}}}};return n});