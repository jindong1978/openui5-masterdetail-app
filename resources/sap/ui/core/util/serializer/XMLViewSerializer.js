/*
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/EventProvider","./Serializer","./delegate/XML","sap/ui/thirdparty/vkbeautify"],function(e,i,t,r){"use strict";var s=e.extend("sap.ui.core.util.serializer.XMLViewSerializer",{constructor:function(i,t,r,s,a){e.apply(this);this._oView=i;this._oWindow=t;this._sDefaultNamespace=r;this._fnGetControlId=s;this._fnGetEventHandlerName=a}});s.prototype.serialize=function(){var e=[];var s=function(i,t){if(!t){var r=i?i.constructor:"?";throw Error("Controls with empty package are currently not supported by the XML serializer: "+r)}if(e.indexOf(t)===-1){e.push(t)}};var a=this;var o=function(e){return e instanceof this._oWindow.sap.ui.core.mvc.View&&e!==a._oView};var n=new i(this._oView,new t(this._sDefaultNamespace,this._fnGetControlId,this._fnGetEventHandlerName,s),true,this._oWindow,o);var u=n.serialize();var h=[];h.push("<sap.ui.core.mvc:View");if(this._oView.getControllerName&&this._oView.getControllerName()){h.push(' controllerName="'+this._oView.getControllerName()+'"')}if(e.indexOf("sap.ui.core.mvc")===-1){e.push("sap.ui.core.mvc")}for(var l=0;l<e.length;l++){if(this._sDefaultNamespace&&this._sDefaultNamespace===e[l]){h.push(' xmlns="'+e[l]+'"')}else{h.push(" xmlns:"+e[l]+'="'+e[l]+'"')}}h.push(" >");h.push(u);h.push("</sap.ui.core.mvc:View>");return r.xml(h.join(""))};return s});