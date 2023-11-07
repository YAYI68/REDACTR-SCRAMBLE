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
const totalTime = document.querySelector(".total_time");
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
  const startTime = new Date();
  const content = getNewContent(textArea, redartList, sym);
  const { totalScanned, totalCharacterScramb } = getStat(textArea, redartList);
  const endTime = new Date();
  const timeDifference = (endTime - startTime) / 1000;
  copyWord.textContent = content;
  wordScanned.textContent = content.length;
  wordScramb.textContent = totalScanned;
  characterScramb.textContent = totalCharacterScramb;
  totalTime.textContent = `${timeDifference} secs`;

  if (content.includes(sym)) {
    notFoundAlert?.classList.add("hidden");
  } else {
    notFoundAlert?.classList.remove("hidden");
  }

  setTimeout(() => {
    loader?.classList.add("hidden");
    bgOverLay?.classList.remove("hidden");
  }, 1000);
});

cancelBtn?.addEventListener("click", () => {
  bgOverLay?.classList.add("hidden");
});

const getNewContent = (text, redartList, sym) => {
  let content = text;
  for (let redart of redartList) {
    let newContent = content.replaceAll(redart, sym.repeat(redart.length));
    content = newContent;
  }
  return content;
};

const getStat = (textArea, redartList) => {
  const contentList = textArea.split(" ");
  let totalScanned = 0;
  let totalCharacterScramb = 0;

  for (let word of contentList) {
    for (let redart of redartList) {
      if (word.includes(redart)) {
        totalScanned += 1;
        totalCharacterScramb += redart.length;
      }
    }
  }
  return { totalScanned, totalCharacterScramb };
};
