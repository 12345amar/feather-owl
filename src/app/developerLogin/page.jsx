"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import styles from "./../page.module.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { login, getUserSubscriptions } from "../../services/api";

export default function DeveloperLogin() {
  const { loading, user } = useSelector((state) => state.auth);
  const { userSubscriptions, loading: loadingUserSubscription } = useSelector((state) => state.subscription);
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!loadingUserSubscription && userSubscriptions?.length) {
      router.push("/dashboard");
    }
    if (
      !loading &&
      user &&
      !loadingUserSubscription &&
      !userSubscriptions?.length
    ) {
      router.push("/plansAndPrices");
    }
  }, [loading, user, userSubscriptions, loadingUserSubscription]);

  const handleLoginSubmit = (data) => {
    const formData = { ...data, isDeveloper: true }; // Get form data
    dispatch(login(formData));
    dispatch(getUserSubscriptions());
  };
  return (
    <main className={styles.main}>
      <div className="flex-row" style={{ width: "600px" }}>
        <h5>Developer Login by Access Token</h5>
        <div className="flex">
          {user?.error?.message && (
            <div className="alert alert-danger" role="alert">
              {user?.error?.message}
            </div>
          )}
          <form onSubmit={handleSubmit(handleLoginSubmit)}>
            <textarea
              style={{ height: "200px" }}
              {...register("accessToken")}
              name="accessToken"
              className="col-md-12"
              placeholder="Enter Access Token"
            ></textarea>
            <button
              type="submit"
              className="btn btn-primary btn-block col-md-12"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/assets/images/logo.svg"
          alt="Next.js Logo"
          width={600}
          height={200}
          priority
        />
      </div>
    </main>
  );
}
