
let navbar = document.querySelector("#navbar");
let links = document.querySelectorAll(".nav-link");
let logoNavbar = document.querySelector("#logoNavbar");

window.addEventListener("scroll", function() {

    let scrolled = window.scrollY;

    if (scrolled > 0) {

        navbar.classList.remove("bg-black");
        navbar.classList.add("bg-yellow");
        navbar.style.height = "80px";
        links.forEach(link => {
            link.style.color = "var(--black)";
        });
        logoNavbar.src = "./media/logo-b.png";
    }else {
        navbar.classList.remove("bg-yellow");
        navbar.classList.add("bg-black");
        navbar.style.height = "70px";
        links.forEach(link => {
            link.style.color = "var(--yellow)";
        });
        logoNavbar.src = "./media/logo-y.png";
    }

});