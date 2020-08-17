import React from 'react'
import MomentUtils from '@date-io/moment'
import { StylesProvider } from '@material-ui/core'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import moment from 'moment'

import 'moment/locale/da'

import History from './History'
import NewEntry from './NewEntry'

moment.locales('da')

function App() {
  return (
    <StylesProvider injectFirst>
      <MuiPickersUtilsProvider utils={MomentUtils} locale="da">
        <NewEntry />
        <History />
      </MuiPickersUtilsProvider>
    </StylesProvider>
  )
}

export default App
