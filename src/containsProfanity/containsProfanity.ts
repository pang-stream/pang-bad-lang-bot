import { profanityPatterns } from "../_internal/constants";

/**

 텍스트에 비속어가 포함되어 있는지 검사

 @param text 검사할 텍스트

 @returns 비속어 포함 여부
 */
export const containsProfanity = (text: string): boolean => {
  if (!text) return false;

  return profanityPatterns.some(pattern => pattern.test(text));
};
  