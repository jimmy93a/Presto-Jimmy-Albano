
let navbar = document.querySelector("#navbar");
let links = document.querySelectorAll(".nav-link");
let logoNavbar = document.querySelector("#logoNavbar");
let lightsaber = document.querySelector("#lightsaber");
let collapse = document.querySelector("#collapse");

let check = false;

window.addEventListener("scroll", function() {
    
    let scrolled = window.scrollY;
    
    if (scrolled > 0) {
        
        navbar.classList.remove("bg-black");
        navbar.classList.add("bg-yellow");        
        collapse.classList.remove("bg-black");
        collapse.classList.add("bg-yellow");
        navbar.style.height = "80px";
        links.forEach(link => {
            link.style.color = "var(--black)";
        });
        logoNavbar.src = "./media/logo-b.png";
        lightsaber.src = "./media/lightsaber-b.png";
    }else {
        navbar.classList.remove("bg-yellow");
        navbar.classList.add("bg-black");
        collapse.classList.remove("bg-yellow");
        collapse.classList.add("bg-black");
        navbar.style.height = "70px";
        links.forEach(link => {
            link.style.color = "var(--yellow)";
        });
        logoNavbar.src = "./media/logo-y.png";
        lightsaber.src = "./media/lightsaber-y.png";
    }
    
});

lightsaber.addEventListener("click", () => {
    
    if(check == false){
        lightsaber.style.transform = "rotate(-90deg)";
        check = true;
    } else {
        lightsaber.style.transform = "rotate(0)";
        check = false;
    }
    
});

// Chiamata Asincrona per ottenere i dati dei numeri incrementali   
// setInterval(): crea un ciclo infinito in cui possiamo gestire la durata delle singole interazioni
// clerInterval(): interrompe il ciclo infinito creato da setInterval()
// Intersection Observer: osserva un elemento e quando entra in viewport esegue una funzione
// new: keyword per creare un nuovo oggetto, in questo caso un nuovo IntersectionObserver
// setTimeout(): esegue una funzione dopo un determinato intervallo di tempo


let firstNumber = document.querySelector("#firstNumber");
let secondNumber = document.querySelector("#secondNumber");
let thirdNumber = document.querySelector("#thirdNumber");   

let confirm = true;



function createInterval(n, element, time) {
    let counter = 0;
    let interval = setInterval(()=> {
        if (counter < n) {
            counter++;
            element.innerHTML = counter;
        }else {
            clearInterval(interval);
        }
    }, time);
    
    setTimeout(()=> {
        confirm = true;
    }, 8000);
    
};



let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry)=> {
        if(entry.isIntersecting && confirm) {
            createInterval(1000, firstNumber, 1);
            createInterval(500, secondNumber, 1);
            createInterval(200, thirdNumber, 1);    
            confirm = false;
        };
    });
    
});

observer.observe(firstNumber);

let reviews = [
    {user: 'John Doe', description: 'Great service!', rank: 5},
    {user: 'Jane Smith', description: 'Very satisfied!', rank: 4},
    {user: 'Mike Johnson', description: 'Could be better.', rank: 3},
    {user: 'Emily Davis', description: 'Excellent experience!', rank: 5},
    {user: 'David Wilson', description: 'Not what I expected.', rank: 2}
]

let swiperWrapper = document.querySelector(".swiper-wrapper");

// repeat(): metodo che permette di ripetere una stringa un numero specifico di volte, così facendo otteniamo già il nostro risutato.
// ${'<i class="fa-solid fa-star"></i>'.repeat(recensione.rank)}

reviews.forEach((recensione) => {
    let div = document.createElement("div");
    div.classList.add("swiper-slide");
    div.innerHTML = `
        <div class="card-review">
            <p class="lead text-center">${recensione.description}</p>
            <p class="h4 text-center">${recensione.user}</p>
            <div class="d-flex justify-content-center star">
    
            </div>
        </div>
    `;
    swiperWrapper.appendChild(div);
});

let stars = document.querySelectorAll('.star');

stars.forEach((star, index) => {
    for(let i = 1; i <= reviews[index].rank; i++) {
        let icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-star");
        star.appendChild(icon);
    }
    
    let difference = 5 - reviews[index].rank;
    
    for(let i = 1; i <= difference; i++) {
        let icon = document.createElement("i");
        icon.classList.add("fa-regular", "fa-star");
        star.appendChild(icon);
    };
    
    
});


// swiper
// .swiper nelle parentesi è come se stessimo scrivendo document.querySelector('.swiper') e stiamo selezionando l'elemento con la classe swiper
const swiper = new Swiper('.swiper', {
    // Optional parameters
        effect: 'flip',
        grabCursor: true,
        direction: 'horizontal',
        loop: true,
        

        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    });