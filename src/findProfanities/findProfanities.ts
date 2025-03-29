import { profanityPatterns } from "../_internal/constants";

/**

  텍스트에서 발견된 비속어 목록 반환

 @param text 검사할 텍스트

 @returns 발견된 비속어 목록
 */

export const findProfanities = (text: string): string[] => {
    if (!text) return [];

    const foundProfanities: string[] = [];

    profanityPatterns.forEach(pattern => {
        const matches = text.match(pattern);
        if (matches) {
        foundProfanities.push(...matches);
        }
    });

    return [...new Set(foundProfanities)];
};