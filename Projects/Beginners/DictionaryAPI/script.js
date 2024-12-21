const form = document.querySelector('form');
const result = document.querySelector('.result');
const example = document.querySelector('.example');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log(form.elements[0].value); //getting whatever i enter in the input
    getWordInfo(form.elements[0].value);
})

const getWordInfo = async (word) => {
// console.log(word); to see the word searched

//keeping all the below code in try catch block to give result if shit is searched
try {
    if (!word.trim()) {
        result.innerHTML = "<h3>Please enter a word to search.</h3>";
        return;
    }
    result.innerHTML = `Fetching data..........`
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

    const data = await response.json();
    let definitions = data[0].meanings[0].definitions[0];

    result.innerHTML = `

    <h2>Word:</h2>
    <h3>${data[0].word}</h3>

    <br/>

    <h2>Part Of Speech:</h2>
    <h3>${data[0].meanings[0].partOfSpeech}</h3>

    <br/>

    <h2>Definition:</h2>
    <h3>${definitions.definition}</h3>

    <br/>

    <h2>Example:</h2>
    <h3>${definitions.example === undefined ? "No Example Available" : definitions.example}</h3>

    <br/>

    <h2>Antonyms:</h2>
     <h3>${definitions.antonyms.length === 0?"No Antonym Available":definitions.antonyms}</h3>
    `


            //writing Antonym in another way
// if(definitions.antonyms.length === 0){
//     result.innerHTML += `<h3>No Antonyms found</h3>`;
// }   else{
//     for(let i=0;i<definitions.antonyms.length;i++){
//         result.innerHTML += `<li>${definitions.antonyms}</li>`;
//     }
// }

                // Adding Read More Button/link

    result.innerHTML += `
    <pre>

    
<div><a href="${data[0].sourceUrls}" target="_blank" rel="noopener noreferrer">Read More</a></div>
    </pre>        
    `
    console.log(data);   // to see the data when submitted the form

}   catch (error) {
    result.innerHTML = `<h3>sorry no shit like this word is found</h3>`;
}

}


