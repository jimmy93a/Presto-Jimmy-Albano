// .json: JavaScript Object Notification
// fetch(): chiamata asincrona che ci permette di collegarci ad un json e da esso estrarne il dato sotto forma di promise.
// .then(): permette di convertire la Promise nel dato struttrale e di poterlo utilizzare su js



// API: chiavi che ci permettono di raggiungere un .json online

// 1. fecth(): collego al Json e ne ottengo una Promise
// 2. .then(): converto la Promise in un dato strutturale JS
// 3. .then(): utilizzare il dato ottenuto

// .json(): metodo delle promise che mi permette di convertirla in oggetto JS


fetch('./annunci.json').then((response)=> response.json() ).then((data)=>{

    data.sort((a, b)=> a.price - b.price);
    
    let radioWrapper = document.querySelector('#radioWrapper');
    let cardWrapper = document.querySelector('#cardWrapper');

    
    function radioCreate(){
        
        let categories = data.map((annuncio)=> annuncio.category);
        
        // let uniqueCategories = [];
        
        // categories.forEach((category)=> {
            //     if(!uniqueCategories.includes(category)){
        //         uniqueCategories.push(category)
        //     }
        // });
        
        // Set(): Classe che mi restituisce, partendo da un array, un nuovo oggetto di tipo Set il quale contiene solo valori univoci
        // Array.from(): mi permette di convertire un array-like in un array
        
        let uniqueCategories = Array.from(new Set(categories));
        
        uniqueCategories.forEach((category)=>{
            let div = document.createElement('div');

            div.classList.add('from-check');
            div.innerHTML = `
                <input class="form-check-input" type="radio" name="categories" id="${category}">
                <label class="form-check-label" for="${category}">
                    ${category}
                </label>
            
            `;
            radioWrapper.appendChild(div);
        });
        
        
        
        
    };
    
    radioCreate();

    function truncateWord(string){
        if(string.length > 13){
            return string.split(' ')[0] + '...';
        }else{
            return string;
        };
    };


    function showCards(array) {

        cardWrapper.innerHTML = '';
        array.forEach((annuncio, i)=>{
            let div = document.createElement('div');
            div.classList.add('card-custom');
            div.innerHTML = `
                <img src = "https://picsum.photos/${300 + i}" alt="Immagine casuale" class = "img-fluid img-card"
                <p class="h2" title="${annuncio.name}">${truncateWord(annuncio.name)}</p>
                <p class="h4">${annuncio.category}</p>
                <p>${annuncio.price}€</p>
            
            `;
            cardWrapper.appendChild(div);
        });
    };
    showCards(data);

    let radioButtons = document.querySelectorAll('.form-check-input');

    function filterByCategory(array){
        // In questa funzione ho bisogno di ottenere un nuovo array partendo da data e gli elementi del nuovo array dovranno soddisfare la condizione per la quale la loro category sia uguale alla categoria che stiamo passando alla funzione

        // La categoria voglio trovarla partendo da una lista di tutti i bottoni e usare il metodo .find() sull'array su questa lista. La condizione da utilizzare è il bottone che possiede l'attributo checked

        let categoria = Array.from(radioButtons).find((button)=> button.checked).id;
  


        if(categoria != 'All'){
            let filtered = array.filter((annuncio)=> annuncio.category == categoria);
            return filtered;
        }else{
            return array;
        };

    };



    radioButtons.forEach((button)=>{
        button.addEventListener('click', ()=> {

            setPriceInput();

            globalFilter();
        });
    });

    let priceInput = document.querySelector('#priceInput');
    let priceValue = document.querySelector('#priceValue');


    // Funzione del filtro del prezzo

    function setPriceInput(){
        // Dopo aver catturato l'input, voglio settare come proprietà max dello stesso il valore più alto tra i price di ogni prodotto. Per farlo avrò bisogno di un array che contenga solo i prezzi, a quel punto lo ordino in maniera crescente/decrescente e prendermi l'elemento con il valore più alto. Questa funzione ovviamente funziona solo al caricamento della pagina.
        

        let prices = filterByCategory(data).map((annuncio)=> +annuncio.price);
        prices.sort((a, b)=> a-b);
        let maxPrice = Math.ceil(prices.pop());
        priceInput.max = maxPrice;
        priceInput.value = maxPrice;
        priceValue.innerHTML = maxPrice;
    };


    setPriceInput();
    

    function filterByPrice(array){
        let filtered = array.filter( (annuncio)=> +annuncio.price <= priceInput.value);
        return filtered;
    };

    priceInput.addEventListener('input', ()=>{
        priceValue.innerHTML = priceInput.value;
        globalFilter();
    });

    let wordInput = document.querySelector('#wordInput');

    // Ricordati che toLowerCase viene usato per rendere minuscolo tutto
    function filterByWord(array){
        let filtered = array.filter((annuncio)=> annuncio.name.toLowerCase().includes(wordInput.value.toLowerCase()));
        return filtered;
    };

    wordInput.addEventListener('input', ()=> {
    globalFilter();

    });


    // Quello di cui abbiamo bisogno è che ad ogni evento scattino tutte e tre le funzioni di filtro ma non siano applicate tutte e tre sull'array data, bensì siano concatenate ed ognuna filtri il risultato della funzione di filtro precedente 

    function globalFilter(){
        let filteredByCategory = filterByCategory(data);
        let filterdedByPrice = filterByPrice(filteredByCategory);
        let filteredByWord = filterByWord(filterdedByPrice);

        showCards(filteredByWord);
    };
});
