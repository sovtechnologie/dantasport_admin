import React from 'react'
import { Container } from 'react-bootstrap'
import SearchBox from '../../../Component/SearchBox'
import EnquiresPeak from '../../../Component/EnquiresPeak'

function EnquiresPeakHours() {
  return (
    <>
      <section>
        <Container>
            <SearchBox/>
            <EnquiresPeak/>
        </Container>
      </section>
    </>
  )
}

export default EnquiresPeakHours
