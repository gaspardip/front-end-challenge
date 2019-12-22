import {
  addDismissiblePosts,
  dismissAll
} from 'app/redux/dismissiblePostsSlice';
import { Error } from 'components/Error';
import { Spinner } from 'components/Spinner';
import { StickyCard } from 'components/StickyCard';
import { PostListItem } from 'features/PostList';
import { useCancellableSWR } from 'hooks/useCancellableSWR';
import { usePrevious } from 'hooks/usePrevious';
import React, { useEffect, useRef } from 'react';
import { Button, ButtonGroup, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useSWRPages } from 'swr';
import { RedditPostListing } from 'typings';
import { topURL } from 'utils';

const searchParams = new URLSearchParams({
  limit: '50'
});

const pageKey = 'redditTop';

export const PostList = () => {
  const dispatch = useDispatch();
  const listItemRef = useRef<HTMLLIElement>(null);
  const { pages, isLoadingMore, loadMore } = useSWRPages<
    string | null,
    RedditPostListing
  >(
    pageKey,
    ({ offset, withSWR }) => {
      if (offset) {
        searchParams.set('after', offset);
      }

      const url = `${topURL}?${searchParams.toString()}`;

      const { data, error, revalidate } = withSWR(
        // eslint-disable-next-line
        useCancellableSWR(url, {
          onSuccess: ({ data: { children } }) => {
            const ids = children.map(({ data: { id } }) => id);
            dispatch(addDismissiblePosts(ids));
          }
        })
      );

      if (error) {
        return <Error tryAgain={revalidate} />;
      }

      if (!data) {
        return <Spinner />;
      }

      const {
        data: { children }
      } = data;

      const [first, ...rest] = children;

      return (
        <>
          <PostListItem post={first.data} ref={listItemRef} />
          {rest.map(({ data: post }) => (
            <PostListItem post={post} key={post.id} />
          ))}
        </>
      );
    },
    SWR => SWR.data!.data.after,
    []
  );

  const previousLoadingMore = usePrevious(isLoadingMore);

  useEffect(() => {
    if (!isLoadingMore && previousLoadingMore) {
      listItemRef.current?.previousElementSibling?.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, [isLoadingMore, previousLoadingMore]);

  const handleDismissAll = () => {
    dispatch(dismissAll());
  };

  return (
    <>
      <StickyCard>
        <Card.Body>
          <StickyButtonGroup>
            <Button onClick={loadMore} disabled={isLoadingMore}>
              Load more (+50)
            </Button>
            <Button onClick={handleDismissAll} variant="danger">
              Dismiss all
            </Button>
          </StickyButtonGroup>
        </Card.Body>
      </StickyCard>
      <Card>
        <Card.Body>
          <ul className="list-unstyled border-top m-0">{pages}</ul>
        </Card.Body>
      </Card>
    </>
  );
};

const StickyButtonGroup = styled(ButtonGroup)`
  display: flex;
`;
