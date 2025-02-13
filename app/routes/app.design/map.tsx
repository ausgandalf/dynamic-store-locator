import {useState, useCallback} from 'react';
import {
  Layout,
  BlockStack,
  Card,
  Text,
  Select,
  Box,
  Grid,
  RangeSlider,
} from "@shopify/polaris";

import { MapType, locationList, mapWidthList, mapHeightList } from './defines';

interface MapBlockProps {
  settings: MapType,
  update: Function,
}
export const MapBlock = ({settings, update} : MapBlockProps) => {
  
  const [data, setData] = useState(settings);

  const onUpdate = (field:string, value:(string|number)) => {
    const newData = {...data, [field]:value};
    setData(newData);
    update('map', newData);
  }

  return (
    <Card>
      <Box paddingBlockEnd='200'>
        <Text as="h5" variant="headingSm">SetupTheme Fonts</Text>
      </Box>
      <Grid columns={{xs: 1, sm: 1, md: 2, lg: 2, xl: 2}}>
        <Grid.Cell>
          <BlockStack gap='400'>
            <BlockStack gap='200'>
              <Grid columns={{xs: 1, sm: 1, md: 2, lg: 2, xl: 2}}>
                <Grid.Cell>
                  <Select
                    label="Height"
                    requiredIndicator
                    options={mapHeightList}
                    onChange={(value: string) => onUpdate('height', value)}
                    value={data.height}
                  />
                </Grid.Cell>
                <Grid.Cell>
                  <Select
                    label="Width"
                    requiredIndicator
                    options={mapWidthList}
                    onChange={(value: string) => onUpdate('width', value)}
                    value={data.width}
                  />
                </Grid.Cell>
              </Grid>
            </BlockStack>
            <BlockStack gap='200'>
              <Box>
                <Text as="h5" variant="bodyMd" fontWeight="semibold">Center Your Map Location</Text>
                <Text as="h5" variant="bodySm">Enter an address or intersection to center your map to</Text>
              </Box>
              
              <Select
                label="Location to Center"
                labelHidden
                options={locationList}
                onChange={(value: string) => onUpdate('center', value)}
                value={data.center}
              />
            </BlockStack>
          </BlockStack>
        </Grid.Cell>

        <Grid.Cell>
          <BlockStack gap='400'>
            <Card background="bg-surface-secondary">
              <Text as='p' variant='bodySm'>The actual size of your map may vary depending on the HTML and CSS of your site. Make sure your site can handle the sizing of the map appropriately.</Text>
            </Card>
            <BlockStack gap='200'>
              <Box>
                <Text as="h5" variant="bodyMd" fontWeight="semibold">Zoom Level</Text>
                <Text as="h5" variant="bodySm">Set the zoom level of your map</Text>
              </Box>
              
              <RangeSlider
                label="Zoom Level of the Map"
                labelHidden
                value={settings.zoom}
                min={0}
                max={22}
                onChange={(value:number) => onUpdate('zoom', value)}
                output
                prefix={<p>0</p>}
                suffix={
                  <p
                    style={{
                      minWidth: '24px',
                      textAlign: 'right',
                    }}
                  >
                    {settings.zoom}
                  </p>
                }
              />
            </BlockStack>
          </BlockStack>
        </Grid.Cell>

      </Grid>
    </Card>
  );
}
