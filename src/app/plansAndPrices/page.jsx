/* eslint-disable react-hooks/exhaustive-deps */
"use client";

/* eslint-disable react/no-unescaped-entities */
// App/Pages/index.js
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  getPricePlans,
  getSubscriptions,
  createSubscription,
} from "../../services/api";
import Error from "../components/Error";
import CardSlider from "../components/plansPriceSlider";
import { Spinner } from "@fluentui/react/lib/Spinner";

const PlansAndPrices = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { subscriptions, pricePlans, loading } = useSelector(
    (state) => state.subscription
  );
  const { auth } = useSelector((state) => state);
  const [getPriceUsdPlans, setGetPriceUsdPlans] = useState([]);
  const [pricePlansType, setPricePlansType] = useState("monthly");
  const [selectedCurrency, setSelectedCurrency] = useState("usd");
  const [selectedPlan, setSelectedPlan] = useState(0);

  useEffect(() => {
    dispatch(getPricePlans());
    dispatch(getSubscriptions());
    console.log(auth);
  }, [dispatch, pricePlans.length, subscriptions.length]);

  useEffect(() => {
    console.log("We ran");
    const currencyList = {
      usd: [3, 6, 9, 12],
      chf: [1, 4, 10],
      euro: [2, 5, 11],
    };
    if (!loading && pricePlans?.length) {
      const getPlans = pricePlans?.filter((a) =>
        currencyList[selectedCurrency]?.includes(a.pricePlanID)
      );
      setGetPriceUsdPlans(getPlans);
    }
  }, [selectedCurrency, pricePlans, loading]);

  const getPlanType = (type) => {
    setPricePlansType(type);
  };

  const changeCurrency = (event) => {
    event.preventDefault();
    setSelectedCurrency(event.target.value);
  };

  const handleContinueClick = React.useCallback(() => {
    const pricePlan = getPriceUsdPlans.find((item) =>
      item?.pricePlanName.includes(selectedPlan?.subscriptionPlanName)
    );
    const billingPreference =
      pricePlansType === "monthly"
        ? "M"
        : pricePlansType === "quarterly"
        ? "Q"
        : pricePlansType === "yearly"
        ? "Y"
        : "";
    console.log(pricePlan);
    const selectedSubscription = {
      subscriptionName: selectedPlan?.subscriptionPlanName,
      subscriptionSelectedPricePlan: pricePlan?.currencyID,
      subscriptionBillingCountry:
        "http://k8s.integration.feather-lab.com:32744/countries/1/",
      subscriptionBillingLanguage:
        "http://k8s.integration.feather-lab.com:32744/languages/1/",
      comment: pricePlan?.comment,
      subscriptionBillingEmail: auth?.user?.email,
      subscriptionBillingPreference: billingPreference,
      enterpriseBillingRequestEmail: auth?.user?.email,
    };
    dispatch(createSubscription(selectedSubscription));
  }, [
    getPriceUsdPlans,
    selectedPlan,
    selectedCurrency,
    pricePlansType,
    dispatch,
  ]);

  return (
    <div className="price-plans">
      <h1>Subscribe</h1>
      {!loading && getPricePlans?.length && subscriptions?.length ? (
        <>
          <div className="row">
            <span className="subscription-cta">
              <button
                className="btn btn-info"
                onClick={() => {
                  getPlanType("monthly");
                }}
              >
                Monthly
              </button>
              <button
                className="btn btn-info"
                onClick={() => {
                  getPlanType("quarterly");
                }}
              >
                Quarterly
              </button>
              <button
                className="btn btn-info"
                onClick={() => {
                  getPlanType("yearly");
                }}
              >
                Yearly
              </button>
            </span>
            <div className="currency-selector-area">
              <select
                className="my-select selectpicker currency-selector"
                data-container="body"
                onChange={(e) => changeCurrency(e)}
              >
                <option defaultChecked value="usd">{`USD (US Dollar)`}</option>
                <option value="chf">{`CHF (Swiss Franc)`}</option>
                <option value="euro">{`EUR (Euro)`}</option>
              </select>
            </div>
          </div>
          <CardSlider
            cards={getPriceUsdPlans}
            subscriptionsCard={subscriptions}
            subsType={pricePlansType}
            selectedCurrency={selectedCurrency}
            setSelectedPlan={setSelectedPlan}
          />
          <div className="continue-cta">
            <button className="btn btn-primary" onClick={handleContinueClick}>
              Continue
            </button>
          </div>
        </>
      ) : (
        <Spinner label="Loading..." />
      )}
    </div>
  );
};

export default PlansAndPrices;
