import { selectCurrentPost } from 'app/selectors';
import React from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import useSWR from 'swr';
import { RedditPostDetail } from 'typings';
import { fetcher, redditURL } from 'utils';

export const PostDetail = () => {
  const currentPost = useSelector(selectCurrentPost);
  const { data, error } = useSWR<RedditPostDetail>(
    currentPost ? `${redditURL}${currentPost}.json` : null,
    fetcher,
    { refreshInterval: 0 }
  );

  if (!currentPost) {
    return <NoCurrentPost>Select a post to view details</NoCurrentPost>;
  }

  if (!data) {
    return <Spinner animation="border" className="d-block mx-auto" />;
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
