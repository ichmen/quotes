import axios from "axios";
export async function getQuote() {
  const options = {
    method: "GET",
    url: "https://api.api-ninjas.com/v1/quotes",

    headers: {
      "X-API-Key": "d5kdE7Zog9YbbtppYE0TiA==4JcZLUeyH3pIQdSD",
    },
  };

  try {
    const response = await axios.request(options);
    const { quote, author } = response.data[0];

    return {
      quote,
      author,
    };
  } catch (error) {
    console.error(error);
  }
}
export async function translate(quote: string) {
  const sentancesArray = quote.match(/[^.!?]+[.!?]+|[^.!?]+[.!?]*$/g);

  const translated: string[] = [];
  if (!sentancesArray) return "";
  for (const sentance of sentancesArray) {
    if (sentance) {
      const translatedSentance = await translateSentance(sentance.trim());
      translated.push(translatedSentance);
    }
  }

  return translated.join(" ");
}

async function translateSentance(sentance: string) {
  const url = "https://translate.googleapis.com/translate_a/single";
  const params = {
    client: "gtx",
    sl: "en",
    tl: "uk",
    dt: "t",
    q: sentance,
  };
  const response = await axios.get(url, { params });
  console.log(response.data[0][0][0]);
  return response.data[0][0][0];
}
