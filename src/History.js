import React, { useEffect, useState } from 'react'
import { css } from '@emotion/core'
import { Typography } from '@material-ui/core'
import { ResponsiveLine } from '@nivo/line'
import moment from 'moment'

import firebase from './Firebase/firebase'

export default function History() {
  const [entries, setEntries] = useState()

  // TODO: Extract to function
  const sleepData = {
    id: 'søvn',
    color: 'hsl(350, 70%, 50%)',
    data: [],
  }

  const moodData = {
    id: 'humør',
    color: 'hsl(123, 70%, 50%)',
    data: [],
  }
  const armsData = {
    id: 'arme',
    color: 'hsl(270, 70%, 50%)',
    data: [],
  }
  const computerData = {
    id: 'computer/tlf',
    color: 'hsl(190, 70%, 50%)',
    data: [],
  }

  const serializedEntries =
    entries &&
    Object.values(entries).sort((a, b) =>
      moment(a.date).format('x') > moment(b.date).format('x') ? 1 : -1,
    )

  serializedEntries &&
    serializedEntries.map((entry) => {
      sleepData.data.push({ x: entry.date, y: entry.sleep })
      moodData.data.push({ x: entry.date, y: entry.mood })
      armsData.data.push({ x: entry.date, y: entry.arms })
      computerData.data.push({ x: entry.date, y: entry.computer })
    })

  const data = [sleepData, moodData, armsData, computerData]

  useEffect(() => {
    const ref = firebase.database().ref('/entries')
    ref.on('value', (snapshot) => {
      const state = snapshot.val()
      setEntries(state)
    })
  }, [])

  return (
    <div
      style={{
        height: '300px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h3" gutterBottom>
        Historik
      </Typography>
      <ResponsiveLine
        margin={{ top: 60, bottom: 50, left: 60, right: 110 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: false,
          reverse: false,
        }}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'dato',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'værdi',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        data={data}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        colors={{ scheme: 'nivo' }}
        pointSize={6}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="y"
        pointLabelYOffset={-12}
        enableSlices="x"
      />
    </div>
  )
}
