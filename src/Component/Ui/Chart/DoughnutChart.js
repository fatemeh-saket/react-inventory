import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart(props) {
  const ProductData = useSelector(state => state.products.items)
  const ProductByNumber = ProductData.filter(element => element.counterUnit === "number")
  const ProductByWeight = ProductData.filter(element => element.counterUnit === "weight")

  const data = {
    labels: props.counterUnit==="number"?ProductByNumber.map(element=>element.title):ProductByWeight.map(element=>element.title),
    datasets: [
      {
        label: 'موجودی',
        data:  props.counterUnit==="number"?ProductByNumber.map(element=>element.totalNumber):ProductByWeight.map(element=>element.weight),
        backgroundColor: [
          'rgba(54, 162, 235, 0.4)',
          'rgba(255, 99, 132, 0.4)',
          'rgb(115, 102, 231,0.4)',
          'rgba(75, 192, 192, 0.4)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgb(115, 102, 231, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div >
      <Doughnut data={data} />
      <section style={{ marginTop: ".75rem" }}>{props.title}</section>

    </div>
  );
}
export default DoughnutChart
