import josa from 'josa-js';

export const applyJosa = keyword => {
  const code = keyword.charCodeAt(keyword.length - 1);
  if (47 < code && code < 58) {
    const lastChar = keyword[keyword.length - 1];
    const stopConsonant = '13678';
    return stopConsonant.includes(lastChar)
      ? `"${keyword}" 은`
      : `"${keyword}" 는`;
  }
  if (code - 44032 < 0 || code - 44032 > 11171) return `"${keyword}" 은(는)`;
  return `"${keyword}" ${josa.c(keyword, '은/는')}`;
};
