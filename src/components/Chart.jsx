import ReactApexChart from 'react-apexcharts';

const Chart = () => {
  const series = [
    {
      name: 'Price',
      data: [
        { x: new Date('2025-11-23').getTime(), y: 8200 },
        { x: new Date('2025-11-24').getTime(), y: 8400 },
        { x: new Date('2025-11-25').getTime(), y: 8300 },
        { x: new Date('2025-11-26').getTime(), y: 8700 },
        { x: new Date('2025-11-27').getTime(), y: 8600 },
        { x: new Date('2025-11-28').getTime(), y: 9100 },
        { x: new Date('2025-11-29').getTime(), y: 9340 },
      ],
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: 'line',
      toolbar: {
        show: true,
      },
    },
    annotations: {
      yaxis: [
        {
          y: 8200,
          borderColor: '#00E396',
          label: {
            text: 'Support',
            style: {
              color: '#fff',
              background: '#00E396',
            },
          },
        },
        {
          y: 8600,
          y2: 9000,
          borderColor: '#FEB019',
          fillColor: '#FEB019',
          opacity: 0.2,
          label: {
            text: 'Consolidation zone',
          },
        },
      ],
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
      width: 2,
    },
    title: {
      text: 'Borrows Book All Times',
      align: 'left',
    },
    xaxis: {
      type: 'datetime',
    },
    grid: {
      padding: {
        right: 30,
        left: 20,
      },
    },
  };

  return (
    <div>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default Chart;
