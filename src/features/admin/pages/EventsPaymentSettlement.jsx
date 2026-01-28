import React, { useState } from "react";
import { Container, Table } from "react-bootstrap";

import SearchBox from "../../Component/SearchBox";
import ExportFilter from "../../Component/ExportFilter";
import FilterDropDawn from "../../Component/FilterDropDawn";
import PayOutModal from "../../Component/PayOutModal";
import TotalListingPrice from "../../Component/TotalListingPrice";

function EventsPaymentSettlement() {
  const [showPayout, setShowPayout] = useState(false);

  const paymentData = [
    {
      bookingId: "BK-1001",
      vendorName: "Play Arena Pvt Ltd",
      venueName: "Green Turf Ground",
      bookingDate: "12 Jan 2026",
      bookingTime: "10:30 AM",
      userName: "Rahul Sharma",
      phoneNumber: "8429813814",
      grossValue: "5,000",
      dantaDiscount: "500",
      venueDiscount: "0",
      tds: "50",
      gst: "90",
      netAmount: "4,360",
      utr: "UTR123456789",
      payoutDate: "15 Jan 2026",
      status: "Paid",
      remarks: "-",
      PaymentStatements: "Null",
    },
    {
      bookingId: "BK-1002",
      vendorName: "Sports Hub India",
      venueName: "Elite Football Turf",
      bookingDate: "13 Jan 2026",
      bookingTime: "02:15 PM",
      userName: "Amit Verma",
      phoneNumber: "9123456789",
      grossValue: "3,000",
      dantaDiscount: "300",
      venueDiscount: "100",
      tds: "30",
      gst: "54",
      netAmount: "2,516",
      utr: "-",
      payoutDate: "-",
      status: "Pending",
      remarks: "Processing",
      PaymentStatements: "file",
    },
  ];

  return (
    <section className="py-4">
      <Container>
        <SearchBox />

        <div>
          <TotalListingPrice />
        </div>

        <div className="bg-white shadow-sm rounded p-3">
          {/* Header */}
           <h5 style={{color:"#1163C7"}}> Events Payment Settlement </h5>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <FilterDropDawn />
            <button
              className="btn btn-outline-primary"
              onClick={() => setShowPayout(true)}
            >
              Payout
            </button>
            <ExportFilter />
          </div>

          {/* Table */}
          <div style={{ overflowX: "auto", maxWidth: "1100px" }}>
           
            <Table
              bordered
              hover
              className="align-middle text-center"
              style={{ width: "100%", margin: "0 auto" }}
            >
              <thead>
                <tr style={{ backgroundColor: "#F5F9FF" }}>
                  <th style={thStyle}>Select All
                     <input type="checkbox" className="form-check-input ms-3" />
                  </th>
                  <th style={thStyle}>Booking ID</th>
                  <th style={thStyle}>Vendor Name</th>
                  <th style={thStyle}>Venue Name</th>
                  <th style={thStyle}>
                    Booking <br /> Date & Time
                  </th>
                  <th style={thStyle}>
                    Customer Details <br /> Contact No
                  </th>
                  <th style={thStyle}>
                    Listing <br /> Price (₹)
                  </th>
                  <th style={thStyle}>
                    Danta Discount <br /> (₹)
                  </th>
                  <th style={thStyle}>
                    Venue Discount <br /> (₹)
                  </th>
                  <th style={thStyle}>
                    Taxable  <br /> Value (₹)
                  </th>
                  <th style={thStyle}>
                    GST / Tax <br /> (₹)
                  </th>
                  <th style={thStyle}>
                    TDS <br /> (₹)
                  </th>
                  <th style={thStyle}>
                    Net Payable <br /> Amount (₹)
                  </th>
                  <th style={thStyle}>
                    UTR <br /> Reference
                  </th>
                  <th style={thStyle}>Payout Date</th>
                  <th style={thStyle}>
                    Payment <br /> Status
                  </th>
                  <th style={thStyle}>Remarks</th>
                  <th style={thStyle}>Payment Statements</th>
                </tr>
              </thead>

              <tbody>
                {paymentData.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <input type="checkbox" className="form-check-input" />
                    </td>

                    <td>{item.bookingId}</td>
                    <td>{item.vendorName}</td>
                    <td>{item.venueName}</td>

                    <td>
                      <div>{item.bookingDate}</div>
                      <small className="text-muted">
                        {item.bookingTime}
                      </small>
                    </td>

                    <td>
                      <div>{item.userName}</div>
                      <small className="text-muted">
                        {item.phoneNumber}
                      </small>
                    </td>

                    <td>{item.grossValue}</td>
                    <td>{item.dantaDiscount}</td>
                    <td>{item.venueDiscount}</td>
                    <td>{item.grossValue}</td>
                    <td>{item.gst}</td>
                    <td>{item.tds}</td>
                    <td className="fw-semibold">{item.netAmount}</td>
                    <td>{item.utr}</td>
                    <td>{item.payoutDate}</td>

                    <td>
                      <span
                        className={`badge ${item.status === "Paid"
                            ? "bg-success"
                            : "bg-warning text-dark"
                          }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>{item.remarks}</td>

                    <td>
                      {item.PaymentStatements ? (
                        <button className="btn btn-sm btn-outline-primary">
                          View
                        </button>
                      ) : (
                        <span className="text-muted">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </Container>

      {/* Payout Modal */}
      <PayOutModal
        show={showPayout}
        onClose={() => setShowPayout(false)}
        paymentData={paymentData}
      />
    </section>
  );
}

/* 🔹 Table Header Style */
const thStyle = {
  color: "#1163C7",
  fontSize: "14px",
  fontWeight: "500",
  whiteSpace: "nowrap",
  padding: "16px",
  verticalAlign: "middle",
};

export default EventsPaymentSettlement;
