/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","./TargetHandler","./Router","sap/base/Log"],function(t,e,a,n){"use strict";var r=t.extend("sap.m.routing.RouteMatchedHandler",{constructor:function(t,r){if(t instanceof a){n.warning("A sap.m.routing.Router is used together with an sap.m.routing.RouteMatchedHandler (deprecated)."+"The RoutematchedHandler is not taking over triggering the navigations, the Router will do it.",this);return}this._oTargetHandler=new e(r);t._oTargetHandler=this._oTargetHandler;t.attachRouteMatched(this._onHandleRouteMatched,this);t.attachRoutePatternMatched(this._handleRoutePatternMatched,this);this._oTargets=t.getTargets();if(this._oTargets){this._oTargets.attachDisplay(this._onHandleDisplay,this)}this._oRouter=t}});r.prototype.destroy=function(){if(this._oRouter){this._oRouter.detachRouteMatched(this._onHandleRouteMatched,this);this._oRouter.detachRoutePatternMatched(this._handleRoutePatternMatched,this);this._oRouter=null}if(this._oTargets){this._oTargets.detachDisplay(this._onHandleRouteMatched,this);this._oTargets=null}return this};r.prototype.setCloseDialogs=function(t){this._oTargetHandler.setCloseDialogs(t);return this};r.prototype.getCloseDialogs=function(){return this._oTargetHandler.getCloseDialogs()};r.prototype._handleRoutePatternMatched=function(t){var e=+t.getParameter("config").viewLevel;this._oTargetHandler.navigate({viewLevel:e,navigationIdentifier:t.getParameter("name"),askHistory:true})};r.prototype._onHandleRouteMatched=function(t){var e=t.getParameters(),a=e.config;if(!this._oRouter.getRoute(e.name)._oTarget){return}this._oTargetHandler.addNavigation({targetControl:e.targetControl,eventData:e.arguments,view:e.view,navigationIdentifier:e.name,transition:a.transition,transitionParameters:a.transitionParameters,preservePageInSplitContainer:a.preservePageInSplitContainer})};r.prototype._onHandleDisplay=function(t){var e=t.getParameters(),a=e.config;this._oTargetHandler.addNavigation({targetControl:e.control,eventData:e.data,view:e.view,navigationIdentifier:e.name,transition:a.transition,transitionParameters:a.transitionParameters,preservePageInSplitContainer:a.preservePageInSplitContainer})};return r});