import React from 'react';
import { Button } from 'react-bootstrap';

interface ErrorProps {
  tryAgain: () => void;
}

export const Error = ({ tryAgain }: ErrorProps) => (
  <div className="d-block text-center text-danger">
    <h3>
      <strong>An error has ocurred</strong>
    </h3>
    <br />
    <Button variant="outline-danger" onClick={tryAgain}>
      try again
    </Button>
  </div>
);
