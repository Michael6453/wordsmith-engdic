const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    var typedWord = document.getElementById("text-holder").value;
    fetch(`${url}${typedWord}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        result.innerHTML = `
        <div class="example">
                    <h3>${typedWord}</h3>
                    <button onclick="playSound()">
                        <i class="fa fa-volume-up" aria-hidden="true"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p id="transcribe">/${data[0].phonetic}/</p>
                </div>
                <div class="meaning">
                    <p id="word-meaning">${data[0].meanings[0].definitions[0].definition}</p>
                    <p id="word-sentence"><span id="dot">...</span>${data[0].meanings[0].definitions[0].example || ""}</p>
                </div>`;
                sound.setAttribute("src", `https:${data[0].phonetics[0].audio}`);

    })
    .catch (() => {
        result.innerHTML = `<h5 class="err">Couldn't Find The Word</h5>`
    })
});
function playSound() {
    sound.play();
}

