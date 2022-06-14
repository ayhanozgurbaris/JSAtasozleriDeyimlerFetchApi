const result = document.getElementById("result");
const searchBox = document.getElementById("searchBox");
const searchList = document.getElementById("searchList");


const keywords = [];
const proverbs = [];

loadResults();

async function loadResults(){
    const serverResponse=await fetch('https://sozluk.gov.tr/atasozu');
    let datas=await serverResponse.json();
    console.log(datas);

    datas.forEach(element => {
        keywords.push(element.key);
        proverbs.push(element.sozum);
    });
    
    const unitedWords = [...new Set(keywords)];
    console.log(unitedWords);

    unitedWords.sort(() => Math.random() -0.5)
    let counter = 0;
    unitedWords.forEach(element => {
        if (counter<5) {
            const newSuggestion = document.createElement("option");
            searchList.appendChild(newSuggestion);
            newSuggestion.value = element;
        }

        counter++;
    });

}


searchBox.addEventListener("input",(e) => resultlarFiltrele(e.target.value));

function resultlarFiltrele(searchedWord){
    result.innerHTML="";
    const searchCriteria = new RegExp(searchedWord,"gi");
    let matched = proverbs.filter(soz => searchCriteria.test(soz));

    if (searchedWord.length === 0 ) {
        matched = [];
    }

    //console.log(matched);
    matched.forEach(es =>{
        const nextresult = document.createElement("li");
        result.appendChild(nextresult);
        nextresult.innerHTML = es;
    })
}