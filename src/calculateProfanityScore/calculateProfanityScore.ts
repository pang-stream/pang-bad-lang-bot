/**

 텍스트의 비속어 점수 계산 (비속어 개수에 따라 점수 부여)

 @param text 검사할 텍스트

 @returns 0-100 사이의 점수 (높을수록 비속어가 많음)
 */
export const calculateProfanityScore = (text: string): number => {
    if (!text) return 0;

    const profanities = (text);
    const wordCount = text.split(/\s+/).length || 1;

    const score = Math.min(100, Math.round((profanities.length / wordCount) * 100) * 2);

    return score;
};