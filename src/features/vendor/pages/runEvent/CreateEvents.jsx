import React, { useState } from "react";
import { Container, Row, Col, Accordion, Button } from "react-bootstrap";
import "../../styelsheets/EventPage/CreateEvent.css";

import EventDetails from "./EventDetails";
import EventLocation from "./EventLocation";
import CelebratiesPerformers from "./CelebratiesPerformers";
import TicketingInformation from "./TicketingInformation";
import AttendeeCommunication from "./AttendeeCommunication";
import RulesRegulation from "./RulesRegulation";
import CancelationPolicy from "./CancelationPolicy";
import ControlAccess from "./ControlAccess";
import EventGuide from "./EventGuide";

import { createEvent } from "../../../../services/vendor/eventRun/endpointApi";

function CreateEvents() {
  // ----------------------- MASTER PAYLOAD -----------------------
  const [payload, setPayload] = useState({
    eventTitle: "",
    aboutEvent: "",
    eventType: "",
    eventCateorySports: [],

    eventVideoURL: "",
    eventGuide: null,

    difficulty: "",
    eventCalender: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",

    repetitiveEventsDates: [],

    thingsToCarry: "",
    instruction: "",

    locations: [
      {
        lat: "18.5204",
        lng: "73.8567",
        fullAddress: "Hinjewadi, Pune, Maharashtra, India",
        state: "Maharashtra",
        city: "Pune",
        area: "Hinjewadi",
        pincode: "411057",
      },
    ],


    performers: [{ name: "", title: "", bio: "" }],

    tickets: [{ categoryName: "", price: 0, description: "" }],

    FAQ: "",

    customerSupportContanct: "",
    supportEmail: "",
    altPhoneNumber: "",
    plantformLink: "https://dummyplatform.com",
    agendaViewers: "100",
    safetyProtocols: "",

    termAndConditions: "",
    cancellationPolicy: "",
    qrCodeCheckIn: false,

    language: "",
    duration: "",
    ticketNeedFor: "",
    EntryAllowed: "",
    layout: "",
    kidsFridenly: "",
    petsFriendly: "",

    desktopImage: null,
    mobileImage: null,
    performerImages: [],
  });

  // ----------------------- UPDATE HANDLER -----------------------
  const updatePayload = (field, value) => {
    setPayload((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ----------------------- FORM DATA BUILDER -----------------------
  const buildFormData = (payload) => {
    const formData = new FormData();

    // SIMPLE FIELDS
    formData.append("eventTitle", payload.eventTitle);
    formData.append("aboutEvent", payload.aboutEvent);
    formData.append("eventType", payload.eventType);
    formData.append("eventVideoURL", payload.eventVideoURL);
    formData.append("difficulty", payload.difficulty);
    formData.append("eventCalender", payload.eventCalender);
    formData.append("startDate", payload.startDate);
    formData.append("endDate", payload.endDate);
    formData.append("startTime", payload.startTime);
    formData.append("endTime", payload.endTime);
    formData.append("thingsToCarry", payload.thingsToCarry);
    formData.append("instruction", payload.instruction);
    formData.append("FAQ", payload.FAQ);
    formData.append("customerSupportContanct", payload.customerSupportContanct);
    formData.append("supportEmail", payload.supportEmail);
    formData.append("altPhoneNumber", payload.altPhoneNumber);
    formData.append("plantformLink", payload.plantformLink);
    formData.append("agendaViewers", payload.agendaViewers);
    formData.append("safetyProtocols", payload.safetyProtocols);
    formData.append("termAndConditions", payload.termAndConditions);
    formData.append("cancellationPolicy", payload.cancellationPolicy);
    formData.append("qrCodeCheckIn", payload.qrCodeCheckIn);
    formData.append("language", payload.language);
    formData.append("duration", payload.duration);
    formData.append("ticketNeedFor", payload.ticketNeedFor);
    formData.append("EntryAllowed", payload.EntryAllowed);
    formData.append("layout", payload.layout);
    formData.append("kidsFridenly", payload.kidsFridenly);
    formData.append("petsFriendly", payload.petsFriendly);

    // ARRAYS / OBJECTS
    formData.append("eventCateorySports", JSON.stringify(payload.eventCateorySports));
    formData.append("repetitiveEventsDates", JSON.stringify(payload.repetitiveEventsDates));
    formData.append("locations", JSON.stringify(payload.locations));
    formData.append("performers", JSON.stringify(payload.performers));
    formData.append("tickets", JSON.stringify(payload.tickets));

    // FILES
    if (payload.eventGuide) {
      formData.append("eventGuide", payload.eventGuide);
    }
    if (payload.desktopImage) {
      formData.append("desktopImage", payload.desktopImage);
    }
    if (payload.mobileImage) {
      formData.append("mobileImage", payload.mobileImage);
    }
    payload.performerImages.forEach((file) => {
      if (file) formData.append("performerImages", file);
    });

    return formData;
  };

  // ----------------------- FINAL SUBMIT -----------------------
  const handleCreateEvent = async () => {
    try {
      const formData = buildFormData(payload);
      await createEvent(formData);
      alert("Event Created Successfully!");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  // ----------------------- ACCORDION -----------------------
  const sections = [
    { title: "Event Details", component: <EventDetails payload={payload} updatePayload={updatePayload} /> },
    { title: "Location", component: <EventLocation payload={payload} updatePayload={updatePayload} /> },
    { title: "Participants / Organisers", component: <CelebratiesPerformers payload={payload} updatePayload={updatePayload} /> },
    { title: "Ticketing Information", component: <TicketingInformation payload={payload} updatePayload={updatePayload} /> },
    { title: "Organiser Contact Info", component: <AttendeeCommunication payload={payload} updatePayload={updatePayload} /> },
    { title: "Rules & Regulation", component: <RulesRegulation payload={payload} updatePayload={updatePayload} /> },
    { title: "T&C / Cancelation Policy", component: <CancelationPolicy payload={payload} updatePayload={updatePayload} /> },
    { title: "Control Access", component: <ControlAccess payload={payload} updatePayload={updatePayload} /> },
    { title: "Event Guide", component: <EventGuide payload={payload} updatePayload={updatePayload} /> },
  ];

  return (
    <section>
      <Container className="container_wrapper">
        <Row>
          <Col md={12}>
            <Accordion>
              {sections.map((item, index) => (
                <Accordion.Item eventKey={index.toString()} key={index}>
                  <Accordion.Header>{item.title}</Accordion.Header>
                  <Accordion.Body>{item.component}</Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>

            <div className="d-flex justify-content-center mt-4">
              <Button variant="primary" onClick={handleCreateEvent}>
                Create Event
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default CreateEvents;
