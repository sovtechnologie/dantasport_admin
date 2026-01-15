import React from "react";
import { Container, Table, Badge } from "react-bootstrap";
import SearchBox from "../../../Component/SearchBox";
import ExportFilter from "../../../Component/ExportFilter";

function CoachReports() {
  const data = [
    {
      id: 1,
      coachName: "Fit Pro Academy",
      venue: "Lucknow Stadium",
      category: "Fitness",
      activeClients: 42,
      dietPlansShared: 28,
      activePlansShared: 35,
      inquiriesReceived: 67,
    },
    {
      id: 2,
      coachName: "Elite Sports Club",
      venue: "Delhi Arena",
      category: "Cricket",
      activeClients: 30,
      dietPlansShared: 18,
      activePlansShared: 22,
      inquiriesReceived: 41,
    },
  ];

  return (
    <>
      <section>
        <Container>
            <SearchBox/>
          <div className="bg-white p-3 rounded shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-3">
               <h5 className="mb-0" style={{color: "#737791",fontWeight: "500"}}>Coach Reports</h5>
              <ExportFilter/>
            </div>
           
            <div className="table-responsive">
               
              <Table bordered hover className="align-middle text-nowrap">
                <thead>
                  <tr>
                    <th style={thStyle}>#</th>
                    <th style={thStyle}>Coach / Academy</th>
                    <th style={thStyle}>Location / Venue</th>
                    <th style={thStyle}>Category</th>
                    <th style={thStyle} className="text-center">
                      Active Clients
                    </th>
                    <th style={thStyle} className="text-center">
                      Diet Plans Shared
                    </th>
                    <th style={thStyle} className="text-center">
                      Active Plans Shared
                    </th>
                    <th style={thStyle} className="text-center">
                      Inquiries Received
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.coachName}</td>
                      <td>{item.venue}</td>
                      <td>{item.category}</td>

                      <td className="text-center fw-semibold">
                        {item.activeClients}
                      </td>

                      <td className="text-center">
                        <Badge bg="info" className="px-3">
                          {item.dietPlansShared}
                        </Badge>
                      </td>

                      <td className="text-center">
                        <Badge bg="success" className="px-3">
                          {item.activePlansShared}
                        </Badge>
                      </td>

                      <td className="text-center">
                        <Badge bg="warning" text="dark" className="px-3">
                          {item.inquiriesReceived}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

const thStyle = {
  color: "#1163C7",
  fontSize: "16px",
  fontWeight: "500",
};

export default CoachReports;
