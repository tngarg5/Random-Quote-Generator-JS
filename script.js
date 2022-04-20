//variables for linking to .html
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const author = document.getElementById('author');
const twitterBtn = document.getElementById('twitter-button');
const NewQuoteBtn = document.getElementById('quote-container');
const loader = document.getElementById('loader');

//before start loading happens so loadder is visible and on complete its hidden
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}
// we will use a global variable of any type as we may not know how much data will be returned from the api. its an array
let apiQuotes = [];
// get quotes from api
// we have started with async function which is asychronous and works with await.

//show new quote
function newQuote() 
{   
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    console.log(quote); // actually need to map these values
    //checking for the author values if null or not and change to unknown in that case
    if(!quote.author){
        author.textContent = 'Unknown'; 
    }
    else{
        author.textContent = quote.author;
    }
       
       // for long quotes will apply .long-quote from css 1. check quote length
       if(quote.text.length> 50 ){
           quoteText.classList.add('long-quote'); // add css class using classlist and add
       }
       else{
        quoteText.classList.remove('long-quote'); // remove that css class
       }
       quoteText.textContent = quote.text;  // quote value displayed now
       complete(); //hide load after quote appears, its very fast
}
async function getQuotes(){
    loading();
    // using  const for apiURL as it would not change
    const apiURL = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json(); // convert the api(in json form) to array 
        console.log(apiQuotes); // will show all the quotes in the array that are being pulled
        console.log(apiQuotes[12]); // will show 13th quote only
        // we need a random number instead of 12
        newQuote();
    } catch (error) {
        //no error handling at the moment
        //catch error here
    }

}

//twitter button function
function tweetQuote()
{
    const twitterURL= `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`; // ?- for query , ${} -for adding values to it and dash(-)will appear as it is in form of text
    window.open(twitterURL, '_blank');  //this underscore blank allows to open url in new tab
}

//Event listeners
twitterBtn.addEventListener('click', tweetQuote);
NewQuoteBtn.addEventListener('click', newQuote);
//we want to run this function as soon as the page loads
getQuotes();