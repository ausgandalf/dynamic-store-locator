import {
  Icon,
  InlineStack,
} from "@shopify/polaris";
import { MarkerType, defaultSettings as designSettings } from "../app.design/defines";
import { 
  IconLinkedIn,
  IconFacebook,
  IconPinterest,
  IconX,
  IconTikTok,
  IconInstagram,
} from 'app/res/icons';

export interface ActionDataType {
  errors: Object,
  location: LocationType,
}

export interface SettingsType {
  delete: Array<string>,
}

export const defaultSettings : SettingsType = {
  delete: []
}


export interface LocationType {
  id?: string,
  location:string,
  address: AddressType,
  phone: string,
  website: string,
  socials: Array<SocialsType>,
  hrs: Array<OperationHrType>,
  logo: string,
  marker: MarkerType,
  tags: Array<string>,
  visible: boolean,
  source: string,
  lastsync: string,
}

export interface AddressType {
  address1: string,
  address2: string,
  city: string,
  state: string,
  zipcode: string,
}

export interface SocialsType {
  type: string,
  url: string,
}

export interface OperationHrType {
  from: string,
  to: string,
  visible: boolean,
}

export const sampleLocation:LocationType = {
  id: '1',
  visible: true,
  source: 'Faire',
  location: 'H1 Web Development',
  lastsync: '2024-12-28T12:00:00',
  address: {
    address1: '1234 Main Street',
    address2: '',
    city: 'Denver',
    state: 'CO',
    zipcode: '80206'
  },
  phone: '(303) 225-9372',
  website: 'www.h1webdev.com',
  socials: [
    {
      type: 'in',
      url: '',
    },
    {
      type: 'facebook',
      url: '',
    }
  ],
  hrs: [
    {
      from: '09:00',
      to: '17:00',
      visible: false,
    },
    {
      from: '09:00',
      to: '17:00',
      visible: true,
    },
    {
      from: '09:00',
      to: '17:00',
      visible: true,
    },
    {
      from: '09:00',
      to: '17:00',
      visible: true,
    },
    {
      from: '09:00',
      to: '17:00',
      visible: true,
    },
    {
      from: '09:00',
      to: '17:00',
      visible: true,
    },
    {
      from: '09:00',
      to: '17:00',
      visible: false,
    }
  ],
  logo: 'h1-logo.svg',
  marker: designSettings.marker,
  tags: [
    'Wi-Fi Available',
    'Open 24-Hours',
    'Wheelchair Accessible',
  ]
}

export const emptyLocation:LocationType = {
  visible: true,
  source: 'Manual',
  location: '',
  lastsync: '',
  address: {
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipcode: ''
  },
  phone: '',
  website: '',
  socials: [
    {
      type: 'in',
      url: '',
    },
    {
      type: 'facebook',
      url: '',
    }
  ],
  hrs: [
    {
      from: '09:00',
      to: '17:00',
      visible: false,
    },
    {
      from: '09:00',
      to: '17:00',
      visible: true,
    },
    {
      from: '09:00',
      to: '17:00',
      visible: true,
    },
    {
      from: '09:00',
      to: '17:00',
      visible: true,
    },
    {
      from: '09:00',
      to: '17:00',
      visible: true,
    },
    {
      from: '09:00',
      to: '17:00',
      visible: true,
    },
    {
      from: '09:00',
      to: '17:00',
      visible: false,
    }
  ],
  logo: '',
  marker: designSettings.marker,
  tags: []
}
export const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const socialOptions = [
  {
    label: "Facebook",
    value: 'facebook',
    prefix: <InlineStack blockAlign="center"><IconFacebook /></InlineStack>,
  },
  {
    label: "Instagram",
    value: 'instagram',
    prefix: <InlineStack blockAlign="center"><IconInstagram /></InlineStack>,
  },
  {
    label: "X",
    value: 'x',
    prefix: <InlineStack blockAlign="center"><IconX /></InlineStack>,
  },
  {
    label: "Pinterest",
    value: 'pinterest',
    prefix: <InlineStack blockAlign="center"><IconPinterest /></InlineStack>,
  },
  {
    label: "Tiktok",
    value: 'tiktok',
    prefix: <InlineStack blockAlign="center"><IconTikTok /></InlineStack>,
  },
  {
    label: "LinkedIn",
    value: 'in',
    prefix: <InlineStack blockAlign="center"><IconLinkedIn /></InlineStack>,
  },
];

