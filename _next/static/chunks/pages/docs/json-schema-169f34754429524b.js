(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9762],{43839:(e,s,r)=>{"use strict";r.d(s,{X:()=>N});var i=r(37876),n=r(63108);r(14232);var d=r(46249),c=r(1609),t=r(64453),h=r(99545),l=r(88791),o=r(95171),a=r(80385);let[j,m]=(0,r(98671).F)("Table component was not found in the tree");var x={table:"m_b23fa0ef",th:"m_4e7aa4f3",tr:"m_4e7aa4fd",td:"m_4e7aa4ef",tbody:"m_b2404537",thead:"m_b242d975",caption:"m_9e5a3ac7",scrollContainer:"m_a100c15",scrollContainerInner:"m_62259741"};function p(e,s){let r=`Table${e.charAt(0).toUpperCase()}${e.slice(1)}`,n=(0,a.P9)((n,d)=>{let c=(0,h.Y)(r,{},n),{classNames:t,className:l,style:a,styles:j,...x}=c,p=m();return(0,i.jsx)(o.a,{component:e,ref:d,...function(e,s){if(!s)return;let r={};return s.columnBorder&&e.withColumnBorders&&(r["data-with-column-border"]=!0),s.rowBorder&&e.withRowBorders&&(r["data-with-row-border"]=!0),s.striped&&e.striped&&(r["data-striped"]=e.striped),s.highlightOnHover&&e.highlightOnHover&&(r["data-hover"]=!0),s.captionSide&&e.captionSide&&(r["data-side"]=e.captionSide),s.stickyHeader&&e.stickyHeader&&(r["data-sticky"]=!0),r}(p,s),...p.getStyles(e,{className:l,classNames:t,style:a,styles:j,props:c}),...x})});return n.displayName=`@mantine/core/${r}`,n.classes=x,n}let T=p("th",{columnBorder:!0}),b=p("td",{columnBorder:!0}),u=p("tr",{rowBorder:!0,striped:!0,highlightOnHover:!0}),f=p("thead",{stickyHeader:!0}),y=p("tbody"),X=p("tfoot"),g=p("caption",{captionSide:!0});function S({data:e}){return(0,i.jsxs)(i.Fragment,{children:[e.caption&&(0,i.jsx)(g,{children:e.caption}),e.head&&(0,i.jsx)(f,{children:(0,i.jsx)(u,{children:e.head.map((e,s)=>(0,i.jsx)(T,{children:e},s))})}),e.body&&(0,i.jsx)(y,{children:e.body.map((e,s)=>(0,i.jsx)(u,{children:e.map((e,s)=>(0,i.jsx)(b,{children:e},s))},s))}),e.foot&&(0,i.jsx)(X,{children:(0,i.jsx)(u,{children:e.foot.map((e,s)=>(0,i.jsx)(T,{children:e},s))})})]})}S.displayName="@mantine/core/TableDataRenderer";var w=r(16433);let E={type:"scrollarea"},v=(0,c.V)((e,{minWidth:s,maxHeight:r,type:i})=>({scrollContainer:{"--table-min-width":(0,n.D)(s),"--table-max-height":(0,n.D)(r),"--table-overflow":"native"===i?"auto":void 0}})),D=(0,a.P9)((e,s)=>{let r=(0,h.Y)("TableScrollContainer",E,e),{classNames:n,className:d,style:c,styles:t,unstyled:a,vars:j,children:m,minWidth:p,maxHeight:T,type:b,scrollAreaProps:u,attributes:f,...y}=r,X=(0,l.I)({name:"TableScrollContainer",classes:x,props:r,className:d,style:c,classNames:n,styles:t,unstyled:a,attributes:f,vars:j,varsResolver:v,rootSelector:"scrollContainer"});return(0,i.jsx)(o.a,{component:"scrollarea"===b?w.F:"div",..."scrollarea"===b?T?{offsetScrollbars:"xy",...u}:{offsetScrollbars:"x",...u}:{},ref:s,...X("scrollContainer"),...y,children:(0,i.jsx)("div",{...X("scrollContainerInner"),children:m})})});D.classes=x,D.displayName="@mantine/core/TableScrollContainer";let k={withRowBorders:!0,verticalSpacing:7},B=(0,c.V)((e,{layout:s,captionSide:r,horizontalSpacing:i,verticalSpacing:c,borderColor:h,stripedColor:l,highlightOnHoverColor:o,striped:a,highlightOnHover:j,stickyHeaderOffset:m,stickyHeader:x})=>({table:{"--table-layout":s,"--table-caption-side":r,"--table-horizontal-spacing":(0,d.GY)(i),"--table-vertical-spacing":(0,d.GY)(c),"--table-border-color":h?(0,t.r)(h,e):void 0,"--table-striped-color":a&&l?(0,t.r)(l,e):void 0,"--table-highlight-on-hover-color":j&&o?(0,t.r)(o,e):void 0,"--table-sticky-header-offset":x?(0,n.D)(m):void 0}})),N=(0,a.P9)((e,s)=>{let r=(0,h.Y)("Table",k,e),{classNames:n,className:d,style:c,styles:t,unstyled:a,vars:m,horizontalSpacing:p,verticalSpacing:T,captionSide:b,stripedColor:u,highlightOnHoverColor:f,striped:y,highlightOnHover:X,withColumnBorders:g,withRowBorders:w,withTableBorder:E,borderColor:v,layout:D,variant:N,data:C,children:A,stickyHeader:_,stickyHeaderOffset:$,mod:I,tabularNums:F,attributes:q,...O}=r,U=(0,l.I)({name:"Table",props:r,className:d,style:c,classes:x,classNames:n,styles:t,unstyled:a,attributes:q,rootSelector:"table",vars:m,varsResolver:B});return(0,i.jsx)(j,{value:{getStyles:U,stickyHeader:_,striped:!0===y?"odd":y||void 0,highlightOnHover:X,withColumnBorders:g,withRowBorders:w,captionSide:b||"bottom"},children:(0,i.jsx)(o.a,{component:"table",variant:N,ref:s,mod:[{"data-with-table-border":E,"data-tabular-nums":F},I],...U("table"),...O,children:A||!!C&&(0,i.jsx)(S,{data:C})})})});N.classes=x,N.displayName="@mantine/core/Table",N.Td=b,N.Th=T,N.Tr=u,N.Thead=f,N.Tbody=y,N.Tfoot=X,N.Caption=g,N.ScrollContainer=D,N.DataRenderer=S},46927:(e,s,r)=>{"use strict";r.d(s,{N:()=>l});var i=r(37876);r(14232);var n=r(18827),d=r(97387),c=r(80825),t=r(88127);let h=n.Ay.div.withConfig({componentId:"sc-6d0fa89e-0"})(["pre{font-family:"," !important;border-radius:8px;margin:0;background:#fefcf7 !important;border:1px solid #e8e4db;*{font-family:"," !important;}}"],t.j,t.j),l=({code:e,language:s="json"})=>(0,i.jsx)(h,{children:(0,i.jsx)(d.A,{language:s,style:c.Je,customStyle:{padding:"1rem"},children:e})})},56356:(e,s,r)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/docs/json-schema",function(){return r(66638)}])},66638:(e,s,r)=>{"use strict";r.r(s),r.d(s,{default:()=>v});var i=r(37876);r(14232);var n=r(77328),d=r.n(n),c=r(33752),t=r(79021),h=r(8291),l=r(45050),o=r(83888),a=r(89704),j=r(43839),m=r(61342),x=r(18827),p=r(41988),T=r(32002),b=r(46927),u=r(99530),f=r(88127),y=r(92358),X=r(38979),g=r(42161);let S=x.Ay.div.withConfig({componentId:"sc-32f57c03-0"})(["display:flex;flex-direction:column;gap:16px;line-height:1.7;"]),w=x.Ay.a.withConfig({componentId:"sc-32f57c03-1"})(["color:#228be6;text-decoration:none;font-weight:500;&:hover{text-decoration:underline;}"]),E=x.Ay.code.withConfig({componentId:"sc-32f57c03-2"})(["background:#f8f9fa;padding:2px 6px;border-radius:4px;font-family:"," !important;font-size:0.9em;border:1px solid #e9ecef;"],f.j),v=()=>{let{t:e}=(0,X.Bd)("docs");return(0,i.jsxs)(g.A,{children:[(0,i.jsx)(d(),{children:(0,p.U)({...y.k,title:`${e("jsonSchema.title")} Documentation - JSON Visualization`,description:e("jsonSchema.subtitle"),canonical:"https://jsonvisualization.nguuyen.io.vn/docs/json-schema"})}),(0,i.jsx)(c.m,{size:"lg",py:60,children:(0,i.jsxs)(t.B,{gap:"xl",children:[(0,i.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[(0,i.jsxs)("div",{children:[(0,i.jsx)(h.h,{order:1,c:"dark",mb:"sm",children:e("jsonSchema.title")}),(0,i.jsx)(l.E,{size:"lg",c:"dimmed",children:e("jsonSchema.subtitle")})]}),(0,i.jsx)(u.c,{})]}),(0,i.jsx)(o.F,{icon:(0,i.jsx)(T.$Mj,{size:20}),color:"cyan",variant:"light",styles:{message:{color:"#1971c2"}},children:e("jsonSchema.alert")}),(0,i.jsxs)(a.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,i.jsx)(h.h,{mb:"md",order:2,c:"dark",children:e("jsonSchema.whatIsTitle")}),(0,i.jsxs)(S,{children:[(0,i.jsx)(l.E,{children:e("jsonSchema.whatIsDesc")}),(0,i.jsx)(l.E,{children:e("jsonSchema.whatIsUsage")}),(0,i.jsxs)(l.E,{children:["• ",e("jsonSchema.usage1")]}),(0,i.jsxs)(l.E,{children:["• ",e("jsonSchema.usage2")]}),(0,i.jsxs)(l.E,{children:["• ",e("jsonSchema.usage3")]}),(0,i.jsxs)(l.E,{children:["• ",e("jsonSchema.usage4")]})]})]}),(0,i.jsxs)(a.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,i.jsx)(h.h,{mb:"md",order:2,c:"dark",children:e("jsonSchema.howToUseTitle")}),(0,i.jsxs)(S,{children:[(0,i.jsxs)("div",{children:[(0,i.jsx)(l.E,{fw:600,mb:"xs",children:e("jsonSchema.step1")}),(0,i.jsxs)(l.E,{children:[e("jsonSchema.step1Desc")," ",(0,i.jsx)(w,{href:"/editor",children:e("common.editor")}),"."]})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)(l.E,{fw:600,mb:"xs",children:e("jsonSchema.step2")}),(0,i.jsx)(l.E,{children:e("jsonSchema.step2Desc")})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)(l.E,{fw:600,mb:"xs",children:e("jsonSchema.step3")}),(0,i.jsx)(l.E,{children:e("jsonSchema.step3Desc")})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)(l.E,{fw:600,mb:"xs",children:e("jsonSchema.step4")}),(0,i.jsx)(l.E,{children:e("jsonSchema.step4Desc")})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)(l.E,{fw:600,mb:"xs",children:e("jsonSchema.step5")}),(0,i.jsx)(l.E,{children:e("jsonSchema.step5Desc")})]})]})]}),(0,i.jsxs)(a.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,i.jsx)(h.h,{mb:"md",order:2,c:"dark",children:e("jsonSchema.basicSchemaTitle")}),(0,i.jsxs)(S,{children:[(0,i.jsx)(l.E,{children:e("jsonSchema.basicSchemaDesc")}),(0,i.jsx)(b.N,{code:`{
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
}`})]})]}),(0,i.jsxs)(a.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,i.jsx)(h.h,{mb:"md",order:2,c:"dark",children:e("jsonSchema.commonKeywordsTitle")}),(0,i.jsx)(S,{children:(0,i.jsxs)(j.X,{striped:!0,highlightOnHover:!0,withTableBorder:!0,withColumnBorders:!0,children:[(0,i.jsx)(j.X.Thead,{children:(0,i.jsxs)(j.X.Tr,{children:[(0,i.jsx)(j.X.Th,{children:e("jsonSchema.tableKeyword")}),(0,i.jsx)(j.X.Th,{children:e("jsonSchema.tableDescription")})]})}),(0,i.jsxs)(j.X.Tbody,{children:[(0,i.jsxs)(j.X.Tr,{children:[(0,i.jsx)(j.X.Td,{children:(0,i.jsx)(E,{children:"$schema"})}),(0,i.jsx)(j.X.Td,{children:e("jsonSchema.schemaKeywordDesc")})]}),(0,i.jsxs)(j.X.Tr,{children:[(0,i.jsx)(j.X.Td,{children:(0,i.jsx)(E,{children:"title"})}),(0,i.jsx)(j.X.Td,{children:e("jsonSchema.titleKeywordDesc")})]}),(0,i.jsxs)(j.X.Tr,{children:[(0,i.jsx)(j.X.Td,{children:(0,i.jsx)(E,{children:"description"})}),(0,i.jsx)(j.X.Td,{children:e("jsonSchema.descriptionKeywordDesc")})]}),(0,i.jsxs)(j.X.Tr,{children:[(0,i.jsx)(j.X.Td,{children:(0,i.jsx)(E,{children:"type"})}),(0,i.jsx)(j.X.Td,{children:e("jsonSchema.typeKeywordDesc")})]}),(0,i.jsxs)(j.X.Tr,{children:[(0,i.jsx)(j.X.Td,{children:(0,i.jsx)(E,{children:"properties"})}),(0,i.jsx)(j.X.Td,{children:e("jsonSchema.propertiesKeywordDesc")})]}),(0,i.jsxs)(j.X.Tr,{children:[(0,i.jsx)(j.X.Td,{children:(0,i.jsx)(E,{children:"required"})}),(0,i.jsx)(j.X.Td,{children:e("jsonSchema.requiredKeywordDesc")})]}),(0,i.jsxs)(j.X.Tr,{children:[(0,i.jsx)(j.X.Td,{children:(0,i.jsx)(E,{children:"enum"})}),(0,i.jsx)(j.X.Td,{children:e("jsonSchema.enumKeywordDesc")})]}),(0,i.jsxs)(j.X.Tr,{children:[(0,i.jsx)(j.X.Td,{children:(0,i.jsx)(E,{children:"minimum"})}),(0,i.jsx)(j.X.Td,{children:e("jsonSchema.minimumKeywordDesc")})]}),(0,i.jsxs)(j.X.Tr,{children:[(0,i.jsx)(j.X.Td,{children:(0,i.jsx)(E,{children:"maximum"})}),(0,i.jsx)(j.X.Td,{children:e("jsonSchema.maximumKeywordDesc")})]}),(0,i.jsxs)(j.X.Tr,{children:[(0,i.jsx)(j.X.Td,{children:(0,i.jsx)(E,{children:"minLength"})}),(0,i.jsx)(j.X.Td,{children:"Minimum length for strings"})]}),(0,i.jsxs)(j.X.Tr,{children:[(0,i.jsx)(j.X.Td,{children:(0,i.jsx)(E,{children:"maxLength"})}),(0,i.jsx)(j.X.Td,{children:"Maximum length for strings"})]}),(0,i.jsxs)(j.X.Tr,{children:[(0,i.jsx)(j.X.Td,{children:(0,i.jsx)(E,{children:"pattern"})}),(0,i.jsx)(j.X.Td,{children:"Regular expression pattern for strings"})]}),(0,i.jsxs)(j.X.Tr,{children:[(0,i.jsx)(j.X.Td,{children:(0,i.jsx)(E,{children:"items"})}),(0,i.jsx)(j.X.Td,{children:"Schema for array items"})]}),(0,i.jsxs)(j.X.Tr,{children:[(0,i.jsx)(j.X.Td,{children:(0,i.jsx)(E,{children:"minItems"})}),(0,i.jsx)(j.X.Td,{children:"Minimum number of items in array"})]}),(0,i.jsxs)(j.X.Tr,{children:[(0,i.jsx)(j.X.Td,{children:(0,i.jsx)(E,{children:"maxItems"})}),(0,i.jsx)(j.X.Td,{children:"Maximum number of items in array"})]})]})]})})]}),(0,i.jsxs)(a.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,i.jsx)(h.h,{mb:"md",order:2,c:"dark",children:e("jsonSchema.practicalExamplesTitle")}),(0,i.jsxs)(S,{children:[(0,i.jsxs)("div",{children:[(0,i.jsx)(l.E,{fw:600,mb:"xs",children:"Example 1: Simple User Schema"}),(0,i.jsx)(b.N,{code:`{
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
}`}),(0,i.jsx)(l.E,{c:"dimmed",size:"sm",mt:"xs",children:"Valid JSON:"}),(0,i.jsx)(b.N,{code:`{
  "username": "john_doe",
  "email": "john@example.com",
  "age": 30
}`})]}),(0,i.jsx)(m.c,{my:"md"}),(0,i.jsxs)("div",{children:[(0,i.jsx)(l.E,{fw:600,mb:"xs",children:"Example 2: Product with Enum"}),(0,i.jsx)(b.N,{code:`{
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
}`})]}),(0,i.jsx)(m.c,{my:"md"}),(0,i.jsxs)("div",{children:[(0,i.jsx)(l.E,{fw:600,mb:"xs",children:"Example 3: Array of Objects"}),(0,i.jsx)(b.N,{code:`{
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
}`}),(0,i.jsx)(l.E,{c:"dimmed",size:"sm",mt:"xs",children:"Valid JSON:"}),(0,i.jsx)(b.N,{code:`{
  "users": [
    { "id": 1, "name": "Alice" },
    { "id": 2, "name": "Bob" }
  ]
}`})]}),(0,i.jsx)(m.c,{my:"md"}),(0,i.jsxs)("div",{children:[(0,i.jsx)(l.E,{fw:600,mb:"xs",children:"Example 4: Nested Objects"}),(0,i.jsx)(b.N,{code:`{
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
}`})]}),(0,i.jsx)(m.c,{my:"md"}),(0,i.jsxs)("div",{children:[(0,i.jsx)(l.E,{fw:600,mb:"xs",children:"Example 5: String Pattern Validation"}),(0,i.jsx)(b.N,{code:`{
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
}`})]}),(0,i.jsx)(m.c,{my:"md"}),(0,i.jsxs)("div",{children:[(0,i.jsx)(l.E,{fw:600,mb:"xs",children:"Example 6: Advanced Schema with Definitions"}),(0,i.jsx)(l.E,{c:"dimmed",size:"sm",mb:"xs",children:e("jsonSchema.example6Desc")}),(0,i.jsx)(b.N,{code:`{
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
}`}),(0,i.jsx)(l.E,{c:"dimmed",size:"sm",mt:"xs",children:"Valid JSON:"}),(0,i.jsx)(b.N,{code:`{
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
}`})]})]})]}),(0,i.jsxs)(a.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,i.jsx)(h.h,{mb:"md",order:2,c:"dark",children:"Using Definitions and References"}),(0,i.jsxs)(S,{children:[(0,i.jsxs)(l.E,{children:[e("jsonSchema.definitionsDesc1")," ",(0,i.jsx)(E,{children:"definitions"})," ",e("jsonSchema.definitionsDesc2")," ",(0,i.jsx)(E,{children:"$ref"}),"."]}),(0,i.jsx)(l.E,{fw:600,mt:"md",mb:"xs",children:"Benefits:"}),(0,i.jsxs)(l.E,{children:["• ",e("jsonSchema.benefit1Def")]}),(0,i.jsxs)(l.E,{children:["• ",e("jsonSchema.benefit2Def")]}),(0,i.jsxs)(l.E,{children:["• ",e("jsonSchema.benefit3Def")]}),(0,i.jsxs)(l.E,{children:["• ",e("jsonSchema.benefit4Def")]}),(0,i.jsx)(l.E,{fw:600,mt:"md",mb:"xs",children:"Example:"}),(0,i.jsx)(b.N,{code:`{
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
}`})]})]}),(0,i.jsxs)(a.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,i.jsx)(h.h,{mb:"md",order:2,c:"dark",children:e("jsonSchema.dataTypesTitle")}),(0,i.jsx)(S,{children:(0,i.jsxs)(j.X,{striped:!0,highlightOnHover:!0,withTableBorder:!0,withColumnBorders:!0,children:[(0,i.jsx)(j.X.Thead,{children:(0,i.jsxs)(j.X.Tr,{children:[(0,i.jsx)(j.X.Th,{children:e("jsonSchema.tableType")}),(0,i.jsx)(j.X.Th,{children:e("jsonSchema.tableDescription")}),(0,i.jsx)(j.X.Th,{children:e("jsonSchema.tableExample")})]})}),(0,i.jsxs)(j.X.Tbody,{children:[(0,i.jsxs)(j.X.Tr,{children:[(0,i.jsx)(j.X.Td,{children:(0,i.jsx)(E,{children:"string"})}),(0,i.jsx)(j.X.Td,{children:e("jsonSchema.stringTypeDesc")}),(0,i.jsx)(j.X.Td,{children:(0,i.jsx)(E,{children:'"hello"'})})]}),(0,i.jsxs)(j.X.Tr,{children:[(0,i.jsx)(j.X.Td,{children:(0,i.jsx)(E,{children:"number"})}),(0,i.jsx)(j.X.Td,{children:e("jsonSchema.numberTypeDesc")}),(0,i.jsxs)(j.X.Td,{children:[(0,i.jsx)(E,{children:"42"}),","," ",(0,i.jsx)(E,{children:"3.14"})]})]}),(0,i.jsxs)(j.X.Tr,{children:[(0,i.jsx)(j.X.Td,{children:(0,i.jsx)(E,{children:"integer"})}),(0,i.jsx)(j.X.Td,{children:e("jsonSchema.integerTypeDesc")}),(0,i.jsx)(j.X.Td,{children:(0,i.jsx)(E,{children:"42"})})]}),(0,i.jsxs)(j.X.Tr,{children:[(0,i.jsx)(j.X.Td,{children:(0,i.jsx)(E,{children:"boolean"})}),(0,i.jsx)(j.X.Td,{children:e("jsonSchema.booleanTypeDesc")}),(0,i.jsxs)(j.X.Td,{children:[(0,i.jsx)(E,{children:"true"}),","," ",(0,i.jsx)(E,{children:"false"})]})]}),(0,i.jsxs)(j.X.Tr,{children:[(0,i.jsx)(j.X.Td,{children:(0,i.jsx)(E,{children:"object"})}),(0,i.jsx)(j.X.Td,{children:e("jsonSchema.objectTypeDesc")}),(0,i.jsx)(j.X.Td,{children:(0,i.jsx)(E,{children:'{"key": "value"}'})})]}),(0,i.jsxs)(j.X.Tr,{children:[(0,i.jsx)(j.X.Td,{children:(0,i.jsx)(E,{children:"array"})}),(0,i.jsx)(j.X.Td,{children:e("jsonSchema.arrayTypeDesc")}),(0,i.jsx)(j.X.Td,{children:(0,i.jsx)(E,{children:"[1, 2, 3]"})})]}),(0,i.jsxs)(j.X.Tr,{children:[(0,i.jsx)(j.X.Td,{children:(0,i.jsx)(E,{children:"null"})}),(0,i.jsx)(j.X.Td,{children:e("jsonSchema.nullTypeDesc")}),(0,i.jsx)(j.X.Td,{children:(0,i.jsx)(E,{children:"null"})})]})]})]})})]}),(0,i.jsxs)(a.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,i.jsx)(h.h,{mb:"md",order:2,c:"dark",children:e("jsonSchema.stringFormatsTitle")}),(0,i.jsxs)(S,{children:[(0,i.jsx)(l.E,{mb:"md",children:e("jsonSchema.stringFormatsDesc")}),(0,i.jsxs)(j.X,{striped:!0,highlightOnHover:!0,withTableBorder:!0,withColumnBorders:!0,children:[(0,i.jsx)(j.X.Thead,{children:(0,i.jsxs)(j.X.Tr,{children:[(0,i.jsx)(j.X.Th,{children:e("jsonSchema.tableFormat")}),(0,i.jsx)(j.X.Th,{children:e("jsonSchema.tableDescription")})]})}),(0,i.jsxs)(j.X.Tbody,{children:[(0,i.jsxs)(j.X.Tr,{children:[(0,i.jsx)(j.X.Td,{children:(0,i.jsx)(E,{children:"date-time"})}),(0,i.jsx)(j.X.Td,{children:e("jsonSchema.dateTimeFormatDesc")})]}),(0,i.jsxs)(j.X.Tr,{children:[(0,i.jsx)(j.X.Td,{children:(0,i.jsx)(E,{children:"date"})}),(0,i.jsx)(j.X.Td,{children:e("jsonSchema.dateFormatDesc")})]}),(0,i.jsxs)(j.X.Tr,{children:[(0,i.jsx)(j.X.Td,{children:(0,i.jsx)(E,{children:"time"})}),(0,i.jsx)(j.X.Td,{children:e("jsonSchema.timeFormatDesc")})]}),(0,i.jsxs)(j.X.Tr,{children:[(0,i.jsx)(j.X.Td,{children:(0,i.jsx)(E,{children:"email"})}),(0,i.jsx)(j.X.Td,{children:e("jsonSchema.emailFormatDesc")})]}),(0,i.jsxs)(j.X.Tr,{children:[(0,i.jsx)(j.X.Td,{children:(0,i.jsx)(E,{children:"uri"})}),(0,i.jsx)(j.X.Td,{children:e("jsonSchema.uriFormatDesc")})]}),(0,i.jsxs)(j.X.Tr,{children:[(0,i.jsx)(j.X.Td,{children:(0,i.jsx)(E,{children:"hostname"})}),(0,i.jsx)(j.X.Td,{children:e("jsonSchema.hostnameFormatDesc")})]}),(0,i.jsxs)(j.X.Tr,{children:[(0,i.jsx)(j.X.Td,{children:(0,i.jsx)(E,{children:"ipv4"})}),(0,i.jsx)(j.X.Td,{children:e("jsonSchema.ipv4FormatDesc")})]}),(0,i.jsxs)(j.X.Tr,{children:[(0,i.jsx)(j.X.Td,{children:(0,i.jsx)(E,{children:"ipv6"})}),(0,i.jsx)(j.X.Td,{children:e("jsonSchema.ipv6FormatDesc")})]})]})]})]})]}),(0,i.jsxs)(a.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,i.jsx)(h.h,{mb:"md",order:2,c:"dark",children:e("jsonSchema.tipsTitle")}),(0,i.jsxs)(S,{children:[(0,i.jsxs)("div",{children:[(0,i.jsx)(l.E,{fw:600,children:e("jsonSchema.tip0")}),(0,i.jsx)(l.E,{children:e("jsonSchema.tip0Desc")})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)(l.E,{fw:600,children:e("jsonSchema.tipUseDesc")}),(0,i.jsxs)(l.E,{children:[e("jsonSchema.tipUseDescText1")," ",(0,i.jsx)(E,{children:"description"})," ",e("jsonSchema.tipUseDescText2")]})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)(l.E,{fw:600,children:e("jsonSchema.tip1")}),(0,i.jsx)(l.E,{children:e("jsonSchema.tip1Desc")})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)(l.E,{fw:600,children:e("jsonSchema.tip2")}),(0,i.jsx)(l.E,{children:e("jsonSchema.tip2Desc")})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)(l.E,{fw:600,children:e("jsonSchema.tip3")}),(0,i.jsx)(l.E,{children:e("jsonSchema.tip3Desc")})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)(l.E,{fw:600,children:e("jsonSchema.tip4")}),(0,i.jsx)(l.E,{children:e("jsonSchema.tip4Desc")})]})]})]}),(0,i.jsxs)(a.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,i.jsx)(h.h,{mb:"md",order:3,c:"dark",children:e("common.needHelp")}),(0,i.jsx)(S,{children:(0,i.jsxs)(l.E,{children:[e("common.needHelpText")," ",(0,i.jsx)(w,{href:"/docs",children:e("common.documentation")})," ",e("common.orTry")," ",(0,i.jsx)(w,{href:"/editor",children:e("common.editor")})," ",e("common.directly"),"."]})})]})]})})]})}}},e=>{e.O(0,[8585,4938,1287,6701,1375,9951,2732,2509,6433,7823,9239,2161,9530,636,6593,8792],()=>e(e.s=56356)),_N_E=e.O()}]);
//# sourceMappingURL=json-schema-169f34754429524b.js.map