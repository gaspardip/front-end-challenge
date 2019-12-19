import React, { FC } from 'react';
import useSWR, { useSWRPages } from 'swr';
import { Container, Row, Col, Media, Button, Card } from 'react-bootstrap';
import defaultImage from 'assets/default.png';
import styled from 'styled-components';
import { fromUnixTime, formatDistanceStrict } from 'date-fns';
import ArrowUp from 'bootstrap-icons/icons/arrow-up.svg';
import ArrowDown from 'bootstrap-icons/icons/arrow-down.svg';

const fetcher = (url: string) => fetch(url).then(r => r.json());
const baseURL = 'https://www.reddit.com/top.json';
const formatPostCreationDate = (ms: number) => {
  const now = Date.now();
  const created = fromUnixTime(ms);
  const distance = formatDistanceStrict(created, now, {
    roundingMethod: 'floor'
  });
  return `${distance} ago`;
};

const ColAuto = styled.div.attrs(props => ({
  ...props,
  className: 'col-auto'
}))`
  padding-right: 0;
`;

const formatK = (score: number) => `${(score / 1000).toFixed(1)}k`;

const CustomMedia = styled.li.attrs(props => ({
  ...props,
  className: 'media border-bottom'
}))`
  cursor: pointer;
  padding: 5px 0;
  min-height: 75px;
`;

export const App: FC = () => {
  const { pages, isLoadingMore, loadMore } = useSWRPages(
    'reddit',
    ({ offset, withSWR }) => {
      const searchParams = new URLSearchParams({
        limit: '50'
      });

      if (offset) searchParams.set('after', offset);

      const url = `${baseURL}?${searchParams.toString()}`;

      const { data } = withSWR(useSWR(url, fetcher, { refreshInterval: 0 })); // eslint-disable-line

      if (!data) return null;

      const {
        data: { children }
      } = data;

      return children.map(
        ({
          data: {
            id,
            title,
            thumbnail,
            author,
            created_utc,
            num_comments,
            score
          }
        }: any) => (
          <CustomMedia key={id}>
            <Media.Body>
              <Row>
                <ColAuto>
                  <Row>
                    <Col>
                      <img
                        src={ArrowUp}
                        width="24"
                        height="24"
                        alt="Arrow up"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>{formatK(score)}</Col>
                  </Row>

                  <Row>
                    <Col>
                      <img
                        src={ArrowDown}
                        width="24"
                        height="24"
                        alt="Arrow down"
                      />
                    </Col>
                  </Row>
                </ColAuto>
                <ColAuto>
                  <img
                    width={64}
                    height={64}
                    className="mr-3"
                    src={
                      ['default', 'self', 'nsfw'].includes(thumbnail)
                        ? defaultImage
                        : thumbnail
                    }
                    alt={title}
                  />
                </ColAuto>
                <Col>
                  <h5 className="mt-0 mb-1">{title}</h5>
                  <p>
                    Posted by{' '}
                    <a href={`https://reddit.com/u/${author}`}>u/{author}</a>{' '}
                    {formatPostCreationDate(created_utc)}
                  </p>
                  <p>{formatK(num_comments)} comments</p>
                </Col>
              </Row>
            </Media.Body>
          </CustomMedia>
        )
      );
    },
    SWR => SWR.data.data.after,
    []
  );

  return (
    <Container className="p-3" fluid>
      <Card>
        <Card.Body>
          <Row>
            <Col className="border-right">
              <ul className="list-unstyled">{pages}</ul>
              <Button onClick={loadMore} disabled={isLoadingMore} block>
                Load more
              </Button>
            </Col>
            <Col>Post content</Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};
