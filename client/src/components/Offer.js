import React from 'react';
import * as timeago from 'timeago.js';
import { Message } from "./Message";

export function Offer({ offer }) {

  if (offer === null) {
    return (<Message message="Offer does not exist" />);
  }

  return (
    <div className="card mb-3 mt-3 shadow-sm">
      <div className="card-body">
        <h2>{offer.title}</h2>
        <p className="card-text">{offer.description}</p>
        <p className="card-text border-top">
          <small className="text-muted">
            {timeago.format(offer.published)} by&nbsp;
            {offer.author.name}
          </small>
        </p>
      </div>
    </div>
  )
}
