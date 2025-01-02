import js from "@eslint/js";
import pluginNext from "@next/eslint-plugin-next";
import eslintConfigPrettier from "eslint-config-prettier";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintPluginTailwindcss from "eslint-plugin-tailwindcss";
import eslintJsxA11y from "eslint-plugin-jsx-a11y";
import eslintImport from "eslint-plugin-import";
import eslintPrettier from "eslint-config-prettier";

import { config as baseConfig } from "./base.js";

/**
 * A custom ESLint configuration for libraries that use Next.js.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const nextJsConfig = [
  ...baseConfig,
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
      },
    },
  },
  {
    plugins: {
      "@next/next": pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules
    },
  },
  {
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      // React scope no longer necessary with new JSX transform.
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
  {
    plugins: {
      tailwindcss: eslintPluginTailwindcss,
      "jsx-a11y": eslintJsxA11y,
      "import": eslintImport,
      "prettier": eslintPrettier
    },
    rules: {
      ...eslintPluginTailwindcss.configs.recommended.rules,
      ...eslintJsxA11y.configs.recommended.rules,
      ...eslintImport.configs.recommended.rules,
      "tailwindcss/no-custom-classname": "off",
      "import/no-unresolved": "off",
      "import/order": [
        "warn",
        {
          "groups": ["builtin", "external", "internal", "type"],
          // "groups": [
          //   "type",
          //   "builtin",
          //   "object",
          //   "external",
          //   "internal",
          //   "parent",
          //   "sibling",
          //   "index"
          // ],
          "pathGroups": [
            {
              "pattern": "react",
              "group": "builtin",
              "position": "before"
            }
            // {
            //   "pattern": "~/**",
            //   "group": "external",
            //   "position": "after"
            // }
          ],
          "pathGroupsExcludedImportTypes": ["react"], // external로 간주되어 alias 적용안되는 문제 해결
          "alphabetize": {
            "order": "asc",
            "caseInsensitive": true // 대문자 우선
          },
          "newlines-between": "always" // 그룹별 모두 한줄 띄우기
        }
      ]
    },
  }
];
