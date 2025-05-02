import React, { useEffect, useState } from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import AdminLinks from '../../../components/admin/AdminLinks'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function AnalyticsPageComp({ firstDateOrderApi, secDateOrderApi, socketIOClient }) {
  const [firstDateToCompare, setFirstDateToCompare] = useState(new Date().toISOString().substring(0, 10));
  // previousDay
  var previousDay = new Date().setDate(new Date().getDate() - 1);
  const [secDateToCompare, setSecDateToCompare] = useState(new Date(previousDay).toISOString().substring(0, 10));

  const [dataForFirstSet, setDataForFirstSet] = useState([])
  const [dataForSecSet, setDataForSecSet] = useState([])


  useEffect(() => {
    const socket = socketIOClient();
    let today = new Date().toDateString();

    const handler = (newOrder) => {
      // Validate incoming order
      if (!newOrder?.orderTotal?.cartSubTotal) {
        console.error('Invalid order data received');
        return;
      }

      const orderDate = new Date(newOrder.createdAt).toLocaleString("en-US", {
        hour: "numeric",
        hour12: true,
        timeZone: "UTC"
      });

      const today = new Date().toDateString();
      const orderDateString = new Date(newOrder.createdAt).toDateString();

      if (orderDateString === today) {
        if (today === new Date(firstDateToCompare).toDateString()) {
          setDataForFirstSet((prev) => {
            // Handle empty array case
            if (prev.length === 0) {
              return [{
                name: orderDate,
                [firstDateToCompare]: newOrder.orderTotal.cartSubTotal
              }];
            }

            const lastEntry = prev[prev.length - 1];

            // Update existing hour
            if (lastEntry.name === orderDate) {
              const updatedData = [...prev];
              updatedData[prev.length - 1] = {
                ...lastEntry,
                [firstDateToCompare]: lastEntry[firstDateToCompare] + newOrder.orderTotal.cartSubTotal
              };
              return updatedData;
            }

            // Add new hour entry
            return [...prev, {
              name: orderDate,
              [firstDateToCompare]: lastEntry[firstDateToCompare] + newOrder.orderTotal.cartSubTotal
            }];
          });
        }
        else if (today === new Date(secDateToCompare).toDateString()) {
          setDataForSecSet((prev) => {
            if (prev.length === 0) {
              return [{
                name: orderDate,
                [secDateToCompare]: newOrder.orderTotal.cartSubTotal
              }];
            }

            const lastEntry = prev[prev.length - 1];

            if (lastEntry.name === orderDate) {
              const updatedData = [...prev];
              updatedData[prev.length - 1] = {
                ...lastEntry,
                [secDateToCompare]: lastEntry[secDateToCompare] + newOrder.orderTotal.cartSubTotal
              };
              return updatedData;
            }

            return [...prev, {
              name: orderDate,
              [secDateToCompare]: lastEntry[secDateToCompare] + newOrder.orderTotal.cartSubTotal
            }];
          });
        }
      }
    }
    socket.on("newOrder", handler)


    return () => {
      socket.off("newOrder", handler);
      socket.disconnect();
    }

  }, [firstDateToCompare, secDateToCompare])

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    // first
    firstDateOrderApi(signal, firstDateToCompare)
      .then((res) => {
        let orderSum = 0;
        const orders = res.orders.map(order => {
          orderSum += order.orderTotal.cartSubTotal;
          var date = new Date(order.createdAt).toLocaleString("en-US", {
            hour: "numeric", hour12: true, timeZone: "UTC"
          });
          return { name: date, [firstDateToCompare]: orderSum }
        })
        setDataForFirstSet(orders)
      })
      .catch((err) => {
        console.log(err.response?.data?.error)
      });

    // second
    secDateOrderApi(signal, secDateToCompare)
      .then((res) => {
        let orderSum = 0;
        const orders = res.orders.map(order => {
          orderSum += order.orderTotal.cartSubTotal;
          var date = new Date(order.createdAt).toLocaleString("en-US", {
            hour: "numeric", hour12: true, timeZone: "UTC"
          });
          return { name: date, [secDateToCompare]: orderSum }
        })
        setDataForSecSet(orders)
      })
      .catch((err) => {
        console.log(err.response?.data?.error)
      });

    return () => controller.abort()

  }, [firstDateToCompare, secDateToCompare]);

  const firstDateHandler = (e) => {
    setFirstDateToCompare(e.target.value);
  }

  const secDateHandler = (e) => {
    setSecDateToCompare(e.target.value);
  }

  const mergeDataSets = () => {
    const mergedData = [];
    const map = new Map();

    dataForFirstSet.forEach(item => {
      map.set(item.name, {
        name: item.name,
        [firstDateToCompare]: item[firstDateToCompare]
      });
    });

    dataForSecSet.forEach(item => {
      if (map.has(item.name)) {
        map.get(item.name)[secDateToCompare] = item[secDateToCompare];
      } else {
        map.set(item.name, {
          name: item.name,
          [secDateToCompare]: item[secDateToCompare]
        });
      }
    });

    return Array.from(map.values());
  };

  return (
    <Row className="m-5">
      {/* {console.log(mergeDataSets())} */}
      <Col md={2}>
        <AdminLinks />
      </Col>
      <Col md={10}>
        <h1>Black Friday Cumulative Revenue {firstDateToCompare} VS {secDateToCompare}</h1>
        <Form.Group controlId="firstDateToCompare">
          <Form.Label>Select First Date To Compare</Form.Label>
          <Form.Control
            type="date"
            name="firstDateToCompare"
            placeholder="First Date To Compare"
            onChange={firstDateHandler}
            defaultValue={firstDateToCompare}
          />
        </Form.Group>
        <br />
        <Form.Group controlId="secondDateToCompare">
          <Form.Label>Select Second Date To Compare</Form.Label>
          <Form.Control
            onChange={secDateHandler}
            defaultValue={secDateToCompare}
            type="date"
            name="secondDateToCompare"
            placeholder="Second Date To Compare"
          />
        </Form.Group>
        <div style={{ width: '100%', height: '500px', marginTop: '20px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={mergeDataSets()}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 65
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={60}
                interval={0}
                tick={{ fontSize: 12 }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={firstDateToCompare}
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey={secDateToCompare}
                stroke="#82ca9d"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Col>
    </Row>
  );
}

export default AnalyticsPageComp