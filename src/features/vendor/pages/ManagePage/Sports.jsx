import "../../styelsheets/Manage/Sports.css";
import { useNavigate } from "react-router-dom";
import { Table, Button, Select, Tag } from 'antd';
import { useFetchVenueSport } from "../../../../hooks/vendor/sport/useFetchVenueSport";
import { useFetchVendorVenueList } from "../../../../hooks/vendor/venue/useFetchvendorVenues";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { EditOutlined } from '@ant-design/icons';
import moment from "moment";



const { Option } = Select;




const SportsPage = () => {
  const id = useSelector((state) => state.auth.user.id);
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const navigate = useNavigate();
  const { data: venueList, loading: venueLoading, error: venueError } = useFetchVendorVenueList();
  const { data: sportsData, loading: sportLoading, error } = useFetchVenueSport({ vendorId: id, venueId: selectedVenueId });

  useEffect(() => {
    if (venueList?.resutl?.length && !selectedVenueId) {
      setSelectedVenueId(venueList.resutl[0].venue_id);
    }
  }, [venueList, selectedVenueId]);


  const handleSport = () => {
    navigate('/vendor/manage/addsport');
  }

  // map API sports -> table format
  const tableData = sportsData?.result?.map((sport) => ({
    key: sport.id,
    venueId: sport.venue_id,
    sport: sport.sports_name,
    description: sport.description,
    slotsDuration: `${sport.slots_duration} min`,
    timing: `${moment(sport.from_time, "HH:mm:ss").format("hh:mm A")} - ${moment(
      sport.end_time,
      "HH:mm:ss"
    ).format("hh:mm A")}`,
    bookingDuration: `${sport.minimum_booking_duration} min` || "N/A",
    courts: sport.court_count,
    status: sport.status === 1 ? "Active" : "Inactive",
  }));

  const columns = [
    {
      title: 'Sports',
      dataIndex: 'sport',
      key: 'sport',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Slots Duration',
      dataIndex: 'slotsDuration',
      key: 'slotsDuration',
    },
    {
      title: 'Timing',
      dataIndex: 'timing',
      key: 'timing',
    },
    {
      title: 'Booking Duration',
      dataIndex: 'bookingDuration',
      key: 'bookingDuration',
    },
    {
      title: 'No of Courts',
      dataIndex: 'courts',
      key: 'courts',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color="green">{status}</Tag>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          type="text"
          icon={<EditOutlined style={{ color: "#1163C7" }} />}
          onClick={() => navigate(`/vendor/manage/editsport/${record.key}`)}
        />
      ),
    },
  ];

  return (
    // <Spin spinning={sportLoading} size="Large" >
    <div className="sports-page">
      <div className="sports-header">
        <div className="sports-controls">
          <Select
            placeholder="Select Venue"
            className="venue-select"
            loading={venueLoading}
            onChange={(value) => setSelectedVenueId(value)}
            style={{ width: 250 }}
            value={selectedVenueId || venueList?.resutl?.[0]?.venue_id}
          >
            {venueList?.resutl?.map((venue) => (
              <Option key={venue.venue_id} value={venue.venue_id}>
                {venue.venue_name}
              </Option>
            ))}
          </Select>
          <Button type="primary" className="add-sport-btn" onClick={handleSport}>+ ADD SPORT</Button>
        </div>
      </div>
      <div className="sports-table">
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
    // </Spin>
  );
};

export default SportsPage;
