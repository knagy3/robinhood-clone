import React, { useState, useEffect } from "react";
import "./NewsFeed.css";

import {MenuItem, Avatar, Select, FormControl} from "@material-ui/core";
//import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
//import FlashOnIcon from "@material-ui/icons/FlashOn";
import Chip from '@material-ui/core/Chip';
import LineGraph from "./LineGraph";
import TimeLine from "./TimeLine"
//import Article from "./Article";
import { useStateValue } from './StateProvider';
//import { key } from "./api";
//import axios from "axios";

//const BASE_URL = "https://finnhub.io/api/v1/stock/symbol?exchange=US";
//const KEY_URL = `&token=${key}`;
// const getSharesData = () => {
//     return axios
//     .get(`${BASE_URL}${KEY_URL}`)
//     .catch((error) => {
//         console.error("Error", error.message);
//     });
// };
// stocksList.map((stock) => {
//     promises.push(
//         getSharesData()
//         .then((res) => {
//             testData.push({
//             name: stock,
//             //...res.data
//             });
//         })
//     )
// });

function NewsFeed() {
    const [popularTopics, setTopics] = useState([
        "Technology",
        "Top Movies",
        "Upcoming Earnings",
        "Crypto",
        "Cannabis",
        "Healthcare Supplies",
        "Index ETFs",
        "Technology",
        "China",
        "Pharma",
    ]);

    const [seed, setSeed] = useState("");
    const [choosedShare, dispatch] = useStateValue();
    const [shares, setShares] = useState([]);
    const [share, setInputShare] = useState("ACB");

    const onShareChange = (event) => {
        const shareCode = event.target.value;
        console.log(event.target.value);
        setInputShare(shareCode);
        console.log(share);
        

        dispatch({
            type: "SET_SHARE",
            choosedShare: shareCode,
        });
    };

    useEffect(() => {
        const stocksList = [
            {   
                description: "APPLE INC",
                displaySymbol: "AAPL"
            },{   
                description: "MICROSOFT CORP",
                displaySymbol: "MSFT"
            },{   
                description: "TESLA INC",
                displaySymbol: "TSLA"
            },{   
                description: "FACEBOOK INC-CLASS",
                displaySymbol: "FB"
            },{   
                description: "ALIBABA GROUP HOLDING-SP ADR",
                displaySymbol: "BABA"
            },{   
                description: "UBER TECHNOLOGIES INC",
                displaySymbol: "UBER"
            },{   
                description: "WALT DISNEY CO/THE",
                displaySymbol: "DIS"
            },{   
                description: "STARBUCKS CORP",
                displaySymbol: "SBUX"
            }
        ];
        let testData = [];
        let promises = [];

        promises.push(
            stocksList.map((stock) => {
                testData.push({
                    name: stock.description,
                    symbol: stock.displaySymbol
                });
            }
        ));

        Promise.all(promises).then(() => {
            setShares(testData);
        })
    }, []);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
      }, []);


    return (
        <div className="newsfeed">
            <div className="newsfeed__container">
                <div className="newsfeed__chart__section">
                    <div className="newsfeed__chart__header">
                        <div className="newsfeed_price_asset">
                            <h1> $114,656,84</h1>
                            <p> ${seed} (-0,12) Today </p>
                        </div>
                        <FormControl className="newsfeed__dropdown">
                            <Select
                                id="demo-customized-select"
                                
                                variant="filled"
                                disableUnderline="true"
                                value={share}
                                onChange={onShareChange}
                            >
                            {/*Dropdown box items*/}
                            <MenuItem value="ACB">AURORA CANNABIS INC</MenuItem>
                            {shares.map((share) => (
                                <MenuItem value={share.symbol}>{share.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="newsfeed__chart">
                        <LineGraph />
                        <TimeLine />
                    </div>
                </div>

                <div className="newsfeed__buying__section">
                    <h2> Buying Power</h2>
                    <h2> $4.11</h2>
                </div>
                <div className="newsfeed__market__section">
                    <div className="newsfeed__market__box">
                        <p> Market 's Closed </p>
                        <h1> Merry Xmas! </h1>
                    </div>
                </div>
                <div className="newsfeed__popularlists__section">
                    <div className="newsfeed__popularlists__intro">
                        <h1>Popular lists</h1>
                        <p>Show More</p>
                    </div>
                    <div className="newsfeed_popularlists_badges">
                    {popularTopics.map((topic) => (
                        <Chip 
                            className="topic__badge"
                            variant="outlined"
                            label={topic}
                            avatar={<Avatar
                                src={`https://avatars.dicebear.com/api/human/${topic}.svg`}
                            />} 
                        />
                    ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default NewsFeed
