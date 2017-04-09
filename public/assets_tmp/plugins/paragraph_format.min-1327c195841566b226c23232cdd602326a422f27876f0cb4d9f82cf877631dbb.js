/*!
 * froala_editor v2.1.0 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2016 Froala Labs
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=function(e,t){return void 0===t&&(t="undefined"!=typeof window?require("jquery"):require("jquery")(e)),a(t),t}:a(jQuery)}(function(a){"use strict";a.extend(a.FroalaEditor.DEFAULTS,{paragraphFormat:{N:"Normal",H1:"Heading 1",H2:"Heading 2",H3:"Heading 3",H4:"Heading 4",PRE:"Code"},paragraphFormatSelection:!1}),a.FroalaEditor.PLUGINS.paragraphFormat=function(e){function t(t,r){var n=e.html.defaultTag();if(r&&r.toLowerCase()!=n)if(t.find("ul, ol").length>0){var i=a("<"+r+">");t.prepend(i);for(var o=e.node.contents(t.get(0))[0];o&&["UL","OL"].indexOf(o.tagName)<0;){var l=o.nextSibling;i.append(o),o=l}}else t.html("<"+r+">"+t.html()+"</"+r+">")}function r(t,r){var n=e.html.defaultTag();r||(r='div class="fr-temp-div" data-empty="true"'),r.toLowerCase()==n?t.replaceWith(t.html()):t.replaceWith(a("<"+r+">").html(t.html()))}function n(t,r){var n=e.html.defaultTag();r||(r='div class="fr-temp-div"'+(e.node.isEmpty(t.get(0),!0)?' data-empty="true"':"")),r.toLowerCase()==n?(e.node.isEmpty(t.get(0),!0)||t.append("<br/>"),t.replaceWith(t.html())):t.replaceWith(a("<"+r+">").html(t.html()))}function i(t,r){r||(r='div class="fr-temp-div"'+(e.node.isEmpty(t.get(0),!0)?' data-empty="true"':"")),t.replaceWith(a("<"+r+" "+e.node.attributes(t.get(0))+">").html(t.html()))}function o(o){"N"==o&&(o=e.html.defaultTag()),e.selection.save(),e.html.wrap(!0,!0,!0),e.selection.restore();var l=e.selection.blocks();e.selection.save(),e.$el.find("pre").attr("skip",!0);for(var p=0;p<l.length;p++)if(l[p].tagName!=o&&!e.node.isList(l[p])){var d=a(l[p]);"LI"==l[p].tagName?t(d,o):"LI"==l[p].parentNode.tagName&&l[p]?r(d,o):["TD","TH"].indexOf(l[p].parentNode.tagName)>=0?n(d,o):i(d,o)}e.$el.find('pre:not([skip="true"]) + pre:not([skip="true"])').each(function(){a(this).prev().append("<br>"+a(this).html()),a(this).remove()}),e.$el.find("pre").removeAttr("skip"),e.html.unwrap(),e.selection.restore()}function l(a,t){var r=e.selection.blocks();if(r.length){var n=r[0],i="N",o=e.html.defaultTag();n.tagName.toLowerCase()!=o&&n!=e.$el.get(0)&&(i=n.tagName),t.find('.fr-command[data-param1="'+i+'"]').addClass("fr-active")}else t.find('.fr-command[data-param1="N"]').addClass("fr-active")}function p(a,t){var r=e.selection.blocks();if(r.length){var n=r[0],i="N",o=e.html.defaultTag();n.tagName.toLowerCase()!=o&&n!=e.$el.get(0)&&(i=n.tagName),["LI","TD","TH"].indexOf(i)>=0&&(i="N"),a.find("> span").text(t.find('.fr-command[data-param1="'+i+'"]').text())}else a.find("> span").text(t.find('.fr-command[data-param1="N"]').text())}return{apply:o,refreshOnShow:l,refresh:p}},a.FroalaEditor.RegisterCommand("paragraphFormat",{type:"dropdown",displaySelection:function(a){return a.opts.paragraphFormatSelection},defaultSelection:"Normal",displaySelectionWidth:100,html:function(){var a='<ul class="fr-dropdown-list">',e=this.opts.paragraphFormat;for(var t in e)a+="<li><"+t+' style="padding: 0 !important; margin: 0 !important;"><a class="fr-command" data-cmd="paragraphFormat" data-param1="'+t+'" title="'+this.language.translate(e[t])+'">'+this.language.translate(e[t])+"</a></"+t+"></li>";return a+="</ul>"},title:"Paragraph Format",callback:function(a,e){this.paragraphFormat.apply(e)},refresh:function(a,e){this.paragraphFormat.refresh(a,e)},refreshOnShow:function(a,e){this.paragraphFormat.refreshOnShow(a,e)},plugin:"paragraphFormat"}),a.FroalaEditor.DefineIcon("paragraphFormat",{NAME:"paragraph"})});