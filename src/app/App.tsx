import { PostDetail } from 'features/PostDetail';
import { PostList } from 'features/PostList';
import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

export const App = () => (
  <Container className="p-3" fluid>
    <Card>
      <Card.Body>
        <Row>
          <Col className="border-right">
            <PostList />
          </Col>
          <Col>
            <PostDetail />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  </Container>
);
