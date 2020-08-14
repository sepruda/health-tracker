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

function NewEntry() {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const handleOnClick = (e) => {
    e.preventDefault()
    console.log('Button clicked')
  }

  return (
    <div
      css={css`
        padding: 0 20px;
      `}
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
            id="date-picker"
            value={selectedDate}
            onChange={handleDateChange}
          />
          <div>
            <Typography id="sleep-slider" gutterBottom>
              Søvn
            </Typography>
            <Slider
              defaultValue={5}
              aria-labelledby="sleep-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={0}
              max={10}
            />
          </div>
          <div>
            <Typography id="arms-slider" gutterBottom>
              Arme
            </Typography>
            <Slider
              defaultValue={5}
              aria-labelledby="arms-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={0}
              max={10}
            />
          </div>
          <div>
            <Typography id="mood-slider" gutterBottom>
              Humør
            </Typography>
            <Slider
              defaultValue={5}
              aria-labelledby="mood-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={0}
              max={10}
            />
          </div>
          <div>
            <Typography id="screen-slider" gutterBottom>
              Computer/Telefon
            </Typography>
            <Slider
              defaultValue={5}
              aria-labelledby="screen-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={0}
              max={10}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button onClick={handleOnClick}>Gem</Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default NewEntry
