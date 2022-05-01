import React from 'react'
import styled from 'styled-components'

const Header = () => {
  return (
    <Container>
      <Title>Flight tracker</Title>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 10vh;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  border-bottom: 0.2px solid #000000;
  box-shadow: 0.3px 0.3px 0.3px 0.3px #000000;
`

const Title = styled.h1`
  font-family: Times New Roman;
  color: #000000;
  margin: 20px;
`

export default Header
