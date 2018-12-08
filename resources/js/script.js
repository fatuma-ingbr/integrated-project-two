/*
* Authors slide
* ====================================
* */

$(document).ready(function(){
    $("#testimonial-slider").owlCarousel({
        items:3,
        itemsDesktop:[1000,3],
        itemsDesktopSmall:[979,2],
        itemsTablet:[768,2],
        itemsMobile:[650,1],
        pagination:true,
        autoPlay:true
    });
});


/*
* Menu slide
* ====================================
* */

function openNav() {
	document.getElementById("mySidenav").style.width = "250px";
	document.getElementById("main").style.marginLeft = "250px";
	document.getElementById("main").style.padding = "1%";
	document.getElementById("water").style.height = "95vh";


    $("#water").ripples('hide');
}

function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
	document.getElementById("main").style.marginLeft= "0";
	document.getElementById("main").style.padding= "0";
    document.getElementById("water").style.height = "100vh";
    document.body.style.backgroundColor = "white";
    $("#water").ripples('show');

}

$("#water").ripples({
    // Image Url
    imageUrl: "resources/css/img/world5.jpg",
    // The width and height of the WebGL texture to render to.
    // The larger this value, the smoother the rendering and the slower the ripples will propagate.
    resolution: 700,
    // The size (in pixels) of the drop that results by clicking or moving the mouse over the canvas.
    dropRadius: 20,
    // Basically the amount of refraction caused by a ripple.
    // 0 means there is no refraction.
    perturbance: 0.002,
    // Whether mouse clicks and mouse movement triggers the effect.
    interactive: true,
    // The crossOrigin attribute to use for the affected image.
    crossOrigin: "true"
});

$(".aboutus-water").ripples({
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