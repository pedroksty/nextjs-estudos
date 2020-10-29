import { GetServerSideProps } from "next";
import React, { useCallback } from "react";
import { Title } from "../styles/pages/Home";
import SEO from "@/components/SEO";

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProcuts: IProduct[];
}

export default function Home({ recommendedProcuts }: HomeProps) {
  return (
    <div>
      <SEO
        title="DevCommer, your best e-commercer"
        shouldExludeTitleSuffix
        image="logo.png"
      />

      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProcuts.map((recommendedProduct) => (
            <li key={recommendedProduct.id}>{recommendedProduct.title}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/recommended`
  );
  const recommendedProcuts = await response.json();

  return {
    props: {
      recommendedProcuts,
    },
  };
};
