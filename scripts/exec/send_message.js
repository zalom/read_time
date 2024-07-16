// This script is executed on the page and can manipulate the page content

// Wrap code in IIFE to prevent variable reassignment issues
(() => {
  const article = document.querySelector("article");

  // `document.querySelector` may return null if the selector doesn't match anything.
  if (article) {
    const text = article.textContent;
    const wordMatchRegExp = /[^\s]+/g; // Regular expression
    const words = text.matchAll(wordMatchRegExp);
    // matchAll returns an iterator, convert to array to get word count
    const wordCount = [...words].length;
    const readingTime = Math.round(wordCount / 200); // 200 words per minute

    chrome.runtime.sendMessage({badgeText: `${readingTime} min`});
  }
  else {
    chrome.runtime.sendMessage({badgeText: "n/a"});
  }
})();
