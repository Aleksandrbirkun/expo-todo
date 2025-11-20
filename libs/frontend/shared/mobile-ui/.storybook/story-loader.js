// Custom story loader for React Native
// This file manually imports all story files since require.context is not supported

// Import all stories
import AccordionStories from '../src/lib/Accordion/Accordion.stories';
import AvatarStories from '../src/lib/Avatar/Avatar.stories';
import ButtonStories from '../src/lib/Button/Button.stories';
import CheckboxStories from '../src/lib/Checkbox/Checkbox.stories';
import CountryInputStories from '../src/lib/CountryInput/CountryInput.stories';
import CurrencyInputStories from '../src/lib/CurrencyInput/CurrencyInput.stories';
import DatePickerStories from '../src/lib/DatePicker/DatePicker.stories';
import DateRangePickerStories from '../src/lib/DateRangePicker/DateRangePicker.stories';
import DaysSelectorStories from '../src/lib/DaysSelector/DaysSelector.stories';
import DialogStories from '../src/lib/Dialog/Dialog.stories';
import DropdownMenuStories from '../src/lib/DropdownMenu/DropdownMenu.stories';
import LoaderStories from '../src/lib/Loader/Loader.stories';
import MultiSelectStories from '../src/lib/MultiSelect/MultiSelect.stories';
import OTPInputStories from '../src/lib/OTPInput/OTPInput.stories';
import PasswordInputStories from '../src/lib/PasswordInput/PasswordInput.stories';
import PhoneInputStories from '../src/lib/PhoneInput/PhoneInput.stories';
import PriceStories from '../src/lib/Price/Price.stories';
import RadioGroupStories from '../src/lib/RadioGroup/RadioGroup.stories';
import SelectStories from '../src/lib/Select/Select.stories';
import SkeletonStories from '../src/lib/Skeleton/Skeleton.stories';
import StepperStories from '../src/lib/Stepper/Stepper.stories';
import SwitchStories from '../src/lib/Switch/Switch.stories';
import TabsStories from '../src/lib/Tabs/Tabs.stories';
import TagStories from '../src/lib/Tag/Tag.stories';
import TextStories from '../src/lib/Text/Text.stories';
import TextAreaStories from '../src/lib/TextArea/TextArea.stories';
import TextInputStories from '../src/lib/TextInput/TextInput.stories';
import TimePickerStories from '../src/lib/TimePicker/TimePicker.stories';
import ToastStories from '../src/lib/Toast/Toast.stories';
import ToggleStories from '../src/lib/Toggle/Toggle.stories';
import ToggleGroupStories from '../src/lib/ToggleGroup/ToggleGroup.stories';
import WeeklyTimePickerStories from '../src/lib/WeeklyTimePicker/WeeklyTimePicker.stories';
import ColorsStories from '../src/lib/colors.stories';

// Export configured stories
export function loadStories() {
  // Stories are automatically loaded by importing them above
  // This is just a placeholder function for compatibility
}

// Configure Storybook
export { default } from './index';