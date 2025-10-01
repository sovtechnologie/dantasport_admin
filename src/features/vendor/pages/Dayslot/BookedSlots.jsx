import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Spin, message, Button, Card } from "antd";
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

      console.log("Booked Payload:", payload);

      const res = await getBookedAndAvailableBookings(payload);
      console.log("Booked Data Response:", res?.result?.data);

      setBookedData(res?.result?.data || []);
    } catch (error) {
      message.error("Failed to fetch booked details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookedDetails();
  }, [id, date, startTime, endTime]);

  const handleCheckIn = async (id) => {
    try {
      setLoading(true);

      const payload = {
        bookingId: Number(id),
        type: 2, // Check-In
      };

      console.log("Check-In Payload:", payload);

      const res = await updateVenueBooking(payload);

      if (res?.success) {
        message.success("Booking Checked-In successfully");

        setBookedData((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: 2 } : item))
        );
      } else {
        message.error("Failed to Check-In booking");
      }
    } catch (error) {
      console.error("Check-In Error:", error);
      message.error("Error while checking in booking");
    } finally {
      setLoading(false);
    }
  };

  const handleDecline = async (id) => {
    try {
      setLoading(true);
      const payload = {
        bookingId: Number(id),
        type: 1,
        status: 0, // Declined
      };

      console.log("Decline Payload:", payload);

      const res = await updateVenueBooking(payload);

      if (res?.success) {
        message.success("Booking Declined successfully");
        setBookedData((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: 0 } : item))
        );
      } else {
        message.error("Failed to decline booking");
      }
    } catch (error) {
      console.error("Decline Error:", error);
      message.error("Error while declining booking");
    } finally {
      setLoading(false);
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
                <strong>Mobile:</strong>{" "}
                {item.mobile_number
                  ? "******" + item.mobile_number.slice(-4)
                  : "N/A"}
              </p>
              <p>
                <strong>Amount:</strong> ₹{item.amount || 700}
              </p>

              <div className="booked-actions">
                {item.status === 0 ? (
                  <Button danger disabled>
                    Declined
                  </Button>
                ) : item.status === 2 ? (
                  <Button type="primary" disabled>
                    Checked-In
                  </Button>
                ) : (
                  <>
                    <Button
                      type="primary"
                      onClick={() => handleCheckIn(item.id)}
                    >
                      Check-In
                    </Button>
                    <Button danger onClick={() => handleDecline(item.id)}>
                      Decline
                    </Button>
                  </>
                )}
              </div>
            </Card>
          ))}
        </div>
      </Spin>
    </div>
  );
};

export default BookedDetails;
