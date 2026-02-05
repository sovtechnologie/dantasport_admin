import React from "react";
import { Container, Table, Badge } from "react-bootstrap";
import SearchBox from "../../../Component/SearchBox";
import ExportFilter from "../../../Component/ExportFilter";

function UserReports() {
  const data = [
    {
      id: 1,
      coachName: "Fit Pro Academy",
      venue: "Lucknow Stadium",
      category: "Fitness",
      userName: "Rahul Sharma",
      mobile: "9876543210",
      dietPlan: true,
      activePlan: false,
      classesAttended: 24,
    },
    {
      id: 2,
      coachName: "Elite Sports Club",
      venue: "Delhi Arena",
      category: "Cricket",
      userName: "Amit Verma",
      mobile: "9123456789",
      dietPlan: false,
      activePlan: true,
      classesAttended: 18,
    },
  ];

  return (
    <>
      <section>
        <Container>
          <SearchBox />

          <div className="bg-white p-3 mt-3 rounded shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5
                className="mb-0"
                style={{ color: "#737791", fontWeight: "500" }}
              >
                User Reports
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
                  <th style={{ ...thStyle, width: "230px" }}>
                    User Name & Number
                  </th>
                  <th
                    style={{ ...thStyle, width: "130px" }}
                    className="text-center"
                  >
                    Diet Plan
                  </th>
                  <th
                    style={{ ...thStyle, width: "150px" }}
                    className="text-center"
                  >
                    Activity Plan
                  </th>
                  <th
                    style={{ ...thStyle, width: "160px" }}
                    className="text-center"
                  >
                    Classes Attended
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.map((item, index) => (
                  <tr key={item.id}>
                    <td style={{ width: "60px" }}>{index + 1}</td>

                    <td
                      style={{
                        width: "220px",
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                      }}
                    >
                      {item.coachName}
                    </td>

                    <td
                      style={{
                        width: "200px",
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                      }}
                    >
                      {item.venue}
                    </td>

                    <td style={{ 
                      
                     width: "200px",
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                    
                    
                    }}
                     >{item.category}</td>

                    <td
                      style={{
                        width: "230px",
                        whiteSpace: "normal",
                      }}
                    >
                      <div>{item.userName}</div>
                      <small className="text-muted">{item.mobile}</small>
                    </td>

                    {/* Diet Plan */}
                    <td style={{ width: "130px",whiteSpace: "normal",
                        wordBreak: "break-word", }} className="text-center">
                      <Badge
                        bg={item.dietPlan ? "success" : "secondary"}
                        className="px-3"
                      >
                        {item.dietPlan ? "Yes" : "No"}
                      </Badge>
                    </td>

                    {/* Activity Plan */}
                    <td style={{ width: "150px",whiteSpace: "normal",
                        wordBreak: "break-word", }} className="text-center">
                      <Badge
                        bg={item.activePlan ? "success" : "danger"}
                        className="px-3"
                      >
                        {item.activePlan ? "Yes" : "No"}
                      </Badge>
                    </td>

                    <td
                      style={{ width: "160px",whiteSpace: "normal",
                        wordBreak: "break-word", }}
                      className="text-center fw-semibold"
                    >
                      {item.classesAttended}
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

export default UserReports;
