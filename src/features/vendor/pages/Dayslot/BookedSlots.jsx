import { useParams, useNavigate } from "react-router-dom";
import "../../styelsheets/DaySlots/BookedSlots.css";
import { Button, Modal, Input } from "antd";
import { useState } from "react";

const dummyBookings = [
    {
        id: 1,
        date: "Tue, 22nd April 2025",
        name: "Badminton Premium Hybrid",
        court: "Court 1",
        sport: "Badminton",
        time: "06:00 AM – 07:00 AM",
        customer: "Mihir Saha",
        mobile: "******8663",
        amount: "₹700",
    },
    {
        id: 2,
        date: "Tue, 22nd April 2025",
        name: "Badminton Premium Hybrid",
        court: "Court 1",
        sport: "Badminton",
        time: "06:00 AM – 07:00 AM",
        customer: "Mihir Saha",
        mobile: "******8663",
        amount: "₹700",
    },
    {
        id: 3,
        date: "Tue, 22nd April 2025",
        name: "Badminton Premium Hybrid",
        court: "Court 1",
        sport: "Badminton",
        time: "06:00 AM – 07:00 AM",
        customer: "Mihir Saha",
        mobile: "******8663",
        amount: "₹700",
    },
    {
        id: 4,
        date: "Tue, 22nd April 2025",
        name: "Badminton Premium Hybrid",
        court: "Court 1",
        sport: "Badminton",
        time: "06:00 AM – 07:00 AM",
        customer: "Mihir Saha",
        mobile: "******8663",
        amount: "₹700",
    },
];

export default function BookedSlots() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [reason, setReason] = useState("");

    const handleCancelClick = (booking) => {
        setSelectedBooking(booking);
        setIsModalVisible(true);
    };

    const handleConfirmCancel = () => {
        console.log("Cancelled booking with ID:", selectedBooking.id);
        setIsModalVisible(false);
        setSelectedBooking(null);
        setReason("");
    };

    return (
        <div className="booked-container">
            <div className="booked-header">
                <h1>Booked Court Details</h1>
                <span className="close-btn" onClick={() => navigate(-1)}>
                    ×
                </span>
            </div>

            <div className="booked-cards">
                {dummyBookings.map((booking) => (
                    <div key={booking.id} className="booking-card">
                        <p className="booking-date">{booking.date}</p>
                        <h3>{booking.name}</h3>
                        <h3>{booking.court}</h3>
                        <p><strong>Sports:</strong> {booking.sport}</p>
                        <p>
                            <strong>Timing:</strong>{" "}
                            <span className="highlight-blue">{booking.time}</span>
                        </p>
                        <p>
                            <strong>Customer:</strong>{" "}
                            <span className="highlight-blue">{booking.customer}</span>
                        </p>
                        <p>
                            <strong>Mobile Number:</strong>
                            <span className="highlight-blue">{booking.mobile}</span>
                        </p>
                        <p><strong>Amount:</strong>
                            <span className="highlight-blue">{booking.amount}</span> </p>
                        <div className="booking-footer">
                            <Button type="primary" className="cancel-btn" onClick={() => handleCancelClick(booking)}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <Modal
                title="Cancel Booking"
                open={isModalVisible}
                onOk={handleConfirmCancel}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <p>Are you sure you want to cancel?</p>
                <Input.TextArea
                    rows={4}
                    placeholder="Type message or reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                />
                <div className="modal-footer">
                    <Button danger className="modal-btn" onClick={() => setIsModalVisible(false)}>NO</Button>
                    <Button type="primary" className="modal-btn" onClick={handleConfirmCancel}>YES</Button>
                </div>

                {/* <p>Are you sure you want to cancel the booking for <strong>{selectedBooking?.court}</strong> at <strong>{selectedBooking?.time}</strong>?</p> */}
            </Modal>

        </div>
    )
}