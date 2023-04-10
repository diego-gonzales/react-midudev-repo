import { FromLanguage, Language } from "../types.d";

export async function translate(
  text: string,
  fromLanguage: FromLanguage,
  toLanguage: Language
): Promise<string> {
  const randomNumber = Math.floor(Math.random() * 1000);
  const textInverted = text.split("").reverse().join("");
  const textWithRandomNumber = `${textInverted} ${randomNumber}`;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(textWithRandomNumber);
    }, 1000);
  });
}
