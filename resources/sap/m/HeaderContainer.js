/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/Device","sap/ui/core/delegate/ItemNavigation","sap/ui/core/library","sap/ui/base/ManagedObject","sap/ui/core/Icon","./HeaderContainerRenderer","sap/base/Log","sap/ui/events/PseudoEvents","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/control","sap/ui/dom/jquery/scrollLeftRTL","sap/ui/dom/jquery/scrollRightRTL","sap/ui/dom/jquery/Selectors"],function(t,e,i,r,o,s,a,n,l,h,c){"use strict";var g=o.Orientation;var d=e.extend("sap.m.HeaderContainerItemContainer",{metadata:{defaultAggregation:"item",aggregations:{item:{type:"sap.ui.core.Control",multiple:false}}},renderer:function(t,e){var i=e.getAggregation("item");if(!i||!i.getVisible()){return}t.write("<div");t.writeControlData(e);t.addClass("sapMHdrCntrItemCntr");t.addClass("sapMHrdrCntrInner");t.writeClasses();t.write(">");t.renderControl(i);t.write("</div>")}});var p=e.extend("sap.m.HeaderContainer",{metadata:{interfaces:["sap.m.ObjectHeaderContainer"],library:"sap.m",properties:{scrollStep:{type:"int",defaultValue:300,group:"Behavior"},scrollStepByItem:{type:"int",defaultValue:1,group:"Behavior"},scrollTime:{type:"int",defaultValue:500,group:"Behavior"},showOverflowItem:{type:"boolean",defaultValue:true,group:"Behavior"},showDividers:{type:"boolean",defaultValue:true,group:"Appearance"},orientation:{type:"sap.ui.core.Orientation",defaultValue:g.Horizontal,group:"Appearance"},backgroundDesign:{type:"sap.m.BackgroundDesign",defaultValue:t.BackgroundDesign.Transparent,group:"Appearance"},width:{type:"sap.ui.core.CSSSize",group:"Appearance"},height:{type:"sap.ui.core.CSSSize",group:"Appearance"}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true},_scrollContainer:{type:"sap.m.ScrollContainer",multiple:false,visibility:"hidden"},_prevButton:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_nextButton:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}}}});p.prototype.init=function(){this._aItemEnd=[];this._bRtl=sap.ui.getCore().getConfiguration().getRTL();this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._oScrollCntr=new t.ScrollContainer(this.getId()+"-scrl-cntnr",{width:"100%",height:"100%",horizontal:!i.system.desktop});this.setAggregation("_scrollContainer",this._oScrollCntr,true);if(i.system.desktop){this._oArrowPrev=new t.Button({id:this.getId()+"-scrl-prev-button",type:t.ButtonType.Transparent,tooltip:this._oRb.getText("HEADERCONTAINER_BUTTON_PREV_SECTION"),press:function(t){t.cancelBubble();this._scroll(this._getScrollValue(false),this.getScrollTime())}.bind(this)}).addStyleClass("sapMHdrCntrBtn").addStyleClass("sapMHdrCntrLeft");this._oArrowPrev._bExcludeFromTabChain=true;this.setAggregation("_prevButton",this._oArrowPrev,true);this._oArrowNext=new t.Button({id:this.getId()+"-scrl-next-button",type:t.ButtonType.Transparent,tooltip:this._oRb.getText("HEADERCONTAINER_BUTTON_NEXT_SECTION"),press:function(t){t.cancelBubble();this._scroll(this._getScrollValue(true),this.getScrollTime())}.bind(this)}).addStyleClass("sapMHdrCntrBtn").addStyleClass("sapMHdrCntrRight");this._oArrowNext._bExcludeFromTabChain=true;this.setAggregation("_nextButton",this._oArrowNext,true)}else if(i.system.phone||i.system.tablet){this._oArrowPrev=new a({id:this.getId()+"-scrl-prev-button"}).addStyleClass("sapMHdrCntrBtn").addStyleClass("sapMHdrCntrLeft");this.setAggregation("_prevButton",this._oArrowPrev,true);this._oArrowNext=new a({id:this.getId()+"-scrl-next-button"}).addStyleClass("sapMHdrCntrBtn").addStyleClass("sapMHdrCntrRight");this.setAggregation("_nextButton",this._oArrowNext,true)}this._oScrollCntr.addDelegate({onAfterRendering:function(){if(i.system.desktop){var t=this._oScrollCntr.getDomRef("scroll");var e=this._oScrollCntr.$("scroll");var o=e.find(".sapMHrdrCntrInner").attr("tabindex","0");if(!this._oItemNavigation){this._oItemNavigation=new r;this.addDelegate(this._oItemNavigation);this._oItemNavigation.attachEvent(r.Events.BorderReached,this._handleBorderReached,this);this._oItemNavigation.attachEvent(r.Events.AfterFocus,this._handleBorderReached,this);this._oItemNavigation.attachEvent(r.Events.BeforeFocus,this._handleBeforeFocus,this);if(i.browser.msie||i.browser.edge){this._oItemNavigation.attachEvent(r.Events.FocusAgain,this._handleFocusAgain,this)}}this._oItemNavigation.setRootDomRef(t);this._oItemNavigation.setItemDomRefs(o);this._oItemNavigation.setTabIndex0();this._oItemNavigation.setCycling(false)}}.bind(this)});sap.ui.getCore().attachIntervalTimer(this._checkOverflow,this)};p.prototype.onBeforeRendering=function(){if(!this.getHeight()){l.warning("No height provided",this)}if(!this.getWidth()){l.warning("No width provided",this)}if(i.system.desktop){this._oArrowPrev.setIcon(this.getOrientation()===g.Horizontal?"sap-icon://slim-arrow-left":"sap-icon://slim-arrow-up");this._oArrowNext.setIcon(this.getOrientation()===g.Horizontal?"sap-icon://slim-arrow-right":"sap-icon://slim-arrow-down")}else if(i.system.phone||i.system.tablet){this._oArrowPrev.setSrc(this.getOrientation()===g.Horizontal?"sap-icon://slim-arrow-left":"sap-icon://slim-arrow-up");this._oArrowNext.setSrc(this.getOrientation()===g.Horizontal?"sap-icon://slim-arrow-right":"sap-icon://slim-arrow-down")}};p.prototype.onAfterRendering=function(){this._bRtl=sap.ui.getCore().getConfiguration().getRTL();this._checkOverflow()};p.prototype.exit=function(){if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();this._oItemNavigation=null}sap.ui.getCore().detachIntervalTimer(this._checkOverflow,this)};p.prototype.onsaptabnext=function(t){var e=this.$().find(":focusable");var i=e.index(t.target);var r=e.eq(i+1).get(0);var o=this._getParentCell(t.target);var s;if(r){s=this._getParentCell(r)}if(o&&s&&o.id!==s.id||r&&r.id===this.getId()+"-after"||r&&r.id===this.getId()+"-scrl-prev-button"||r&&r.id===this.getId()+"-scrl-next-button"){var a=e.last().get(0);if(a){this._bIgnoreFocusIn=true;a.focus()}}};p.prototype.onsaptabprevious=function(t){this.$().find(".sapMHdrCntrItemCntr").css("border-color","");var e=this.$().find(":focusable");var i=e.index(t.target);var r=e.eq(i-1).get(0);var o=this._getParentCell(t.target);var s;if(r){s=this._getParentCell(r)}if(!s||o&&o.id!==s.id){var a=this.$().attr("tabindex");this.$().attr("tabindex","0");this.$().focus();if(!a){this.$().removeAttr("tabindex")}else{this.$().attr("tabindex",a)}}};p.prototype.setOrientation=function(t){this.setProperty("orientation",t);if(t===g.Horizontal&&!i.system.desktop){this._oScrollCntr.setHorizontal(true);this._oScrollCntr.setVertical(false)}else if(!i.system.desktop){this._oScrollCntr.setHorizontal(false);this._oScrollCntr.setVertical(true)}return this};p.prototype.validateAggregation=function(t,e,i){return this._callMethodInManagedObject("validateAggregation",t,e,i)};p.prototype.getAggregation=function(t,e,i){return this._callMethodInManagedObject("getAggregation",t,e,i)};p.prototype.setAggregation=function(t,e,i){return this._callMethodInManagedObject("setAggregation",t,e,i)};p.prototype.indexOfAggregation=function(t,e){return this._callMethodInManagedObject("indexOfAggregation",t,e)};p.prototype.insertAggregation=function(t,e,i,r){return this._callMethodInManagedObject("insertAggregation",t,e,i,r)};p.prototype.addAggregation=function(t,e,i){return this._callMethodInManagedObject("addAggregation",t,e,i)};p.prototype.removeAggregation=function(t,e,i){return this._callMethodInManagedObject("removeAggregation",t,e,i)};p.prototype.removeAllAggregation=function(t,e){return this._callMethodInManagedObject("removeAllAggregation",t,e)};p.prototype.destroyAggregation=function(t,e){return this._callMethodInManagedObject("destroyAggregation",t,e)};p.prototype._setScrollInProcess=function(t){this.bScrollInProcess=t};p.prototype._scroll=function(t,e){this._setScrollInProcess(true);setTimeout(this._setScrollInProcess.bind(this,false),e+300);if(this.getOrientation()===g.Horizontal){this._hScroll(t,e)}else{this._vScroll(t,e)}};p.prototype._vScroll=function(t,e){var i=this._oScrollCntr.getDomRef(),r=i.scrollTop,o=i.scrollHeight,s=r+t,a=i.clientHeight,n=parseFloat(this.$("scroll-area").css("padding-top")),l;if(s<=0){l=this._calculateRemainingScrolling(t,e,r);this.$("scroll-area").css("transition","padding "+l+"s");this.$().removeClass("sapMHrdrTopPadding")}else if(s+a+n>=o){l=this._calculateRemainingScrolling(t,e,o-a-r);this.$("scroll-area").css("transition","padding "+l+"s");if(a+t>o&&a!==o){this.$().removeClass("sapMHrdrBottomPadding");this.$().addClass("sapMHrdrTopPadding")}else{this.$().removeClass("sapMHrdrBottomPadding")}}else{this.$("scroll-area").css("transition","padding "+e/1e3+"s")}this._oScrollCntr.scrollTo(0,s,e)};p.prototype._hScroll=function(t,e){var r=this._oScrollCntr.getDomRef();var o,s,a,n,l,h;if(!this._bRtl){s=r.scrollLeft;n=r.scrollWidth;a=r.clientWidth+(i.browser.msie?1:0);o=s+t;l=parseFloat(this.$("scroll-area").css("padding-left"));if(o<=0){h=this._calculateRemainingScrolling(t,e,s);this.$("scroll-area").css("transition","padding "+h+"s");this.$().removeClass("sapMHrdrLeftPadding")}else if(o+r.clientWidth+l>=n){h=this._calculateRemainingScrolling(t,e,n-a-s);this.$("scroll-area").css("transition","padding "+h+"s");if(a+t>n&&a!==n){this.$().removeClass("sapMHrdrRightPadding");this.$().addClass("sapMHrdrLeftPadding")}else{this.$().removeClass("sapMHrdrRightPadding")}}else{this.$("scroll-area").css("transition","padding "+e/1e3+"s")}this._oScrollCntr.scrollTo(o,0,e)}else{o=c(r).scrollRightRTL()+t;this._oScrollCntr.scrollTo(o>0?o:0,0,e)}};p.prototype._collectItemSize=function(){var t=0,e=this._filterVisibleItems(),i=this.getOrientation()===g.Horizontal?"outerWidth":"outerHeight";this._aItemEnd=[];e.forEach(function(e,r){t+=e.$().parent()[i](true);this._aItemEnd[r]=t},this)};p.prototype._getScrollValue=function(t){if(!this._oScrollCntr){return 0}var e=this.getOrientation()===g.Horizontal,i=this._oScrollCntr.$(),r=this.$("prev-button-container"),o=this.$("next-button-container"),s=e?i[0].scrollLeft:i[0].scrollTop,a=0,n=0,l,h=this._filterVisibleItems();var c=function(t){var i=0,s=0;var a=10;if(this._bRtl&&e){if(!r.is(":visible")){s=r.width()}if(!o.is(":visible")){s=o.width()}}for(var n=0;n<h.length&&n<t;n++){i+=d(h[n])}return i!==0?i+a-s:0}.bind(this);var d=function(t){return e?t.$().parent().outerWidth(true):t.$().parent().outerHeight(true)};var p=function(){var t=this._getSize(true),e,i=0;for(var r=a;r<h.length;r++){if(!h[r].$().is(":visible")){e=d(h[r])+c(r)-t-s;for(var o=a;o<h.length&&o<r;o++){if(l+i>e){break}a++;i+=d(h[o])}l+=i;break}}}.bind(this);if(this.getScrollStepByItem()>0){s=e&&this._bRtl?i.scrollRightRTL():s;for(var f=0;f<h.length;f++){n+=d(h[f]);if(n>=s){a=f;break}}a=(t?1:-1)*this.getScrollStepByItem()+a;if(a<0){a=0}if(a>=h.length){a=h.length-1}l=c(a)-s;if(t&&!this.getShowOverflowItem()){p()}return l}return t?this.getScrollStep():-this.getScrollStep()};p.prototype._calculateRemainingScrolling=function(t,e,i){return Math.abs(i*e/(1e3*t))};p.prototype._checkOverflow=function(){if(this.getOrientation()===g.Horizontal){this._checkHOverflow()}else{this._checkVOverflow()}};p.prototype._filterVisibleItems=function(){return this.getContent().filter(function(t){return t.getVisible()})};p.prototype._getFirstItemOffset=function(t){var e=this._filterVisibleItems()[0],i=e&&e.$(),r=i&&i.parent(),o=r&&r[0]&&r[0][t];return o||0};p.prototype._checkVOverflow=function(){var t=this._oScrollCntr.getDomRef(),e,i;if(t){var r=this._getFirstItemOffset("offsetTop");var o=Math.ceil(t.scrollTop);var s=false;var a=false;var n=t.scrollHeight;var l=t.clientHeight;if(Math.abs(n-l)===1){n=l}if(o>r){s=true}if(n>l&&o+l<n){a=true}a=this._checkForOverflowItem(a);i=this.$("prev-button-container");e=i.is(":visible");if(e&&!s){i.hide();this.$().removeClass("sapMHrdrTopPadding")}if(!e&&s){i.show();this.$().addClass("sapMHrdrTopPadding")}i=this.$("next-button-container");var h=i.is(":visible");if(h&&!a){i.hide();this.$().removeClass("sapMHrdrBottomPadding")}if(!h&&a){i.show();this.$().addClass("sapMHrdrBottomPadding")}}};p.prototype._checkHOverflow=function(){var t=this._oScrollCntr.getDomRef(),e;if(t){var r=this._getFirstItemOffset("offsetLeft");var o=Math.ceil(t.scrollLeft);var s=false;var a=false;var n=t.scrollWidth;var l=t.clientWidth;if(Math.abs(n-l)===1){n=l}if(this._bRtl){var h=c(t).scrollLeftRTL();if(h>(i.browser.msie||i.browser.edge?1:0)){a=true}}else if(o>r){s=true}if(n-5>l){if(this._bRtl){if(c(t).scrollRightRTL()>1){s=true}}else if(o+l<n){a=true}}e=this.$("prev-button-container");a=this._checkForOverflowItem(a);var g=e.is(":visible");if(g&&!s){e.hide();this.$().removeClass("sapMHrdrLeftPadding")}if(!g&&s){e.show();this.$().addClass("sapMHrdrLeftPadding")}e=this.$("next-button-container");var d=e.is(":visible");if(d&&!a){e.hide();this.$().removeClass("sapMHrdrRightPadding")}if(!d&&a){e.show();this.$().addClass("sapMHrdrRightPadding")}}};p.prototype._getSize=function(t){var e=this._oScrollCntr.$(),i=this.getOrientation()===g.Horizontal,r=this.$("next-button-container"),o=!r.is(":visible")&&t,s=i?"width":"height";return e[s]()-(o?r[s]():0)};p.prototype._checkForOverflowItem=function(t){if(this._oScrollCntr&&!this.getShowOverflowItem()){var e=this._oScrollCntr.$(),i=this.getOrientation()===g.Horizontal,r=!i?e[0].scrollTop:this._bRtl?e.scrollRightRTL():e[0].scrollLeft,o=i?"width":"height",s=this._getSize(t),a=this._filterVisibleItems();this._collectItemSize();this._aItemEnd.forEach(function(e,i){var n=a[i].$(),l=n.parent(),h=n.is(":visible");if(t&&e>r+s){if(i===0||this._aItemEnd[i-1]<=r){l.css(o,"auto");n.show()}else if(h){l[o](l[o]());n.hide();t=true}}else{if(!h){l.css(o,"auto");n.show()}}},this)}return t};p.prototype._handleBorderReached=function(t){if(i.browser.msie&&this.bScrollInProcess){return}var e=t.getParameter("index");if(e===0){this._scroll(this._getScrollValue(false),this.getScrollTime())}else if(e===this._filterVisibleItems().length-1){this._scroll(this._getScrollValue(true),this.getScrollTime())}};p.prototype._handleFocusAgain=function(t){t.getParameter("event").preventDefault()};p.prototype._handleBeforeFocus=function(t){var e=t.getParameter("event");if(c(e.target).hasClass("sapMHdrCntrItemCntr")||c(e.target).hasClass("sapMScrollContScroll")||h.events.sapprevious.fnCheck(e)||h.events.sapnext.fnCheck(e)){this.$().find(".sapMHdrCntrItemCntr").css("border-color","")}else{this.$().find(".sapMHdrCntrItemCntr").css("border-color","transparent")}};p.prototype._unWrapHeaderContainerItemContainer=function(t){if(t instanceof d){t=t.getItem()}else if(Array.isArray(t)){for(var e=0;e<t.length;e++){if(t[e]instanceof d){t[e]=t[e].getItem()}}}return t};p._AGGREGATION_FUNCTIONS=["validateAggregation","validateAggregation","getAggregation","setAggregation","indexOfAggregation","removeAggregation"];p._AGGREGATION_FUNCTIONS_FOR_INSERT=["insertAggregation","addAggregation"];p.prototype._callMethodInManagedObject=function(t,i){var r=Array.prototype.slice.call(arguments);if(i==="content"){var o=r[2];r[1]="content";if(o instanceof e){if((p._AGGREGATION_FUNCTIONS?Array.prototype.indexOf.call(p._AGGREGATION_FUNCTIONS,t):-1)>-1&&o.getParent()instanceof d){r[2]=o.getParent()}else if((p._AGGREGATION_FUNCTIONS_FOR_INSERT?Array.prototype.indexOf.call(p._AGGREGATION_FUNCTIONS_FOR_INSERT,t):-1)>-1){r[2]=new d({item:o})}}return this._unWrapHeaderContainerItemContainer(this._oScrollCntr[t].apply(this._oScrollCntr,r.slice(1)))}else{return s.prototype[t].apply(this,r.slice(1))}};p.prototype._getParentCell=function(t){return c(t).parents(".sapMHrdrCntrInner").andSelf(".sapMHrdrCntrInner").get(0)};p.prototype.onfocusin=function(t){if(this._bIgnoreFocusIn){this._bIgnoreFocusIn=false;return}if(t.target.id===this.getId()+"-after"){this._restoreLastFocused()}};p.prototype._restoreLastFocused=function(){if(!this._oItemNavigation){return}var t=this._oItemNavigation.getItemDomRefs();var e=this._oItemNavigation.getFocusedIndex();var i=c(t[e]);var r=i.control(0)||{};var o=r.getTabbables?r.getTabbables():i.find(":sapTabbable");o.eq(-1).add(i).eq(-1).focus()};return p});