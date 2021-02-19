import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Line } from 'react-chartjs-2'
import 'chartjs-plugin-datalabels'
const ChartContainer = styled.div``

const Chart = (props) => {
  const [chartState, setChartState] = useState({})
  const areaData = useSelector((state) => state.data.areaData)
  const dataTitle = useSelector((state) => state.data.dataTitle)
  // Filters selected data.
  const filteredAreaData = areaData.filter((item) => item.name === dataTitle)
  const slice = useSelector((state) => state.data.slice)
  const [windowWidth, setWindowWith] = useState(window.innerWidth)

  useEffect(() => {
    // Filtering the data according to user selection.
    let data = []
    let labels = []
    if (filteredAreaData.length > 0) {
      data = filteredAreaData[0].data.map((dt) => dt.score).slice(slice)
      labels = filteredAreaData[0].data.map((dt) => dt.date).slice(slice)
    }

    // Needed to use this for linear gradient background.
    const ctx = document.getElementById('canvas').getContext('2d')
    const gradient = ctx.createLinearGradient(0, 0, 0, 400)
    gradient.addColorStop(0, '#0071C5')
    gradient.addColorStop(1, '#fff')
    setChartState({
      labels: labels,
      datasets: [
        {
          // Data point radius is responsive.
          pointRadius: windowWidth / 180 > 8 ? 8 : windowWidth / 180,
          pointHoverRadius: windowWidth / 180 > 8 ? 8 : windowWidth / 180,

          lineTension: 0.4,
          borderColor: '#0071C5',
          backgroundColor: gradient,
          pointBackgroundColor: '#0071C5',
          pointBorderColor: '#fff',
          borderWidth: windowWidth / 530 > 3 ? 3 : windowWidth / 530,
          data: data,
        },
      ],
    })

    const handleResize = () => {
      setWindowWith(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [slice, windowWidth])

  return (
    <ChartContainer>
      <Line
        id='canvas'
        data={chartState}
        options={{
          layout: {
            padding: {
              top: windowWidth > 720 ? 50 : 0,
            },
          },
          legend: {
            display: false,
          },
          plugins: {
            datalabels: {
              anchor: 'end',
              align: 'top',
              formatter: (value) => `${value}%`,
              font: {
                size: 12,
              },
            },
          },
          scales: {
            yAxes: [
              {
                display: false,
              },
            ],
            xAxes: [
              {
                gridLines: {
                  drawOnChartArea: false,
                },
              },
            ],
          },
        }}
      />
    </ChartContainer>
  )
}

export default Chart
