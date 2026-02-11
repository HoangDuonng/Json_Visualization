export const jsonPathTranslations = {
  title: {
    en: "JSON Path",
    vi: "JSON Path",
  },
  subtitle: {
    en: "Query and extract data from JSON using JSONPath expressions",
    vi: "Truy vấn và trích xuất dữ liệu từ JSON bằng biểu thức JSONPath",
  },
  alert: {
    en: "JSONPath expressions work similarly to XPath for XML, allowing you to navigate and query JSON structures with a simple syntax.",
    vi: "Biểu thức JSONPath hoạt động tương tự XPath cho XML, cho phép bạn điều hướng và truy vấn cấu trúc JSON với cú pháp đơn giản.",
  },
  whatIsJsonPath: {
    title: {
      en: "What is JSONPath?",
      vi: "JSONPath là gì?",
    },
    description1: {
      en: "JSONPath is a query language for JSON, similar to XPath for XML. It allows you to select and extract data from JSON documents using path expressions.",
      vi: "JSONPath là ngôn ngữ truy vấn cho JSON, tương tự như XPath cho XML. Nó cho phép bạn chọn và trích xuất dữ liệu từ tài liệu JSON bằng biểu thức đường dẫn.",
    },
    description2a: {
      en: "The root element is always referred to as",
      vi: "Phần tử gốc luôn được gọi là",
    },
    description2b: {
      en: "regardless of whether it's an object or array. From there, you can navigate through the structure using dot notation or bracket notation.",
      vi: "bất kể nó là object hay array. Từ đó, bạn có thể điều hướng qua cấu trúc bằng ký hiệu dấu chấm hoặc ký hiệu ngoặc vuông.",
    },
  },
  howToUse: {
    title: {
      en: "How to Use",
      vi: "Cách sử dụng",
    },
    step1: {
      title: {
        en: "1. Open the Editor",
        vi: "1. Mở trình soạn thảo",
      },
      description: {
        en: "Load your JSON data in the",
        vi: "Tải dữ liệu JSON của bạn vào",
      },
    },
    step2: {
      title: {
        en: "2. Open JSON Path Tool",
        vi: "2. Mở công cụ JSON Path",
      },
      description: {
        en: 'Click on "Tools" in the toolbar and select "JSON Path".',
        vi: 'Nhấp vào "Công cụ" trên thanh công cụ và chọn "JSON Path".',
      },
    },
    step3: {
      title: {
        en: "3. Enter Your Path Expression",
        vi: "3. Nhập biểu thức đường dẫn",
      },
      description: {
        en: 'Type your JSONPath expression in the input field and click "Run".',
        vi: 'Nhập biểu thức JSONPath vào trường nhập liệu và nhấp "Chạy".',
      },
    },
    step4: {
      title: {
        en: "4. View Results",
        vi: "4. Xem kết quả",
      },
      description: {
        en: "The extracted data will be displayed in the editor.",
        vi: "Dữ liệu được trích xuất sẽ hiển thị trong trình soạn thảo.",
      },
    },
  },
  basicSyntax: {
    title: {
      en: "Basic Syntax",
      vi: "Cú pháp cơ bản",
    },
    operatorHeader: {
      en: "Operator",
      vi: "Toán Tử",
    },
    descriptionHeader: {
      en: "Description",
      vi: "Mô Tả",
    },
    operators: {
      root: {
        en: "Root element",
        vi: "Phần tử gốc",
      },
      current: {
        en: "Current element (used in filters)",
        vi: "Phần tử hiện tại (dùng trong bộ lọc)",
      },
      child: {
        en: "Child operator (dot notation)",
        vi: "Toán tử con (ký hiệu dấu chấm)",
      },
      recursive: {
        en: "Recursive descent (search all levels)",
        vi: "Tìm kiếm đệ quy (tìm tất cả cấp độ)",
      },
      wildcard: {
        en: "Wildcard (all elements)",
        vi: "Ký tự đại diện (tất cả phần tử)",
      },
      subscript: {
        en: "Subscript operator (array index or object property)",
        vi: "Toán tử chỉ số (chỉ số mảng hoặc thuộc tính object)",
      },
      union: {
        en: "Union operator (multiple indices or properties)",
        vi: "Toán tử hợp (nhiều chỉ số hoặc thuộc tính)",
      },
      slice: {
        en: "Array slice operator",
        vi: "Toán tử cắt mảng",
      },
      filter: {
        en: "Filter expression",
        vi: "Biểu thức lọc",
      },
    },
  },
  practicalExamples: {
    title: {
      en: "Practical Examples",
      vi: "Ví dụ thực tế",
    },
    sampleData: {
      en: "Sample JSON Data:",
      vi: "Dữ liệu JSON mẫu:",
    },
    pathLabel: {
      en: "Path:",
      vi: "Đường dẫn:",
    },
    resultLabel: {
      en: "Result:",
      vi: "Kết quả:",
    },
    example1: {
      title: {
        en: "Example 1: Get all books",
        vi: "Ví dụ 1: Lấy tất cả sách",
      },
      path: {
        en: "Path:",
        vi: "Đường dẫn:",
      },
      description: {
        en: "Returns all book objects in the array",
        vi: "Trả về tất cả object sách trong mảng",
      },
    },
    example2: {
      title: {
        en: "Example 2: Get all book authors",
        vi: "Ví dụ 2: Lấy tất cả tác giả sách",
      },
      result: {
        en: "Result:",
        vi: "Kết quả:",
      },
    },
    example3: {
      title: {
        en: "Example 3: Get all prices in the store",
        vi: "Ví dụ 3: Lấy tất cả giá trong cửa hàng",
      },
      description: {
        en: "The .. operator searches recursively",
        vi: "Toán tử .. tìm kiếm đệ quy",
      },
    },
    example4: {
      title: {
        en: "Example 4: Get the first book",
        vi: "Ví dụ 4: Lấy cuốn sách đầu tiên",
      },
    },
    example5: {
      title: {
        en: "Example 5: Get the last book",
        vi: "Ví dụ 5: Lấy cuốn sách cuối cùng",
      },
      description: {
        en: "Negative indices count from the end",
        vi: "Chỉ số âm đếm từ cuối",
      },
    },
    example6: {
      title: {
        en: "Example 6: Get first two books",
        vi: "Ví dụ 6: Lấy hai cuốn sách đầu tiên",
      },
      description: {
        en: "Array slice: start index (inclusive) to end index (exclusive)",
        vi: "Cắt mảng: chỉ số bắt đầu (bao gồm) đến chỉ số kết thúc (không bao gồm)",
      },
    },
    example7: {
      title: {
        en: "Example 7: Filter books by price",
        vi: "Ví dụ 7: Lọc sách theo giá",
      },
      description: {
        en: "Returns books with price less than 10",
        vi: "Trả về sách có giá nhỏ hơn 10",
      },
    },
    example8: {
      title: {
        en: "Example 8: Filter books with ISBN",
        vi: "Ví dụ 8: Lọc sách có ISBN",
      },
      description: {
        en: "Returns books that have an ISBN property",
        vi: "Trả về sách có thuộc tính ISBN",
      },
    },
    example9: {
      title: {
        en: "Example 9: Get specific properties",
        vi: "Ví dụ 9: Lấy thuộc tính cụ thể",
      },
      description: {
        en: "Returns the first and third books (union operator)",
        vi: "Trả về cuốn sách thứ nhất và thứ ba (toán tử hợp)",
      },
    },
  },
  filterExpressions: {
    title: {
      en: "Filter Expressions",
      vi: "Biểu Thức Lọc",
    },
    description1: {
      en: "Filter expressions use",
      vi: "Biểu thức lọc sử dụng cú pháp",
    },
    description2: {
      en: "syntax with",
      vi: "với",
    },
    description3: {
      en: "representing the current element.",
      vi: "đại diện cho phần tử hiện tại.",
    },
    exampleHeader: {
      en: "Example",
      vi: "Ví Dụ",
    },
    operators: {
      equal: {
        description: {
          en: "Equal to",
          vi: "Bằng",
        },
      },
      notEqual: {
        description: {
          en: "Not equal to",
          vi: "Không bằng",
        },
      },
      lessThan: {
        description: {
          en: "Less than",
          vi: "Nhỏ hơn",
        },
      },
      lessEqual: {
        description: {
          en: "Less than or equal",
          vi: "Nhỏ hơn hoặc bằng",
        },
      },
      greaterThan: {
        description: {
          en: "Greater than",
          vi: "Lớn hơn",
        },
      },
      greaterEqual: {
        description: {
          en: "Greater than or equal",
          vi: "Lớn hơn hoặc bằng",
        },
      },
      and: {
        description: {
          en: "Logical AND",
          vi: "Phép AND logic",
        },
      },
      or: {
        description: {
          en: "Logical OR",
          vi: "Phép OR logic",
        },
      },
    },
  },
  tipsBestPractices: {
    title: {
      en: "Tips & Best Practices",
      vi: "Mẹo & Thực hành tốt nhất",
    },
    tip1: {
      title: {
        en: "• Always Start with $",
        vi: "• Luôn bắt đầu với $",
      },
      description1: {
        en: "Every JSONPath expression must start with",
        vi: "Mọi biểu thức JSONPath phải bắt đầu với",
      },
      description2: {
        en: "to reference the root element.",
        vi: "để tham chiếu phần tử gốc.",
      },
    },
    tip2: {
      title: {
        en: "• Use Dot Notation for Simple Paths",
        vi: "• Sử dụng ký hiệu dấu chấm cho đường dẫn đơn giản",
      },
      description1: {
        en: "is cleaner than",
        vi: "sạch hơn",
      },
    },
    tip3: {
      title: {
        en: "• Use Bracket Notation for Special Characters",
        vi: "• Sử dụng ký hiệu ngoặc vuông cho ký tự đặc biệt",
      },
      description1: {
        en: "If property names contain spaces or special characters, use bracket notation:",
        vi: "Nếu tên thuộc tính chứa khoảng trắng hoặc ký tự đặc biệt, sử dụng ký hiệu ngoặc vuông:",
      },
    },
    tip4: {
      title: {
        en: "• Test Incrementally",
        vi: "• Kiểm tra từng bước",
      },
      description1: {
        en: "Build complex paths step by step. Start with",
        vi: "Xây dựng đường dẫn phức tạp từng bước. Bắt đầu với",
      },
      description2: {
        en: ", then add",
        vi: ", sau đó thêm",
      },
      description3: {
        en: ", then filters.",
        vi: ", rồi bộ lọc.",
      },
    },
    tip5: {
      title: {
        en: "• Understand Your Data Structure",
        vi: "• Hiểu cấu trúc dữ liệu của bạn",
      },
      description: {
        en: "Use the graph visualization to understand your JSON structure before writing path expressions.",
        vi: "Sử dụng trực quan hóa đồ thị để hiểu cấu trúc JSON trước khi viết biểu thức đường dẫn.",
      },
    },
  },
  commonUseCases: {
    title: {
      en: "Common Use Cases",
      vi: "Trường hợp sử dụng phổ biến",
    },
    useCase1: {
      title: {
        en: "Extract All Values of a Specific Field",
        vi: "Trích xuất tất cả giá trị của một trường cụ thể",
      },
      description: {
        en: 'Recursively finds all occurrences of "fieldName" at any level',
        vi: 'Tìm đệ quy tất cả lần xuất hiện của "fieldName" ở bất kỳ cấp độ nào',
      },
    },
    useCase2: {
      title: {
        en: "Get All Array Elements",
        vi: "Lấy tất cả phần tử mảng",
      },
      description: {
        en: "Returns all elements in the array",
        vi: "Trả về tất cả phần tử trong mảng",
      },
    },
    useCase3: {
      title: {
        en: "Filter by Multiple Conditions",
        vi: "Lọc theo nhiều điều kiện",
      },
      description: {
        en: "Combines multiple filter conditions",
        vi: "Kết hợp nhiều điều kiện lọc",
      },
    },
    useCase4: {
      title: {
        en: "Get Nested Property from All Items",
        vi: "Lấy thuộc tính lồng nhau từ tất cả mục",
      },
      description: {
        en: "Extracts nested property from each array element",
        vi: "Trích xuất thuộc tính lồng nhau từ mỗi phần tử mảng",
      },
    },
  },
  needHelp: {
    title: {
      en: "Need Help?",
      vi: "Cần trợ giúp?",
    },
    description1: {
      en: "If you encounter issues or have questions, visit our",
      vi: "Nếu bạn gặp vấn đề hoặc có câu hỏi, hãy truy cập",
    },
    description2: {
      en: "or check out the",
      vi: "hoặc xem",
    },
    description3: {
      en: "to try it yourself.",
      vi: "để tự thử.",
    },
  },
};
