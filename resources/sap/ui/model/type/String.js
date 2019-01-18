/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/model/SimpleType","sap/ui/model/FormatException","sap/ui/model/ParseException","sap/ui/model/ValidateException","sap/ui/thirdparty/jquery"],function(t,e,s,a,i){"use strict";var n=t.extend("sap.ui.model.type.String",{constructor:function(){t.apply(this,arguments);this.sName="String";if(this.oConstraints.search&&typeof this.oConstraints.search=="string"){this.oConstraints.search=new RegExp(this.oConstraints.search)}}});n.prototype.formatValue=function(t,s){if(t==undefined||t==null){return null}switch(this.getPrimitiveType(s)){case"string":case"any":return t;case"int":var a=parseInt(t);if(isNaN(a)){throw new e(t+" is not a valid int value")}return a;case"float":var i=parseFloat(t);if(isNaN(i)){throw new e(t+" is not a valid float value")}return i;case"boolean":if(t.toLowerCase()=="true"||t=="X"){return true}if(t.toLowerCase()=="false"||t==""){return false}throw new e(t+" is not a valid boolean value");default:throw new e("Don't know how to format String to "+s)}};n.prototype.parseValue=function(t,e){switch(this.getPrimitiveType(e)){case"string":return t;case"boolean":case"int":case"float":return t.toString();default:throw new s("Don't know how to parse String from "+e)}};n.prototype.validateValue=function(t){if(this.oConstraints){var e=sap.ui.getCore().getLibraryResourceBundle(),s=[],n=[];i.each(this.oConstraints,function(a,i){switch(a){case"maxLength":if(t.length>i){s.push("maxLength");n.push(e.getText("String.MaxLength",[i]))}break;case"minLength":if(t.length<i){s.push("minLength");n.push(e.getText("String.MinLength",[i]))}break;case"startsWith":if(!(typeof i=="string"&&i.length>0&&t.startsWith(i))){s.push("startsWith");n.push(e.getText("String.StartsWith",[i]))}break;case"startsWithIgnoreCase":if(!(typeof i=="string"&&i!=""?t.toLowerCase().startsWith(i.toLowerCase()):false)){s.push("startsWithIgnoreCase");n.push(e.getText("String.StartsWith",[i]))}break;case"endsWith":if(!(typeof i=="string"&&i.length>0&&t.endsWith(i))){s.push("endsWith");n.push(e.getText("String.EndsWith",[i]))}break;case"endsWithIgnoreCase":if(!(typeof i=="string"&&i!=""?t.toLowerCase().endsWith(i.toLowerCase()):false)){s.push("endsWithIgnoreCase");n.push(e.getText("String.EndsWith",[i]))}break;case"contains":if(t.indexOf(i)==-1){s.push("contains");n.push(e.getText("String.Contains",[i]))}break;case"equals":if(t!=i){s.push("equals");n.push(e.getText("String.Equals",[i]))}break;case"search":if(t.search(i)==-1){s.push("search");n.push(e.getText("String.Search",[i]))}break}});if(s.length>0){throw new a(this.combineMessages(n),s)}}};return n});