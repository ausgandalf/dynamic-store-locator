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
  b2b: {
    enabled: false,
    is_customers_here: false,
    is_customers_out: false,
    public_key: '',
    private_key: '',
    sync: {
      last: '2024-07-22',
      type: 1, // 0: All, 1: only with orders,
      is_all_time: false,
      from: '2024-10-28',
      to: '2025-03-01',
    }
  },
  fair: {
    enabled: false,
    public_key: '',
    private_key: '',
    sync: {
      last: '2024-07-22',
      from: '2024-10-28',
      to: '2025-03-01',
      store_types: [
        'Botique',
        'Grocery Store',
      ],
    }
  }
}
