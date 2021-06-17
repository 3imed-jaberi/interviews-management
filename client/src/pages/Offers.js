import React, { useState, useEffect } from 'react';
import OfferList from "../components/OfferList";
import { getOffers } from '../services/offer.service';
// import { Spinner } from "./Spinner";

function Offers() {
  // if (isFetching) {
  //   return (<Spinner />);
  // }

  const [offers, setOffers] = useState([
    {
      title: 'xxx',
      description: 'foo',
      published: '2021-05-13',
      author: {
        name: 'yyyy'
      }
    }
  ])

  useEffect(() => {
    async function loadOffers() {
      const [ok, data] = await getOffers()

      if (ok) {
        setOffers(data)
        return
      }

      setOffers([
        {
          id: '1',
          title: 'xxx',
          description: 'foo',
          published: '2021-05-13',
          author: {
            name: 'yyyy'
          }
        }
      ])
      // error
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
