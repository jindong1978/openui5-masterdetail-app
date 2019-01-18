/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/IconPool","./PanelRenderer"],function(e,t,a,n){"use strict";var o=e.PanelAccessibleRole;var i=e.BackgroundDesign;var s=t.extend("sap.m.Panel",{metadata:{library:"sap.m",properties:{headerText:{type:"string",group:"Data",defaultValue:""},width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"100%"},height:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"auto"},expandable:{type:"boolean",group:"Appearance",defaultValue:false},expanded:{type:"boolean",group:"Appearance",defaultValue:false},expandAnimation:{type:"boolean",group:"Behavior",defaultValue:true},backgroundDesign:{type:"sap.m.BackgroundDesign",group:"Appearance",defaultValue:i.Translucent},accessibleRole:{type:"sap.m.PanelAccessibleRole",group:"Accessibility",defaultValue:o.Form}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"},headerToolbar:{type:"sap.m.Toolbar",multiple:false},infoToolbar:{type:"sap.m.Toolbar",multiple:false}},events:{expand:{parameters:{expand:{type:"boolean"},triggeredByInteraction:{type:"boolean"}}}},designtime:"sap/m/designtime/Panel.designtime"}});s.prototype.init=function(){this._bInteractiveExpand=false;this.data("sap-ui-fastnavgroup","true",true)};s.prototype.setWidth=function(e){this.setProperty("width",e,true);var t=this.getDomRef();if(t){t.style.width=e}return this};s.prototype.setHeight=function(e){this.setProperty("height",e,true);var t=this.getDomRef();if(t){t.style.height=e;if(parseFloat(e)!=0){t.querySelector(".sapMPanelContent").style.height=e}this._setContentHeight()}return this};s.prototype.onThemeChanged=function(){this._setContentHeight()};s.prototype.setExpandable=function(e){this.setProperty("expandable",e,false);if(e&&!this.oIconCollapsed){this.oIconCollapsed=this._createIcon()}return this};s.prototype.setExpanded=function(e){if(e===this.getExpanded()){return this}this.setProperty("expanded",e,true);if(!this.getExpandable()){return this}this._getIcon().$().attr("aria-expanded",this.getExpanded());this._toggleExpandCollapse();this._toggleCssClasses();this.fireExpand({expand:e,triggeredByInteraction:this._bInteractiveExpand});this._bInteractiveExpand=false;return this};s.prototype.setAccessibleRole=function(e){if(e===this.getAccessibleRole()){return this}this.setProperty("accessibleRole",e,true);if(sap.ui.getCore().getConfiguration().getAccessibility()){this.$().attr("role",this.getAccessibleRole().toLowerCase())}return this};s.prototype.onBeforeRendering=function(){this._updateIconAriaLabelledBy()};s.prototype.onAfterRendering=function(){var e=this.$(),t,a=this.getDomRef("content");this._setContentHeight();if(this.getExpandable()){t=this.oIconCollapsed.$();a&&t.attr("aria-controls",a.id);if(this.getExpanded()){t.attr("aria-expanded","true")}else{e.children(".sapMPanelExpandablePart").hide();t.attr("aria-expanded","false")}}};s.prototype.exit=function(){if(this.oIconCollapsed){this.oIconCollapsed.destroy();this.oIconCollapsed=null}};s.prototype._createIcon=function(){var e=this,t=a.getIconURI("navigation-right-arrow"),n=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("PANEL_ICON");return a.createControlByURI({id:e.getId()+"-CollapsedImg",src:t,decorative:false,press:function(){e._bInteractiveExpand=true;e.setExpanded(!e.getExpanded())},tooltip:n}).addStyleClass("sapMPanelExpandableIcon")};s.prototype._getIcon=function(){return this.oIconCollapsed};s.prototype._setContentHeight=function(){var e,t=this.getDomRef(),a=t&&t.querySelector(".sapMPanelContent");if(this.getHeight()==="auto"||!a){return}e="calc("+this.getHeight()+" - "+a.offsetTop+"px)";a.style.height=e};s.prototype._toggleExpandCollapse=function(){var e={};if(!this.getExpandAnimation()){e.duration=0}this.$().children(".sapMPanelExpandablePart").slideToggle(e)};s.prototype._toggleCssClasses=function(){var e=this.$();e.children(".sapMPanelWrappingDiv").toggleClass("sapMPanelWrappingDivExpanded");e.children(".sapMPanelWrappingDivTb").toggleClass("sapMPanelWrappingDivTbExpanded");e.find(".sapMPanelExpandableIcon").first().toggleClass("sapMPanelExpandableIconExpanded")};s.prototype._updateIconAriaLabelledBy=function(){var e,t,a;if(!this.oIconCollapsed){return}if(this.getAccessibleRole()===o.Form){a=true}e=this._getLabellingElementId();t=this.oIconCollapsed.getAriaLabelledBy();if(t.indexOf(e)===-1){this.oIconCollapsed.removeAllAssociation("ariaLabelledBy");!a&&this.oIconCollapsed.addAriaLabelledBy(e)}};s.prototype._getLabellingElementId=function(){var e=this.getHeaderToolbar(),t;if(e){t=e.getTitleId()}else{t=this.getId()+"-header"}return t};return s});