import {useState, useCallback} from 'react';
import {
  Layout,
  BlockStack,
  Card,
  Text,
  Select,
} from "@shopify/polaris";

import { fontList, ColorType, ThemeType } from './defines';
import { ColorPickerBox } from '../../components/ColorBox';


interface ThemeBlockProps {
  settings: ThemeType,
  update: Function,
}
export const ThemeBlock = ({settings, update} : ThemeBlockProps) => {
  
  const [data, setData] = useState(settings);

  const onUpdate = (field:string, value:(string|ColorType)) => {
    const newData = {...data, [field]:value};
    setData(newData);
    update('theme', newData);
  }

  const fontListOptions = fontList.map((x, i) => ({label:x, value:x}));

  return (
    <Card>
      <Layout>
        <Layout.Section>
          <BlockStack gap='400'>
            <Text as="h5" variant="bodyMd" fontWeight="semibold">Theme Colors</Text>
            <ColorPickerBox label='Primary Theme Color' value={data.color.primary} update={(color:string) => {onUpdate('color', {...data.color, primary:color});}} />
            <ColorPickerBox label='Secondary Theme Color' value={data.color.secondary} update={(color:string) => {onUpdate('color', {...data.color, secondary:color});}} />
          </BlockStack>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <BlockStack gap='400'>
            <Text as="h5" variant="bodyMd" fontWeight="semibold">Theme Fonts</Text>
            <Select
              label="Primary Font Family"
              options={fontListOptions}
              onChange={(value: string) => onUpdate('primary_font', value)}
              value={data.primary_font}
            />
            <Select
              label="Secondary Font Family"
              options={fontListOptions}
              onChange={(value: string) => onUpdate('secondary_font', value)}
              value={data.secondary_font}
            />
          </BlockStack>
        </Layout.Section>
      </Layout>  
    </Card>
  );
}
