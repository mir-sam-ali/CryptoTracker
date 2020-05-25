import React from "react";
import { Line } from "react-chartjs-2";
import "./graph.css";
import ChipLayer from "../ChipLayer/ChipLayer";
import Alert from "@material-ui/lab/Alert";

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.chartReference = React.createRef();
  }

  state = {
    data: {
      datasets: [],
    },
    addedCurrencies: [],
    colours: [
      "#ed6a28",
      "#007bff",
      "#0ccc2f",
      "#7913bd",
      "#dbd000",
      "#fc0303",
      "#4e03fc",
      "#a503fc",
      "#fc03c6",
      "#000000",
    ],
  };

  static getDerivedStateFromProps(props, state) {
    let newState = {
      data: {
        datasets: [],
        labels: props.dates,
      },
      addedCurrencies: [],
    };
    if (props.values) {
      props.values.forEach((currency, index) => {
        newState.addedCurrencies.push(currency.name);
        newState.data.datasets.push({
          label: currency.name,
          data: currency.data,
          backgroundColor: state.colours[index],
          fill: false,
          borderColor: state.colours[index],
          borderCapStyle: "butt",
          lineTension: 0.2,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointStyle: "rectRounded",
        });
      });
    }
    return newState;
  }

  options = {
    //responsive: true,
    maintainAspectRatio: false,

    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          var label = data.datasets[tooltipItem.datasetIndex].label || "";
          if (label) {
            label += ": ₹";
          }
          label += Math.round(tooltipItem.yLabel * 100) / 100;
          return label;
        },
      },
    },

    title: {
      display: true,
      text: "Trend in last 10 days",
      fontColor: "black",
      fontSize: 22,
      fontFamily: "'Roboto Slab', 'serif'",
    },
    animation: {
      duration: 2000,
    },
    legend: {
      display: true,

      labels: {
        fontColor: "black",
        fontFamily: "'Ubuntu', 'sans-serif'",
        fontSize: 14,
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            // Include a dollar sign in the ticks
            fontColor: "black",
            fontFamily: "'Ubuntu', 'sans-serif'",
            fontSize: 12,
            callback: function (value, index, values) {
              return "₹" + value;
            },
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            fontColor: "black",
            fontFamily: "'Ubuntu', 'sans-serif'",
            fontSize: 12,
          },
        },
      ],
    },
  };

  render() {
    return (
      <div className="graphDiv">
        <ChipLayer
          currencies={this.state.addedCurrencies}
          deleteCurve={this.props.deleteCurve}
          cryptoList={this.props.cryptoList}
        />
        <hr />
        {this.props.showError ? (
          <Alert severity="error">
            You've reached the Maximum limit of 10 curves! Delete some curves to
            add new curves.
          </Alert>
        ) : null}

        <article className="canvas-container">
          <Line
            ref={this.chartReference}
            data={this.state.data}
            options={this.options}
          />
        </article>
      </div>
    );
  }
}

export default Graph;
