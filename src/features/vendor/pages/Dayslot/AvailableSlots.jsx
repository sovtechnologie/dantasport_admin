import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spin, message, Button, Modal, Input } from "antd";
import {
  createBooking,
  getBookedAndAvailableBookings,
} from "../../../../services/vendor/DaySlots/endpointApi";
import "../../styelsheets/DaySlots/AvailableSlots.css";

export default function AvailableDetails() {
  const location = useLocation();
  const { id } = useParams();
  const courtIds = id ? id.split("-").map(Number) : [];

  const query = new URLSearchParams(location.search);
  console.log(" Query Params:", {
    date: query.get("date"),
    start: query.get("start"),
    end: query.get("end"),
  });

  const navigate = useNavigate();

  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reason, setReason] = useState("");

  const startTime = query.get("start") || "06:00";
  const endTime = query.get("end") || "06:30";
  const date = query.get("date") || "2025-10-01";

  useEffect(() => {
    if (!id) return;

    const fetchCourts = async () => {
      setLoading(true);
      try {
        const payload = {
          courtIds,
          type: 2,
          startTime,
          endTime,
          date,
        };

        const res = await getBookedAndAvailableBookings(payload);

        if (res?.status === 200 && res?.result?.data) {
          setCourts(res.result.data);
        } else {
          setCourts([]);
          message.info("No available courts for this slot");
        }
      } catch (error) {
        console.error(error);
        message.error("Failed to fetch available courts");
      } finally {
        setLoading(false);
      }
    };

    fetchCourts();
  }, [id, startTime, endTime, date]);

  const handleBookClick = (court) => {
    setSelectedCourt(court);
    setIsModalVisible(true);
  };

  const handleConfirmBooking = async () => {
    if (!selectedCourt) return;

    try {
      const start = new Date(`2000-01-01T${startTime}`);
      const end = new Date(`2000-01-01T${endTime}`);
      const duration = Math.floor((end - start) / (1000 * 60));

      const payload = {
        sportId: selectedCourt.sports_id,
        venueId: String(selectedCourt.venue_id),
        date: date,
        startTime: startTime.slice(0, 5),
        duration: duration,
        courtId: selectedCourt.court_id,
      };

      console.log("📩 Booking Payload:", payload);

      const res = await createBooking(payload);

      if (res?.status === 200) {
        message.success("Booking confirmed successfully!");
      } else {
        message.error(res?.message || "Booking failed!");
      }
    } catch (error) {
      console.error(" Booking Error:", error);
      message.error("Something went wrong while booking");
    } finally {
      setIsModalVisible(false);
      setSelectedCourt(null);
      setReason("");
    }
  };

  return (
    <div className="Available-container">
      <div className="Available-header">
        <h1>Available Courts</h1>
        <span className="closed-btn" onClick={() => navigate(-1)}>
          ×
        </span>
      </div>

      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "50px auto" }} />
      ) : (
        <div className="Available-cards">
          {courts.length === 0 && <p>No available courts.</p>}
          {courts.map((court, index) => (
            <div key={court.court_id ?? index} className="Available-card">
              <h3>{court.venue_name}</h3>
              <h3>{court.court_name}</h3>
              <p>
                <strong>Sport:</strong> {court.sports_name}
              </p>
              <p>
                <strong>Timing:</strong>{" "}
                <span className="highlight-blue">
                  {startTime} - {endTime}
                </span>
              </p>
              <div className="Available-footer">
                <Button type="primary" onClick={() => handleBookClick(court)}>
                  Book
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        title="Booking"
        open={isModalVisible}
        onOk={handleConfirmBooking}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <p>Are you sure you want to book this court?</p>
        <Input.TextArea
          rows={4}
          placeholder="Type message or reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <div className="modal-footer">
          <Button danger onClick={() => setIsModalVisible(false)}>
            NO
          </Button>
          <Button type="primary" onClick={handleConfirmBooking}>
            YES
          </Button>
        </div>
      </Modal>
    </div>
  );
}
