import type { DefaultSeoProps } from "next-seo/pages";

export const SEO: DefaultSeoProps = {
  title: "JSON Visualization | Online JSON Viewer - Transform your data into interactive graphs",
  description:
    "JSON Visualization Editor is a tool for visualizing into graphs, analyzing, editing, formatting, querying, transforming and validating JSON, CSV, YAML, XML, and more.",
  themeColor: "#36393E",
  openGraph: {
    type: "website",
    images: [
      {
        url: "https://jsonviz.online/jsonvisualization.png",
        width: 1200,
        height: 627,
      },
    ],
  },
  twitter: {
    handle: "@HoanggDuonng",
    cardType: "summary_large_image",
  },
  additionalLinkTags: [
    {
      rel: "manifest",
      href: "/manifest.json",
    },
    {
      rel: "icon",
      href: "/favicon.ico",
      sizes: "48x48",
    },
  ],
};
