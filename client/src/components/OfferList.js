import React from 'react';
import * as timeago from 'timeago.js';
import { Link } from "react-router-dom";
import { Message } from "./Message";

function OfferList({ offers }) {
  if (
    offers === null ||
    offers.length === 0
  ) {
    return (<Message message="No offers" />)
  }

  return (<>
    {offers && offers.map(({ id, title, published }, index) => (
      <div className="card mb-3 mt-3 shadow-sm" key={id || index}>
        <div className="card-body">
          <h3>
            <Link to={`/offer/${id}`}>{title}</Link>
          </h3>
          <p className="card-text bordet-top">
            <small className="text-muted">
              {timeago.format(published)}
            </small>
          </p>
        </div>
      </div>
    ))}
  </>)
}


export default OfferList;
