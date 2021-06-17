import React, { useState, useEffect } from 'react';
// import { Spinner } from "./Spinner"
import { CandidatureList } from "./CandidatureList"
import CandidatureForm from "./CandidatureForm";
import { getCandidaturesRelatedToOfferBy } from '../services/candidature.service';

function CandidatureListWrapper({ isAuthenticated, offerId }) {

  const [candidatureList, setCandidatureList] = useState([])

  useEffect(() => {
    async function loadRelatedCandidatures() {
      const [ok, data] = getCandidaturesRelatedToOfferBy()
      if (ok) {
        setCandidatureList(data)
      }
      // TODO: handle error behave
    }

    loadRelatedCandidatures()
  }, [])

  // if (isFetching && currentPage === 1) {
  //   return (<Spinner />);
  // }

  return (
    <div>
      <CandidatureList candidatureList={candidatureList} />
      {isAuthenticated && <CandidatureForm offerId={offerId} />}
    </div>
  )
}

export default CandidatureListWrapper
