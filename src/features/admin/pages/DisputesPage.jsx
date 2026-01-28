import React from "react";
import { Container, Table, Dropdown } from "react-bootstrap";
import SearchBox from "../../Component/SearchBox";
import ExportFilter from "../../Component/ExportFilter";

const tableData = Array(7).fill({
  name: "Sahil Khan",
  vendorId: "#12548796",
  phone: "+91 9284578663",
  email: "mihirs@gmail.com",
  location: "Hinjewadi,Pune",
  query: "Hi Want to connect sgcjnjxbcgcck",
  status: "Active",
});

function DisputesPage() {
  return (
    <section>
      <Container>
        <SearchBox />
        <div className="p-3 bg-white rounded shadow-sm mt-3">
        <ExportFilter />
          <Table responsive className="mb-0 align-middle">
            <thead className="border-bottom">
              <tr>
                <th className="text-primary fw-medium">Vendor Name</th>
                <th className="text-primary fw-medium">Vendor ID</th>
                <th className="text-primary fw-medium">Phone Number</th>
                <th className="text-primary fw-medium">Email</th>
                <th className="text-primary fw-medium">Location</th>
                <th className="text-primary fw-medium">Queries</th>
                <th className="text-primary fw-medium">Status</th>
              </tr>
            </thead>

            <tbody>
              {tableData.map((item, index) => (
                <tr key={index} className="border-bottom">
                  <td>{item.name}</td>
                  <td>{item.vendorId}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>{item.location}</td>
                  <td className="text-muted small">{item.query}</td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle
                        size="sm"
                        className="bg-primary-subtle text-primary border-0 rounded px-3"
                      >
                        {item.status}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item>Active</Dropdown.Item>
                        <Dropdown.Item>Inactive</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </section>
  );
}

export default DisputesPage;
