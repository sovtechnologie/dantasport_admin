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
              <h5 className="mb-0 " style={{color: "#737791",fontWeight: "500"}}>Coach Reports</h5>
              <ExportFilter />
            </div>

            <div className="table-responsive">
              <Table bordered hover className="align-middle text-nowrap">
                <thead>
                  <tr>
                    <th style={thStyle}>#</th>
                    <th style={thStyle}>Coach / Academy</th>
                    <th style={thStyle}>Location / Venue</th>
                    <th style={thStyle}>Category</th>
                    <th style={thStyle}>User Name & Number</th>
                    <th style={thStyle} className="text-center">Diet Plan</th>
                    <th style={thStyle} className="text-center">Active Plan</th>
                    <th style={thStyle} className="text-center">
                      Classes Attended
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
                      <td>
                        <div>{item.userName}</div>
                        <small className="text-muted">{item.mobile}</small>
                      </td>

                      {/* Diet Plan */}
                      <td className="text-center">
                        <div className="d-flex justify-content-center">
                          <Badge
                            bg={item.dietPlan ? "success" : "secondary"}
                            className="px-3"
                          >
                            {item.dietPlan ? "Yes" : "No"}
                          </Badge>
                        </div>
                      </td>

                      {/* Active Plan */}
                      <td className="text-center">
                        <div className="d-flex justify-content-center">
                          <Badge
                            bg={item.activePlan ? "success" : "danger"}
                            className="px-3"
                          >
                            {item.activePlan ? "Yes" : "No"}
                          </Badge>
                        </div>
                      </td>

                      <td className="text-center fw-semibold">
                        {item.classesAttended}
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

export default UserReports;
