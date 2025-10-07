import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Spin, message, Button, Card, Modal, Input } from "antd";
import {
  getBookedAndAvailableBookings,
  updateVenueBooking,
} from "../../../../services/vendor/DaySlots/endpointApi";
import "../../styelsheets/DaySlots/BookedSlots.css";

const BookedDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [bookedData, setBookedData] = useState([]);
  const [declineModal, setDeclineModal] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const date = queryParams.get("date");
  const startTime = queryParams.get("start");
  const endTime = queryParams.get("end");

  const fetchBookedDetails = async () => {
    setLoading(true);
    try {
      const payload = {
        bookingIds: id ? id.split("-").map(Number) : [],
        type: 1,
        startTime,
        endTime,
        date,
      };
      const res = await getBookedAndAvailableBookings(payload);
      setBookedData(res?.result?.data || []);
    } catch {
      message.error("Failed to fetch booked details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookedDetails();
  }, [id, date, startTime, endTime]);

  const handleCheckIn = async (bookingId) => {
    setLoading(true);
    try {
      const payload = { bookingId: Number(bookingId), type: 2 };
      const res = await updateVenueBooking(payload);
      if (res?.success) {
        setBookedData((prev) =>
          prev.map((item) =>
            item.id === bookingId ? { ...item, is_check_in: 1 } : item
          )
        );
        message.success("Booking Checked-In successfully");
      } else {
        message.error("Failed to Check-In booking");
      }
    } catch {
      message.error("Error while checking in booking");
    } finally {
      setLoading(false);
    }
  };

  const showDeclineModal = (bookingId) => {
    setSelectedBookingId(bookingId);
    setDeclineModal(true);
  };

  const handleDeclineConfirm = async () => {
    if (!declineReason.trim()) return message.warning("Please enter a reason");
    setLoading(true);
    try {
      const payload = {
        bookingId: Number(selectedBookingId),
        type: 1,
        status: 0,
        reason: declineReason,
      };
      const res = await updateVenueBooking(payload);
      if (res?.success) {
        setBookedData((prev) =>
          prev.map((item) =>
            item.id === selectedBookingId ? { ...item, status: 0 } : item
          )
        );

        setDeclineModal(false);
        setDeclineReason("");
        setSelectedBookingId(null);
        message.success("Booking Declined successfully");
      } else {
        message.error("Failed to decline booking");
      }
    } catch {
      message.error("Error while declining booking");
    } finally {
      setLoading(false);
      navigate("/vendor/dayslots");
    }
  };

  return (
    <div className="booked-details-container">
      <h2>Booked Court Details</h2>
      <Spin spinning={loading}>
        <div className="booked-cards">
          {bookedData.length === 0 && <p>No booked courts.</p>}
          {bookedData.map((item, index) => (
            <Card key={index} className="booked-card">
              <p>
                <strong>{date}</strong>
              </p>
              <h3>
                {item.venue_name} - {item.court_name}
              </h3>
              <p>
                <strong>Sport:</strong> {item.sports_name}
              </p>
              <p>
                <strong>Timing:</strong> {startTime} - {endTime}
              </p>
              <p>
                <strong>Customer:</strong> {item.customer_name || "N/A"}
              </p>
              <p>
                <strong>Amount:</strong> ₹{item.amount || 700}
              </p>
              <div className="booked-actions">
                {item.status === 0 ? (
                  <Button danger disabled>
                    Declined
                  </Button>
                ) : item.is_check_in === 1 ? (
                  <Button type="primary" disabled>
                    Checked-In
                  </Button>
                ) : (
                  <>
                    <Button
                      type="primary"
                      onClick={() => handleCheckIn(item.id)}
                      disabled={loading}
                    >
                      Check-In Pending
                    </Button>
                    <Button
                      danger
                      onClick={() => showDeclineModal(item.id)}
                      disabled={loading}
                    >
                      Decline
                    </Button>
                  </>
                )}
              </div>
            </Card>
          ))}
        </div>
      </Spin>

      <Modal
        title="Cancel"
        open={declineModal}
        onCancel={() => setDeclineModal(false)}
        footer={[
          <Button key="no" onClick={() => setDeclineModal(false)}>
            No
          </Button>,
          <Button
            key="yes"
            type="primary"
            onClick={handleDeclineConfirm}
            disabled={!declineReason.trim() || loading}
          >
            Yes
          </Button>,
        ]}
      >
        <p>Are you sure you want to cancel?</p>
        <Input.TextArea
          rows={4}
          placeholder="Type message or reason"
          value={declineReason}
          onChange={(e) => setDeclineReason(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default BookedDetails;
