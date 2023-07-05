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
