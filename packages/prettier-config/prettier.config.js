export default {
  tabWidth: 2,
  bracketSpacing: true,
  singleQuote: true,
  bracketSameLine: true,
  trailingComma: "none",
  printWidth: 100,
  semi: false,
  jsxSingleQuote: true,
  overrides: [
    {
      files: "*.css",
      options: {
        parser: "css",
      },
    },
    {
      files: "*.md",
      options: {
        parser: "mdx",
      },
    },
  ],
};
