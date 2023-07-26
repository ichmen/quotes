import React, { useEffect, useReducer } from "react";
import "./index.scss";
import { getQuote, translate } from "../../gateway/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faTumblr } from "@fortawesome/free-brands-svg-icons";

export default function Quote() {
  const defaultState = {
    quote: null,
    author: null,
    baseQuote: null,
    translatedQuote: null,
    isTranslated: false,
  };

  const [state, setState] = useReducer(
    (state: any, newState: any) => ({
      ...state,
      ...newState,
    }),
    defaultState
  );
  async function handleTranslate() {
    let translatedQuote = state.translatedQuote;
    if (!translatedQuote) {
      translatedQuote = await translate(state.baseQuote.quote);
    }
    setState({
      translatedQuote,
      isTranslated: !state.isTranslated,
      quote: state.isTranslated ? state.baseQuote.quote : translatedQuote,
    });
  }

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      fetchQuote();
    }

    return () => {
      ignore = true;
    };
  }, []);
  const fetchQuote = async () => {
    const quote = await getQuote();
    setState({
      quote: quote?.quote,
      author: quote?.author,
      baseQuote: quote,
      translatedQuote: null,
      isTranslated: false,
    });
  };

  if (!state.quote) {
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
          {state.quote}
        </span>
        <span
          className="quote__author"
          id="author"
          style={color}
        >{`--${state.author}`}</span>
        <div className="buttons">
          <div className="buttons__social">
            <a
              href={`https://twitter.com/intent/tweet?text=${state.quote}`}
              target="_blank"
              rel="noreferrer"
              id="tweet-quote"
            >
              <button style={backgroundColor} className="buttons__social-btn">
                <FontAwesomeIcon icon={faTwitter} />
              </button>
            </a>
            <a
              href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=${state.author}&content=${state.quote}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`}
              target="_blank"
              rel="noreferrer"
            >
              <button style={backgroundColor} className="buttons__social-btn">
                <FontAwesomeIcon icon={faTumblr} />
              </button>
            </a>
          </div>
          <div className="new-quote">
            <button
              onClick={() => handleTranslate()}
              className="translate"
              style={backgroundColor}
            >
              Translate
            </button>
            <button
              onClick={() => fetchQuote()}
              style={backgroundColor}
              id="new-quote"
            >
              New quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
