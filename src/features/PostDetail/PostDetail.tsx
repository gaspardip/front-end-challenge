import { selectCurrentPost } from 'app/selectors';
import { Error } from 'components/Error';
import { Spinner } from 'components/Spinner';
import { useCancellableSWR } from 'hooks/useCancellableSWR';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RedditPostDetail } from 'typings';
import { redditURL } from 'utils';

export const PostDetail = () => {
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
      children: [
        {
          data: { url, title }
        }
      ]
    }
  } = postListing;

  return (
    <Container fluid>
      <Row>
        <Col xs="6" className="mx-auto">
          <h5 className="text-center">{title}</h5>
          <hr />
          <img src={url} className="img-fluid" alt={title} />
        </Col>
      </Row>
    </Container>
  );
};

const NoCurrentPost = styled.h2`
  text-align: center;
`;
