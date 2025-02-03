export interface ActionDataType {
  errors: Object,
  settings: Object,
}

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

export const defaultSettings = {
  gmap: {
    key: "",
  },
  retailers: [],
}
