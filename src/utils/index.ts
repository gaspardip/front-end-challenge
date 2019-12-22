import { formatDistanceStrict, fromUnixTime } from 'date-fns';

export const redditURL = 'https://www.reddit.com';
export const topURL = `${redditURL}/top.json`;

export const formatPostCreationDate = (ms: number) => {
  const now = Date.now();
  const created = fromUnixTime(ms);
  const distance = formatDistanceStrict(created, now, {
    roundingMethod: 'floor'
  });
  return `${distance} ago`;
};

export const formatK = (score: number) =>
  score > 1000 ? `${(score / 1000).toFixed(1)}k` : score.toString();

export const decodeHTML = (html: string) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

export const getScrollTop = () =>
  Math.max(
    window.pageYOffset,
    document.documentElement.scrollTop,
    document.body.scrollTop
  );

export const isInViewportFromTop = (elem: HTMLElement) => {
  const bounding = elem.getBoundingClientRect();

  return bounding.top >= 0;
};
