import { useParams, useNavigate } from "react-router-dom";
import "../../styelsheets/DaySlots/AvailableSlots.css";
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
    },
    {
        id: 2,
        date: "Tue, 22nd April 2025",
        name: "Badminton Premium Hybrid",
        court: "Court 1",
        sport: "Badminton",
        time: "06:00 AM – 07:00 AM",
    },
    {
        id: 3,
        date: "Tue, 22nd April 2025",
        name: "Badminton Premium Hybrid",
        court: "Court 1",
        sport: "Badminton",
        time: "06:00 AM – 07:00 AM",
    },
    {
        id: 4,
        date: "Tue, 22nd April 2025",
        name: "Badminton Premium Hybrid",
        court: "Court 1",
        sport: "Badminton",
        time: "06:00 AM – 07:00 AM",
    },
];

export default function AvailableSlots() {

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
        <div className="Available-container">
            <div className="Available-header">
                <h1>Available Court Details</h1>
                <span className="closed-btn" onClick={() => navigate(-1)}>
                    ×
                </span>
            </div>

            <div className="Available-cards">
                {dummyBookings.map((booking) => (
                    <div key={booking.id} className="Available-card">
                        <p className="Available-date">{booking.date}</p>
                        <h3>{booking.name}</h3>
                        <h3>{booking.court}</h3>
                        <p><strong>Sports:</strong> {booking.sport}</p>
                        <p>
                            <strong>Timing:</strong>{" "}
                            <span className="highlight-blue">{booking.time}</span>
                        </p>
                        <div className="Available-footer">
                            <Button type="primary" className="book-btn" onClick={() => handleCancelClick(booking)}>
                                Book
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <Modal
                title="Booking"
                open={isModalVisible}
                onOk={handleConfirmCancel}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <p>Are you sure you want to book?</p>
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