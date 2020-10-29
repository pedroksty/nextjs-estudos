import { GetServerSideProps } from "next";
import Link from 'next/link'
import React, { useCallback } from "react";
import { Title } from "../styles/pages/Home";
import SEO from "@/components/SEO";
import { client } from "@/lib/prismic";
import Prismic from 'prismic-javascript'
import PrismicDOM from 'prismic-dom'
import { Document } from 'prismic-javascript/types/documents'



interface HomeProps {
  recommendedProcuts: Document[];
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
            <li key={recommendedProduct.id}>
              <Link href={`/catalog/products/${recommendedProduct.uid}`} >
                <a>
                  {PrismicDOM.RichText.asText(recommendedProduct.data.title)}
                </a>
              </Link>
              </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product')
  ])


  return {
    props: {
      recommendedProcuts: recommendedProducts.results ,
    },
  };
};
