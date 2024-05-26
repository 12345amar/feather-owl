"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className="row mt-4">
        <Link
          href="/login"
          className="col-md-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h6>Login</h6>
        </Link>
        <Link
          href="/register"
          className="col-md-8"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h6>Registration</h6>
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
