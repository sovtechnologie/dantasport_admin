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
          <SearchBox />

          <div className="bg-white p-3 rounded shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0" style={{ color: "#737791", fontWeight: "500" }}>
                Coach Reports
              </h5>
              <ExportFilter />
            </div>

            {/* ❌ NO table-responsive */}
            <Table bordered hover className="align-middle">
              <thead>
                <tr>
                  <th style={{ ...thStyle, width: "60px" }}>#</th>
                  <th style={{ ...thStyle, width: "220px" }}>
                    Coach / Academy
                  </th>
                  <th style={{ ...thStyle, width: "200px" }}>
                    Location / Venue
                  </th>
                  <th style={{ ...thStyle, width: "150px" }}>Category</th>
                  <th
                    style={{ ...thStyle, width: "140px" }}
                    className="text-center"
                  >
                    Active Clients
                  </th>
                  <th
                    style={{ ...thStyle, width: "170px" }}
                    className="text-center"
                  >
                    Diet Plans Shared
                  </th>
                  <th
                    style={{ ...thStyle, width: "190px" }}
                    className="text-center"
                  >
                    Activity Plans Shared
                  </th>
                  <th
                    style={{ ...thStyle, width: "190px" }}
                    className="text-center"
                  >
                    Inquiries Received
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>

                    <td
                      style={{
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                      }}
                    >
                      {item.coachName}
                    </td>

                    <td
                      style={{
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                      }}
                    >
                      {item.venue}
                    </td>

                    <td style={{
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                      }}>{item.category}</td>

                    <td className="text-center fw-semibold" style={{
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                      }}>
                      {item.activeClients}
                    </td>

                    <td className="text-center" >
                      <Badge bg="info" className="px-3" style={{
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                      }}>
                        {item.dietPlansShared}
                      </Badge>
                    </td>

                    <td className="text-center" >
                      <Badge bg="success" className="px-3" style={{
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                      }}>
                        {item.activePlansShared}
                      </Badge>
                    </td>

                    <td className="text-center" >
                      <Badge bg="warning" text="dark" className="px-3" style={{
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                      }}>
                        {item.inquiriesReceived}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
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
  whiteSpace: "nowrap",
};

export default CoachReports;
