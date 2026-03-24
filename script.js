let wordList = [];
let currentIndex = 0;
let currentRoma = '';
let charIndex = 0;

const kanjiDisplay = document.getElementById('kanji');
const wordDisplay = document.getElementById('word');

async function loadWords() {
    const response = await fetch('words.json');
    wordList = await response.json();
    setWord();
}

function setWord() {
    // ランダムに1つのペアを選ぶ
    const pair = wordList[Math.floor(Math.random() * wordList.length)];
    
    kanjiDisplay.textContent = pair.kanji; // 漢字を表示
    currentRoma = pair.roma;               // 判定にはローマ字を使う
    charIndex = 0;
    wordDisplay.textContent = currentRoma;
}

window.addEventListener('keydown', (e) => {
    if (e.key === currentRoma[charIndex]) {
        charIndex++;
        if (charIndex === currentRoma.length) {
            setWord();
        } else {
            // 打った文字を「_」にする演出
            wordDisplay.textContent = '_'.repeat(charIndex) + currentRoma.substring(charIndex);
        }
    }
});

loadWords();