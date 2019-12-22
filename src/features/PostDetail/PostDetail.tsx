import { selectCurrentPost } from 'app/redux/selectors';
import { AuthorLink } from 'components/AuthorLink';
import { Error } from 'components/Error';
import { Spinner } from 'components/Spinner';
import { StickyCard } from 'components/StickyCard';
import { useCancellableSWR } from 'hooks/useCancellableSWR';
import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RedditPost, RedditPostDetail } from 'typings';
import { decodeHTML, formatK, redditURL } from 'utils';

export const PostDetail = () => (
  <StickyCard>
    <Card.Body>
      <PostDetailWrapped />
    </Card.Body>
  </StickyCard>
);

const PostDetailWrapped = () => {
  const currentPost = useSelector(selectCurrentPost);
  const { data, error, revalidate } = useCancellableSWR<RedditPostDetail>(
    currentPost ? `${redditURL}${currentPost}.json` : null
  );

  if (!currentPost) {
    return <NoCurrentPost>Select a post to view details</NoCurrentPost>;
  }

  if (error) {
    return <Error tryAgain={revalidate} />;
  }

  if (!data) {
    return <Spinner />;
  }

  const [postListing, commentsListing] = data;

  const {
    data: {
      children: [{ data: post }]
    }
  } = postListing;

  const { title, subreddit_name_prefixed, author, num_comments } = post;

  const someCommenters = commentsListing.data.children
    .slice(0, 3)
    .map((x, i) => (
      <>
        <AuthorLink author={x.data.author} />
        {i < 2 ? ', ' : ''}
      </>
    ));

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col xs="7" className="text-center">
          <h6>
            <strong>{subreddit_name_prefixed}</strong>- Posted by {author}
          </h6>
          <hr />
          <h5>{title}</h5>
          <hr />
          <PostDetailContent post={post} />
          <hr />
          <strong>{formatK(num_comments)}</strong> comments from{' '}
          {someCommenters} and more users!
        </Col>
      </Row>
    </Container>
  );
};

interface PostDetailContentProps {
  post: RedditPost;
}

const PostDetailContent = ({
  post: { post_hint, title, url, secure_media, media, selftext }
}: PostDetailContentProps) => {
  switch (post_hint) {
    case 'image':
      return <img src={url} className="img-fluid" alt={title} />;

    case 'hosted:video':
      return (
        <video controls autoPlay loop>
          <source
            src={secure_media.reddit_video.fallback_url}
            type="video/mp4"
          />
        </video>
      );

    case 'rich:video':
      return (
        <div
          dangerouslySetInnerHTML={{ __html: decodeHTML(media.oembed.html) }}
        />
      );

    default:
      return <>{selftext && <p>{selftext}</p>}</>;
  }
};

const NoCurrentPost = styled.h2`
  text-align: center;
`;
