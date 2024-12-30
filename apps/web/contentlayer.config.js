import {defineDocumentType, makeSource} from "contentlayer/source-files";
import highlight from 'rehype-highlight';
import {rehypePrettyCode} from 'rehype-pretty-code';
import remarkGfm from "remark-gfm";

export const Post = defineDocumentType(() => ({
  name: 'Post',
  contentType: 'mdx',
  filePathPattern: `**/*.mdx`, // mdx 파일경로 패턴

  // mdx로 작성한 글 정보에 대해 입력해야하는 필드 정의
  /*
    [필드명]: {
      type: '자료형',
      required: '필수여부',
    }
  */
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    category: {
      type: 'string',
      required: true,
    },
    thumbnail: {
      type: 'string',
      required: false,
    },
    createdAt: {
      type: 'date',
      required: true,
    },
  },
}));

export default makeSource({
  // 마크다운 파일이 저장되어 있는 루트 폴더
  contentDirPath: 'posts',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: 'github-dark', // 코드작성시 적용할 테마
        },
      ],
      highlight,
    ],
  },
});

// import {defineDocumentType, defineNestedType, makeSource} from "contentlayer2/source-files";
// import remarkGfm from "remark-gfm";
// import rehypeSlug from "rehype-slug";
// import {visit} from "unist-util-visit";
// import RawPlugin from 'esbuild-plugin-raw'
// import pluginCodeBlock from "./plugins/codeBlock";

// /** @type {import('contentlayer2/source-files').ComputedFields} */
// const computedFields = {
//   slug: {
//     type: "string",
//     resolve: (doc) => `/${doc._raw.flattenedPath}`,
//   },
//   slugAsParams: {
//     type: "string",
//     resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
//   },
//   url: {type: "string", resolve: (doc) => `/${doc._raw.flattenedPath}`},
// };

// export const Doc = defineDocumentType(() => ({
//   name: "Doc",
//   filePathPattern: `docs/**/*.mdx`,
//   contentType: "mdx",
//   fields: {
//     title: {type: "string", required: true},
//     description: {type: "string", required: false},
//     date: {type: "date", required: false},
//   },
//   computedFields,
// }));

// const AuthorProperties = defineNestedType(() => ({
//   name: "AuthorProperties",
//   fields: {
//     name: {type: "string", required: true},
//     link: {type: "string", required: false},
//     avatar: {type: "string", required: false},
//     username: {type: "string", required: false},
//   },
// }));

// export const BlogPost = defineDocumentType(() => ({
//   name: "BlogPost",
//   filePathPattern: `blog/**/*.mdx`,
//   contentType: "mdx",
//   fields: {
//     title: {type: "string", required: true},
//     description: {type: "string", required: true},
//     date: {type: "date", required: true},
//     draft: {type: "boolean", required: false},
//     tags: {type: "list", of: {type: "string"}},
//     author: {type: "nested", of: AuthorProperties, required: false},
//     image: {type: "string", required: false},
//   },
//   computedFields: {
//     ...computedFields,
//     // Date format June 22nd 2023
//     formattedDate: {
//       type: "string",
//       resolve: (doc) => {
//         const date = new Date(doc.date);
//         const options = {year: "numeric", month: "long", day: "numeric"};
//         return date.toLocaleDateString("en-US", options);
//       },
//     },
//     // add https://nextui.org to the image path
//     imageAsParams: {
//       type: "string",
//       resolve: (doc) => {
//         const image = doc.image;
//         if (image) {
//           return `https://nextui.org${image}`;
//         }
//       },
//     },
//   },
// }));

// export default makeSource({
//   contentDirPath: "./content",
//   documentTypes: [Doc, BlogPost],
//   mdx: {
//     remarkPlugins: [remarkGfm, pluginCodeBlock],
//     esbuildOptions(options) {
//       options.plugins ||= [];
//       options.plugins.unshift(RawPlugin());
 
//       return options;
//     },
//     rehypePlugins: [
//       rehypeSlug,
//       () => (tree) => {
//         visit(tree, "element", (node) => {
//           if (node.tagName === "code" && node.data && node.data.meta) {
//             node.properties.meta = node.data.meta;
//           }
//         });
//       },
//     ],
//   },
// });