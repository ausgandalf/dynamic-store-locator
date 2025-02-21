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

export const getDateBy = (offset?: string|number|undefined) : Date|any => {
  const type = typeof offset;
  if (['string', 'number', 'undefined'].indexOf(type) === -1) return offset;
  if (typeof offset == 'string') return new Date(offset);
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
    enabled: true,
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
    enabled: true,
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

export const retailers = [
  {
    id: "bestbuy",
    label: "Best Buy",
    icon: "/images/retailers/logo-bestbuy.png",
  },
  {
    id: "costco",
    label: "Costco",
    icon: "/images/retailers/logo-costco.png",
  },
  {
    id: "cvs",
    label: "CVS",
    icon: "/images/retailers/logo-cvs.png",
  },
  {
    id: "homedepot",
    label: "Home Depot",
    icon: "/images/retailers/logo-homedepot.png",
  },
  {
    id: "lowes",
    label: "Lowe's",
    icon: "/images/retailers/logo-lowes.png",
  },
  {
    id: "officedepot",
    label: "Office Depot",
    icon: "/images/retailers/logo-officedepot.png",
  },
  {
    id: "rei",
    label: "REI",
    icon: "/images/retailers/logo-rei.png",
  },
  {
    id: "safeway",
    label: "Safeway",
    icon: "/images/retailers/logo-safeway.png",
  },
  {
    id: "samsclub",
    label: "Sam's Club",
    icon: "/images/retailers/logo-samsclub.png",
  },
  {
    id: "target",
    label: "Target",
    icon: "/images/retailers/logo-target.png",
  },
  {
    id: "tjmax",
    label: "TJMax",
    icon: "/images/retailers/logo-tjmaxx.png",
  },
  {
    id: "walgreens",
    label: "Walgreens",
    icon: "/images/retailers/logo-walgreens.png",
  },
  {
    id: "walmart",
    label: "Walmart",
    icon: "/images/retailers/logo-walmart.png",
  },
  {
    id: "wholefoods",
    label: "Whole Foods",
    icon: "/images/retailers/logo-wholefoods.png",
  },
];