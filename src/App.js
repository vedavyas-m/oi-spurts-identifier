import "./App.css";
import { useEffect, useState } from "react";
function App() {
  const [value, setValue] = useState("");
  const [valuesToBeDisplayed, setValuesToBeDisplayed] = useState([]);
  useEffect(() => {
    if (value) {
      try {
        let arr = JSON.parse(value).filter((item) => {
          return (
            item.pChange > 50 && item.pChangeInOI > 50
            //  &&
            // item.instrumentType === "OPTIDX"
          );
          // return (
          //   item.pChange > 10 &&
          //   item.pChangeInOI > 10 &&
          //   item.instrumentType === "OPTIDX"
          // );
        });
        console.log(arr);
        setValuesToBeDisplayed(arr);
        setValue("");
      } catch ({ error }) {
        alert("some error in  the string");
      }
    }
  }, [value]);
  return (
    <div className="App">
      <h1>OI SPURTS IDENTIFIER</h1>
      <a
        href="https://www.nseindia.com/api/live-analysis-oi-spurts-contracts"
        target="_blank"
        rel="noreferrer"
      >
        OI SPURTS DATA
      </a>
      <div>
        <textarea
          value={value}
          onChange={(e) => {
            setValue(
              JSON.stringify(
                JSON.parse(e.target.value).data[2]["Rise-in-OI-Rise"]
              )
            );
          }}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>SYMBOL</th>
            <th>INSTRUMENT</th>
            <th>EXPIRY</th>
            <th>STRIKE PRICE</th>
            <th>OPTION TYPE</th>
            <th>LTP</th>
            <th>%CHANGE IN LTP</th>
            <th>%CHANGE IN OI</th>
          </tr>
        </thead>
        <tbody>
          {valuesToBeDisplayed &&
            valuesToBeDisplayed.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.symbol}</td>
                  <td>{item.instrument}</td>
                  <td>{item.expiryDate}</td>
                  <td>{item.strikePrice}</td>
                  <td>{item.optionType}</td>
                  <td>{item.ltp}</td>
                  <td>{item.pChange}</td>
                  <td>{item.pChangeInOI}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
