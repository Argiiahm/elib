import ReactApexChart from 'react-apexcharts';
import useBorrows from '../hooks/useBorrows';

const Chart = () => {
  const { borrows } = useBorrows();
  const groupedBorrows = borrows
    .filter((borrow) => ['accepted', 'returned'].includes(borrow.status))
    .reduce((result, borrow) => {
      const date = new Date(borrow.loanDate);
      date.setHours(0, 0, 0, 0);

      const timestamp = date.getTime();

      result[timestamp] = (result[timestamp] || 0) + 1;
      return result;
    }, {});

  const series = [
    {
      name: 'total borrows',
      data: Object.entries(groupedBorrows)
        .map(([x, y]) => ({
          x: Number(x),
          y,
        })).sort((a, b) => a.x - b.x),
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
      curve: 'smooth',
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
