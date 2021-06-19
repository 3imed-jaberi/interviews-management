import React, { useState, useEffect } from 'react';
import { Spinner } from "./Spinner"
import { CandidatureList } from "./CandidatureList"
import CandidatureForm from "./CandidatureForm";
import { getCandidaturesRelatedToOfferBy } from '../services/candidature.service';
import { getUserById, getUsers } from '../services/user.service';
import { isAuthenticated } from '../utils/is-auth.util';

function CandidatureListWrapper({ offerId }) {
  const [loading, setLoading] = useState(true)
  const [candidatureList, setCandidatureList] = useState(null)

  useEffect(() => {
    async function loadRelatedCandidatures() {
      const [ok, data] = await getCandidaturesRelatedToOfferBy(offerId)
      const [_, users] = await getUsers()
      if (ok) {
        const populated = data['hydra:member'].map(item => {
          const [{ firstname, lastname }] = users['hydra:member'].filter(u => u.id == item.author.split('/').reverse()[0])

          return {
            ...item,
            author: {
              fullname: `${firstname} ${lastname}`
            }
          }
        })

        // console.log(typeof Array.from(populated));
        setCandidatureList(await Array.from(populated))
        setLoading(false)
        return
      }
    }

    loadRelatedCandidatures()
  }, [])

  if (loading)
    return <Spinner />

  return (
    <div>
      <CandidatureList candidatureList={candidatureList} />
      {isAuthenticated() && <CandidatureForm offerId={offerId} />}
    </div>
  )
}

export default CandidatureListWrapper
