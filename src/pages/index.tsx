import React from "react";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import Head from "next/head";
import { generateNextSeo } from "next-seo/pages";
import { SEO, SITE_URL } from "../constants/seo";
import { FAQ } from "../layout/Landing/FAQ";
import { Features } from "../layout/Landing/Features";
import { HeroPreview } from "../layout/Landing/HeroPreview";
import { HeroSection } from "../layout/Landing/HeroSection";
import { Section1 } from "../layout/Landing/Section1";
import { Section2 } from "../layout/Landing/Section2";
import { Section3 } from "../layout/Landing/Section3";
import Layout from "../layout/PageLayout";

export const HomePage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout stars={props.stars}>
      <Head>{generateNextSeo({ ...SEO, canonical: SITE_URL })}</Head>
      <HeroSection stars={props.stars} />
      <HeroPreview />
      <Section1 />
      <Section2 />
      <Section3 />
      <Features />
      <FAQ />
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
