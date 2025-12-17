import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../styelsheets/EventPage/CreateEvent.css";

function AttendeeCommunication({ payload, updatePayload }) {

   const [form, setForm] = useState({
      customerSupportContanct: "",
      supportEmail: "",
      altPhoneNumber: ""
   });

   /* 🔹 SYNC FROM PAYLOAD → UI */
   useEffect(() => {
      setForm({
         customerSupportContanct: payload.customerSupportContanct || "",
         supportEmail: payload.supportEmail || "",
         altPhoneNumber: payload.altPhoneNumber || ""
      });
   }, [
      payload.customerSupportContanct,
      payload.supportEmail,
      payload.altPhoneNumber
   ]);

   /* 🔹 HANDLE INPUT CHANGE */
   const handleChange = (field, value) => {
      setForm(prev => ({
         ...prev,
         [field]: value
      }));

      // 🔥 SINGLE SOURCE OF TRUTH = payload
      updatePayload(field, value);
   };

   /* 🔹 SAVE (OPTIONAL – payload already updated) */
   const handleSave = () => {
      console.log("✅ Organiser Contact Info Saved:", form);
   };

   return (
      <section>
         <Container className="container_wrapper">
            <h2 className="sub_title mb-4">Organiser Contact Info</h2>

            <Row>
               {/* Customer Support */}
               <Col className="col-4">
                  <div className="mb-3">
                     <label className="form-label">
                        Enter Customer Support Contact*
                     </label>
                     <input
                        type="text"
                        className="form-control"
                        value={form.customerSupportContanct}
                        onChange={(e) =>
                           handleChange("customerSupportContanct", e.target.value)
                        }
                     />
                  </div>
               </Col>

               {/* Email */}
               <Col className="col-4">
                  <div className="mb-3">
                     <label className="form-label">Email</label>
                     <input
                        type="email"
                        className="form-control"
                        value={form.supportEmail}
                        onChange={(e) =>
                           handleChange("supportEmail", e.target.value)
                        }
                     />
                  </div>
               </Col>

               {/* Alternate Phone */}
               <Col className="col-4">
                  <div className="mb-3">
                     <label className="form-label">
                        Enter Alt Phone Number*
                     </label>
                     <input
                        type="text"
                        className="form-control"
                        value={form.altPhoneNumber}
                        onChange={(e) =>
                           handleChange("altPhoneNumber", e.target.value)
                        }
                     />
                  </div>
               </Col>
            </Row>

            {/* SAVE BUTTON */}
            <Row className="justify-end mt-4">
               <Col className="col-4">
                  <div className="save_btn ms-3">
                     <button onClick={handleSave}>Save Listing</button>
                  </div>
               </Col>
            </Row>
         </Container>
      </section>
   );
}

export default AttendeeCommunication;
