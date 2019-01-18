/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={};e.init=function(t){var n=t,r=false,u=null,o=false,i,a,c=0;var s=["mousedown","mouseover","mouseup","mouseout","click"];var v=function(e,t){if(!r){return}var o=t.type=="touchend"?t.changedTouches[0]:t.touches[0];var i=n.createEvent("MouseEvent");i.initMouseEvent(e,true,true,window,t.detail,o.screenX,o.screenY,o.clientX,o.clientY,t.ctrlKey,t.shiftKey,t.altKey,t.metaKey,t.button,t.relatedTarget);i.isSynthetic=true;window.setTimeout(function(){u.dispatchEvent(i)},0)};var f=function(e){return e.target.tagName.match(/input|textarea|select/i)};var d=function(e){if(!e.isSynthetic&&!f(e)){e.stopPropagation();e.preventDefault()}};var l=function(e){var t=e.touches,n;r=t.length==1&&!f(e);o=false;if(r){n=t[0];u=n.target;if(u.nodeType===3){u=u.parentNode}i=n.clientX;a=n.clientY;v("mousedown",e)}};var h=function(e){var t;if(r){t=e.touches[0];if(Math.abs(t.clientX-i)>10||Math.abs(t.clientY-a)>10){o=true}if(o){v("mousemove",e)}}};var m=function(e){v("mouseup",e);if(!o){v("click",e)}};var E=function(e){v("mouseup",e)};for(;c<s.length;c++){n.addEventListener(s[c],d,true)}n.addEventListener("touchstart",l,true);n.addEventListener("touchmove",h,true);n.addEventListener("touchend",m,true);n.addEventListener("touchcancel",E,true);e.disableTouchToMouseHandling=function(){var e=0;n.removeEventListener("touchstart",l,true);n.removeEventListener("touchmove",h,true);n.removeEventListener("touchend",m,true);n.removeEventListener("touchcancel",E,true);for(;e<s.length;e++){n.removeEventListener(s[e],d,true)}}};return e});