import { VercelRequest, VercelResponse } from "@vercel/node";
import fetch from "node-fetch";

async function makeWordsCall(part: string) {
  const res = await fetch(
    `https://wordsapiv1.p.mashape.com/words/?partOfSpeech=${part}&random=true`,
    {
      headers: {
        "X-Mashape-Key": process.env.WORDS_API_KEY,
        Accept: "application/json",
      },
    }
  );

  const data: { word: string } = await res.json();

  return data.word;
}

async function name(req: VercelRequest, res: VercelResponse) {
  const [adverb, verb, noun] = await Promise.all([
    makeWordsCall("adverb"),
    makeWordsCall("verb"),
    makeWordsCall("noun"),
  ]);

  res.json({ adverb, verb, noun });
}

export default name;
