import React, { useState, useEffect, useRef } from "react";
import { mediaFormat } from "../helpers/helpers";
import Heart from "react-heart";
import "../styles/post.scss";

export const Post = (props) => {
    const postRef = useRef();

    const [liked, setLiked] = useState(
        JSON.parse(window.localStorage.getItem(`liked_${props.id}`)) === null
            ? false
            : JSON.parse(window.localStorage.getItem(`liked_${props.id}`))
    );

    useEffect(() => {
        setLiked(JSON.parse(window.localStorage.getItem(`liked_${props.id}`)));
    }, []);

    useEffect(() => {
        window.localStorage.setItem(`liked_${props.id}`, liked);
    }, [liked]);

    const updateLikeStatus = () => {
        let likeStatus = liked;
        setLiked(!liked);

        if (likeStatus === true) {
            postRef.current.classList.remove('banner-liked--unload')
            postRef.current.classList.add('banner-liked--load')
        } else {
            postRef.current.classList.remove('banner-liked--load')
            postRef.current.classList.add('banner-liked--unload')
        }
    }

    return (
        <article ref={postRef} className="post">
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
                <div className={liked ? "banner-liked banner-liked--load" : "banner-liked banner-liked--unload"}></div>
            </div>
        </article>
    );
};
