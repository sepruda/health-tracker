import React from 'react'
import MomentUtils from '@date-io/moment'
import styled from '@emotion/styled'
import { StylesProvider } from '@material-ui/core'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import moment from 'moment'

import 'moment/locale/da'

import History from './History'
import NewEntry from './NewEntry'

moment.locales('da')

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* height: 100vh;
  width: 100vw; */
`

function App() {
  return (
    <StylesProvider injectFirst>
      <MuiPickersUtilsProvider utils={MomentUtils} locale="da">
        <Wrapper>
          <NewEntry />
          <History />
        </Wrapper>
      </MuiPickersUtilsProvider>
    </StylesProvider>
  )
}

export default App
