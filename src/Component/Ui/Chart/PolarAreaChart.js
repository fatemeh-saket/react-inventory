import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);



const PolarAreaChart = () => {
  const SoldItems = useSelector(state => state.soldProducts.items)

  const SoldData = []
  SoldItems.filter(element => element.statuse === "complete")
    .map((elments) => {
      let indexData = SoldData.findIndex(dd => dd.name === elments.store)
      if (indexData > -1) {
        SoldData.splice(indexData, 1, { name: elments.store, number: SoldData[indexData].number + Number(elments.price) })
      }
      if (indexData === -1) {
        SoldData.splice(SoldData.splice.length, 0, { name: elments.store, number: Number(elments.price) })
      }
    })
  const data = {
    labels: SoldData.map(element => element.name),
    datasets: [
      {
        label: 'قیمت کل',
        data: SoldData.map(element => element.number),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <PolarArea data={data} />
      <section><FormattedMessage id="paymentPerStore"/></section>
    </>
  );
}
export default PolarAreaChart