/** @jsx jsx */
/* @jsxFrag React.Fragment */
import React, { useState } from 'react'
import { css, jsx } from '@emotion/core'
import styled from '@emotion/styled'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Slider,
  Snackbar,
  Typography,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { DatePicker } from '@material-ui/pickers'
import moment from 'moment'

import firebase from './Firebase/firebase'

const SliderWrapper = styled.div`
  margin-bottom: 2rem;
`

function NewEntry() {
  const [date, setDate] = useState(new Date())
  const [sleep, setSleep] = useState(5)
  const [arms, setArms] = useState(5)
  const [mood, setMood] = useState(5)
  const [computer, setComputer] = useState(5)
  const [open, setOpen] = useState(false)

  const handleOnSubmit = (e) => {
    e.preventDefault()
    const entry = {
      date: moment(date).format('MMMM Do YY'),
      sleep,
      arms,
      mood,
      computer,
    }
    const ref = firebase.database().ref('entries')
    ref.push(entry)
    setOpen(true)
  }

  const handleClose = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <>
      <form
        css={css`
          padding: 0 20px;
        `}
        onSubmit={handleOnSubmit}
      >
        <Card
          css={css`
            min-width: 275px;
            max-width: 100vw;
            background-color: lavenderblush;
            padding: 0 30px;
            margin-bottom: 2rem;
          `}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Dagsform
            </Typography>
            <SliderWrapper>
              <DatePicker
                disableFuture
                format="dddd - DD. MMMM"
                margin="normal"
                label="dato"
                id="date"
                onChange={setDate}
                autoOk
                value={date}
              />
            </SliderWrapper>
            <SliderWrapper>
              <Typography id="sleep-slider" gutterBottom>
                Søvn
              </Typography>
              <Slider
                aria-labelledby="sleep-slider"
                valueLabelDisplay="auto"
                id="sleep"
                value={sleep}
                step={1}
                min={0}
                max={10}
                onChange={(e, newValue) => setSleep(newValue)}
                marks={goodBadMarks}
              />
            </SliderWrapper>
            <SliderWrapper>
              <Typography id="arms-slider" gutterBottom>
                Arme
              </Typography>
              <Slider
                aria-labelledby="arms-slider"
                valueLabelDisplay="auto"
                id="arms"
                value={arms}
                onChange={(e, newValue) => setArms(newValue)}
                step={1}
                min={0}
                max={10}
                marks={goodBadMarks}
              />
            </SliderWrapper>
            <SliderWrapper>
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
                value={mood}
                onChange={(e, newValue) => setMood(newValue)}
                marks={goodBadMarks}
              />
            </SliderWrapper>
            <SliderWrapper>
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
                value={computer}
                onChange={(e, newValue) => setComputer(newValue)}
                marks={goodBadMarks}
              />
            </SliderWrapper>
          </CardContent>
          <CardActions>
            <Button type="submit">Gem</Button>
          </CardActions>
        </Card>
      </form>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Dag gemt!"
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </>
  )
}

const goodBadMarks = [
  {
    value: 0,
    label: 'Dårlig/lidt',
  },
  {
    value: 10,
    label: 'God/meget',
  },
]

export default NewEntry
