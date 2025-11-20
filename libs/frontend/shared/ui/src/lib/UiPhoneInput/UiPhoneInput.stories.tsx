import { Meta, StoryObj } from '@storybook/react';

import { UiPhoneInput } from './UiPhoneInput';

const meta: Meta<typeof UiPhoneInput> = {
  title: 'Components/PhoneInput',
  component: UiPhoneInput,
} satisfies Meta<typeof UiPhoneInput>;

export default meta;

type Story = StoryObj<typeof UiPhoneInput>;

export const Default: Story = {
  args: {
    label: 'Phone Input',
    onChange: (e) => console.log(e),
    onChangePhoneCountryCode: (e) => console.log(e),
  },
};
