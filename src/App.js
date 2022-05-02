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
import moment from 'moment'

function App() {
  const [markers, setMarkers] = React.useState([])
  // const [country, setCountry] = React.useState(null)
  const [date, setDate] = React.useState(moment().format('yyyy-MM-DD hh:00:00'))
  const [hasMoreDate, setHasMoreDate] = React.useState(true)
  const [page, setPage] = React.useState(0)

  React.useEffect(() => {
    const params = {
      page: page,
      size: 100,
      timestamp: date
    }

    console.log(page)
    console.log(
      queryString.stringifyUrl(
        {
          url: `${process.env.REACT_APP_FLIGHTTRAKER_API_URL}/flightInfo`,
          query: params
        },
        { skipNull: true }
      )
    )

    if (hasMoreDate) {
      axios({
        method: 'GET',
        url: queryString.stringifyUrl(
          {
            url: `${process.env.REACT_APP_FLIGHTTRAKER_API_URL}/flightInfo`,
            query: params
          },
          { skipNull: true }
        )
      })
        .then(response => {
          if (response.status == 200) {
            console.log(response.status)

            setHasMoreDate(!response.data.last)
            page == 0
              ? setMarkers(response.data.content)
              : setMarkers([...markers, ...response.data.content])

            setPage(page + 1)
          } else {
            console.log('error code')
            setMarkers(null)
            setHasMoreDate(false)
          }
        })
        .catch(error => {
          setHasMoreDate(false)
          console.log('error')
        })
    }
  }, [page])

  React.useEffect(() => {
    setHasMoreDate(true)
    setPage(0)
    console.log(date)
  }, [date])

  return (
    <Container>
      <Header></Header>
      <Element>
        <DateTimePicker date={date} setDate={setDate}></DateTimePicker>
        <Map markers={markers} setMarkers={setMarkers}></Map>
      </Element>
      <Element>
        {/* <ComboBox country={country} setCountry={setCountry}></ComboBox> */}
        <Historical historicalData={markers}></Historical>
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
  box-sizing: content-box;
  /* background-color: red;
  border: 2px solid black; */
`

export default App
