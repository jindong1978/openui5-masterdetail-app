/*
 * ! UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/base/DataType","sap/ui/base/ManagedObject","sap/base/util/ObjectPath","sap/base/Log"],function(e,a,r,t,n){"use strict";return{parseScalarType:function(e,t,n,i){var s=r.bindingParser(t,i,true);if(s&&typeof s==="object"){return s}var o=t=s||t;var u=a.getType(e);if(u){if(u instanceof a&&!u.isValid(o)){o=u.parseValue(t)}}else{throw new Error("Property "+n+" has unknown type "+e)}return typeof o==="string"?r.bindingParser.escape(o):o},localName:function(e){return e.localName||e.baseName||e.nodeName},findControlClass:function(a,r){var i;var s=sap.ui.getCore().getLoadedLibraries();e.each(s,function(e,t){if(a===t.namespace||a===t.name){i=t.name+"."+(t.tagNames&&t.tagNames[r]||r)}});i=i||a+"."+r;var o=sap.ui.requireSync(i.replace(/\./g,"/"));o=o||t.get(i);if(o){return o}else{n.error("Can't find object class '"+i+"' for XML-view","","XMLTemplateProcessor.js")}},getChildren:function(e){var a,r=e.childNodes,t=r.length,n=[];for(a=0;a<t;a++){if(r.item(a).nodeType===1){n.push(r.item(a))}}return n}}});