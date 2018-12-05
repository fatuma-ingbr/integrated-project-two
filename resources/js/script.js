/*
* Menu slide
* ====================================
* */

function openNav() {
	document.getElementById("mySidenav").style.width = "250px";
	document.getElementById("main").style.marginLeft = "250px";
	document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
	document.getElementById("main").style.marginLeft= "0";
	document.body.style.backgroundColor = "white";
}

/*
* A function to toggle the mobile menu
* ====================================
* */
function toggle() {
    let element = $(".navbar");
    element.css("display", "block");
    let nav = element[0];
    if (nav.className === "navbar") {
        nav.className += " responsive";
    } else {
        nav.className = "navbar";
        element.css("display", "none");
    }
}

//Smooth scroll effect
$(function () {
    $("a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            let hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 500, function () {
                window.location.hash = hash;
            });
        }
    });
});

$("#water").ripples({
    // Image Url
    imageUrl: "img/heroimage1.jpeg",
    // The width and height of the WebGL texture to render to.
    // The larger this value, the smoother the rendering and the slower the ripples will propagate.
    resolution: 500,
    // The size (in pixels) of the drop that results by clicking or moving the mouse over the canvas.
    dropRadius: 20,
    // Basically the amount of refraction caused by a ripple.
    // 0 means there is no refraction.
    perturbance: 1,
    // Whether mouse clicks and mouse movement triggers the effect.
    interactive: true,
    // The crossOrigin attribute to use for the affected image.
    crossOrigin: "true"
});