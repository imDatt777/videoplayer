export const trimText = (text, len) => {
    let resText = "";
    if (text.length > len) {
        resText = text.substring(0, len) + "...";
    } else {
        resText = text;
    }

    return resText;
};

export const formatTime = (time) => {
    const timeInSeconds = Math.floor(time);
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
    )}`;
};
