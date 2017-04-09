/*!
 * froala_editor v2.1.0 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms
 * Copyright 2014-2016 Froala Labs
 */
!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof module&&module.exports?module.exports=function(e,n){return void 0===n&&(n="undefined"!=typeof window?require("jquery"):require("jquery")(e)),t(n),n}:t(jQuery)}(function(t){"use strict";t.FroalaEditor.PLUGINS.codeBeautifier=function(){function t(t,n){function i(t){return t.replace(/^\s+/g,"")}function r(t){return t.replace(/\s+$/g,"")}function _(){return this.pos=0,this.token="",this.current_mode="CONTENT",this.tags={parent:"parent1",parentcount:1,parent1:""},this.tag_type="",this.token_text=this.last_token=this.last_text=this.token_type="",this.newlines=0,this.indent_content=o,this.Utils={whitespace:"\n\r	 ".split(""),single_token:"br,input,link,meta,source,!doctype,basefont,base,area,hr,wbr,param,img,isindex,embed".split(","),extra_liners:w,in_array:function(t,e){for(var n=0;n<e.length;n++)if(t==e[n])return!0;return!1}},this.is_whitespace=function(t){for(var e=0;e<t.length;t++)if(!this.Utils.in_array(t.charAt(e),this.Utils.whitespace))return!1;return!0},this.traverse_whitespace=function(){var t="";if(t=this.input.charAt(this.pos),this.Utils.in_array(t,this.Utils.whitespace)){for(this.newlines=0;this.Utils.in_array(t,this.Utils.whitespace);)d&&"\n"==t&&this.newlines<=f&&(this.newlines+=1),this.pos++,t=this.input.charAt(this.pos);return!0}return!1},this.space_or_wrap=function(t){this.line_char_count>=this.wrap_line_length?(this.print_newline(!1,t),this.print_indentation(t)):(this.line_char_count++,t.push(" "))},this.get_content=function(){for(var t="",e=[];"<"!=this.input.charAt(this.pos);){if(this.pos>=this.input.length)return e.length?e.join(""):["","TK_EOF"];if(this.traverse_whitespace())this.space_or_wrap(e);else{if(T){var n=this.input.substr(this.pos,3);if("{{#"==n||"{{/"==n)break;if("{{!"==n)return[this.get_tag(),"TK_TAG_HANDLEBARS_COMMENT"];if("{{"==this.input.substr(this.pos,2)&&"{{else}}"==this.get_tag(!0))break}t=this.input.charAt(this.pos),this.pos++,this.line_char_count++,e.push(t)}}return e.length?e.join(""):""},this.get_contents_to=function(t){if(this.pos==this.input.length)return["","TK_EOF"];var e="",n=new RegExp("</"+t+"\\s*>","igm");n.lastIndex=this.pos;var i=n.exec(this.input),r=i?i.index:this.input.length;return this.pos<r&&(e=this.input.substring(this.pos,r),this.pos=r),e},this.record_tag=function(t){this.tags[t+"count"]?(this.tags[t+"count"]++,this.tags[t+this.tags[t+"count"]]=this.indent_level):(this.tags[t+"count"]=1,this.tags[t+this.tags[t+"count"]]=this.indent_level),this.tags[t+this.tags[t+"count"]+"parent"]=this.tags.parent,this.tags.parent=t+this.tags[t+"count"]},this.retrieve_tag=function(t){if(this.tags[t+"count"]){for(var e=this.tags.parent;e&&t+this.tags[t+"count"]!=e;)e=this.tags[e+"parent"];e&&(this.indent_level=this.tags[t+this.tags[t+"count"]],this.tags.parent=this.tags[e+"parent"]),delete this.tags[t+this.tags[t+"count"]+"parent"],delete this.tags[t+this.tags[t+"count"]],1==this.tags[t+"count"]?delete this.tags[t+"count"]:this.tags[t+"count"]--}},this.indent_to_tag=function(t){if(this.tags[t+"count"]){for(var e=this.tags.parent;e&&t+this.tags[t+"count"]!=e;)e=this.tags[e+"parent"];e&&(this.indent_level=this.tags[t+this.tags[t+"count"]])}},this.get_tag=function(t){var e,n,i,r="",s=[],_="",a=!1,o=!0,l=this.pos,c=this.line_char_count;t=void 0!==t?t:!1;do{if(this.pos>=this.input.length)return t&&(this.pos=l,this.line_char_count=c),s.length?s.join(""):["","TK_EOF"];if(r=this.input.charAt(this.pos),this.pos++,this.Utils.in_array(r,this.Utils.whitespace))a=!0;else{if(("'"==r||'"'==r)&&(r+=this.get_unformatted(r),a=!0),"="==r&&(a=!1),s.length&&"="!=s[s.length-1]&&">"!=r&&a){if(this.space_or_wrap(s),a=!1,!o&&"force"==E&&"/"!=r){this.print_newline(!0,s),this.print_indentation(s);for(var p=0;g>p;p++)s.push(h)}for(var d=0;d<s.length;d++)if(" "==s[d]){o=!1;break}}if(T&&"<"==i&&r+this.input.charAt(this.pos)=="{{"&&(r+=this.get_unformatted("}}"),s.length&&" "!=s[s.length-1]&&"<"!=s[s.length-1]&&(r=" "+r),a=!0),"<"!=r||i||(e=this.pos-1,i="<"),T&&!i&&s.length>=2&&"{"==s[s.length-1]&&"{"==s[s.length-2]&&(e="#"==r||"/"==r||"!"==r?this.pos-3:this.pos-2,i="{"),this.line_char_count++,s.push(r),s[1]&&("!"==s[1]||"?"==s[1]||"%"==s[1])){s=[this.get_comment(e)];break}if(T&&s[1]&&"{"==s[1]&&s[2]&&"!"==s[2]){s=[this.get_comment(e)];break}if(T&&"{"==i&&s.length>2&&"}"==s[s.length-2]&&"}"==s[s.length-1])break}}while(">"!=r);var f,x,w=s.join("");f=-1!=w.indexOf(" ")?w.indexOf(" "):"{"==w[0]?w.indexOf("}"):w.indexOf(">"),x="<"!=w[0]&&T?"#"==w[2]?3:2:1;var v=w.substring(x,f).toLowerCase();return"/"==w.charAt(w.length-2)||this.Utils.in_array(v,this.Utils.single_token)?t||(this.tag_type="SINGLE"):T&&"{"==w[0]&&"else"==v?t||(this.indent_to_tag("if"),this.tag_type="HANDLEBARS_ELSE",this.indent_content=!0,this.traverse_whitespace()):this.is_unformatted(v,u)?(_=this.get_unformatted("</"+v+">",w),s.push(_),n=this.pos-1,this.tag_type="SINGLE"):"script"==v&&(-1==w.search("type")||w.search("type")>-1&&w.search(/\b(text|application)\/(x-)?(javascript|ecmascript|jscript|livescript)/)>-1)?t||(this.record_tag(v),this.tag_type="SCRIPT"):"style"==v&&(-1==w.search("type")||w.search("type")>-1&&w.search("text/css")>-1)?t||(this.record_tag(v),this.tag_type="STYLE"):"!"==v.charAt(0)?t||(this.tag_type="SINGLE",this.traverse_whitespace()):t||("/"==v.charAt(0)?(this.retrieve_tag(v.substring(1)),this.tag_type="END"):(this.record_tag(v),"html"!=v.toLowerCase()&&(this.indent_content=!0),this.tag_type="START"),this.traverse_whitespace()&&this.space_or_wrap(s),this.Utils.in_array(v,this.Utils.extra_liners)&&(this.print_newline(!1,this.output),this.output.length&&"\n"!=this.output[this.output.length-2]&&this.print_newline(!0,this.output))),t&&(this.pos=l,this.line_char_count=c),s.join("")},this.get_comment=function(t){var e="",n=">",i=!1;this.pos=t;var r=this.input.charAt(this.pos);for(this.pos++;this.pos<=this.input.length&&(e+=r,e[e.length-1]!=n[n.length-1]||-1==e.indexOf(n));)!i&&e.length<10&&(0===e.indexOf("<![if")?(n="<![endif]>",i=!0):0===e.indexOf("<![cdata[")?(n="]]>",i=!0):0===e.indexOf("<![")?(n="]>",i=!0):0===e.indexOf("<!--")?(n="-->",i=!0):0===e.indexOf("{{!")?(n="}}",i=!0):0===e.indexOf("<?")?(n="?>",i=!0):0===e.indexOf("<%")&&(n="%>",i=!0)),r=this.input.charAt(this.pos),this.pos++;return e},this.get_unformatted=function(t,e){if(e&&-1!=e.toLowerCase().indexOf(t))return"";var n="",i="",r=0,s=!0;do{if(this.pos>=this.input.length)return i;if(n=this.input.charAt(this.pos),this.pos++,this.Utils.in_array(n,this.Utils.whitespace)){if(!s){this.line_char_count--;continue}if("\n"==n||"\r"==n){i+="\n",this.line_char_count=0;continue}}i+=n,this.line_char_count++,s=!0,T&&"{"==n&&i.length&&"{"==i[i.length-2]&&(i+=this.get_unformatted("}}"),r=i.length)}while(-1==i.toLowerCase().indexOf(t,r));return i},this.get_token=function(){var t;if("TK_TAG_SCRIPT"==this.last_token||"TK_TAG_STYLE"==this.last_token){var e=this.last_token.substr(7);return t=this.get_contents_to(e),"string"!=typeof t?t:[t,"TK_"+e]}if("CONTENT"==this.current_mode)return t=this.get_content(),"string"!=typeof t?t:[t,"TK_CONTENT"];if("TAG"==this.current_mode){if(t=this.get_tag(),"string"!=typeof t)return t;var n="TK_TAG_"+this.tag_type;return[t,n]}},this.get_full_indent=function(t){return t=this.indent_level+t||0,1>t?"":new Array(t+1).join(this.indent_string)},this.is_unformatted=function(t,e){if(!this.Utils.in_array(t,e))return!1;if("a"!=t.toLowerCase()||!this.Utils.in_array("a",e))return!0;var n=this.get_tag(!0),i=(n||"").match(/^\s*<\s*\/?([a-z]*)\s*[^>]*>\s*$/);return!i||this.Utils.in_array(i,e)?!0:!1},this.printer=function(t,e,n,s,_){this.input=t||"",this.output=[],this.indent_character=e,this.indent_string="",this.indent_size=n,this.brace_style=_,this.indent_level=0,this.wrap_line_length=s,this.line_char_count=0;for(var a=0;a<this.indent_size;a++)this.indent_string+=this.indent_character;this.print_newline=function(t,e){this.line_char_count=0,e&&e.length&&(t||"\n"!=e[e.length-1])&&("\n"!=e[e.length-1]&&(e[e.length-1]=r(e[e.length-1])),e.push("\n"))},this.print_indentation=function(t){for(var e=0;e<this.indent_level;e++)t.push(this.indent_string),this.line_char_count+=this.indent_string.length},this.print_token=function(t){(!this.is_whitespace(t)||this.output.length)&&((t||""!==t)&&this.output.length&&"\n"==this.output[this.output.length-1]&&(this.print_indentation(this.output),t=i(t)),this.print_token_raw(t))},this.print_token_raw=function(t){this.newlines>0&&(t=r(t)),t&&""!==t&&(t.length>1&&"\n"==t[t.length-1]?(this.output.push(t.slice(0,-1)),this.print_newline(!1,this.output)):this.output.push(t));for(var e=0;e<this.newlines;e++)this.print_newline(e>0,this.output);this.newlines=0},this.indent=function(){this.indent_level++},this.unindent=function(){this.indent_level>0&&this.indent_level--}},this}var a,o,l,h,c,p,u,d,f,T,E,g,x,w;for(n=n||{},void 0!==n.wrap_line_length&&0!==parseInt(n.wrap_line_length,10)||void 0===n.max_char||0===parseInt(n.max_char,10)||(n.wrap_line_length=n.max_char),o=void 0===n.indent_inner_html?!1:n.indent_inner_html,l=void 0===n.indent_size?4:parseInt(n.indent_size,10),h=void 0===n.indent_char?" ":n.indent_char,p=void 0===n.brace_style?"collapse":n.brace_style,c=0===parseInt(n.wrap_line_length,10)?32786:parseInt(n.wrap_line_length||250,10),u=n.unformatted||["a","span","img","bdo","em","strong","dfn","code","samp","kbd","var","cite","abbr","acronym","q","sub","sup","tt","i","b","big","small","u","s","strike","font","ins","del","address","pre"],d=void 0===n.preserve_newlines?!0:n.preserve_newlines,f=d?isNaN(parseInt(n.max_preserve_newlines,10))?32786:parseInt(n.max_preserve_newlines,10):0,T=void 0===n.indent_handlebars?!1:n.indent_handlebars,E=void 0===n.wrap_attributes?"auto":n.wrap_attributes,g=void 0===n.wrap_attributes_indent_size?l:parseInt(n.wrap_attributes_indent_size,10)||l,x=void 0===n.end_with_newline?!1:n.end_with_newline,w=Array.isArray(n.extra_liners)?n.extra_liners.concat():"string"==typeof n.extra_liners?n.extra_liners.split(","):"head,body,/html".split(","),n.indent_with_tabs&&(h="	",l=1),a=new _,a.printer(t,h,l,c,p);;){var v=a.get_token();if(a.token_text=v[0],a.token_type=v[1],"TK_EOF"==a.token_type)break;switch(a.token_type){case"TK_TAG_START":a.print_newline(!1,a.output),a.print_token(a.token_text),a.indent_content&&(a.indent(),a.indent_content=!1),a.current_mode="CONTENT";break;case"TK_TAG_STYLE":case"TK_TAG_SCRIPT":a.print_newline(!1,a.output),a.print_token(a.token_text),a.current_mode="CONTENT";break;case"TK_TAG_END":if("TK_CONTENT"==a.last_token&&""===a.last_text){var K=a.token_text.match(/\w+/)[0],R=null;a.output.length&&(R=a.output[a.output.length-1].match(/(?:<|{{#)\s*(\w+)/)),(null==R||R[1]!=K&&!a.Utils.in_array(R[1],u))&&a.print_newline(!1,a.output)}a.print_token(a.token_text),a.current_mode="CONTENT";break;case"TK_TAG_SINGLE":var m=a.token_text.match(/^\s*<([a-z-]+)/i);m&&a.Utils.in_array(m[1],u)||a.print_newline(!1,a.output),a.print_token(a.token_text),a.current_mode="CONTENT";break;case"TK_TAG_HANDLEBARS_ELSE":a.print_token(a.token_text),a.indent_content&&(a.indent(),a.indent_content=!1),a.current_mode="CONTENT";break;case"TK_TAG_HANDLEBARS_COMMENT":a.print_token(a.token_text),a.current_mode="TAG";break;case"TK_CONTENT":a.print_token(a.token_text),a.current_mode="TAG";break;case"TK_STYLE":case"TK_SCRIPT":if(""!==a.token_text){a.print_newline(!1,a.output);var b,S=a.token_text,A=1;"TK_SCRIPT"==a.token_type?b="function"==typeof s&&s:"TK_STYLE"==a.token_type&&(b="function"==typeof e&&e),"keep"==n.indent_scripts?A=0:"separate"==n.indent_scripts&&(A=-a.indent_level);var y=a.get_full_indent(A);if(b)S=b(S.replace(/^\s*/,y),n);else{var k=S.match(/^\s*/)[0],O=k.match(/[^\n\r]*$/)[0].split(a.indent_string).length-1,N=a.get_full_indent(A-O);S=S.replace(/^\s*/,y).replace(/\r\n|\r|\n/g,"\n"+N).replace(/\s+$/,"")}S&&(a.print_token_raw(S),a.print_newline(!0,a.output))}a.current_mode="TAG";break;default:""!==a.token_text&&a.print_token(a.token_text)}a.last_token=a.token_type,a.last_text=a.token_text}var D=a.output.join("").replace(/[\r\n\t ]+$/,"");return x&&(D+="\n"),D}function e(t,n){function i(){return w=t.charAt(++K),w||""}function r(e){var n="",r=K;return e&&a(),n=t.charAt(K+1)||"",K=r-1,i(),n}function s(e){for(var n=K;i();)if("\\"===w)i();else{if(-1!==e.indexOf(w))break;if("\n"===w)break}return t.substring(n,K+1)}function _(t){var e=K,n=s(t);return K=e-1,i(),n}function a(){for(var t="";v.test(r());)i(),t+=w;return t}function o(){var t="";for(w&&v.test(w)&&(t=w);v.test(i());)t+=w;return t}function l(e){var n=K;for(e="/"===r(),i();i();){if(!e&&"*"===w&&"/"===r()){i();break}if(e&&"\n"===w)return t.substring(n,K)}return t.substring(n,K)+w}function h(e){return t.substring(K-e.length,K).toLowerCase()===e}function c(){for(var e=0,n=K+1;n<t.length;n++){var i=t.charAt(n);if("{"===i)return!0;if("("===i)e+=1;else if(")"===i){if(0==e)return!1;e-=1}else if(";"===i||"}"===i)return!1}return!1}function p(){S++,m+=b}function u(){S--,m=m.slice(0,-d)}n=n||{},t=t||"",t=t.replace(/\r\n|[\r\u2028\u2029]/g,"\n");var d=n.indent_size||4,f=n.indent_char||" ",T=void 0===n.selector_separator_newline?!0:n.selector_separator_newline,E=void 0===n.end_with_newline?!1:n.end_with_newline,g=void 0===n.newline_between_rules?!0:n.newline_between_rules,x=n.eol?n.eol:"\n";"string"==typeof d&&(d=parseInt(d,10)),n.indent_with_tabs&&(f="	",d=1),x=x.replace(/\\r/,"\r").replace(/\\n/,"\n");var w,v=/^\s+$/,K=-1,R=0,m=t.match(/^[\t ]*/)[0],b=new Array(d+1).join(f),S=0,A=0,y={};y["{"]=function(t){y.singleSpace(),k.push(t),y.newLine()},y["}"]=function(t){y.newLine(),k.push(t),y.newLine()},y._lastCharWhitespace=function(){return v.test(k[k.length-1])},y.newLine=function(t){k.length&&(t||"\n"===k[k.length-1]||y.trim(),k.push("\n"),m&&k.push(m))},y.singleSpace=function(){k.length&&!y._lastCharWhitespace()&&k.push(" ")},y.preserveSingleSpace=function(){V&&y.singleSpace()},y.trim=function(){for(;y._lastCharWhitespace();)k.pop()};for(var k=[],O=!1,N=!1,D=!1,L="",C="";;){var I=o(),V=""!==I,P=-1!==I.indexOf("\n");if(C=L,L=w,!w)break;if("/"===w&&"*"===r()){var j=0===S;(P||j)&&y.newLine(),k.push(l()),y.newLine(),j&&y.newLine(!0)}else if("/"===w&&"/"===r())P||"{"===C||y.trim(),y.singleSpace(),k.push(l()),y.newLine();else if("@"===w){y.preserveSingleSpace(),k.push(w);var M=_(": ,;{}()[]/='\"");M.match(/[ :]$/)&&(i(),M=s(": ").replace(/\s$/,""),k.push(M),y.singleSpace()),M=M.replace(/\s$/,""),M in e.NESTED_AT_RULE&&(A+=1,M in e.CONDITIONAL_GROUP_RULE&&(D=!0))}else"#"===w&&"{"===r()?(y.preserveSingleSpace(),k.push(s("}"))):"{"===w?"}"===r(!0)?(a(),i(),y.singleSpace(),k.push("{}"),y.newLine(),g&&0===S&&y.newLine(!0)):(p(),y["{"](w),D?(D=!1,O=S>A):O=S>=A):"}"===w?(u(),y["}"](w),O=!1,N=!1,A&&A--,g&&0===S&&y.newLine(!0)):":"===w?(a(),!O&&!D||h("&")||c()?":"===r()?(i(),k.push("::")):k.push(":"):(N=!0,k.push(":"),y.singleSpace())):'"'===w||"'"===w?(y.preserveSingleSpace(),k.push(s(w))):";"===w?(N=!1,k.push(w),y.newLine()):"("===w?h("url")?(k.push(w),a(),i()&&(")"!==w&&'"'!==w&&"'"!==w?k.push(s(")")):K--)):(R++,y.preserveSingleSpace(),k.push(w),a()):")"===w?(k.push(w),R--):","===w?(k.push(w),a(),T&&!N&&1>R?y.newLine():y.singleSpace()):"]"===w?k.push(w):"["===w?(y.preserveSingleSpace(),k.push(w)):"="===w?(a(),w="=",k.push(w)):(y.preserveSingleSpace(),k.push(w))}var B="";return m&&(B+=m),B+=k.join("").replace(/[\r\n\t ]+$/,""),E&&(B+="\n"),"\n"!=x&&(B=B.replace(/[\n]/g,x)),B}function n(t,e){for(var n=0;n<e.length;n+=1)if(e[n]===t)return!0;return!1}function i(t){return t.replace(/^\s+|\s+$/g,"")}function r(t){return t.replace(/^\s+/g,"")}function s(t,e){var n=new _(t,e);return n.beautify()}function _(t,e){function s(t,e){var n=0;t&&(n=t.indentation_level,!W.just_added_newline()&&t.line_indent_level>n&&(n=t.line_indent_level));var i={mode:e,parent:t,last_text:t?t.last_text:"",last_word:t?t.last_word:"",declaration_statement:!1,declaration_assignment:!1,multiline_frame:!1,if_block:!1,else_block:!1,do_block:!1,do_while:!1,in_case_statement:!1,in_case:!1,case_body:!1,indentation_level:n,line_indent_level:t?t.line_indent_level:n,start_line_index:W.get_line_number(),ternary_depth:0};return i}function _(t){var e=t.newlines,n=tt.keep_array_indentation&&g(q.mode);if(n)for(i=0;e>i;i+=1)p(i>0);else if(tt.max_preserve_newlines&&e>tt.max_preserve_newlines&&(e=tt.max_preserve_newlines),tt.preserve_newlines&&t.newlines>1){p();for(var i=1;e>i;i+=1)p(!0)}X=t,J[X.type]()}function a(t){t=t.replace(/\x0d/g,"");for(var e=[],n=t.indexOf("\n");-1!==n;)e.push(t.substring(0,n)),t=t.substring(n+1),n=t.indexOf("\n");return t.length&&e.push(t),e}function c(t){if(t=void 0===t?!1:t,!W.just_added_newline())if(tt.preserve_newlines&&X.wanted_newline||t)p(!1,!0);else if(tt.wrap_line_length){var e=W.current_line.get_character_count()+X.text.length+(W.space_before_token?1:0);e>=tt.wrap_line_length&&p(!1,!0)}}function p(t,e){if(!e&&";"!==q.last_text&&","!==q.last_text&&"="!==q.last_text&&"TK_OPERATOR"!==F)for(;q.mode===h.Statement&&!q.if_block&&!q.do_block;)w();W.add_new_line(t)&&(q.multiline_frame=!0)}function u(){W.just_added_newline()&&(tt.keep_array_indentation&&g(q.mode)&&X.wanted_newline?(W.current_line.push(X.whitespace_before),W.space_before_token=!1):W.set_indent(q.indentation_level)&&(q.line_indent_level=q.indentation_level))}function d(t){return W.raw?void W.add_raw_token(X):(tt.comma_first&&"TK_COMMA"===F&&W.just_added_newline()&&","===W.previous_line.last()&&(W.previous_line.pop(),u(),W.add_token(","),W.space_before_token=!0),t=t||X.text,u(),void W.add_token(t))}function f(){q.indentation_level+=1}function T(){q.indentation_level>0&&(!q.parent||q.indentation_level>q.parent.indentation_level)&&(q.indentation_level-=1)}function E(t){q?(H.push(q),Y=q):Y=s(null,t),q=s(Y,t)}function g(t){return t===h.ArrayLiteral}function x(t){return n(t,[h.Expression,h.ForInitializer,h.Conditional])}function w(){H.length>0&&(Y=q,q=H.pop(),Y.mode===h.Statement&&W.remove_redundant_indentation(Y))}function v(){return q.parent.mode===h.ObjectLiteral&&q.mode===h.Statement&&(":"===q.last_text&&0===q.ternary_depth||"TK_RESERVED"===F&&n(q.last_text,["get","set"]))}function K(){return"TK_RESERVED"===F&&n(q.last_text,["var","let","const"])&&"TK_WORD"===X.type||"TK_RESERVED"===F&&"do"===q.last_text||"TK_RESERVED"===F&&"return"===q.last_text&&!X.wanted_newline||"TK_RESERVED"===F&&"else"===q.last_text&&("TK_RESERVED"!==X.type||"if"!==X.text)||"TK_END_EXPR"===F&&(Y.mode===h.ForInitializer||Y.mode===h.Conditional)||"TK_WORD"===F&&q.mode===h.BlockStatement&&!q.in_case&&"--"!==X.text&&"++"!==X.text&&"function"!==$&&"TK_WORD"!==X.type&&"TK_RESERVED"!==X.type||q.mode===h.ObjectLiteral&&(":"===q.last_text&&0===q.ternary_depth||"TK_RESERVED"===F&&n(q.last_text,["get","set"]))?(E(h.Statement),f(),"TK_RESERVED"===F&&n(q.last_text,["var","let","const"])&&"TK_WORD"===X.type&&(q.declaration_statement=!0),v()||c("TK_RESERVED"===X.type&&n(X.text,["do","for","if","while"])),!0):!1}function R(t,e){for(var n=0;n<t.length;n++){var r=i(t[n]);if(r.charAt(0)!==e)return!1}return!0}function m(t,e){for(var n,i=0,r=t.length;r>i;i++)if(n=t[i],n&&0!==n.indexOf(e))return!1;return!0}function b(t){return n(t,["case","return","do","if","throw","else"])}function S(t){var e=z+(t||0);return 0>e||e>=et.length?null:et[e]}function A(){K();var t=h.Expression;if("["===X.text){if("TK_WORD"===F||")"===q.last_text)return"TK_RESERVED"===F&&n(q.last_text,G.line_starters)&&(W.space_before_token=!0),E(t),d(),f(),void(tt.space_in_paren&&(W.space_before_token=!0));t=h.ArrayLiteral,g(q.mode)&&("["===q.last_text||","===q.last_text&&("]"===$||"}"===$))&&(tt.keep_array_indentation||p())}else"TK_RESERVED"===F&&"for"===q.last_text?t=h.ForInitializer:"TK_RESERVED"===F&&n(q.last_text,["if","while"])&&(t=h.Conditional);";"===q.last_text||"TK_START_BLOCK"===F?p():"TK_END_EXPR"===F||"TK_START_EXPR"===F||"TK_END_BLOCK"===F||"."===q.last_text?c(X.wanted_newline):"TK_RESERVED"===F&&"("===X.text||"TK_WORD"===F||"TK_OPERATOR"===F?"TK_RESERVED"===F&&("function"===q.last_word||"typeof"===q.last_word)||"*"===q.last_text&&"function"===$?tt.space_after_anon_function&&(W.space_before_token=!0):"TK_RESERVED"!==F||!n(q.last_text,G.line_starters)&&"catch"!==q.last_text||tt.space_before_conditional&&(W.space_before_token=!0):W.space_before_token=!0,"("===X.text&&"TK_RESERVED"===F&&"await"===q.last_word&&(W.space_before_token=!0),"("===X.text&&("TK_EQUALS"===F||"TK_OPERATOR"===F)&&(v()||c()),E(t),d(),tt.space_in_paren&&(W.space_before_token=!0),f()}function y(){for(;q.mode===h.Statement;)w();q.multiline_frame&&c("]"===X.text&&g(q.mode)&&!tt.keep_array_indentation),tt.space_in_paren&&("TK_START_EXPR"!==F||tt.space_in_empty_paren?W.space_before_token=!0:(W.trim(),W.space_before_token=!1)),"]"===X.text&&tt.keep_array_indentation?(d(),w()):(w(),d()),W.remove_redundant_indentation(Y),q.do_while&&Y.mode===h.Conditional&&(Y.mode=h.Expression,q.do_block=!1,q.do_while=!1)}function k(){var t=S(1),e=S(2);E(e&&(":"===e.text&&n(t.type,["TK_STRING","TK_WORD","TK_RESERVED"])||n(t.text,["get","set"])&&n(e.type,["TK_WORD","TK_RESERVED"]))?n($,["class","interface"])?h.BlockStatement:h.ObjectLiteral:h.BlockStatement);var i=!t.comments_before.length&&"}"===t.text,r=i&&"function"===q.last_word&&"TK_END_EXPR"===F;"expand"===tt.brace_style||"none"===tt.brace_style&&X.wanted_newline?"TK_OPERATOR"!==F&&(r||"TK_EQUALS"===F||"TK_RESERVED"===F&&b(q.last_text)&&"else"!==q.last_text)?W.space_before_token=!0:p(!1,!0):"TK_OPERATOR"!==F&&"TK_START_EXPR"!==F?"TK_START_BLOCK"===F?p():W.space_before_token=!0:g(Y.mode)&&","===q.last_text&&("}"===$?W.space_before_token=!0:p()),d(),f()}function O(){for(;q.mode===h.Statement;)w();var t="TK_START_BLOCK"===F;"expand"===tt.brace_style?t||p():t||(g(q.mode)&&tt.keep_array_indentation?(tt.keep_array_indentation=!1,p(),tt.keep_array_indentation=!0):p()),w(),d()}function N(){if("TK_RESERVED"===X.type&&q.mode!==h.ObjectLiteral&&n(X.text,["set","get"])&&(X.type="TK_WORD"),"TK_RESERVED"===X.type&&q.mode===h.ObjectLiteral){var t=S(1);":"==t.text&&(X.type="TK_WORD")}if(K()||!X.wanted_newline||x(q.mode)||"TK_OPERATOR"===F&&"--"!==q.last_text&&"++"!==q.last_text||"TK_EQUALS"===F||!tt.preserve_newlines&&"TK_RESERVED"===F&&n(q.last_text,["var","let","const","set","get"])||p(),q.do_block&&!q.do_while){if("TK_RESERVED"===X.type&&"while"===X.text)return W.space_before_token=!0,d(),W.space_before_token=!0,void(q.do_while=!0);p(),q.do_block=!1}if(q.if_block)if(q.else_block||"TK_RESERVED"!==X.type||"else"!==X.text){for(;q.mode===h.Statement;)w();q.if_block=!1,q.else_block=!1}else q.else_block=!0;if("TK_RESERVED"===X.type&&("case"===X.text||"default"===X.text&&q.in_case_statement))return p(),(q.case_body||tt.jslint_happy)&&(T(),q.case_body=!1),d(),q.in_case=!0,void(q.in_case_statement=!0);if("TK_RESERVED"===X.type&&"function"===X.text&&((n(q.last_text,["}",";"])||W.just_added_newline()&&!n(q.last_text,["[","{",":","=",","]))&&(W.just_added_blankline()||X.comments_before.length||(p(),p(!0))),"TK_RESERVED"===F||"TK_WORD"===F?"TK_RESERVED"===F&&n(q.last_text,["get","set","new","return","export","async"])?W.space_before_token=!0:"TK_RESERVED"===F&&"default"===q.last_text&&"export"===$?W.space_before_token=!0:p():"TK_OPERATOR"===F||"="===q.last_text?W.space_before_token=!0:(q.multiline_frame||!x(q.mode)&&!g(q.mode))&&p()),("TK_COMMA"===F||"TK_START_EXPR"===F||"TK_EQUALS"===F||"TK_OPERATOR"===F)&&(v()||c()),"TK_RESERVED"===X.type&&n(X.text,["function","get","set"]))return d(),void(q.last_word=X.text);if(Z="NONE","TK_END_BLOCK"===F?"TK_RESERVED"===X.type&&n(X.text,["else","catch","finally"])?"expand"===tt.brace_style||"end-expand"===tt.brace_style||"none"===tt.brace_style&&X.wanted_newline?Z="NEWLINE":(Z="SPACE",W.space_before_token=!0):Z="NEWLINE":"TK_SEMICOLON"===F&&q.mode===h.BlockStatement?Z="NEWLINE":"TK_SEMICOLON"===F&&x(q.mode)?Z="SPACE":"TK_STRING"===F?Z="NEWLINE":"TK_RESERVED"===F||"TK_WORD"===F||"*"===q.last_text&&"function"===$?Z="SPACE":"TK_START_BLOCK"===F?Z="NEWLINE":"TK_END_EXPR"===F&&(W.space_before_token=!0,Z="NEWLINE"),"TK_RESERVED"===X.type&&n(X.text,G.line_starters)&&")"!==q.last_text&&(Z="else"===q.last_text||"export"===q.last_text?"SPACE":"NEWLINE"),"TK_RESERVED"===X.type&&n(X.text,["else","catch","finally"]))if("TK_END_BLOCK"!==F||"expand"===tt.brace_style||"end-expand"===tt.brace_style||"none"===tt.brace_style&&X.wanted_newline)p();else{W.trim(!0);var e=W.current_line;"}"!==e.last()&&p(),W.space_before_token=!0}else"NEWLINE"===Z?"TK_RESERVED"===F&&b(q.last_text)?W.space_before_token=!0:"TK_END_EXPR"!==F?"TK_START_EXPR"===F&&"TK_RESERVED"===X.type&&n(X.text,["var","let","const"])||":"===q.last_text||("TK_RESERVED"===X.type&&"if"===X.text&&"else"===q.last_text?W.space_before_token=!0:p()):"TK_RESERVED"===X.type&&n(X.text,G.line_starters)&&")"!==q.last_text&&p():q.multiline_frame&&g(q.mode)&&","===q.last_text&&"}"===$?p():"SPACE"===Z&&(W.space_before_token=!0);d(),q.last_word=X.text,"TK_RESERVED"===X.type&&"do"===X.text&&(q.do_block=!0),"TK_RESERVED"===X.type&&"if"===X.text&&(q.if_block=!0)}function D(){for(K()&&(W.space_before_token=!1);q.mode===h.Statement&&!q.if_block&&!q.do_block;)w();d()}function L(){K()?W.space_before_token=!0:"TK_RESERVED"===F||"TK_WORD"===F?W.space_before_token=!0:"TK_COMMA"===F||"TK_START_EXPR"===F||"TK_EQUALS"===F||"TK_OPERATOR"===F?v()||c():p(),d()}function C(){K(),q.declaration_statement&&(q.declaration_assignment=!0),W.space_before_token=!0,d(),W.space_before_token=!0}function I(){return q.declaration_statement?(x(q.parent.mode)&&(q.declaration_assignment=!1),d(),void(q.declaration_assignment?(q.declaration_assignment=!1,p(!1,!0)):(W.space_before_token=!0,tt.comma_first&&c()))):(d(),void(q.mode===h.ObjectLiteral||q.mode===h.Statement&&q.parent.mode===h.ObjectLiteral?(q.mode===h.Statement&&w(),p()):(W.space_before_token=!0,tt.comma_first&&c())))}function V(){if(K(),"TK_RESERVED"===F&&b(q.last_text))return W.space_before_token=!0,void d();if("*"===X.text&&"TK_DOT"===F)return void d();if(":"===X.text&&q.in_case)return q.case_body=!0,f(),d(),p(),void(q.in_case=!1);if("::"===X.text)return void d();"TK_OPERATOR"===F&&c();var t=!0,e=!0;n(X.text,["--","++","!","~"])||n(X.text,["-","+"])&&(n(F,["TK_START_BLOCK","TK_START_EXPR","TK_EQUALS","TK_OPERATOR"])||n(q.last_text,G.line_starters)||","===q.last_text)?(t=!1,e=!1,!X.wanted_newline||"--"!==X.text&&"++"!==X.text||p(!1,!0),";"===q.last_text&&x(q.mode)&&(t=!0),"TK_RESERVED"===F?t=!0:"TK_END_EXPR"===F?t=!("]"===q.last_text&&("--"===X.text||"++"===X.text)):"TK_OPERATOR"===F&&(t=n(X.text,["--","-","++","+"])&&n(q.last_text,["--","-","++","+"]),n(X.text,["+","-"])&&n(q.last_text,["--","++"])&&(e=!0)),q.mode!==h.BlockStatement&&q.mode!==h.Statement||"{"!==q.last_text&&";"!==q.last_text||p()):":"===X.text?0===q.ternary_depth?t=!1:q.ternary_depth-=1:"?"===X.text?q.ternary_depth+=1:"*"===X.text&&"TK_RESERVED"===F&&"function"===q.last_text&&(t=!1,e=!1),W.space_before_token=W.space_before_token||t,d(),W.space_before_token=e}function P(){if(W.raw)return W.add_raw_token(X),void(X.directives&&"end"===X.directives.preserve&&(tt.test_output_raw||(W.raw=!1)));if(X.directives)return p(!1,!0),d(),"start"===X.directives.preserve&&(W.raw=!0),void p(!1,!0);if(!acorn.newline.test(X.text)&&!X.wanted_newline)return W.space_before_token=!0,d(),void(W.space_before_token=!0);var t,e=a(X.text),n=!1,i=!1,s=X.whitespace_before,_=s.length;for(p(!1,!0),e.length>1&&(R(e.slice(1),"*")?n=!0:m(e.slice(1),s)&&(i=!0)),d(e[0]),t=1;t<e.length;t++)p(!1,!0),n?d(" "+r(e[t])):i&&e[t].length>_?d(e[t].substring(_)):W.add_token(e[t]);p(!1,!0)}function j(){X.wanted_newline?p(!1,!0):W.trim(!0),W.space_before_token=!0,d(),p(!1,!0)}function M(){K(),"TK_RESERVED"===F&&b(q.last_text)?W.space_before_token=!0:c(")"===q.last_text&&tt.break_chained_methods),d()}function B(){d(),"\n"===X.text[X.text.length-1]&&p()}function U(){for(;q.mode===h.Statement;)w()}var W,z,G,X,F,$,Q,q,Y,H,Z,J,tt,et=[],nt="";for(J={TK_START_EXPR:A,TK_END_EXPR:y,TK_START_BLOCK:k,TK_END_BLOCK:O,TK_WORD:N,TK_RESERVED:N,TK_SEMICOLON:D,TK_STRING:L,TK_EQUALS:C,TK_OPERATOR:V,TK_COMMA:I,TK_BLOCK_COMMENT:P,TK_COMMENT:j,TK_DOT:M,TK_UNKNOWN:B,TK_EOF:U},e=e?e:{},tt={},void 0!==e.braces_on_own_line&&(tt.brace_style=e.braces_on_own_line?"expand":"collapse"),tt.brace_style=e.brace_style?e.brace_style:tt.brace_style?tt.brace_style:"collapse","expand-strict"===tt.brace_style&&(tt.brace_style="expand"),tt.indent_size=e.indent_size?parseInt(e.indent_size,10):4,tt.indent_char=e.indent_char?e.indent_char:" ",tt.eol=e.eol?e.eol:"\n",tt.preserve_newlines=void 0===e.preserve_newlines?!0:e.preserve_newlines,tt.break_chained_methods=void 0===e.break_chained_methods?!1:e.break_chained_methods,tt.max_preserve_newlines=void 0===e.max_preserve_newlines?0:parseInt(e.max_preserve_newlines,10),tt.space_in_paren=void 0===e.space_in_paren?!1:e.space_in_paren,tt.space_in_empty_paren=void 0===e.space_in_empty_paren?!1:e.space_in_empty_paren,tt.jslint_happy=void 0===e.jslint_happy?!1:e.jslint_happy,tt.space_after_anon_function=void 0===e.space_after_anon_function?!1:e.space_after_anon_function,tt.keep_array_indentation=void 0===e.keep_array_indentation?!1:e.keep_array_indentation,tt.space_before_conditional=void 0===e.space_before_conditional?!0:e.space_before_conditional,tt.unescape_strings=void 0===e.unescape_strings?!1:e.unescape_strings,tt.wrap_line_length=void 0===e.wrap_line_length?0:parseInt(e.wrap_line_length,10),tt.e4x=void 0===e.e4x?!1:e.e4x,tt.end_with_newline=void 0===e.end_with_newline?!1:e.end_with_newline,tt.comma_first=void 0===e.comma_first?!1:e.comma_first,tt.test_output_raw=void 0===e.test_output_raw?!1:e.test_output_raw,tt.jslint_happy&&(tt.space_after_anon_function=!0),e.indent_with_tabs&&(tt.indent_char="	",tt.indent_size=1),tt.eol=tt.eol.replace(/\\r/,"\r").replace(/\\n/,"\n"),Q="";tt.indent_size>0;)Q+=tt.indent_char,tt.indent_size-=1;var it=0;if(t&&t.length){for(;" "===t.charAt(it)||"	"===t.charAt(it);)nt+=t.charAt(it),it+=1;t=t.substring(it)}F="TK_START_BLOCK",$="",W=new o(Q,nt),W.raw=tt.test_output_raw,H=[],E(h.BlockStatement),this.beautify=function(){var e,n;for(G=new l(t,tt,Q),et=G.tokenize(),z=0;e=S();){for(var i=0;i<e.comments_before.length;i++)_(e.comments_before[i]);_(e),$=q.last_text,F=e.type,q.last_text=e.text,z+=1}return n=W.get_code(),tt.end_with_newline&&(n+="\n"),"\n"!=tt.eol&&(n=n.replace(/[\n]/g,tt.eol)),n}}function a(t){var e=0,n=-1,i=[],r=!0;this.set_indent=function(i){e=t.baseIndentLength+i*t.indent_length,n=i},this.get_character_count=function(){return e},this.is_empty=function(){return r},this.last=function(){return this._empty?null:i[i.length-1]},this.push=function(t){i.push(t),e+=t.length,r=!1},this.pop=function(){var t=null;return r||(t=i.pop(),e-=t.length,r=0===i.length),t},this.remove_indent=function(){n>0&&(n-=1,e-=t.indent_length)},this.trim=function(){for(;" "===this.last();)i.pop(),e-=1;r=0===i.length},this.toString=function(){var e="";return this._empty||(n>=0&&(e=t.indent_cache[n]),e+=i.join("")),e}}function o(t,e){e=e||"",this.indent_cache=[e],this.baseIndentLength=e.length,this.indent_length=t.length,this.raw=!1;var n=[];this.baseIndentString=e,this.indent_string=t,this.previous_line=null,this.current_line=null,this.space_before_token=!1,this.add_outputline=function(){this.previous_line=this.current_line,this.current_line=new a(this),n.push(this.current_line)},this.add_outputline(),this.get_line_number=function(){return n.length},this.add_new_line=function(t){return 1===this.get_line_number()&&this.just_added_newline()?!1:t||!this.just_added_newline()?(this.raw||this.add_outputline(),!0):!1},this.get_code=function(){var t=n.join("\n").replace(/[\r\n\t ]+$/,"");return t},this.set_indent=function(t){if(n.length>1){for(;t>=this.indent_cache.length;)this.indent_cache.push(this.indent_cache[this.indent_cache.length-1]+this.indent_string);return this.current_line.set_indent(t),!0}return this.current_line.set_indent(0),!1},this.add_raw_token=function(t){for(var e=0;e<t.newlines;e++)this.add_outputline();this.current_line.push(t.whitespace_before),this.current_line.push(t.text),this.space_before_token=!1},this.add_token=function(t){this.add_space_before_token(),this.current_line.push(t)},this.add_space_before_token=function(){this.space_before_token&&!this.just_added_newline()&&this.current_line.push(" "),this.space_before_token=!1},this.remove_redundant_indentation=function(t){if(!t.multiline_frame&&t.mode!==h.ForInitializer&&t.mode!==h.Conditional)for(var e=t.start_line_index,i=n.length;i>e;)n[e].remove_indent(),e++},this.trim=function(i){for(i=void 0===i?!1:i,this.current_line.trim(t,e);i&&n.length>1&&this.current_line.is_empty();)n.pop(),this.current_line=n[n.length-1],this.current_line.trim();this.previous_line=n.length>1?n[n.length-2]:null},this.just_added_newline=function(){return this.current_line.is_empty()},this.just_added_blankline=function(){if(this.just_added_newline()){
if(1===n.length)return!0;var t=n[n.length-2];return t.is_empty()}return!1}}function l(t,e,r){function s(t){if(!t.match(R))return null;var e={};m.lastIndex=0;for(var n=m.exec(t);n;)e[n[1]]=n[2],n=m.exec(t);return e}function _(){var r,_=[];if(d=0,f="",g>=x)return["","TK_EOF"];var R;R=E.length?E[E.length-1]:new c("TK_START_BLOCK","{");var m=t.charAt(g);for(g+=1;n(m,o);){if(acorn.newline.test(m)?("\n"!==m||"\r"!==t.charAt(g-2))&&(d+=1,_=[]):_.push(m),g>=x)return["","TK_EOF"];m=t.charAt(g),g+=1}if(_.length&&(f=_.join("")),l.test(m)){var A=!0,y=!0,k=l;for("0"===m&&x>g&&/[Xxo]/.test(t.charAt(g))?(A=!1,y=!1,m+=t.charAt(g),g+=1,k=/[o]/.test(t.charAt(g))?h:p):(m="",g-=1);x>g&&k.test(t.charAt(g));)m+=t.charAt(g),g+=1,A&&x>g&&"."===t.charAt(g)&&(m+=t.charAt(g),g+=1,A=!1),y&&x>g&&/[Ee]/.test(t.charAt(g))&&(m+=t.charAt(g),g+=1,x>g&&/[+-]/.test(t.charAt(g))&&(m+=t.charAt(g),g+=1),y=!1,A=!1);return[m,"TK_WORD"]}if(acorn.isIdentifierStart(t.charCodeAt(g-1))){if(x>g)for(;acorn.isIdentifierChar(t.charCodeAt(g))&&(m+=t.charAt(g),g+=1,g!==x););return"TK_DOT"===R.type||"TK_RESERVED"===R.type&&n(R.text,["set","get"])||!n(m,w)?[m,"TK_WORD"]:"in"===m?[m,"TK_OPERATOR"]:[m,"TK_RESERVED"]}if("("===m||"["===m)return[m,"TK_START_EXPR"];if(")"===m||"]"===m)return[m,"TK_END_EXPR"];if("{"===m)return[m,"TK_START_BLOCK"];if("}"===m)return[m,"TK_END_BLOCK"];if(";"===m)return[m,"TK_SEMICOLON"];if("/"===m){var O="";if("*"===t.charAt(g)){g+=1,v.lastIndex=g;var N=v.exec(t);O="/*"+N[0],g+=N[0].length;var D=s(O);return D&&"start"===D.ignore&&(b.lastIndex=g,N=b.exec(t),O+=N[0],g+=N[0].length),O=O.replace(acorn.lineBreak,"\n"),[O,"TK_BLOCK_COMMENT",D]}if("/"===t.charAt(g)){g+=1,K.lastIndex=g;var N=K.exec(t);return O="//"+N[0],g+=N[0].length,[O,"TK_COMMENT"]}}if("`"===m||"'"===m||'"'===m||("/"===m||e.e4x&&"<"===m&&t.slice(g-1).match(/^<([-a-zA-Z:0-9_.]+|{[^{}]*}|!\[CDATA\[[\s\S]*?\]\])(\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{.*?}))*\s*(\/?)\s*>/))&&("TK_RESERVED"===R.type&&n(R.text,["return","case","throw","else","do","typeof","yield"])||"TK_END_EXPR"===R.type&&")"===R.text&&R.parent&&"TK_RESERVED"===R.parent.type&&n(R.parent.text,["if","while","for"])||n(R.type,["TK_COMMENT","TK_START_EXPR","TK_START_BLOCK","TK_END_BLOCK","TK_OPERATOR","TK_EQUALS","TK_EOF","TK_SEMICOLON","TK_COMMA"]))){var L=m,C=!1,I=!1;if(r=m,"/"===L)for(var V=!1;x>g&&(C||V||t.charAt(g)!==L)&&!acorn.newline.test(t.charAt(g));)r+=t.charAt(g),C?C=!1:(C="\\"===t.charAt(g),"["===t.charAt(g)?V=!0:"]"===t.charAt(g)&&(V=!1)),g+=1;else if(e.e4x&&"<"===L){var P=/<(\/?)([-a-zA-Z:0-9_.]+|{[^{}]*}|!\[CDATA\[[\s\S]*?\]\])(\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{.*?}))*\s*(\/?)\s*>/g,j=t.slice(g-1),M=P.exec(j);if(M&&0===M.index){for(var B=M[2],U=0;M;){var W=!!M[1],z=M[2],G=!!M[M.length-1]||"![CDATA["===z.slice(0,8);if(z!==B||G||(W?--U:++U),0>=U)break;M=P.exec(j)}var X=M?M.index+M[0].length:j.length;return j=j.slice(0,X),g+=X-1,j=j.replace(acorn.lineBreak,"\n"),[j,"TK_STRING"]}}else for(;x>g&&(C||t.charAt(g)!==L&&("`"===L||!acorn.newline.test(t.charAt(g))));)(C||"`"===L)&&acorn.newline.test(t.charAt(g))?("\r"===t.charAt(g)&&"\n"===t.charAt(g+1)&&(g+=1),r+="\n"):r+=t.charAt(g),C?(("x"===t.charAt(g)||"u"===t.charAt(g))&&(I=!0),C=!1):C="\\"===t.charAt(g),g+=1;if(I&&e.unescape_strings&&(r=a(r)),x>g&&t.charAt(g)===L&&(r+=L,g+=1,"/"===L))for(;x>g&&acorn.isIdentifierStart(t.charCodeAt(g));)r+=t.charAt(g),g+=1;return[r,"TK_STRING"]}if("#"===m){if(0===E.length&&"!"===t.charAt(g)){for(r=m;x>g&&"\n"!==m;)m=t.charAt(g),r+=m,g+=1;return[i(r)+"\n","TK_UNKNOWN"]}var F="#";if(x>g&&l.test(t.charAt(g))){do m=t.charAt(g),F+=m,g+=1;while(x>g&&"#"!==m&&"="!==m);return"#"===m||("["===t.charAt(g)&&"]"===t.charAt(g+1)?(F+="[]",g+=2):"{"===t.charAt(g)&&"}"===t.charAt(g+1)&&(F+="{}",g+=2)),[F,"TK_WORD"]}}if("<"===m&&("?"===t.charAt(g)||"%"===t.charAt(g))){S.lastIndex=g-1;var $=S.exec(t);if($)return m=$[0],g+=m.length-1,m=m.replace(acorn.lineBreak,"\n"),[m,"TK_STRING"]}if("<"===m&&"<!--"===t.substring(g-1,g+3)){for(g+=3,m="<!--";!acorn.newline.test(t.charAt(g))&&x>g;)m+=t.charAt(g),g++;return T=!0,[m,"TK_COMMENT"]}if("-"===m&&T&&"-->"===t.substring(g-1,g+2))return T=!1,g+=2,["-->","TK_COMMENT"];if("."===m)return[m,"TK_DOT"];if(n(m,u)){for(;x>g&&n(m+t.charAt(g),u)&&(m+=t.charAt(g),g+=1,!(g>=x)););return","===m?[m,"TK_COMMA"]:"="===m?[m,"TK_EQUALS"]:[m,"TK_OPERATOR"]}return[m,"TK_UNKNOWN"]}function a(t){for(var e,n=!1,i="",r=0,s="",_=0;n||r<t.length;)if(e=t.charAt(r),r++,n){if(n=!1,"x"===e)s=t.substr(r,2),r+=2;else{if("u"!==e){i+="\\"+e;continue}s=t.substr(r,4),r+=4}if(!s.match(/^[0123456789abcdefABCDEF]+$/))return t;if(_=parseInt(s,16),_>=0&&32>_){i+="x"===e?"\\x"+s:"\\u"+s;continue}if(34===_||39===_||92===_)i+="\\"+String.fromCharCode(_);else{if("x"===e&&_>126&&255>=_)return t;i+=String.fromCharCode(_)}}else"\\"===e?n=!0:i+=e;return i}var o="\n\r	 ".split(""),l=/[0-9]/,h=/[01234567]/,p=/[0123456789abcdefABCDEF]/,u="+ - * / % & ++ -- = += -= *= /= %= == === != !== > < >= <= >> << >>> >>>= >>= <<= && &= | || ! ~ , : ? ^ ^= |= :: =>".split(" ");this.line_starters="continue,try,throw,return,var,let,const,if,switch,case,default,for,while,break,function,import,export".split(",");var d,f,T,E,g,x,w=this.line_starters.concat(["do","in","else","get","set","new","catch","finally","typeof","yield","async","await"]),v=/([\s\S]*?)((?:\*\/)|$)/g,K=/([^\n\r\u2028\u2029]*)/g,R=/\/\* beautify( \w+[:]\w+)+ \*\//g,m=/ (\w+)[:](\w+)/g,b=/([\s\S]*?)((?:\/\*\sbeautify\signore:end\s\*\/)|$)/g,S=/((<\?php|<\?=)[\s\S]*?\?>)|(<%[\s\S]*?%>)/g;this.tokenize=function(){x=t.length,g=0,T=!1,E=[];for(var e,n,i,r=null,s=[],a=[];!n||"TK_EOF"!==n.type;){for(i=_(),e=new c(i[1],i[0],d,f);"TK_COMMENT"===e.type||"TK_BLOCK_COMMENT"===e.type||"TK_UNKNOWN"===e.type;)"TK_BLOCK_COMMENT"===e.type&&(e.directives=i[2]),a.push(e),i=_(),e=new c(i[1],i[0],d,f);a.length&&(e.comments_before=a,a=[]),"TK_START_BLOCK"===e.type||"TK_START_EXPR"===e.type?(e.parent=n,s.push(r),r=e):("TK_END_BLOCK"===e.type||"TK_END_EXPR"===e.type)&&r&&("]"===e.text&&"["===r.text||")"===e.text&&"("===r.text||"}"===e.text&&"{"===r.text)&&(e.parent=r.parent,r=s.pop()),E.push(e),n=e}return E}}var h={BlockStatement:"BlockStatement",Statement:"Statement",ObjectLiteral:"ObjectLiteral",ArrayLiteral:"ArrayLiteral",ForInitializer:"ForInitializer",Conditional:"Conditional",Expression:"Expression"},c=function(t,e,n,i,r,s){this.type=t,this.text=e,this.comments_before=[],this.newlines=n||0,this.wanted_newline=n>0,this.whitespace_before=i||"",this.parent=null,this.directives=null};return{run:t}}});