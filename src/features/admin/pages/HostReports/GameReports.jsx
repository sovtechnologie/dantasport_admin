import React from "react";
import {
  Container,
  Table,
  Badge,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import ExportFilter from "../../../Component/ExportFilter";
import SearchBox from "../../../Component/SearchBox";

function GameReports() {
  const gameReportData = [
    {
      username: "Satish Sahu",
      userno: "8429813814",
      sportType: "Cricket",
      hostedDate: "20 Jan 2026",
      hostedTime: "6:00 PM",
      location: "Lucknow",
      venue: "Green Park",
      slotDuration: "90 mins",
      maxPlayers: 22,
      playersJoined: 18,
      enquiryRaised: 3,
      status: "upcoming",
      gameType: "paid",
      pricePerPlayer: 300,
      totalExpected: 6600,
      totalCollected: 5400,
      reviewReceived: true,
      avgRating: 4.5,
      reviewMsg:
        "Excellent ground and well-organized match. Players were friendly.",
    },
    {
      username: "Rahul Verma",
      userno: "8429813814",
      sportType: "Football",
      hostedDate: "18 Jan 2026",
      hostedTime: "7:30 PM",
      location: "Noida",
      venue: "City Arena",
      slotDuration: "60 mins",
      maxPlayers: 10,
      playersJoined: 10,
      enquiryRaised: 0,
      status: "live",
      gameType: "free",
      pricePerPlayer: 0,
      totalExpected: 0,
      totalCollected: 0,
      reviewReceived: false,
      avgRating: "-",
      reviewMsg: "",
    },
    {
      username: "Amit Singh",
      userno: "8429813814",
      sportType: "Badminton",
      hostedDate: "15 Jan 2026",
      hostedTime: "5:00 PM",
      location: "Delhi",
      venue: "Smash Court",
      slotDuration: "45 mins",
      maxPlayers: 4,
      playersJoined: 4,
      enquiryRaised: 1,
      status: "completed",
      gameType: "paid",
      pricePerPlayer: 250,
      totalExpected: 1000,
      totalCollected: 1000,
      reviewReceived: true,
      avgRating: 4.8,
      reviewMsg:
        "Very smooth booking and quality court. Would love to join again.",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "upcoming":
        return (
          <Badge bg="warning" text="dark">
            Upcoming
          </Badge>
        );
      case "live":
        return <Badge bg="success">Live</Badge>;
      case "completed":
        return <Badge bg="secondary">Completed</Badge>;
      default:
        return "-";
    }
  };

  const thStyle = {
    color: "#1163C7",
    fontWeight: 600,
    background: "#fff",
    whiteSpace: "nowrap",
    padding: "12px 14px",
    verticalAlign: "middle",
    fontSize: "16px",
  };

  const tdStyle = {
    padding: "12px 14px",
    verticalAlign: "middle",
  };

  return (
    <>
      <section>
        <Container>
          <SearchBox />

          <div
            className="bg-white p-3 rounded shadow-sm"
            style={{ overflowX: "auto", maxWidth: "1200px" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 style={{ fontWeight: 600, margin: 0 }}>Game Reports</h5>
              <ExportFilter />
            </div>

            <Table bordered hover responsive style={{ fontSize: "16px" }}>
              <thead>
                <tr>
                  {[
                    "Username & Number",
                    "Sport Type",
                    "Hosted Date & Time",
                    "Location & Venue",
                    "Slot Duration",
                    "Max Players",
                    "Players Joined",
                    "Enquiry Received",
                    "Status",
                    "Game Type",
                    "Price / Player (₹)",
                    "Total Expected (₹)",
                    "Total Collected (₹)",
                    "Review Received",
                    "Avg Rating Of Hosted Games",
                  ].map((head, index) => (
                    <th key={index} style={thStyle}>
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {gameReportData.map((item, index) => (
                  <tr key={index}>
                    <td style={tdStyle}>
                      {item.username}
                      <br />
                      {item.userno}
                    </td>

                    <td style={tdStyle}>{item.sportType}</td>

                    <td style={tdStyle}>
                      <div style={{ fontWeight: 500 }}>
                        {item.hostedDate}
                      </div>
                      <div style={{ fontSize: "12px", color: "#6B7280" }}>
                        {item.hostedTime}
                      </div>
                    </td>

                    <td style={tdStyle}>
                      {item.location}
                      <br />
                      <span style={{ fontSize: "12px", color: "#6B7280" }}>
                        {item.venue}
                      </span>
                    </td>

                    <td style={tdStyle}>{item.slotDuration}</td>
                    <td style={tdStyle}>{item.maxPlayers}</td>
                    <td style={tdStyle}>{item.playersJoined}</td>
                    <td style={tdStyle}>{item.enquiryRaised}</td>
                    <td style={tdStyle}>{getStatusBadge(item.status)}</td>

                    <td style={tdStyle}>
                      <Badge
                        bg={
                          item.gameType === "paid"
                            ? "success"
                            : "secondary"
                        }
                      >
                        {item.gameType.toUpperCase()}
                      </Badge>
                    </td>

                    <td style={tdStyle}>{item.pricePerPlayer}</td>
                    <td style={tdStyle}>{item.totalExpected}</td>
                    <td style={tdStyle}>{item.totalCollected}</td>

                    <td style={tdStyle}>
                      <Badge
                        bg={
                          item.reviewReceived ? "success" : "secondary"
                        }
                      >
                        {item.reviewReceived ? "Yes" : "No"}
                      </Badge>
                    </td>

                    {/* ⭐ Avg Rating + Message with 3 dots */}
                    <td style={{ ...tdStyle, maxWidth: "220px" }}>
                      {item.avgRating !== "-" ? (
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              {item.reviewMsg}
                            </Tooltip>
                          }
                        >
                          <span
                            style={{
                              cursor: "pointer",
                              display: "inline-block",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              maxWidth: "200px",
                            }}
                          >
                            ⭐ {item.avgRating} – {item.reviewMsg}
                          </span>
                        </OverlayTrigger>
                      ) : (
                        "-"
                      )}
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

export default GameReports;
