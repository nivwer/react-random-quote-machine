import React, { useEffect, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

const colors = [
  "#000000",
  "#181818",
  "#2e2e2e",
  "#424242",
  "#575757",
  "#6e6e6e",
  "#868686",
  "#9d9d9d",
  "#3e3e3e",
  "#313131",
  "#111111",
];

const getRandomIndex = (length) => Math.floor(length * Math.random());

function Machine() {
  const [quotesData, setQuotesData] = useState(null);
  const [currentQuote, setCurrentQuote] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState(colors[0]);
  const [textColor, setTextColor] = useState(colors[0]);

  const fetchQuotes = async () => {
    const response = await fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json",
      {
        headers: { Accept: "application/json" },
      }
    );
    const jsonQuotes = await response.json();
    setQuotesData(jsonQuotes.quotes);
  };

  const getQuote = () => {
    if (!quotesData) return;

    const randomIndex = getRandomIndex(quotesData.length);
    const randomQuote = quotesData[randomIndex];

    setCurrentQuote(randomQuote);

    const randomColorIndex = getRandomIndex(colors.length);
    setBackgroundColor(colors[randomColorIndex]);
    setTextColor(colors[randomColorIndex]);
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  useEffect(() => {
    if (quotesData) {
      getQuote();
    }
  }, [quotesData]);

  return (
    <>
      <div
        id="wrapper"
        className="background"
        style={{ backgroundColor, color: textColor }}
      >
        <div className="container">
          <div
            id="quote-box"
            className="quote-box shadow-lg"
            data-aos="zoom-out"
          >
            <SwitchTransition>
              <CSSTransition
                classNames="fade"
                key={currentQuote?.quote}
                addEndListener={(node, done) =>
                  node.addEventListener("transitionend", done, false)
                }
              >
                <div className="quote-text text-center">
                  <i className="bi bi-chat-right-quote-fill"></i>
                  <span id="text">{currentQuote?.quote}</span>
                </div>
              </CSSTransition>
            </SwitchTransition>

            <SwitchTransition>
              <CSSTransition
                classNames="fade"
                key={currentQuote?.author}
                addEndListener={(node, done) =>
                  node.addEventListener("transitionend", done, false)
                }
              >
                <div className="quote-author text-end">
                  <span id="author">- {currentQuote?.author}</span>
                </div>
              </CSSTransition>
            </SwitchTransition>

            <div className="buttons">
              <a
                className="button button-tweet_quote"
                id="tweet-quote"
                title="Tweet this quote!"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://twitter.com/intent/tweet?hashtags=quotes&amp;text=${encodeURIComponent(
                  `"${currentQuote?.quote}" ${currentQuote?.author}`
                )}`}
                style={{ backgroundColor }}
              >
                <i className="bi bi-twitter"></i>
              </a>
              <button
                className="button button-new_quote"
                id="new-quote"
                onClick={getQuote}
                style={{ backgroundColor }}
              >
                New quote
              </button>
            </div>
          </div>
          <div className="footer text-center" data-aos="zoom-out">
            {" "}
            <a
              href="https://codepen.io/nivwer"
              target="_blank"
              rel="noopener noreferrer"
            >
              by nivwer
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Machine;
