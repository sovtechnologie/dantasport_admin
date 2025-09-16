import "../../styelsheets/Manage/addCourt.css";
import { Form, Input, Button, Upload, Select, Card, Typography, Space, Modal, message } from 'antd';
import { useLocation } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useGetAvailableCourts } from '../../../../hooks/vendor/booking/useGetBookingDetails';
import dayjs from 'dayjs';
const { TextArea } = Input;

export default function AddCourt() {

    const [form] = Form.useForm();
    const { Option } = Select;
    const location = useLocation();
    const state = location.state || {};
    const payload = state?.availableCourtsPayload;
    const slotFromState = state?.slot;
    const queryClient = useQueryClient();
    const [selectedCourt, setSelectedCourt] = useState(null);
    const [detailsOpen, setDetailsOpen] = useState(false);

    useEffect(() => {
        if (payload) {
            queryClient.prefetchQuery({
                queryKey: ['availableCourts', payload?.courtIds, payload?.type, payload?.startTime, payload?.endTime, payload?.date],
                queryFn: () => Promise.resolve()
            });
        }
    }, [JSON.stringify(payload)]);

    // Ensure co-court booking type
    const finalPayload = useMemo(() => {
        if (!payload) return null;
        return { ...payload, type: 2 };
    }, [JSON.stringify(payload)]);

    const { data: availableData, isLoading, isFetching, refetch } = useGetAvailableCourts(finalPayload);
    const courts = availableData?.result?.data || [];
    const startTime = availableData?.result?.startTime || slotFromState?.slot_start || '';
    const endTime = availableData?.result?.endTime || slotFromState?.slot_end || '';
    const dateText = availableData?.result?.date || payload?.date || '';

    const onFinish = (values) => {
        console.log('Form Values:', values);
    };

    const handleBook = (court) => {
        if (!court?.court_id) return;
        Modal.confirm({
            title: 'Confirm booking',
            content: `Book ${court.court_name} (${court.sports_name}) for ${dayjs(dateText).format('DD MMM YYYY')} ${startTime?.slice(0,5)} - ${endTime?.slice(0,5)}?`,
            okText: 'Confirm',
            cancelText: 'Cancel',
            onOk: async () => {
                try {
                    // TODO: integrate booking API here
                    message.success('Booking created (mock)');
                } catch (e) {
                    message.error('Failed to create booking');
                }
            }
        });
    };
    return (
        <div className="add-Court-Container">
            <div className="add-court-form-section">
                {/* Removed alert section as requested */}
                {/* Header */}
                <div className="add-court-header">
                    <div>
                        <Typography.Title level={4} style={{ margin: 0 }}>Available Court Details</Typography.Title>
                        <Typography.Text type="secondary">
                            {dayjs(dateText).format('ddd, D MMM YYYY')} • {startTime?.slice(0,5)} - {endTime?.slice(0,5)} • {courts.length} court{courts.length !== 1 ? 's' : ''}
                            {selectedCourt ? ` • Selected: ${selectedCourt.court_name}` : ''}
                        </Typography.Text>
                    </div>
                    <div className="book-toolbar">
                        <Button type="primary" disabled={!selectedCourt} onClick={() => selectedCourt && handleBook(selectedCourt)}>Book</Button>
                    </div>
                </div>

                {/* Card grid matching mock */}
                <div className="available-courts-wrap">
                    {isFetching && (
                        <div className="page-loading-container"><span>Loading...</span></div>
                    )}
                    <div className="available-courts-grid">
                        {isLoading ? (
                            <div>Loading available courts...</div>
                        ) : courts.length === 0 ? (
                            <div>No courts found for this slot.</div>
                        ) : (
                            courts.map((c) => (
                                <Card key={`${c.court_id}-${startTime}`} className={`available-card ${selectedCourt?.court_id === c.court_id ? 'selected' : ''}`} style={{ borderRadius: 8 }} onClick={() => setSelectedCourt(c)}>
                                    <Space direction="vertical" size={6} style={{ width: '100%' }}>
                                        <div className="available-card-date">
                                            {dayjs(dateText).format('ddd, D MMM YYYY')}
                                        </div>
                                        <div className="available-card-title">{`${c.court_name}`}</div>
                                        <div className="available-card-subtitle">{`${c.venue_name || ''}`}</div>
                                        <div className="available-meta">{`Sport: ${c.sports_name}`}</div>
                                        <div className="available-time-text">
                                            Timing: {startTime?.slice(0,5)} AM - {endTime?.slice(0,5)} AM
                                        </div>
                                        <div className="available-card-footer">
                                            <Button size="small" onClick={(e) => { e.stopPropagation(); setSelectedCourt(c); setDetailsOpen(true); }}>View details</Button>
                                            <Button size="small" type="primary" onClick={(e) => { e.stopPropagation(); setSelectedCourt(c); handleBook(c); }}>Book</Button>
                                        </div>
                                    </Space>
                                </Card>
                            ))
                        )}
                    </div>
                </div>

                {/* Removed legacy create-court form for a cleaner booking-focused flow */}

                <Modal
                    open={detailsOpen}
                    onCancel={() => setDetailsOpen(false)}
                    title="Court details"
                    footer={[<Button key="close" onClick={() => setDetailsOpen(false)}>Close</Button>]}
                >
                    {selectedCourt ? (
                        <Space direction="vertical" size={8} style={{ width: '100%' }}>
                            <Typography.Text strong>{selectedCourt.court_name}</Typography.Text>
                            <Typography.Text type="secondary">{selectedCourt.venue_name}</Typography.Text>
                            <Typography.Text>Sport: {selectedCourt.sports_name}</Typography.Text>
                            <Typography.Text>Date: {dayjs(dateText).format('ddd, D MMM YYYY')}</Typography.Text>
                            <Typography.Text>Time: {startTime?.slice(0,5)} - {endTime?.slice(0,5)}</Typography.Text>
                        </Space>
                    ) : null}
                </Modal>
            </div>
        </div>
    )
}