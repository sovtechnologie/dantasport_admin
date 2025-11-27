import React from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import "../../stylesheet/vendor/Header.css";
import "../../stylesheet/vendor/dashboard.css"

function AllDashboard() {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const path = e.target.value;
    if (path && path !== "dashboard") {
      navigate(path);
    }
  };

  return (
    <>
      <section className='all_dashboards'>
        <div className="row">
          <div className="col-12">
            <Form.Select aria-label="Select Page" onChange={handleChange}>
              <option value="dashboard">Dashboard</option>
              <option value="/vendor/dashboard//turf">Turf Dashboard</option>
              <option value="/">Event Dashboard</option>
              <option value="/">Run Dashboard</option>
              <option value="/three">Gym dashboard</option>
            </Form.Select>
          </div>
        </div>
      </section>
    </>
  );
}

export default AllDashboard;
