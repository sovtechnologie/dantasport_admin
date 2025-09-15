import React from 'react';
import { Card } from 'antd';
import './stylesheets/StatsSection.css';
import Calanderlogo from "../assets/staticCardlogo/Calander.png";
import Revenuelogo from "../assets/staticCardlogo/Revenue.png";
import PeakHourlogo from "../assets/staticCardlogo/PeakHour.png";
import AverageRatinglogo from "../assets/staticCardlogo/Rating.png";

const stats = [
    {
        title: 'Total Bookings',
        value: 86,
        trend: '+8.5% Up from last week',
        icon: Calanderlogo,
        bgColor: '#FFE2E5',
    },
    {
        title: 'Revenue',
        value: '₹7,200',
        trend: '+8.5% Up from last week',
        icon: Revenuelogo,
        bgColor: '#FFF4DE',
    },
    {
        title: 'Peak hour',
        value: '11–12 AM',
        trend: 'Number of booking 56',
        icon: PeakHourlogo,
        bgColor: '#DCFCE7',
    },
    {
        title: 'Average Rating',
        value: '4.2/5',
        trend: 'From 2 reviews',
        icon: AverageRatinglogo,
        bgColor: '#F3E8FF',
    },
];

export default function StatsSection() {
    return (
        <div className="stats-container">
            {stats.map((s, i) => (
                <Card
                    key={i}
                    style={{ backgroundColor: s.bgColor, borderRadius: 8 }}
                    bodyStyle={{ padding: '16px' }}
                    headStyle={{ display: 'none' }}
                    className="stats-card"
                >
                    {/* <div className="stats-icon"><img src={s.icon} alt='icons' /></div>
                    <div className="stats-content">
                        <div className="stats-title">{s.title}</div>
                        <div className="stats-value">{s.value}</div>
                        <div className="stats-trend">{s.trend}</div>
                    </div> */}

                    <div className="stats-header">
                        <div className='stats-content'>
                            <div className="stat-title">{s.title}</div>
                            <div className="stat-value">{s.value}</div>
                        </div>
                        <div className='stats-icon-container'>
                            <div className="stats-icon"><img src={s.icon} alt='icons' /></div>
                        </div>
                    </div>
                    <div className='stat-footer'>
                        <div className="stat-trend">{s.trend}</div>
                    </div>
                    

                    {/* <div className="stat-header">
                        <div className="stat-title">{s.title}</div>
                        <div className="stat-icon"><img src={s.icon} alt='icons' /></div>
                    </div>
                    <div className="stat-value">{s.value}</div>
                    <div className="stat-trend" style={{ color: '#4CAF50' }}>
                        <span className="arrow">📈</span> {s.trend}
                    </div> */}

                </Card>
            ))}
        </div>
    );
}
