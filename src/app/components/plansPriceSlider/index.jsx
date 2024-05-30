import React, { useRef, useState } from "react";
import { currencySymbol } from "@/utils/constants";

const CardSlider = ({
  cards,
  subscriptionsCard,
  subsType,
  selectedCurrency,
  setSelectedPlan,
}) => {
  const carouselRef = useRef(null);
  const [isSelected, setIsSelected] = useState(false);
  const [isSliderCtaDisplay, setIsSliderCtaDisplay] = useState(false);

  const handleSlide = (direction) => {
    carouselRef.current.scrollLeft += direction === "next" ? 300 : -300; // Adjust the scroll distance as per card width
  };

  const toggleCard = (index) => {
    setIsSelected(index);
  };

  const getAdditionalValue = (value, typeValue) => {
    const splitValue = value.split("PriceAdditional");
    if (splitValue?.[1]) {
      const splitValueTwo = splitValue?.[1].split(typeValue);
      return splitValueTwo[0] ?? "-";
    }
    return "";
  };

  return (
    <div className="container-flex">
      <div className="row">
        <div
          className="col-12 plans-price-slider"
          style={{ overflowX: "auto" }}
          ref={carouselRef}
          onMouseEnter={(e) => {
            setIsSliderCtaDisplay(true);
          }}
          onMouseLeave={(e) => {
            setIsSliderCtaDisplay(false);
          }}
        >
          <div className="d-flex">
            <span
              style={{ display: `${isSliderCtaDisplay ? "block" : "none"}` }}
              className="d-flex align-items-center prev-button"
              onClick={() => handleSlide("prev")}
            >
              Prev
            </span>
            {subscriptionsCard.map((scard, index) => (
              <div key={index} className="col-md-4">
                <div
                  className={`card ${isSelected === index ? "selected" : ""}`}
                >
                  <div
                    className="card-body"
                    onClick={() => {
                      setSelectedPlan(scard);
                      toggleCard(index);
                    }}
                  >
                    <h5 className="card-title">{scard.subscriptionPlanName}</h5>
                    <h5 className="card-title">
                      {cards?.[index]?.[`${subsType}PriceSubscription`]}
                      {currencySymbol[selectedCurrency]}
                    </h5>
                    <div className="features">
                      <p>{scard.subscriptionPlanDescription}</p>
                    </div>
                    <div className="features-row row">
                      <div className="col-md-5 heading-1">
                        <b>Capacity</b>
                      </div>
                      <div className="col-md-3 heading-2">
                        <b>Included</b>
                      </div>
                      <div className="col-md-4 heading-3">
                        <b>Buy More</b>
                      </div>
                      <div className="col-md-5">Max HDD</div>
                      <div className="col-md-3">
                        {(Number(scard.maxByteTotalHDD) / 1000000).toFixed(2)}MB
                      </div>
                      <div className="col-md-4">
                        {cards?.[index]?.[`${subsType}PriceAdditional100MBHDD`]}
                        {currencySymbol[selectedCurrency]} per{" "}
                        {getAdditionalValue(
                          `${subsType}PriceAdditional100MBHDD`,
                          "HDD"
                        )}
                      </div>
                      <div className="col-md-5">Max SSD</div>
                      <div className="col-md-3">
                        {(Number(scard.maxByteTotalSSD) / 1000000).toFixed(2)}MB
                      </div>
                      <div className="col-md-4">
                        {cards?.[index]?.[`${subsType}PriceAdditional100MBSSD`]}
                        {currencySymbol[selectedCurrency]} per{" "}
                        {getAdditionalValue(
                          `${subsType}PriceAdditional100MBSSD`,
                          "SSD"
                        )}
                      </div>
                      <div className="col-md-5">Max NVME</div>
                      <div className="col-md-3">
                        {(Number(scard.maxByteTotalNVME) / 1000000).toFixed(2)}
                        MB
                      </div>
                      <div className="col-md-4">
                        {
                          cards?.[index]?.[
                            `${subsType}PriceAdditional100MBNVME`
                          ]
                        }
                        {currencySymbol[selectedCurrency]} per{" "}
                        {getAdditionalValue(
                          `${subsType}PriceAdditional100MBNVME`,
                          "NVME"
                        )}
                      </div>
                      <div className="col-md-5">Max Users</div>
                      <div className="col-md-3">{scard.maxUsers}</div>
                      <div className="col-md-4">
                        {cards?.[index]?.[`${subsType}PriceAdditionalUser`]}
                        {currencySymbol[selectedCurrency]} per User
                      </div>
                      <div className="col-md-5">Max Content Files</div>
                      <div className="col-md-3">{scard.maxContentFiles}</div>
                      <div className="col-md-4">
                        {
                          cards?.[index]?.[
                            `${subsType}PriceAdditional100ContentFiles`
                          ]
                        }
                        {currencySymbol[selectedCurrency]} per{" "}
                        {getAdditionalValue(
                          `${subsType}PriceAdditional100ContentFiles`,
                          "ContentFiles"
                        )}
                      </div>
                      <div className="col-md-5">Max Files</div>
                      <div className="col-md-3">{scard.maxFileStores}</div>
                      <div className="col-md-4">
                        {
                          cards?.[index]?.[
                            `${subsType}PriceAdditionalFileStore`
                          ]
                        }
                        {currencySymbol[selectedCurrency]} per file
                      </div>
                      <div className="col-md-5">Max Custom Thumbnails</div>
                      <div className="col-md-3">
                        {scard.maxCustomThumbnails}
                      </div>
                      <div className="col-md-4">
                        {
                          cards?.[index]?.[
                            `${subsType}PriceAdditional100Thumbnails`
                          ]
                        }
                        {currencySymbol[selectedCurrency]} per{" "}
                        {getAdditionalValue(
                          `${subsType}PriceAdditional100Thumbnails`,
                          "Thumbnails"
                        )}{" "}
                        Thumbnails
                      </div>
                      <div className="col-md-5">Max Stream Jobs</div>
                      <div className="col-md-3">{scard.maxStreamJobs}</div>
                      <div className="col-md-4">
                        {
                          cards?.[index]?.[
                            `${subsType}PriceAdditional100StreamJobs`
                          ]
                        }
                        {currencySymbol[selectedCurrency]} per{" "}
                        {getAdditionalValue(
                          `${subsType}PriceAdditional100StreamJobs`,
                          "StreamJobs"
                        )}{" "}
                        Stream Jobs
                      </div>
                      <div className="col-md-5">Max Sites</div>
                      <div className="col-md-3">{scard.maxSites}</div>
                      <div className="col-md-4">
                        {cards?.[index]?.[`${subsType}PriceAdditionalSite`]}
                        {currencySymbol[selectedCurrency]} per Site
                      </div>
                      <div className="col-md-5">Max API Calls per Month</div>
                      <div className="col-md-3">
                        {scard.maxApiCallsPerMonth}
                      </div>
                      <div className="col-md-4">
                        {
                          cards?.[index]?.[
                            `${subsType}PriceAdditional1000ApiCallsPerMonth`
                          ]
                        }
                        {currencySymbol[selectedCurrency]} per{" "}
                        {getAdditionalValue(
                          `${subsType}PriceAdditional1000ApiCallsPerMonth`,
                          "ApiCallsPerMonth"
                        )}{" "}
                        Api Calls
                      </div>
                    </div>
                    <div className="comment">
                      <p>{scard.comment}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <span
              style={{ display: `${isSliderCtaDisplay ? "block" : "none"}` }}
              className="d-flex align-items-center justify-content-end next-button"
              onClick={() => handleSlide("next")}
            >
              Next
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSlider;
