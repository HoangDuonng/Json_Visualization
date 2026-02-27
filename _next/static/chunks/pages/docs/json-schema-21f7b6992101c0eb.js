(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[99762],{20878:(e,i,s)=>{"use strict";s.d(i,{N:()=>o});var r=s(37876);s(14232);var n=s(31158),d=s(86068),c=s(80825),t=s(35729);let l=n.Ay.div.withConfig({componentId:"sc-6d0fa89e-0"})(["pre{font-family:"," !important;border-radius:8px;margin:0;background:#fefcf7 !important;border:1px solid #e8e4db;*{font-family:"," !important;}}"],t.j,t.j),o=({code:e,language:i="json"})=>(0,r.jsx)(l,{children:(0,r.jsx)(d.A,{language:i,style:c.Je,customStyle:{padding:"1rem"},children:e})})},37763:(e,i,s)=>{"use strict";s.d(i,{q:()=>p});var r=s(37876);s(14232);var n=s(48230),d=s.n(n),c=s(89704),t=s(45050),l=s(8291),o=s(79021),a=s(31158);let h=(0,a.Ay)(c.t).withConfig({componentId:"sc-13fd06cf-0"})(["height:100%;cursor:pointer;transition:all 0.25s ease;background:#ffffff;border:1px solid #e8e4db;&:hover{transform:translateY(-2px);box-shadow:0 10px 24px rgba(26,26,26,0.12);}"]),m=(0,a.Ay)(t.E).withConfig({componentId:"sc-13fd06cf-1"})(["text-transform:uppercase;letter-spacing:0.1em;font-size:0.7rem;color:#868e96;"]),j=a.Ay.div.withConfig({componentId:"sc-13fd06cf-2"})(["display:grid;grid-template-columns:1fr 1fr;gap:16px;@media (max-width:768px){grid-template-columns:1fr;}"]),x=a.Ay.div.withConfig({componentId:"sc-13fd06cf-3"})(["grid-column:",";@media (max-width:768px){grid-column:auto;}"],e=>"right"===e.$align?"2 / 3":"auto"),p=({title:e,previous:i,next:s})=>i||s?(0,r.jsxs)(c.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,r.jsx)(l.h,{mb:"md",order:3,c:"dark",children:e}),(0,r.jsxs)(j,{children:[i&&(0,r.jsx)(x,{children:(0,r.jsx)(d(),{href:i.href,style:{textDecoration:"none",color:"inherit"},"aria-label":`${i.label}: ${i.title}`,children:(0,r.jsx)(h,{p:"lg",radius:"md",children:(0,r.jsxs)(o.B,{gap:6,children:[(0,r.jsx)(m,{children:i.label}),(0,r.jsx)(t.E,{fw:600,c:"dark",children:i.title})]})})})}),s&&(0,r.jsx)(x,{$align:i?"left":"right",children:(0,r.jsx)(d(),{href:s.href,style:{textDecoration:"none",color:"inherit"},"aria-label":`${s.label}: ${s.title}`,children:(0,r.jsx)(h,{p:"lg",radius:"md",children:(0,r.jsxs)(o.B,{gap:6,children:[(0,r.jsx)(m,{children:s.label}),(0,r.jsx)(t.E,{fw:600,c:"dark",children:s.title})]})})})})]})]}):null},43839:(e,i,s)=>{"use strict";s.d(i,{X:()=>B});var r=s(37876),n=s(63108);s(14232);var d=s(46249),c=s(1609),t=s(64453),l=s(99545),o=s(88791),a=s(95171),h=s(80385);let[m,j]=(0,s(98671).F)("Table component was not found in the tree");var x={table:"m_b23fa0ef",th:"m_4e7aa4f3",tr:"m_4e7aa4fd",td:"m_4e7aa4ef",tbody:"m_b2404537",thead:"m_b242d975",caption:"m_9e5a3ac7",scrollContainer:"m_a100c15",scrollContainerInner:"m_62259741"};function p(e,i){let s=`Table${e.charAt(0).toUpperCase()}${e.slice(1)}`,n=(0,h.P9)((n,d)=>{let c=(0,l.Y)(s,{},n),{classNames:t,className:o,style:h,styles:m,...x}=c,p=j();return(0,r.jsx)(a.a,{component:e,ref:d,...function(e,i){if(!i)return;let s={};return i.columnBorder&&e.withColumnBorders&&(s["data-with-column-border"]=!0),i.rowBorder&&e.withRowBorders&&(s["data-with-row-border"]=!0),i.striped&&e.striped&&(s["data-striped"]=e.striped),i.highlightOnHover&&e.highlightOnHover&&(s["data-hover"]=!0),i.captionSide&&e.captionSide&&(s["data-side"]=e.captionSide),i.stickyHeader&&e.stickyHeader&&(s["data-sticky"]=!0),s}(p,i),...p.getStyles(e,{className:o,classNames:t,style:h,styles:m,props:c}),...x})});return n.displayName=`@mantine/core/${s}`,n.classes=x,n}let b=p("th",{columnBorder:!0}),f=p("td",{columnBorder:!0}),u=p("tr",{rowBorder:!0,striped:!0,highlightOnHover:!0}),T=p("thead",{stickyHeader:!0}),y=p("tbody"),g=p("tfoot"),S=p("caption",{captionSide:!0});function X({data:e}){return(0,r.jsxs)(r.Fragment,{children:[e.caption&&(0,r.jsx)(S,{children:e.caption}),e.head&&(0,r.jsx)(T,{children:(0,r.jsx)(u,{children:e.head.map((e,i)=>(0,r.jsx)(b,{children:e},i))})}),e.body&&(0,r.jsx)(y,{children:e.body.map((e,i)=>(0,r.jsx)(u,{children:e.map((e,i)=>(0,r.jsx)(f,{children:e},i))},i))}),e.foot&&(0,r.jsx)(g,{children:(0,r.jsx)(u,{children:e.foot.map((e,i)=>(0,r.jsx)(b,{children:e},i))})})]})}X.displayName="@mantine/core/TableDataRenderer";var w=s(16433);let v={type:"scrollarea"},E=(0,c.V)((e,{minWidth:i,maxHeight:s,type:r})=>({scrollContainer:{"--table-min-width":(0,n.D)(i),"--table-max-height":(0,n.D)(s),"--table-overflow":"native"===r?"auto":void 0}})),D=(0,h.P9)((e,i)=>{let s=(0,l.Y)("TableScrollContainer",v,e),{classNames:n,className:d,style:c,styles:t,unstyled:h,vars:m,children:j,minWidth:p,maxHeight:b,type:f,scrollAreaProps:u,attributes:T,...y}=s,g=(0,o.I)({name:"TableScrollContainer",classes:x,props:s,className:d,style:c,classNames:n,styles:t,unstyled:h,attributes:T,vars:m,varsResolver:E,rootSelector:"scrollContainer"});return(0,r.jsx)(a.a,{component:"scrollarea"===f?w.F:"div",..."scrollarea"===f?b?{offsetScrollbars:"xy",...u}:{offsetScrollbars:"x",...u}:{},ref:i,...g("scrollContainer"),...y,children:(0,r.jsx)("div",{...g("scrollContainerInner"),children:j})})});D.classes=x,D.displayName="@mantine/core/TableScrollContainer";let k={withRowBorders:!0,verticalSpacing:7},C=(0,c.V)((e,{layout:i,captionSide:s,horizontalSpacing:r,verticalSpacing:c,borderColor:l,stripedColor:o,highlightOnHoverColor:a,striped:h,highlightOnHover:m,stickyHeaderOffset:j,stickyHeader:x})=>({table:{"--table-layout":i,"--table-caption-side":s,"--table-horizontal-spacing":(0,d.GY)(r),"--table-vertical-spacing":(0,d.GY)(c),"--table-border-color":l?(0,t.r)(l,e):void 0,"--table-striped-color":h&&o?(0,t.r)(o,e):void 0,"--table-highlight-on-hover-color":m&&a?(0,t.r)(a,e):void 0,"--table-sticky-header-offset":x?(0,n.D)(j):void 0}})),B=(0,h.P9)((e,i)=>{let s=(0,l.Y)("Table",k,e),{classNames:n,className:d,style:c,styles:t,unstyled:h,vars:j,horizontalSpacing:p,verticalSpacing:b,captionSide:f,stripedColor:u,highlightOnHoverColor:T,striped:y,highlightOnHover:g,withColumnBorders:S,withRowBorders:w,withTableBorder:v,borderColor:E,layout:D,variant:B,data:A,children:$,stickyHeader:_,stickyHeaderOffset:N,mod:I,tabularNums:z,attributes:q,...F}=s,P=(0,o.I)({name:"Table",props:s,className:d,style:c,classes:x,classNames:n,styles:t,unstyled:h,attributes:q,rootSelector:"table",vars:j,varsResolver:C});return(0,r.jsx)(m,{value:{getStyles:P,stickyHeader:_,striped:!0===y?"odd":y||void 0,highlightOnHover:g,withColumnBorders:S,withRowBorders:w,captionSide:f||"bottom"},children:(0,r.jsx)(a.a,{component:"table",variant:B,ref:i,mod:[{"data-with-table-border":v,"data-tabular-nums":z},I],...P("table"),...F,children:$||!!A&&(0,r.jsx)(X,{data:A})})})});B.classes=x,B.displayName="@mantine/core/Table",B.Td=f,B.Th=b,B.Tr=u,B.Thead=T,B.Tbody=y,B.Tfoot=g,B.Caption=S,B.ScrollContainer=D,B.DataRenderer=X},56356:(e,i,s)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/docs/json-schema",function(){return s(67840)}])},61342:(e,i,s)=>{"use strict";s.d(i,{c:()=>x});var r=s(37876);s(14232);var n=s(46249),d=s(1609),c=s(64453),t=s(99545),l=s(88791),o=s(95171),a=s(80385),h={root:"m_3eebeb36",label:"m_9e365f20"};let m={orientation:"horizontal"},j=(0,d.V)((e,{color:i,variant:s,size:r})=>({root:{"--divider-color":i?(0,c.r)(i,e):void 0,"--divider-border-style":s,"--divider-size":(0,n.YC)(r,"divider-size")}})),x=(0,a.P9)((e,i)=>{let s=(0,t.Y)("Divider",m,e),{classNames:n,className:d,style:c,styles:a,unstyled:x,vars:p,color:b,orientation:f,label:u,labelPosition:T,mod:y,attributes:g,...S}=s,X=(0,l.I)({name:"Divider",classes:h,props:s,className:d,style:c,classNames:n,styles:a,unstyled:x,attributes:g,vars:p,varsResolver:j});return(0,r.jsx)(o.a,{ref:i,mod:[{orientation:f,"with-label":!!u},y],...X("root"),...S,role:"separator",children:u&&(0,r.jsx)(o.a,{component:"span",mod:{position:T},...X("label"),children:u})})});x.classes=h,x.displayName="@mantine/core/Divider"},67840:(e,i,s)=>{"use strict";s.r(i),s.d(i,{default:()=>k});var r=s(37876);s(14232);var n=s(77328),d=s.n(n),c=s(33752),t=s(79021),l=s(8291),o=s(45050),a=s(83888),h=s(89704),m=s(43839),j=s(61342),x=s(31158),p=s(41988),b=s(27592),f=s(20878),u=s(37763),T=s(82301),y=s(96008),g=s(35729),S=s(20944),X=s(85654),w=s(27822);let v=x.Ay.div.withConfig({componentId:"sc-8c971262-0"})(["display:flex;flex-direction:column;gap:16px;line-height:1.7;"]),E=x.Ay.a.withConfig({componentId:"sc-8c971262-1"})(["color:#228be6;text-decoration:none;font-weight:500;&:hover{text-decoration:underline;}"]),D=x.Ay.code.withConfig({componentId:"sc-8c971262-2"})(["background:#f8f9fa;padding:2px 6px;border-radius:4px;font-family:"," !important;font-size:0.9em;border:1px solid #e9ecef;"],g.j),k=()=>{let{t:e,locale:i}=(0,X.Bd)("docs"),s=e=>"vi"===i?`${e}?lang=vi`:e,n=[{id:"what-is",label:e("jsonSchema.whatIsTitle")},{id:"how-to-use",label:e("jsonSchema.howToUseTitle")},{id:"basic-schema",label:e("jsonSchema.basicSchemaTitle")},{id:"common-keywords",label:e("jsonSchema.commonKeywordsTitle")},{id:"practical-examples",label:e("jsonSchema.practicalExamplesTitle")},{id:"definitions",label:e("jsonSchema.definitionsTitle")},{id:"data-types",label:e("jsonSchema.dataTypesTitle")},{id:"string-formats",label:e("jsonSchema.stringFormatsTitle")},{id:"tips",label:e("jsonSchema.tipsTitle")}];return(0,r.jsxs)(w.A,{children:[(0,r.jsx)(d(),{children:(0,p.U)({...S.k,title:`${e("jsonSchema.title")} Documentation - JSON Visualization`,description:e("jsonSchema.subtitle"),canonical:`https://jsonviz.online/${"vi"===i?"vi/":""}docs/json-schema`})}),(0,r.jsx)(c.m,{size:"lg",py:60,children:(0,r.jsxs)(t.B,{gap:"xl",children:[(0,r.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[(0,r.jsxs)("div",{children:[(0,r.jsx)(l.h,{order:1,c:"dark",mb:"sm",children:e("jsonSchema.title")}),(0,r.jsx)(o.E,{size:"lg",c:"dimmed",children:e("jsonSchema.subtitle")})]}),(0,r.jsx)(y.c,{})]}),(0,r.jsx)(a.F,{icon:(0,r.jsx)(b.$Mj,{size:20}),color:"cyan",variant:"light",styles:{message:{color:"#1971c2"}},children:e("jsonSchema.alert")}),(0,r.jsx)(T.W,{title:e("common.onThisPage"),items:n}),(0,r.jsxs)(h.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,r.jsx)(l.h,{id:"what-is",mb:"md",order:2,c:"dark",children:e("jsonSchema.whatIsTitle")}),(0,r.jsxs)(v,{children:[(0,r.jsx)(o.E,{children:e("jsonSchema.whatIsDesc")}),(0,r.jsx)(o.E,{children:e("jsonSchema.whatIsUsage")}),(0,r.jsxs)(o.E,{children:["• ",e("jsonSchema.usage1")]}),(0,r.jsxs)(o.E,{children:["• ",e("jsonSchema.usage2")]}),(0,r.jsxs)(o.E,{children:["• ",e("jsonSchema.usage3")]}),(0,r.jsxs)(o.E,{children:["• ",e("jsonSchema.usage4")]})]})]}),(0,r.jsxs)(h.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,r.jsx)(l.h,{id:"how-to-use",mb:"md",order:2,c:"dark",children:e("jsonSchema.howToUseTitle")}),(0,r.jsxs)(v,{children:[(0,r.jsxs)("div",{children:[(0,r.jsx)(o.E,{fw:600,mb:"xs",children:e("jsonSchema.step1")}),(0,r.jsxs)(o.E,{children:[e("jsonSchema.step1Desc")," ",(0,r.jsx)(E,{href:s("/editor"),children:e("common.editor")}),"."]})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)(o.E,{fw:600,mb:"xs",children:e("jsonSchema.step2")}),(0,r.jsx)(o.E,{children:e("jsonSchema.step2Desc")})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)(o.E,{fw:600,mb:"xs",children:e("jsonSchema.step3")}),(0,r.jsx)(o.E,{children:e("jsonSchema.step3Desc")})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)(o.E,{fw:600,mb:"xs",children:e("jsonSchema.step4")}),(0,r.jsx)(o.E,{children:e("jsonSchema.step4Desc")})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)(o.E,{fw:600,mb:"xs",children:e("jsonSchema.step5")}),(0,r.jsx)(o.E,{children:e("jsonSchema.step5Desc")})]})]})]}),(0,r.jsxs)(h.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,r.jsx)(l.h,{id:"basic-schema",mb:"md",order:2,c:"dark",children:e("jsonSchema.basicSchemaTitle")}),(0,r.jsxs)(v,{children:[(0,r.jsx)(o.E,{children:e("jsonSchema.basicSchemaDesc")}),(0,r.jsx)(f.N,{code:`{
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
}`})]})]}),(0,r.jsxs)(h.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,r.jsx)(l.h,{id:"common-keywords",mb:"md",order:2,c:"dark",children:e("jsonSchema.commonKeywordsTitle")}),(0,r.jsx)(v,{children:(0,r.jsxs)(m.X,{striped:!0,highlightOnHover:!0,withTableBorder:!0,withColumnBorders:!0,children:[(0,r.jsx)(m.X.Thead,{children:(0,r.jsxs)(m.X.Tr,{children:[(0,r.jsx)(m.X.Th,{children:e("jsonSchema.tableKeyword")}),(0,r.jsx)(m.X.Th,{children:e("jsonSchema.tableDescription")})]})}),(0,r.jsxs)(m.X.Tbody,{children:[(0,r.jsxs)(m.X.Tr,{children:[(0,r.jsx)(m.X.Td,{children:(0,r.jsx)(D,{children:"$schema"})}),(0,r.jsx)(m.X.Td,{children:e("jsonSchema.schemaKeywordDesc")})]}),(0,r.jsxs)(m.X.Tr,{children:[(0,r.jsx)(m.X.Td,{children:(0,r.jsx)(D,{children:"title"})}),(0,r.jsx)(m.X.Td,{children:e("jsonSchema.titleKeywordDesc")})]}),(0,r.jsxs)(m.X.Tr,{children:[(0,r.jsx)(m.X.Td,{children:(0,r.jsx)(D,{children:"description"})}),(0,r.jsx)(m.X.Td,{children:e("jsonSchema.descriptionKeywordDesc")})]}),(0,r.jsxs)(m.X.Tr,{children:[(0,r.jsx)(m.X.Td,{children:(0,r.jsx)(D,{children:"type"})}),(0,r.jsx)(m.X.Td,{children:e("jsonSchema.typeKeywordDesc")})]}),(0,r.jsxs)(m.X.Tr,{children:[(0,r.jsx)(m.X.Td,{children:(0,r.jsx)(D,{children:"properties"})}),(0,r.jsx)(m.X.Td,{children:e("jsonSchema.propertiesKeywordDesc")})]}),(0,r.jsxs)(m.X.Tr,{children:[(0,r.jsx)(m.X.Td,{children:(0,r.jsx)(D,{children:"required"})}),(0,r.jsx)(m.X.Td,{children:e("jsonSchema.requiredKeywordDesc")})]}),(0,r.jsxs)(m.X.Tr,{children:[(0,r.jsx)(m.X.Td,{children:(0,r.jsx)(D,{children:"enum"})}),(0,r.jsx)(m.X.Td,{children:e("jsonSchema.enumKeywordDesc")})]}),(0,r.jsxs)(m.X.Tr,{children:[(0,r.jsx)(m.X.Td,{children:(0,r.jsx)(D,{children:"minimum"})}),(0,r.jsx)(m.X.Td,{children:e("jsonSchema.minimumKeywordDesc")})]}),(0,r.jsxs)(m.X.Tr,{children:[(0,r.jsx)(m.X.Td,{children:(0,r.jsx)(D,{children:"maximum"})}),(0,r.jsx)(m.X.Td,{children:e("jsonSchema.maximumKeywordDesc")})]}),(0,r.jsxs)(m.X.Tr,{children:[(0,r.jsx)(m.X.Td,{children:(0,r.jsx)(D,{children:"minLength"})}),(0,r.jsx)(m.X.Td,{children:"Minimum length for strings"})]}),(0,r.jsxs)(m.X.Tr,{children:[(0,r.jsx)(m.X.Td,{children:(0,r.jsx)(D,{children:"maxLength"})}),(0,r.jsx)(m.X.Td,{children:"Maximum length for strings"})]}),(0,r.jsxs)(m.X.Tr,{children:[(0,r.jsx)(m.X.Td,{children:(0,r.jsx)(D,{children:"pattern"})}),(0,r.jsx)(m.X.Td,{children:"Regular expression pattern for strings"})]}),(0,r.jsxs)(m.X.Tr,{children:[(0,r.jsx)(m.X.Td,{children:(0,r.jsx)(D,{children:"items"})}),(0,r.jsx)(m.X.Td,{children:"Schema for array items"})]}),(0,r.jsxs)(m.X.Tr,{children:[(0,r.jsx)(m.X.Td,{children:(0,r.jsx)(D,{children:"minItems"})}),(0,r.jsx)(m.X.Td,{children:"Minimum number of items in array"})]}),(0,r.jsxs)(m.X.Tr,{children:[(0,r.jsx)(m.X.Td,{children:(0,r.jsx)(D,{children:"maxItems"})}),(0,r.jsx)(m.X.Td,{children:"Maximum number of items in array"})]})]})]})})]}),(0,r.jsxs)(h.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,r.jsx)(l.h,{id:"practical-examples",mb:"md",order:2,c:"dark",children:e("jsonSchema.practicalExamplesTitle")}),(0,r.jsxs)(v,{children:[(0,r.jsxs)("div",{children:[(0,r.jsx)(o.E,{fw:600,mb:"xs",children:"Example 1: Simple User Schema"}),(0,r.jsx)(f.N,{code:`{
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
}`}),(0,r.jsx)(o.E,{c:"dimmed",size:"sm",mt:"xs",children:"Valid JSON:"}),(0,r.jsx)(f.N,{code:`{
  "username": "john_doe",
  "email": "john@example.com",
  "age": 30
}`})]}),(0,r.jsx)(j.c,{my:"md"}),(0,r.jsxs)("div",{children:[(0,r.jsx)(o.E,{fw:600,mb:"xs",children:"Example 2: Product with Enum"}),(0,r.jsx)(f.N,{code:`{
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
}`})]}),(0,r.jsx)(j.c,{my:"md"}),(0,r.jsxs)("div",{children:[(0,r.jsx)(o.E,{fw:600,mb:"xs",children:"Example 3: Array of Objects"}),(0,r.jsx)(f.N,{code:`{
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
}`}),(0,r.jsx)(o.E,{c:"dimmed",size:"sm",mt:"xs",children:"Valid JSON:"}),(0,r.jsx)(f.N,{code:`{
  "users": [
    { "id": 1, "name": "Alice" },
    { "id": 2, "name": "Bob" }
  ]
}`})]}),(0,r.jsx)(j.c,{my:"md"}),(0,r.jsxs)("div",{children:[(0,r.jsx)(o.E,{fw:600,mb:"xs",children:"Example 4: Nested Objects"}),(0,r.jsx)(f.N,{code:`{
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
}`})]}),(0,r.jsx)(j.c,{my:"md"}),(0,r.jsxs)("div",{children:[(0,r.jsx)(o.E,{fw:600,mb:"xs",children:"Example 5: String Pattern Validation"}),(0,r.jsx)(f.N,{code:`{
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
}`})]}),(0,r.jsx)(j.c,{my:"md"}),(0,r.jsxs)("div",{children:[(0,r.jsx)(o.E,{fw:600,mb:"xs",children:"Example 6: Advanced Schema with Definitions"}),(0,r.jsx)(o.E,{c:"dimmed",size:"sm",mb:"xs",children:e("jsonSchema.example6Desc")}),(0,r.jsx)(f.N,{code:`{
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
}`}),(0,r.jsx)(o.E,{c:"dimmed",size:"sm",mt:"xs",children:"Valid JSON:"}),(0,r.jsx)(f.N,{code:`{
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
}`})]})]})]}),(0,r.jsxs)(h.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,r.jsx)(l.h,{id:"definitions",mb:"md",order:2,c:"dark",children:e("jsonSchema.definitionsTitle")}),(0,r.jsxs)(v,{children:[(0,r.jsxs)(o.E,{children:[e("jsonSchema.definitionsDesc1")," ",(0,r.jsx)(D,{children:"definitions"})," ",e("jsonSchema.definitionsDesc2")," ",(0,r.jsx)(D,{children:"$ref"}),"."]}),(0,r.jsx)(o.E,{fw:600,mt:"md",mb:"xs",children:"Benefits:"}),(0,r.jsxs)(o.E,{children:["• ",e("jsonSchema.benefit1Def")]}),(0,r.jsxs)(o.E,{children:["• ",e("jsonSchema.benefit2Def")]}),(0,r.jsxs)(o.E,{children:["• ",e("jsonSchema.benefit3Def")]}),(0,r.jsxs)(o.E,{children:["• ",e("jsonSchema.benefit4Def")]}),(0,r.jsx)(o.E,{fw:600,mt:"md",mb:"xs",children:"Example:"}),(0,r.jsx)(f.N,{code:`{
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
}`})]})]}),(0,r.jsxs)(h.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,r.jsx)(l.h,{id:"data-types",mb:"md",order:2,c:"dark",children:e("jsonSchema.dataTypesTitle")}),(0,r.jsx)(v,{children:(0,r.jsxs)(m.X,{striped:!0,highlightOnHover:!0,withTableBorder:!0,withColumnBorders:!0,children:[(0,r.jsx)(m.X.Thead,{children:(0,r.jsxs)(m.X.Tr,{children:[(0,r.jsx)(m.X.Th,{children:e("jsonSchema.tableType")}),(0,r.jsx)(m.X.Th,{children:e("jsonSchema.tableDescription")}),(0,r.jsx)(m.X.Th,{children:e("jsonSchema.tableExample")})]})}),(0,r.jsxs)(m.X.Tbody,{children:[(0,r.jsxs)(m.X.Tr,{children:[(0,r.jsx)(m.X.Td,{children:(0,r.jsx)(D,{children:"string"})}),(0,r.jsx)(m.X.Td,{children:e("jsonSchema.stringTypeDesc")}),(0,r.jsx)(m.X.Td,{children:(0,r.jsx)(D,{children:'"hello"'})})]}),(0,r.jsxs)(m.X.Tr,{children:[(0,r.jsx)(m.X.Td,{children:(0,r.jsx)(D,{children:"number"})}),(0,r.jsx)(m.X.Td,{children:e("jsonSchema.numberTypeDesc")}),(0,r.jsxs)(m.X.Td,{children:[(0,r.jsx)(D,{children:"42"}),","," ",(0,r.jsx)(D,{children:"3.14"})]})]}),(0,r.jsxs)(m.X.Tr,{children:[(0,r.jsx)(m.X.Td,{children:(0,r.jsx)(D,{children:"integer"})}),(0,r.jsx)(m.X.Td,{children:e("jsonSchema.integerTypeDesc")}),(0,r.jsx)(m.X.Td,{children:(0,r.jsx)(D,{children:"42"})})]}),(0,r.jsxs)(m.X.Tr,{children:[(0,r.jsx)(m.X.Td,{children:(0,r.jsx)(D,{children:"boolean"})}),(0,r.jsx)(m.X.Td,{children:e("jsonSchema.booleanTypeDesc")}),(0,r.jsxs)(m.X.Td,{children:[(0,r.jsx)(D,{children:"true"}),","," ",(0,r.jsx)(D,{children:"false"})]})]}),(0,r.jsxs)(m.X.Tr,{children:[(0,r.jsx)(m.X.Td,{children:(0,r.jsx)(D,{children:"object"})}),(0,r.jsx)(m.X.Td,{children:e("jsonSchema.objectTypeDesc")}),(0,r.jsx)(m.X.Td,{children:(0,r.jsx)(D,{children:'{"key": "value"}'})})]}),(0,r.jsxs)(m.X.Tr,{children:[(0,r.jsx)(m.X.Td,{children:(0,r.jsx)(D,{children:"array"})}),(0,r.jsx)(m.X.Td,{children:e("jsonSchema.arrayTypeDesc")}),(0,r.jsx)(m.X.Td,{children:(0,r.jsx)(D,{children:"[1, 2, 3]"})})]}),(0,r.jsxs)(m.X.Tr,{children:[(0,r.jsx)(m.X.Td,{children:(0,r.jsx)(D,{children:"null"})}),(0,r.jsx)(m.X.Td,{children:e("jsonSchema.nullTypeDesc")}),(0,r.jsx)(m.X.Td,{children:(0,r.jsx)(D,{children:"null"})})]})]})]})})]}),(0,r.jsxs)(h.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,r.jsx)(l.h,{id:"string-formats",mb:"md",order:2,c:"dark",children:e("jsonSchema.stringFormatsTitle")}),(0,r.jsxs)(v,{children:[(0,r.jsx)(o.E,{mb:"md",children:e("jsonSchema.stringFormatsDesc")}),(0,r.jsxs)(m.X,{striped:!0,highlightOnHover:!0,withTableBorder:!0,withColumnBorders:!0,children:[(0,r.jsx)(m.X.Thead,{children:(0,r.jsxs)(m.X.Tr,{children:[(0,r.jsx)(m.X.Th,{children:e("jsonSchema.tableFormat")}),(0,r.jsx)(m.X.Th,{children:e("jsonSchema.tableDescription")})]})}),(0,r.jsxs)(m.X.Tbody,{children:[(0,r.jsxs)(m.X.Tr,{children:[(0,r.jsx)(m.X.Td,{children:(0,r.jsx)(D,{children:"date-time"})}),(0,r.jsx)(m.X.Td,{children:e("jsonSchema.dateTimeFormatDesc")})]}),(0,r.jsxs)(m.X.Tr,{children:[(0,r.jsx)(m.X.Td,{children:(0,r.jsx)(D,{children:"date"})}),(0,r.jsx)(m.X.Td,{children:e("jsonSchema.dateFormatDesc")})]}),(0,r.jsxs)(m.X.Tr,{children:[(0,r.jsx)(m.X.Td,{children:(0,r.jsx)(D,{children:"time"})}),(0,r.jsx)(m.X.Td,{children:e("jsonSchema.timeFormatDesc")})]}),(0,r.jsxs)(m.X.Tr,{children:[(0,r.jsx)(m.X.Td,{children:(0,r.jsx)(D,{children:"email"})}),(0,r.jsx)(m.X.Td,{children:e("jsonSchema.emailFormatDesc")})]}),(0,r.jsxs)(m.X.Tr,{children:[(0,r.jsx)(m.X.Td,{children:(0,r.jsx)(D,{children:"uri"})}),(0,r.jsx)(m.X.Td,{children:e("jsonSchema.uriFormatDesc")})]}),(0,r.jsxs)(m.X.Tr,{children:[(0,r.jsx)(m.X.Td,{children:(0,r.jsx)(D,{children:"hostname"})}),(0,r.jsx)(m.X.Td,{children:e("jsonSchema.hostnameFormatDesc")})]}),(0,r.jsxs)(m.X.Tr,{children:[(0,r.jsx)(m.X.Td,{children:(0,r.jsx)(D,{children:"ipv4"})}),(0,r.jsx)(m.X.Td,{children:e("jsonSchema.ipv4FormatDesc")})]}),(0,r.jsxs)(m.X.Tr,{children:[(0,r.jsx)(m.X.Td,{children:(0,r.jsx)(D,{children:"ipv6"})}),(0,r.jsx)(m.X.Td,{children:e("jsonSchema.ipv6FormatDesc")})]})]})]})]})]}),(0,r.jsxs)(h.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,r.jsx)(l.h,{id:"tips",mb:"md",order:2,c:"dark",children:e("jsonSchema.tipsTitle")}),(0,r.jsxs)(v,{children:[(0,r.jsxs)("div",{children:[(0,r.jsx)(o.E,{fw:600,children:e("jsonSchema.tip0")}),(0,r.jsx)(o.E,{children:e("jsonSchema.tip0Desc")})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)(o.E,{fw:600,children:e("jsonSchema.tipUseDesc")}),(0,r.jsxs)(o.E,{children:[e("jsonSchema.tipUseDescText1")," ",(0,r.jsx)(D,{children:"description"})," ",e("jsonSchema.tipUseDescText2")]})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)(o.E,{fw:600,children:e("jsonSchema.tip1")}),(0,r.jsx)(o.E,{children:e("jsonSchema.tip1Desc")})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)(o.E,{fw:600,children:e("jsonSchema.tip2")}),(0,r.jsx)(o.E,{children:e("jsonSchema.tip2Desc")})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)(o.E,{fw:600,children:e("jsonSchema.tip3")}),(0,r.jsx)(o.E,{children:e("jsonSchema.tip3Desc")})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)(o.E,{fw:600,children:e("jsonSchema.tip4")}),(0,r.jsx)(o.E,{children:e("jsonSchema.tip4Desc")})]})]})]}),(0,r.jsx)(u.q,{title:e("common.relatedReading"),previous:{label:e("common.previous"),title:e("typeGeneration.title"),href:s("/docs/type-generation")},next:{label:e("common.next"),title:e("jqQuery.title"),href:s("/docs/jq-query")}}),(0,r.jsxs)(h.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,r.jsx)(l.h,{mb:"md",order:3,c:"dark",children:e("common.needHelp")}),(0,r.jsx)(v,{children:(0,r.jsxs)(o.E,{children:[e("common.needHelpText")," ",(0,r.jsx)(E,{href:s("/docs"),children:e("common.documentation")})," ",e("common.orTry")," ",(0,r.jsx)(E,{href:s("/editor"),children:e("common.editor")})," ",e("common.directly"),"."]})})]})]})})]})}},82301:(e,i,s)=>{"use strict";s.d(i,{W:()=>m});var r=s(37876);s(14232);var n=s(89704),d=s(8291),c=s(79021),t=s(45050),l=s(31158);let o=(0,l.Ay)(n.t).withConfig({componentId:"sc-82299478-0"})(["background:#fffdf5;border:1px solid #e8e4db;border-left:4px solid #f7c948;"]),a=l.Ay.div.withConfig({componentId:"sc-82299478-1"})(["display:flex;flex-direction:column;gap:8px;"]),h=l.Ay.a.withConfig({componentId:"sc-82299478-2"})(["color:#228be6;text-decoration:none;font-weight:500;font-size:0.95rem;&:hover{text-decoration:underline;}"]),m=({title:e,items:i})=>i.length?(0,r.jsxs)(o,{c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,r.jsx)(d.h,{mb:"md",order:3,c:"dark",children:e}),(0,r.jsx)(c.B,{gap:6,children:(0,r.jsx)(a,{children:i.map(e=>(0,r.jsx)(t.E,{children:(0,r.jsx)(h,{href:`#${e.id}`,children:e.label})},e.id))})})]}):null},83888:(e,i,s)=>{"use strict";s.d(i,{F:()=>x});var r=s(37876),n=s(36385);s(14232);var d=s(46249),c=s(1609),t=s(99545),l=s(88791),o=s(95171),a=s(80385),h=s(17457),m={root:"m_66836ed3",wrapper:"m_a5d60502",body:"m_667c2793",title:"m_6a03f287",label:"m_698f4f23",icon:"m_667f2a6a",message:"m_7fa78076",closeButton:"m_87f54839"};let j=(0,c.V)((e,{radius:i,color:s,variant:r,autoContrast:n})=>{let c=e.variantColorResolver({color:s||e.primaryColor,theme:e,variant:r||"light",autoContrast:n});return{root:{"--alert-radius":void 0===i?void 0:(0,d.nJ)(i),"--alert-bg":s||r?c.background:void 0,"--alert-color":c.color,"--alert-bd":s||r?c.border:void 0}}}),x=(0,a.P9)((e,i)=>{let s=(0,t.Y)("Alert",null,e),{classNames:d,className:c,style:a,styles:x,unstyled:p,vars:b,radius:f,color:u,title:T,children:y,id:g,icon:S,withCloseButton:X,onClose:w,closeButtonLabel:v,variant:E,autoContrast:D,role:k,attributes:C,...B}=s,A=(0,l.I)({name:"Alert",classes:m,props:s,className:c,style:a,classNames:d,styles:x,unstyled:p,attributes:C,vars:b,varsResolver:j}),$=(0,n.B)(g),_=T&&`${$}-title`||void 0,N=`${$}-body`;return(0,r.jsx)(o.a,{id:$,...A("root",{variant:E}),variant:E,ref:i,role:k||"alert",...B,"aria-describedby":y?N:void 0,"aria-labelledby":T?_:void 0,children:(0,r.jsxs)("div",{...A("wrapper"),children:[S&&(0,r.jsx)("div",{...A("icon"),children:S}),(0,r.jsxs)("div",{...A("body"),children:[T&&(0,r.jsx)("div",{...A("title"),"data-with-close-button":X||void 0,children:(0,r.jsx)("span",{id:_,...A("label"),children:T})}),y&&(0,r.jsx)("div",{id:N,...A("message"),"data-variant":E,children:y})]}),X&&(0,r.jsx)(h.J,{...A("closeButton"),onClick:w,variant:"transparent",size:16,iconSize:16,"aria-label":v,unstyled:p})]})})});x.classes=m,x.displayName="@mantine/core/Alert"}},e=>{e.O(0,[28585,74938,96701,51287,60815,29951,2732,52509,16433,95096,42672,27822,96008,90636,46593,38792],()=>e(e.s=56356)),_N_E=e.O()}]);
//# sourceMappingURL=json-schema-21f7b6992101c0eb.js.map