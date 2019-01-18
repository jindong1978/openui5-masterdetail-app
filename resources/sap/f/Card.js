/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/Manifest","sap/f/CardManifest","sap/base/Log","sap/f/CardRenderer","sap/m/Text","sap/f/Avatar","sap/ui/Device","sap/ui/core/ComponentContainer"],function(t,e,i,s,a,r,n,o,p,d){"use strict";var f=e.extend("sap.f.Card",{metadata:{library:"sap.f",properties:{manifest:{type:"any",defaultValue:""},width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"100%"},height:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"100%"}},aggregations:{_header:{multiple:false,visibility:"hidden"},_content:{multiple:false,visibility:"hidden"}},events:{}}});f.prototype.init=function(){};f.prototype.onAfterRendering=function(){if(p.browser.msie){if(this._oTitle){this._oTitle.clampText()}if(this._oSubTitle){this._oSubTitle.clampText()}}};f.prototype.exit=function(){if(this._oCardManifest){this._oCardManifest.destroy();this._oCardManifest=null}if(this._oTitle){this._oTitle.destroy();this._oTitle=null}if(this._oSubTitle){this._oSubTitle.destroy();this._oSubTitle=null}if(this._oAvatar){this._oAvatar.destroy();this._oAvatar=null}};f.prototype.modifyDomRef=function(t,e){var i=this.getDomRef(),s=this.getDomRef("content");if(i){i=t?i.querySelector(t):i;if(i&&(s&&!s.contains(i)||!s)){e(i)}}return this};f.prototype.setManifest=function(t){this.setBusy(true);this.setProperty("manifest",t,true);if(typeof t==="string"){this.initManifest(t)}else if(typeof t==="object"){this._oCardManifest=new s(t);this.applyManifestSettings()}return this};f.prototype.setContent=function(t){this.setAggregation("_content",t)};f.prototype.initManifest=function(t){var e=i.load({manifestUrl:t,async:true});e.then(function(t){var e=t._oRawManifest;this._oCardManifest=new s(e);t._loadI18n(true).then(function(t){this._oCardManifest.registerTranslator(t);if(this._oCardManifest.get("sap.app/type")!=="card"){throw Error("sap.app/type entry in manifest is not 'card'")}this.applyManifestSettings()}.bind(this))}.bind(this))};f.prototype._setPropertyFromManifest=function(t,e,i){if(this._oCardManifest&&this.isPropertyInitial(t)){var s;if(e){s=this._oCardManifest.get("sap.card/"+e);if(!s&&i){s=this._oCardManifest.get("sap.card/"+i)}}else{s=this._oCardManifest.get("sap.card/"+t)}}};f.prototype.setBusy=function(t){this.setProperty("busy",t,true);this.modifyDomRef(null,function(e){if(t===true){e.classList.add("sapFCardLoading")}else{e.classList.remove("sapFCardLoading")}});return this};f.prototype.applyManifestSettings=function(){this._createHeader();this._setPropertyFromManifest("subtitle");this._setPropertyFromManifest("icon");this._setPropertyFromManifest("iconColor");this._setPropertyFromManifest("iconBackgroundColor");this._setPropertyFromManifest("backgroundColor");this._setPropertyFromManifest("color");this._setPropertyFromManifest("backgroundImage");this._setPropertyFromManifest("backgroundSize");this._setContent()};f.prototype._createHeader=function(t){var t=this._oCardManifest.get("sap.card/header");if(t&&t.type){switch(t.type){case"kpi":sap.ui.require(["sap/f/cards/header/Kpi"],this._setCardHeader.bind(this));break;default:{a.error("Header type '"+t.type+"' was not recognised.","sap.f.Card")}}}else{this._createTitle();this._createSubTitle();this._createAvatar()}};f.prototype._setCardHeader=function(t){var e=this._oCardManifest.get("sap.card/header");var i=jQuery.extend(true,{},e);delete i.type;var s=new t(i);this.setAggregation("_header",s);this.setBusy(false)};f.prototype._setContent=function(){var t=this._oCardManifest.get("sap.card/type");if(!t){a.error("Card type property is mandatory!");return}if(t==="Custom"){var e=new d({async:true,manifest:this._oCardManifest.getJson(),settings:{}});this.setContent(e)}else{switch(t.toLowerCase()){case"list":sap.ui.require(["sap/f/cards/content/List"],this._setCardContent.bind(this));break;case"table":sap.ui.require(["sap/f/cards/content/Table"],this._setCardContent.bind(this));break;case"analytical":sap.ui.getCore().loadLibrary("sap.viz",{async:true}).then(function(){sap.ui.require(["sap/f/cards/content/Analytical"],this._setCardContent.bind(this))}.bind(this)).catch(function(){a.error("Analytical type card is not available with this distribution")});break}}};f.prototype._setCardContent=function(t){var e=this._oCardManifest.get("sap.card/content");var i=jQuery.extend(true,{},e);var s=new t(i);this.setContent(s);this.setBusy(false)};f.prototype._createTitle=function(){if(!this._oTitle){this._oTitle=new n({id:this.getId()+"-title",maxLines:3,text:this._oCardManifest.get("sap.card/title")}).addStyleClass("sapFCardTitle")}return this};f.prototype._createSubTitle=function(){if(!this._oSubTitle){this._oSubTitle=new n({id:this.getId()+"-subtitle",maxLines:2,text:this._oCardManifest.get("sap.card/subtitle")}).addStyleClass("sapFCardSubtitle")}return this};f.prototype._createAvatar=function(){if(!this._oAvatar){this._oAvatar=new o({id:this.getId()+"-avatar"}).addStyleClass("sapFCardIcon");var t=this._oCardManifest.get("sap.card/icon/displayShape"),e=this._oCardManifest.get("sap.card/icon/src"),i=this._oCardManifest.get("sap.card/icon/initials");if(e){this._oAvatar.setSrc(e)}else if(i){this._oAvatar.setInitials(i)}if(t){this._oAvatar.setDisplayShape(t)}}return this};return f});