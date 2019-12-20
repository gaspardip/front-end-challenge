import { RootState } from 'app/rootReducer';
import { selectPostWasViewed } from 'app/selectors';
import { viewPost } from 'app/viewedPostsSlice';
import defaultImage from 'assets/default.png';
import ArrowDown from 'bootstrap-icons/icons/arrow-down.svg';
import ArrowUp from 'bootstrap-icons/icons/arrow-up.svg';
import { WrapIf } from 'components/WrapIf';
import React from 'react';
import { Badge, Col, Media, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RedditPost } from 'typings';
import { formatK, formatPostCreationDate } from 'utils';

interface PostListItemProps {
  post: RedditPost;
}

const defaultThumbnails = ['default', 'self', 'nsfw'];

export const PostListItem = ({
  post: {
    id,
    title,
    thumbnail,
    author,
    created_utc,
    num_comments,
    score,
    url,
    subreddit_name_prefixed,
    permalink
  }
}: PostListItemProps) => {
  const dispatch = useDispatch();

  const viewed = useSelector<RootState, boolean>(state =>
    selectPostWasViewed(state, id)
  );

  const dispatchViewPost = () => {
    dispatch(viewPost({ id, permalink }));
  };

  const hasDefaultThumb = defaultThumbnails.includes(thumbnail);
  const formattedScore = formatK(score);
  const formattedCreationDate = formatPostCreationDate(created_utc);
  const formattedNumComments = formatK(num_comments);

  return (
    <CustomMedia onClick={dispatchViewPost}>
      <Media.Body>
        <Row>
          <ColAuto>
            <Row>
              <Col>
                <img src={ArrowUp} width="24" height="24" alt="Arrow up" />
              </Col>
            </Row>
            <Row>
              <Col>{formattedScore}</Col>
            </Row>
            <Row>
              <Col>
                <img src={ArrowDown} width="24" height="24" alt="Arrow down" />
              </Col>
            </Row>
          </ColAuto>
          <ColAuto>
            <WrapIf
              condition={!hasDefaultThumb}
              renderWithWrapper={children => (
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              )}
            >
              <img
                width={64}
                height={64}
                className="mr-3"
                src={hasDefaultThumb ? defaultImage : thumbnail}
                alt={title}
              />
            </WrapIf>
          </ColAuto>
          <Col>
            <h5 className="mt-0 mb-1">
              {title}{' '}
              {!viewed && (
                <Badge variant="success" pill>
                  New
                </Badge>
              )}
            </h5>
            <StyledP>
              <strong>{subreddit_name_prefixed}</strong> - Posted by{' '}
              <a href={`https://reddit.com/u/${author}`}>u/{author}</a>{' '}
              {formattedCreationDate}
            </StyledP>
            <StyledP>{formattedNumComments} comments</StyledP>
          </Col>
        </Row>
      </Media.Body>
    </CustomMedia>
  );
};

const StyledP = styled.p`
  margin: 0;
`;

const ColAuto = styled.div.attrs(props => ({
  ...props,
  className: 'col-auto'
}))`
  padding-right: 0;
`;

const CustomMedia = styled.li.attrs(props => ({
  ...props,
  className: 'media border-bottom'
}))`
  cursor: pointer;
  padding: 5px 0;
  min-height: 75px;
`;
