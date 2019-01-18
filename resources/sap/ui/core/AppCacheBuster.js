/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","./Core","sap/ui/thirdparty/URI","sap/base/Log","sap/base/strings/escapeRegExp","sap/ui/thirdparty/jquery"],function(e,r,t,o,n,a){"use strict";var i=sap.ui.getCore().getConfiguration();var s=i.getLanguage();var p=i.getAppCacheBusterMode()==="sync";var u=i.getAppCacheBusterMode()==="batch";var c={index:{},active:false};var f,l,d,g,h;var y=document.baseURI.replace(/\?.*|#.*/g,"");var v=t(sap.ui.require.toUrl("")+"/../");var L=v.toString();if(v.is("relative")){v=v.absoluteTo(y)}var b=v.normalize().toString();var m=t("resources").absoluteTo(b).toString();var x=new RegExp("^"+n(m));var C=function(e){if(e.length>0&&e.slice(-1)!=="/"){e+="/"}return e};var A=function(e,r){var t=c.index;var n;var i;var f;if(Array.isArray(e)&&!u){e.forEach(function(e){A(e,r)})}else if(Array.isArray(e)&&u){var l=C(e[0]);var d=[];o.debug('sap.ui.core.AppCacheBuster.register("'+l+'"); // BATCH MODE!');var g=R.normalizeURL(l);o.debug('  --\x3e normalized to: "'+g+'"');e.forEach(function(e){i=C(e);var r=R.normalizeURL(i);if(!t[f]){d.push(r)}});if(d.length>0){var i=g+"sap-ui-cachebuster-info.json?sap-ui-language="+s;n={url:i,type:"POST",async:!p&&!!r,dataType:"json",contentType:"text/plain",data:d.join("\n"),success:function(e){R.onIndexLoaded(i,e);a.extend(t,e)},error:function(){o.error('Failed to batch load AppCacheBuster index file from: "'+i+'".')}}}}else{e=C(e);o.debug('sap.ui.core.AppCacheBuster.register("'+e+'");');f=R.normalizeURL(e);o.debug('  --\x3e normalized to: "'+f+'"');if(!t[f]){var i=f+"sap-ui-cachebuster-info.json?sap-ui-language="+s;n={url:i,async:!p&&!!r,dataType:"json",success:function(e){R.onIndexLoaded(i,e);t[f]=e},error:function(){o.error('Failed to load AppCacheBuster index file from: "'+i+'".')}}}}if(n){var h=R.onIndexLoad(n.url);if(h!=null){o.info('AppCacheBuster index file injected for: "'+i+'".');n.success(h)}else{if(n.async){var y=r.startTask("load "+i);var v=n.success,L=n.error;a.extend(n,{success:function(e){v.apply(this,arguments);r.finishTask(y)},error:function(){L.apply(this,arguments);r.finishTask(y,false)}})}o.info('Loading AppCacheBuster index file from: "'+i+'".');a.ajax(n)}}};var R={boot:function(e){var r=i.getAppCacheBuster();if(r&&r.length>0){r=r.slice();var o=true;var n=String(r[0]).toLowerCase();if(r.length===1){if(n==="true"||n==="x"){var a=t(L);r=a.is("relative")?[a.toString()]:[]}else if(n==="false"){o=false}}if(o){R.init();A(r,e)}}},init:function(){c.active=true;f=e.prototype.validateProperty;l=Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype,"src");d=Object.getOwnPropertyDescriptor(HTMLLinkElement.prototype,"href");var r=R.convertURL;var t=R.normalizeURL;var n=function(e){if(this.active===true&&e&&typeof e==="string"){e=t(e);return!e.match(x)}return false}.bind(c);g=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(e,t){if(t&&n(t)){arguments[1]=r(t)}g.apply(this,arguments)};h=XMLHttpRequest.prototype.open;e.prototype.validateProperty=function(e,t){var o=this.getMetadata(),a=o.getProperty(e),i;if(a&&a.type==="sap.ui.core.URI"){i=Array.prototype.slice.apply(arguments);try{if(n(i[1])){i[1]=r(i[1])}}catch(e){}}return f.apply(this,i||arguments)};var a=function(e){var t={get:e.get,set:function(t){if(n(t)){t=r(t)}e.set.call(this,t)},enumerable:e.enumerable,configurable:e.configurable};t.set._sapUiCoreACB=true;return t};var i=false;try{Object.defineProperty(HTMLScriptElement.prototype,"src",a(l))}catch(e){o.error("Your browser doesn't support redefining the src property of the script tag. Disabling AppCacheBuster as it is not supported on your browser!\nError: "+e);i=true}try{Object.defineProperty(HTMLLinkElement.prototype,"href",a(d))}catch(e){o.error("Your browser doesn't support redefining the href property of the link tag. Disabling AppCacheBuster as it is not supported on your browser!\nError: "+e);i=true}if(i){this.exit()}},exit:function(){e.prototype.validateProperty=f;if(XMLHttpRequest.prototype.open===h){XMLHttpRequest.prototype.open=g}var r;if((r=Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype,"src"))&&r.set&&r.set._sapUiCoreACB===true){Object.defineProperty(HTMLScriptElement.prototype,"src",l)}if((r=Object.getOwnPropertyDescriptor(HTMLLinkElement.prototype,"href"))&&r.set&&r.set._sapUiCoreACB===true){Object.defineProperty(HTMLLinkElement.prototype,"href",d)}c.index={};c.active=false;c={index:{},active:false}},register:function(e){A(e)},convertURL:function(e){o.debug('sap.ui.core.AppCacheBuster.convertURL("'+e+'");');var r=c.index;if(r&&e){var t=R.normalizeURL(e);o.debug('  --\x3e normalized to: "'+t+'"');if(t&&R.handleURL(t)){a.each(r,function(r,n){var a;if(r&&t.length>=r.length&&t.slice(0,r.length)===r){a=t.slice(r.length);a=a.match(/([^?#]*)/)[1];if(n[a]){e=r+"~"+n[a]+"~/"+a;o.debug('  ==> rewritten to "'+e+'";');return false}}})}}return e},normalizeURL:function(e){var r=t(e||"./");if(r.is("relative")){r=r.absoluteTo(y)}return r.normalizeProtocol().normalizeHostname().normalizePort().normalizePath().toString()},handleURL:function(e){return true},onIndexLoad:function(e){return null},onIndexLoaded:function(e,r){}};var T=i.getAppCacheBusterHooks();if(T){["handleURL","onIndexLoad","onIndexLoaded"].forEach(function(e){if(typeof T[e]==="function"){R[e]=T[e]}})}return R},true);