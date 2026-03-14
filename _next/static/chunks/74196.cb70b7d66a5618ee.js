"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[74196],{74196:(t,e,n)=>{function r(t){return t.replace(/[^a-zA-Z0-9]+(.)/g,(t,e)=>e.toUpperCase()).replace(/^[A-Z]/,t=>t.toLowerCase())}function o(t){var e;return(e=r(t))?e.charAt(0).toUpperCase()+e.slice(1):e}function i(t,e="Root"){let n;try{n=JSON.parse(t)}catch{return"// Invalid JSON"}if("object"!=typeof n||null===n)return"// JSON root must be an object or array of objects";let l=new Map,s=new Set,a=[];if(Array.isArray(n))if(!(n.length>0)||"object"!=typeof n[0])return"// JSON array does not contain objects";else l.set(e,n[0]);else l.set(e,n);for(;l.size>s.size;)for(let[t,e]of l)if(!s.has(t)){let n=function(t,e,n,i){if(i.has(t))return"";i.add(t);let l=Object.entries(e),s=[];for(let[t,e]of l){let i=r(t);if(Array.isArray(e)&&e.length>0&&"object"==typeof e[0]){let r=o(t);n.set(r,e[0])}let l=function t(e,n,r){if(null==e)return"dynamic";if("string"==typeof e)return"String";if("number"==typeof e)return Number.isInteger(e)?"int":"double";if("boolean"==typeof e)return"bool";if(Array.isArray(e)){if(0===e.length)return"List<dynamic>";let o=t(e[0],n,r);return`List<${o}>`}if("object"==typeof e){let t=o(n);return r.set(t,e),t}return"dynamic"}(e,t,n);s.push({key:t,fieldName:i,dartType:l})}let a=`class ${t} {
`;for(let{fieldName:t,dartType:e}of s)a+=`  ${e}? ${t};
`;for(let{key:e,fieldName:n,dartType:r}of(a+=`
  ${t}({`,a+=s.map(({fieldName:t})=>`this.${t}`).join(", "),a+="});\n",a+=`
  ${t}.fromJson(Map<String, dynamic> json) {
`,s))if(r.startsWith("List<")){let t=r.slice(5,-1);["String","int","double","bool","dynamic"].includes(t)?a+=`    ${n} = json['${e}'] != null ? List<${t}>.from(json['${e}']) : null;
`:(a+=`    if (json['${e}'] != null) {
`,a+=`      ${n} = <${t}>[];
`,a+=`      json['${e}'].forEach((v) {
`,a+=`        ${n}!.add(${t}.fromJson(v));
`,a+=`      });
`,a+=`    }
`)}else["String","int","double","bool","dynamic"].includes(r)?a+=`    ${n} = json['${e}'];
`:a+=`    ${n} = json['${e}'] != null ? ${r}.fromJson(json['${e}']) : null;
`;for(let{key:t,fieldName:e,dartType:n}of(a+="  }\n",a+=`
  Map<String, dynamic> toJson() {
`,a+=`    final Map<String, dynamic> data = <String, dynamic>{};
`,s))n.startsWith("List<")?["String","int","double","bool","dynamic"].includes(n.slice(5,-1))?a+=`    data['${t}'] = ${e};
`:(a+=`    if (${e} != null) {
`,a+=`      data['${t}'] = ${e}!.map((v) => v.toJson()).toList();
`,a+=`    }
`):["String","int","double","bool","dynamic"].includes(n)?a+=`    data['${t}'] = ${e};
`:(a+=`    if (${e} != null) {
`,a+=`      data['${t}'] = ${e}!.toJson();
`,a+=`    }
`);return a+=`    return data;
`,a+="  }\n",a+="}\n"}(t,e,l,s);n&&a.push(n)}return a.join("\n")}n.r(e),n.d(e,{default:()=>i})}}]);
//# sourceMappingURL=74196.cb70b7d66a5618ee.js.map