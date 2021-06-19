import React from 'react';
import { Message } from "./Message";
import * as timeago from 'timeago.js';
import { TransitionGroup, CSSTransition } from "react-transition-group";

import "./CandidatureList.css";

export function CandidatureList({ candidatureList }) {

  if (
    candidatureList === null ||
    candidatureList.length === 0
  ) {
    return (<Message message="No candidatures yet" />);
  }

  return (
    <div className="card mb-3 mt-3 shadow-sm">
      <TransitionGroup>
        {candidatureList.map(candidature => {
          return (
            <CSSTransition key={candidature.id} timeout={2000} classNames="fade">
              <div className="card-body border-bottom">
                <h3 className="card-text mb-0">
                  {candidature.status}
                </h3>
                <p>{candidature.content}</p>
                <p className="card-text">
                  <small className="text-muted">
                    {timeago.format(candidature.published)} by&nbsp;
                    {candidature.author.fullname}
                  </small>
                </p>
              </div>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  )
}
