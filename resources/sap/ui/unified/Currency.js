/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/format/NumberFormat","./CurrencyRenderer","sap/ui/thirdparty/jquery"],function(e,t,r,i){"use strict";var s=e.extend("sap.ui.unified.Currency",{metadata:{library:"sap.ui.unified",properties:{value:{type:"float",group:"Appearance",defaultValue:0},stringValue:{type:"string",group:"Appearance",defaultValue:null},currency:{type:"string",group:"Appearance",defaultValue:null},maxPrecision:{type:"int",group:"Appearance",defaultValue:3},useSymbol:{type:"boolean",group:"Appearance",defaultValue:true}},designtime:"sap/ui/unified/designtime/Currency.designtime"}});s.FIGURE_SPACE=" ";s.PUNCTUATION_SPACE=" ";s.prototype.init=function(){this._oFormat=t.getCurrencyInstance({showMeasure:false})};s.prototype.exit=function(){this._oFormat=null;this._$Value=null;this._$Currency=null;this._sLastCurrency=null;this._iLastCurrencyDigits=null;this._bRenderNoValClass=null};s.prototype.onAfterRendering=function(){if(this.$()){this._$Value=this.$().find(".sapUiUfdCurrencyValue");this._$Currency=this.$().find(".sapUiUfdCurrencyCurrency")}};s.prototype.setValue=function(e){if(this.isBound("value")){this._bRenderNoValClass=e==null;if(this.$()){this.$().toggleClass("sapUiUfdCurrencyNoVal",this._bRenderNoValClass)}}this.setProperty("value",e,true);this._renderValue();return this};s.prototype.unbindProperty=function(t){e.prototype.unbindProperty.apply(this,arguments);if(t==="value"){this._bRenderNoValClass=false;if(this.$()){this.$().toggleClass("sapUiUfdCurrencyNoVal",false)}}};s.prototype.setCurrency=function(e){var t,r;this.setProperty("currency",e,true);this._renderCurrency();t=this._oFormat.oLocaleData.getCurrencyDigits(e);if(i.isNumeric(this._iLastCurrencyDigits)&&this._iLastCurrencyDigits!==t){r=true}this._iLastCurrencyDigits=t;if(this._sLastCurrency==="*"||e==="*"){r=true}this._sLastCurrency=e;if(r){this._renderValue();if(e==="*"&&this.$()){this._bRenderNoValClass=false;this.$().toggleClass("sapUiUfdCurrencyNoVal",false)}}return this};s.prototype.setUseSymbol=function(e){this.setProperty("useSymbol",e,true);this._renderCurrency();return this};s.prototype.setMaxPrecision=function(e){this.setProperty("maxPrecision",e,true);this._renderValue();return this};s.prototype._renderValue=function(){if(this._$Value){this._$Value.text(this.getFormattedValue())}};s.prototype._renderCurrency=function(){if(this._$Currency){this._$Currency.text(this._getCurrency())}};s.prototype._getCurrency=function(){return this.getUseSymbol()?this.getCurrencySymbol():this.getCurrency()};s.prototype.getFormattedValue=function(){var e=this.getCurrency(),t,r,i,n;if(e==="*"){return""}i=this._oFormat.oLocaleData.getCurrencyDigits(e);t=this.getMaxPrecision();t=t<=0&&i>0?t-1:t;r=t-i;n=this._oFormat.format(this.getStringValue()||this.getValue(),e);if(r==t&&t>0){n+=s.PUNCTUATION_SPACE}if(r>0){n=n.padEnd(n.length+r,s.FIGURE_SPACE)}else if(r<0){n=n.substr(0,n.length+r)}return n};s.prototype.getCurrencySymbol=function(){return this._oFormat.oLocaleData.getCurrencySymbol(this.getCurrency())};s.prototype.getAccessibilityInfo=function(){if(this._bRenderNoValClass){return{}}return{description:(this.getFormattedValue()||"")+" "+(this.getCurrency()||"").trim()}};return s});