import React from "react";
import "../../stylesheet/vendor/dashboard.css";

const ClientChat = () => {
  const chatData = [
    {
      name: "Sahil Khan",
      phone: "9284578661",
      message: "Hey! I would like to know more details",
      date: "20-06-2025",
      status: "Active",
    },
    {
      name: "Sahil Khan",
      phone: "9284578661",
      message: "Hey! I would like to know more details",
      date: "20-06-2025",
      status: "Active",
    },
    {
      name: "Sahil Khan",
      phone: "9284578661",
      message: "Hey! I would like to know more details",
      date: "20-06-2025",
      status: "Active",
    },
  ];

  return (
    <div className="client-chat-card">
      <h3 className="section_heading mb-3">Client Chat</h3>

      <table className="client-chat-table">
        <thead>
          <tr>
            <th>Customer Details</th>
            <th>Message</th>
            <th>Created On</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {chatData.map((item, i) => (
            <tr key={i}>
              <td>
                <div className="customer-details">
                  <span>{item.name}</span>
                  <span className="phone">{item.phone}</span>
                </div>
              </td>

              <td className="message-cell">{item.message}</td>

              <td>{item.date}</td>

              <td>
                <span className="status-badge">{item.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientChat;
