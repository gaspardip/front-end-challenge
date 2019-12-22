import { dismissPost } from 'app/redux/dismissiblePostsSlice';
import { RootState } from 'app/redux/rootReducer';
import { selectPostState } from 'app/redux/selectors';
import { viewPost } from 'app/redux/viewedPostsSlice';
import defaultImage from 'assets/default.png';
import ArrowDown from 'bootstrap-icons/icons/arrow-down.svg';
import ArrowUp from 'bootstrap-icons/icons/arrow-up.svg';
import { ReactComponent as Trash } from 'bootstrap-icons/icons/trash.svg';
import classnames from 'classnames';
import { AuthorLink } from 'components/AuthorLink';
import { WrapIf } from 'components/WrapIf';
import { AnimatePresence, motion } from 'framer-motion';
import React, { forwardRef } from 'react';
import { Badge, Button, Col, Media, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RedditPost } from 'typings';
import { formatK, formatPostCreationDate } from 'utils';

interface PostListItemProps {
  post: RedditPost;
}

const defaultThumbnails = ['default', 'self', 'nsfw', 'spoiler'];

export const PostListItem = forwardRef<HTMLLIElement, PostListItemProps>(
  (
    {
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
        permalink,
        post_hint
      }
    }: PostListItemProps,
    ref
  ) => {
    const dispatch = useDispatch();

    const { viewed, dismissed } = useSelector((state: RootState) =>
      selectPostState(state, id)
    );

    const dispatchViewPost = () => {
      dispatch(viewPost({ id, permalink }));
    };

    const handleDismiss = (e: Event) => {
      e.stopPropagation();
      dispatch(dismissPost(id));
    };

    const hasDefaultThumb = defaultThumbnails.includes(thumbnail);
    const formattedScore = formatK(score);
    const formattedCreationDate = formatPostCreationDate(created_utc);
    const formattedNumComments = formatK(num_comments);

    return (
      <AnimatePresence>
        {!dismissed && (
          <CustomMedia
            onClick={dispatchViewPost}
            ref={ref}
            variants={{
              visible: { opacity: 1, height: 'auto' },
              hidden: { opacity: 0, height: 0 }
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <CustomMediaBody>
              <Row>
                <ColAuto className="pr-0">
                  <Row>
                    <Col>
                      <img
                        src={ArrowUp}
                        width="24"
                        height="24"
                        alt="Arrow up"
                        className="d-block mx-auto"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <span className="d-block mx-auto">{formattedScore}</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <img
                        src={ArrowDown}
                        width="24"
                        height="24"
                        alt="Arrow down"
                        className="d-block mx-auto"
                      />
                    </Col>
                  </Row>
                </ColAuto>
                <ColAuto className="pr-0">
                  <WrapIf
                    condition={!hasDefaultThumb && post_hint === 'image'}
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
                    <AuthorLink author={author} /> {formattedCreationDate}
                  </StyledP>
                  <StyledP>{formattedNumComments} comments</StyledP>
                </Col>
                <ColAuto>
                  <TrashButton
                    type="button"
                    variant="outline-danger"
                    onClick={handleDismiss}
                  >
                    <Trash />
                  </TrashButton>
                </ColAuto>
              </Row>
            </CustomMediaBody>
          </CustomMedia>
        )}
      </AnimatePresence>
    );
  }
);

const TrashButton = styled(Button)`
  color: #dc3545;

  &:hover {
    color: #fff;
  }
`;

const StyledP = styled.p`
  margin: 0;
`;

const ColAuto = styled.div.attrs(props => ({
  ...props,
  className: classnames(props.className, 'col-auto my-auto')
}))``;

const CustomMedia = styled(motion.li).attrs(props => ({
  ...props,
  className: 'media'
}))`
  cursor: pointer;

  &:not(:last-child) {
    border-bottom: 1px solid #dee2e6 !important;
  }
`;

const CustomMediaBody = styled(Media.Body)`
  min-height: 75px;
  padding: 5px 0;
`;
