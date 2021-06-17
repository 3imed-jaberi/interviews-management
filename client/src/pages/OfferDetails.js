import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Offer } from "../components/Offer";
// import { Spinner } from "./Spinner";
import CandidatureListWrapper from "../components/CandidatureListWrapper";
import { getOfferBy } from '../services/offer.service';

function OfferDetails() {

  const [offer, setOffer] = useState({
    title: 'xxx',
    description: 'foo',
    published: '2021-05-13',
    author: {
      name: 'yyyy'
    }
  })

  const { id } = useParams()

  useEffect(() => {
    async function loadOffer(values) {
      const [ok, data] = await getOfferBy(id)
      alert(ok)
      if (ok) {
        setOffer(data)
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
