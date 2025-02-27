import { getDateBy } from "app/components/Functions";

export interface ActionDataType {
  errors: Object,
  settings: Object,
}

export const storeTypes = [
  'Bookstore', 
  'Cafe / restaurant', 
  'Clothing boutique', 
  'Fitness / yoga studio', 
  'Florist / garden store', 
  'Furniture store', 
  'General store / mercantile', 
  'Gift Store', 
  'Grocery / liquor store', 
  'Home decor store', 
  'Kids / toy store', 
  'Pet store', 
  'Spa / salon / beauty store', 
  'Stationary store',
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
  sync_method: number, // 1: Auto, 0: Manual,
  sync_type: number, // 0: All, 1: only with orders
  range_type: number, // 0: All, 1: Ranged
  sync?: SyncInfoType,
}

export interface FaireDataType {
  enabled: boolean,
  public_key: string,
  private_key: string,
  store_types: Array<string>,
  sync_method: number, // 1: Auto, 0: Manual,
  range_type: number, // 0: All, 1: Ranged
  sync?: SyncInfoType,
}

export interface SettingsType {
  gmap: Object,
  retailers: Array<string>,
  b2b: B2BDataType,
  faire: FaireDataType,
}

export const defaultSettings : SettingsType = {
  gmap: {
    key: "",
  },
  retailers: [],
  b2b: {
    enabled: true,
    is_customers_here: true,
    is_customers_out: false,
    public_key: '',
    private_key: '',
    sync_method: 1, // 1: Auto, 0: Manual,
    sync_type: 1, // 0: All, 1: only with orders,
    range_type: 0, // 0: All, 1: Ranged,
    // sync: {
    //   last: getDateBy('2024-12-28T12:00:00'),
    //   start: getDateBy(-7),
    //   end: getDateBy(7),
    // }
  },
  faire: {
    enabled: true,
    public_key: '',
    private_key: '',
    sync_method: 1, // 1: Auto, 0: Manual,
    store_types: ['Bookstore'],
    range_type: 0, // 0: All, 1: Ranged,
    // sync: {
    //   last: getDateBy('2024-12-28T12:00:00'),
    //   start: getDateBy(-7),
    //   end: getDateBy(7),
    // }
  }
}

export const retailers = [
  {
    id: "acehardware",
    label: "Ace Hardware",
    icon: "/images/retailers/logo-ace hardware.svg",
  },
  {
    id: "albertsons",
    label: "Albertsons",
    icon: "/images/retailers/logo-albertsons.svg",
  },
  {
    id: "aldi",
    label: "Aldi",
    icon: "/images/retailers/logo-aldi.svg",
  },
  {
    id: "bestbuy",
    label: "Best Buy",
    icon: "/images/retailers/logo-bestbuy.svg",
  },
  {
    id: "costco",
    label: "Costco",
    icon: "/images/retailers/logo-costco.svg",
  },
  {
    id: "cvs",
    label: "CVS",
    icon: "/images/retailers/logo-cvs.svg",
  },
  {
    id: "dicks",
    label: "Dicks",
    icon: "/images/retailers/logo-dicks.svg",
  },
  {
    id: "hobbylobby",
    label: "Hobby Lobby",
    icon: "/images/retailers/logo-hobby lobby.svg",
  },
  {
    id: "homedepot",
    label: "Home Depot",
    icon: "/images/retailers/logo-homedepot.svg",
  },
  {
    id: "homegoods",
    label: "Home Goods",
    icon: "/images/retailers/logo-home goods.svg",
  },
  {
    id: "kroger",
    label: "Kroger",
    icon: "/images/retailers/logo-kroger.svg",
  },
  {
    id: "lowes",
    label: "Lowe's",
    icon: "/images/retailers/logo-lowes.svg",
  },
  
  {
    id: "marshalls",
    label: "Marshalls",
    icon: "/images/retailers/logo-marshalls.svg",
  },
  {
    id: "michaels",
    label: "Michaels",
    icon: "/images/retailers/logo-michaels.svg",
  },
  {
    id: "nordstromrack",
    label: "Nordstrom Rack",
    icon: "/images/retailers/logo-nordstrom rack.svg",
  },
  {
    id: "petco",
    label: "Petco",
    icon: "/images/retailers/logo-petco.svg",
  },
  {
    id: "petsmart",
    label: "Petsmart",
    icon: "/images/retailers/logo-petsmart.svg",
  },
  {
    id: "publix",
    label: "Publix",
    icon: "/images/retailers/logo-publix.svg",
  },
  {
    id: "sephora",
    label: "Sephora",
    icon: "/images/retailers/logo-sephora.svg",
  },
  {
    id: "sprouts",
    label: "Sprouts",
    icon: "/images/retailers/logo-sprouts.svg",
  },
  {
    id: "target",
    label: "Target",
    icon: "/images/retailers/logo-target.svg",
  },
  {
    id: "tjmax",
    label: "TJMax",
    icon: "/images/retailers/logo-tjmaxx.svg",
  },
  {
    id: "ulta",
    label: "Ulta",
    icon: "/images/retailers/logo-ulta.svg",
  },
  {
    id: "walgreens",
    label: "Walgreens",
    icon: "/images/retailers/logo-walgreens.svg",
  },
  {
    id: "walmart",
    label: "Walmart",
    icon: "/images/retailers/logo-walmart.svg",
  },
  {
    id: "wholefoods",
    label: "Whole Foods",
    icon: "/images/retailers/logo-wholefoods.svg",
  },
  {
    id: "worldmarket",
    label: "World Market",
    icon: "/images/retailers/logo-world market.svg",
  },
];