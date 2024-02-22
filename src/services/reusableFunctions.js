export const time = (currentTime) => {
    const h = parseInt(currentTime / (60 * 60));
    const m = parseInt((currentTime % (60 * 60)) / 60);
    const s = parseInt(currentTime % 60);
  
    let time;
  
    if (h < 1) {
      time = ((m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s)).toString();
    } else {
      time = (
        (h < 10 ? '0' + h : h) +
        ':' +
        (m < 10 ? '0' + m : m) +
        ':' +
        (s < 10 ? '0' + s : s)
      ).toString();
    }
    return time;
  };

  export const GenerateRandomNumberForDeviceID = () => {
    var RandomNumber = Math.floor(Math.random() * 10000000) + 1;
    return `${RandomNumber}@`;
  };