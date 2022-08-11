const resultDiv = document.querySelector(".result");
const wordEle = document.querySelector("#word");
const phonetics = document.querySelector(".phonetics");
const audio = document.querySelector("audio");
const wordMeaning = document.querySelector(".word-definition");
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";





const handle = async (e) => {
    if (e.keyCode == 13) {
        const word = e.target.value;
        // make a request to the api
        const result = await fetch(url + word);

        resultDiv.style.display = "block";
        const data = await result.json();
        if (result.ok) {

            document.querySelectorAll(".wordmeaning")[0].style.removeProperty("display");
            document.querySelectorAll(".wordmeaning")[1].style.removeProperty("display");
            phonetics.style.removeProperty("display");
            audio.style.removeProperty("display");
            wordEle.innerText = data[0].word;
            phonetics.innerText = data[0].phonetics[0].text;
            audio.src = data[0].phonetics[0].audio;
            wordMeaning.innerText = data[0].meanings[0].definitions[0].definition;
            const synonymsArray = data[0].meanings[0].definitions[0].synonyms;
            let synonymsData = "";
            if (synonymsArray.length) {
                for (let i = 0; i < synonymsArray.length; i++) {
                    synonymsData += `<p class="pills">${synonymsArray[i]}</p>`

                    //example
                    // data = data + 1;
                    // data += 1;
                }

            }
            else {
                synonymsData = `<p class="pills">No Synonyms Available</p>`;
            }
            document.querySelector(".synonyms").innerHTML = synonymsData;
        } else {
            audio.style.display = "none";
            wordEle.innerText = data.title;
            document.querySelectorAll(".wordmeaning")[0].style.display = "none";
            document.querySelectorAll(".wordmeaning")[1].style.display = "none";
            phonetics.style.display = "none";
            wordMeaning.innerText = data.message;
            document.querySelector(".synonyms").style.display = "none";
        }




    }
}