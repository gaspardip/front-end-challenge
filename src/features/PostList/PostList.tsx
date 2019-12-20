import { PostListItem } from 'features/PostList';
import React from 'react';
import { Button } from 'react-bootstrap';
import useSWR, { useSWRPages } from 'swr';
import { RedditPostListing } from 'typings';
import { fetcher, topURL } from 'utils';

export const PostList = () => {
  const { pages, isLoadingMore, loadMore } = useSWRPages<
    string | null,
    RedditPostListing
  >(
    'reddit',
    ({ offset, withSWR }) => {
      const searchParams = new URLSearchParams({
        limit: '50'
      });

      if (offset) searchParams.set('after', offset);

      const url = `${topURL}?${searchParams.toString()}`;

      const { data } = withSWR(useSWR(url, fetcher, { refreshInterval: 0 })); // eslint-disable-line

      if (!data) return null;

      const {
        data: { children }
      } = data;

      return children.map(({ data: post }) => (
        <PostListItem post={post} key={post.id} />
      ));
    },
    SWR => SWR.data!.data.after,
    []
  );

  return (
    <>
      <ul className="list-unstyled">{pages}</ul>
      <Button onClick={loadMore} disabled={isLoadingMore} block>
        Load more
      </Button>
    </>
  );
};
