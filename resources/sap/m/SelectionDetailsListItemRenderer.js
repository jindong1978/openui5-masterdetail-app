/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","sap/m/ListItemBaseRenderer"],function(e,t){"use strict";var r={svg:{attributes:["width","height","focusable","preserveAspectRatio"]},path:{attributes:["d","fill","transform","stroke","stroke-width"]},line:{attributes:["x1","x2","y1","y2","stroke-width","stroke","stroke-dasharray","stroke-linecap"]}},i;try{var a=new DOMParser;i=a.parseFromString("<svg />","text/html")!==null}catch(e){i=false}var s;if(i){s=function(e){var t=new DOMParser,r=t.parseFromString(e,"text/html");return r.body.childNodes}}else{s=function(e){var t=document.implementation.createHTMLDocument("");t.body.innerHTML=e;return t.body.childNodes}}function n(e,t){var r;if(!e){return true}for(r=0;r<e.length;r++){if(!t(e[r])){return false}}return true}function d(e){if(e.nodeType!==window.Node.ELEMENT_NODE){return true}var t=e.tagName.toLowerCase(),i=r[t],a;if(!i){return false}a=n(e.attributes,function(e){if(e.value===""){return true}var t=e.name.toLowerCase();return i.attributes.indexOf(t)>=0});if(!a){return false}if(!i.allowTextContenet&&e.textContent.trim().length>0){return false}return n(e.childNodes,d)}var l=e.extend(t);l.renderLIAttributes=function(e,t){e.addClass("sapMSDItem");e.writeClasses()};l.renderLIContent=function(e,r){var i=r._getParentElement().getLines();e.write("<div");e.addClass("sapMSDItemLines");e.writeClasses();e.write(">");for(var a=0;a<i.length;a++){this.renderLine(e,r,i[a])}e.write("</div>");t.renderType(e,r)};l._isValidSvg=function(e){try{var t=s(e);if(t.length===0){return false}return n(t,d)}catch(e){return false}};l.renderLine=function(e,t,r){var i=r.getUnit().trim(),a=r._getValueToRender(),s=r.getDisplayValue(),n=r.getLineMarker();e.write("<div");e.addClass("sapMSDItemLine");e.writeClasses();e.write(">");e.write("<div");e.addClass("sapMSDItemLineMarkerContainer");e.writeClasses();e.write(">");if(n&&l._isValidSvg(n)){e.write(n)}e.write("</div>");e.write("<div");e.addClass("sapMSDItemLineLabel");e.writeClasses();e.write(">");e.writeEscaped(r.getLabel());e.write("</div>");e.write("<div");e.addClass("sapMSDItemLineValue");if(i){e.addClass("sapMSDItemLineBold")}e.writeClasses();e.write(">");if(s){e.writeEscaped(s)}else{e.writeEscaped(a)}if(i){e.write("<span");e.addClass("sapMSDItemLineUnit");e.writeClasses();e.write(">");e.write("&nbsp;");e.writeEscaped(i);e.write("</span>")}e.write("</div>");e.write("</div>")};l.renderType=function(e,t){var r=t._getParentElement().getAggregation("_overflowToolbar");if(r){e.write("<div");e.addClass("sapMSDItemActions");e.writeClasses();e.write(">");e.renderControl(r);e.write("</div>")}};return l},true);