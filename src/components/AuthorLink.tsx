import React from 'react';

interface AuthorLinkProps {
  author: string;
}

export const AuthorLink = ({ author }: AuthorLinkProps) => (
  <a href={`https://reddit.com/u/${author}`}>u/{author}</a>
);
