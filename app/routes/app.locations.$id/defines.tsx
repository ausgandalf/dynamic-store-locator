import { MarkerType, defaultSettings as designSettings } from "../app.design/defines";

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
  socials: SocialsType,
  hrs: OperationHrsType,
  logo: string,
  marker: MarkerType,
  tags: Array<string>,
  visible: boolean,
}

export interface AddressType {
  address1: string,
  address2: string,
  city: string,
  state: string,
  zipcode: string,
}

export interface SocialsType {
  in: string,
  facebook: string,
}

export interface OperationHrsType {
  day0: OperationHrType,
  day1: OperationHrType,
  day2: OperationHrType,
  day3: OperationHrType,
  day4: OperationHrType,
  day5: OperationHrType,
  day6: OperationHrType,
}


export interface OperationHrType {
  from: number,
  to: number,
  visible: boolean,
}

export const sampleLocation:LocationType = {
  id: 1,
  visible: true,
  location: 'H1 Web Development',
  address: {
    address1: '1234 Main Street',
    address2: '',
    city: 'Denver',
    state: 'CO',
    zipcode: '80206'
  },
  phone: '(303) 225-9372',
  website: 'www.h1webdev.com',
  socials: {
    in: '',
    facebook: '',
  },
  hrs: {
    day0: {
      from: 0,
      to: 0,
      visible: false,
    },
    day1: {
      from: 540,
      to: 1020,
      visible: true,
    },
    day2: {
      from: 540,
      to: 1020,
      visible: true,
    },
    day3: {
      from: 540,
      to: 1020,
      visible: true,
    },
    day4: {
      from: 540,
      to: 1020,
      visible: true,
    },
    day5: {
      from: 540,
      to: 1020,
      visible: true,
    },
    day6: {
      from: 540,
      to: 1020,
      visible: true,
    }
  },
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
  location: '',
  address: {
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipcode: ''
  },
  phone: '',
  website: '',
  socials: {
    in: '',
    facebook: '',
  },
  hrs: {
    day0: {
      from: 0,
      to: 0,
      visible: false,
    },
    day1: {
      from: 540,
      to: 1020,
      visible: true,
    },
    day2: {
      from: 540,
      to: 1020,
      visible: true,
    },
    day3: {
      from: 540,
      to: 1020,
      visible: true,
    },
    day4: {
      from: 540,
      to: 1020,
      visible: true,
    },
    day5: {
      from: 540,
      to: 1020,
      visible: true,
    },
    day6: {
      from: 540,
      to: 1020,
      visible: true,
    }
  },
  logo: '',
  marker: designSettings.marker,
  tags: []
}