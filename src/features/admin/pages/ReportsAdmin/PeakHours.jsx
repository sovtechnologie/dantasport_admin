import React from 'react'
import { Container } from 'react-bootstrap'
import SearchBox from '../../../Component/SearchBox'
import PeakHoursList from '../../../Component/PeakHoursList'
function PeakHours() {
  return (
    <>
      <section>
        <Container>
           <SearchBox/>
           <PeakHoursList/>
        </Container>
      </section>
    </>
  )
}

export default PeakHours
