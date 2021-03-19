const distances = ["MarktplatzDist", "BotatischerGartenDist", "RheinhafenDist", "LernzentrumDist", "ZKMDist",
    "RheinbrückeDist", "SchlossGottesaueDist", "SchlossDist", "TurmbergDist"];
const positions = [
    49.00927401131935, 8.403893297438733,
    49.013004654388766, 8.39966357828218,
    49.01523252064477, 8.344084445965663,
    49.01260189828333, 8.412250082247098,
    49.00100675877579, 8.384558169451196,
    49.036919899265406, 8.303444341143475,
    49.00457310877466, 8.426524603074725,
    49.0131014133627, 8.4043295523524,
    48.996914024725626, 8.48536739549212
];

let elements = ["elem1", "elem2", "elem3", "elem4", "elem5", "elem6", "elem7", "elem8", "elem9"]


function init() {
    getLocation();
}


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(calcDistances, showPosError);
    } else {
        document.getElementById("locationWarning").innerHTML = '<div class="alert alert-warning alert-dismissible fade in"> ' +
            '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> ' +
            '<strong> Warning! </strong>Geolocation is not supported by this browser.</div>'
    }
}

function showPosError(error) {
    if (error.code == error.PERMISSION_DENIED) {
        document.getElementById("locationWarning").innerHTML = '<div class="alert alert-warning alert-dismissible fade in"> ' +
            '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> ' +
            '<strong> Warning! </strong>In order to see the distances, the location must be released.</div>'
    } else if (error.code == error.TIMEOUT) {
        document.getElementById("locationWarning").innerHTML = '<div class="alert alert-warning alert-dismissible fade in"> ' +
            '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> ' +
            '<strong> Warning! </strong> Geolocation Timeout.</div>'
    } else if (error.code == error.UNKNOWN_ERROR) {
        document.getElementById("locationWarning").innerHTML = '<div class="alert alert-warning alert-dismissible fade in"> ' +
            '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> ' +
            '<strong> Warning! </strong>UNKNOWN_ERROR.</div>'
    }
}


//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function calcDistances(position) {
    let aktLat = position.coords.latitude;
    let aktLon = position.coords.longitude;
    let distanceList = [];

    for (let i = 0; i < distances.length; i++) {
        const R = 6371; // km
        let dLat = toRad(positions[2 * i] - aktLat);
        let dLon = toRad(positions[2 * i + 1] - aktLon);
        let lat1 = toRad(aktLat);
        let lat2 = toRad(positions[2 * i]);

        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c;

        document.getElementById(distances[i]).innerHTML = "&#x1F4CD; " + d.toFixed(2) + " km";
        distanceList.push(d);
    }

    calculateOrder(distanceList)

}

// Converts numeric degrees to radians
function toRad(Value) {
    return Value * Math.PI / 180;
}

function sortElements(sortedList) {
    let gallery = document.getElementById("gallery")

    for (let i = 1; i < elements.length; i++) {
        let elem1 = document.getElementById(sortedList[i])
        let elem2 = document.getElementById(sortedList[elements.length])
        gallery.insertBefore(elem1, elem2);
    }
}

function calculateOrder(distanceList) {
    let orderedList = elements.copyWithin(elements.length);
    orderedList.sort((a, b) => {
        let indexA = elements.indexOf(a);
        let indexB = elements.indexOf(b);
        return distanceList[indexA] - distanceList[indexB]
    })
    sortElements(orderedList)


}