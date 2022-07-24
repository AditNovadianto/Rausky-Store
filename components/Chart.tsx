import { Chart as ReactChart, ChartProps } from 'react-chartjs-2'
import 'chart.js/auto'

interface Props extends ChartProps {}

const Chart = ({ ...props }: Props) => {
  return (
    <ReactChart
      options={{
        responsive: true,
        font: {
          family: 'Inter',
        },
        plugins: {
          legend: {
            position: 'top',
          },
        },
      }}
      {...props}
    />
  )
}

export default Chart
