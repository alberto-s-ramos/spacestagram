import React, { useEffect, useState } from "react";
import "../styles/spacestagram.scss";
import { Post } from "../components/Post";
import { getMonth } from "../helpers/helpers";
import { Ellipsis } from "react-awesome-spinners";
import axios from "axios";

export const Spacestagram = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const currentMonth = getMonth("current");
    const lastMonth = getMonth("last");

    useEffect(() => {
        fetchPhotos(currentMonth, lastMonth);
    }, []);

    const fetchPhotos = (lastMonth, currentMonth) => {
        axios
            .get(
                `https://api.nasa.gov/planetary/apod?api_key=jhXO5dL1JFE7XEvthy1NWoWilx1JeiSPviYRlDNo&start_date=${lastMonth}&end_date=${currentMonth}`
            )
            .then((res) => {
                console.log(res.data);
                setData(res.data.reverse());
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const photos = data.map((element, index) => (
        <Post
            key={index}
            id={index}
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
                    {currentMonth}
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
