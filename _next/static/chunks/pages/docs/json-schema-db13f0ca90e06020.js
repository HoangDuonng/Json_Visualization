(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9762],{56356:(e,i,r)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/docs/json-schema",function(){return r(66638)}])},66638:(e,i,r)=>{"use strict";r.r(i),r.d(i,{default:()=>S});var s=r(37876);r(14232);var d=r(77328),n=r.n(d),c=r(33752),t=r(79021),h=r(8291),l=r(45050),o=r(83888),a=r(89704),x=r(43839),j=r(61342),m=r(18827),p=r(41988),u=r(32002),f=r(99530),T=r(88127),y=r(92358),X=r(38979),b=r(42161);let g=m.Ay.div.withConfig({componentId:"sc-a5690486-0"})(["display:flex;flex-direction:column;gap:16px;line-height:1.7;"]),w=m.Ay.pre.withConfig({componentId:"sc-a5690486-1"})(["background:#f8f9fa;padding:16px;border-radius:8px;overflow-x:auto;font-family:"," !important;font-size:14px;border:1px solid #e9ecef;*{font-family:"," !important;}"],T.j,T.j),E=m.Ay.a.withConfig({componentId:"sc-a5690486-2"})(["color:#228be6;text-decoration:none;font-weight:500;&:hover{text-decoration:underline;}"]),v=m.Ay.code.withConfig({componentId:"sc-a5690486-3"})(["background:#f8f9fa;padding:2px 6px;border-radius:4px;font-family:"," !important;font-size:0.9em;border:1px solid #e9ecef;"],T.j),S=()=>{let{t:e}=(0,X.Bd)("docs");return(0,s.jsxs)(b.A,{children:[(0,s.jsx)(n(),{children:(0,p.U)({...y.k,title:`${e("jsonSchema.title")} Documentation - JSON Visualization`,description:e("jsonSchema.subtitle"),canonical:"https://jsonvisualization.nguuyen.io.vn/docs/json-schema"})}),(0,s.jsx)(c.m,{size:"lg",py:60,children:(0,s.jsxs)(t.B,{gap:"xl",children:[(0,s.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[(0,s.jsxs)("div",{children:[(0,s.jsx)(h.h,{order:1,c:"dark",mb:"sm",children:e("jsonSchema.title")}),(0,s.jsx)(l.E,{size:"lg",c:"dimmed",children:e("jsonSchema.subtitle")})]}),(0,s.jsx)(f.c,{})]}),(0,s.jsx)(o.F,{icon:(0,s.jsx)(u.$Mj,{size:20}),color:"cyan",variant:"light",styles:{message:{color:"#1971c2"}},children:e("jsonSchema.alert")}),(0,s.jsxs)(a.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,s.jsx)(h.h,{mb:"md",order:2,c:"dark",children:"What is JSON Schema?"}),(0,s.jsxs)(g,{children:[(0,s.jsx)(l.E,{children:"JSON Schema is a powerful tool for validating the structure of JSON data. It provides a contract for what JSON data is required for a given application and how to interact with it."}),(0,s.jsx)(l.E,{children:"In JSON Visualization, you can use JSON Schema to:"}),(0,s.jsx)(l.E,{children:"• Validate your JSON data against a schema"}),(0,s.jsx)(l.E,{children:"• Document the expected structure of your data"}),(0,s.jsx)(l.E,{children:"• Generate mock data based on schema definitions"}),(0,s.jsx)(l.E,{children:"• Ensure data consistency across your application"})]})]}),(0,s.jsxs)(a.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,s.jsx)(h.h,{mb:"md",order:2,c:"dark",children:"How to Use"}),(0,s.jsxs)(g,{children:[(0,s.jsxs)("div",{children:[(0,s.jsx)(l.E,{fw:600,mb:"xs",children:"1. Open the Editor"}),(0,s.jsxs)(l.E,{children:["Load your JSON data in the"," ",(0,s.jsx)(E,{href:"/editor",children:"JSON Visualization Editor"}),"."]})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)(l.E,{fw:600,mb:"xs",children:"2. Open JSON Schema Tool"}),(0,s.jsx)(l.E,{children:'Click on "Tools" in the toolbar and select "JSON Schema".'})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)(l.E,{fw:600,mb:"xs",children:"3. Enter Your Schema"}),(0,s.jsx)(l.E,{children:"Type or paste your JSON Schema in the editor. You can use the example provided or create your own."})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)(l.E,{fw:600,mb:"xs",children:"4. Apply Schema"}),(0,s.jsx)(l.E,{children:'Click "Apply" to validate your JSON data against the schema.'})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)(l.E,{fw:600,mb:"xs",children:"5. View Validation Results"}),(0,s.jsx)(l.E,{children:"Any validation errors will appear in the bottom toolbar of the editor pane."})]})]})]}),(0,s.jsxs)(a.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,s.jsx)(h.h,{mb:"md",order:2,c:"dark",children:"Basic Schema Structure"}),(0,s.jsxs)(g,{children:[(0,s.jsx)(l.E,{children:"A basic JSON Schema consists of several key properties:"}),(0,s.jsx)(w,{children:`{
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
}`})]})]}),(0,s.jsxs)(a.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,s.jsx)(h.h,{mb:"md",order:2,c:"dark",children:"Common Keywords"}),(0,s.jsx)(g,{children:(0,s.jsxs)(x.X,{striped:!0,highlightOnHover:!0,withTableBorder:!0,withColumnBorders:!0,children:[(0,s.jsx)(x.X.Thead,{children:(0,s.jsxs)(x.X.Tr,{children:[(0,s.jsx)(x.X.Th,{children:"Keyword"}),(0,s.jsx)(x.X.Th,{children:"Description"})]})}),(0,s.jsxs)(x.X.Tbody,{children:[(0,s.jsxs)(x.X.Tr,{children:[(0,s.jsx)(x.X.Td,{children:(0,s.jsx)(v,{children:"$schema"})}),(0,s.jsx)(x.X.Td,{children:"Declares which version of JSON Schema the schema is written in"})]}),(0,s.jsxs)(x.X.Tr,{children:[(0,s.jsx)(x.X.Td,{children:(0,s.jsx)(v,{children:"title"})}),(0,s.jsx)(x.X.Td,{children:"A short description of the schema"})]}),(0,s.jsxs)(x.X.Tr,{children:[(0,s.jsx)(x.X.Td,{children:(0,s.jsx)(v,{children:"description"})}),(0,s.jsx)(x.X.Td,{children:"A detailed description of the schema or property"})]}),(0,s.jsxs)(x.X.Tr,{children:[(0,s.jsx)(x.X.Td,{children:(0,s.jsx)(v,{children:"type"})}),(0,s.jsx)(x.X.Td,{children:"Defines the data type (string, number, integer, boolean, object, array, null)"})]}),(0,s.jsxs)(x.X.Tr,{children:[(0,s.jsx)(x.X.Td,{children:(0,s.jsx)(v,{children:"properties"})}),(0,s.jsx)(x.X.Td,{children:"Defines the properties of an object"})]}),(0,s.jsxs)(x.X.Tr,{children:[(0,s.jsx)(x.X.Td,{children:(0,s.jsx)(v,{children:"required"})}),(0,s.jsx)(x.X.Td,{children:"Array of property names that must be present"})]}),(0,s.jsxs)(x.X.Tr,{children:[(0,s.jsx)(x.X.Td,{children:(0,s.jsx)(v,{children:"enum"})}),(0,s.jsx)(x.X.Td,{children:"Restricts value to a fixed set of values"})]}),(0,s.jsxs)(x.X.Tr,{children:[(0,s.jsx)(x.X.Td,{children:(0,s.jsx)(v,{children:"minimum"})}),(0,s.jsx)(x.X.Td,{children:"Minimum value for numbers"})]}),(0,s.jsxs)(x.X.Tr,{children:[(0,s.jsx)(x.X.Td,{children:(0,s.jsx)(v,{children:"maximum"})}),(0,s.jsx)(x.X.Td,{children:"Maximum value for numbers"})]}),(0,s.jsxs)(x.X.Tr,{children:[(0,s.jsx)(x.X.Td,{children:(0,s.jsx)(v,{children:"minLength"})}),(0,s.jsx)(x.X.Td,{children:"Minimum length for strings"})]}),(0,s.jsxs)(x.X.Tr,{children:[(0,s.jsx)(x.X.Td,{children:(0,s.jsx)(v,{children:"maxLength"})}),(0,s.jsx)(x.X.Td,{children:"Maximum length for strings"})]}),(0,s.jsxs)(x.X.Tr,{children:[(0,s.jsx)(x.X.Td,{children:(0,s.jsx)(v,{children:"pattern"})}),(0,s.jsx)(x.X.Td,{children:"Regular expression pattern for strings"})]}),(0,s.jsxs)(x.X.Tr,{children:[(0,s.jsx)(x.X.Td,{children:(0,s.jsx)(v,{children:"items"})}),(0,s.jsx)(x.X.Td,{children:"Schema for array items"})]}),(0,s.jsxs)(x.X.Tr,{children:[(0,s.jsx)(x.X.Td,{children:(0,s.jsx)(v,{children:"minItems"})}),(0,s.jsx)(x.X.Td,{children:"Minimum number of items in array"})]}),(0,s.jsxs)(x.X.Tr,{children:[(0,s.jsx)(x.X.Td,{children:(0,s.jsx)(v,{children:"maxItems"})}),(0,s.jsx)(x.X.Td,{children:"Maximum number of items in array"})]})]})]})})]}),(0,s.jsxs)(a.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,s.jsx)(h.h,{mb:"md",order:2,c:"dark",children:"Practical Examples"}),(0,s.jsxs)(g,{children:[(0,s.jsxs)("div",{children:[(0,s.jsx)(l.E,{fw:600,mb:"xs",children:"Example 1: Simple User Schema"}),(0,s.jsx)(w,{children:`{
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
}`}),(0,s.jsx)(l.E,{c:"dimmed",size:"sm",mt:"xs",children:"Valid JSON:"}),(0,s.jsx)(w,{children:`{
  "username": "john_doe",
  "email": "john@example.com",
  "age": 30
}`})]}),(0,s.jsx)(j.c,{my:"md"}),(0,s.jsxs)("div",{children:[(0,s.jsx)(l.E,{fw:600,mb:"xs",children:"Example 2: Product with Enum"}),(0,s.jsx)(w,{children:`{
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
}`})]}),(0,s.jsx)(j.c,{my:"md"}),(0,s.jsxs)("div",{children:[(0,s.jsx)(l.E,{fw:600,mb:"xs",children:"Example 3: Array of Objects"}),(0,s.jsx)(w,{children:`{
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
}`}),(0,s.jsx)(l.E,{c:"dimmed",size:"sm",mt:"xs",children:"Valid JSON:"}),(0,s.jsx)(w,{children:`{
  "users": [
    { "id": 1, "name": "Alice" },
    { "id": 2, "name": "Bob" }
  ]
}`})]}),(0,s.jsx)(j.c,{my:"md"}),(0,s.jsxs)("div",{children:[(0,s.jsx)(l.E,{fw:600,mb:"xs",children:"Example 4: Nested Objects"}),(0,s.jsx)(w,{children:`{
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
}`})]}),(0,s.jsx)(j.c,{my:"md"}),(0,s.jsxs)("div",{children:[(0,s.jsx)(l.E,{fw:600,mb:"xs",children:"Example 5: String Pattern Validation"}),(0,s.jsx)(w,{children:`{
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
}`})]}),(0,s.jsx)(j.c,{my:"md"}),(0,s.jsxs)("div",{children:[(0,s.jsx)(l.E,{fw:600,mb:"xs",children:"Example 6: Advanced Schema with Definitions"}),(0,s.jsx)(l.E,{c:"dimmed",size:"sm",mb:"xs",children:"Complex schema using definitions and references for reusable components"}),(0,s.jsx)(w,{children:`{
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
}`}),(0,s.jsx)(l.E,{c:"dimmed",size:"sm",mt:"xs",children:"Valid JSON:"}),(0,s.jsx)(w,{children:`{
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
}`})]})]})]}),(0,s.jsxs)(a.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,s.jsx)(h.h,{mb:"md",order:2,c:"dark",children:"Using Definitions and References"}),(0,s.jsxs)(g,{children:[(0,s.jsxs)(l.E,{children:["The ",(0,s.jsx)(v,{children:"definitions"})," keyword allows you to define reusable schemas that can be referenced throughout your JSON Schema using"," ",(0,s.jsx)(v,{children:"$ref"}),"."]}),(0,s.jsx)(l.E,{fw:600,mt:"md",mb:"xs",children:"Benefits:"}),(0,s.jsx)(l.E,{children:"• Reduces duplication in your schema"}),(0,s.jsx)(l.E,{children:"• Makes schemas more maintainable"}),(0,s.jsx)(l.E,{children:"• Allows for complex nested structures"}),(0,s.jsx)(l.E,{children:"• Enables schema composition and reuse"}),(0,s.jsx)(l.E,{fw:600,mt:"md",mb:"xs",children:"Example:"}),(0,s.jsx)(w,{children:`{
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
}`})]})]}),(0,s.jsxs)(a.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,s.jsx)(h.h,{mb:"md",order:2,c:"dark",children:"Data Types"}),(0,s.jsx)(g,{children:(0,s.jsxs)(x.X,{striped:!0,highlightOnHover:!0,withTableBorder:!0,withColumnBorders:!0,children:[(0,s.jsx)(x.X.Thead,{children:(0,s.jsxs)(x.X.Tr,{children:[(0,s.jsx)(x.X.Th,{children:"Type"}),(0,s.jsx)(x.X.Th,{children:"Description"}),(0,s.jsx)(x.X.Th,{children:"Example"})]})}),(0,s.jsxs)(x.X.Tbody,{children:[(0,s.jsxs)(x.X.Tr,{children:[(0,s.jsx)(x.X.Td,{children:(0,s.jsx)(v,{children:"string"})}),(0,s.jsx)(x.X.Td,{children:"Text data"}),(0,s.jsx)(x.X.Td,{children:(0,s.jsx)(v,{children:'"hello"'})})]}),(0,s.jsxs)(x.X.Tr,{children:[(0,s.jsx)(x.X.Td,{children:(0,s.jsx)(v,{children:"number"})}),(0,s.jsx)(x.X.Td,{children:"Numeric data (integer or float)"}),(0,s.jsxs)(x.X.Td,{children:[(0,s.jsx)(v,{children:"42"}),","," ",(0,s.jsx)(v,{children:"3.14"})]})]}),(0,s.jsxs)(x.X.Tr,{children:[(0,s.jsx)(x.X.Td,{children:(0,s.jsx)(v,{children:"integer"})}),(0,s.jsx)(x.X.Td,{children:"Whole numbers only"}),(0,s.jsx)(x.X.Td,{children:(0,s.jsx)(v,{children:"42"})})]}),(0,s.jsxs)(x.X.Tr,{children:[(0,s.jsx)(x.X.Td,{children:(0,s.jsx)(v,{children:"boolean"})}),(0,s.jsx)(x.X.Td,{children:"True or false"}),(0,s.jsxs)(x.X.Td,{children:[(0,s.jsx)(v,{children:"true"}),","," ",(0,s.jsx)(v,{children:"false"})]})]}),(0,s.jsxs)(x.X.Tr,{children:[(0,s.jsx)(x.X.Td,{children:(0,s.jsx)(v,{children:"object"})}),(0,s.jsx)(x.X.Td,{children:"Key-value pairs"}),(0,s.jsx)(x.X.Td,{children:(0,s.jsx)(v,{children:'{"key": "value"}'})})]}),(0,s.jsxs)(x.X.Tr,{children:[(0,s.jsx)(x.X.Td,{children:(0,s.jsx)(v,{children:"array"})}),(0,s.jsx)(x.X.Td,{children:"Ordered list of values"}),(0,s.jsx)(x.X.Td,{children:(0,s.jsx)(v,{children:"[1, 2, 3]"})})]}),(0,s.jsxs)(x.X.Tr,{children:[(0,s.jsx)(x.X.Td,{children:(0,s.jsx)(v,{children:"null"})}),(0,s.jsx)(x.X.Td,{children:"Null value"}),(0,s.jsx)(x.X.Td,{children:(0,s.jsx)(v,{children:"null"})})]})]})]})})]}),(0,s.jsxs)(a.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,s.jsx)(h.h,{mb:"md",order:2,c:"dark",children:"String Formats"}),(0,s.jsxs)(g,{children:[(0,s.jsx)(l.E,{mb:"md",children:"JSON Schema supports various string formats for common data types:"}),(0,s.jsxs)(x.X,{striped:!0,highlightOnHover:!0,withTableBorder:!0,withColumnBorders:!0,children:[(0,s.jsx)(x.X.Thead,{children:(0,s.jsxs)(x.X.Tr,{children:[(0,s.jsx)(x.X.Th,{children:"Format"}),(0,s.jsx)(x.X.Th,{children:"Description"})]})}),(0,s.jsxs)(x.X.Tbody,{children:[(0,s.jsxs)(x.X.Tr,{children:[(0,s.jsx)(x.X.Td,{children:(0,s.jsx)(v,{children:"date-time"})}),(0,s.jsx)(x.X.Td,{children:"Date and time (RFC 3339)"})]}),(0,s.jsxs)(x.X.Tr,{children:[(0,s.jsx)(x.X.Td,{children:(0,s.jsx)(v,{children:"date"})}),(0,s.jsx)(x.X.Td,{children:"Date only (YYYY-MM-DD)"})]}),(0,s.jsxs)(x.X.Tr,{children:[(0,s.jsx)(x.X.Td,{children:(0,s.jsx)(v,{children:"time"})}),(0,s.jsx)(x.X.Td,{children:"Time only (HH:MM:SS)"})]}),(0,s.jsxs)(x.X.Tr,{children:[(0,s.jsx)(x.X.Td,{children:(0,s.jsx)(v,{children:"email"})}),(0,s.jsx)(x.X.Td,{children:"Email address"})]}),(0,s.jsxs)(x.X.Tr,{children:[(0,s.jsx)(x.X.Td,{children:(0,s.jsx)(v,{children:"uri"})}),(0,s.jsx)(x.X.Td,{children:"Uniform Resource Identifier"})]}),(0,s.jsxs)(x.X.Tr,{children:[(0,s.jsx)(x.X.Td,{children:(0,s.jsx)(v,{children:"hostname"})}),(0,s.jsx)(x.X.Td,{children:"Internet hostname"})]}),(0,s.jsxs)(x.X.Tr,{children:[(0,s.jsx)(x.X.Td,{children:(0,s.jsx)(v,{children:"ipv4"})}),(0,s.jsx)(x.X.Td,{children:"IPv4 address"})]}),(0,s.jsxs)(x.X.Tr,{children:[(0,s.jsx)(x.X.Td,{children:(0,s.jsx)(v,{children:"ipv6"})}),(0,s.jsx)(x.X.Td,{children:"IPv6 address"})]})]})]})]})]}),(0,s.jsxs)(a.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,s.jsx)(h.h,{mb:"md",order:2,c:"dark",children:"Tips & Best Practices"}),(0,s.jsxs)(g,{children:[(0,s.jsxs)("div",{children:[(0,s.jsx)(l.E,{fw:600,children:"• Start Simple"}),(0,s.jsx)(l.E,{children:"Begin with basic type validation and add constraints incrementally."})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)(l.E,{fw:600,children:"• Use Descriptions"}),(0,s.jsxs)(l.E,{children:["Add ",(0,s.jsx)(v,{children:"description"})," fields to document your schema for better understanding."]})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)(l.E,{fw:600,children:"• Be Specific with Types"}),(0,s.jsxs)(l.E,{children:["Use ",(0,s.jsx)(v,{children:"integer"})," instead of"," ",(0,s.jsx)(v,{children:"number"})," when appropriate."]})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)(l.E,{fw:600,children:"• Validate Required Fields"}),(0,s.jsxs)(l.E,{children:["Always specify ",(0,s.jsx)(v,{children:"required"})," array for mandatory properties."]})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)(l.E,{fw:600,children:"• Use Enums for Fixed Values"}),(0,s.jsxs)(l.E,{children:["When a property can only have specific values, use"," ",(0,s.jsx)(v,{children:"enum"})," to restrict them."]})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)(l.E,{fw:600,children:"• Test Your Schema"}),(0,s.jsx)(l.E,{children:"Validate your schema against sample data to ensure it works as expected."})]})]})]}),(0,s.jsxs)(a.t,{bg:"white",c:"black",p:"xl",radius:"md",withBorder:!0,children:[(0,s.jsx)(h.h,{mb:"md",order:3,c:"dark",children:"Need Help?"}),(0,s.jsx)(g,{children:(0,s.jsxs)(l.E,{children:["If you encounter issues or have questions, visit our"," ",(0,s.jsx)(E,{href:"/docs",children:"Documentation"})," or try the"," ",(0,s.jsx)(E,{href:"/tools/json-schema",children:"JSON Schema Tool"})," directly."]})})]})]})})]})}},80785:(e,i,r)=>{"use strict";r.d(i,{l:()=>s});let s=()=>{}}},e=>{e.O(0,[8585,4938,1287,6701,1375,9951,3477,2564,2509,270,9052,2161,9530,636,6593,8792],()=>e(e.s=56356)),_N_E=e.O()}]);
//# sourceMappingURL=json-schema-db13f0ca90e06020.js.map