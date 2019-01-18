/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/core/date/UniversalDate","sap/ui/thirdparty/jquery"],function(t,e,a){"use strict";var n=t.extend("sap.ui.unified.calendar.CalendarDate",{constructor:function(){var t=arguments,e,a,o;switch(t.length){case 0:a=new Date;return this.constructor(a.getFullYear(),a.getMonth(),a.getDate());case 1:case 2:if(!(t[0]instanceof n)){throw"Invalid arguments: the first argument must be of type sap.ui.unified.calendar.CalendarDate."}o=t[1]?t[1]:t[0]._oUDate.sCalendarType;e=new Date(t[0].valueOf());e.setFullYear(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate());e.setHours(e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds(),e.getUTCMilliseconds());this._oUDate=r(e,o);break;case 3:case 4:u(t[0],"Invalid year: "+t[0]);u(t[1],"Invalid month: "+t[1]);u(t[2],"Invalid date: "+t[2]);e=new Date(0,0,1);e.setFullYear(t[0],t[1],t[2]);if(t[3]){o=t[3]}this._oUDate=r(e,o);break;default:throw"Invalid arguments. Accepted arguments are: 1) oCalendarDate, (optional)calendarType"+"or 2) year, month, date, (optional) calendarType"+t}}});n.prototype.getYear=function(){return this._oUDate.getUTCFullYear()};n.prototype.setYear=function(t){u(t,"Invalid year: "+t);this._oUDate.setUTCFullYear(t);return this};n.prototype.getMonth=function(){return this._oUDate.getUTCMonth()};n.prototype.setMonth=function(t){u(t,"Invalid month: "+t);this._oUDate.setUTCMonth(t);return this};n.prototype.getDate=function(){return this._oUDate.getUTCDate()};n.prototype.setDate=function(t){u(t,"Invalid date: "+t);this._oUDate.setUTCDate(t);return this};n.prototype.getDay=function(){return this._oUDate.getUTCDay()};n.prototype.getCalendarType=function(){return this._oUDate.sCalendarType};n.prototype.isBefore=function(t){i(t);return this.valueOf()<t.valueOf()};n.prototype.isAfter=function(t){i(t);return this.valueOf()>t.valueOf()};n.prototype.isSameOrBefore=function(t){i(t);return this.valueOf()<=t.valueOf()};n.prototype.isSameOrAfter=function(t){i(t);return this.valueOf()>=t.valueOf()};n.prototype.isSame=function(t){i(t);return this.valueOf()===t.valueOf()};n.prototype.toLocalJSDate=function(){var t=new Date(this._oUDate.getTime());t.setFullYear(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate());t.setHours(0,0,0,0);return t};n.prototype.toUTCJSDate=function(){var t=new Date(this._oUDate.getTime());t.setUTCHours(0,0,0,0);return t};n.prototype.toString=function(){return this._oUDate.sCalendarType+": "+this.getYear()+"/"+(this.getMonth()+1)+"/"+this.getDate()};n.prototype.valueOf=function(){return this._oUDate.getTime()};n.fromLocalJSDate=function(t,e){if(a.type(t)!=="date"){throw new Error("Date parameter must be a JavaScript Date object: ["+t+"].")}return new n(t.getFullYear(),t.getMonth(),t.getDate(),e)};function r(t,a){if(a){return e.getInstance(o(t),a)}else{return new e(o(t).getTime())}}function o(t){var e=new Date(Date.UTC(0,0,1));e.setUTCFullYear(t.getFullYear(),t.getMonth(),t.getDate());return e}function i(t){if(!(t instanceof n)){throw"Invalid calendar date: ["+t+"]. Expected: sap.ui.unified.calendar.CalendarDate"}}function u(t,e){if(t==undefined||t===Infinity||isNaN(t)){throw e}}return n});