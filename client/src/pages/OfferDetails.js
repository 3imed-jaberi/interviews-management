import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Offer } from "../components/Offer";
// import { Spinner } from "./Spinner";
import CandidatureListWrapper from "../components/CandidatureListWrapper";
import { getOfferBy } from '../services/offer.service';

function OfferDetails() {

  const [offer, setOffer] = useState(null)

  const { id } = useParams()

  useEffect(() => {
    async function loadOffer() {
      // console.log(id);
      const [ok, data] = await getOfferBy(id)

      if (ok) {
        setOffer(data)
        return
      }

      // TODO: handle error
    }

    loadOffer()
  }, [id])

  return (
    <div>
      <Offer offer={offer} />
      {offer && <CandidatureListWrapper offerId={id} />}
    </div>
  )
}

export default OfferDetails
