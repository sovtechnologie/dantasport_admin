import React from "react";
import { Container, Table } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";

function CoachAcademyList() {
  const userData = [
    {
      userName: "Rohan Sharma",
      userId: "USR12345",
      createdDate: "12-Dec-2025",
      coachType: "Coach",
       services: "Football",
      activeDays: "Mon, Tue, Thu, Sat",
      locations: "Lucknow, Kanpur",
      status: "Active",
    },
    {
      userName: "Priya Verma",
      userId: "USR77890",
      createdDate: "01-Dec-2025",
      coachType: "Academy",
       services: "Football",
      activeDays: "Mon, Wed, Fri",
      locations: "Delhi, Noida",
      status: "Inactive",
    },
    {
      userName: "Amit Gupta",
      userId: "USR99112",
      createdDate: "05-Dec-2025",
      coachType: "Coach",
      services: "Football",
      activeDays: "Tue, Thu, Sat, Sun",
      locations: "Mumbai, Thane",
      status: "Active",
    },
  ];

  return (
    <>
      <section className="py-4">
        <Container className="container_wrapper">
          <div className="d-flex justify-between align-items-center ">
            <h5 className="my-4 sub_title">Coaches/Academy</h5>

            <Link
              to="/vendor/coach/coaches-academy"
              className="btn btn-primary d-flex align-items-center gap-2"
            >
              <i className="bi bi-plus-lg"></i>
              Add Services
            </Link>
          </div>

          <Table
            bordered
            responsive
            className="table align-middle table-borderless shadow-sm"
          >
            {/* LIGHT BLUE HEADER */}
            <thead className="bg-primary bg-opacity-10">
              <tr>
                <th className="fw-semibold">
                  User Name <br />
                  <small className="text-muted">User ID</small>
                </th>
                <th className="fw-semibold">Created Date</th>
                <th className="fw-semibold">Coach / Academy</th>
                <th className="fw-semibold">Services</th>
                <th className="fw-semibold">Active Days</th>
                <th className="fw-semibold">Serviceable Locations</th>
                <th className="fw-semibold">Status</th>
                <th className="fw-semibold">Action</th>
              </tr>
            </thead>

            <tbody>
              {userData.map((item, index) => (
                <tr key={index} className="bg-white">
                  <td>
                    {item.userName} <br />
                    <small className="text-secondary">#{item.userId}</small>
                  </td>
                  <td>{item.createdDate}</td>
                  <td>{item.coachType}</td>
                  <td>{item.services}</td>
                  <td>{item.activeDays}</td>
                  <td>{item.locations}</td>

                  <td>
                    {item.status === "Active" ? (
                      <span className="badge bg-success bg-opacity-10 text-success fw-bold px-3 py-2">
                        Active
                      </span>
                    ) : (
                      <span className="badge bg-danger bg-opacity-10 text-danger fw-bold px-3 py-2">
                        Inactive
                      </span>
                    )}
                  </td>

                  {/* EDIT ICON BUTTON */}
                  <td>
                    <button className="btn btn-sm btn-primary px-3 d-flex align-items-center gap-1">
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </section>
    </>
  );
}

export default CoachAcademyList;
