module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-essential",
    // 'plugin:prettier/recommended' // 解决ESlint和Prettier冲突
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "vue"],
  rules: {
    // 使用小驼峰命名
    camelcase: [
      "error",
      {
        ignoreDestructuring: true,
        properties: "never",
      },
    ],
    // 关闭any类型的检查
    "@typescript-eslint/no-explicit-any": ["off"],
    /**
     * 不要在中括号中添加空格
     */
    "array-bracket-spacing": ["error", "never"],

    /**
     * 数组的方法除了 forEach 之外，回调函数必须有返回值
     */
    "array-callback-return": "warn",

    /**
     * 禁止箭头函数体使用大括号
     */
    "arrow-body-style": ["warn", "as-needed"],

    /**
     * 要求箭头函数的参数使用圆括号
     */
    "arrow-parens": ["warn", "as-needed", { requireForBlockBody: true }],

    /**
     * 强制箭头函数的箭头前后使用一致的空格
     */
    "arrow-spacing": "warn",

    /**
     * 要求打开的块标志和同一行上的标志拥有一致的间距。此规则还会在同一行关闭的块标记和前边的标记强制实施一致的间距。
     */
    "block-spacing": "error",

    /**
     * 强制在代码块中使用一致的大括号风格
     */
    "brace-style": "error",

    /**
     * 添加尾随逗号
     */
    'comma-dangle': ['warn', 'always-multiline'],

    /**
     * 强制在逗号前后使用一致的空格
     */
    'comma-spacing': ['error', { before: false, after: true }],

    /**
     * 强制使用一致的逗号风格
     */
    'comma-style': ['error', 'last'],

    /**
     * 强制在计算的属性的方括号中使用一致的空格
     */
    'computed-property-spacing': ['warn', 'never'],

    /**
     * 要求或禁止文件末尾存在空行
     */
    'eol-last': ['error', 'always'],

    /**
     * 必须使用 === 或 !==，禁止使用 == 或 !=
     */
    eqeqeq: ['warn', 'always'],

    /**
     * 要求或禁止在函数标识符和其调用之间有空格
     */
    'func-call-spacing': ['error', 'never'],

    /**
     * 必须只使用函数声明或只使用函数表达式
     */
    'func-style': ['off', 'expression'],

    /**
     * 强制在函数括号内使用一致的换行
     */
    'function-paren-newline': ['warn', 'multiline'],

    /**
     * 强制 generator 函数中 * 号周围使用一致的空格
     */
    'generator-star-spacing': ['warn', { before: false, after: true }],

    /**
     * 限制变量名长度
     */
    'id-length': 'off',

    /**
     * 强制隐式返回的箭头函数体的位置
     */
    'implicit-arrow-linebreak': ['warn', 'beside'],

    /**
     * 使用 2 个空格缩进
     */
    indent: ['warn', 2, {
      SwitchCase: 1,
      VariableDeclarator: 1,
      outerIIFEBody: 1,
      // MemberExpression: null,
      FunctionDeclaration: {
        parameters: 1,
        body: 1,
      },
      FunctionExpression: {
        parameters: 1,
        body: 1,
      },
      CallExpression: {
        arguments: 1,
      },
      ArrayExpression: 1,
      ObjectExpression: 1,
      ImportDeclaration: 1,
      flatTernaryExpressions: false,
      // list derived from https://github.com/benjamn/ast-types/blob/HEAD/def/jsx.js
      ignoredNodes: ['JSXElement', 'JSXElement > *', 'JSXAttribute', 'JSXIdentifier', 'JSXNamespacedName', 'JSXMemberExpression', 'JSXSpreadAttribute', 'JSXExpressionContainer', 'JSXOpeningElement', 'JSXClosingElement', 'JSXFragment', 'JSXOpeningFragment', 'JSXClosingFragment', 'JSXText', 'JSXEmptyExpression', 'JSXSpreadChild'],
      ignoreComments: false,
    }],

    /**
     * 强制在对象字面量的属性中键和值之间使用一致的间距
     */
    'key-spacing': 'error',

    /**
     * 强制在关键字前后使用一致的空格
     */
    'keyword-spacing': [
      'error',
      {
        overrides: {
          if: { after: true },
          for: { after: true },
          while: { after: true },
          else: { after: true },
        },
      },
    ],


    /**
     * 强制一行的最大长度，限制单行不能超过100个字符，字符串和正则表达式除外。
     */
    'max-len': [
      'error',
      {
        code: 150,
        ignoreStrings: true,
        ignoreUrls: true,
        ignoreRegExpLiterals: true,
        ignoreTemplateLiterals: true,
      },
    ],

    /**
     * 只有在命名构造器或者类的时候，才用帕斯卡拼命名法（PascalCase），即首字母大写。
     */
    'new-cap': [
      'error',
      {
        newIsCap: true,
        newIsCapExceptions: [],
        capIsNew: false,
        capIsNewExceptions: ['Immutable.Map', 'Immutable.Set', 'Immutable.List'],
        properties: false,
      },
    ],



  },
};
