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
  Checkbox,
  Divider,
} from "@shopify/polaris";

import { PopupType } from './defines';
import { ColorPickerBox } from '../../components/ColorBox';

interface PopupBlockProps {
  settings: PopupType,
  update: Function,
}
export const PopupBlock = ({settings, update} : PopupBlockProps) => {
  
  const [data, setData] = useState(settings);

  const onUpdate = (field:string, value:(string|number|boolean)) => {
    const newData = {...data, [field]:value};
    setData(newData);
    update('popup', newData);
  }

  return (
    <Card>
      <Grid columns={{xs: 1, sm: 1, md: 2, lg: 2, xl: 2}}>
        <Grid.Cell>
          <div className='rightBorderAboveMd' style={{minHeight:'100%', paddingRight:'20px', width:'100%'}}>
            <BlockStack gap='400'>
              <BlockStack gap='200'>
                <Text as="h5" variant="bodyMd" fontWeight="semibold">Popup Box</Text>
                <Box>
                  <ColorPickerBox label='Background Color' value={data.background_color} update={(color:string) => {onUpdate('background_color', color);}} />
                </Box>
                <Grid columns={{xs: 1, sm: 1, md: 2, lg: 2, xl: 2}}>
                  <Grid.Cell>  
                    <ColorPickerBox label='Border Color' value={data.border_color} update={(color:string) => {onUpdate('border_color', color);}} />
                  </Grid.Cell>
                  <Grid.Cell>
                    <Checkbox
                      label="show border"
                      checked={data.show_border}
                      onChange={(newChecked: boolean) => {onUpdate('show_border', newChecked);}}
                    />
                  </Grid.Cell>
                </Grid>
                <Box>
                  <RangeSlider
                    label="corner radius"
                    value={settings.border_radius}
                    min={0}
                    max={20}
                    onChange={(value:number) => onUpdate('border_radius', value)}
                    output
                    prefix={<p>0</p>}
                    suffix={
                      <p
                        style={{
                          minWidth: '24px',
                          textAlign: 'right',
                        }}
                      >
                        {settings.border_radius}pt
                      </p>
                    }
                  />
                </Box>
              </BlockStack>
              <Divider/>
              <BlockStack gap='200'>
                <Text as="h5" variant="bodyMd" fontWeight="semibold">Font Colors</Text>
                <Box>
                  <ColorPickerBox label='Primary Theme Color' value={data.font_color.primary} update={(color:string) => {onUpdate('font_color', {...data.font_color, primary:color});}} />
                </Box>
                <Box>
                  <ColorPickerBox label='Secondary Theme Color' value={data.font_color.secondary} update={(color:string) => {onUpdate('font_color', {...data.font_color, secondary:color});}} />
                </Box>
              </BlockStack>
            </BlockStack>
          </div>
        </Grid.Cell>

        <Grid.Cell>
          <BlockStack gap='400'>
            
            <Text as="h5" variant="bodyMd" fontWeight="semibold">Drop Shadow</Text>
            
            <Grid columns={{xs: 1, sm: 1, md: 2, lg: 2, xl: 2}}>
              <Grid.Cell>
                <ColorPickerBox disabled={!data.shadow.enabled} label='Shadow Color' value={data.shadow.color} update={(color:string) => {onUpdate('shadow', {...data.shadow, color});}} />
              </Grid.Cell>
              <Grid.Cell>
                <Checkbox
                    label="show drop shadow"
                    checked={data.shadow.enabled}
                    onChange={(newChecked: boolean) => {onUpdate('shadow', {...data.shadow, enabled:newChecked});}}
                  />
              </Grid.Cell>
            </Grid>

            <BlockStack gap="400">

              <RangeSlider
                label="transparency"
                value={settings.shadow.transparency}
                min={0}
                max={100}
                onChange={(value:number) => onUpdate('shadow', {...data.shadow, transparency:value})}
                output
                prefix={<p>0%</p>}
                suffix={
                  <p
                    style={{
                      minWidth: '24px',
                      textAlign: 'right',
                    }}
                  >
                    {settings.shadow.transparency}%
                  </p>
                }
                disabled={!settings.shadow.enabled}
              />

              <RangeSlider
                label="blur radius"
                value={settings.shadow.blur}
                min={0}
                max={20}
                onChange={(value:number) => onUpdate('shadow', {...data.shadow, blur:value})}
                output
                prefix={<p>0</p>}
                suffix={
                  <p
                    style={{
                      minWidth: '24px',
                      textAlign: 'right',
                    }}
                  >
                    {settings.shadow.blur}pt
                  </p>
                }
                disabled={!settings.shadow.enabled}
              />

              <RangeSlider
                label="anchor x coordinate"
                value={settings.shadow.x}
                min={-10}
                max={10}
                onChange={(value:number) => onUpdate('shadow', {...data.shadow, x:value})}
                output
                prefix={<p>-10</p>}
                suffix={
                  <p
                    style={{
                      minWidth: '24px',
                      textAlign: 'right',
                    }}
                  >
                    {settings.shadow.x}pt
                  </p>
                }
                disabled={!settings.shadow.enabled}
              />

              <RangeSlider
                label="anchor y coordinate"
                value={settings.shadow.y}
                min={-10}
                max={10}
                onChange={(value:number) => onUpdate('shadow', {...data.shadow, y:value})}
                output
                prefix={<p>-10</p>}
                suffix={
                  <p
                    style={{
                      minWidth: '24px',
                      textAlign: 'right',
                    }}
                  >
                    {settings.shadow.y}pt
                  </p>
                }
                disabled={!settings.shadow.enabled}
              />
            </BlockStack>
            
          </BlockStack>
        </Grid.Cell>

      </Grid>
    </Card>
  );
}
