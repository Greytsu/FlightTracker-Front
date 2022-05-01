import React from 'react'
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent
} from '@syncfusion/ej2-react-grids'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Historical = props => {
  return (
    <Container>
      <GridComponent dataSource={props.historicalData}>
        <ColumnsDirective>
          <ColumnDirective
            field='hex'
            headerText='Hex'
            width='100'
            textAlign='Center'
          />
          <ColumnDirective
            field='reg_number'
            headerText='Reg Number'
            width='100'
            textAlign='Center'
          />
          <ColumnDirective
            field='lat'
            headerText='Latitude'
            width='100'
            textAlign='Center'
          />
          <ColumnDirective
            field='lng'
            headerText='Longitude'
            width='100'
            textAlign='Center'
          />
          <ColumnDirective
            field='status'
            headerText='Status'
            width='100'
            textAlign='Center'
          />
        </ColumnsDirective>
      </GridComponent>
    </Container>
  )
}

const Container = styled.div`
  box-sizing: content-box;
`
Historical.propTypes = {
  historicalData: PropTypes.object,
  setHistoricalData: PropTypes.func
}

export default Historical
