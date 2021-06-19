import React, { useState, useEffect } from 'react';
import OfferList from "../components/OfferList";
import { getOffers } from '../services/offer.service';

function Offers() {
  const [offers, setOffers] = useState(null)

  useEffect(() => {
    async function loadOffers() {
      const [ok, data] = await getOffers()

      if (ok) {
        setOffers(data['hydra:member'])
        return
      }
    }

    loadOffers()
  }, [])

  return (
    <div>
      <OfferList offers={offers} />
    </div>
  )
}

export default Offers;
