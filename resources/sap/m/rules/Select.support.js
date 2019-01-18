/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/support/library"],function(e){"use strict";var t=e.Categories,i=e.Severity,s=e.Audiences;var o=100;var a={id:"selectItemsSizeLimit",audiences:[s.Control],categories:[t.Usability],enabled:true,minversion:"1.28",title:"Select: Items have size limit of 100",description:"The 'items' model imposes a default size limit of 100",resolution:"Use the sap.ui.model.Model.prototype.setSizeLimit to adjust the size limit of the 'items' model if you expect more than 100 items",resolutionurls:[{text:"API Reference for sap.ui.model.Model",href:"https://sapui5.hana.ondemand.com/#/api/sap.ui.model.Model"}],check:function(e,t,s){s.getElementsByClassName("sap.m.Select").forEach(function(t){var s=t.getBinding("items"),a=s&&s.oModel;if(a&&a.iSizeLimit===o){var l=t.getId(),m=t.getMetadata().getElementName();e.addIssue({severity:i.Low,details:"Select '"+m+"' ("+l+") model has a default limit of 100 items",context:{id:l}})}})}};return[a]},true);