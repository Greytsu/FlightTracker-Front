import React from 'react'
import './App.css'
import Header from './components/Header'
import Map from './components/Map'
import Historical from './components/Historical'
import styled from 'styled-components'
import ComboBox from './components/ComboBox'
import DateTimePicker from './components/DateTimePicker'
import axios from 'axios'
import queryString from 'query-string'

const flights = [
  {
    hex: '142584',
    reg_number: 'RA-09604',
    lat: 45.58,
    lng: 51.47,
    status: 'en-route'
  },
  {
    hex: '150644',
    reg_number: 'RA-67140',
    lat: 57.6,
    lng: 63.2,
    status: 'en-route'
  },
  {
    hex: '150655',
    reg_number: 'RA-67157',
    lat: 55.5,
    lng: 57.61,
    status: 'en-route'
  },
  {
    hex: '152001',
    reg_number: 'RA-73729',
    lat: 56.38,
    lng: 85.2,
    alt: 0,
    status: 'en-route'
  }
]

function App() {
  const url = `http://localhost:8080/flightTracker/api/v1/flightInfo`
  const [markers, setMarkers] = React.useState([])
  const [historicalData, setHistoricalData] = React.useState([])
  const [country, setCountry] = React.useState(null)
  const [coordonates, setCoordonates] = React.useState({
    ne_lat: 90,
    ne_lng: 180,
    sw_lat: -90,
    sw_lng: -180
  })
  console.log(coordonates)
  const [date, setDate] = React.useState(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDay(),
      new Date().getHours()
    )
  )

  React.useEffect(() => {
    const params = {
      page: 0,
      size: 100,
      ne_lat: coordonates.ne_lat,
      ne_lng: coordonates.ne_lng,
      sw_lat: coordonates.sw_lat,
      sw_lng: coordonates.sw_lng,
      updatedAt: date.valueOf()
    }

    axios({
      method: 'GET',
      url: queryString.stringifyUrl(
        { url: url, query: params },
        { skipNull: true }
      )
    }).then(response => {
      response.status === 200
        ? setMarkers(response.data.content)
        : setMarkers(null)
    })
  }, [coordonates, date])

  React.useEffect(() => {
    const params = {
      page: 0,
      size: 100,
      country: country
    }
    console.log()
    console.log('country - ' + country)
    axios({
      // method: 'GET',
      // url: queryString.stringifyUrl(
      //   { url: url, query: params },
      //   { skipNull: true }
      // )
    }).then(response => {
      response.status === 200
        ? setHistoricalData(response.data.content)
        : setHistoricalData(null)
    })
    country
      ? console.log('stringify country') /** stringify country */
      : console.log('historical without params') /** without params */
  }, [country])
  return (
    <Container>
      <Header></Header>
      <Element>
        <DateTimePicker date={date} setDate={setDate}></DateTimePicker>
        <Map
          coordonates={coordonates}
          setCoordonates={setCoordonates}
          markers={markers}
          setMarkers={setMarkers}
        ></Map>
      </Element>
      <Element>
        <ComboBox country={country} setCountry={setCountry}></ComboBox>
        <Historical
          historicalData={historicalData}
          setHistoricalData={setHistoricalData}
        ></Historical>
      </Element>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-evenly;
`

const Element = styled.div`
  width: 48%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 300px;
  margin-top: 10px;
  margin-bottom: 10px;
  /* background-color: red;
  border: 2px solid black; */
`

const Line = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`

export default App
