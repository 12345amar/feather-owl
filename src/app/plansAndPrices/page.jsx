'use client';

/* eslint-disable react/no-unescaped-entities */
// App/Pages/index.js
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter  } from 'next/navigation'
import { getPricePlans, getSubscriptions } from '../../services/api';
import Error from '../components/Error'
import CardSlider from '../components/plansPriceSlider';


const PlansAndPrices = () => {
    const router = useRouter()
    const dispatch = useDispatch();
    const { subscriptions, pricePlans, loading } = useSelector(state => state.subscription);
    const [getPriceUsdPlans, setGetPriceUsdPlans] = useState([])
    const [pricePlansType, setPricePlansType] = useState('monthly')


      useEffect(() => {
        if (pricePlans?.length === 0 && !loading) {
            dispatch(getPricePlans())
        }
        if (subscriptions?.length === 0 && !loading) {
            dispatch(getSubscriptions())
        }
      }, [])
      const filterPlanType = (pricePlansData, type) => {
      const getTypeData = []
            let typeData = {}
            pricePlansData.forEach( (element) => {
                for (const key in element) {
                    if (key.includes(type)) {
                        typeData[key] = element[key]
                    }
                    }
                    getTypeData.push(typeData)
            });

            return typeData
        }
      const usdPlans = [3, 6, 9, 12]
      useEffect(() => {
        if (!loading && pricePlans) {
            const getUsdPlans = pricePlans.filter((a) => usdPlans.includes(a.pricePlanID))
            setGetPriceUsdPlans(getUsdPlans)
        }
      }, [loading, pricePlans])

      

      const getPlanType = (type) => {
        setPricePlansType(type)
        
      }
console.log("=====setPricePlansType", pricePlansType)
  return (
    <div className="price-plans">
    <h1>Subscribe</h1>
   
       
        <div className="row">
            <span className="subscription-cta">
                <button className="btn btn-info" onClick={() => {getPlanType('monthly')}}>Monthly</button>
                <button className="btn btn-info" onClick={() => {getPlanType('quarterly')}}>Quatrly</button>
                <button className="btn btn-info" onClick={() => {getPlanType('yearly')}}>Yearly</button>
            </span>
        </div>
        {!loading && getPricePlans?.length && subscriptions?.length? 


        <CardSlider cards={getPriceUsdPlans} subscriptionsCard={subscriptions} subsType={pricePlansType} />
       
        : <h6 style={{textAlign: 'center'}}>Loading...</h6>}
        <div className="continue-cta">
        <button className="btn btn-primary" onClick={() => router.push('/dashboard')}>Continue</button>
        </div>
  </div>
  );
}; 

export default PlansAndPrices;
