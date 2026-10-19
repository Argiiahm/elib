import ReactApexChart from 'react-apexcharts';

const Chart = () => {
  const series = [
    {
      name: 'total borrows',
      data: [
        { x: new Date('2025-11-23').getTime(), y: 2 },
        { x: new Date('2025-11-24').getTime(), y: 3 },
        { x: new Date('2025-11-25').getTime(), y: 4 },
        { x: new Date('2025-11-26').getTime(), y: 5 },
        { x: new Date('2025-11-27').getTime(), y: 6 },
        { x: new Date('2025-11-28').getTime(), y: 7 },
        { x: new Date('2025-11-29').getTime(), y: 8 },
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
