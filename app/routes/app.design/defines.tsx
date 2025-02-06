export interface ActionDataType {
  errors: Object,
  settings: Object,
}

export interface SettingsType {
  
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
  'default',
  'pin',
  'starred',
  'flag',
  'banner',
  'custom',
];

export interface MarkerType {
  custom: string,
  preset: string,
  width: number,
  height: number,
  font_size: number,
  color: string,
  offset_x: number,
  offset_y: number,
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
    center: '1', // Location Record ID : '201 Columbine St Unit 300, Denver, CO 80206',
  },
  marker: {
    custom: 'h1-logo1.svg',
    preset: 'default',
    width: 42,
    height: 42,
    font_size: 18,
    color: '#5330F9',
    offset_x: 18,
    offset_y: 18,
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

export const widthList = [
  {label: '420px', value: '420px'},
  {label: '720px', value: '720px'},
  {label: '800px', value: '800px'},
  {label: '1000px', value: '1000px'},
]

export const heightList = [
  {label: '380px', value: '380px'},
  {label: '420px', value: '420px'},
  {label: '480px', value: '480px'},
  {label: '640px', value: '640px'},
]
