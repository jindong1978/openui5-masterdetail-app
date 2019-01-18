/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element","sap/ui/core/IconPool","./library","sap/base/security/encodeXML"],function(e,t,i,a){"use strict";var r=e.extend("sap.ui.unified.ShellHeadUserItem",{metadata:{library:"sap.ui.unified",properties:{username:{type:"string",group:"Appearance",defaultValue:""},showPopupIndicator:{type:"boolean",group:"Accessibility",defaultValue:true},image:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{press:{}}}});t.insertFontFaceStyle();r.prototype.onclick=function(e){this.firePress();e.preventDefault()};r.prototype.onsapspace=r.prototype.onclick;r.prototype.onsapenter=r.prototype.onclick;r.prototype.setImage=function(e){this.setProperty("image",e,true);if(this.getDomRef()){this._refreshImage()}return this};r.prototype._refreshImage=function(){var e=this.$("img");var i=this.getImage();if(!i){e.html("").css("style","").css("display","none")}else if(t.isIconURI(i)){var r=t.getIconInfo(i);e.html("").css("style","");if(r){e.text(r.content).attr("role","presentation").attr("aria-label",r.text||r.name).css("font-family","'"+r.fontFamily+"'")}}else{var s=this.$("img-inner");if(s.length==0||s.attr("src")!=i){e.css("style","").attr("aria-label",null).html("<img role='presentation' id='"+this.getId()+"-img-inner' src='"+a(i)+"'/>")}}};r.prototype._checkAndAdaptWidth=function(e){if(!this.getDomRef()){return false}var t=this.$(),i=this.$("name");var a=t.width();t.toggleClass("sapUiUfdShellHeadUsrItmLimit",false);var r=240;if(e){r=Math.min(r,.5*document.documentElement.clientWidth-225)}if(r<i.width()){t.toggleClass("sapUiUfdShellHeadUsrItmLimit",true)}return a!=t.width()};return r});