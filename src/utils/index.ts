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

export const formatK = (score: number) => `${(score / 1000).toFixed(1)}k`;
