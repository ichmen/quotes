import React, { useEffect, useState } from "react";
import "./index.scss";
import { getQuote } from "../../gateway/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faTumblr } from "@fortawesome/free-brands-svg-icons";

export default function Quote() {
  const [quote, setQuote] = useState<any | null>(null);
  useEffect(() => {
    fetchQuote();
  }, []);
  const fetchQuote = async () => {
    const result = await getQuote();
    setQuote(result);
  };
  console.log(quote);
  if (!quote) {
    return null;
  }
  const randomColor = `rgb(${Math.random() * 150 + 50},${
    Math.random() * 150 + 50
  },${Math.random() * 150 + 50})`.toString();
  const backgroundColor = { backgroundColor: randomColor };
  const color = { color: randomColor };

  return (
    <div className="screen" style={backgroundColor}>
      <div className="quote" id="quote-box">
        <span className="quote__text" id="text" style={color}>
          <FontAwesomeIcon
            className="qoute__icon"
            icon={faQuoteLeft}
            size={"xl"}
          />
          {quote.quote}
        </span>
        <span
          className="quote__author"
          id="author"
          style={color}
        >{`--${quote.author}`}</span>
        <div className="buttons">
          <div className="buttons__social">
            <a
              href={`https:twitter.com/intent/tweet?text=${quote.quote}`}
              target="_blank"
              rel="noreferrer"
              id="tweet-quote"
            >
              <button style={backgroundColor} className="buttons__social-btn">
                <FontAwesomeIcon icon={faTwitter} />
              </button>
            </a>
            <a
              href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=${quote.author}&content=${quote.quote}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`}
              target="_blank"
              rel="noreferrer"
            >
              <button style={backgroundColor} className="buttons__social-btn">
                <FontAwesomeIcon icon={faTumblr} />
              </button>
            </a>
          </div>
          <div className="new-quote">
            <button onClick={fetchQuote} style={backgroundColor} id="new-quote">
              New quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
