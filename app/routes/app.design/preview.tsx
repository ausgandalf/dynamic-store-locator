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

import { SettingsType } from './defines';
import { 
  IconZoom, IconCustomMarker, IconPhone, IconSend, IconClock, IconLinkedIn, IconFacebook,
  IconMarkerDefault, IconMarkerPin, IconMarkerStarred, IconMarkerFlag, IconMarkerBanner, IconMarkerCustom, 
} from 'app/res/icons';
import { hexToRgb } from "@shopify/polaris";
import { Transform } from "stream";


export const MapPreviewer = ({settings} : SettingsType) => {
  const markerStyle = {width:settings.marker.width+'px',height:settings.marker.height+'px'};
  const addressItem = (
    <div className='zoom--075' style={{paddingInline:'15px'}}>
      <BlockStack gap='100'>
        <span style={{color:settings.theme.color.primary}}><Text as='h6' variant='headingMd'>H1 Web Development</Text></span>
        <span style={{color:settings.theme.color.primary}}><Text as='p' variant='bodyMd'>201 Columbine Street, Unit 300Denver, CO 80206</Text></span>
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

  const boxShadowColor = () => {
    const rgbColor = hexToRgb(settings.popup.shadow.color);
    return 'rgba(' + rgbColor.red + ',' + rgbColor.green + ',' + rgbColor.blue + ', ' + (settings.popup.shadow.transparency / 100) + ')';
  }

  const renderMarker = () => {
    switch (settings.marker.preset) {
      case "default":
        return (<IconMarkerDefault color1={settings.marker.color} />);
        break;
      case "pin":
        return (<IconMarkerPin color1={settings.marker.color} />);
        break;
      case "starred":
        return (<IconMarkerStarred color1={settings.marker.color} />);
        break;
      case "flag":
        return (<IconMarkerFlag color1={settings.marker.color} />);
        break;
      case "banner":
        return (<IconMarkerBanner color1={settings.marker.color} />);
        break;
      case "custom":
        if (settings.marker.custom != '') return (<img src="/images/custom-marker.svg" style={markerStyle} />);
      default:
        return (<IconMarkerDefault color1={settings.marker.color} />);
        break;
    }
  };

  return (
    <Box background='bg-surface-secondary'>
      <div className='design-previewer-wrap'>
        <div className='design-previewer'>
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
        
          <div className='panel panel--map' style={{width:settings.map.width, height:settings.map.height,position:'relative'}}>
            <div className='marker-wrap'>
              <div className="markerWrapper" style={{
                transform:'translateY(-50%)',
                width: settings.marker.width,
                height: settings.marker.height,
              }}>
                {renderMarker()}
              </div>
              <div className='info-board' style={{
                background:settings.popup.background_color,
                borderRadius:settings.popup.border_radius + 'px',
                border:settings.popup.show_border ? 'solid 1px ' + settings.popup.border_color : 'none',
                boxShadow:settings.popup.shadow.enabled ? 
                  settings.popup.shadow.x + 'px ' +  settings.popup.shadow.y + 'px ' + settings.popup.shadow.blur + 'px ' + boxShadowColor()
                  : 
                  'none',
                marginLeft: (parseInt(settings.marker.width) + 5) + 'px',
                padding:'12px',
                position: 'absolute',
                left: settings.marker.width+'px',
                top: 0,
                transform: 'translateY(-50%)',
                width:'180px',
              }}>
                <BlockStack gap="200">
                  <BlockStack>
                    <InlineStack align="center"><img src="/images/h1-logo.svg" style={{height:'38px'}} /></InlineStack>
                    <span style={{color:settings.popup.font_color.primary}}><Text alignment='center' as='h5' variant='bodySm' fontWeight='bold'>H1 Web DevelopmentDenver (Main Office)</Text></span>
                  </BlockStack>
                  <span style={{color:settings.popup.font_color.primary}}><Text alignment='center' as='h5' variant='bodyXs'>201 Columbine Street, Unit 300Denver, CO 80206</Text></span>
                  
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
                          <tbody>
                          {openHours.map((x,i) => (
                            <tr key={i}>
                              <td><span style={{color:settings.popup.font_color.primary}}><Text alignment='center' as='h5' variant='bodyXs'>{x[0]}</Text></span></td>
                              <td><span style={{color:settings.popup.font_color.primary}}><Text alignment='center' as='h5' variant='bodyXs'>{x[1]}</Text></span></td>
                            </tr>
                          ))}
                          </tbody>
                        </table>
                      </BlockStack>
                    </InlineStack>
                    <InlineStack gap="200" align="center">
                      <IconLinkedIn color1={settings.popup.font_color.secondary} />
                      <IconFacebook color1={settings.popup.font_color.secondary} />
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
