import { containsProfanity } from "../containsProfanity/containsProfanity";

/**

 텍스트에서 비속어가 발견되면 대체 메시지로 변경 됩니다.

 @param text 검사할 텍스트

 @param replacement 대체할 텍스트 (기본값: '클린봇에 의해 검열되었습니다.')

 @returns 비속어가 있을 경우 대체 메시지, 없을 경우 원본 텍스트
 */

export const replaceProfanity = (text: string, replacement: string = '클린봇에 의해 검열되었습니다.'): string => {
    if (!text) return text;

    if (containsProfanity(text)) {
        return replacement;
    }

    return text;
};