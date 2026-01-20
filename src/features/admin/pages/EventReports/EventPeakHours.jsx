import React from 'react'
import { Container } from 'react-bootstrap'
import SearchBox from '../../../Component/SearchBox'
import EventsPeak from '../../../Component/EventsPeak'

function EventPeakHours() {
  return (
    <>
      <section>
        <Container>
            <SearchBox/>
            <EventsPeak/>
        </Container>
      </section>
    </>
  )
}

export default EventPeakHours
