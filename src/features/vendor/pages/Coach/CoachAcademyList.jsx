import React, { useState } from "react";
import { Container, Table } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import { useGetCoaches } from "../../../../hooks/vendor/couches/useGetCoaches";
import { useUpdateCoachesAndAcademy } from "../../../../hooks/vendor/couches/useUpdateCoaches";

function CoachAcademyList() {
  const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;
const { mutate: deleteCoach } = useUpdateCoachesAndAcademy();

const handleDelete = (id) => {
  const formData = new FormData();

  formData.append("coachesAcaademyId", id);
  formData.append("status", 0);

  deleteCoach(formData, {
    onSuccess: () => {
      message.success("Deleted Successfully!");
    },
    onError: () => message.error("Delete failed!"),
  });
};

const getActiveDays = (item) => {
  const days = [];

  if (item.monday) days.push("Mon");
  if (item.tuesday) days.push("Tue");
  if (item.wednesday) days.push("Wed");
  if (item.thursday) days.push("Thu");
  if (item.friday) days.push("Fri");
  if (item.saturday) days.push("Sat");
  if (item.sunday) days.push("Sun");

  return days.length ? days.join(", ") : "No Active Days";
};


  const { data, isLoading, isError } = useGetCoaches();

  // API result array
  const coachList = data || [];
  console.log("API RAW DATA 👉", coachList);
  // console.log("RESULT 👉", data?.result);
const indexOfLast = currentPage * itemsPerPage;
const indexOfFirst = indexOfLast - itemsPerPage;

const currentData = coachList.slice(indexOfFirst, indexOfLast);

const totalPages = Math.ceil(coachList.length / itemsPerPage);
  if (isLoading) {
    return <p className="text-center py-5">Loading...</p>;
  }

  if (isError) {
    return <p className="text-center py-5 text-danger">Something went wrong</p>;
  }

  return (
    <>
      <section className="py-4">
        <Container className="container_wrapper">
          <div className="d-flex justify-between align-items-center ">
            <h5 className="my-4 sub_title">Coaches/Academy</h5>
<Link
  to="/vendor/coach/coaches-academy"
  className={`btn btn-primary d-flex align-items-center gap-2 text-white ${
    coachList.length >= 1 ? "disabled" : ""
  }`}
  style={{
    pointerEvents: coachList.length >= 1 ? "none" : "auto",
    opacity: coachList.length >= 1 ? 0.6 : 1,
  }}
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
  {currentData.map((item, index) => (
    <tr key={index} className="bg-white">

      <td>
        {item.full_name} <br />
        <small className="text-secondary">
          #{item.user_id}
        </small>
      </td>

      <td>
        {new Date(item.created_at).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </td>

      <td>{item.type === 1 ? "Coach" : "Academy"}</td>

      {/* SERVICES DYNAMIC */}
      <td>{item.sports?.join(", ") || "N/A"}</td>

      {/* ACTIVE DAYS DYNAMIC */}
      <td>{getActiveDays(item)}</td>

      {/* LOCATIONS DYNAMIC */}
      <td>
        {item.service_location?.length
          ? item.service_location.map(loc => loc.area).join(", ")
          : "N/A"}
      </td>

      <td>
        {item.status === 1 ? (
          <span className="badge bg-success bg-opacity-10 text-success fw-bold px-3 py-2">
            Active
          </span>
        ) : (
          <span className="badge bg-danger bg-opacity-10 text-danger fw-bold px-3 py-2">
            Inactive
          </span>
        )}
      </td>

      <td>
        <Link
          to={`/vendor/coach/coaches-academy?id=${item.id}`}
          className="btn btn-sm btn-light"
        >
          <i className="bi bi-pencil-square"></i>
        </Link>

        <button
          style={{ marginLeft: "5%" }}
          className="btn btn-sm btn-danger"
          onClick={() => handleDelete(item.id)}
        >
          <i className="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  ))}
</tbody>

          </Table>
          {coachList.length > itemsPerPage && (
  <div className="d-flex justify-content-end mt-3">
    <nav>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
        </li>

        {[...Array(totalPages)].map((_, i) => (
          <li
            key={i}
            className={`page-item ${
              currentPage === i + 1 ? "active" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          </li>
        ))}

        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  </div>
)}

        </Container>
      </section>
    </>
  );
}

export default CoachAcademyList;
