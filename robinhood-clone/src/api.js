
const key = "bvb4m5n48v6psibtn800";

const options = {
  legend: {
    display: false,
  },
  hover: {
    intersect: false
  },
  elements: {
    line: {
      tension: 0
    },
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY hh:mm:ss a",
          tooltipFormat: "ll",
        },
        ticks: {
          display: false,
        }
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    ],
  },
};
export { key, options };