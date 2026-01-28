import React from "react";
import { Container, Table, Badge, Button } from "react-bootstrap";
import SearchBox from "../../../Component/SearchBox";
import ExportFilter from "../../../Component/ExportFilter";
import SettlementHistoryModal from "../../../Component/SettlementHistoryModal";

function HostEarningsSettlement() {
  const [showHistoryModal, setShowHistoryModal] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);

  const handleOpenHistory = (user) => {
    setSelectedUser(user);
    setShowHistoryModal(true);
  };

  const handleCloseHistory = () => {
    setShowHistoryModal(false);
    setSelectedUser(null);
  };

  const settlementData = [
    {
      userName: "Satish Sahu",
      mobile: "8429813814",
      collectsOnline: true,
      payoutAmount: 45000,
      platformFeePercent: 10,
      platformFeeAmount: 4500,
      pendingSettlement: 12000,
      paidSettlement: 33000,
      historyCount: 5,
    },
    {
      userName: "Rahul Verma",
      mobile: "9876543210",
      collectsOnline: false,
      payoutAmount: 28000,
      platformFeePercent: 8,
      platformFeeAmount: 2240,
      pendingSettlement: 8000,
      paidSettlement: 20000,
      historyCount: 3,
    },
    {
      userName: "Amit Singh",
      mobile: "9123456789",
      collectsOnline: true,
      payoutAmount: 76000,
      platformFeePercent: 12,
      platformFeeAmount: 9120,
      pendingSettlement: 0,
      paidSettlement: 76000,
      historyCount: 7,
    },
  ];

  const thStyle = {
    color: "#1163C7",
    fontWeight: 600,
    background: "#fff",
    padding: "12px 14px",
    fontSize: "16px",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
  };

  const tdStyle = {
    padding: "12px 14px",
    verticalAlign: "middle",
    whiteSpace: "nowrap",
    fontSize: "14px",
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
            <div className="d-flex justify-between align-items-center mb-3">
              <h5 style={{ fontWeight: 600 }} className="mb-3">
                Host Earnings & Settlement
              </h5>
              <ExportFilter />
            </div>

            <Table bordered hover responsive className="mb-0">
              <thead>
                <tr>
                  <th style={thStyle}>User Name & Number</th>
                  <th style={thStyle}>Danta Collects Online</th>
                  <th style={thStyle}>Host Payout Amount (₹)</th>
                  <th style={thStyle}>Platform Fee</th>
                  <th style={thStyle}>Pending Settlement (₹)</th>
                  <th style={thStyle}>Paid Settlements (₹)</th>
                  <th style={thStyle}>Settlement History</th>
                </tr>
              </thead>

              <tbody>
                {settlementData.map((item, index) => (
                  <tr key={index}>
                    <td style={tdStyle}>
                      <div style={{ fontWeight: 500 }}>{item.userName}</div>
                      <div style={{ fontSize: "14px", color: "#6B7280" }}>
                        {item.mobile}
                      </div>
                    </td>

                    <td style={tdStyle}>
                      <Badge bg={item.collectsOnline ? "success" : "secondary"}>
                        {item.collectsOnline ? "Yes" : "No"}
                      </Badge>
                    </td>

                    <td style={tdStyle}>
                      {item.payoutAmount.toLocaleString()}
                    </td>

                    <td style={tdStyle}>
                      {item.platformFeePercent}% / ₹
                      {item.platformFeeAmount.toLocaleString()}
                    </td>

                    <td style={tdStyle}>
                      <span
                        style={{
                          color:
                            item.pendingSettlement > 0 ? "#DC2626" : "#16A34A",
                          fontWeight: 500,
                        }}
                      >
                        {item.pendingSettlement.toLocaleString()}
                      </span>
                    </td>

                    <td style={tdStyle}>
                      {item.paidSettlement.toLocaleString()}
                    </td>

                    <td style={tdStyle}>
                      <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={() => handleOpenHistory(item)}
                      >
                        View ({item.historyCount})
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Container>
        <SettlementHistoryModal
          show={showHistoryModal}
          onClose={handleCloseHistory}
          user={selectedUser}
        />
      </section>
    </>
  );
}

export default HostEarningsSettlement;
