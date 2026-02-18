(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[99762],{20878:(e,r,s)=>{"use strict";s.d(r,{N:()=>o});var i=s(37876);s(14232);var n=s(33686),d=s(97387),c=s(80825),t=s(35729);let l=n.Ay.div.withConfig({componentId:"sc-6d0fa89e-0"})(["pre{font-family:"," !important;border-radius:8px;margin:0;background:#fefcf7 !important;border:1px solid #e8e4db;*{font-family:"," !important;}}"],t.j,t.j),o=({code:e,language:r="json"})=>(0,i.jsx)(l,{children:(0,i.jsx)(d.A,{language:r,style:c.Je,customStyle:{padding:"1rem"},children:e})})},37763:(e,r,s)=>{"use strict";s.d(r,{q:()=>p});var i=s(37876);s(14232);var n=s(48230),d=s.n(n),c=s(89704),t=s(45050),l=s(8291),o=s(79021),a=s(33686);let h=(0,a.Ay)(c.t).withConfig({componentId:"sc-13fd06cf-0"})(["height:100%;cursor:pointer;transition:all 0.25s ease;background:#ffffff;border:1px solid #e8e4db;&:hover{transform:translateY(-2px);box-shadow:0 10px 24px rgba(26,26,26,0.12);}"]),m=(0,a.Ay)(t.E).withConfig({componentId:"sc-13fd06cf-1"})(["text-transform:uppercase;letter-spacing:0.1em;font-size:0.7rem;color:#868e96;"]),j=a.Ay.div.withConfig({componentId:"sc-13fd06cf-2"})(["display:grid;grid-template-columns:1fr 1fr;gap:16px;@media (max-width:768px){grid-template-columns:1fr;}"]),x=a.Ay.div.withConfig({componentId:"sc-13fd06cf-3"})(["grid-column:",";@media (max-width:768px){grid-column:auto;}"],e=>"right"===e.$align?"2 / 3":"auto"),p=({title:e,previous:r,next:s})=>r||s?(0,i.jsxs)(c.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,i.jsx)(l.h,{mb:"md",order:3,c:"dark",children:e}),(0,i.jsxs)(j,{children:[r&&(0,i.jsx)(x,{children:(0,i.jsx)(d(),{href:r.href,style:{textDecoration:"none",color:"inherit"},"aria-label":`${r.label}: ${r.title}`,children:(0,i.jsx)(h,{p:"lg",radius:"md",children:(0,i.jsxs)(o.B,{gap:6,children:[(0,i.jsx)(m,{children:r.label}),(0,i.jsx)(t.E,{fw:600,c:"dark",children:r.title})]})})})}),s&&(0,i.jsx)(x,{$align:r?"left":"right",children:(0,i.jsx)(d(),{href:s.href,style:{textDecoration:"none",color:"inherit"},"aria-label":`${s.label}: ${s.title}`,children:(0,i.jsx)(h,{p:"lg",radius:"md",children:(0,i.jsxs)(o.B,{gap:6,children:[(0,i.jsx)(m,{children:s.label}),(0,i.jsx)(t.E,{fw:600,c:"dark",children:s.title})]})})})})]})]}):null},43839:(e,r,s)=>{"use strict";s.d(r,{X:()=>C});var i=s(37876),n=s(63108);s(14232);var d=s(46249),c=s(1609),t=s(64453),l=s(99545),o=s(88791),a=s(95171),h=s(80385);let[m,j]=(0,s(98671).F)("Table component was not found in the tree");var x={table:"m_b23fa0ef",th:"m_4e7aa4f3",tr:"m_4e7aa4fd",td:"m_4e7aa4ef",tbody:"m_b2404537",thead:"m_b242d975",caption:"m_9e5a3ac7",scrollContainer:"m_a100c15",scrollContainerInner:"m_62259741"};function p(e,r){let s=`Table${e.charAt(0).toUpperCase()}${e.slice(1)}`,n=(0,h.P9)((n,d)=>{let c=(0,l.Y)(s,{},n),{classNames:t,className:o,style:h,styles:m,...x}=c,p=j();return(0,i.jsx)(a.a,{component:e,ref:d,...function(e,r){if(!r)return;let s={};return r.columnBorder&&e.withColumnBorders&&(s["data-with-column-border"]=!0),r.rowBorder&&e.withRowBorders&&(s["data-with-row-border"]=!0),r.striped&&e.striped&&(s["data-striped"]=e.striped),r.highlightOnHover&&e.highlightOnHover&&(s["data-hover"]=!0),r.captionSide&&e.captionSide&&(s["data-side"]=e.captionSide),r.stickyHeader&&e.stickyHeader&&(s["data-sticky"]=!0),s}(p,r),...p.getStyles(e,{className:o,classNames:t,style:h,styles:m,props:c}),...x})});return n.displayName=`@mantine/core/${s}`,n.classes=x,n}let b=p("th",{columnBorder:!0}),f=p("td",{columnBorder:!0}),u=p("tr",{rowBorder:!0,striped:!0,highlightOnHover:!0}),T=p("thead",{stickyHeader:!0}),y=p("tbody"),g=p("tfoot"),X=p("caption",{captionSide:!0});function S({data:e}){return(0,i.jsxs)(i.Fragment,{children:[e.caption&&(0,i.jsx)(X,{children:e.caption}),e.head&&(0,i.jsx)(T,{children:(0,i.jsx)(u,{children:e.head.map((e,r)=>(0,i.jsx)(b,{children:e},r))})}),e.body&&(0,i.jsx)(y,{children:e.body.map((e,r)=>(0,i.jsx)(u,{children:e.map((e,r)=>(0,i.jsx)(f,{children:e},r))},r))}),e.foot&&(0,i.jsx)(g,{children:(0,i.jsx)(u,{children:e.foot.map((e,r)=>(0,i.jsx)(b,{children:e},r))})})]})}S.displayName="@mantine/core/TableDataRenderer";var v=s(16433);let w={type:"scrollarea"},E=(0,c.V)((e,{minWidth:r,maxHeight:s,type:i})=>({scrollContainer:{"--table-min-width":(0,n.D)(r),"--table-max-height":(0,n.D)(s),"--table-overflow":"native"===i?"auto":void 0}})),D=(0,h.P9)((e,r)=>{let s=(0,l.Y)("TableScrollContainer",w,e),{classNames:n,className:d,style:c,styles:t,unstyled:h,vars:m,children:j,minWidth:p,maxHeight:b,type:f,scrollAreaProps:u,attributes:T,...y}=s,g=(0,o.I)({name:"TableScrollContainer",classes:x,props:s,className:d,style:c,classNames:n,styles:t,unstyled:h,attributes:T,vars:m,varsResolver:E,rootSelector:"scrollContainer"});return(0,i.jsx)(a.a,{component:"scrollarea"===f?v.F:"div",..."scrollarea"===f?b?{offsetScrollbars:"xy",...u}:{offsetScrollbars:"x",...u}:{},ref:r,...g("scrollContainer"),...y,children:(0,i.jsx)("div",{...g("scrollContainerInner"),children:j})})});D.classes=x,D.displayName="@mantine/core/TableScrollContainer";let k={withRowBorders:!0,verticalSpacing:7},B=(0,c.V)((e,{layout:r,captionSide:s,horizontalSpacing:i,verticalSpacing:c,borderColor:l,stripedColor:o,highlightOnHoverColor:a,striped:h,highlightOnHover:m,stickyHeaderOffset:j,stickyHeader:x})=>({table:{"--table-layout":r,"--table-caption-side":s,"--table-horizontal-spacing":(0,d.GY)(i),"--table-vertical-spacing":(0,d.GY)(c),"--table-border-color":l?(0,t.r)(l,e):void 0,"--table-striped-color":h&&o?(0,t.r)(o,e):void 0,"--table-highlight-on-hover-color":m&&a?(0,t.r)(a,e):void 0,"--table-sticky-header-offset":x?(0,n.D)(j):void 0}})),C=(0,h.P9)((e,r)=>{let s=(0,l.Y)("Table",k,e),{classNames:n,className:d,style:c,styles:t,unstyled:h,vars:j,horizontalSpacing:p,verticalSpacing:b,captionSide:f,stripedColor:u,highlightOnHoverColor:T,striped:y,highlightOnHover:g,withColumnBorders:X,withRowBorders:v,withTableBorder:w,borderColor:E,layout:D,variant:C,data:_,children:A,stickyHeader:N,stickyHeaderOffset:$,mod:I,tabularNums:q,attributes:z,...F}=s,O=(0,o.I)({name:"Table",props:s,className:d,style:c,classes:x,classNames:n,styles:t,unstyled:h,attributes:z,rootSelector:"table",vars:j,varsResolver:B});return(0,i.jsx)(m,{value:{getStyles:O,stickyHeader:N,striped:!0===y?"odd":y||void 0,highlightOnHover:g,withColumnBorders:X,withRowBorders:v,captionSide:f||"bottom"},children:(0,i.jsx)(a.a,{component:"table",variant:C,ref:r,mod:[{"data-with-table-border":w,"data-tabular-nums":q},I],...O("table"),...F,children:A||!!_&&(0,i.jsx)(S,{data:_})})})});C.classes=x,C.displayName="@mantine/core/Table",C.Td=f,C.Th=b,C.Tr=u,C.Thead=T,C.Tbody=y,C.Tfoot=g,C.Caption=X,C.ScrollContainer=D,C.DataRenderer=S},56356:(e,r,s)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/docs/json-schema",function(){return s(67840)}])},61342:(e,r,s)=>{"use strict";s.d(r,{c:()=>x});var i=s(37876);s(14232);var n=s(46249),d=s(1609),c=s(64453),t=s(99545),l=s(88791),o=s(95171),a=s(80385),h={root:"m_3eebeb36",label:"m_9e365f20"};let m={orientation:"horizontal"},j=(0,d.V)((e,{color:r,variant:s,size:i})=>({root:{"--divider-color":r?(0,c.r)(r,e):void 0,"--divider-border-style":s,"--divider-size":(0,n.YC)(i,"divider-size")}})),x=(0,a.P9)((e,r)=>{let s=(0,t.Y)("Divider",m,e),{classNames:n,className:d,style:c,styles:a,unstyled:x,vars:p,color:b,orientation:f,label:u,labelPosition:T,mod:y,attributes:g,...X}=s,S=(0,l.I)({name:"Divider",classes:h,props:s,className:d,style:c,classNames:n,styles:a,unstyled:x,attributes:g,vars:p,varsResolver:j});return(0,i.jsx)(o.a,{ref:r,mod:[{orientation:f,"with-label":!!u},y],...S("root"),...X,role:"separator",children:u&&(0,i.jsx)(o.a,{component:"span",mod:{position:T},...S("label"),children:u})})});x.classes=h,x.displayName="@mantine/core/Divider"},67840:(e,r,s)=>{"use strict";s.r(r),s.d(r,{default:()=>D});var i=s(37876);s(14232);var n=s(77328),d=s.n(n),c=s(33752),t=s(79021),l=s(8291),o=s(45050),a=s(83888),h=s(89704),m=s(43839),j=s(61342),x=s(33686),p=s(41988),b=s(27592),f=s(20878),u=s(37763),T=s(96008),y=s(35729),g=s(20944),X=s(85654),S=s(27777);let v=x.Ay.div.withConfig({componentId:"sc-4a31d923-0"})(["display:flex;flex-direction:column;gap:16px;line-height:1.7;"]),w=x.Ay.a.withConfig({componentId:"sc-4a31d923-1"})(["color:#228be6;text-decoration:none;font-weight:500;&:hover{text-decoration:underline;}"]),E=x.Ay.code.withConfig({componentId:"sc-4a31d923-2"})(["background:#f8f9fa;padding:2px 6px;border-radius:4px;font-family:"," !important;font-size:0.9em;border:1px solid #e9ecef;"],y.j),D=()=>{let{t:e,locale:r}=(0,X.Bd)("docs"),s=e=>"vi"===r?`${e}?lang=vi`:e;return(0,i.jsxs)(S.A,{children:[(0,i.jsx)(d(),{children:(0,p.U)({...g.k,title:`${e("jsonSchema.title")} Documentation - JSON Visualization`,description:e("jsonSchema.subtitle"),canonical:`https://jsonviz.online/${"vi"===r?"vi/":""}docs/json-schema`})}),(0,i.jsx)(c.m,{size:"lg",py:60,children:(0,i.jsxs)(t.B,{gap:"xl",children:[(0,i.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[(0,i.jsxs)("div",{children:[(0,i.jsx)(l.h,{order:1,c:"dark",mb:"sm",children:e("jsonSchema.title")}),(0,i.jsx)(o.E,{size:"lg",c:"dimmed",children:e("jsonSchema.subtitle")})]}),(0,i.jsx)(T.c,{})]}),(0,i.jsx)(a.F,{icon:(0,i.jsx)(b.$Mj,{size:20}),color:"cyan",variant:"light",styles:{message:{color:"#1971c2"}},children:e("jsonSchema.alert")}),(0,i.jsxs)(h.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,i.jsx)(l.h,{mb:"md",order:2,c:"dark",children:e("jsonSchema.whatIsTitle")}),(0,i.jsxs)(v,{children:[(0,i.jsx)(o.E,{children:e("jsonSchema.whatIsDesc")}),(0,i.jsx)(o.E,{children:e("jsonSchema.whatIsUsage")}),(0,i.jsxs)(o.E,{children:["• ",e("jsonSchema.usage1")]}),(0,i.jsxs)(o.E,{children:["• ",e("jsonSchema.usage2")]}),(0,i.jsxs)(o.E,{children:["• ",e("jsonSchema.usage3")]}),(0,i.jsxs)(o.E,{children:["• ",e("jsonSchema.usage4")]})]})]}),(0,i.jsxs)(h.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,i.jsx)(l.h,{mb:"md",order:2,c:"dark",children:e("jsonSchema.howToUseTitle")}),(0,i.jsxs)(v,{children:[(0,i.jsxs)("div",{children:[(0,i.jsx)(o.E,{fw:600,mb:"xs",children:e("jsonSchema.step1")}),(0,i.jsxs)(o.E,{children:[e("jsonSchema.step1Desc")," ",(0,i.jsx)(w,{href:"/editor",children:e("common.editor")}),"."]})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)(o.E,{fw:600,mb:"xs",children:e("jsonSchema.step2")}),(0,i.jsx)(o.E,{children:e("jsonSchema.step2Desc")})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)(o.E,{fw:600,mb:"xs",children:e("jsonSchema.step3")}),(0,i.jsx)(o.E,{children:e("jsonSchema.step3Desc")})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)(o.E,{fw:600,mb:"xs",children:e("jsonSchema.step4")}),(0,i.jsx)(o.E,{children:e("jsonSchema.step4Desc")})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)(o.E,{fw:600,mb:"xs",children:e("jsonSchema.step5")}),(0,i.jsx)(o.E,{children:e("jsonSchema.step5Desc")})]})]})]}),(0,i.jsxs)(h.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,i.jsx)(l.h,{mb:"md",order:2,c:"dark",children:e("jsonSchema.basicSchemaTitle")}),(0,i.jsxs)(v,{children:[(0,i.jsx)(o.E,{children:e("jsonSchema.basicSchemaDesc")}),(0,i.jsx)(f.N,{code:`{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Product",
  "description": "A product from the catalog",
  "type": "object",
  "properties": {
    "id": {
      "description": "The unique identifier for a product",
      "type": "integer"
    },
    "name": {
      "description": "Name of the product",
      "type": "string"
    },
    "price": {
      "description": "The price of the product",
      "type": "number",
      "minimum": 0
    }
  },
  "required": ["id", "name", "price"]
}`})]})]}),(0,i.jsxs)(h.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,i.jsx)(l.h,{mb:"md",order:2,c:"dark",children:e("jsonSchema.commonKeywordsTitle")}),(0,i.jsx)(v,{children:(0,i.jsxs)(m.X,{striped:!0,highlightOnHover:!0,withTableBorder:!0,withColumnBorders:!0,children:[(0,i.jsx)(m.X.Thead,{children:(0,i.jsxs)(m.X.Tr,{children:[(0,i.jsx)(m.X.Th,{children:e("jsonSchema.tableKeyword")}),(0,i.jsx)(m.X.Th,{children:e("jsonSchema.tableDescription")})]})}),(0,i.jsxs)(m.X.Tbody,{children:[(0,i.jsxs)(m.X.Tr,{children:[(0,i.jsx)(m.X.Td,{children:(0,i.jsx)(E,{children:"$schema"})}),(0,i.jsx)(m.X.Td,{children:e("jsonSchema.schemaKeywordDesc")})]}),(0,i.jsxs)(m.X.Tr,{children:[(0,i.jsx)(m.X.Td,{children:(0,i.jsx)(E,{children:"title"})}),(0,i.jsx)(m.X.Td,{children:e("jsonSchema.titleKeywordDesc")})]}),(0,i.jsxs)(m.X.Tr,{children:[(0,i.jsx)(m.X.Td,{children:(0,i.jsx)(E,{children:"description"})}),(0,i.jsx)(m.X.Td,{children:e("jsonSchema.descriptionKeywordDesc")})]}),(0,i.jsxs)(m.X.Tr,{children:[(0,i.jsx)(m.X.Td,{children:(0,i.jsx)(E,{children:"type"})}),(0,i.jsx)(m.X.Td,{children:e("jsonSchema.typeKeywordDesc")})]}),(0,i.jsxs)(m.X.Tr,{children:[(0,i.jsx)(m.X.Td,{children:(0,i.jsx)(E,{children:"properties"})}),(0,i.jsx)(m.X.Td,{children:e("jsonSchema.propertiesKeywordDesc")})]}),(0,i.jsxs)(m.X.Tr,{children:[(0,i.jsx)(m.X.Td,{children:(0,i.jsx)(E,{children:"required"})}),(0,i.jsx)(m.X.Td,{children:e("jsonSchema.requiredKeywordDesc")})]}),(0,i.jsxs)(m.X.Tr,{children:[(0,i.jsx)(m.X.Td,{children:(0,i.jsx)(E,{children:"enum"})}),(0,i.jsx)(m.X.Td,{children:e("jsonSchema.enumKeywordDesc")})]}),(0,i.jsxs)(m.X.Tr,{children:[(0,i.jsx)(m.X.Td,{children:(0,i.jsx)(E,{children:"minimum"})}),(0,i.jsx)(m.X.Td,{children:e("jsonSchema.minimumKeywordDesc")})]}),(0,i.jsxs)(m.X.Tr,{children:[(0,i.jsx)(m.X.Td,{children:(0,i.jsx)(E,{children:"maximum"})}),(0,i.jsx)(m.X.Td,{children:e("jsonSchema.maximumKeywordDesc")})]}),(0,i.jsxs)(m.X.Tr,{children:[(0,i.jsx)(m.X.Td,{children:(0,i.jsx)(E,{children:"minLength"})}),(0,i.jsx)(m.X.Td,{children:"Minimum length for strings"})]}),(0,i.jsxs)(m.X.Tr,{children:[(0,i.jsx)(m.X.Td,{children:(0,i.jsx)(E,{children:"maxLength"})}),(0,i.jsx)(m.X.Td,{children:"Maximum length for strings"})]}),(0,i.jsxs)(m.X.Tr,{children:[(0,i.jsx)(m.X.Td,{children:(0,i.jsx)(E,{children:"pattern"})}),(0,i.jsx)(m.X.Td,{children:"Regular expression pattern for strings"})]}),(0,i.jsxs)(m.X.Tr,{children:[(0,i.jsx)(m.X.Td,{children:(0,i.jsx)(E,{children:"items"})}),(0,i.jsx)(m.X.Td,{children:"Schema for array items"})]}),(0,i.jsxs)(m.X.Tr,{children:[(0,i.jsx)(m.X.Td,{children:(0,i.jsx)(E,{children:"minItems"})}),(0,i.jsx)(m.X.Td,{children:"Minimum number of items in array"})]}),(0,i.jsxs)(m.X.Tr,{children:[(0,i.jsx)(m.X.Td,{children:(0,i.jsx)(E,{children:"maxItems"})}),(0,i.jsx)(m.X.Td,{children:"Maximum number of items in array"})]})]})]})})]}),(0,i.jsxs)(h.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,i.jsx)(l.h,{mb:"md",order:2,c:"dark",children:e("jsonSchema.practicalExamplesTitle")}),(0,i.jsxs)(v,{children:[(0,i.jsxs)("div",{children:[(0,i.jsx)(o.E,{fw:600,mb:"xs",children:"Example 1: Simple User Schema"}),(0,i.jsx)(f.N,{code:`{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "User",
  "type": "object",
  "properties": {
    "username": {
      "type": "string",
      "minLength": 3,
      "maxLength": 20
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "age": {
      "type": "integer",
      "minimum": 0,
      "maximum": 120
    }
  },
  "required": ["username", "email"]
}`}),(0,i.jsx)(o.E,{c:"dimmed",size:"sm",mt:"xs",children:"Valid JSON:"}),(0,i.jsx)(f.N,{code:`{
  "username": "john_doe",
  "email": "john@example.com",
  "age": 30
}`})]}),(0,i.jsx)(j.c,{my:"md"}),(0,i.jsxs)("div",{children:[(0,i.jsx)(o.E,{fw:600,mb:"xs",children:"Example 2: Product with Enum"}),(0,i.jsx)(f.N,{code:`{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Product",
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "category": {
      "type": "string",
      "enum": ["electronics", "clothing", "food", "books"]
    },
    "price": {
      "type": "number",
      "minimum": 0
    },
    "inStock": {
      "type": "boolean"
    }
  },
  "required": ["name", "category", "price"]
}`})]}),(0,i.jsx)(j.c,{my:"md"}),(0,i.jsxs)("div",{children:[(0,i.jsx)(o.E,{fw:600,mb:"xs",children:"Example 3: Array of Objects"}),(0,i.jsx)(f.N,{code:`{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Users List",
  "type": "object",
  "properties": {
    "users": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer"
          },
          "name": {
            "type": "string"
          }
        },
        "required": ["id", "name"]
      },
      "minItems": 1
    }
  },
  "required": ["users"]
}`}),(0,i.jsx)(o.E,{c:"dimmed",size:"sm",mt:"xs",children:"Valid JSON:"}),(0,i.jsx)(f.N,{code:`{
  "users": [
    { "id": 1, "name": "Alice" },
    { "id": 2, "name": "Bob" }
  ]
}`})]}),(0,i.jsx)(j.c,{my:"md"}),(0,i.jsxs)("div",{children:[(0,i.jsx)(o.E,{fw:600,mb:"xs",children:"Example 4: Nested Objects"}),(0,i.jsx)(f.N,{code:`{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Person",
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "address": {
      "type": "object",
      "properties": {
        "street": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "zipCode": {
          "type": "string",
          "pattern": "^[0-9]{5}$"
        }
      },
      "required": ["street", "city", "zipCode"]
    }
  },
  "required": ["name", "address"]
}`})]}),(0,i.jsx)(j.c,{my:"md"}),(0,i.jsxs)("div",{children:[(0,i.jsx)(o.E,{fw:600,mb:"xs",children:"Example 5: String Pattern Validation"}),(0,i.jsx)(f.N,{code:`{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Contact",
  "type": "object",
  "properties": {
    "phone": {
      "type": "string",
      "pattern": "^\\\\+?[1-9]\\\\d{1,14}$",
      "description": "Phone number in E.164 format"
    },
    "website": {
      "type": "string",
      "format": "uri"
    }
  }
}`})]}),(0,i.jsx)(j.c,{my:"md"}),(0,i.jsxs)("div",{children:[(0,i.jsx)(o.E,{fw:600,mb:"xs",children:"Example 6: Advanced Schema with Definitions"}),(0,i.jsx)(o.E,{c:"dimmed",size:"sm",mb:"xs",children:e("jsonSchema.example6Desc")}),(0,i.jsx)(f.N,{code:`{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "Vehicle",
  "type": "object",
  "properties": {
    "vehicle": {
      "$ref": "#/definitions/VehicleType"
    }
  },
  "definitions": {
    "VehicleType": {
      "type": "object",
      "description": "A conveyance designed to carry an operator, passengers and/or cargo",
      "properties": {
        "identification": {
          "$ref": "#/definitions/IdentificationType"
        },
        "msrpAmount": {
          "$ref": "#/definitions/AmountType"
        },
        "axleQuantity": {
          "type": "integer",
          "minimum": 0,
          "description": "Number of axles"
        }
      },
      "required": ["identification"]
    },
    "IdentificationType": {
      "type": "object",
      "description": "A unique identification",
      "properties": {
        "id": {
          "type": "string",
          "description": "An identifier"
        }
      },
      "required": ["id"]
    },
    "AmountType": {
      "type": "object",
      "description": "An amount of money",
      "properties": {
        "amount": {
          "type": "number",
          "minimum": 0
        },
        "currency": {
          "type": "string",
          "enum": ["USD", "EUR", "GBP"],
          "description": "Currency code"
        }
      },
      "required": ["amount", "currency"]
    }
  }
}`}),(0,i.jsx)(o.E,{c:"dimmed",size:"sm",mt:"xs",children:"Valid JSON:"}),(0,i.jsx)(f.N,{code:`{
  "vehicle": {
    "identification": {
      "id": "VIN123456789"
    },
    "msrpAmount": {
      "amount": 25000,
      "currency": "USD"
    },
    "axleQuantity": 2
  }
}`})]})]})]}),(0,i.jsxs)(h.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,i.jsx)(l.h,{mb:"md",order:2,c:"dark",children:"Using Definitions and References"}),(0,i.jsxs)(v,{children:[(0,i.jsxs)(o.E,{children:[e("jsonSchema.definitionsDesc1")," ",(0,i.jsx)(E,{children:"definitions"})," ",e("jsonSchema.definitionsDesc2")," ",(0,i.jsx)(E,{children:"$ref"}),"."]}),(0,i.jsx)(o.E,{fw:600,mt:"md",mb:"xs",children:"Benefits:"}),(0,i.jsxs)(o.E,{children:["• ",e("jsonSchema.benefit1Def")]}),(0,i.jsxs)(o.E,{children:["• ",e("jsonSchema.benefit2Def")]}),(0,i.jsxs)(o.E,{children:["• ",e("jsonSchema.benefit3Def")]}),(0,i.jsxs)(o.E,{children:["• ",e("jsonSchema.benefit4Def")]}),(0,i.jsx)(o.E,{fw:600,mt:"md",mb:"xs",children:"Example:"}),(0,i.jsx)(f.N,{code:`{
  "definitions": {
    "Address": {
      "type": "object",
      "properties": {
        "street": { "type": "string" },
        "city": { "type": "string" }
      }
    }
  },
  "properties": {
    "billingAddress": {
      "$ref": "#/definitions/Address"
    },
    "shippingAddress": {
      "$ref": "#/definitions/Address"
    }
  }
}`})]})]}),(0,i.jsxs)(h.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,i.jsx)(l.h,{mb:"md",order:2,c:"dark",children:e("jsonSchema.dataTypesTitle")}),(0,i.jsx)(v,{children:(0,i.jsxs)(m.X,{striped:!0,highlightOnHover:!0,withTableBorder:!0,withColumnBorders:!0,children:[(0,i.jsx)(m.X.Thead,{children:(0,i.jsxs)(m.X.Tr,{children:[(0,i.jsx)(m.X.Th,{children:e("jsonSchema.tableType")}),(0,i.jsx)(m.X.Th,{children:e("jsonSchema.tableDescription")}),(0,i.jsx)(m.X.Th,{children:e("jsonSchema.tableExample")})]})}),(0,i.jsxs)(m.X.Tbody,{children:[(0,i.jsxs)(m.X.Tr,{children:[(0,i.jsx)(m.X.Td,{children:(0,i.jsx)(E,{children:"string"})}),(0,i.jsx)(m.X.Td,{children:e("jsonSchema.stringTypeDesc")}),(0,i.jsx)(m.X.Td,{children:(0,i.jsx)(E,{children:'"hello"'})})]}),(0,i.jsxs)(m.X.Tr,{children:[(0,i.jsx)(m.X.Td,{children:(0,i.jsx)(E,{children:"number"})}),(0,i.jsx)(m.X.Td,{children:e("jsonSchema.numberTypeDesc")}),(0,i.jsxs)(m.X.Td,{children:[(0,i.jsx)(E,{children:"42"}),","," ",(0,i.jsx)(E,{children:"3.14"})]})]}),(0,i.jsxs)(m.X.Tr,{children:[(0,i.jsx)(m.X.Td,{children:(0,i.jsx)(E,{children:"integer"})}),(0,i.jsx)(m.X.Td,{children:e("jsonSchema.integerTypeDesc")}),(0,i.jsx)(m.X.Td,{children:(0,i.jsx)(E,{children:"42"})})]}),(0,i.jsxs)(m.X.Tr,{children:[(0,i.jsx)(m.X.Td,{children:(0,i.jsx)(E,{children:"boolean"})}),(0,i.jsx)(m.X.Td,{children:e("jsonSchema.booleanTypeDesc")}),(0,i.jsxs)(m.X.Td,{children:[(0,i.jsx)(E,{children:"true"}),","," ",(0,i.jsx)(E,{children:"false"})]})]}),(0,i.jsxs)(m.X.Tr,{children:[(0,i.jsx)(m.X.Td,{children:(0,i.jsx)(E,{children:"object"})}),(0,i.jsx)(m.X.Td,{children:e("jsonSchema.objectTypeDesc")}),(0,i.jsx)(m.X.Td,{children:(0,i.jsx)(E,{children:'{"key": "value"}'})})]}),(0,i.jsxs)(m.X.Tr,{children:[(0,i.jsx)(m.X.Td,{children:(0,i.jsx)(E,{children:"array"})}),(0,i.jsx)(m.X.Td,{children:e("jsonSchema.arrayTypeDesc")}),(0,i.jsx)(m.X.Td,{children:(0,i.jsx)(E,{children:"[1, 2, 3]"})})]}),(0,i.jsxs)(m.X.Tr,{children:[(0,i.jsx)(m.X.Td,{children:(0,i.jsx)(E,{children:"null"})}),(0,i.jsx)(m.X.Td,{children:e("jsonSchema.nullTypeDesc")}),(0,i.jsx)(m.X.Td,{children:(0,i.jsx)(E,{children:"null"})})]})]})]})})]}),(0,i.jsxs)(h.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,i.jsx)(l.h,{mb:"md",order:2,c:"dark",children:e("jsonSchema.stringFormatsTitle")}),(0,i.jsxs)(v,{children:[(0,i.jsx)(o.E,{mb:"md",children:e("jsonSchema.stringFormatsDesc")}),(0,i.jsxs)(m.X,{striped:!0,highlightOnHover:!0,withTableBorder:!0,withColumnBorders:!0,children:[(0,i.jsx)(m.X.Thead,{children:(0,i.jsxs)(m.X.Tr,{children:[(0,i.jsx)(m.X.Th,{children:e("jsonSchema.tableFormat")}),(0,i.jsx)(m.X.Th,{children:e("jsonSchema.tableDescription")})]})}),(0,i.jsxs)(m.X.Tbody,{children:[(0,i.jsxs)(m.X.Tr,{children:[(0,i.jsx)(m.X.Td,{children:(0,i.jsx)(E,{children:"date-time"})}),(0,i.jsx)(m.X.Td,{children:e("jsonSchema.dateTimeFormatDesc")})]}),(0,i.jsxs)(m.X.Tr,{children:[(0,i.jsx)(m.X.Td,{children:(0,i.jsx)(E,{children:"date"})}),(0,i.jsx)(m.X.Td,{children:e("jsonSchema.dateFormatDesc")})]}),(0,i.jsxs)(m.X.Tr,{children:[(0,i.jsx)(m.X.Td,{children:(0,i.jsx)(E,{children:"time"})}),(0,i.jsx)(m.X.Td,{children:e("jsonSchema.timeFormatDesc")})]}),(0,i.jsxs)(m.X.Tr,{children:[(0,i.jsx)(m.X.Td,{children:(0,i.jsx)(E,{children:"email"})}),(0,i.jsx)(m.X.Td,{children:e("jsonSchema.emailFormatDesc")})]}),(0,i.jsxs)(m.X.Tr,{children:[(0,i.jsx)(m.X.Td,{children:(0,i.jsx)(E,{children:"uri"})}),(0,i.jsx)(m.X.Td,{children:e("jsonSchema.uriFormatDesc")})]}),(0,i.jsxs)(m.X.Tr,{children:[(0,i.jsx)(m.X.Td,{children:(0,i.jsx)(E,{children:"hostname"})}),(0,i.jsx)(m.X.Td,{children:e("jsonSchema.hostnameFormatDesc")})]}),(0,i.jsxs)(m.X.Tr,{children:[(0,i.jsx)(m.X.Td,{children:(0,i.jsx)(E,{children:"ipv4"})}),(0,i.jsx)(m.X.Td,{children:e("jsonSchema.ipv4FormatDesc")})]}),(0,i.jsxs)(m.X.Tr,{children:[(0,i.jsx)(m.X.Td,{children:(0,i.jsx)(E,{children:"ipv6"})}),(0,i.jsx)(m.X.Td,{children:e("jsonSchema.ipv6FormatDesc")})]})]})]})]})]}),(0,i.jsxs)(h.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,i.jsx)(l.h,{mb:"md",order:2,c:"dark",children:e("jsonSchema.tipsTitle")}),(0,i.jsxs)(v,{children:[(0,i.jsxs)("div",{children:[(0,i.jsx)(o.E,{fw:600,children:e("jsonSchema.tip0")}),(0,i.jsx)(o.E,{children:e("jsonSchema.tip0Desc")})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)(o.E,{fw:600,children:e("jsonSchema.tipUseDesc")}),(0,i.jsxs)(o.E,{children:[e("jsonSchema.tipUseDescText1")," ",(0,i.jsx)(E,{children:"description"})," ",e("jsonSchema.tipUseDescText2")]})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)(o.E,{fw:600,children:e("jsonSchema.tip1")}),(0,i.jsx)(o.E,{children:e("jsonSchema.tip1Desc")})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)(o.E,{fw:600,children:e("jsonSchema.tip2")}),(0,i.jsx)(o.E,{children:e("jsonSchema.tip2Desc")})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)(o.E,{fw:600,children:e("jsonSchema.tip3")}),(0,i.jsx)(o.E,{children:e("jsonSchema.tip3Desc")})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)(o.E,{fw:600,children:e("jsonSchema.tip4")}),(0,i.jsx)(o.E,{children:e("jsonSchema.tip4Desc")})]})]})]}),(0,i.jsx)(u.q,{title:e("common.relatedReading"),previous:{label:e("common.previous"),title:e("typeGeneration.title"),href:s("/docs/type-generation")},next:{label:e("common.next"),title:e("jqQuery.title"),href:s("/docs/jq-query")}}),(0,i.jsxs)(h.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,i.jsx)(l.h,{mb:"md",order:3,c:"dark",children:e("common.needHelp")}),(0,i.jsx)(v,{children:(0,i.jsxs)(o.E,{children:[e("common.needHelpText")," ",(0,i.jsx)(w,{href:"/docs",children:e("common.documentation")})," ",e("common.orTry")," ",(0,i.jsx)(w,{href:"/editor",children:e("common.editor")})," ",e("common.directly"),"."]})})]})]})})]})}},83888:(e,r,s)=>{"use strict";s.d(r,{F:()=>x});var i=s(37876),n=s(36385);s(14232);var d=s(46249),c=s(1609),t=s(99545),l=s(88791),o=s(95171),a=s(80385),h=s(17457),m={root:"m_66836ed3",wrapper:"m_a5d60502",body:"m_667c2793",title:"m_6a03f287",label:"m_698f4f23",icon:"m_667f2a6a",message:"m_7fa78076",closeButton:"m_87f54839"};let j=(0,c.V)((e,{radius:r,color:s,variant:i,autoContrast:n})=>{let c=e.variantColorResolver({color:s||e.primaryColor,theme:e,variant:i||"light",autoContrast:n});return{root:{"--alert-radius":void 0===r?void 0:(0,d.nJ)(r),"--alert-bg":s||i?c.background:void 0,"--alert-color":c.color,"--alert-bd":s||i?c.border:void 0}}}),x=(0,a.P9)((e,r)=>{let s=(0,t.Y)("Alert",null,e),{classNames:d,className:c,style:a,styles:x,unstyled:p,vars:b,radius:f,color:u,title:T,children:y,id:g,icon:X,withCloseButton:S,onClose:v,closeButtonLabel:w,variant:E,autoContrast:D,role:k,attributes:B,...C}=s,_=(0,l.I)({name:"Alert",classes:m,props:s,className:c,style:a,classNames:d,styles:x,unstyled:p,attributes:B,vars:b,varsResolver:j}),A=(0,n.B)(g),N=T&&`${A}-title`||void 0,$=`${A}-body`;return(0,i.jsx)(o.a,{id:A,..._("root",{variant:E}),variant:E,ref:r,role:k||"alert",...C,"aria-describedby":y?$:void 0,"aria-labelledby":T?N:void 0,children:(0,i.jsxs)("div",{..._("wrapper"),children:[X&&(0,i.jsx)("div",{..._("icon"),children:X}),(0,i.jsxs)("div",{..._("body"),children:[T&&(0,i.jsx)("div",{..._("title"),"data-with-close-button":S||void 0,children:(0,i.jsx)("span",{id:N,..._("label"),children:T})}),y&&(0,i.jsx)("div",{id:$,..._("message"),"data-variant":E,children:y})]}),S&&(0,i.jsx)(h.J,{..._("closeButton"),onClick:v,variant:"transparent",size:16,iconSize:16,"aria-label":w,unstyled:p})]})})});x.classes=m,x.displayName="@mantine/core/Alert"}},e=>{e.O(0,[28585,74938,96701,51287,60815,29951,2732,52509,16433,95096,98985,27777,96008,90636,46593,38792],()=>e(e.s=56356)),_N_E=e.O()}]);
//# sourceMappingURL=json-schema-45cfc6bb708917df.js.map