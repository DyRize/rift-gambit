import type { Meta, StoryObj } from '@storybook/react';
import ExampleButton from '@atoms/examples/buttons/example-button/ExampleButton';

const meta: Meta<typeof ExampleButton> = {
  title: 'Atoms/Buttons/ExampleButton',
  component: ExampleButton,
  parameters: {
    layout: 'centered',
    background: {
      grid: true,
    },
  },
};

export default meta;

export const _ExampleButton: StoryObj<typeof ExampleButton> = {
  render: () => <ExampleButton>Example Button</ExampleButton>,
};
