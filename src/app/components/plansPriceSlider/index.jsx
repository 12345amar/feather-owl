import React, { useRef, useState } from 'react';
import { Button } from 'react-bootstrap';

const CardSlider = ({ cards, subscriptionsCard, subsType }) => {
  const carouselRef = useRef(null);
  const [isSelected, setIsSelected] = useState(false);

  const handleSlide = (direction) => {
    carouselRef.current.scrollLeft += (direction === 'next' ? 300 : -300); // Adjust the scroll distance as per card width
  };
  

  const toggleCard = (index) => {
    setIsSelected(index);
  };
  return (
    <div className="container-flex">
      <div className="row">
       
        
        <div className="col-12 plans-price-slider" style={{ overflowX: 'auto' }} ref={carouselRef}>
          <div className="d-flex">
          <span className="d-flex align-items-center prev-button" onClick={() => handleSlide('prev')}>
          &lt;&lt;
        </span>
            {subscriptionsCard.map((scard, index) => (
                
              <div key={index} className="col-md-4">
             
              
                <div className={`card ${isSelected === index ? 'selected' : ''}`}>
                  <div className="card-body" onClick={() => { toggleCard(index)}}>
                  
                    <h5 className="card-title">{scard.subscriptionPlanName}</h5>
                    <h5 className="card-title">
                        { subsType === "monthly" ? `${cards[index]?.monthlyPriceSubscription}$` : ''}
                        { subsType === "quarterly" ? `${cards[index]?.quarterlyPriceSubscription}$` : ''}
                        { subsType === "yearly" ? `${cards[index]?.yearlyPriceSubscription}$` : ''}
                        </h5>
                    <div className="features">
                        <b>Features</b>
                        <p>{scard.subscriptionPlanDescription}</p>
                    </div>
                    <div className="features-row row">
                                <div className="col-md-6 heading-1"><b>Capacity</b></div>
                                <div className="col-md-3 heading-2"><b>Included</b></div>
                                <div className="col-md-3 heading-3"><b>Buy More</b></div>
                            
                                <div className="col-md-6">Max HDD</div>
                                <div className="col-md-3">{(Number(scard.maxByteTotalHDD)/1000000).toFixed(2)}MB</div>
                                <div className="col-md-3">{}</div>

                                <div className="col-md-6">Max SSD</div>
                                <div className="col-md-3">{(Number(scard.maxByteTotalSSD)/1000000).toFixed(2)}MB</div>
                                <div className="col-md-3">Buy More</div>

                                <div className="col-md-6">Max NVME</div>
                                <div className="col-md-3">{(Number(scard.maxByteTotalNVME)/1000000).toFixed(2)}MB</div>
                                <div className="col-md-3">Buy More</div>

                                <div className="col-md-6">Max Users</div>
                                <div className="col-md-3">{scard.maxUsers}</div>
                                <div className="col-md-3">Buy More</div>

                                <div className="col-md-6">Max Content Files</div>
                                <div className="col-md-3">{scard.maxContentFiles}</div>
                                <div className="col-md-3">Buy More</div>

                                <div className="col-md-6">Max Files</div>
                                <div className="col-md-3">{scard.maxFileStores}</div>
                                <div className="col-md-3">Buy More</div>

                                <div className="col-md-6">Max Custom Thumbnails</div>
                                <div className="col-md-3">{scard.maxCustomThumbnails}</div>
                                <div className="col-md-3">Buy More</div>

                                <div className="col-md-6">Max Stream Jobs</div>
                                <div className="col-md-3">{scard.maxStreamJobs}</div>
                                <div className="col-md-3">Buy More</div>

                                <div className="col-md-6">Max Sites</div>
                                <div className="col-md-3">{scard.maxSites}</div>
                                <div className="col-md-3">Buy More</div>

                                <div className="col-md-6">Max Sites</div>
                                <div className="col-md-3">{scard.maxSites}</div>
                                <div className="col-md-3">Buy More</div>

                                <div className="col-md-6">Max API Calls per Month</div>
                                <div className="col-md-3">{scard.maxApiCallsPerMonth}</div>
                                <div className="col-md-3">Buy More</div>
                            
                       
                    </div>

                    

                    <div className="availability">
                        <b>Availability</b>
                        <div>Max deleted jobs retention days {scard.maxDeletedJobsRetentionDays}</div>
                        <div>Max deleted files retention days {scard.maxDeletedFilesRetentionDays}</div>
                        <div>{scard.setLocalQueueConnection ? 'Local Queue connection is available' : 'Local Queue connection is not available'}</div>
                        <div>{scard.setSiteQueueCleanupService ? 'Site Queue Cleanup Service is available' : 'Site Queue Cleanup Service is not available'}</div>
                       
                    </div>

                    <div className="comment">
                        <b>Comment</b>
                        <p>{scard.comment}</p>
                    </div>
                  </div>
                  
             
                </div>
              </div>
            ))}
             <span className="d-flex align-items-center justify-content-end next-button" onClick={() => handleSlide('next')}>
             &gt;&gt;
        </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CardSlider;
