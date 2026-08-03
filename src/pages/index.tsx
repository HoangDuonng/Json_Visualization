import React from "react";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import Head from "next/head";
import { generateNextSeo } from "next-seo/pages";
import { SEO, SITE_URL } from "../constants/seo";
import { EditorialHome } from "../layout/Landing/EditorialHome";
import Layout from "../layout/PageLayout";

export const HomePage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout stars={props.stars}>
      <Head>
        {generateNextSeo({ ...SEO, canonical: SITE_URL })}
        <link rel="preload" href="/assets/editor.webp" as="image" />
      </Head>
      <EditorialHome stars={props.stars} />
    </Layout>
  );
};

export default HomePage;

export const getStaticProps = (async () => {
  try {
    const res = await fetch("https://api.github.com/repos/HoangDuonng/Json_Visualization");
    const data = await res.json();

    return {
      props: {
        stars: data?.stargazers_count || 0,
      },
    };
  } catch {
    return {
      props: {
        stars: 0,
      },
    };
  }
}) satisfies GetStaticProps<{ stars: number }>;
