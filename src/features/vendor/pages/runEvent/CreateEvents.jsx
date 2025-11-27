import React from "react";
import { Container, Row, Col, Accordion } from "react-bootstrap";
import "../../styelsheets/EventPage/CreateEvent.css";
import EventDetails from "./EventDetails";
import EventLocation from "./EventLocation";
import CelebratiesPerformers from "./CelebratiesPerformers";
import TicketingInformation from "./TicketingInformation";
import AttendeeCommunication from "./AttendeeCommunication";
import EngagementFeatures from "./EngagementFeatures";
import RulesRegulation from "./RulesRegulation";
import CancelationPolicy from "./CancelationPolicy";
import ControlAccess from "./ControlAccess";
import EventGuide from "./EventGuide";



function CreateEvents() {
  const sections = [
    { title: "Event Details",component: <EventDetails /> },
    { title: "Location", component: <EventLocation/>},
    { title: "Participants / Organisers", component: <CelebratiesPerformers/> },
    { title: "Ticketing Information", component: <TicketingInformation/> },
    { title: "Organiser Contact Info", component: <AttendeeCommunication/>},
    // { title: "Engagement Features", component: <EngagementFeatures/> },
    { title: "Rules & Regulation", component: <RulesRegulation/> },
    { title: "T&C/ Cancelation Policy", component: <CancelationPolicy/> },
    { title: "Control Access", component: <ControlAccess/> },
    { title: "Event Guide", component: <EventGuide/> }
  
  ];

  return (
    <>
      <section>
        <Container className="container_wrapper">
          <Row>
            <Col md={12}>

              <Accordion>
                {sections.map((item, index) => (
                  <Accordion.Item eventKey={index.toString()} key={index}>
                    <Accordion.Header>
                      {item.title}
                    </Accordion.Header>

                    <Accordion.Body>
                      {item.component}
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>

            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default CreateEvents;
