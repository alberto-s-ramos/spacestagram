import React, { useState, useEffect, useRef } from "react";
import { mediaFormat } from "../helpers/helpers";
import Heart from "react-heart";
import "../styles/post.scss";

export const Post = (props) => {
    const likeBanner = useRef();

    const [liked, setLiked] = useState(
        JSON.parse(window.localStorage.getItem(`liked_${props.media}`)) === null
            ? false
            : JSON.parse(window.localStorage.getItem(`liked_${props.media}`))
    );

    useEffect(() => {
        setLiked(JSON.parse(window.localStorage.getItem(`liked_${props.media}`)));
    }, []);

    useEffect(() => {
        window.localStorage.setItem(`liked_${props.media}`, liked);
    }, [liked]);

    const updateLikeStatus = () => {
        let likeStatus = !liked;
        setLiked(!liked);

        if (likeStatus === true) {
            likeBanner.current.classList.remove('post__banner-liked--unload')
            likeBanner.current.classList.add('post__banner-liked--load')
        } else {
            likeBanner.current.classList.remove('post__banner-liked--load')
            likeBanner.current.classList.add('post__banner-liked--unload')
        }
    }

    return (
        <article className="post">
            <figure className="post__imageContainer">
                {mediaFormat(props.media, props.title)}
            </figure>

            <div className="post__content">
                <div className="post__info">
                    <h2 className="post__title">{props.title}</h2>
                    <p className="post__date">{props.date}</p>
                </div>
                <div className="post__buttonContainer">
                    <div style={{ width: "1.7rem" }}>
                        <Heart
                            inactiveColor="rgba(69, 109, 163, 0.8)"
                            activeColor="rgba(221, 69, 74, 1)"
                            animationDuration={0.2}
                            isActive={liked}
                            onClick={() =>  updateLikeStatus()}
                        />
                    </div>
                </div>
            </div>
            <div className="post__banner">
                <div ref={likeBanner} className="post__banner-liked" style={{width: liked ? '100%' : '0%'}}></div>
            </div>
        </article>
    );
};
