function setIcon(icon, iconId) {
    var skycons = new Skycons({"color": "green"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase()
    skycons.play()
    return skycons.set(iconId, Skycons[currentIcon])
}


window.addEventListener("load",  async () => {

    let lat;
    let long;

    console.log("Hello");
    

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( async position => {

        lat = position.coords.latitude;
        long = position.coords.longitude;

        const proxy = "https://cors-anywhere.herokuapp.com/"
        const api = `${proxy}https://api.darksky.net/forecast/84402fa38cdc392bd158f506a86e8844/${lat},${long}`

        const res = await fetch(api)

        const data = await res.json()
        console.log(data);

        const { temperature , summary, icon  } = data.currently;
        

        document.querySelector(".temp").textContent = toCelsius(temperature);
        document.querySelector(".desc").textContent = summary; 
        document.querySelector(".timezone").textContent = data.timezone;
        setIcon(icon, document.getElementById("icon"));

    });

    }
})

function toCelsius (temp) {


    return Math.floor( ((temp - 32) * (5 / 9)) * 100) / 100;
}