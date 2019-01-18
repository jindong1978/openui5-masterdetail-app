/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","./ExportColumn","./ExportRow","./ExportType","./File","sap/base/Log"],function(e,t,r,n,i,o){"use strict";function s(e,t){if(e){return function(){return e.apply(t,arguments)}}else{return e}}function a(e){o.warning("Usage of deprecated jQuery Promise method: '"+e+"'. "+"Please use the standard Promise methods 'then' / 'catch' instead!","","sap.ui.core.util.Export")}function p(e,t){var r=new Promise(e);t=t||r;var n=false,i=false;r.then(function(e){n=true;return e},function(e){i=true;throw e});var o={then:r.then,catch:r["catch"]};function p(e){e.then=function(r,n){var i=[s(r,t),s(n,t)];return p(o.then.apply(e,i),t)};e["catch"]=function(r){var n=[s(r,t)];return p(o["catch"].apply(e,n),t)};[{jq:"done",es6:"then"},{jq:"fail",es6:"catch"},{jq:"always",es6:"then"}].forEach(function(r){e[r.jq]=function(){a(r.jq);var n=null;Array.prototype.concat.apply([],arguments).forEach(function(i){var a=s(i,t);var p=function(e){a.apply(this,arguments);return e};var u=[p];if(r.jq==="always"){u.push(p)}if(!n){n=o[r.es6].apply(e,u)}else{n=n[r.es6].apply(n,u)}});return p(n,t)}});e.pipe=function(t,r){a("pipe");return e.then(t,r)};e.state=function(){a("state");if(n){return"resolved"}else if(i){return"rejected"}else{return"pending"}};return e}return p(r)}var u=e.extend("sap.ui.core.util.Export",{metadata:{publicMethods:["generate","saveFile"],library:"sap.ui.core",aggregations:{exportType:{type:"sap.ui.core.util.ExportType",multiple:false},columns:{type:"sap.ui.core.util.ExportColumn",multiple:true,bindable:"bindable"},rows:{type:"sap.ui.core.util.ExportRow",multiple:true,bindable:"bindable"},_template:{type:"sap.ui.core.util.ExportRow",multiple:false,visibility:"hidden"}}}});u.getMetadata().getAggregation("rows")._doesNotRequireFactory=true;u.prototype.init=function(){this._oPromise=null;this._fnResolvePromise=null;this._oRowBindingArgs=null};u.prototype.exit=function(){delete this._oPromise;delete this._fnResolvePromise;delete this._oRowBindingArgs};u.prototype._createRowTemplate=function(){var e=new r(this.getId()+"-row"),t=this.getColumns();for(var n=0,i=t.length;n<i;n++){var o=t[n].getTemplate();if(o){e.addCell(o.clone("col"+n))}}return e};u.prototype.bindAggregation=function(t,r){if(t==="rows"){this._oRowBindingArgs=arguments;return this}return e.prototype.bindAggregation.apply(this,arguments)};u.prototype.updateRows=function(e){if(e==="change"&&this._fnResolvePromise){var t=this.getExportType()._generate(this);this.destroyAggregation("_template");this.unbindAggregation("rows");this._fnResolvePromise(t);this._oPromise=null;this._fnResolvePromise=null}};u.prototype.generate=function(){var t=this;if(!this._oPromise){this._oPromise=p(function(r,n){t._fnResolvePromise=r;if(!t.hasModel()){n("Generate is not possible beause no model was set.")}else{var i=t._createRowTemplate();t.setAggregation("_template",i,true);e.prototype.bindAggregation.apply(t,t._oRowBindingArgs);if(t.getBinding("rows")){t.getBinding("rows").getContexts(0,t.getBinding("rows").getLength())}}},this)}return this._oPromise};u.prototype.saveFile=function(e){return this.generate().then(function(t){var r=this.getExportType();i.save(t,e||"data",r.getFileExtension(),r.getMimeType(),r.getCharset(),r.getByteOrderMark())})};return u});