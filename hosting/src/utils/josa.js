import josa from 'josa-js';

export const formatKeywordInKorean = keyword => {
  const code = keyword.charCodeAt(keyword.length - 1) - 44032;
  if (code < 0 || code > 11171) return `"${keyword}" 은(는)`;
  return `"${keyword}" ${josa.c(keyword, '은/는')}`;
};
