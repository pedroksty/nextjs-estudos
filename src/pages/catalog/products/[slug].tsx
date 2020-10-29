import { GetStaticPaths, GetStaticProps } from "next";
import Image from 'next/image'
import { useRouter } from "next/router";
import { client } from "@/lib/prismic";
import Prismic from 'prismic-javascript'
import PrismicDOM from 'prismic-dom'
import {Document} from 'prismic-javascript/types/documents'


interface ProductsProps {
  product: Document
}


export default function Product({ product }: ProductsProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>
        {PrismicDOM.RichText.asText(product.data.title)}
      </h1>

      <img 
        src={product.data.thumbnail.url} 
        alt="camisa daora"
        width={300} 
        height={300} 
      />

      <div dangerouslySetInnerHTML={{ __html: PrismicDOM.RichText.asHtml(product.data.description)}} >
      </div>

        <p>Price: ${product.data.price}</p>


    </div>
  );
}


export const getStaticPaths: GetStaticPaths = async () => {

 

  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<ProductsProps> = async (
  context
) => {
  const { slug } = context.params;


  const product = await client().getByUID('product', String(slug), {});

 
 

  return {
    props: {
      product,
    },
    revalidate: 5,
  };
};