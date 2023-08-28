import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart(props) {

  const SoldItems = useSelector(state => state.soldProducts.items)


  //** تعداد */
  let soldNumberData= []
  SoldItems.filter(element => element.counterUnit === "number")
    .map((elments) => {
      let indexData = soldNumberData.findIndex(dd => dd.name === elments.title)
      if (indexData > -1) {
        soldNumberData.splice(indexData, 1, { name: elments.title, amount: Number(soldNumberData[indexData].amount) + Number(elments.totalAmount) })
      }
      if (indexData === -1) {
        soldNumberData.splice(soldNumberData.splice.length, 0, { name: elments.title, amount: elments.totalAmount })
      }
    })

  //** وزن */
  let soldWeightData = []
  SoldItems.filter(element => element.counterUnit === "weight")
    .map((elments) => {
      let indexData = soldWeightData.findIndex(dd => dd.name === elments.title)
      if (indexData > -1) {
        soldWeightData.splice(indexData, 1, { name: elments.title, amount: Number(soldWeightData[indexData].amount) + Number(elments.totalAmount) })
      }
      if (indexData === -1) {
        soldWeightData.splice(soldWeightData.splice.length, 0, { name: elments.title, amount: elments.totalAmount })
      }

    })
  console.log("ddd", soldWeightData, soldNumberData)

  const chartData = props.counterUnit === "number" ? soldNumberData: soldWeightData
  const data = {
    labels: chartData.map(element => element.name),
    datasets: [
      {
        label: 'تعداد سفارش',
        data: chartData.map(element => element.amount),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <Pie data={data} />
      <section>{props.title}</section>

    </>
  );
}
export default PieChart