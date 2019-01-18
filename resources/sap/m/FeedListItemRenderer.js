/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ListItemBaseRenderer","sap/ui/core/Renderer","sap/ui/Device"],function(e,t,i){"use strict";var s=t.extend(e);s.renderLIAttributes=function(e,t){e.addClass("sapMFeedListItemTitleDiv");e.addClass("sapMFeedListShowSeparatorsAll")};s.renderLIContent=function(e,t){var s=t.getId(),a=i.system.phone;e.write("<div");e.addClass("sapMFeedListItem");e.writeClasses();e.write(">");if(t.getShowIcon()){this._writeImageControl(e,t,s)}if(t.getActions().length>0){e.write("<div");e.writeAttributeEscaped("id",s+"-action-button");e.addClass("sapMFeedListItemActionButton");e.writeClasses();e.write(">");e.renderControl(t.getAggregation("_actionButton"));e.write("</div>")}if(a){e.write('<div class= "sapMFeedListItemHeader sapUiSelectable ');if(t.getShowIcon()){e.write("sapMFeedListItemHasFigure ")}if(t.getSender()&&t.getTimestamp()){e.write("sapMFeedListItemFullHeight")}e.write('" >');if(t.getSender()){e.write('<p id="'+s+'-name" class="sapMFeedListItemTextName sapUiSelectable">');e.renderControl(t._getLinkSender(false));e.write("</p>")}if(t.getTimestamp()){e.write('<p id="'+s+'-timestamp" class="sapMFeedListItemTimestamp sapUiSelectable">');e.writeEscaped(t.getTimestamp());e.write("</p>")}e.write("</div>");e.write('<div class="sapMFeedListItemText sapUiSelectable">');this._writeText(e,t,s,a);if(t._checkTextIsExpandable()){this._writeCollapsedText(e,t,s)}else{e.write(t._sFullText);e.write("</span>")}e.write("</div>");if(t.getInfo()){e.write('<p class="sapMFeedListItemFooter sapUiSelectable">');if(t.getInfo()){e.write('<span id="'+s+'-info" class="sapMFeedListItemInfo sapUiSelectable">');e.writeEscaped(t.getInfo());e.write("</span>")}e.write("</p>")}}else{e.write('<div class= "sapMFeedListItemText ');if(t.getShowIcon()){e.write("sapMFeedListItemHasFigure")}e.write('" >');e.write('<div id="'+s+'-text" class="sapMFeedListItemTextText sapUiSelectable">');if(t.getSender()){e.write('<span id="'+s+'-name" class="sapMFeedListItemTextName sapUiSelectable">');e.renderControl(t._getLinkSender(true));e.write("</span>")}this._writeText(e,t,s,a);if(t._checkTextIsExpandable()){this._writeCollapsedText(e,t,s)}else{e.write(t._sFullText);e.write("</span>")}e.write("</div>");if(t.getInfo()||t.getTimestamp()){e.write('<p class="sapMFeedListItemFooter sapUiSelectable">');if(!sap.ui.getCore().getConfiguration().getRTL()){if(t.getInfo()){this._writeInfo(e,t,s);if(t.getTimestamp()){e.write("<span>&#160&#160&#x00B7&#160&#160</span>")}}if(t.getTimestamp()){this._writeTimestamp(e,t,s)}}else{if(t.getTimestamp()){this._writeTimestamp(e,t,s)}if(t.getInfo()){if(t.getTimestamp()){e.write("<span>&#160&#160&#x00B7&#160&#160</span>")}this._writeInfo(e,t,s)}}e.write("</p>")}e.write("</div>")}e.write("</div>")};s._writeImageControl=function(e,t,i){e.write('<figure id="'+i+'-figure"');e.addClass("sapMFeedListItemFigure");if(!t.getIcon()){e.addClass("sapMFeedListItemIsDefaultIcon")}e.writeClasses();e.write(">");e.renderControl(t._getImageControl());e.write("</figure>")};s._writeCollapsedText=function(e,t,i){if(t._bTextExpanded){e.write(t._sFullText);e.write("</span>");e.write('<span id="'+i+'-threeDots" class ="sapMFeedListItemTextString">');e.write("&#32");e.write("</span>")}else{e.write(t._sShortText);e.write("</span>");e.write('<span id="'+i+'-threeDots" class ="sapMFeedListItemTextString">');e.write("&#32&#46&#46&#46&#32");e.write("</span>")}var s=t._getLinkExpandCollapse();s.addStyleClass("sapMFeedListItemLinkExpandCollapse");e.renderControl(s)};s._writeTimestamp=function(e,t,i){e.write('<span id="'+i+'-timestamp"');e.addClass("sapMFeedListItemTimestampText");e.addClass("sapUiSelectable");if(t.getUnread()){e.addClass("sapMFeedListItem-Unread")}e.writeClasses();e.write(">");e.writeEscaped(t.getTimestamp());e.write("</span>")};s._writeInfo=function(e,t,i){e.write('<span id="'+i+'-info"');e.addClass("sapMFeedListItemInfoText");e.addClass("sapUiSelectable");if(t.getUnread()){e.addClass("sapMFeedListItem-Unread")}e.writeClasses();e.write(">");e.writeEscaped(t.getInfo());e.write("</span>")};s._writeText=function(e,t,i,s){e.write('<span id="'+i+'-realtext"');s?e.addClass("sapMFeedListItemText"):e.addClass("sapMFeedListItemTextString");e.addClass("sapMFeedListItemText");e.addClass("sapUiSelectable");if(t.getUnread()){e.addClass("sapMFeedListItem-Unread")}e.writeClasses();e.write(">")};return s},true);