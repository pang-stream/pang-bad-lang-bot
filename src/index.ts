/**
 * index.ts
 *
 * 비속어 검사 및 필터링 기능을 제공하는 함수형 모듈
 */

// 비속어 패턴 목록
const profanityPatterns: RegExp[] = [
  /((쌍|썅).{0,10}(놈|년))/,
  /(씨|시).{0,10}(벌|빨|발|바)/,
  /(병|븅).{0,10}(신|쉰|싄)/,
  /(좆|존|좃).{0,10}(같|되|는|나|돼)/,
  /(개|게).{0,10}(같|갓|새|세|쉐|끼)/,
  /(걸|느).{0,10}(레|금)/,
  /(꼬|꽂|고).{0,10}(추|츄)/,
  /(니|너).{0,10}(엄|엠|애|m|M)/,
  /(애|에).{0,10}(미)/,
  /(노).{0,10}(애미|앰|엠)/,
  /(섹|쎅).{0,10}(스|쓰)/,
  /(ㅅㅂ|ㅄ|ㄷㅊ)/,
  /(s|S)(e|E)(x|X)/,
  /(노|뇨|뉴|누|ㄴ).{0,10}(뮤|무|ㅁ|묘|묵).{0,10}(현|헌|ㅎ|휸|훅|훈)/,
  /(박|뱍|벽|봑|ㅂ).{0,10}(원|언|어|ㄴ).{0,10}(순|슌|수|ㄴ|슨|손)/,
  /(로|ㄹ|료).{0,10}(리|ㄹ)/,
  /(미|뮈|믜).{0,10}(친|췬|칀)/,
  /(니).{0,10}(미)/,
  /(박).{0,10}(원).{0,10}(순)/,
  /(형).{0,10}(수)/,
  /(운).{0,10}(지)/,
  /(좆).{0,10}(까)/,
  /(자|ㅈ).{0,10}(지|ㅈ)/,
  /(창|촹|쵸|챵|차|ㅊ).{0,10}(녀|냐|나)/,
  /(보|ㅂ).{0,10}(지|ㅈ)/,
  /(S|s|3).{0,10}(X|x)/,
  /(ㅂ|ㅃ).{0,10}(ㅜ|ㅠ)(ㅈ|ㅉ)/,
  /(ㄴ|ㄴ).{0,10}(ㅜ|ㅠ)(ㅈ|ㅉ)/,
  /(ㅈ|ㅉ).{0,10}(ㅏ|ㅑ)/,
  /(ㅈ|ㅉ).{0,10}(]|})/,
  /자지|꼴깝|새끼들|애미|짜식|빠굴|씹년|미친넘|18년|폐녀자|미틴|이놈|조센징|미시촌|주접|붕가|패티쉬|쳐먹|뒤질래|쉐리|호로자식|개좌식|뭥미|별창|망나니|딸딸이|니에미|좃|십새|싸보이다|미췬|씨댕|새꺄|쎅스|10세|상넘|꼰대|개놈|꼴갑|시벌탱|씨방새|발기|새끼|10새끼|꼴리|옘병|아구창|개좆|아갈|창녀|염병|포르노|미친놈|음탕|또라이|좃나|한남충|조지다|호로|후빨|조또|지랄|오지구|세끼|슨상님|병쉰|싸가지|빠큐|엠생|시궁창|꼬라지|우라질|혼음|개빡|뒈진|멍청이|뒤진다|어미|듣보|꼴값|광녀|따먹기|양키|잡종|상놈|넌씨눈|떡치기|개년|꼬추|쎄엑|개지랄|18|시부랄|느개비|오짐|보지|부랄|고인물|찌질|정박아|뒤질|개쓰래기|좇같|후려|시키|육갑|씹새|씝창|호모|조온나|씨파|쉬발|십세|병자|게새끼|개새끼|시부럴|개시키|개민폐|쓰발|sex|눈알|뽄세|씹새기|씨팔|앰창|놈|개수작|아가리|무뇌|오진다|창놈|좆같|병맛|로리타|그년|씨부럴|저능아|쌔끈|주뎅이|토끼다|대가리|씹팔|디졌|대갈|엠창|트롤|개씹|썅넘|오졌|갈보|씨발|시발|개자식|극혐|개같은|개짱|미친색|기레기|남혐|야설|이새끼|10창|18놈|섹스|씨불|성인체위|십팔|벌레|빠가|운지|빙신|개돼지|장애인|씹창|썩을|꼬붕|매국노|18새끼|발놈|와꾸|느금|허접|고추|미쳤니|노답|오져|같은년|좆까|돌았나|씨빨|새키|븅|좆만|존싫|사이코|십새끼|섹수|조까|시끼|변태새끼|늬미|열폭|년|쥐랄|잡놈|존버|꼴리다|충|자슥|모가지|씨벌탱|빠구리|니앰|싸가지없|쌍|개간|틀니|냄비|씨발년|시부리|쪽바리|저년|씨부랄|씹탱|즤랄|골빈|샹년|젖탱|메갈|시팔|씨빠|쌍년|싸물|싸대기|스트립|좆|씨볼|이씨|이년|이자식|오바|니미랄|새기|후레자식|호구|패드립|에로물|쌍욕|호로놈|5지구|벼엉|찐따|간나|등신|애자|개같이|쓰레기|5지네|니미|뻑큐|좇|개존|관종|빡촌|뒤져|좃밥|엿|귀두|좆나|개짜증|노무|놈현|개쩔|싸죠|씨부리|돌았네|개새|병신|씨바|양놈|쌍놈년|구라|머갈|불륜|성기|에로|년놈|창년|낯짝|자위|불알|썅년|멍텅|오지네|왜놈|아닥|짱깨|이새키|색끼|주뎅|딜도|대갈빡|정신병자|미친|한남|씨방|뻐큐|니미럴|사까시|존만한|꼴통|씨발놈|존나|홍어|좆나게|후장|섹|놈들|개새키|븽신|개소리|미치|면상|시댕|갈레|돌아이|닥쳐|개같|쌉|정사|쒸벌|고자|좃또|조빠|씹|썅제기랄|버러지|십창|딴년|꺼져|좇밥|뽄새|눈깔|쪼개|육봉|수간|틀딱|씹쉐|따까리|음란/
];
/**

 텍스트에 비속어가 포함되어 있는지 검사

 @param text 검사할 텍스트

 @returns 비속어 포함 여부
 */
