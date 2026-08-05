"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[58596],{58596:(t,n,e)=>{function r(t){return t.replace(/[^a-zA-Z0-9]+(.)/g,(t,n)=>n.toUpperCase()).replace(/^[A-Z]/,t=>t.toLowerCase())}function o(t){var n;return(n=r(t))?n.charAt(0).toUpperCase()+n.slice(1):n}function i(t,n="Root"){let e;try{e=JSON.parse(t)}catch{return"// Invalid JSON"}if("object"!=typeof e||null===e)return"// JSON root must be an object or array of objects";let l=new Map,s=new Set,a=[];if(Array.isArray(e))if(!(e.length>0)||"object"!=typeof e[0])return"// JSON array does not contain objects";else l.set(n,e[0]);else l.set(n,e);for(;l.size>s.size;)for(let[t,n]of l)if(!s.has(t)){let e=function(t,n,e,i){if(i.has(t))return"";i.add(t);let l=Object.entries(n),s=[];for(let[t,n]of l){let i=r(t);if(Array.isArray(n)&&n.length>0&&"object"==typeof n[0]){let r=o(t);e.set(r,n[0])}let l=function t(n,e,r){if(null==n)return"dynamic";if("string"==typeof n)return"String";if("number"==typeof n)return Number.isInteger(n)?"int":"double";if("boolean"==typeof n)return"bool";if(Array.isArray(n)){if(0===n.length)return"List<dynamic>";let o=t(n[0],e,r);return`List<${o}>`}if("object"==typeof n){let t=o(e);return r.set(t,n),t}return"dynamic"}(n,t,e);s.push({key:t,fieldName:i,dartType:l})}let a=`class ${t} {
`;for(let{fieldName:t,dartType:n}of s)a+=`  ${n}? ${t};
`;for(let{key:n,fieldName:e,dartType:r}of(a+=`
  ${t}({`,a+=s.map(({fieldName:t})=>`this.${t}`).join(", "),a+="});\n",a+=`
  ${t}.fromJson(Map<String, dynamic> json) {
`,s))if(r.startsWith("List<")){let t=r.slice(5,-1);["String","int","double","bool","dynamic"].includes(t)?a+=`    ${e} = json['${n}'] != null ? List<${t}>.from(json['${n}']) : null;
`:(a+=`    if (json['${n}'] != null) {
`,a+=`      ${e} = <${t}>[];
`,a+=`      json['${n}'].forEach((v) {
`,a+=`        ${e}!.add(${t}.fromJson(v));
`,a+="      });\n",a+="    }\n")}else["String","int","double","bool","dynamic"].includes(r)?a+=`    ${e} = json['${n}'];
`:a+=`    ${e} = json['${n}'] != null ? ${r}.fromJson(json['${n}']) : null;
`;for(let{key:t,fieldName:n,dartType:e}of(a+="  }\n",a+="\n  Map<String, dynamic> toJson() {\n",a+="    final Map<String, dynamic> data = <String, dynamic>{};\n",s))e.startsWith("List<")?["String","int","double","bool","dynamic"].includes(e.slice(5,-1))?a+=`    data['${t}'] = ${n};
`:(a+=`    if (${n} != null) {
`,a+=`      data['${t}'] = ${n}!.map((v) => v.toJson()).toList();
`,a+="    }\n"):["String","int","double","bool","dynamic"].includes(e)?a+=`    data['${t}'] = ${n};
`:(a+=`    if (${n} != null) {
`,a+=`      data['${t}'] = ${n}!.toJson();
`,a+="    }\n");return a+="    return data;\n",a+="  }\n",a+="}\n"}(t,n,l,s);e&&a.push(e)}return a.join("\n")}e.r(n),e.d(n,{default:()=>i})}}]);
//# sourceMappingURL=58596.bb16bf448be14c65.js.map