export const getToday = () => {
    let date = new Date();
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
};

export const getYesterday = (month) => {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
};

export const getLastMonth = () => {
    let date = new Date();
    date.setMonth(date.getMonth() - 1);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
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
