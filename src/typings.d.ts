interface RedditContent {
  author: string;
  created_utc: number;
  id: string;
  permalink: string;
  score: number;
  subreddit_name_prefixed: string;
}

export interface RedditPost extends RedditContent {
  title: string;
  thumbnail: 'nsfw' | 'default' | 'self' | string;
  num_comments: number;
  url: string;
  post_hint: string;
  selftext: string;
  domain: string;
  preview?: {
    reddit_video_preview?: {
      fallback_url: string;
    };
  };
  secure_media?: {
    reddit_video?: {
      fallback_url: string;
    };
  };
  media: {
    oembed: {
      html: string;
    };
  };
}

export interface ReddtiComment extends RedditContent {
  body: string;
}

interface RedditListing<T> {
  kind: 'Listing';
  data: {
    modhash: string;
    dist: number | null;
    children: { kind: string; data: T }[];
    after: string | null;
    before: string | null;
  };
}

export type RedditPostListing = RedditListing<RedditPost>;
export type RedditCommentListing = RedditListing<ReddtiComment>;
export type RedditPostDetail = [RedditPostListing, RedditCommentListing];
