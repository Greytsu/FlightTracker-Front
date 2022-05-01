import React from 'react'
import {
  DateTimePickerComponent,
  Inject,
  MaskedDateTime
} from '@syncfusion/ej2-react-calendars'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const DateTimePicker = props => {
  const onChange = args => {
    props.setDate(args.value)
  }
  return (
    <Container>
      <DateTimePickerComponent
        id='datetimepicker'
        placeholder='Selectionnez une date et une heure'
        enable={false}
        format='dd/MM/yyyy hh:mm'
        change={onChange}
        value={props.date}
        // min={new Date('2022-04-29T12:00')}
        max={
          new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDay(),
            new Date().getHours(),
            new Date().getMinutes()
          )
        }
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
