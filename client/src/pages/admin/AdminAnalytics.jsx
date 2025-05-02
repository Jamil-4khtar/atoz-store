import React from 'react'
import AnalyticsPageComp from './components/AnalyticsPageComp'
import axios from 'axios'
import socketIOClient from 'socket.io-client'

const firstDateOrderApi = async (signal, firstDate) => {
  const { data } = await axios.get(`/api/orders/analysis/${firstDate}`, {signal})
  return data
}
const secDateOrderApi = async (signal, secDate) => {
  const { data } = await axios.get(`/api/orders/analysis/${secDate}`, {signal})
  return data
}

function AdminAnalytics() {
  return (
    <AnalyticsPageComp
      firstDateOrderApi={firstDateOrderApi}
      secDateOrderApi={secDateOrderApi}
      socketIOClient={socketIOClient}
    />
  )
}

export default AdminAnalytics