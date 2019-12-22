import { PostDetail } from 'features/PostDetail';
import { PostList } from 'features/PostList';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export const App = () => (
  <Container className="p-3" fluid>
    <Row>
      <Col xs={6}>
        <PostList />
      </Col>
      <Col xs={6}>
        <PostDetail />
      </Col>
    </Row>
  </Container>
);
