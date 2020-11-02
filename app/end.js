
const saveScoreBtn = document.getElementbyID('saveScoreBtn');
const finalScore = document.getElementbyID('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
});


saveHighScore = () => {
    console.log
    e.preventDefault();
};