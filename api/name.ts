import type { VercelRequest, VercelResponse } from "@vercel/node";
import fetch from "node-fetch";

const RAPID_API_HOST = "wordsapiv1.p.rapidapi.com";

const POSSIBLE = [
  ["adverb", "verb", "noun"],
  ["verb", "adjective", "noun"],
  ["adjective", "verb", "noun"],
];

async function makeWordsCall(part: string, startsWith: string) {
  const url = new URL("/words/", `https://${RAPID_API_HOST}`);

  url.searchParams.append("partOfSpeech", part);
  url.searchParams.append("letterPattern", `^${startsWith}\\w+$`);
  url.searchParams.append("random", "true");

  const res = await fetch(url, {
    headers: {
      "x-rapidapi-key": process.env.WORDS_API_KEY,
      "x-rapidapi-host": RAPID_API_HOST,
      Accept: "application/json",
    },
  });

  const data: { word: string } = await res.json();

  return data.word;
}

async function name(req: VercelRequest, res: VercelResponse) {
  const [first, second, third] = POSSIBLE[
    Math.floor(Math.random() * POSSIBLE.length)
  ];

  const parts = await Promise.all([
    makeWordsCall(first, "f"),
    makeWordsCall(second, "k"),
    makeWordsCall(third, "j"),
  ]);

  res.json({ parts });
}

export default name;
