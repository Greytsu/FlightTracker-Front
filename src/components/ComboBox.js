import React from 'react'
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns'
import styled from 'styled-components'
import CountryJson from './../asset/country.json'
import PropTypes from 'prop-types'

const ComboBox = props => {
  const fields = { text: 'name', value: 'code' }
  const onChange = args => {
    props.setCountry(args.value)
  }
  return (
    <Container>
      <ComboBoxComponent
        placeholder='Selectionnez un pays'
        dataSource={CountryJson.data}
        fields={fields}
        change={onChange}
        value={props.country}
      ></ComboBoxComponent>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  margin-bottom: 20px;
`

ComboBox.propsTypes = {
  country: PropTypes.object,
  setCountry: PropTypes.func
}

export default ComboBox
