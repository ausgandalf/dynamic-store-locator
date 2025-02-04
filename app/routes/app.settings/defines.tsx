import { FilterType } from './filters';


export interface ActionDataType {
  errors: Object,
  settings: Object,
}

export interface SettingsType {
  lang: string,
  filters: Array<FilterType>,
  plan: string,
}

export const defaultSettings = {
  lang: "de",
  filters: [],
  plan: 'business',
}

export const initFilters:Array<FilterType> = [
  {
    id: "1",
    label: "Wheelchair Accessible",
    tag: "wheelchair-accessible",
  },
  {
    id: "2",
    label: "Open 24-Hours",
    tag: "open-24-hours",
  },
  {
    id: "3",
    label: "Wi-Fi Available",
    tag: "wi-fi-available",
  }
];

export const tabs = [
  {
    id: 'display',
    content: 'Display',
    accessibilityLabel: 'Display',
    panelID: 'panel-display',
  },
  {
    id: 'search-filters',
    content: 'Search Filters',
    panelID: 'panel-search-filters',
  },
  {
    id: 'plans',
    content: 'Plans',
    panelID: 'panel-plans',
  },
  {
    id: 'install',
    content: 'Installation',
    panelID: 'panel-install',
  },
];

export const languageList = [
  {label: 'English (NA)', value: 'en'},
  {label: 'French', value: 'fr'},
  {label: 'German', value: 'de'},
];