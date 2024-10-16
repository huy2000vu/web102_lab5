import React, { useState, useEffect } from "react";
const api_key = import.meta.env.VITE_APP_API_KEY;
import CoinInfo from "./components/CoinInfo";
export default function App() {
  const [list, setList] = useState(null);
  useEffect(() => {
    const fetchAllCoinData = async () => {
      const response = await fetch(
        "https://min-api.cryptocompare.com/data/all/coinlist?&api_key" + api_key
      );
      const json = await response.json();
      setList(json);
    };

    fetchAllCoinData().catch(console.error);
  }, []);
  console.log(list); //debug
  return (
    <div className="whole-page">
      <h1>
        My Crypto List
        <ul>
          {list &&
            Object.entries(list.Data).map(([coin]) =>
              list.Data[coin].PlatformType === "blockchain" ? (
                <CoinInfo
                  image={list.Data[coin].ImageUrl}
                  name={list.Data[coin].FullName}
                  symbol={list.Data[coin].Symbol}
                />
              ) : null
            )}
        </ul>
      </h1>
    </div>
  );
}
