/** @jsx jsx */
import React, { useState } from 'react'
import { css, jsx } from '@emotion/core'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Slider,
  Typography,
} from '@material-ui/core'
import { DatePicker } from '@material-ui/pickers'
import moment from 'moment'

import firebase from './Firebase/firebase'

function NewEntry() {
  const [values, setValues] = useState({
    date: moment().format('MMMM Do YY'),
    sleep: 5,
    arms: 5,
    mood: 5,
    computer: 5,
  })

  const handleOnSubmit = (e) => {
    e.preventDefault()
    console.log('Button clicked', values)
    const entry = values
    console.log('entry', entry)
    const ref = firebase.database().ref('entries')
    ref.push(entry)
  }

  const handleValueChange = (e, newValue) => {
    if (e.target.id) {
      setValues({ ...values, [e.target.id]: newValue })
    }
  }

  const handleDateChange = (date) => {
    console.log('date', moment(date).format('MMM Do YY'))
    setValues({ ...values, date: moment(date).format('MMMM Do YY') })
  }

  return (
    <form
      css={css`
        padding: 0 20px;
      `}
      onSubmit={handleOnSubmit}
    >
      <Card
        css={css`
          min-width: 275px;
          max-width: 350px;
          background-color: lavenderblush;
        `}
      >
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Dagsform
          </Typography>
          <DatePicker
            disableFuture
            format="dddd - DD. MMMM"
            margin="normal"
            label="dato"
            id="date"
            onChange={handleDateChange}
            autoOk
            value={values.date}
          />
          <div>
            <Typography id="sleep-slider" gutterBottom>
              Søvn
            </Typography>
            <Slider
              aria-labelledby="sleep-slider"
              valueLabelDisplay="auto"
              id="sleep"
              value={values.sleep}
              step={1}
              min={0}
              max={10}
              onChange={handleValueChange}
            />
          </div>
          <div>
            <Typography id="arms-slider" gutterBottom>
              Arme
            </Typography>
            <Slider
              aria-labelledby="arms-slider"
              valueLabelDisplay="auto"
              id="arms"
              value={values.arms}
              onChange={handleValueChange}
              step={1}
              min={0}
              max={10}
            />
          </div>
          <div>
            <Typography id="mood-slider" gutterBottom>
              Humør
            </Typography>
            <Slider
              aria-labelledby="mood-slider"
              valueLabelDisplay="auto"
              step={1}
              min={0}
              max={10}
              id="mood"
              value={values.mood}
              onChange={handleValueChange}
            />
          </div>
          <div>
            <Typography id="screen-slider" gutterBottom>
              Computer/Telefon
            </Typography>
            <Slider
              aria-labelledby="screen-slider"
              valueLabelDisplay="auto"
              step={1}
              min={0}
              max={10}
              id="computer"
              value={values.computer}
              onChange={handleValueChange}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button type="submit">Gem</Button>
        </CardActions>
      </Card>
    </form>
  )
}

export default NewEntry
