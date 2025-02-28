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
  IconPhone, IconSend, IconClock, 
  IconLinkedInCircled, IconFacebookCircled, IconInstagramCircled, IconXCircled, IconPinterestCircled, IconTikTokCircled
} from 'app/res/icons';
import { hexToRgb } from "@shopify/polaris";
import { renderMarker } from 'app/components/Functions';

export const MapPreviewerRight = ({settings, data} : MapPreviewerProps) => {
  const markerStyle = {width:settings.marker.width+'px',height:settings.marker.height+'px'};

  const openHours = data ? data.hrs : [
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

  const renderLogo = () => {
    const logoSrc = data ? data.logo : "/images/h1-logo.svg";
    return (<img src={logoSrc} style={{height:'38px'}} />);
  }

  const renderSocialIcon = (type: string, key: string) => {
    switch (type) {
      case "in":
        return (<span key={key}><IconLinkedInCircled color1={settings.popup.font_color.secondary} /></span>);
        break;
      case "facebook":
        return (<span key={key}><IconFacebookCircled color1={settings.popup.font_color.secondary} /></span>);
        break;
      case "instagram":
        return (<span key={key}><IconInstagramCircled color1={settings.popup.font_color.secondary} /></span>);
        break;
      case "tiktok":
        return (<span key={key}><IconTikTokCircled color1={settings.popup.font_color.secondary} /></span>);
        break;
      case "pinterest":
        return (<span key={key}><IconPinterestCircled color1={settings.popup.font_color.secondary} /></span>);
        break;
      case "x":
        return (<span key={key}><IconXCircled color1={settings.popup.font_color.secondary} /></span>);
        break;
      default:
        break;
    }
  };

  return (

    <div className='panel panel--map' style={{width:settings.map.width, height:settings.map.height,position:'relative'}}>
      <div className='marker-wrap'>
        <div className="markerWrapper" style={{
          transform:'translateY(-50%)',
          width: settings.marker.width,
          height: settings.marker.height,
        }}>
          {renderMarker(settings.marker, markerStyle)}
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
              <InlineStack align="center">{renderLogo()}</InlineStack>
              <span style={{color:settings.popup.font_color.primary}}><Text alignment='center' as='h5' variant='bodySm' fontWeight='bold'>{data ? data.location : 'H1 Web DevelopmentDenver (Main Office)'}</Text></span>
            </BlockStack>
            <span style={{color:settings.popup.font_color.primary}}><Text alignment='center' as='h5' variant='bodyXs'>{data ? data.address : '201 Columbine Street, Unit 300Denver, CO 80206'}</Text></span>
            
            <BlockStack gap="100">
              <InlineStack gap="200" blockAlign='center'>
                <span><IconPhone color1={settings.popup.font_color.secondary} /></span>
                <a href="tel:3032259372" style={{textDecorationColor:settings.popup.font_color.secondary}}><span style={{color:settings.popup.font_color.primary}}><Text alignment='center' as='h5' variant='bodyXs'>{data ? data.phone : '(303) 225-9372'}</Text></span></a>
              </InlineStack>
              <InlineStack gap="200" blockAlign='center'>
                <span><IconSend color1={settings.popup.font_color.secondary} /></span>
                <a href="https://h1webdev.com" style={{textDecorationColor:settings.popup.font_color.secondary}}><span style={{color:settings.popup.font_color.primary}}><Text alignment='center' as='h5' variant='bodyXs'>{data ? data.url : 'h1webdev.com'}</Text></span></a>
              </InlineStack>
              <InlineStack gap="200" wrap={false}>
                <span><IconClock color1={settings.popup.font_color.secondary} /></span>
                <BlockStack>
                  <table>
                    <tbody>
                    {openHours.map((x,i) => (
                      <tr key={'hr-' + i}>
                        <td><span style={{color:settings.popup.font_color.primary}}><Text alignment='center' as='h5' variant='bodyXs'>{x[0]}</Text></span></td>
                        <td><span style={{color:settings.popup.font_color.primary}}><Text alignment='center' as='h5' variant='bodyXs'>{x[1]}</Text></span></td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </BlockStack>
              </InlineStack>
              <InlineStack gap="200" align="center">
                {data && data.socials.map(({type, url}, i) => renderSocialIcon(type, 'socialblock-' + type + '-' + i))}
                {!data && (
                  <Box>
                    <IconLinkedInCircled color1={settings.popup.font_color.secondary} />
                    <IconFacebookCircled color1={settings.popup.font_color.secondary} />
                  </Box>
                )}
              </InlineStack>
            </BlockStack>

          </BlockStack>
        </div>
      </div>
    </div>
  );
}
