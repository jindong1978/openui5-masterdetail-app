/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.script","./_Helper","sap/base/strings/escapeRegExp"],function(e,n,r){"use strict";var t={POST:true,PUT:true,PATCH:true,DELETE:true},o,i=/\$\d+/,a=/(\S*?)=(?:"(.+)"|(\S+))/;function s(e){var n=u(e,"boundary"),t=e.trim().indexOf("multipart/mixed");if(t!==0||!n){throw new Error('Invalid $batch response header "Content-Type": '+e)}n=r(n);return new RegExp("--"+n+"(?:[ \t]*\r\n|--)")}function u(e,n){var r,t=e.split(";"),o;n=n.toLowerCase();for(r=1;r<t.length;r++){o=a.exec(t[r]);if(o[1].toLowerCase()===n){return o[2]||o[3]}}}function c(e){var n=d(e,"content-type");return n.indexOf("multipart/mixed;")===0?n:undefined}function f(e){var n=d(e,"content-id"),r;if(!n){throw new Error("Content-ID MIME header missing for the change set response.")}r=parseInt(n);if(isNaN(r)){throw new Error("Invalid Content-ID value in change set response.")}return r}function d(e,n){var r,t,o=e.split("\r\n");for(r=0;r<o.length;r++){t=o[r].split(":");if(t[0].toLowerCase().trim()===n){return t[1].trim()}}}function p(e,n,r){var t=n.split(s(e)),o=[];t=t.slice(1,-1);t.forEach(function(e){var n,t,i,a,s,d,h,l,y,m,T={},E,w;w=e.split("\r\n\r\n");m=w[0];n=c(m);if(n){o.push(p(n,w.slice(1).join("\r\n\r\n"),true));return}h=w[1].split("\r\n");l=h[0].split(" ");T.status=parseInt(l[1]);T.statusText=l.slice(2).join(" ");T.headers={};for(y=1;y<h.length;y++){a=h[y];i=a.indexOf(":");s=a.slice(0,i).trim();d=a.slice(i+1).trim();T.headers[s]=d;if(s.toLowerCase()==="content-type"){t=u(d,"charset");if(t&&t.toLowerCase()!=="utf-8"){throw new Error('Unsupported "Content-Type" charset: '+t)}}}T.responseText=w[2].slice(0,-2);if(r){E=f(m);o[E]=T}else{o.push(T)}});return o}function h(e){var n,r=[];for(n in e){r=r.concat(n,":",e[n],"\r\n")}return r}function l(r,o){var a=(o!==undefined?"changeset_":"batch_")+e.sap.uid(),s=o!==undefined,u=[];if(s){u=u.concat("Content-Type: multipart/mixed;boundary=",a,"\r\n\r\n")}r.forEach(function(e,r){var c="",f=e.url;if(s){c="Content-ID:"+r+"."+o+"\r\n"}u=u.concat("--",a,"\r\n");if(Array.isArray(e)){if(s){throw new Error("Change set must not contain a nested change set.")}u=u.concat(l(e,r).body)}else{if(s&&!t[e.method]){throw new Error("Invalid HTTP request method: "+e.method+". Change set must contain only POST, PUT, PATCH or DELETE requests.")}f=f.replace(i,"$&."+o);u=u.concat("Content-Type:application/http\r\n","Content-Transfer-Encoding:binary\r\n",c,"\r\n",e.method," ",f," HTTP/1.1\r\n",h(n.resolveIfMatchHeader(e.headers)),"\r\n",JSON.stringify(e.body)||"","\r\n")}});u=u.concat("--",a,"--\r\n");return{body:u,batchBoundary:a}}o={deserializeBatchResponse:function(e,n){return p(e,n,false)},serializeBatchRequest:function(e){var n=l(e);return{body:n.body.join(""),headers:{"Content-Type":"multipart/mixed; boundary="+n.batchBoundary,"MIME-Version":"1.0"}}}};return o},false);