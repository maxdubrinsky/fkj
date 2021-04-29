import type { VercelRequest, VercelResponse } from "@vercel/node";
import fetch from "node-fetch";

async function makeWordsCall(part: string, startsWith: string) {
  const url = new URL("/words/", "https://wordsapiv1.p.rapidapi.com");

  url.searchParams.append("partOfSpeech", part);
  url.searchParams.append("letterPattern", `^${startsWith}\\w+$`);
  url.searchParams.append("random", "true");

  const res = await fetch(url, {
    headers: {
      "x-rapidapi-key": process.env.WORDS_API_KEY,
      "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
      Accept: "application/json",
    },
  });

  const data: { word: string } = await res.json();

  return data.word;
}

async function name(req: VercelRequest, res: VercelResponse) {
  const [adverb, verb, noun] = await Promise.all([
    makeWordsCall("adverb", "f"),
    makeWordsCall("verb", "k"),
    makeWordsCall("noun", "j"),
  ]);

  res.json({ adverb, verb, noun });
}

export default name;
