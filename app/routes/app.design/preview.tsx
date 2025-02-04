import {useState, useEffect, useCallback} from 'react';
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher, useLoaderData, useActionData, useNavigation,useSubmit } from "@remix-run/react";
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
} from "@shopify/polaris";

import {
  SearchIcon,
  FilterIcon,
  LocationIcon,
  ReturnIcon,
  SettingsIcon,
} from "@shopify/polaris-icons";

import { SettingsType } from './defines';
import { IconZoom, IconCustomMarker, IconPhone, IconSend, IconClock, IconLinkedIn, IconFacebook } from 'app/res/icons';

export const MapPreviewer = ({settings} : SettingsType) => {
  
  const addressItem = (
    <div className='zoom--075' style={{paddingInline:'15px'}}>
      <BlockStack gap='100'>
        <span style={{color:settings.theme.color.primary}}><Text as='h6' variant='headingMd'>H1 Web Development</Text></span>
        <span style={{color:settings.theme.color.primary}}><Text as='p' variant='bodyMd'>201 Columbine Street, Unit 300 Denver, CO 80206</Text></span>
        <span style={{color:settings.theme.color.secondary}}><Text as='p' variant='bodyMd'>(303) 225-9372</Text></span>
        <span><Badge>25 miles away</Badge></span>
      </BlockStack>
    </div>
  );

  const openHours = [
    ['Mon', '9:00am  –  5:00pm'],
    ['Tue', '9:00am  –  5:00pm'],
    ['Wed', '9:00am  –  5:00pm'],
    ['Thu', '9:00am  –  5:00pm'],
    ['Fri', '9:00am  –  5:00pm'],
  ];

  return (
      <Box background='bg-surface-secondary'>
        <div className='design-previewer-wrap'>
          <div className='design-previewer'>
            <div className='panel panel--list' style={{width: '240px',padding:'20px 10px'}}>
              <BlockStack gap="400">
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
                
                <BlockStack gap='200'>
                  {addressItem}
                  <div className='opacity05'><Divider/></div>
                  {addressItem}
                  <div className='opacity05'><Divider/></div>
                  {addressItem}
                </BlockStack>

              </BlockStack>
            </div>
            
            <div className='panel panel--map' style={{width:'600px', height:'420px',position:'relative'}}>
              <div className='marker-wrap'>
                <img src="/images/custom-marker.svg" style={{width:settings.marker.width+'px',height:settings.marker.height+'px'}} />
                <div className='info-board' style={{
                  background:settings.popup.background_color,
                  borderRadius:settings.popup.border_radius + 'px',
                  border:'solid 1px ' + settings.popup.border_color,
                  marginLeft: '10px',
                  padding:'12px',
                  position: 'absolute',
                  left: settings.marker.width+'px',
                  top: 0,
                  transform: 'translateY(-50%)',
                  width:'180px',
                }}>
                  <BlockStack gap="200">
                    <BlockStack>
                      <Box align="center"><img src="/images/h1-logo.svg" style={{height:'38px'}} /></Box>
                      <span style={{color:settings.popup.font_color.primary}}><Text alignment='center' as='h5' variant='bodySm' fontWeight='bold'>H1 Web Development Denver (Main Office)</Text></span>
                    </BlockStack>
                    <span style={{color:settings.popup.font_color.primary}}><Text alignment='center' as='h5' variant='bodyXs'>201 Columbine Street, Unit 300 Denver, CO 80206</Text></span>
                    
                    <BlockStack gap="100">
                      <InlineStack gap="200" blockAlign='center'>
                        <span><IconPhone color1={settings.popup.font_color.secondary} /></span>
                        <a href="tel:3032259372" style={{textDecorationColor:settings.popup.font_color.secondary}}><span style={{color:settings.popup.font_color.primary}}><Text alignment='center' as='h5' variant='bodyXs'>(303) 225-9372</Text></span></a>
                      </InlineStack>
                      <InlineStack gap="200" blockAlign='center'>
                        <span><IconSend color1={settings.popup.font_color.secondary} /></span>
                        <a href="https://h1webdev.com" style={{textDecorationColor:settings.popup.font_color.secondary}}><span style={{color:settings.popup.font_color.primary}}><Text alignment='center' as='h5' variant='bodyXs'>h1webdev.com</Text></span></a>
                      </InlineStack>
                      <InlineStack gap="200">
                        <span><IconClock color1={settings.popup.font_color.secondary} /></span>
                        <BlockStack>
                          <table>
                          {openHours.map((x,i) => (
                            <tr>
                              <td><span style={{color:settings.popup.font_color.primary}}><Text alignment='center' as='h5' variant='bodyXs'>{x[0]}</Text></span></td>
                              <td><span style={{color:settings.popup.font_color.primary}}><Text alignment='center' as='h5' variant='bodyXs'>{x[1]}</Text></span></td>
                            </tr>
                          ))}
                          </table>
                        </BlockStack>
                      </InlineStack>
                    </BlockStack>

                  </BlockStack>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    );
}
