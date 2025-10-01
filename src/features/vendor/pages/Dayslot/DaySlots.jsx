import "../../styelsheets/DaySlots.css";
import { Table, Select, DatePicker, Spin, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBookingDetails } from "../../../../services/vendor/DaySlots/endpointApi";
import { useFetchSports } from "../../../../hooks/admin/sport/useFetchSport";
import { fetchVendorVenueList } from "../../../../services/vendor/venueinfo/endpointApi";

const { Option } = Select;

const DaySlots = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [slotData, setSlotData] = useState([]);
  const [filters, setFilters] = useState({
    sportId: null,
    venueId: null,
    date: null,
  });
  const [venuesList, setVenuesList] = useState([]);
  const [venueLoading, setVenueLoading] = useState(false);
  console.log("venuesListvenuesListvenuesListvenuesList", venuesList);

  const { data: sportsList, isLoading: sportLoading } = useFetchSports();

  useEffect(() => {
    const fetchVenues = async () => {
      setVenueLoading(true);
      try {
        const res = await fetchVendorVenueList();
        console.log("API response for venues:", res);

        setVenuesList(res?.resutl || []);
      } catch (error) {
        console.error(" Failed to fetch venues:", error);
      } finally {
        setVenueLoading(false);
      }
    };

    fetchVenues();
  }, []);

  const columns = [
    {
      title: "Time Slot",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Total Courts",
      dataIndex: "totalCourts",
      key: "totalCourts",
      render: (text) => <span className="total-courts">{text}</span>,
    },
    {
      title: "Booked",
      dataIndex: "booked",
      key: "booked",
      render: (text, record) => (
        <Link
          className="booked clickable"
          to={`/vendor/dayslots/booked-details/${record.bookedCourtIds}?date=${
            filters.date
          }&start=${record.time.split(" - ")[0]}&end=${
            record.time.split(" - ")[1]
          }`}
        >
          {text}
        </Link>
      ),
    },

    {
      title: "Available",
      dataIndex: "available",
      key: "available",
      render: (text, record) => (
        <Link
          className="available clickable"
          to={`/vendor/dayslots/available-details/${
            record.availableCourtIds
          }?date=${filters.date}&start=${record.time.split(" - ")[0]}&end=${
            record.time.split(" - ")[1]
          }`}
        >
          {text}
        </Link>
      ),
    },
  ];

  const fetchBookingDetails = async () => {
    if (!filters.sportId || !filters.venueId || !filters.date) {
      console.warn("⚠️ Skipping API call - Filters missing:", filters);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        sportId: filters.sportId,
        venueId: filters.venueId,
        date: filters.date,
      };

      const res = await getBookingDetails(payload);

      const slots = res?.result?.result?.slots || [];

      const tableData = slots.map((slot) => {
        const totalCourts = slot.courts.length;
        const bookedCourts = slot.courts.filter((c) => c.status === "Booked");
        const availableCourts = slot.courts.filter(
          (c) => c.status === "Available"
        );

        return {
          key: slot.courts.map((c) => c.court_id).join("-"), // all ids
          slot_id: slot.slot_id,
          time: `${slot.slot_start} - ${slot.slot_end}`,
          totalCourts,
          booked: bookedCourts.length,
          available: availableCourts.length,
          availableCourtIds: availableCourts.map((c) => c.court_id).join("-"),
          bookedCourtIds: bookedCourts.map((c) => c.booking_id).join("-"),
        };
      });

      setSlotData(tableData);
    } catch (error) {
      console.error(" Failed to fetch booking details:", error);
      message.error("Failed to fetch booking details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookingDetails();
  }, [filters]);

  return (
    <div className="day-slots-container">
      <div className="day-slots-filters">
        <div className="day-slots-selected-box">
          {/* Sport Dropdown */}
          <Select
            placeholder="Select Sport"
            className="filter-select"
            onChange={(val) => setFilters({ ...filters, sportId: val })}
            value={filters.sportId}
            style={{ minWidth: 150 }}
            loading={sportLoading}
          >
            {sportsList?.result?.map((sport) => (
              <Option key={sport.id} value={sport.id}>
                {sport.sports_name}
              </Option>
            ))}
          </Select>

          {/* Venue Dropdown */}
          <Select
            placeholder="Select Venue"
            onChange={(val) => setFilters({ ...filters, venueId: val })}
            value={filters.venueId}
            loading={venueLoading}
          >
            {venuesList.map((venue) => (
              <Option key={venue.venue_id} value={venue.venue_id}>
                {venue.venue_name}
              </Option>
            ))}
          </Select>
        </div>

        {/* Date Picker */}
        <DatePicker
          className="date-picker"
          onChange={(date, dateString) =>
            setFilters({ ...filters, date: dateString })
          }
        />
      </div>

      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={slotData}
          pagination={{ pageSize: 10 }}
          className="day-slots-table"
        />
      </Spin>
    </div>
  );
};

export default DaySlots;
