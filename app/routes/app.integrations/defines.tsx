export interface ActionDataType {
  errors: Object,
  settings: Object,
}

export const storeTypes = [
  'Botique',
  'Grocery Store',
  'Beauty',
  'Apparells',
  'Fashion',
];

export interface SyncInfoType {
  last?: Date,
  start?: Date,
  end?: Date,
}

export interface B2BDataType {
  enabled: boolean,
  is_customers_here: boolean,
  is_customers_out: boolean,
  public_key: string,
  private_key: string,
  sync_type: number, // 0: All, 1: only with orders
  range_type: number, // 0: All, 1: Ranged
  sync?: SyncInfoType,
}

export interface FaireDataType {
  enabled: boolean,
  public_key: string,
  private_key: string,
  store_types: Array<string>,
  sync?: SyncInfoType,
}

export interface SettingsType {
  gmap: Object,
  retailers: Array<string>,
  b2b: B2BDataType,
  faire: FaireDataType,
}

export const getDateBy = (offset?: string|number|undefined) : Date|undefined => {
  if (typeof offset == 'undefined') return undefined;
  if (typeof offset == 'string') return new Date(offset);
  let date = new Date();
  if (!offset) return date;
  date.setDate(date.getDate() + offset);
  return date;
}

export const defaultSettings : SettingsType = {
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
    sync_type: 1, // 0: All, 1: only with orders,
    range_type: 1, // 0: All, 1: Ranged,
    sync: {
      last: getDateBy('2024-12-28T12:00:00'),
      start: getDateBy(-7),
      end: getDateBy(7),
    }
  },
  faire: {
    enabled: false,
    public_key: '',
    private_key: '',
    store_types: ['Botique', 'Grocery Store'],
    sync: {
      last: getDateBy('2024-12-28T12:00:00'),
      start: getDateBy(-7),
      end: getDateBy(7),
    }
  }
}
