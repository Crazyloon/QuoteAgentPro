import { QuoteInput } from '../domain/quoteinput';

export const CustomerForm: QuoteInput[] = [
  {
    label: 'First Name',
    type: 'text',
    value: '',
  },
  {
    label: 'Last Name',
    type: 'text',
    value: '',
  },
  {
    label: 'Date of Birth',
    type: 'date',
    value: undefined,
  },
  {
    label: 'Email',
    type: 'text',
    value: '',
  },
  {
    label: 'Phone',
    type: 'text',
    value: '',
  },
  {
    label: 'Address',
    type: 'text',
    value: '',
  },
  {
    label: 'City',
    type: 'text',
    value: '',
  },
  {
    label: 'State',
    type: 'text',
    value: '',
  },
  {
    label: 'Zip',
    type: 'text',
    value: '',
  },
  {
    label: 'Social Security Number',
    type: 'text',
    value: '',
  },
  {
    label: 'Previous Carrier',
    type: 'select',
    value: 'Other',
  },
  {
    label: 'Claims in the last 5 years?',
    type: 'checkbox',
    value: '',
  },
  {
    label: 'Any moving violations within 5 years?',
    type: 'checkbox',
    value: '',
  },
  {
    label: 'Under 3 years driving experience?',
    type: 'checkbox',
    value: '',
  },
  {
    label: 'Force multi-car discount?',
    type: 'checkbox',
    value: '',
  }
];
