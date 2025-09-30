import "../../styelsheets/Manage/Court.css";
import { useNavigate } from "react-router-dom";

// SportsCourtPage.jsx
import { Table, Button, Select, Pagination } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useFetchVendorVenueList } from "../../../../hooks/vendor/venue/useFetchvendorVenues";
import { useFetchVenueCourt } from "../../../../hooks/vendor/court/useFetchVenueCourt";

const Court = () => {
  const id = useSelector((state) => state.auth.user.id);
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const navigate = useNavigate();
  const {
    data: venueList,
    loading: venueLoading,
    error: venueError,
  } = useFetchVendorVenueList();
  const {
    data: courtlist,
    loading: courtloading,
    error: courtError,
  } = useFetchVenueCourt({ vendorId: id, venueId: selectedVenueId });
  const venueCourtdata = courtlist?.result;
  console.log("venueCourt", venueCourtdata);

  const handleAddCourt = () => {
    navigate("/vendor/manage/addcourt");
  };

  useEffect(() => {
    if (venueList?.resutl?.length && !selectedVenueId) {
      setSelectedVenueId(venueList.resutl[0].venue_id);
    }
  }, [venueList, selectedVenueId]);

  const dataSource = venueCourtdata?.map((court) => ({
    key: court?.court_id,
    venue: court?.venue_name,
    court: court?.court_name,
    sport: court?.sports_name,
    courId: court?.court_id,
    courtName: court?.court_name,
  }));

  const handleEdit = (record) => {
    navigate(`/vendor/manage/editcourt/${record.courId}`);
  };

  const columns = [
    {
      title: "Venue Name",
      dataIndex: "venue",
      key: "venue",
    },
    {
      title: "Court Name",
      dataIndex: "court",
      key: "court",
    },
    {
      title: "Sports Name",
      dataIndex: "sport",
      key: "sport",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <EditOutlined
          style={{ cursor: "pointer", fontSize: "18px", color: "#1890ff" }}
          onClick={() => handleEdit(record)}
        />
      ),
    },
  ];

  return (
    <div className="court-table-container">
      <div className="court-title-bar">
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
        <Button type="primary" className="add-btn" onClick={handleAddCourt}>
          + Add Court
        </Button>
      </div>

      <Table
        className="court-table"
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 7 }}
      />
    </div>
  );
};

export default Court;
