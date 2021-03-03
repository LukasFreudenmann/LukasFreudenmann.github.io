window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.getElementById("header").style.height = "33%";
        document.getElementById("header-text").style.fontSize = "24px";
    } else {
        document.getElementById("header").style.height = "50%";
        document.getElementById("header-text").style.fontSize = "48px";
    }
}