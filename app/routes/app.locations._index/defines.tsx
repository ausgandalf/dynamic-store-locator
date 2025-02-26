export interface ActionDataType {
  errors: Object,
  locations: Array<Object>,
  action: string,
}

export interface SettingsType {
  delete: Array<string>,
}

export const defaultSettings : SettingsType = {
  delete: []
}

export const locations = [
  {
    "id": '1',
    "location": "H1 Web Development",
    "address": {
      "address1": "201 Columbine Street",
      "address2": "Unit 300",
      "city": "Denver",
      "state": "CO",
      "zipcode": "80206"
    },
    "source": "Manual",
    "marker": {
      custom: 'h1-logo1.svg',
      preset: 'default',
      width: '36px',
      height: '36px',
      color: '#5330F9',
    },
    "visible": true,
    "added": "2024-03-17T00:00:00Z",
    "updated": "2024-03-17T00:00:00Z",
    "tags": [
      'Wi-Fi Available',
      'Open 24-Hours',
      'Wheelchair Accessible',
    ],
  },
  {
    "id": '2',
    "location": "H1 Web Development",
    "address": {
      "address1": "201 Columbine Street",
      "address2": "Unit 300",
      "city": "Denver",
      "state": "CO",
      "zipcode": "80206"
    },
    "source": "Faire",
    "marker": {
      custom: 'h1-logo1.svg',
      preset: 'starred',
      width: '36px',
      height: '36px',
      color: '#5330F9',
    },
    "visible": false,
    "added": "2024-03-17T00:00:00Z",
    "updated": "2024-03-17T00:00:00Z",
    "tags": [
      'Wheelchair Accessible',
    ],
  },
  {
    "id": '3',
    "location": "H1 Web Development",
    "address": {
      "address1": "201 Columbine Street",
      "address2": "Unit 300",
      "city": "Denver",
      "state": "CO",
      "zipcode": "80206"
    },
    "source": "National Retailer",
    "marker": {
      custom: 'h1-logo1.svg',
      preset: 'pin',
      width: '36px',
      height: '36px',
      color: '#5330F9',
    },
    "visible": true,
    "added": "2024-03-17T00:00:00Z",
    "updated": "2024-03-17T00:00:00Z",
    "tags": [
      'Open 24-Hours',
      'Wheelchair Accessible',
    ],
  },
  {
    "id": '4',
    "location": "H1 Web Development",
    "address": {
      "address1": "201 Columbine Street",
      "address2": "Unit 300",
      "city": "Denver",
      "state": "CO",      "zipcode": "80206"
    },
    "source": "National Retailer",
    "marker": {
      custom: 'h1-logo1.svg',
      preset: 'default',
      width: '36px',
      height: '36px',
      color: '#5330F9',
    },
    "visible": true,
    "added": "2024-03-17T00:00:00Z",
    "updated": "2024-03-17T00:00:00Z",
    "tags": [
      'Wi-Fi Available',
    ],
  },
  {
    "id": '5',
    "location": "H1 Web Development",
    "address": {
      "address1": "201 Columbine Street",
      "address2": "Unit 300",
      "city": "Denver",
      "state": "CO",
      "zipcode": "80206"
    },
    "source": "Faire",
    "marker": {
      custom: 'h1-logo1.svg',
      preset: 'banner',
      width: '36px',
      height: '36px',
      color: '#5330F9',
    },
    "visible": false,
    "added": "2024-03-17T00:00:00Z",
    "updated": "2024-03-17T00:00:00Z",
    "tags": [
      'Open 24-Hours',
    ],
  },
  {
    "id": '6',
    "location": "H1 Web Development",
    "address": {
      "address1": "201 Columbine Street",
      "address2": "Unit 300",
      "city": "Denver",
      "state": "CO",
      "zipcode": "80206"
    },
    "source": "Shopify B2B",
    "marker": {
      custom: 'h1-logo1.svg',
      preset: 'default',
      width: '36px',
      height: '36px',
      color: '#5330F9',
    },
    "visible": true,
    "added": "2024-03-17T00:00:00Z",
    "updated": "2024-03-17T00:00:00Z",
    "tags": [
      'Wi-Fi Available',
      'Open 24-Hours',
    ],
  },
  {
    "id": '7',
    "location": "H2 Web Solutions",
    "address": {
      "address1": "500 16th Street",
      "address2": "Suite 200",
      "city": "Denver",
      "state": "CO",
      "zipcode": "80202"
    },
    "source": "Manual",
    "marker": {
      custom: 'h1-logo1.svg',
      preset: 'flag',
      width: '36px',
      height: '36px',
      color: '#5330F9',
    },
    "visible": true,
    "added": "2024-03-20T00:00:00Z",
    "updated": "2024-03-20T00:00:00Z",
    "tags": [
      'Wi-Fi Available',
      'Open 24-Hours',
      'Wheelchair Accessible',
    ],
  },
  {
    "id": '8',
    "location": "Tech Hub",
    "address": {
      "address1": "1000 Walnut Street",
      "address2": "Floor 5",
      "city": "Boulder",
      "state": "CO",
      "zipcode": "80302"
    },
    "source": "National Retailer",
    "marker": {
      custom: 'h1-logo1.svg',
      preset: 'default',
      width: '36px',
      height: '36px',
      color: '#5330F9',
    },
    "visible": true,
    "added": "2024-03-22T00:00:00Z",
    "updated": "2024-03-22T00:00:00Z",
    "tags": [
      'Wheelchair Accessible',
    ],
  },
  {
    "id": '9',
    "location": "Innovate Labs",
    "address": {
      "address1": "800 Pearl Street",
      "address2": "",
      "city": "Boulder",
      "state": "CO",
      "zipcode": "80302"
    },
    "source": "Faire",
    "marker": {
      custom: 'h1-logo1.svg',
      preset: 'default',
      width: '36px',
      height: '36px',
      color: '#5330F9',
    },
    "visible": false,
    "added": "2024-03-25T00:00:00Z",
    "updated": "2024-03-25T00:00:00Z",
    "tags": [
      'Wi-Fi Available',
    ],
  },
  {
    "id": '10',
    "location": "NextGen Tech",
    "address": {
      "address1": "300 Arapahoe Avenue",
      "address2": "Suite 100",
      "city": "Boulder",
      "state": "CO",
      "zipcode": "80302"
    },
    "source": "Shopify B2B",
    "marker": {
      custom: '/images/h1-logo.svg',
      preset: 'custom',
      width: '36px',
      height: '36px',
      color: '#5330F9',
    },
    "visible": true,
    "added": "2024-03-28T00:00:00Z",
    "updated": "2024-03-28T00:00:00Z",
    "tags": [
      'Wi-Fi Available',
    ],
  },
  {
    "id": '11',
    "location": "H1 Web Development",
    "address": {
      "address1": "201 Columbine Street",
      "address2": "Unit 300",
      "city": "Denver",
      "state": "CO",
      "zipcode": "80206"
    },
    "source": "Manual",
    "marker": {
      custom: 'h1-logo1.svg',
      preset: 'default',
      width: '36px',
      height: '36px',
      color: '#5330F9',
    },
    "visible": true,
    "added": "2024-03-17T00:00:00Z",
    "updated": "2024-03-17T00:00:00Z",
    "tags": [
      'Open 24-Hours',
      'Wheelchair Accessible',
    ],
  },
  {
    "id": '12',
    "location": "H1 Web Development",
    "address": {
      "address1": "201 Columbine Street",
      "address2": "Unit 300",
      "city": "Denver",
      "state": "CO",
      "zipcode": "80206"
    },
    "source": "Faire",
    "marker": {
      custom: 'h1-logo1.svg',
      preset: 'starred',
      width: '36px',
      height: '36px',
      color: '#5330F9',
    },
    "visible": false,
    "added": "2024-03-17T00:00:00Z",
    "updated": "2024-03-17T00:00:00Z",
    "tags": [
      'Wheelchair Accessible',
    ],
  },
  {
    "id": '13',
    "location": "H1 Web Development",
    "address": {
      "address1": "201 Columbine Street",
      "address2": "Unit 300",
      "city": "Denver",
      "state": "CO",
      "zipcode": "80206"
    },
    "source": "National Retailer",
    "marker": {
      custom: 'h1-logo1.svg',
      preset: 'pin',
      width: '36px',
      height: '36px',
      color: '#5330F9',
    },
    "visible": true,
    "added": "2024-03-17T00:00:00Z",
    "updated": "2024-03-17T00:00:00Z",
    "tags": [
      'Wheelchair Accessible',
    ],
  },
  {
    "id": '14',
    "location": "H1 Web Development",
    "address": {
      "address1": "201 Columbine Street",
      "address2": "Unit 300",
      "city": "Denver",
      "state": "CO",      "zipcode": "80206"
    },
    "source": "National Retailer",
    "marker": {
      custom: 'h1-logo1.svg',
      preset: 'default',
      width: '36px',
      height: '36px',
      color: '#5330F9',
    },
    "visible": true,
    "added": "2024-03-17T00:00:00Z",
    "updated": "2024-03-17T00:00:00Z",
    "tags": [
      'Wi-Fi Available',
      'Open 24-Hours',
      'Wheelchair Accessible',
    ],
  },
  {
    "id": '15',
    "location": "H1 Web Development",
    "address": {
      "address1": "201 Columbine Street",
      "address2": "Unit 300",
      "city": "Denver",
      "state": "CO",
      "zipcode": "80206"
    },
    "source": "Faire",
    "marker": {
      custom: 'h1-logo1.svg',
      preset: 'banner',
      width: '36px',
      height: '36px',
      color: '#5330F9',
    },
    "visible": false,
    "added": "2024-03-17T00:00:00Z",
    "updated": "2024-03-17T00:00:00Z",
    "tags": [
      'Open 24-Hours',
      'Wheelchair Accessible',
    ],
  },
  {
    "id": '16',
    "location": "H1 Web Development",
    "address": {
      "address1": "201 Columbine Street",
      "address2": "Unit 300",
      "city": "Denver",
      "state": "CO",
      "zipcode": "80206"
    },
    "source": "Shopify B2B",
    "marker": {
      custom: 'h1-logo1.svg',
      preset: 'default',
      width: '36px',
      height: '36px',
      color: '#5330F9',
    },
    "visible": true,
    "added": "2024-03-17T00:00:00Z",
    "updated": "2024-03-17T00:00:00Z",
    "tags": [
      'Wi-Fi Available',
      'Open 24-Hours',
      'Wheelchair Accessible',
    ],
  },
  {
    "id": '17',
    "location": "H2 Web Solutions",
    "address": {
      "address1": "500 16th Street",
      "address2": "Suite 200",
      "city": "Denver",
      "state": "CO",
      "zipcode": "80202"
    },
    "source": "Manual",
    "marker": {
      custom: 'h1-logo1.svg',
      preset: 'flag',
      width: '36px',
      height: '36px',
      color: '#5330F9',
    },
    "visible": true,
    "added": "2024-03-20T00:00:00Z",
    "updated": "2024-03-20T00:00:00Z",
    "tags": [
      'Wi-Fi Available',
      'Open 24-Hours',
      'Wheelchair Accessible',
    ],
  },
  {
    "id": '18',
    "location": "Tech Hub",
    "address": {
      "address1": "1000 Walnut Street",
      "address2": "Floor 5",
      "city": "Boulder",
      "state": "CO",
      "zipcode": "80302"
    },
    "source": "National Retailer",
    "marker": {
      custom: 'h1-logo1.svg',
      preset: 'default',
      width: '36px',
      height: '36px',
      color: '#5330F9',
    },
    "visible": true,
    "added": "2024-03-22T00:00:00Z",
    "updated": "2024-03-22T00:00:00Z",
    "tags": [
      'Wheelchair Accessible',
    ],
  },
  {
    "id": '19',
    "location": "Innovate Labs",
    "address": {
      "address1": "800 Pearl Street",
      "address2": "",
      "city": "Boulder",
      "state": "CO",
      "zipcode": "80302"
    },
    "source": "Faire",
    "marker": {
      custom: 'h1-logo1.svg',
      preset: 'default',
      width: '36px',
      height: '36px',
      color: '#5330F9',
    },
    "visible": false,
    "added": "2024-03-25T00:00:00Z",
    "updated": "2024-03-25T00:00:00Z",
    "tags": [
      'Wi-Fi Available',
      'Wheelchair Accessible',
    ],
  },
  {
    "id": '20',
    "location": "NextGen Tech",
    "address": {
      "address1": "300 Arapahoe Avenue",
      "address2": "Suite 100",
      "city": "Boulder",
      "state": "CO",
      "zipcode": "80302"
    },
    "source": "Shopify B2B",
    "marker": {
      custom: '/images/h1-logo.svg',
      preset: 'custom',
      width: '36px',
      height: '36px',
      color: '#5330F9',
    },
    "visible": true,
    "added": "2024-03-28T00:00:00Z",
    "updated": "2024-03-28T00:00:00Z",
    "tags": [
      'Wi-Fi Available',
      'Open 24-Hours',
      'Wheelchair Accessible',
    ],
  },
  {
    "id": '21',
    "location": "H2 Web Solutions",
    "address": {
      "address1": "500 16th Street",
      "address2": "Suite 200",
      "city": "Denver",
      "state": "CO",
      "zipcode": "80202"
    },
    "source": "Manual",
    "marker": {
      custom: 'h1-logo1.svg',
      preset: 'flag',
      width: '36px',
      height: '36px',
      color: '#5330F9',
    },
    "visible": true,
    "added": "2024-03-20T00:00:00Z",
    "updated": "2024-03-20T00:00:00Z",
    "tags": [
      'Wheelchair Accessible',
    ],
  },
  {
    "id": '22',
    "location": "Tech Hub",
    "address": {
      "address1": "1000 Walnut Street",
      "address2": "Floor 5",
      "city": "Boulder",
      "state": "CO",
      "zipcode": "80302"
    },
    "source": "National Retailer",
    "marker": {
      custom: 'h1-logo1.svg',
      preset: 'default',
      width: '36px',
      height: '36px',
      color: '#5330F9',
    },
    "visible": true,
    "added": "2024-03-22T00:00:00Z",
    "updated": "2024-03-22T00:00:00Z",
    "tags": [
      'Wi-Fi Available',
      'Open 24-Hours',
      'Wheelchair Accessible',
    ],
  },
  {
    "id": '23',
    "location": "Innovate Labs",
    "address": {
      "address1": "800 Pearl Street",
      "address2": "",
      "city": "Boulder",
      "state": "CO",
      "zipcode": "80302"
    },
    "source": "Faire",
    "marker": {
      custom: 'h1-logo1.svg',
      preset: 'default',
      width: '36px',
      height: '36px',
      color: '#5330F9',
    },
    "visible": false,
    "added": "2024-03-25T00:00:00Z",
    "updated": "2024-03-25T00:00:00Z",
    "tags": [
      'Wi-Fi Available',
      'Open 24-Hours',
      'Wheelchair Accessible',
    ],
  },
  {
    "id": '24',
    "location": "NextGen Tech",
    "address": {
      "address1": "300 Arapahoe Avenue",
      "address2": "Suite 100",
      "city": "Boulder",
      "state": "CO",
      "zipcode": "80302"
    },
    "source": "Shopify B2B",
    "marker": {
      custom: '/images/h1-logo.svg',
      preset: 'custom',
      width: '36px',
      height: '36px',
      color: '#5330F9',
    },
    "visible": true,
    "added": "2024-03-28T00:00:00Z",
    "updated": "2024-03-28T00:00:00Z",
    "tags": [
      'Wi-Fi Available',
      'Open 24-Hours',
      'Wheelchair Accessible',
    ],
  }
]