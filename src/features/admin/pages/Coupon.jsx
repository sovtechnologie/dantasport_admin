import React from "react";
import { Container, Table, Button, Badge, Form } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import SearchBox from "../../Component/SearchBox";

const couponData = [
  {
    code: "welcome200",
    description: "Satish",
    type: "Fixed",
    value: "₹100.00",
    displayBanner: "No",
    expiry: "30/12/2025",
    status: true,
    created: "04/10/2025",
  },
  {
    code: "Welcome200",
    description: "Satish",
    type: "Upto",
    value: "4.00%",
    displayBanner: "No",
    expiry: "01/01/2026",
    status: true,
    created: "Invalid Date",
  },
];

function Coupon() {
  return (
    <section className="py-3">
      <Container>

        <SearchBox />

        {/* Table Card */}
        <div className="bg-white rounded shadow-sm p-3 mt-3">
          <div className="text-end py-3 mb-3">

            <Button as={Link} to="/admin/admin-add-coupon" variant="primary" className="text-white">
              + Add Discount Coupon
            </Button>
          </div>
          <Table responsive borderless className="align-middle">
            <thead className="border-bottom">
              <tr className="text-primary">
                <th style={{ color: "#1163C7", fontSize: "16px" }}>Coupon</th>
                <th style={{ color: "#1163C7", fontSize: "16px" }}>Type & Value</th>
                <th style={{ color: "#1163C7", fontSize: "16px" }}>Display on Banner</th>
                <th style={{ color: "#1163C7", fontSize: "16px" }}>Expiry</th>
                <th style={{ color: "#1163C7", fontSize: "16px" }}>Status</th>
                <th style={{ color: "#1163C7", fontSize: "16px" }}>Created</th>
                <th style={{ color: "#1163C7", fontSize: "16px" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {couponData.map((coupon, index) => (
                <tr key={index}>
                  <td>
                    <div className="fw-semibold">{coupon.code}</div>
                    <small className="text-muted">{coupon.description}</small>
                  </td>

                  <td>
                    <Badge bg="info" className="mb-1">
                      {coupon.type}
                    </Badge>
                    <div className="text-primary fw-semibold">{coupon.value}</div>
                  </td>

                  <td>
                    <Form.Check
                      inline
                      label="Yes"
                      type="radio"
                      name={`banner${index}`}
                      checked={coupon.displayBanner === "Yes"}
                      readOnly
                    />
                    <Form.Check
                      inline
                      label="No"
                      type="radio"
                      name={`banner${index}`}
                      checked={coupon.displayBanner === "No"}
                      readOnly
                    />
                  </td>

                  <td>{coupon.expiry}</td>

                  <td>
                    <Form.Check
                      type="switch"
                      label="Active"
                      checked={coupon.status}
                      readOnly
                    />
                  </td>

                  <td>{coupon.created}</td>

                  <td>
                    <Button variant="link" className="text-dark p-1">
                      <PencilSquare />
                    </Button>
                    <Button variant="link" className="text-danger p-1">
                      <Trash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Footer */}
          <div className="text-end text-muted small">
            Showing 1–{couponData.length} of {couponData.length} coupons
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Coupon;
