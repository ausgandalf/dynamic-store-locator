import { IconMarkerDefault, IconMarkerPin, IconMarkerStarred, IconMarkerFlag, IconMarkerBanner, IconMarkerCustom } from 'app/res/icons';

export interface MapPreviewerProps {
  settings: SettingsType,
  data?: locationCardDataType,
}

export interface locationCardDataType {
  hrs: [],
  location: string,
  address: string,
  phone: string,
  url: string,
  logo: string,
  socials: [],
}

export interface ActionDataType {
  errors: Object,
  settings: Object,
}

export interface ColorType {
  primary: string,
  secondary: string,
}

export interface ThemeType {
  color: ColorType,
  primary_font: string,
  secondary_font: string,
}

export interface MapType {
  width: string,
  height: string,
  zoom: number,
  center: string,
}

export const markerTypes = [
  {
    value: 'default',
    icon: <IconMarkerDefault/>,
  },
  {
    value: 'pin',
    icon: <IconMarkerPin/>,
  },
  {
    value: 'starred',
    icon: <IconMarkerStarred/>,
  },
  {
    value: 'flag',
    icon: <IconMarkerFlag/>,
  },
  {
    value: 'banner',
    icon: <IconMarkerBanner/>,
  },
  {
    value: 'custom',
    icon: <IconMarkerCustom/>,
  },
];

export interface MarkerType {
  custom: string,
  preset: string,
  width: string,
  height: string,
  color: string,
}

export interface ShadowType {
  enabled: boolean,
  color: string,
  transparency: number,
  blur: number,
  x: number,
  y: number,
}

export interface PopupType {
  background_color: string,
  show_border: boolean,
  border_color: string,
  border_radius: number,
  font_color: ColorType,
  shadow: ShadowType,
}

export interface SettingsType {
  theme: ThemeType,
  map: MapType,
  marker: MarkerType,
  popup: PopupType,
}

export const defaultSettings : SettingsType = {
  theme: {
    color: {
      primary: '#000000',
      secondary: '#5330F9',
    },
    primary_font: 'Montserrat',
    secondary_font: 'Arial',
  },
  map: {
    width: '720px',
    height: '420px',
    zoom: 16,
    center: '201 Columbine St Unit 300, Denver, CO 80206', // Location Record ID : '201 Columbine St Unit 300, Denver, CO 80206',
  },
  marker: {
    custom: '',
    preset: 'default',
    width: '36px',
    height: '36px',
    color: '#5330F9',
  },
  popup: {
    background_color: '#FFFFFF',
    show_border: true,
    border_color: '#5330F9',
    border_radius: 3,
    font_color: {
      primary: '#000000',
      secondary: '#5330F9',
    },
    shadow: {
      enabled: true,
      color: '#000000',
      transparency: 60,
      blur: 4,
      x: -2,
      y: 2,
    }
  }
}

export const tabs = [
  {
    id: 'theme',
    content: 'Theme Setup',
    accessibilityLabel: 'Theme Setup',
    panelID: 'panel-theme',
  },
  {
    id: 'map',
    content: 'Map Size & Location',
    panelID: 'panel-map',
  },
  {
    id: 'marker',
    content: 'Universal Map Marker',
    panelID: 'panel-marker',
  },
  {
    id: 'popup',
    content: 'Popup Style',
    panelID: 'panel-popup',
  },
];

export const fontList = [
  'Menlo', 'Consolas', 'Monaco', 'Liberation Mono', 'Lucida Console',
  'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Ubuntu', 'Helvetica Neue',
  'Iowan Old Style', 'Apple Garamond', 'Baskerville', 'Times New Roman', 'Droid Serif', 'Times', 'Source Serif Pro',
]

export const locationList = [
  {label: '201 Columbine St Unit 300, Denver, CO 80206', value: '1'}
]

export const mapWidthList = [
  {label: '420px', value: '420px'},
  {label: '720px', value: '720px'},
  {label: '800px', value: '800px'},
  {label: '1000px', value: '1000px'},
]

export const mapHeightList = [
  {label: '380px', value: '380px'},
  {label: '420px', value: '420px'},
  {label: '480px', value: '480px'},
  {label: '640px', value: '640px'},
]

export const markerWidthList = [
  {label: '22px', value: '22px'},
  {label: '32px', value: '32px'},
  {label: '36px', value: '36px'},
  {label: '42px', value: '42px'},
  {label: '48px', value: '48px'},
  {label: '64px', value: '64px'},
  {label: '128px', value: '128px'},
]

export const markerHeightList = [
  {label: '22px', value: '22px'},
  {label: '32px', value: '32px'},
  {label: '36px', value: '36px'},
  {label: '42px', value: '42px'},
  {label: '48px', value: '48px'},
  {label: '64px', value: '64px'},
  {label: '128px', value: '128px'},
]
