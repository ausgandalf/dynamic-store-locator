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
  
} from 'app/res/icons';
import { hexToRgb } from "@shopify/polaris";

import { MapPreviewerLeft } from "./preview_left";
import { MapPreviewerRight } from "./preview_right";

export const MapPreviewer = ({settings} : MapPreviewerProps) => {

  return (
    <Box background='bg-surface-secondary'>
      <div className='design-previewer-wrap'>
        <div className='design-previewer'>
          <MapPreviewerLeft settings={settings} />
          <MapPreviewerRight settings={settings} />
        </div>
      </div>
    </Box>
  );
}
