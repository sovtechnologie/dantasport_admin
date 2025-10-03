import React, { useEffect, useState } from "react";
import "../../styelsheets/Manage/GymControl.css";
import { Spin, message } from "antd";
import { useSelector } from "react-redux";

import { useFetchGymList } from "../../../../hooks/vendor/venue/useFetchvendorVenues";
import {
  getPendingCheckingByGym,
  getRecentCheckingByGym,
  verifyAndCheckInGym,
} from "../../../../services/vendor/gym/endpointApi";
import QRCode from "react-qr-code";

const ControlPage = () => {
  const vendorId = useSelector((state) => state.auth.user.id);
  const { data: gymListResp, isLoading: gymLoading } =
    useFetchGymList(vendorId);

  const [recentData, setRecentData] = useState([]);
  const [pendingData, setPendingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedGym, setSelectedGym] = useState("");
  const [selectedUserForQR, setSelectedUserForQR] = useState(null);
  useEffect(() => {
    if (selectedGym) fetchData(selectedGym);
  }, [selectedGym]);

  const fetchData = async (gymId) => {
    try {
      setLoading(true);
      const payload = { gymId: Number(gymId) };

      const [recentRes, pendingRes] = await Promise.all([
        getRecentCheckingByGym(payload),
        getPendingCheckingByGym(payload),
      ]);

      setRecentData(recentRes?.status === 200 ? recentRes.result || [] : []);
      setPendingData(pendingRes?.status === 200 ? pendingRes.result || [] : []);

      if (pendingRes?.status === 200 && pendingRes.result?.length) {
        setSelectedUserForQR(pendingRes.result[0].user_id);
      } else {
        setSelectedUserForQR(null);
      }
    } catch (err) {
      console.error("Error fetching gym data:", err);
      message.error("Something went wrong while fetching data");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const checkInType = (type) => {
    if (type === 1) return "QR";
    if (type === 2) return "Manual";
    return "-";
  };

  const handleCheckIn = async (user_id, type) => {
    if (!selectedGym) {
      message.warning("Please select a gym first");
      return;
    }

    setLoading(true);
    try {
      const res = await verifyAndCheckInGym(selectedGym, user_id, type);
      message.success("Check-in successful");
      fetchData(selectedGym);
    } catch (err) {
      console.error("Check-in error:", err);
      message.error(err.message || "Check-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="control-container">
      <div
        className="control-header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          marginBottom: "20px",
        }}
      >
        <div>
          {gymLoading ? (
            <Spin />
          ) : (
            <select
              className="gym-select"
              value={selectedGym}
              onChange={(e) => setSelectedGym(e.target.value)}
            >
              <option value="">Select Gym</option>
              {gymListResp?.result?.map((gym) => (
                <option key={gym.Id} value={gym.Id}>
                  {gym.gym_name}
                </option>
              ))}
            </select>
          )}
        </div>

        <div>
          {selectedUserForQR ? (
            <>
              <span>User ID: {selectedUserForQR}</span>
              <QRCode value={selectedUserForQR.toString()} size={80} />
            </>
          ) : (
            <span>No Pending Users</span>
          )}
        </div>
      </div>

      {loading ? (
        <Spin />
      ) : (
        <>
          <div className="table-section">
            <h3>Recent Checking</h3>
            <table className="control-table">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>User ID</th>
                  <th>Booking ID</th>
                  <th>Date & Time</th>
                  <th>Location</th>
                  <th>Check-In</th>
                </tr>
              </thead>
              <tbody>
                {recentData.length ? (
                  recentData.map((item) => (
                    <tr key={item.user_id}>
                      <td>{item.full_name}</td>
                      <td>{item.user_id}</td>
                      <td>{item.booking_id}</td>
                      <td>{formatDate(item.check_in_time)}</td>
                      <td>{`${item.city}, ${item.state}`}</td>
                      <td
                        className={`status ${checkInType(
                          item.check_in_type
                        ).toLowerCase()}`}
                      >
                        {checkInType(item.check_in_type)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No Recent Check-ins</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="table-section">
            <h3>Pending Checking</h3>
            <table className="control-table">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>User ID</th>
                  <th>Booking ID</th>
                  <th>Date & Time</th>
                  <th>Location</th>
                  <th>Check-In</th>
                </tr>
              </thead>
              <tbody>
                {pendingData.length ? (
                  pendingData.map((item) => (
                    <tr key={item.user_id}>
                      <td>{item.full_name}</td>
                      <td>{item.user_id}</td>
                      <td>{item.booking_id}</td>
                      <td>{formatDate(item.booking_date)}</td>
                      <td>{`${item.city}, ${item.state}`}</td>
                      <td>
                        <label>
                          <input
                            type="radio"
                            name={`check-${item.user_id}`}
                            onChange={() => handleCheckIn(item.user_id, 1)}
                          />{" "}
                          QR
                        </label>
                        <label>
                          <input
                            type="radio"
                            name={`check-${item.user_id}`}
                            onChange={() => handleCheckIn(item.user_id, 2)}
                          />{" "}
                          Manual
                        </label>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No Pending Check-ins</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ControlPage;