export const containsProfanity = (text: string): boolean => {
  if (!text) return false;

  return profanityPatterns.some(pattern => pattern.test(text));
};

/**

 텍스트에서 비속어를 찾아 마스킹 처리

 @param text 검사할 텍스트

 @param maskChar 마스킹에 사용할 문자 (기본값: '*')

 @returns 비속어가 마스킹된 텍스트
  /
  export const maskProfanity = (text: string, maskChar: string = ''): string => {
  if (!text) return text;

  let maskedText = text;

  profanityPatterns.forEach(pattern => {
  maskedText = maskedText.replace(pattern, match => maskChar.repeat(match.length));
  });

  return maskedText;
  };

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

/**

 텍스트의 비속어 점수 계산 (비속어 개수에 따라 점수 부여)

 @param text 검사할 텍스트

 @returns 0-100 사이의 점수 (높을수록 비속어가 많음)
 */
export const calculateProfanityScore = (text: string): number => {
  if (!text) return 0;

  const profanities = findProfanities(text);
  const wordCount = text.split(/\s+/).length || 1;

  const score = Math.min(100, Math.round((profanities.length / wordCount) * 100) * 2);

  return score;
};

/**

 텍스트에서 비속어를 발견하면 전체 텍스트를 대체 메시지로 변경

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

/**

 사용자 정의 패턴 추가

 @param pattern 추가할 정규식 패턴
 */
export const addCustomPattern = (pattern: RegExp): void => {
  profanityPatterns.push(pattern);
};

export default {
  containsProfanity,
  findProfanities,
  calculateProfanityScore,
  replaceProfanity,
  addCustomPattern
};