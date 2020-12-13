import React from 'react';
import "./StatsRow.css";
import StockChart from './stock.svg';
import { database } from "./firebase";

function StatsRow({ name, openPrice, volume, price}) {
    const percentage = ((price - openPrice) / openPrice) * 100;
    const isPositive = percentage > 0 ? true : false;

    const buyMystocks = () => {
        database.collection('myStocks')
        .where("ticker", "==", name).get().then((querySnapshot) => {
            if(!querySnapshot.empty){
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());
                    database.collection('myStocks').doc(doc.id).update({
                        shares: doc.data().shares+=1
                    })
                });
            } else {
                // Add the new record
                database.collection('myStocks').add({
                    ticker: name,
                    shares: 1
                })
            }
        })
    }

    return (
        <div className="statsRow" onClick={buyMystocks}>
            <div className="statsRow__intro">
                <h1>{name}</h1>
                <p>
                    {volume && (volume + " shares")}
                </p>
            </div>
            <div className="statsRow__chart">
                <img src={StockChart} height={16}/>
            </div>
            <div className="statsRow__numbers">
                <p className="statsRow__price">${price}</p>
                <p className={`statsRow__${isPositive ? "percentageGreen" : "percentageRed"}`}> {Number(percentage).toFixed(2)}%</p>
            </div>
        </div>
    )
}

export default StatsRow;
