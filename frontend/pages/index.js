import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps = async (context) => {
  let menuItems;

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_HASURA_PROJECT_ENDPOINT, {
      method: "POST",
      headers: {
        "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET
      },
      body: JSON.stringify({
        query: `query {
          menu_items {
            name
          }
        }`
      })
    });
    const result = await response.json();
    menuItems = result.data;
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      menuItems
    }
  };
};

export default function Home({ menuItems }) {
  console.log(menuItems);

  return (
    <div className={styles.container}>
      {menuItems.menu_items.map((menuItem) => {
        return <div>{menuItem.name}</div>;
      })}
    </div>
  );
}
