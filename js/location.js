var distances = ["MarktplatzDist", "BotatischerGartenDist", "RheinhafenDist", "LernzentrumDist", "ZKMDist",
    "RheinbrückeDist", "SchlossGottesaueDist", "SchlossDist", "TurmbergDist"];
var positions = [
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


function init() {
    getLocation();
}


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(calcDistances, showPosError);
    } else {
        document.getElementById("locationWarning").innerHTML = '<div class="alert alert-danger alert-dismissible fade show">' +
            '<strong>Warning!</strong> Geolocation is not supported by this browser.' +
            '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
            '</div>'

    }
}

function showPosError(error) {
    if (error.code == error.PERMISSION_DENIED) {
        document.getElementById("locationWarning").innerHTML = '<div class="alert alert-warning alert-dismissible fade show">' +
            '<strong>Warning!</strong> In order to see the distances, the location must be released.' +
            '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
            '</div>'
    } else if (error.code == error.TIMEOUT) {
        document.getElementById("locationWarning").innerHTML = '<div class="alert alert-warning alert-dismissible fade show">' +
            '<strong>Warning!</strong> Geolocation Timeout.' +
            '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
            '</div>'
    } else if (error.code == error.UNKNOWN_ERROR) {
        document.getElementById("locationWarning").innerHTML = '<div class="alert alert-warning alert-dismissible fade show">' +
            '<strong>Warning!</strong> UNKNOWN_ERROR.' +
            '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
            '</div>'
    }
}

function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function calcDistances(position) {
    var aktLat = position.coords.latitude;
    var aktLon = position.coords.longitude;

    for (i = 0; i < distances.length; i++) {
        var R = 6371; // km
        var dLat = toRad(positions[2 * i] - aktLat);
        var dLon = toRad(positions[2 * i + 1] - aktLon);
        var lat1 = toRad(aktLat);
        var lat2 = toRad(positions[2 * i]);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;

        document.getElementById(distances[i]).innerHTML = "&#x1F4CD; " + d.toFixed(2) + " km";
    }

}

// Converts numeric degrees to radians
function toRad(Value) {
    return Value * Math.PI / 180;
}