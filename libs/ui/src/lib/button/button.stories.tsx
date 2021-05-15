import { text } from '@storybook/addon-knobs';
import React from 'react';
import { Button, ButtonProps } from './button';

export default {
  component: Button,
  title: 'Button',
};

export const primary = () => {
  const props: ButtonProps = {
      content: text('content', '')
  };

  return <Button content={props.content} />;
};
