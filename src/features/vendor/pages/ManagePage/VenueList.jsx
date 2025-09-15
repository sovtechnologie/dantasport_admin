import { Button, Table, Modal } from "antd";
import "../../styelsheets/Manage/venueList.css";
import { EditOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
import { useFetchVendorVenueList } from "../../../../hooks/vendor/venue/useFetchvendorVenues";


export default function VenueList() {
    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const navigate = useNavigate();
    const { data: venueList, isLoading, error } = useFetchVendorVenueList();
    const { Option } = Select;

    // Map backend response to table data format
    useEffect(() => {
        if (venueList && venueList.resutl) {
            const mappedData = venueList.resutl.map((vendor, index) => ({
                key: vendor.id || index,
                vendorId: vendor.vendor_id || "N/A",
                venueId: vendor.venue_id || "N/A",
                name: vendor.full_name || "N/A",
                venueName: vendor.venue_name || "N/A",
                city: vendor.city || "N/A",
                state: vendor.state || "N/A",
                fullAddress: vendor.full_address || "N/A",
                status: vendor.status === 1 ? "Active" : "Inactive",
            }));
            setData(mappedData);
        }
    }
        , [venueList]);

    const handleStatusChange = (record, newStatus) => {
        // Implement status change logic if needed
        setModalVisible(true);
    };
    const handleModalCancel = () => {
        setModalVisible(false);
    };




    const columns = [
        { title: "Vendor Name", dataIndex: "name", key: "name" },
        { title: "Venue Name", dataIndex: "venueName", key: "venueName" },
        { title: "VenueId", dataIndex: "venueId", key: "venueId" },
        {
            title: "Location",
            key: "location",
            render: (_, record) => `${record.city}, ${record.state}`,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (text, record) => (
                <Select
                    value={text}
                    onChange={(val) => handleStatusChange(record, val)}
                    className={`status-select ${text === 'Active' ? 'status-active' : 'status-inactive'}`}
                    style={{ width: 100 }}
                >
                    <Option value="Active">Active</Option>
                    <Option value="Inactive">Inactive</Option>
                </Select>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Button
                    type="text"
                    icon={<EditOutlined style={{ color: "#1163C7" }} />}
                    onClick={() => navigate(`/vendor/manage/editvenue/${record.venueId}`)}
                />
            ),
        },
    ];

    return (
        <div className="venue-list-container">
            <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 10 }}
                rowKey="key"
                scroll={{ x: true }}
            />
            <Modal
                open={modalVisible}
                title="Change Status"
                onOk={() => setModalVisible(false)}
                onCancel={handleModalCancel}
                okText="OK"
                cancelText="Cancel"
            >
                <p>Contact your administrator.</p>
            </Modal>

        </div>
    );
}
