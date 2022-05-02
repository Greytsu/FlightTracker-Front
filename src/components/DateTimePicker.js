import React from 'react'
import {
  DateTimePickerComponent,
  Inject,
  MaskedDateTime
} from '@syncfusion/ej2-react-calendars'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import moment from 'moment'

const DateTimePicker = props => {
  const onChange = args => {
    const millis = args.value.valueOf()
    const seconds = millis / 1000
    props.setDate(moment.unix(seconds).format('yyyy-MM-DD HH:mm:ss'))
  }

  return (
    <Container>
      <DateTimePickerComponent
        placeholder='Selectionnez une date et une heure'
        enable={false}
        format='dd/MM/yyyy HH:mm'
        timeFormat='HH:mm'
        change={onChange}
        value={moment(props.date).format('DD-MM-yyyy HH:mm')}
        min={moment('2022-04-29 12:00:00').format('yyyy-MM-DD HH:mm:ss')}
        max={moment().format('yyyy-MM-DD HH:00:00')}
        enableMask={true}
      >
        <Inject services={[MaskedDateTime]} />
      </DateTimePickerComponent>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  margin-bottom: 20px;
`

DateTimePicker.PropTypes = {
  date: PropTypes.string,
  setDate: PropTypes.func
}

export default DateTimePicker
