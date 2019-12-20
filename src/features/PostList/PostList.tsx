import { Error } from 'components/Error';
import { Spinner } from 'components/Spinner';
import { PostListItem } from 'features/PostList';
import { useCancellableSWR } from 'hooks/useCancellableSWR';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useSWRPages } from 'swr';
import { RedditPostListing } from 'typings';
import { topURL } from 'utils';

const searchParams = new URLSearchParams({
  limit: '50'
});

export const PostList = () => {
  const { pages, isLoadingMore, loadMore } = useSWRPages<
    string | null,
    RedditPostListing
  >(
    'reddit',
    ({ offset, withSWR }) => {
      if (offset) {
        searchParams.set('after', offset);
      }

      const url = `${topURL}?${searchParams.toString()}`;

      const { data, error, revalidate } = withSWR(useCancellableSWR(url)); // eslint-disable-line

      if (error) {
        return <Error tryAgain={revalidate} />;
      }

      if (!data) {
        return <Spinner />;
      }

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
