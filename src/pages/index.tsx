import { GetServerSideProps } from "next";
import { Title } from "../styles/pages/Home";

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
  const response = await fetch("http://localhost:4444/recommended");
  const recommendedProcuts = await response.json();

  return {
    props: {
      recommendedProcuts,
    },
  };
};
