import { addCustomPattern } from "../addCustomPattern";
import { findProfanities } from "./findProfanities";

describe('findProfanities', () => {
    beforeEach(() => {
        addCustomPattern(/(김|신).{0,10}(규|윤)/);
    });

    test('문장의 포함된 비속어를 감지후 목록으로 반환해야 합니다.', () => {
        expect(findProfanities("신지윤")).toEqual(["신지윤", "신", "윤"]);     
    });

    test('문장의 포함된 비속어를 감지후 목록으로 반환해야 합니다.', () => {
        expect(findProfanities("김민규")).toEqual(["김민규", "김", "규"]);
    });

    test('문장의 포함된 비속어를 감지 되지 않았을 경우 빈 배열로 반환해야 합니다.', () => {
        expect(findProfanities("이상은")).toEqual([]);
    });
});