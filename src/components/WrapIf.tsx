import { ReactElement } from 'react';

interface WrapIfProps {
  condition: boolean;
  renderWithWrapper: (children: ReactElement) => ReactElement;
  children: ReactElement;
}

export const WrapIf = ({
  condition,
  renderWithWrapper,
  children
}: WrapIfProps) => (condition ? renderWithWrapper(children) : children);
