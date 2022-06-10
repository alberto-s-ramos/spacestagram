export const getMonth = (month) => {
    let date = new Date();
    const dd = String(date.getDate()).padStart(2, "0");
    let mm, yyyy, formattedDate;
    if (month === "current") {
        mm = String(date.getMonth() + 1).padStart(2, "0");
    } else if (month === "last") {
        date.setMonth(date.getMonth() - 1);
        mm = String(date.getMonth() + 1).padStart(2, "0");
    }
    yyyy = date.getFullYear();
    formattedDate = yyyy + "-" + mm + "-" + dd;
    return formattedDate;
};

export const mediaFormat = (url, title) => {
    if (url.includes("youtube")) {
        return <iframe title={url} className="post__media" src={url}></iframe>;
    } else {
        return (
            <img className="post__media" src={url} alt={title} loading="lazy"></img>
        );
    }
};
