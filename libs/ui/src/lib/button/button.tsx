import React from 'react';

import styled from '@emotion/styled';

export interface ButtonProps {
  content: string;
}

const StyledButton = styled.div`
  color: pink;
`;

export function Button(props: ButtonProps) {
  return (
    <StyledButton>
      <button>{props.content}</button>
    </StyledButton>
  );
}

export default Button;
