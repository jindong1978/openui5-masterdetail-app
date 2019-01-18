/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/test/Opa5","sap/ui/test/OpaPlugin","sap/ui/test/actions/Press","sap/ui/test/_LogCollector","sap/ui/thirdparty/jquery","sap/ui/base/ManagedObjectMetadata"],function(t,e,r,n,a,i,o){"use strict";var s=new r;var u=t.extend("sap.ui.test._ControlFinder",{});var c=a.getInstance("^((?!autowaiter).)*$");var d=[];u._findControls=function(t){if(t.ancestor){var e={};if(i.isArray(t.ancestor)){e={id:t.ancestor[0]}}else{e=t.ancestor}var n=u._findControls(e)[0];if(!n){return[]}var a=i.extend({},t,{matchers:{ancestor:n}});delete a.ancestor;return u._findControls(a)}else{var o=s._getFilteredControlsByDeclaration(t);var c;if(o===r.FILTER_FOUND_NO_CONTROLS){c=[]}else{c=i.isArray(o)?o:[o]}return c}};u._findElements=function(t){c.start();var e=u._findControls(t);var r=function(t){return(new n).$(t)[0]||t.getDomRef()};var a=e.map(function(e){switch(t.interaction){case"root":return e.getDomRef();case"focus":return e.getFocusDomRef();case"press":var a=(new n)._getAdapter(e.getMetadata());return e.$(a)[0];case"auto":return r(e);default:a=t.interaction&&t.interaction.idSuffix;return a?e.$(a)[0]:r(e)}});d.push(c.getAndClearLog());c.stop();return a};u._getControlForElement=function(t){var e=Object.prototype.toString.call(t)==="[object String]"?"#"+t:t;var r=u._getIdentifiedDOMElement(e).control();return r&&r[0]};u._getControlProperty=function(t,e){var r=i.extend({},t.mProperties,{id:t.getId()});return Object.keys(r).indexOf(e)>-1?r[e]:null};u._getDomElementIDSuffix=function(t,e){var r=t.id;var n="-";if(!o.isGeneratedId(r)){var a=e.getId().length;return r.charAt(a)===n&&r.substring(a+1)}};u._getIdentifiedDOMElement=function(t){return i(t).closest("[data-sap-ui]")};u._getLatestLog=function(){return d&&d.pop()};return u});