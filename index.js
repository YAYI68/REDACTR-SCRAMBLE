const contentArea = document.querySelector(".contentArea");
const word = document.querySelector(".word");
const symbol = document.querySelector(".symbol");
const form = document.querySelector("form");
const loader = document.querySelector(".custom-loader");
const bgOverLay = document.querySelector(".overlay");
const copyWord = document.querySelector(".copyWord");
const copyBtn = document.querySelector(".copyBtn");
const cancelBtn = document.querySelector(".cancelBtn");
const notify = document.querySelector(".alert");
const wordScanned = document.querySelector(".word_scanned");
const wordScramb = document.querySelector(".word_scramb");
const characterScramb = document.querySelector(".character_scramb");
const notFoundAlert = document.querySelector(".notFound");

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  let textArea = contentArea?.value;
  let redartWords = word?.value;
  let redartList = redartWords.trim().split(" ");
  const sym = symbol?.value;
  const contentArray = textArea.trim().split(" ");

  if (!redartWords || !textArea) {
    console.log({ redartWords, textArea });
    notify?.classList.remove("hidden");
    notify.textContent = "Sorry, Please fill all the required field";
    return;
  }
  loader?.classList.remove("hidden");

  let { content, totalCharacterScrambs, totalWordScrambs } = scrambWord(
    redartList,
    contentArray,
    sym
  );
  // console.log({ totalCharacterScrambs, totalWordScrambs });
  copyWord.textContent = content.join(" ");
  wordScanned.textContent = content.length;
  wordScramb.textContent = totalWordScrambs;
  characterScramb.textContent = totalCharacterScrambs;

  if (content.length === contentArray.length) {
    if (content.join(" ").includes(sym)) {
      notFoundAlert?.classList.add("hidden");
    } else {
      notFoundAlert?.classList.remove("hidden");
    }
    setTimeout(() => {
      loader?.classList.add("hidden");
      bgOverLay?.classList.remove("hidden");
    }, 1000);
  }
});

cancelBtn?.addEventListener("click", () => {
  bgOverLay?.classList.add("hidden");
});

const scrambWord = (redart, allWord, sym) => {
  let totalCharacterScrambs = 0;
  let totalWordScrambs = 0;
  let content = [];
  for (let i = 0; i < allWord.length; i++) {
    let word = allWord[i];
    if (redart.includes(word)) {
      content.push(sym.repeat(word.length));
      totalCharacterScrambs += word.length;
      totalWordScrambs += 1;
    } else {
      content.push(word);
    }
  }
  return { content, totalCharacterScrambs, totalWordScrambs };
};
