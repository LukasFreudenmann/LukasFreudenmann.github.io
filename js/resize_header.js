window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.getElementById("header-text").style.fontSize = "24px";
        document.getElementById("header-text2").style.fontSize = "14px";
    } else {
        document.getElementById("header-text").style.fontSize = "48px";
        document.getElementById("header-text2").style.fontSize = "20px";
    }
}