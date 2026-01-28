import React from "react";
import { Container, Table, Badge } from "react-bootstrap";
import ExportFilter from "../../../Component/ExportFilter";
import SearchBox from "../../../Component/SearchBox";

function PlayGameReports() {
  const playGameData = [
    {
      userName: "Satish Sahu",
      userMobile: "8429813814",
      joinId: "JG10234",
      sportName: "Cricket",
      hostName: "Rahul Verma",
      hostMobile: "9876543210",
      joinDate: "20 Jan 2026",
      joinTime: "5:45 PM",
      paymentRequired: true,
      paymentStatus: "paid",
      amountPaid: 300,
      gameStatus: "upcoming",
      checkIn: true,
    },
    {
      userName: "Amit Singh",
      userMobile: "9123456789",
      joinId: "JG10235",
      sportName: "Football",
      hostName: "Neeraj Kumar",
      hostMobile: "9988776655",
      joinDate: "18 Jan 2026",
      joinTime: "7:10 PM",
      paymentRequired: true,
      paymentStatus: "pending",
      amountPaid: 0,
      gameStatus: "live",
      checkIn: false,
    },
    {
      userName: "Rahul Verma",
      userMobile: "9988776655",
      joinId: "JG10236",
      sportName: "Badminton",
      hostName: "Amit Singh",
      hostMobile: "9123456789",
      joinDate: "15 Jan 2026",
      joinTime: "4:50 PM",
      paymentRequired: false,
      paymentStatus: "refund",
      amountPaid: 0,
      gameStatus: "completed",
      checkIn: true,
    },
  ];

  const thStyle = {
    color: "#1163C7",
    fontWeight: 600,
    background: "#fff",
    padding: "12px 14px",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
    fontSize: "15px",
  };

  const tdStyle = {
    padding: "12px 14px",
    verticalAlign: "middle",
    fontSize: "14px",
    whiteSpace: "nowrap",
  };

  const getBadge = (type, value) => {
    if (type === "yesno") {
      return (
        <Badge bg={value ? "success" : "secondary"}>
          {value ? "Yes" : "No"}
        </Badge>
      );
    }

    if (type === "payment") {
      if (value === "paid") return <Badge bg="success">Paid</Badge>;
      if (value === "pending")
        return (
          <Badge bg="warning" text="dark">
            Pending
          </Badge>
        );
      if (value === "refund") return <Badge bg="secondary">Refund</Badge>;
    }

    if (type === "game") {
      if (value === "upcoming")
        return (
          <Badge bg="warning" text="dark">
            Upcoming
          </Badge>
        );
      if (value === "live") return <Badge bg="success">Live</Badge>;
      if (value === "completed") return <Badge bg="secondary">Completed</Badge>;
    }

    return "-";
  };

  return (
    <section>
      <Container>
        <SearchBox />

        <div
          className="bg-white p-3 rounded shadow-sm"
          style={{ overflowX: "auto", maxWidth: "1200px" }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 style={{ fontWeight: 600, margin: 0 }}>
              Play Game Reports
            </h5>
            <ExportFilter />
          </div>

          <Table bordered hover responsive>
            <thead>
              <tr>
                <th style={thStyle}>
                  User Name <br /> & Number
                </th>
                <th style={thStyle}>Join ID</th>
                <th style={thStyle}>Sport Name</th>
                <th style={thStyle}>
                  Host Name <br /> & Number
                </th>
                <th style={thStyle}>
                  Join Time <br /> / Date
                </th>
                <th style={thStyle}>
                  Payment <br /> Required?
                </th>
                <th style={thStyle}>
                  Payment <br /> Status
                </th>
                <th style={thStyle}>
                  Amount Paid <br /> (₹)
                </th>
                <th style={thStyle}>
                  Game <br /> Status
                </th>
                <th style={thStyle}>Check-in</th>
                <th style={thStyle}>
                  Review Received <br /> By Host
                </th>
                <th style={thStyle}>
                  Avg Rating <br /> of Played Games
                </th>
              </tr>
            </thead>

            <tbody>
              {playGameData.map((item, index) => (
                <tr key={index}>
                  <td style={tdStyle}>
                    <div style={{ fontWeight: 500 }}>{item.userName}</div>
                    <div style={{ fontSize: "12px", color: "#6B7280" }}>
                      {item.userMobile}
                    </div>
                  </td>

                  <td style={tdStyle}>{item.joinId}</td>
                  <td style={tdStyle}>{item.sportName}</td>

                  <td style={tdStyle}>
                    <div style={{ fontWeight: 500 }}>{item.hostName}</div>
                    <div style={{ fontSize: "12px", color: "#6B7280" }}>
                      {item.hostMobile}
                    </div>
                  </td>

                  <td style={tdStyle}>
                    {item.joinDate}
                    <br />
                    <span style={{ fontSize: "12px", color: "#6B7280" }}>
                      {item.joinTime}
                    </span>
                  </td>

                  <td style={tdStyle}>
                    {getBadge("yesno", item.paymentRequired)}
                  </td>
                  <td style={tdStyle}>
                    {getBadge("payment", item.paymentStatus)}
                  </td>
                  <td style={tdStyle}>{item.amountPaid}</td>
                  <td style={tdStyle}>
                    {getBadge("game", item.gameStatus)}
                  </td>
                  <td style={tdStyle}>
                    {getBadge("yesno", item.checkIn)}
                  </td>

                  <td style={tdStyle}>-</td>
                  <td style={tdStyle}>-</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </section>
  );
}

export default PlayGameReports;
