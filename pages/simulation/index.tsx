import Head from "next/head";
import styles from "@/pages/index.module.css";
import { Simulation } from "../../app/components/simulation";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Reonic Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className={styles.title}>
          The Simulation
        </h1>
        <Simulation />
      </main>
    </div>
  );
}
