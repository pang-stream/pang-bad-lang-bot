import { profanityPatterns } from "../_internal/constants";

/**
 * 주어진 정규식 패턴을 감지 내용에 추가합니다.
 * @param pattern 정규식 패턴을 입력합니다.
 */
export const addCustomPattern = (pattern: RegExp): void => {
    profanityPatterns.push(pattern);
};
  