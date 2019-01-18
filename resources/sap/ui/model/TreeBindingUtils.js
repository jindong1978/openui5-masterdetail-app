/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(function(){"use strict";var i=function(){};i.mergeSections=function(i,e){var t=[];for(var r=0;r<i.length;r++){var s=i[r];var n=s.startIndex+s.length;var a=e.startIndex+e.length;if(e.startIndex<=n&&a>=n&&e.startIndex>=s.startIndex){e.startIndex=s.startIndex;e.length=a-s.startIndex}else if(e.startIndex<=s.startIndex&&a>=s.startIndex&&a<=n){e.length=n-e.startIndex}else if(e.startIndex>=s.startIndex&&a<=n){e.startIndex=s.startIndex;e.length=s.length}else if(a<s.startIndex||e.startIndex>n){t.push(s)}}t.push(e);return t};i._determineRequestDelta=function(i,e){var t=i.iSkip+i.iTop;var r=e.iSkip+e.iTop;if(i.iSkip===e.iSkip&&i.iTop===e.iTop){return false}else if(i.iSkip<e.iSkip&&t>e.iSkip&&t<=r){i.iTop=e.iSkip-i.iSkip;if(i.iThreshold){i.iTop=i.iTop+i.iThreshold;i.iSkip=Math.max(0,i.iSkip-i.iThreshold);i.iThreshold=0}}else if(i.iSkip<r&&t>r&&i.iSkip>=e.iSkip){i.iSkip=r;i.iTop=t-i.iSkip;if(i.iThreshold){i.iTop+=i.iThreshold;i.iThreshold=0}}else if(i.iSkip>=e.iSkip&&t<=r){return false}else if(i.iSkip<=e.iSkip&&t>=r){e.oRequestHandle.abort()}else if(t<=e.iSkip||i.iSkip>=r){}};return i});