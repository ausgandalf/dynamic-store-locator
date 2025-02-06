import {
  Page,
  Layout,
  BlockStack,
  Box,
  Tabs,
  Card,
  Listbox,
  Icon,
  InlineStack,
  Text,
  Divider,
  Bleed,
  TextField,
  Select,
  Badge,
  Scrollable,
  SkeletonPage,
  SkeletonDisplayText,
  SkeletonBodyText,
  SkeletonThumbnail,
} from "@shopify/polaris";

import {
  SearchIcon,
  FilterIcon,
} from "@shopify/polaris-icons";

import { IconZoom } from 'app/res/icons';
import { SkeletonColorPickerBox } from "app/components/ColorBox";
import { defaultSettings } from "./defines";

export const SkeletonContent = () => {
  return (
    <Card>
      <Layout>
        <Layout.Section>
          <BlockStack gap='400'>
            <SkeletonDisplayText size="medium"/>
            <SkeletonColorPickerBox/>
            <SkeletonColorPickerBox/>
          </BlockStack>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <BlockStack gap='400'>
            <SkeletonDisplayText size="medium"/>
            <SkeletonBodyText lines={2}/>
          </BlockStack>
        </Layout.Section>
      </Layout>  
    </Card>
  );
}

export const Skeleton = () => {

  const addressItem = (
    <div className='zoom--075' style={{paddingInline:'15px'}}>
      <BlockStack gap='100'>
        <SkeletonBodyText lines={3} />
        <span><Badge><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></Badge></span>
      </BlockStack>
    </div>
  );

  return (
    <Box background='bg-surface-secondary'>
      <div className='design-previewer-wrap'>
        <div className='design-previewer'>
          <div className='panel panel--list' style={{width: '240px',height:defaultSettings.map.height,padding:'20px 10px 10px 10px'}}>
            <BlockStack gap="200">
              <BlockStack gap="100">

                <div className='zoom--075'>
                  <TextField
                    label="Address"
                    labelHidden
                    value=""
                    onChange={(newValue:string) => {}}
                    prefix={<Icon source={SearchIcon} tone="base" />}
                    autoComplete="off"
                    placeholder="Enter Address or Zip Code"
                    disabled
                  />
                </div>
                
                <InlineStack align='space-between'>
                  <div className='zoom--075'>
                    <Select
                      label="Location"
                      labelHidden
                      disabled
                      options={[
                        {label: 'Denver Locations', value: 'denver', prefix: <Icon source={FilterIcon} />,},
                      ]}
                    />
                  </div>
                  <div className='zoom--075'>
                    <Select
                      label="Range"
                      labelHidden
                      disabled
                      options={[
                        {label: '25 miles', value: 'denver', prefix: <Icon source={IconZoom} />,},
                      ]}
                    />
                  </div>
                </InlineStack>
              </BlockStack>

              <div style={{border:'solid 1px #efefef',borderRadius:'10px',height:'100%',paddingBlock:'10px',overflow:'hidden'}}>
                <Scrollable style={{height: '100%'}} focusable>
                  <BlockStack gap='200'>
                    {addressItem}
                    <div className='opacity05'><Divider/></div>
                    {addressItem}
                    <div className='opacity05'><Divider/></div>
                    {addressItem}
                    <div className='opacity05'><Divider/></div>
                    {addressItem}
                  </BlockStack>
                </Scrollable>
              </div>

            </BlockStack>
          </div>
          <div className='panel panel--map' style={{
            width:defaultSettings.map.width, 
            height:defaultSettings.map.height,
            position:'relative',
            background: 'var(--p-color-bg-fill-tertiary)',
          }}></div>
        </div>
      </div>
    </Box>

    );
}
