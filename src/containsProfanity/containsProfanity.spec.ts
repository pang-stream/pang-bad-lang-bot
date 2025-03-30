import { addCustomPattern } from "../addCustomPattern";
import { containsProfanity } from "../containsProfanity";

describe('containsProfanity', () => {
    beforeEach(() => {
        addCustomPattern(/(김|신).{0,10}(규|윤)/);
    });

    test('추가된 패턴 신지윤을 감지해야 한다', () => {
        expect(containsProfanity("신지윤")).toBe(true);
    });

    test('추가된 패턴 김민규을 감지해야 한다', () => {
        expect(containsProfanity("김민규")).toBe(true);
    });

    test('추가되지 않은 패턴 이상은은 감지되지 않아야 한다', () => {
        expect(containsProfanity("이상은")).toBe(false);
    });
});