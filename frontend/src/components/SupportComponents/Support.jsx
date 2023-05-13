import React from 'react';
import { ReactComponent as IconCash } from 'bootstrap-icons/icons/cash.svg';
import { ReactComponent as IconHeadset } from 'bootstrap-icons/icons/headset.svg';
import { ReactComponent as IconTruck } from 'bootstrap-icons/icons/truck.svg';
const Support = (props) => {
  return (
    <div className={`row g-3 ${props.className}`}>
      <div className="col-md-4">
        <div className="card bg-primary">
          <div className="card-body text-white">
            <span className="p-3 bg-light rounded-circle mr-3 text-dark">
              <IconCash className="display-6" />
            </span>
            Reasonable Prices
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card bg-danger">
          <div className="card-body text-white">
            <span className="p-3 bg-light rounded-circle mr-3 text-dark">
              <IconHeadset className="display-6" />
            </span>
            Customer Support 24/7
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card bg-success">
          <div className="card-body text-white">
            <span className="p-3 bg-light rounded-circle mr-3 text-dark">
              <IconTruck className="display-6" />
            </span>
            Quick Results
          </div>
        </div>
      </div>
    </div>
  );
};
export default Support;
