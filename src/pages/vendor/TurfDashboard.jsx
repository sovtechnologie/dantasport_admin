import React from 'react'
import { Container } from 'react-bootstrap'
import DateExportBar from './DateExportBar'
import SalesChart from './SalesChart '
import DashboardCards from './DashboardCards'
import DashboardStats from './DashboardStats'
import DashboardTabs from './DashboardTabs'
import CouponUsageReport from './CouponUsageReport '
import SlotUtilizationHeatmap from './SlotUtilizationHeatmap'

function TurfDashboard() {

  
  return (
    <>
      <section>
        <DateExportBar />
        <DashboardCards />
        <SalesChart />
        <DashboardStats />
        <DashboardTabs />
        <CouponUsageReport />
        <SlotUtilizationHeatmap />
      </section>
    </>
  )
}

export default TurfDashboard
