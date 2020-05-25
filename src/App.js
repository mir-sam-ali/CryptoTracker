import React, { useEffect, useState } from "react";
import { getLiveData, getHistoricData, getCryptoList } from "./API/API";
import "./App.css";
import { Grid } from "@material-ui/core";
import Graph from "./Components/Graph/graph";
import SideMenu from "./Components/SideMenu/SideMenu";
import Header from "./Components/Header/Header";

function App() {
  let [LiveData, setLiveData] = useState(null);
  let [HistoricData, setHistoricData] = useState(null);
  let [cryptoList, setCryptoList] = useState(null);
  let [GraphCurves, setGraphCurves] = useState(null);
  let [showError, setShowError] = useState(false);

  const getDataFromAPI = async () => {
    const liveData = await getLiveData({ currency: "INR" });

    const history = await getHistoricData({ currency: "INR" });
    const list_curr = await getCryptoList();

    setLiveData(liveData);
    setHistoricData(history);
    setCryptoList(list_curr);
    setGraphCurves([
      {
        name: "BTC",
        data: history.historyOfEachCrypto["BTC"],
      },
      {
        name: "GRWI",
        data: history.historyOfEachCrypto["GRWI"],
      },
      {
        name: "ETH",
        data: history.historyOfEachCrypto["ETH"],
      },
    ]);
  };

  const addCurveToGraph = (currency) => {
    //currency is the name
    let isPresent = GraphCurves.find((curve) => {
      return curve.name === currency;
    });
    if (isPresent === undefined) {
      if (GraphCurves.length === 10) {
        setShowError(true);
        return;
      }
      let newCurve = {
        name: currency,
        data: HistoricData.historyOfEachCrypto[currency],
      };
      let newGraph = [...GraphCurves];
      newGraph.push(newCurve);
      console.log(newGraph);
      setGraphCurves(newGraph);
    }
  };

  const deleteCurve = (currency) => {
    let newGraph = GraphCurves.filter((curve) => {
      return curve.name !== currency;
    });
    if (showError === true) {
      setShowError(false);
    }
    setGraphCurves(newGraph);
  };

  useEffect(() => {
    getDataFromAPI();
  }, []);

  return (
    <div className="App">
      <Header />
      <Grid
        container
        style={{
          flexGrow: "1",
          width: "100%",
          height: "100vh",
        }}
        direction="row"
        spacing={1}
        justify="space-between"
      >
        <Grid item xs={12} md={7}>
          <Graph
            values={HistoricData ? GraphCurves : null}
            dates={HistoricData ? HistoricData.dates : null}
            deleteCurve={deleteCurve}
            cryptoList={cryptoList}
            showError={showError}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <SideMenu
            values={LiveData}
            HistoricData={
              HistoricData ? HistoricData.historyOfEachCrypto : null
            }
            cryptoList={cryptoList}
            addCurve={addCurveToGraph}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
