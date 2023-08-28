import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
      color: "#ddd"
    },
    CategoryScale: {
      color: "red"
    }
  },
};


function BarChart() {
  const SoldItems = useSelector(state => state.soldProducts.items)
  let sellTimeArray = SoldItems.map(element => element.time.split("/"))
  let sellMonth = []
  let uniqSellMonth = []
  let label = []
  let soldData = {
    store1: [0, 0, 0, 0, 0],
    store2: [0, 0, 0, 0, 0],
    store3: [0, 0, 0, 0, 0],
    store4: [0, 0, 0, 0, 0]
  }
  let sum = 0

  //**** find months that sell something */
  sellTimeArray.map(e => {
    sellMonth.splice(sellMonth.length, 0, e[1])
  }
  );

  sellMonth.forEach((element) => {
    if (!uniqSellMonth.includes(element)) {
      uniqSellMonth.push(element);
    }
  });
  //**** Sales months in Shamsi  */
  uniqSellMonth.map(element => {

    switch (element) {
      case "۱":
        label.push("فروردین")
        break;
      case "۲":
        label.push("اردیبهشت")
        break;
      case "۳":
        label.push("خرداد")
        break;
      case "۴":
        label.push("تیر")
        break;
      case "۵":
        label.push("مرداد")
        break;
      case "۶":
        label.push("شهریور")
        break;
      case "۷":
        label.push("مهر")
        break;
      case "۸":
        label.push("آبان")
        break;
      case "۹":
        label.push("آذر")
        break;
      case "۱۰":
        label.push("دی")
        break;
      case "۱۱":
        label.push("بهمن")
        break;
      case "۱۲":
        label.push("اسفند")
        break;
    }
  })
  uniqSellMonth.map((element, uniqIndex) => {
    sum = 0
    sellMonth.map((e, index) => {
      if (element === e) {
        ['فروشگاه 1', 'فروشگاه 2', 'فروشگاه 3', 'فروشگاه 4'].map(elements => {
          if (SoldItems[index].store === elements) {

            if (elements === 'فروشگاه 1') {
              sum = Number(SoldItems[index].price) + Number(soldData.store1[uniqIndex])
              soldData.store1.splice(uniqIndex, 1, sum)
            }
            if (elements === 'فروشگاه 2') {
              sum = Number(SoldItems[index].price) + Number(soldData.store2[uniqIndex])
              soldData.store2.splice(uniqIndex, 1, sum)
            }
            if (elements === 'فروشگاه 3') {
              sum = Number(SoldItems[index].price) + Number(soldData.store3[uniqIndex])
              soldData.store3.splice(uniqIndex, 1, sum)
            }
            if (elements === 'فروشگاه 4') {
              sum = Number(SoldItems[index].price) + Number(soldData.store4[uniqIndex])
              soldData.store4.splice(uniqIndex, 1, sum)
            }
          }
          sum = 0
        }
        )
      }

    })

  })

  const labels = label;

  const data = {
    labels,
    datasets: [
      {
        label: "فروشگاه 1",
        data: soldData.store1,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: "فروشگاه 2",
        data: soldData.store2,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: "فروشگاه 3",
        data: soldData.store3,
        backgroundColor: 'rgb(159, 83, 244,0.5)',
      },
      {
        label: "فروشگاه 4",
        data: soldData.store4,
        backgroundColor: 'rgb(48, 193, 219,0.5)',
      }
    ],
  };

  return (
    <>
      <Bar options={options} data={data} />
      <section> <FormattedMessage id="priceStorePermonth"/> </section>
    </>
  );
}
export default BarChart