export const states = [
  {
      label: "Alabama",
      value: "AL"
  },
  {
      label: "Alaska",
      value: "AK"
  },
  {
      label: "American Samoa",
      value: "AS"
  },
  {
      label: "Arizona",
      value: "AZ"
  },
  {
      label: "Arkansas",
      value: "AR"
  },
  {
      label: "California",
      value: "CA"
  },
  {
      label: "Colorado",
      value: "CO"
  },
  {
      label: "Connecticut",
      value: "CT"
  },
  {
      label: "Delaware",
      value: "DE"
  },
  {
      label: "District Of Columbia",
      value: "DC"
  },
  {
      label: "Federated States Of Micronesia",
      value: "FM"
  },
  {
      label: "Florida",
      value: "FL"
  },
  {
      label: "Georgia",
      value: "GA"
  },
  {
      label: "Guam",
      value: "GU"
  },
  {
      label: "Hawaii",
      value: "HI"
  },
  {
      label: "Idaho",
      value: "ID"
  },
  {
      label: "Illinois",
      value: "IL"
  },
  {
      label: "Indiana",
      value: "IN"
  },
  {
      label: "Iowa",
      value: "IA"
  },
  {
      label: "Kansas",
      value: "KS"
  },
  {
      label: "Kentucky",
      value: "KY"
  },
  {
      label: "Louisiana",
      value: "LA"
  },
  {
      label: "Maine",
      value: "ME"
  },
  {
      label: "Marshall Islands",
      value: "MH"
  },
  {
      label: "Maryland",
      value: "MD"
  },
  {
      label: "Massachusetts",
      value: "MA"
  },
  {
      label: "Michigan",
      value: "MI"
  },
  {
      label: "Minnesota",
      value: "MN"
  },
  {
      label: "Mississippi",
      value: "MS"
  },
  {
      label: "Missouri",
      value: "MO"
  },
  {
      label: "Montana",
      value: "MT"
  },
  {
      label: "Nebraska",
      value: "NE"
  },
  {
      label: "Nevada",
      value: "NV"
  },
  {
      label: "New Hampshire",
      value: "NH"
  },
  {
      label: "New Jersey",
      value: "NJ"
  },
  {
      label: "New Mexico",
      value: "NM"
  },
  {
      label: "New York",
      value: "NY"
  },
  {
      label: "North Carolina",
      value: "NC"
  },
  {
      label: "North Dakota",
      value: "ND"
  },
  {
      label: "Northern Mariana Islands",
      value: "MP"
  },
  {
      label: "Ohio",
      value: "OH"
  },
  {
      label: "Oklahoma",
      value: "OK"
  },
  {
      label: "Oregon",
      value: "OR"
  },
  {
      label: "Palau",
      value: "PW"
  },
  {
      label: "Pennsylvania",
      value: "PA"
  },
  {
      label: "Puerto Rico",
      value: "PR"
  },
  {
      label: "Rhode Island",
      value: "RI"
  },
  {
      label: "South Carolina",
      value: "SC"
  },
  {
      label: "South Dakota",
      value: "SD"
  },
  {
      label: "Tennessee",
      value: "TN"
  },
  {
      label: "Texas",
      value: "TX"
  },
  {
      label: "Utah",
      value: "UT"
  },
  {
      label: "Vermont",
      value: "VT"
  },
  {
      label: "Virgin Islands",
      value: "VI"
  },
  {
      label: "Virginia",
      value: "VA"
  },
  {
      label: "Washington",
      value: "WA"
  },
  {
      label: "West Virginia",
      value: "WV"
  },
  {
      label: "Wisconsin",
      value: "WI"
  },
  {
      label: "Wyoming",
      value: "WY"
  }
];

export const availableTags = [
  'Wi-Fi Available',
  'Open 24-Hours',
  'Wheelchair Accessible',
]