import "./App.css";
import { useEffect, useState } from "react";
function App() {
  const [value, setValue] = useState("");
  const [valuesToBeDisplayed, setValuesToBeDisplayed] = useState([]);
  useEffect(() => {
    if (value) {
      try {
        let arr = JSON.parse(value).filter((item) => {
          return item.pChange > 50 && item.pChangeInOI > 50;
        });
        console.log(arr);
        setValuesToBeDisplayed(arr);
      } catch ({ error }) {
        alert("some error in  the string");
      }
    }
  }, [value]);

  const valueHandler = (e) => {
    console.log(value);
    try {
      const parsedValue = JSON.parse(e.target.value);
      const rr = parsedValue.data[2]["Rise-in-OI-Rise"];
      const stringData = JSON.stringify(rr);
      setValue(stringData);
    } catch (error) {
      if (error) {
        console.log("NOT A VALID JSON STRING, PLEASE CHECK AGAIN");
        setValue("");
      }
    }
  };
  return (
    <div className="App flex flex-col items-center bg-black text-white min-h-[100vh]">
      <h1 className="text-4xl font-bold underline">OI SPURTS IDENTIFIER</h1>
      <a
        href="https://www.nseindia.com/market-data/oi-spurts"
        target="_blank"
        rel="noreferrer"
        // className="uppercase"
      >
        nse website: first visit this
      </a>
      <a
        href="https://www.nseindia.com/api/live-analysis-oi-spurts-contracts"
        target="_blank"
        rel="noreferrer"
      >
        OI SPURTS DATA: next visit this
      </a>

      <div>
        <textarea
          className="border-2 border-[white] bg-transparent rounded-md min-h-[200px] min-w-[300px] w-[50%]"
          value={value}
          onChange={valueHandler}
        />
      </div>
      <div className="overflow-auto max-w-full min-w-full">
        <table className="min-w-full whitespace-nowrap">
          <thead>
            <tr>
              <th className="px-2 py-1">SYMBOL</th>
              <th className="px-2 py-1">INSTRUMENT</th>
              <th className="px-2 py-1">EXPIRY</th>
              <th className="px-2 py-1">STRIKE PRICE</th>
              <th className="px-2 py-1">OPTION TYPE</th>
              <th className="px-2 py-1">LTP</th>
              <th className="px-2 py-1">%CHANGE IN LTP</th>
              <th className="px-2 py-1">%CHANGE IN OI</th>
            </tr>
          </thead>
          <tbody>
            {valuesToBeDisplayed &&
              valuesToBeDisplayed.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="px-2 py-1">{item.symbol}</td>
                    <td className="px-2 py-1">{item.instrument}</td>
                    <td className="px-2 py-1">{item.expiryDate}</td>
                    <td className="px-2 py-1">{item.strikePrice}</td>
                    <td className="px-2 py-1">{item.optionType}</td>
                    <td className="px-2 py-1">{item.ltp}</td>
                    <td className="px-2 py-1">{item.pChange}</td>
                    <td className="px-2 py-1">{item.pChangeInOI}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
