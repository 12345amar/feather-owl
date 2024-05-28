"use client";

/* eslint-disable react/no-unescaped-entities */
// App/Pages/index.js
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getPricePlans, getSubscriptions } from "../../services/api";
import Error from "../components/Error";
import CardSlider from "../components/plansPriceSlider";
import { Spinner } from "@fluentui/react/lib/Spinner";

const PlansAndPrices = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { subscriptions, pricePlans, loading } = useSelector(
    (state) => state.subscription
  );
  const [getPriceUsdPlans, setGetPriceUsdPlans] = useState([]);
  const [pricePlansType, setPricePlansType] = useState("monthly");
  const [selectedCurrency, setSelectedCurrency] = useState("usd");
  const [selectedPlan, setSelectedPlan] = useState(0);

  useEffect(() => {
    if (pricePlans?.length === 0 && !loading) {
      dispatch(getPricePlans());
    }
    if (subscriptions?.length === 0 && !loading) {
      dispatch(getSubscriptions());
    }
  }, [dispatch, loading, pricePlans?.length, subscriptions?.length]);

  useEffect(() => {
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
  }, [loading, pricePlans, selectedCurrency]);

  const getPlanType = (type) => {
    setPricePlansType(type);
  };

  const changeCurrency = (event) => {
    event.preventDefault();
    setSelectedCurrency(event.target.value);
  };

  const handleContinueClick = () => {
    console.log(getPriceUsdPlans);
    console.log(selectedPlan);
    console.log("clicked");
  };

  return (
    <div className="price-plans">
      <h1>Subscribe</h1>
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
      {!loading && getPricePlans?.length && subscriptions?.length ? (
        <CardSlider
          cards={getPriceUsdPlans}
          subscriptionsCard={subscriptions}
          subsType={pricePlansType}
          selectedCurrency={selectedCurrency}
          setSelectedPlan={setSelectedPlan}
        />
      ) : (
        <Spinner label="Loading..." />
      )}
      <div className="continue-cta">
        <button className="btn btn-primary" onClick={handleContinueClick}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default PlansAndPrices;
