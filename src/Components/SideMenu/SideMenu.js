import React, { Component } from "react";
import "./SideMenu.css";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListUnit from "../ListUnit/ListUnit";
import SearchBar from "../SearchBar/SearchBar";
import SortSelect from "../SortSelect/SortSelect";

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CurrentOrder: [],
      CurrentArray: [],
      percentageChange: [],
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps !== this.props ||
      this.state.CurrentArray !== nextState.CurrentArray
    );
  }
  static getDerivedStateFromProps(props, state) {
    //console.log(props, state);
    if (state.CurrentOrder.length === 0) {
      let alphabeticalOrder =
        props.values && props.cryptoList ? Object.keys(props.values) : [];
      if (alphabeticalOrder.length !== 0) {
        alphabeticalOrder.sort((a, b) => {
          if (
            props.cryptoList[a].name.toLowerCase() <
            props.cryptoList[b].name.toLowerCase()
          )
            return -1;
          else if (
            props.cryptoList[a].name.toLowerCase() >
            props.cryptoList[b].name.toLowerCase()
          )
            return 1;
          else return 0;
        });
      }

      let percentChange = {};
      alphabeticalOrder.forEach((currency) => {
        let oldValue = props.HistoricData[currency][8];
        let currentValue = props.values[currency];
        const change =
          oldValue !== 0
            ? (((currentValue - oldValue) * 100) / oldValue).toFixed(2)
            : 0.0;
        percentChange[currency] = change;
      });
      //console.log(alphabeticalOrder);
      return {
        CurrentOrder: alphabeticalOrder,
        CurrentArray: alphabeticalOrder,
        percentageChange: percentChange,
      };
    } else {
      return state;
    }
  }

  searchCurrency = (currency_name) => {
    if (currency_name === "") {
      this.setState({ CurrentArray: [...this.state.CurrentOrder] });
      return;
    }
    currency_name = currency_name.toLowerCase();
    console.log(this.state);
    let oldArray = this.state.CurrentOrder;
    let newArray = oldArray.filter((curr) => {
      let pos = this.props.cryptoList[curr].name
        .toLowerCase()
        .indexOf(currency_name);
      if (pos === 0) {
        return true;
      } else {
        return false;
      }
    });
    console.log(newArray);
    this.setState({ CurrentArray: newArray });
  };

  changeSortOrder = (order) => {
    let newOrder = [...this.state.CurrentOrder];
    let newArray = [...this.state.CurrentArray];
    switch (order) {
      case "A-Z": {
        if (newOrder.length !== 0) {
          newOrder.sort((a, b) => {
            if (
              this.props.cryptoList[a].name.toLowerCase() <
              this.props.cryptoList[b].name.toLowerCase()
            )
              return -1;
            else if (
              this.props.cryptoList[a].name.toLowerCase() >
              this.props.cryptoList[b].name.toLowerCase()
            )
              return 1;
            else return 0;
          });
        }

        if (newArray.length !== 0) {
          newArray.sort((a, b) => {
            if (
              this.props.cryptoList[a].name.toLowerCase() <
              this.props.cryptoList[b].name.toLowerCase()
            )
              return -1;
            else if (
              this.props.cryptoList[a].name.toLowerCase() >
              this.props.cryptoList[b].name.toLowerCase()
            )
              return 1;
            else return 0;
          });
        }
        this.setState({ CurrentOrder: newOrder, CurrentArray: newArray });

        break;
      }
      case "PRICE_HIGH": {
        if (newOrder.length !== 0) {
          newOrder.sort((a, b) => {
            if (this.props.values[a] < this.props.values[b]) return 1;
            else if (this.props.values[a] > this.props.values[b]) return -1;
            else return 0;
          });
        }
        if (newArray.length !== 0) {
          newArray.sort((a, b) => {
            if (this.props.values[a] < this.props.values[b]) return 1;
            else if (this.props.values[a] > this.props.values[b]) return -1;
            else return 0;
          });
        }
        this.setState({ CurrentOrder: newOrder, CurrentArray: newArray });
        break;
      }

      case "PRICE_LOW": {
        if (newOrder.length !== 0) {
          newOrder.sort((a, b) => {
            if (this.props.values[a] < this.props.values[b]) return -1;
            else if (this.props.values[a] > this.props.values[b]) return 1;
            else return 0;
          });
        }
        if (newArray.length !== 0) {
          newArray.sort((a, b) => {
            if (this.props.values[a] < this.props.values[b]) return -1;
            else if (this.props.values[a] > this.props.values[b]) return 1;
            else return 0;
          });
        }
        this.setState({ CurrentOrder: newOrder, CurrentArray: newArray });
        break;
      }

      case "PERCENTAGE_HIGH": {
        if (newOrder.length !== 0) {
          newOrder.sort((a, b) => {
            if (this.state.percentageChange[a] < this.state.percentageChange[b])
              return 1;
            else if (
              this.state.percentageChange[a] > this.state.percentageChange[b]
            )
              return -1;
            else return 0;
          });
        }
        if (newArray.length !== 0) {
          newArray.sort((a, b) => {
            if (this.state.percentageChange[a] < this.state.percentageChange[b])
              return 1;
            else if (
              this.state.percentageChange[a] > this.state.percentageChange[b]
            )
              return -1;
            else return 0;
          });
        }
        this.setState({ CurrentOrder: newOrder, CurrentArray: newArray });
        break;
      }

      case "PERCENTAGE_LOW": {
        if (newOrder.length !== 0) {
          newOrder.sort((a, b) => {
            if (this.state.percentageChange[a] < this.state.percentageChange[b])
              return -1;
            else if (
              this.state.percentageChange[a] > this.state.percentageChange[b]
            )
              return 1;
            else return 0;
          });
        }

        if (newArray.length !== 0) {
          newArray.sort((a, b) => {
            if (this.state.percentageChange[a] < this.state.percentageChange[b])
              return -1;
            else if (
              this.state.percentageChange[a] > this.state.percentageChange[b]
            )
              return 1;
            else return 0;
          });
        }
        this.setState({ CurrentOrder: newOrder, CurrentArray: newArray });
        break;
      }

      default:
        break;
    }
  };

  render() {
    return (
      <div className="SideMenuDiv">
        <div className="InputDiv">
          <SortSelect changeHandler={this.changeSortOrder} />
          <SearchBar searchCurrency={this.searchCurrency} />
        </div>
        <List className="SideMenu">
          {this.state.CurrentArray.length > 0
            ? this.state.CurrentArray.map((currency) => {
                return (
                  <React.Fragment key={currency}>
                    <ListUnit
                      clicked={() => {
                        this.props.addCurve(currency);
                      }}
                      currency={this.props.cryptoList[currency]}
                      value={this.props.values[currency]}
                      oldValue={this.props.HistoricData[currency][8]}
                    />

                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                );
              })
            : "No Such CryptoCurrency"}
        </List>
      </div>
    );
  }
}

export default SideMenu;
