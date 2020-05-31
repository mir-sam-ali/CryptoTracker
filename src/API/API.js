import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;

const getDates = () => {
  let last_10_dates = [];

  const months = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var today = new Date();
  let curr_day = today.getDate();
  let curr_month = today.getMonth() + 1;
  let curr_year = today.getFullYear();
  let old_day = curr_day;
  let old_month = curr_month;
  let old_year = curr_year;

  last_10_dates.push(
    curr_year +
      "-" +
      (curr_month >= 10 ? curr_month : "0" + curr_month) +
      "-" +
      (curr_day >= 10 ? curr_day : "0" + curr_day)
  );

  for (let i = 1; i < 10; i++) {
    old_day--;
    if (old_day === 0) {
      old_month--;
      if (old_month === 0) {
        old_month = 12;
        old_year--;
      }

      old_day = months[old_month];
    }

    last_10_dates.push(
      old_year +
        "-" +
        (old_month >= 10 ? old_month : "0" + old_month) +
        "-" +
        (old_day >= 10 ? old_day : "0" + old_day)
    );
  }

  return last_10_dates;
};

export async function getLiveData(options) {
  let dates = getDates();
  const date = dates[0];
  localStorage.removeItem("Live_Data_" + dates[1]); //Removes the data stored yesterday!
  let Live_Data = localStorage.getItem("Live_Data_" + date);

  if (Live_Data !== null) Live_Data = JSON.parse(Live_Data);
  //console.log(Live_Data);
  if (Live_Data === null) {
    await axios
      .get(
        BASE_URL +
          "/api/live?access_key=" +
          ACCESS_KEY +
          "&target=" +
          options.currency
      )

      .then((response) => {
        console.log(response);
        const rates = response.data.rates;

        localStorage.setItem(
          "Live_Data_" + date,
          JSON.stringify(response.data.rates)
        );
        Live_Data = rates;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return Live_Data;
}

export async function getHistoricData(options) {
  const dates = getDates();
  let allData = [];

  localStorage.removeItem("Historic_Data_" + dates[1]); //Removes the data stored yesterday!

  const historic_data = await JSON.parse(
    localStorage.getItem("Historic_Data_" + dates[0])
  );

  if (historic_data === null) {
    for (let i = 0; i < 10; i++) {
      await axios
        .get(
          BASE_URL +
            "/" +
            dates[i] +
            "?access_key=" +
            ACCESS_KEY +
            "&target=" +
            options.currency
        )
        .catch((err) => {
          console.log(err);
        })
        .then((response) => {
          console.log(response);
          allData.push(response.data.rates);
        });
    }

    if (!allData[0]) {
      let oldValue = localStorage.getItem("Live_Data_" + dates[0]);

      if (oldValue !== null) oldValue = await JSON.parse(oldValue);
      allData[0] = oldValue;
    }

    let historyOfEachCrypto = {};
    for (let i = 9; i >= 0; i--) {
      if (allData[i]) {
        Object.keys(allData[i]).forEach((key) => {
          if (historyOfEachCrypto[key]) {
            historyOfEachCrypto[key].push(allData[i][key]);
          } else {
            historyOfEachCrypto[key] = [allData[i][key]];
          }
        });
      }
    }

    const finalData = {
      historyOfEachCrypto,
      dates: dates.reverse(),
    };

    localStorage.setItem(
      "Historic_Data_" + dates[9],
      JSON.stringify(finalData)
    );
    return finalData;
  } else {
    return historic_data;
  }
}

export async function getCryptoList() {
  let list_data = localStorage.getItem("CRYPTO_LIST");
  if (list_data !== null) list_data = await JSON.parse(list_data);

  if (list_data === null) {
    await axios
      .get(BASE_URL + "/list?access_key=" + ACCESS_KEY)
      .catch((err) => {
        console.log(err);
      })
      .then((response) => {
        console.log(response);
        list_data = response.data.crypto;
      });

    localStorage.setItem("CRYPTO_LIST", JSON.stringify(list_data));
    return list_data;
  } else {
    return list_data;
  }
}
