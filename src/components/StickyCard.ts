import { Card } from 'react-bootstrap';
import styled from 'styled-components';

export const StickyCard = styled(Card)`
  position: sticky;
  top: 10px;
  margin-bottom: 10px;
  z-index: 5;
`;
