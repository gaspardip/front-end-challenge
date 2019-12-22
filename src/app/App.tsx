import { PostDetail } from 'features/PostDetail';
import { PostList } from 'features/PostList';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export const App = () => (
  <Container className="p-3" fluid>
    <Row>
      <Col lg={6} xs={12} className="mb-4">
        <PostList />
      </Col>
      <Col lg={6} xs={12}>
        <PostDetail />
      </Col>
    </Row>
  </Container>
);
