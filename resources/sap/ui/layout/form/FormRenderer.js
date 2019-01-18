/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/layout/library","sap/base/Log"],function(e,t){"use strict";var i={};i.render=function(i,a){var r=i;var l=a.getLayout();var s={role:"form"};r.write("<div");r.writeControlData(a);r.addClass("sapUiForm");r.addClass("sapUiFormLblColon");r.writeAttribute("data-sap-ui-customfastnavgroup","true");var d=e.form.FormHelper.addFormClass();if(d){r.addClass(d)}if(a.getEditable()){r.addClass("sapUiFormEdit");r.addClass("sapUiFormEdit-CTX")}else{s.readonly=""}if(a.getWidth()){r.addStyle("width",a.getWidth())}if(a.getTooltip_AsString()){r.writeAttributeEscaped("title",a.getTooltip_AsString())}r.writeClasses();r.writeStyles();var o=a.getTitle();var g=a.getToolbar();if(g){if(!a.getAriaLabelledBy()||a.getAriaLabelledBy().length==0){s["labelledby"]=g.getId()}}else if(o){var n="";if(typeof o=="string"){n=a.getId()+"--title"}else{n=o.getId()}s["labelledby"]={value:n,append:true}}else if(a._sSuggestedTitleId){s["labelledby"]={value:a._sSuggestedTitleId,append:true}}r.writeAccessibilityState(a,s);r.write(">");if(l){r.renderControl(l)}else{t.warning('Form "'+a.getId()+'" - Layout missing!',"Renderer","Form")}r.write("</div>")};return i},true);