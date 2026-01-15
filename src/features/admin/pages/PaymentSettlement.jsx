import React from "react";
import { Container, Table } from "react-bootstrap";
import SearchBox from "../../Component/SearchBox";
import ExportFilter from "../../Component/ExportFilter";

function PaymentSettlement() {
  const paymentData = [
    {
      bookingId: "BK-1001",
      bookingDate: "12 Jan 2026, 10:30 AM",
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
      remarks: "-"
    },
    {
      bookingId: "BK-1002",
      bookingDate: "13 Jan 2026, 02:15 PM",
      userName: "Amit Verma",
      phoneNumber: "9123456789",
      grossValue: "3,000",
      dantaDiscount: "300",
      venueDiscount: "100",
      tds: "30",
      gst: "54",
      netAmount: "2,516",
      utr: "UTR987654321",
      payoutDate: "16 Jan 2026",
      status: "Pending",
      remarks: "Processing"
    }
  ];

  return (
    <>
      <section className="py-4">
        <Container>
          <SearchBox />

          <div className="shadow-sm">
            <ExportFilter />
          </div>

          <div
            className="bg-white p-3 mt-2 shadow-sm"
            style={{ maxWidth: "1200px", margin: "0 auto" }}
          >
            <div style={{ overflowX: "auto" }}>
              <Table
                bordered
                hover
                className="align-middle text-center"
                style={{ minWidth: "1400px" }}
              >
                <thead>
                  <tr style={{ backgroundColor: "#F5F9FF", borderTop: "none" }}>
                    <th style={thStyle}>Booking <br /> ID</th>
                    <th style={thStyle}>Booking <br /> Date & Time</th>
                    <th style={thStyle}>User Name <br /> Contact No</th>
                    <th style={thStyle}>Gross Order Value <br /> (₹)</th>
                    <th style={thStyle}>Danta-funded Discount <br /> (₹)</th>
                    <th style={thStyle}>Venue-funded Discount <br /> (₹)</th>
                    <th style={thStyle}>TDS <br /> (₹)</th>
                    <th style={thStyle}>GST / Service Tax <br /> (₹)</th>
                    <th style={thStyle}>Net Payable Amount <br /> (₹)</th>
                    <th style={thStyle}>UTR <br /> Transaction Reference</th>
                    <th style={thStyle}>Payout <br /> Date</th>
                    <th style={thStyle}>Payment <br /> Status</th>
                    <th style={thStyle}>Remarks</th>
                  </tr>
                </thead>

                <tbody>
                  {paymentData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.bookingId}</td>

                      {/* Booking Date & Time (new line using <small>) */}
                      <td>
                        <div>{item.bookingDate.split(",")[0]}</div>
                        <small className="text-muted">
                          {item.bookingDate.split(",")[1]?.trim()}
                        </small>
                      </td>

                      {/* User Name & Phone */}
                      <td>
                        <div>{item.userName}</div>
                        <small className="text-muted">
                          {item.phoneNumber}
                        </small>
                      </td>

                      <td>{item.grossValue}</td>
                      <td>{item.dantaDiscount}</td>
                      <td>{item.venueDiscount}</td>
                      <td>{item.tds}</td>
                      <td>{item.gst}</td>
                      <td>{item.netAmount}</td>
                      <td>{item.utr}</td>
                      <td>{item.payoutDate}</td>

                      <td>
                        <span
                          className={`badge ${
                            item.status === "Paid"
                              ? "bg-success"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td>{item.remarks}</td>
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

/* 🔹 Table Header Style */
const thStyle = {
  color: "#1163C7",
  fontSize: "14px",
  fontWeight: "500",
  whiteSpace: "nowrap",
  padding: "20px"
};

export default PaymentSettlement;
