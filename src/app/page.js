'use client';

import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link"


export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        <Link
          href="/login"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
           Login <span>-&gt;</span>
          </h2>
        </Link>
        <Link
          href="/signup"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Registration <span>-&gt;</span>
          </h2>
        </Link>

      </div>
      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/assets/images/logo.svg"
          alt="Next.js Logo"
          width={600}
          height={500}
          priority
        />
      </div>
    </main>
  );
}
