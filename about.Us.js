let opener = document.querySelector('.opener');

let circle = document.querySelector('.circle');

let teachers = [
    {
        name: 'Matteo',
        description: 'Docente frontend di Hackademy', url: 'https://picsum.photos/300'
    },   
    {
        name: 'Marco',
        description: 'Docente frontend e responsabile di Hackademy', url: 'https://picsum.photos/301'
    },
    {
        name: 'Nicola',
        description: 'Docente frontend e noto sex-symbol', url: 'https://picsum.photos/302'
    },
    {
        name: 'Davide',
        description: 'Docente backend e giocatore di ruolo', url: 'https://picsum.photos/303'
    }
];

teachers.forEach((docente)=> {

    let div = document.createElement('div');
    div.classList.add('moved');
    div.style.backgroundImage = `url(${docente.url})`;
    circle.appendChild(div);
    

})

let movedDivs = document.querySelectorAll('.moved');

let check = false;
let flipCard = document.querySelector('.flip-card');



let cardWrapper = document.querySelector('#cardWrapper');

opener.addEventListener('click', ()=>{
    
    if (check == false) {
        opener.style.transform = 'rotate(45deg)';
        movedDivs.forEach((moved, i)=>{
            let angle = (360 * i) / movedDivs.length;
            moved.style.transform = `rotate(${angle}deg) translate(150px) rotate(-${angle}deg)`; 
        });
        check = true;

    }else{

        check = false;
        opener.style.transform = '';
        movedDivs.forEach((moved, i)=>{
            moved.style.transform = ``; 
        });

        cardWrapper.innerHTML = '';


    };
    
    
});

let cardName = document.querySelector('#cardName');
let cardDescription = document.querySelector('#cardDescription');


movedDivs.forEach((moved, i)=>{
    moved.addEventListener('click', ()=>{

        cardWrapper.innerHTML = '';
        let docente = teachers[i];
        let div = document.createElement('div');
        div.classList.add('flip-card');
        div.innerHTML = `
            <div class="inner">
                <div class="inner-face"></div>
                <div class="inner-back">
                    <p id="cardName" class="h4">${docente.name}</p>
                    <p id="cardDescription" class="lead">${docente.description}</p>
                </div>
            </div>
        `;

        cardWrapper.appendChild(div);



        let innerFace = document.querySelector('.inner-face');

        innerFace.style.backgroundImage = `url(${docente.url})`;


    });
});