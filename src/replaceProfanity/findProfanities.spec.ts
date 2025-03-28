import { addCustomPattern } from "../addCustomPattern";
import { replaceProfanity } from "./replaceProfanity";

describe('findProfanities', () => {
    beforeEach(() => {
        addCustomPattern(/(김|신).{0,10}(규|윤)/);
    });

    test('문장의 포함된 비속어를 감지후 대체 문자로 반환해야 합니다.', () => {
        expect(replaceProfanity("신지윤")).toBe("클린봇에 의해 검열되었습니다.");     
    });

    test('문장의 포함된 비속어를 감지후 지정된 대체 문자 반환해야 합니다.', () => {
        expect(replaceProfanity("김민규", "감지 되었습니다.")).toBe("감지 되었습니다.");
    });

    test('문장의 포함된 비속어가 감지되지 않았을 경우 원본 문자로 반환해야 합니다.', () => {
        expect(replaceProfanity("이상은")).toBe("이상은");
    });
});