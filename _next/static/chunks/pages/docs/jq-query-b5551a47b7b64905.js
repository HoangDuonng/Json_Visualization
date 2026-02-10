(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9460],{8874:(e,i,r)=>{"use strict";r.d(i,{C:()=>x});var s=r(37876);r(14232);var n=r(1609),d=r(64453),l=r(99545),c=r(88791),t=r(95171),a=r(80385),h={root:"m_b183c0a2"};let o=(0,n.V)((e,{color:i})=>({root:{"--code-bg":i?(0,d.r)(i,e):void 0}})),x=(0,a.P9)((e,i)=>{let r=(0,l.Y)("Code",null,e),{classNames:n,className:d,style:a,styles:x,unstyled:j,vars:m,color:u,block:p,variant:f,mod:b,attributes:y,...E}=r,w=(0,c.I)({name:"Code",props:r,classes:h,className:d,style:a,classNames:n,styles:x,unstyled:j,attributes:y,vars:m,varsResolver:o});return(0,s.jsx)(t.a,{component:p?"pre":"code",variant:f,ref:i,mod:[{block:p},b],...w("root"),...E,dir:"ltr"})});x.classes=h,x.displayName="@mantine/core/Code"},37652:(e,i,r)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/docs/jq-query",function(){return r(93344)}])},93344:(e,i,r)=>{"use strict";r.r(i),r.d(i,{default:()=>v});var s=r(37876);r(14232);var n=r(77328),d=r.n(n),l=r(8874),c=r(33752),t=r(79021),a=r(8291),h=r(45050),o=r(83888),x=r(89704),j=r(43839),m=r(61342),u=r(18827),p=r(41988),f=r(32002),b=r(88127),y=r(92358),E=r(42161);let w=u.Ay.div.withConfig({componentId:"sc-4c87d69e-0"})(["display:flex;flex-direction:column;gap:16px;line-height:1.7;"]),g=u.Ay.pre.withConfig({componentId:"sc-4c87d69e-1"})(["background:#f8f9fa;padding:16px;border-radius:8px;overflow-x:auto;font-family:"," !important;font-size:14px;border:1px solid #e9ecef;*{font-family:"," !important;}"],b.j,b.j),T=u.Ay.a.withConfig({componentId:"sc-4c87d69e-2"})(["color:#228be6;text-decoration:none;font-weight:500;&:hover{text-decoration:underline;}"]),X=(0,u.Ay)(l.C).withConfig({componentId:"sc-4c87d69e-3"})(["font-family:"," !important;"],b.j),v=()=>(0,s.jsxs)(E.A,{children:[(0,s.jsx)(d(),{children:(0,p.U)({...y.k,title:"JSON Query (jq) Documentation - JSON Visualization",description:"Learn how to use jq queries to filter, transform, and extract data from JSON in JSON Visualization.",canonical:"https://jsonvisualization.nguuyen.io.vn/docs/jq-query"})}),(0,s.jsx)(c.m,{size:"lg",py:60,children:(0,s.jsxs)(t.B,{gap:"xl",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)(a.h,{order:1,c:"dark",mb:"sm",children:"JSON Query (jq)"}),(0,s.jsx)(h.E,{size:"lg",c:"dimmed",children:"Filter, transform, and extract data from JSON using jq syntax"})]}),(0,s.jsx)(o.F,{icon:(0,s.jsx)(f.$Mj,{size:20}),color:"blue",variant:"light",children:"JSON Visualization uses a simplified version of jq. Not all features from the official jq command-line tool are supported."}),(0,s.jsxs)(x.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,s.jsx)(a.h,{mb:"md",order:2,c:"dark",children:"What is jq?"}),(0,s.jsxs)(w,{children:[(0,s.jsx)(h.E,{children:"jq is a lightweight and flexible command-line JSON processor. It allows you to slice, filter, map, and transform structured data with ease."}),(0,s.jsx)(h.E,{children:"In JSON Visualization, you can use jq queries to quickly extract or manipulate specific parts of your JSON data without writing custom code."})]})]}),(0,s.jsxs)(x.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,s.jsx)(a.h,{mb:"md",order:2,c:"dark",children:"How to Use"}),(0,s.jsxs)(w,{children:[(0,s.jsxs)("div",{children:[(0,s.jsx)(h.E,{fw:600,mb:"xs",children:"1. Open the Editor"}),(0,s.jsxs)(h.E,{children:["Load your JSON data in the"," ",(0,s.jsx)(T,{href:"/editor",children:"JSON Visualization Editor"}),"."]})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)(h.E,{fw:600,mb:"xs",children:"2. Open JSON Query Tool"}),(0,s.jsx)(h.E,{children:'Click on "Tools" in the toolbar and select "JSON Query (jq)".'})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)(h.E,{fw:600,mb:"xs",children:"3. Enter Your Query"}),(0,s.jsx)(h.E,{children:'Type your jq query in the input field and click "Display on Graph".'})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)(h.E,{fw:600,mb:"xs",children:"4. View Results"}),(0,s.jsx)(h.E,{children:"The filtered or transformed data will be displayed in the graph view."})]})]})]}),(0,s.jsxs)(x.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,s.jsx)(a.h,{mb:"md",order:2,c:"dark",children:"Basic Syntax"}),(0,s.jsx)(w,{children:(0,s.jsxs)(j.X,{striped:!0,highlightOnHover:!0,withTableBorder:!0,withColumnBorders:!0,children:[(0,s.jsx)(j.X.Thead,{children:(0,s.jsxs)(j.X.Tr,{children:[(0,s.jsx)(j.X.Th,{children:"Query"}),(0,s.jsx)(j.X.Th,{children:"Description"})]})}),(0,s.jsxs)(j.X.Tbody,{children:[(0,s.jsxs)(j.X.Tr,{children:[(0,s.jsx)(j.X.Td,{children:(0,s.jsx)(X,{children:"."})}),(0,s.jsx)(j.X.Td,{children:"Identity - returns the entire input"})]}),(0,s.jsxs)(j.X.Tr,{children:[(0,s.jsx)(j.X.Td,{children:(0,s.jsx)(X,{children:".field"})}),(0,s.jsx)(j.X.Td,{children:"Access a specific field"})]}),(0,s.jsxs)(j.X.Tr,{children:[(0,s.jsx)(j.X.Td,{children:(0,s.jsx)(X,{children:".field1.field2"})}),(0,s.jsx)(j.X.Td,{children:"Access nested fields"})]}),(0,s.jsxs)(j.X.Tr,{children:[(0,s.jsx)(j.X.Td,{children:(0,s.jsx)(X,{children:".[]"})}),(0,s.jsx)(j.X.Td,{children:"Iterate through array elements"})]}),(0,s.jsxs)(j.X.Tr,{children:[(0,s.jsx)(j.X.Td,{children:(0,s.jsx)(X,{children:".[0]"})}),(0,s.jsx)(j.X.Td,{children:"Access array element by index"})]}),(0,s.jsxs)(j.X.Tr,{children:[(0,s.jsx)(j.X.Td,{children:(0,s.jsx)(X,{children:".field[]"})}),(0,s.jsx)(j.X.Td,{children:"Iterate through array in a field"})]})]})]})})]}),(0,s.jsxs)(x.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,s.jsx)(a.h,{mb:"md",order:2,c:"dark",children:"Practical Examples"}),(0,s.jsxs)(w,{children:[(0,s.jsx)(h.E,{fw:600,children:"Sample JSON Data:"}),(0,s.jsx)(g,{children:`{
  "fruits": [
    {
      "name": "Apple",
      "color": "#FF0000",
      "details": {
        "type": "Pome",
        "season": "Fall"
      },
      "nutrients": {
        "calories": 52,
        "fiber": "2.4g",
        "vitaminC": "4.6mg"
      }
    },
    {
      "name": "Banana",
      "color": "#FFFF00",
      "details": {
        "type": "Berry",
        "season": "Year-round"
      },
      "nutrients": {
        "calories": 89,
        "fiber": "2.6g",
        "potassium": "358mg"
      }
    },
    {
      "name": "Orange",
      "color": "#FFA500",
      "details": {
        "type": "Citrus",
        "season": "Winter"
      },
      "nutrients": {
        "calories": 47,
        "fiber": "2.4g",
        "vitaminC": "53.2mg"
      }
    }
  ]
}`}),(0,s.jsx)(m.c,{my:"md"}),(0,s.jsxs)("div",{children:[(0,s.jsx)(h.E,{fw:600,mb:"xs",children:"Example 1: Get all fruit names"}),(0,s.jsx)(h.E,{mb:"xs",children:"Query:"}),(0,s.jsx)(g,{children:".fruits[].name"}),(0,s.jsx)(h.E,{mb:"xs",children:"Result:"}),(0,s.jsx)(g,{children:'["Apple", "Banana", "Orange"]'})]}),(0,s.jsx)(m.c,{my:"md"}),(0,s.jsxs)("div",{children:[(0,s.jsx)(h.E,{fw:600,mb:"xs",children:"Example 2: Get all colors"}),(0,s.jsx)(h.E,{mb:"xs",children:"Query:"}),(0,s.jsx)(g,{children:".fruits[].color"}),(0,s.jsx)(h.E,{mb:"xs",children:"Result:"}),(0,s.jsx)(g,{children:'["#FF0000", "#FFFF00", "#FFA500"]'})]}),(0,s.jsx)(m.c,{my:"md"}),(0,s.jsxs)("div",{children:[(0,s.jsx)(h.E,{fw:600,mb:"xs",children:"Example 3: Get calorie information"}),(0,s.jsx)(h.E,{mb:"xs",children:"Query:"}),(0,s.jsx)(g,{children:".fruits[].nutrients.calories"}),(0,s.jsx)(h.E,{mb:"xs",children:"Result:"}),(0,s.jsx)(g,{children:"[52, 89, 47]"})]}),(0,s.jsx)(m.c,{my:"md"}),(0,s.jsxs)("div",{children:[(0,s.jsx)(h.E,{fw:600,mb:"xs",children:'Example 4: Filter fruits with type "Citrus"'}),(0,s.jsx)(h.E,{mb:"xs",children:"Query:"}),(0,s.jsx)(g,{children:'.fruits[] | select(.details.type == "Citrus")'}),(0,s.jsx)(h.E,{mb:"xs",children:"Result:"}),(0,s.jsx)(g,{children:`{
  "name": "Orange",
  "color": "#FFA500",
  "details": {
    "type": "Citrus",
    "season": "Winter"
  },
  "nutrients": {
    "calories": 47,
    "fiber": "2.4g",
    "vitaminC": "53.2mg"
  }
}`})]}),(0,s.jsx)(m.c,{my:"md"}),(0,s.jsxs)("div",{children:[(0,s.jsx)(h.E,{fw:600,mb:"xs",children:"Example 5: Filter fruits with calories less than 50"}),(0,s.jsx)(h.E,{mb:"xs",children:"Query:"}),(0,s.jsx)(g,{children:".fruits[] | select(.nutrients.calories < 50)"}),(0,s.jsx)(h.E,{mb:"xs",children:"Result:"}),(0,s.jsx)(g,{children:`[
  {
    "name": "Apple",
    "color": "#FF0000",
    ...
  },
  {
    "name": "Orange",
    "color": "#FFA500",
    ...
  }
]`})]}),(0,s.jsx)(m.c,{my:"md"}),(0,s.jsxs)("div",{children:[(0,s.jsx)(h.E,{fw:600,mb:"xs",children:"Example 6: Create simplified objects"}),(0,s.jsx)(h.E,{mb:"xs",children:"Query:"}),(0,s.jsx)(g,{children:".fruits[] | {name: .name, calories: .nutrients.calories}"}),(0,s.jsx)(h.E,{mb:"xs",children:"Result:"}),(0,s.jsx)(g,{children:`[
  {"name": "Apple", "calories": 52},
  {"name": "Banana", "calories": 89},
  {"name": "Orange", "calories": 47}
]`})]}),(0,s.jsx)(m.c,{my:"md"}),(0,s.jsxs)("div",{children:[(0,s.jsx)(h.E,{fw:600,mb:"xs",children:"Example 7: Get fruits by season"}),(0,s.jsx)(h.E,{mb:"xs",children:"Query:"}),(0,s.jsx)(g,{children:'.fruits[] | select(.details.season == "Winter")'}),(0,s.jsx)(h.E,{mb:"xs",children:"Result:"}),(0,s.jsx)(g,{children:`{
  "name": "Orange",
  "color": "#FFA500",
  "details": {
    "type": "Citrus",
    "season": "Winter"
  },
  ...
}`})]})]})]}),(0,s.jsxs)(x.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,s.jsx)(a.h,{mb:"md",order:2,c:"dark",children:"Common Operations"}),(0,s.jsx)(w,{children:(0,s.jsxs)(j.X,{striped:!0,highlightOnHover:!0,withTableBorder:!0,withColumnBorders:!0,children:[(0,s.jsx)(j.X.Thead,{children:(0,s.jsxs)(j.X.Tr,{children:[(0,s.jsx)(j.X.Th,{children:"Operation"}),(0,s.jsx)(j.X.Th,{children:"Syntax"}),(0,s.jsx)(j.X.Th,{children:"Example"})]})}),(0,s.jsxs)(j.X.Tbody,{children:[(0,s.jsxs)(j.X.Tr,{children:[(0,s.jsx)(j.X.Td,{children:"Filter"}),(0,s.jsx)(j.X.Td,{children:(0,s.jsx)(X,{children:"select(condition)"})}),(0,s.jsx)(j.X.Td,{children:(0,s.jsx)(X,{children:"select(.age > 18)"})})]}),(0,s.jsxs)(j.X.Tr,{children:[(0,s.jsx)(j.X.Td,{children:"Map"}),(0,s.jsx)(j.X.Td,{children:(0,s.jsx)(X,{children:"map(expression)"})}),(0,s.jsx)(j.X.Td,{children:(0,s.jsx)(X,{children:"map(.name)"})})]}),(0,s.jsxs)(j.X.Tr,{children:[(0,s.jsx)(j.X.Td,{children:"Pipe"}),(0,s.jsx)(j.X.Td,{children:(0,s.jsx)(X,{children:"|"})}),(0,s.jsx)(j.X.Td,{children:(0,s.jsx)(X,{children:".users[] | .name"})})]}),(0,s.jsxs)(j.X.Tr,{children:[(0,s.jsx)(j.X.Td,{children:"Object construction"}),(0,s.jsx)(j.X.Td,{children:(0,s.jsx)(X,{children:"{key: value}"})}),(0,s.jsx)(j.X.Td,{children:(0,s.jsx)(X,{children:"{name: .name, age: .age}"})})]}),(0,s.jsxs)(j.X.Tr,{children:[(0,s.jsx)(j.X.Td,{children:"Array construction"}),(0,s.jsx)(j.X.Td,{children:(0,s.jsx)(X,{children:"[expression]"})}),(0,s.jsx)(j.X.Td,{children:(0,s.jsx)(X,{children:"[.users[].name]"})})]})]})]})})]}),(0,s.jsxs)(x.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,s.jsx)(a.h,{mb:"md",order:2,c:"dark",children:"Tips & Best Practices"}),(0,s.jsxs)(w,{children:[(0,s.jsxs)("div",{children:[(0,s.jsx)(h.E,{fw:600,children:"• Start Simple"}),(0,s.jsxs)(h.E,{children:["Begin with basic queries like ",(0,s.jsx)(X,{children:".field"})," and gradually add complexity."]})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)(h.E,{fw:600,children:"• Use Pipe Operator"}),(0,s.jsxs)(h.E,{children:["Chain operations with ",(0,s.jsx)(X,{children:"|"})," to build complex transformations step by step."]})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)(h.E,{fw:600,children:"• Test Incrementally"}),(0,s.jsx)(h.E,{children:"Test each part of your query separately before combining them into a complex expression."})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)(h.E,{fw:600,children:"• Understand Your Data Structure"}),(0,s.jsx)(h.E,{children:"Use the graph visualization to understand your JSON structure before writing queries."})]})]})]}),(0,s.jsxs)(x.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,s.jsx)(a.h,{mb:"md",order:2,c:"dark",children:"Limitations"}),(0,s.jsxs)(w,{children:[(0,s.jsx)(h.E,{children:"JSON Visualization uses a simplified version of jq. Some advanced features from the official jq tool may not be supported, including:"}),(0,s.jsx)(h.E,{children:"• Complex recursive operations"}),(0,s.jsx)(h.E,{children:"• Some built-in functions"}),(0,s.jsx)(h.E,{children:"• Advanced string manipulation"}),(0,s.jsx)(h.E,{children:"• Custom function definitions"}),(0,s.jsxs)(h.E,{mt:"md",children:["For full jq capabilities, consider using the official"," ",(0,s.jsx)(T,{href:"https://jqlang.org/",target:"_blank",rel:"noopener noreferrer",children:"jq command-line tool"}),"."]})]})]}),(0,s.jsxs)(x.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,s.jsx)(a.h,{mb:"md",order:3,c:"dark",children:"Need Help?"}),(0,s.jsx)(w,{children:(0,s.jsxs)(h.E,{children:["If you encounter issues or have questions, visit our"," ",(0,s.jsx)(T,{href:"/docs",children:"Documentation"})," or check out the"," ",(0,s.jsx)(T,{href:"/editor",children:"Editor"})," to try it yourself."]})})]})]})})]})}},e=>{e.O(0,[8585,4938,1287,6701,1375,9951,9209,9052,2161,636,6593,8792],()=>e(e.s=37652)),_N_E=e.O()}]);
//# sourceMappingURL=jq-query-b5551a47b7b64905.js.map