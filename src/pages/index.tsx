import { GetServerSideProps } from "next";
import { useCallback } from "react";
import { Title } from "../styles/pages/Home";

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProcuts: IProduct[];
}

export default function Home({ recommendedProcuts }: HomeProps) {
  const handleSumn = useCallback(async () => {
    const { sum } = (await import("../lib/math")).default;

    console.log(process.env.NEXT_PUBLIC_API_URL);

    alert(sum(3, 9));
  }, []);

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

      <button onClick={handleSumn}>sumn!</button>
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
