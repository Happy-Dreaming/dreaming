const isLengthInRange = (str: string, minLength: number, maxLength: number) => {
  return str.length >= minLength && str.length <= maxLength;
};

const toKoreanTimeStamp = (date: Date) => {
  return date.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
};

export { isLengthInRange, toKoreanTimeStamp };
