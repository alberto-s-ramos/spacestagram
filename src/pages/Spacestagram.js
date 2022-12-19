import React, { useEffect, useState } from "react";
import "../styles/spacestagram.scss";
import { Post } from "../components/Post";
import { getToday, getYesterday, getLastMonth } from "../helpers/helpers";
import { Ellipsis } from "react-awesome-spinners";
import axios from "axios";

export const Spacestagram = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const today = getToday();
    const lastMonth = getLastMonth();
    let attemptedYesterday = false;

    useEffect(() => {
        fetchPhotos(lastMonth, today);
    }, []);

    const fetchPhotos = async (lastMonth, today) => {
        try {
            const res = await axios.get(
                `https://api.nasa.gov/planetary/apod?api_key=jhXO5dL1JFE7XEvthy1NWoWilx1JeiSPviYRlDNo&start_date=${lastMonth}&end_date=${today}`
            );
            setData(res.data.reverse());
        } catch (err){
            const ERROR_CODE = err.response.data.code;
            if(ERROR_CODE === 400 && !attemptedYesterday) {
                attemptedYesterday = true;
                fetchPhotos(lastMonth, getYesterday())
            } else {  console.error("Something went wrong. Please try again later")}
        } finally {
            setLoading(false);
        }
    };

    const photos = data.map((element, index) => (
        <Post
            key={'nasa-post-'+index}
            id={'nasa-post-'+index}
            media={element.url}
            title={element.title}
            date={element.date}
        />
    ));

    return (
        <section className="spacestagram">
            <div className="spacestagram__title">
                <h1>Spacestagram</h1>
                <p>
                    A collection of NASA's <q>photo of the day</q> from {lastMonth} to{" "}
                    {today}
                </p>
            </div>
            {loading ? (
                <Ellipsis color="white" />
            ) : (
                <div className="spacestagram__figures">{photos}</div>
            )}
        </section>
    );
};
