/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","./TimePickerSliderRenderer","sap/ui/core/IconPool","sap/ui/Device","sap/ui/events/KeyCodes","sap/ui/thirdparty/jquery"],function(e,t,i,s,n,o){"use strict";var a=e.extend("sap.m.TimePickerSlider",{metadata:{library:"sap.m",properties:{selectedValue:{type:"string",defaultValue:null},isCyclic:{type:"boolean",defaultValue:true},label:{type:"string",defaultValue:null},isExpanded:{type:"boolean",defaultValue:false}},aggregations:{items:{type:"sap.m.VisibleItem",multiple:true,singularName:"item"},_arrowUp:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_arrowDown:{type:"sap.m.Button",multiple:false,visibility:"hidden"}},events:{expanded:{},collapsed:{}}},renderer:t.render});var r=sap.ui.getCore().getConfiguration().getAnimation()?200:0;var l=50;var h=32;var d=32;a.prototype.init=function(){this._bIsDrag=null;this._selectionOffset=0;this._mousedown=false;this._dragSession=null;this._iSelectedItemIndex=-1;this._animatingSnap=false;this._iSelectedIndex=-1;this._animating=false;this._intervalId=null;this._maxScrollTop=null;this._minScrollTop=null;this._marginTop=null;this._marginBottom=null;this._bOneTimeValueSelectionAnimation=false;this._bEnabled=true;if(s.system.desktop){this._fnHandleTypeValues=m.call(this)}this._initArrows()};a.prototype.onAfterRendering=function(){if(s.system.phone){setTimeout(this._afterExpandCollapse.bind(this),0)}else{this._afterExpandCollapse()}this._attachEvents()};a.prototype.onThemeChanged=function(e){this.invalidate()};a.prototype.fireTap=function(e){var t,i,n;if(!this.getIsExpanded()){if(s.system.desktop){this.focus()}else{this.setIsExpanded(true)}}else{t=e.srcElement||e.originalTarget;if(t&&t.tagName.toLowerCase()==="li"){i=o(t).text();n=g.call(this,i);this._bOneTimeValueSelectionAnimation=true;this.setSelectedValue(n);this._fireSelectedValueChange(n)}else{this._addSelectionStyle();this.focus()}}};a.prototype.setSelectedValue=function(e){var t=p(this._getVisibleItems(),function(t){return t.getKey()===e}),i=this,s,n,o,a;if(t===-1){return this}if(this.getDomRef()){n=this._getSliderContainerDomRef();o=this._getItemHeightInPx();a=this._getContentRepeat();if(t*o>=this._selectionOffset){s=this._getVisibleItems().length*Math.floor(a/2)+t}else{s=this._getVisibleItems().length*Math.ceil(a/2)+t}if(this._bOneTimeValueSelectionAnimation){this._animatingSnap=true;n.animate({scrollTop:s*o-this._selectionOffset},r,"linear",function(){n.clearQueue();i._animatingSnap=false;i._bOneTimeValueSelectionAnimation=false})}else{n.scrollTop(s*o-this._selectionOffset)}this._removeSelectionStyle();this._iSelectedItemIndex=s;this._addSelectionStyle()}return this.setProperty("selectedValue",e,true)};a.prototype.setIsExpanded=function(e,t){this.setProperty("isExpanded",e,true);if(!this.getDomRef()){return this}var i=this.$();if(e){i.addClass("sapMTPSliderExpanded");if(s.system.phone){setTimeout(function(){this._updateDynamicLayout(e);if(!t){this.fireExpanded({ctrl:this})}}.bind(this),0)}else{this._updateDynamicLayout(e);if(!t){this.fireExpanded({ctrl:this})}}}else{this._stopAnimation();if(this._animatingSnap===true){this._animatingSnap=false;this._getSliderContainerDomRef().stop(true);if(this._iSelectedIndex!==-1){this._scrollerSnapped(this._iSelectedIndex)}}i.removeClass("sapMTPSliderExpanded");this._updateMargins(e);if(s.system.phone){setTimeout(this._afterExpandCollapse.bind(this),0)}else{this._afterExpandCollapse()}if(!t){this.fireCollapsed({ctrl:this})}}return this};a.prototype.setIsCyclic=function(e){if(this.getDomRef()){if(e){this.$().removeClass("sapMTimePickerSliderShort")}else{this.$().addClass("sapMTimePickerSliderShort")}}return this.setProperty("isCyclic",e,false)};a.prototype.onfocusin=function(e){if(s.system.desktop&&!this.getIsExpanded()){this.setIsExpanded(true)}};a.prototype.onfocusout=function(e){var t=e.relatedTarget?e.relatedTarget.id:null,i=[this.getAggregation("_arrowUp").getId(),this.getAggregation("_arrowDown").getId()];if(t&&i.indexOf(t)!==-1){return}if(s.system.desktop&&this.getIsExpanded()){this.setIsExpanded(false)}};a.prototype._onmousewheel=function(e){e.preventDefault();e.stopPropagation();if(!this.getIsExpanded()){return false}var t=e.originalEvent,i=t.detail?-t.detail>0:t.wheelDelta>0,s=i?Math.ceil:Math.floor,n=t.detail?-t.detail/3:t.wheelDelta/120,o=this,a;if(!n){return false}if(!this._aWheelDeltas){this._aWheelDeltas=[]}o._aWheelDeltas.push(n);if(!this._bWheelScrolling){this._bWheelScrolling=true;this._intervalId=setInterval(function(){if(!o._aWheelDeltas.length){clearInterval(o._intervalId);o._bWheelScrolling=false}else{a=o._aWheelDeltas[0];o._aWheelDeltas=[];a=s(a);if(a){o._offsetSlider(a)}}},150)}return false};a.prototype.onsappageup=function(e){if(this.getIsExpanded()){var t=this._getVisibleItems()[0],i=t.getKey();this.setSelectedValue(i);this._fireSelectedValueChange(i)}};a.prototype.onsappagedown=function(e){if(this.getIsExpanded()){var t=this._getVisibleItems()[this._getVisibleItems().length-1],i=t.getKey();this.setSelectedValue(i);this._fireSelectedValueChange(i)}};a.prototype.onsapup=function(e){if(this.getIsExpanded()){this._offsetValue(-1)}};a.prototype.onsapdown=function(e){if(this.getIsExpanded()){this._offsetValue(1)}};a.prototype.onkeydown=function(e){var t=e.which||e.keyCode,i=n;if(t>=i.NUMPAD_0&&t<=i.NUMPAD_9){t=this._convertNumPadToNumKeyCode(t)}if(t>=i.A&&t<=i.Z||t>=i.DIGIT_0&&t<=i.DIGIT_9){this._fnHandleTypeValues(e.timeStamp,t)}};a.prototype._getSliderContainerDomRef=function(){return this.$().find(".sapMTimePickerSlider")};a.prototype._getContentRepeat=function(){var e;if(this.getIsCyclic()){e=Math.ceil(l/this._getVisibleItems().length);e=Math.max(e,3)}else{e=1}return e};a.prototype._getItemHeightInPx=function(){return this.$("content").find("li:not(.TPSliderItemHidden)")[0].getBoundingClientRect().height};a.prototype._updateSelectionFrameLayout=function(){var e,t,i,n,o=this.$().offset(),a=o?o.top:0,r=this.$().parents(".sapMTimePickerContainer").offset(),l=r?r.top:0;if(this.getDomRef()){n=this._getItemHeightInPx();e=this.$().find(".sapMTPPickerSelectionFrame");i=a-l;t=(this.$().height()-n+h)/2+i;e.css("top",t);if(s.system.phone){setTimeout(this._afterExpandCollapse.bind(this),0)}else{this._afterExpandCollapse()}}};a.prototype._updateStepAndValue=function(e,t){var i=0,s,n;for(n=0;n<this.getItems().length;n++){if(n%t!==0&&n!==e){this.getItems()[n].setVisible(false)}else{this.getItems()[n].setVisible(true);i++}}if(i>2&&i<13&&this.getDomRef()){s=this.$().find(".sapMTimePickerSlider");s.className="";o(s).addClass("sapMTimePickerSlider SliderValues"+i.toString())}this.setIsCyclic(i>2);this.setSelectedValue(e.toString())};a.prototype._updateMargins=function(e){var t=this._getItemHeightInPx(),i,s,n,o,a,r,l,p;if(this.getDomRef()){t=this._getItemHeightInPx();i=this.$().find(".SliderValues3,.SliderValues4,.SliderValues5,.SliderValues6,.SliderValues7,.SliderValues8,.SliderValues9,.SliderValues10,.SliderValues11,.SliderValues12");if(!i.length){return}if(e){s=this._getVisibleItems().length;n=t*Math.floor(s/2);o=t*Math.ceil(s/2);r=this.$().parents().hasClass("sapUiSizeCompact")?d:0;a=(this.$().height()-t+h)/2;l=a-n-h-r;p=this.$().height()-a-o-r;l=Math.max(l,0);p=Math.max(p,0)}else{l=0;p=0}i.css("margin-top",l);i.css("margin-bottom",p)}};a.prototype._updateDynamicLayout=function(e){this._updateMargins(e);this._updateSelectionFrameLayout()};a.prototype._getSelectionFrameTopOffset=function(){var e=this._getSliderContainerDomRef().find(".sapMTPPickerSelectionFrame"),t=e.offset();return t.top};a.prototype._animateScroll=function(e){var t=this._getSliderContainerDomRef(),i=t.scrollTop(),s=25,n=t.height(),o=this.$("content").height(),a=200,l=n+a,h=this._getContentRepeat(),d=this.getIsCyclic(),p=.9,f=.05,u=this;this._intervalId=setInterval(function(){u._animating=true;i=i-e*s;if(d){i=u._getUpdatedCycleScrollTop(n,o,i,l,h)}else{if(i>u._maxScrollTop){i=u._maxScrollTop;e=0}if(i<u._minScrollTop){i=u._minScrollTop;e=0}}t.scrollTop(i);e*=p;if(Math.abs(e)<f){var a=u._getItemHeightInPx();var c=u._selectionOffset?u._selectionOffset%a:0;var g=Math.round((i+c)/a)*a-c;clearInterval(u._intervalId);u._animating=null;u._iSelectedIndex=Math.round((i+u._selectionOffset)/a);u._animatingSnap=true;t.animate({scrollTop:g},r,"linear",function(){t.clearQueue();u._animatingSnap=false;if(t.css("visibility")==="visible"){u._scrollerSnapped(u._iSelectedIndex)}})}},s)};a.prototype._stopAnimation=function(){if(this._animating){clearInterval(this._intervalId);this._animating=null}};a.prototype._startDrag=function(e){if(!this._dragSession){this._dragSession={};this._dragSession.positions=[]}this._dragSession.pageY=e;this._dragSession.startTop=this._getSliderContainerDomRef().scrollTop()};a.prototype._doDrag=function(e,t){if(this._dragSession){this._dragSession.offsetY=e-this._dragSession.pageY;this._dragSession.positions.push({pageY:e,timeStamp:t});if(this._dragSession.positions.length>20){this._dragSession.positions.splice(0,10)}if(this._bIsDrag){this._getSliderContainerDomRef().scrollTop(this._dragSession.startTop-this._dragSession.offsetY)}}};a.prototype._endDrag=function(e,t){if(this._dragSession){var i,s;for(var n=this._dragSession.positions.length-1;n>=0;n--){i=t-this._dragSession.positions[n].timeStamp;s=e-this._dragSession.positions[n].pageY;if(i>100){break}}var o=s/i;if(this._animating){clearInterval(this._intervalId);this._intervalId=null;this._animating=null}this._dragSession=null;this._animateScroll(o)}};a.prototype._afterExpandCollapse=function(){var e=this.getSelectedValue(),t=this._getSelectionFrameTopOffset(),i=this._getSliderContainerDomRef(),s=i.offset(),n,o,a,r;this._selectionOffset=t-s.top;if(!this.getIsCyclic()){o=this.$("content");r=this._getItemHeightInPx();a=this.$().height();if(this.getIsExpanded()){this._minScrollTop=0;this._marginTop=t-s.top;this._maxScrollTop=r*(this._getVisibleItems().length-1);n=i.height();this._marginBottom=n-this._marginTop-r;if(this._marginBottom<0){this._marginBottom=a-this._marginTop-r}o.css("margin-top",this._marginTop);o.css("margin-bottom",this._marginBottom)}else{this._marginBottom=a-r;o.css("margin-top",0);o.css("margin-bottom",this._marginBottom)}this._selectionOffset=0}if(!this.getIsExpanded()){this._selectionOffset=0}this.$().attr("aria-expanded",this.getIsExpanded());this.setSelectedValue(e)};a.prototype._getUpdatedCycleScrollTop=function(e,t,i,s,n){var o=t-i-e;while(o<s){i=i-t/n;o=t-i-e}while(i<s){i=i+t/n}return i};a.prototype._scrollerSnapped=function(e){var t=e,i=this._getVisibleItems().length,s;while(t>=i){t=t-i}if(!this.getIsCyclic()){t=e}s=this._getVisibleItems()[t].getKey();this.setSelectedValue(s);this._fireSelectedValueChange(s)};a.prototype._updateScroll=function(){var e=this.getSelectedValue();if(e!==this._getVisibleItems()[0].getKey()&&this._getSliderContainerDomRef().scrollTop()+(this._selectionOffset?this._selectionOffset:0)===0){this.setSelectedValue(e);this._fireSelectedValueChange(e)}};a.prototype._addSelectionStyle=function(){var e=this.$("content").find("li:not(.TPSliderItemHidden)"),t=e.eq(this._iSelectedItemIndex).text(),i,s;if(!t){return}s=t;if(s&&s.length>1&&s.indexOf("0")===0){s=s.substring(1)}e.eq(this._iSelectedItemIndex).addClass("sapMTimePickerItemSelected");i=document.getElementById(this.getId()+"-valDescription");if(i.innerHTML!==s){i.innerHTML=s}};a.prototype._removeSelectionStyle=function(){var e=this.$("content").find("li:not(.TPSliderItemHidden)");e.eq(this._iSelectedItemIndex).removeClass("sapMTimePickerItemSelected").attr("aria-selected","false")};a.prototype._attachEvents=function(){var e=this._getSliderContainerDomRef()[0];if(s.system.combi){e.addEventListener("touchstart",o.proxy(f,this),false);e.addEventListener("touchmove",o.proxy(u,this),false);document.addEventListener("touchend",o.proxy(c,this),false);e.addEventListener("mousedown",o.proxy(f,this),false);document.addEventListener("mousemove",o.proxy(u,this),false);document.addEventListener("mouseup",o.proxy(c,this),false)}else{if(s.system.phone||s.system.tablet){e.addEventListener("touchstart",o.proxy(f,this),false);e.addEventListener("touchmove",o.proxy(u,this),false);document.addEventListener("touchend",o.proxy(c,this),false)}else{e.addEventListener("mousedown",o.proxy(f,this),false);document.addEventListener("mousemove",o.proxy(u,this),false);document.addEventListener("mouseup",o.proxy(c,this),false)}}};a.prototype._detachEvents=function(){var e=this.getDomRef();if(s.system.combi){e.removeEventListener("touchstart",o.proxy(f,this),false);e.removeEventListener("touchmove",o.proxy(u,this),false);document.removeEventListener("touchend",o.proxy(c,this),false);e.removeEventListener("mousedown",o.proxy(f,this),false);document.removeEventListener("mousemove",o.proxy(u,this),false);document.removeEventListener("mouseup",o.proxy(c,this),false)}else{if(s.system.phone||s.system.tablet){e.removeEventListener("touchstart",o.proxy(f,this),false);e.removeEventListener("touchmove",o.proxy(u,this),false);document.removeEventListener("touchend",o.proxy(c,this),false)}else{e.removeEventListener("mousedown",o.proxy(f,this),false);document.removeEventListener("mousemove",o.proxy(u,this),false);document.removeEventListener("mouseup",o.proxy(c,this),false)}}};a.prototype._offsetValue=function(e){var t=this._getSliderContainerDomRef(),i=t.scrollTop(),s=this._getItemHeightInPx(),n=i+e*s,o=this.getIsCyclic(),a=this,l=this._iSelectedItemIndex+e;if(!o){if(l<0||l>=this._getVisibleItems().length){return}if(n>this._maxScrollTop){n=this._maxScrollTop}if(n<this._minScrollTop){n=this._minScrollTop}}this._animatingSnap=true;t.animate({scrollTop:n},r,"linear",function(){t.clearQueue();a._animatingSnap=false;if(t.css("visibility")==="visible"){a._scrollerSnapped(l)}})};a.prototype._offsetSlider=function(e){var t=this._getSliderContainerDomRef().scrollTop(),i=this,s=i._getSliderContainerDomRef().height(),n=i.$("content").height(),o=200,a=s+o,r=i._getContentRepeat(),l=i.getIsCyclic(),h=i._getItemHeightInPx();t=t-e*h;if(l){t=i._getUpdatedCycleScrollTop(s,n,t,a,r)}else{if(t>i._maxScrollTop){t=i._maxScrollTop}if(t<i._minScrollTop){t=i._minScrollTop}}i._getSliderContainerDomRef().scrollTop(t);i._iSelectedIndex=Math.round((t+i._selectionOffset)/h);i._scrollerSnapped(i._iSelectedIndex)};a.prototype._initArrows=function(){var e=this,t,s;t=new sap.m.Button({icon:i.getIconURI("slim-arrow-up"),press:function(t){e._offsetValue(-1)},type:"Transparent"});t.addEventDelegate({onAfterRendering:function(){t.$().attr("tabindex",-1)}});this.setAggregation("_arrowUp",t);s=new sap.m.Button({icon:i.getIconURI("slim-arrow-down"),press:function(t){e._offsetValue(1)},type:"Transparent"});s.addStyleClass("sapMTimePickerItemArrowDown");s.addEventDelegate({onAfterRendering:function(){s.$().attr("tabindex",-1)}});this.setAggregation("_arrowDown",s)};a.prototype._convertNumPadToNumKeyCode=function(e){var t=n;if(e>=t.NUMPAD_0&&e<=t.NUMPAD_9){e-=48}return e};function p(e,t){if(e==null){throw new TypeError("findIndex called with null or undefined array")}if(typeof t!=="function"){throw new TypeError("predicate must be a function")}var i=e.length;var s=arguments[1];var n;for(var o=0;o<i;o++){n=e[o];if(t.call(s,n,o,e)){return o}}return-1}var f=function(e){var t=e.touches&&e.touches.length?e.touches[0].pageY:e.pageY;this._bIsDrag=false;if(!this.getIsExpanded()){return}this._stopAnimation();this._startDrag(t);e.preventDefault();this._mousedown=true};var u=function(e){var t=e.touches&&e.touches.length?e.touches[0].pageY:e.pageY;if(!this._mousedown||!this.getIsExpanded()){return}if(!this._bIsDrag&&this._dragSession&&this._dragSession.positions.length){var i=this._dragSession.positions.some(function(e){return Math.abs(e.pageY-t)>5});if(i){this._bIsDrag=true}}this._doDrag(t,e.timeStamp);this._mousedown=true};var c=function(e){var t=e.changedTouches&&e.changedTouches.length?e.changedTouches[0].pageY:e.pageY;if(this._bIsDrag===false){this.fireTap(e);this._dragSession=null}this._bIsDrag=true;if(!this.getIsExpanded()){this._dragSession=null;return}this._endDrag(t,e.timeStamp);this._mousedown=false};var g=function(e){var t=this._getVisibleItems();var i=p(t,function(t){return t.getText()===e});return t[i].getKey()};var m=function(){var e=-1,t=-1,i=1e3,s="",n=function(n,o){var a;if(e+i<n){s=""}else{if(t!==-1){clearTimeout(t);t=-1}}s+=String.fromCharCode(o).toLowerCase();a=this._getVisibleItems().filter(function(e){return e.getKey().indexOf(s)===0});if(a.length>1){t=setTimeout(function(){this.setSelectedValue(s);s="";t=-1}.bind(this),i)}else if(a.length===1){this.setSelectedValue(a[0].getKey());s=""}e=n};return n};a.prototype._getVisibleItems=function(){return this.getItems().filter(function(e){return e.getVisible()})};a.prototype._setEnabled=function(e){this._bEnabled=e;if(e){this.$().removeClass("sapMTPDisabled");this.$().attr("tabindex",0)}else{this.$().addClass("sapMTPDisabled");this.$().attr("tabindex",-1)}return this};a.prototype._getEnabled=function(e){return this._bEnabled};a.prototype._fireSelectedValueChange=function(e){this.fireEvent("_selectedValueChange",{value:e})};return a});