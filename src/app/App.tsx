import Observer from '@researchgate/react-intersection-observer';
import { PostDetail } from 'features/PostDetail';
import { PostList } from 'features/PostList';
import { usePrevious } from 'hooks/usePrevious';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectCurrentPost } from './redux/selectors';

export const App = () => {
  const colRef = useRef<HTMLDivElement>(null);
  const [isViewingColumn, setIsViewingColumn] = useState(false);
  const currentPost = useSelector(selectCurrentPost);
  const previousCurrentPost = usePrevious(currentPost);

  useEffect(() => {
    if (currentPost === previousCurrentPost || isViewingColumn) return;

    colRef.current?.lastElementChild?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [currentPost, previousCurrentPost, isViewingColumn]);

  const handleIntersection = (e: IntersectionObserverEntry) => {
    setIsViewingColumn(e.isIntersecting);
  };

  return (
    <Container className="p-3" fluid>
      <Row>
        <Col lg={6} xs={12} className="mb-4">
          <PostList />
        </Col>
        <Observer threshold={0} onChange={handleIntersection}>
          <Col lg={6} xs={12} ref={colRef as any}>
            <PostDetail />
          </Col>
        </Observer>
      </Row>
    </Container>
  );
};
