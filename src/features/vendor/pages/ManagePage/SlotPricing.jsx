import "../../styelsheets/Manage/SlotPricing.css";
import { Table, Button, Select, Tag } from 'antd';

const { Option } = Select;

export default function SlotPricing() {
      const slotData = [
    {
      sport: "Badminton",
      type: "Badminton Synthetic",
      schedule: [
        { day: "Monday - Friday", time: "06:00 AM - 05:00 PM", price: "₹700/Hr" },
        { time: "05:00 PM - 11:00 PM", price: "₹800/Hr" },
        { day: "Saturday - Sunday", time: "06:00 AM - 05:00 PM", price: "₹800/Hr" },
        { time: "06:00 AM - 05:00 PM", price: "₹1000/Hr" },
      ],
    },
    {
      sport: "Badminton",
      type: "Badminton Synthetic",
      schedule: [
        { day: "Monday - Friday", time: "06:00 AM - 05:00 PM", price: "₹700/Hr" },
        { time: "05:00 PM - 11:00 PM", price: "₹800/Hr" },
        { day: "Saturday - Sunday", time: "06:00 AM - 05:00 PM", price: "₹800/Hr" },
        { time: "06:00 AM - 05:00 PM", price: "₹1000/Hr" },
      ],
    },
    {
      sport: "Badminton",
      type: "Badminton Synthetic",
      schedule: [
        { day: "Monday - Friday", time: "06:00 AM - 05:00 PM", price: "₹700/Hr" },
        { time: "05:00 PM - 11:00 PM", price: "₹800/Hr" },
        { day: "Saturday - Sunday", time: "06:00 AM - 05:00 PM", price: "₹800/Hr" },
        { time: "06:00 AM - 05:00 PM", price: "₹1000/Hr" },
      ],
    },
  ];
    return (
        <div className="venue-slot-container">
            <div className="slot-header">
                <div className="slot-controls">
                    <Select placeholder="Select Venue" className="slot-select">
                        <Option value="venue1">Venue 1</Option>
                        <Option value="venue2">Venue 2</Option>
                    </Select>
                </div>
            </div>
            <h3 className="slot-title">Red Meadows</h3>
            

            <div className="slot-cards">
          {slotData.map((slot, index) => (
            <div className="slot-card" key={index}>
                <hr style={{color:"#e2e8f0"}} />
              <h4>{slot.sport}</h4>
              <p>{slot.type}</p>
              <hr />
              {slot.schedule.map((item, idx) => (
                <p key={idx}>
                  {item.day && <strong>{item.day}</strong>} <br />
                  {item.time} <span className="price">{item.price}</span>
                </p>
              ))}
            </div>
          ))}
        </div>

        </div>
    )
}