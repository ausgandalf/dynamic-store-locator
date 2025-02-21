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
} from "@shopify/polaris";

import {
  SearchIcon,
  FilterIcon,
} from "@shopify/polaris-icons";

import { MapPreviewerProps } from './defines';
import { 
  IconZoom, IconCustomMarker, IconPhone, IconSend, IconClock, IconLinkedInCircled, IconFacebookCircled,
  IconMarkerDefault, IconMarkerPin, IconMarkerStarred, IconMarkerFlag, IconMarkerBanner, IconMarkerCustom, 
} from 'app/res/icons';
import { hexToRgb } from "@shopify/polaris";
import { Transform } from "stream";


export const MapPreviewerLeft = ({settings}:MapPreviewerProps) => {
  
  const addressItem = (
    <div className='zoom--075' style={{paddingInline:'15px'}}>
      <BlockStack gap='100'>
        <span style={{color:settings.theme.color.primary, fontFamily:settings.theme.primary_font}}><Text as='h6' variant='headingMd'>H1 Web Development</Text></span>
        <span style={{color:settings.theme.color.primary, fontFamily:settings.theme.primary_font}}><Text as='p' variant='bodyMd'>201 Columbine Street, Unit 300Denver, CO 80206</Text></span>
        <span style={{color:settings.theme.color.secondary, fontFamily:settings.theme.secondary_font}}><Text as='p' variant='bodyMd'>(303) 225-9372</Text></span>
        <span><Badge>25 miles away</Badge></span>
      </BlockStack>
    </div>
  );

  return (
    
    <div className='panel panel--list' style={{width: '240px',height:settings.map.height,padding:'20px 10px 10px 10px'}}>
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
  );
}
