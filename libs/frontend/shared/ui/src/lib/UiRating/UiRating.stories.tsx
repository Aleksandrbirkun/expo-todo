import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { UiRating } from './UiRating';

const meta: Meta<typeof UiRating> = {
  title: 'Components/Rating',
  component: UiRating,
  parameters: {
    controls: {
      include: ['value'],
    },
  },
} satisfies Meta<typeof UiRating>;

export default meta;

type Story = StoryObj<typeof UiRating>;

export const Default: Story = {
  render: () => {
    return (
      <div>
        Short <UiRating value={4} />
        Long <UiRating variant={'full'} value={4} />
      </div>
    );
  },
};
