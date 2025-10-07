import React, { useEffect, useState } from "react";
import { Table, Spin, Tag, message } from "antd";
import "../../styelsheets/EventPage/EventList.css";
import { getEventList } from "../../../../services/vendor/eventRun/endpointApi";
import { useFetchVendorVenueList } from "../../../../hooks/vendor/venue/useFetchvendorVenues";

export default function EventListPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    data: venueList,
    isLoading: vendorloading,
    error: vendorError,
  } = useFetchVendorVenueList();

  useEffect(() => {
    if (!vendorloading && venueList) {
      const vendorData =
        venueList.result ||
        venueList.resutl ||
        (Array.isArray(venueList) ? venueList : []);
      if (Array.isArray(vendorData) && vendorData.length > 0) {
        const firstVendor = vendorData[0];
        const vendorId = firstVendor?.vendor_id || firstVendor?.id;
        if (vendorId) fetchEvents(vendorId);
        else message.warning("Vendor ID not found");
      }
    }
    if (vendorError) message.error("Error loading vendor list");
  }, [venueList, vendorloading]);

  const fetchEvents = async (vendorId) => {
    setLoading(true);
    try {
      const response = await getEventList({ vendorId });
      if (response?.status === 200 && Array.isArray(response.result)) {
        const mappedData = response.result.map((event, index) => ({
          key: event.id || index,
          name: event.event_title || "N/A",
          type: "-",
          startDate: event.start_date
            ? new Date(event.start_date).toLocaleDateString()
            : "N/A",
          endDate: event.end_date
            ? new Date(event.end_date).toLocaleDateString()
            : "N/A",
          location: `${event.city || ""}, ${event.state || ""}`,
          calendar: event.event_calendar === 1 ? "One-Time" : "Repetitive",
          status:
            event.status === 1
              ? "Active"
              : event.status === 0
              ? "Inactive"
              : "Unknown",
        }));
        setData(mappedData);
      } else {
        message.warning("No event data found.");
      }
    } catch {
      message.error("Failed to fetch events.");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: "Event Name", dataIndex: "name", key: "name" },
    { title: "Event Type", dataIndex: "type", key: "type" },
    { title: "Start Date", dataIndex: "startDate", key: "startDate" },
    { title: "End Date", dataIndex: "endDate", key: "endDate" },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "Event Calendar", dataIndex: "calendar", key: "calendar" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color =
          status === "Active"
            ? "green"
            : status === "Inactive"
            ? "red"
            : "default";
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  return (
    <div className="event-list-page">
      <div className="event-header">
        <h2>Event Lists</h2>
        <div className="calendar-display">oct 11 - oct 30</div>
      </div>

      {loading || vendorloading ? (
        <Spin size="large" style={{ display: "block", margin: "50px auto" }} />
      ) : (
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 5 }}
          className="event-table"
          scroll={{ x: true }}
          rowKey="key"
        />
      )}
    </div>
  );
}
