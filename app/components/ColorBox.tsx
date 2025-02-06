import {useState, useCallback} from 'react';
import { hsbToHex } from '@shopify/polaris';
import { 
  HSBAColor, 
  Popover, 
  Button, 
  Text, 
  TextField, 
  Box, 
  ColorPicker, 
  InlineStack, 
  BlockStack,
  SkeletonPage,
  SkeletonDisplayText,
  SkeletonBodyText,
  SkeletonThumbnail,
} from "@shopify/polaris";

export const hexToHsba = (hex: string) => {
  // Remove "#" if present
  hex = hex.replace(/^#/, '');

  // Convert to RGB
  let r = parseInt(hex.substring(0, 2), 16) / 255;
  let g = parseInt(hex.substring(2, 4), 16) / 255;
  let b = parseInt(hex.substring(4, 6), 16) / 255;

  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let delta = max - min;

  // Calculate Hue
  let hue = 0;
  if (delta !== 0) {
    if (max === r) {
      hue = ((g - b) / delta) % 6;
    } else if (max === g) {
      hue = (b - r) / delta + 2;
    } else {
      hue = (r - g) / delta + 4;
    }
    hue = Math.round(hue * 60);
    if (hue < 0) hue += 360;
  }

  // Calculate Saturation
  let saturation = max === 0 ? 0 : (delta / max);

  // Calculate Brightness
  let brightness = max;

  return { hue, saturation, brightness, alpha:1 };
};

interface ColorPickerBoxProps {
  label?:string,
  value:string,
  update:Function,
}

export const SkeletonColorPickerBox = () => {
  return (
    <Box>
      <InlineStack gap="400" wrap={false} align="start">
        <Box width='40px'>
          {/* <SkeletonThumbnail size="small" /> */}
          <div style={{
            backgroundColor: 'var(--p-color-bg-fill-tertiary)',
            borderRadius: '7.5px',
            border: 'solid 1px #ccc',
            cursor: 'pointer',
            display:'inline-block',
            width:'40px',
            height:'40px',
          }}></div>
        </Box>
        <Box width='100%'>
          <BlockStack gap='100'>
            <SkeletonDisplayText size="small"/>
            <SkeletonBodyText lines={1}/>
          </BlockStack>
        </Box>
      </InlineStack>
    </Box>
  );
}

export const ColorPickerBox = ({label, value, update}:ColorPickerBoxProps) => {
  const [color, setColor] = useState(hexToHsba(value));
  const [popoverActive, setPopoverActive] = useState(false);
  const togglePopover = useCallback(() => setPopoverActive((active) => !active), []);

  const handleColorChange = (newColor:HSBAColor) => {
    setColor(newColor);
    update(hsbToHex(newColor));
  };

  const hexColor = useCallback(() => hsbToHex(color),[color]);

  return (
    <Box>
      <InlineStack gap='400'>
        <Box>
          <Popover 
            active={popoverActive} 
            activator={
              <div onClick={togglePopover} style={{
                backgroundColor:hexColor(),
                borderRadius: '7.5px',
                border: 'solid 1px #ccc',
                cursor: 'pointer',
                display:'inline-block',
                width:'40px',
                height:'40px',
              }}></div>
            } 
            onClose={togglePopover}
          >
            <Popover.Section>
                <ColorPicker onChange={handleColorChange} color={color} />
            </Popover.Section>
          </Popover>
        </Box>
        <BlockStack>
            {label && (<Text as="span" variant="bodyMd" fontWeight="semibold">{label}</Text>)}
            <Text as="span" variant="bodyMd">{hexColor()}</Text>
        </BlockStack>
      </InlineStack>
    </Box>
  );
};

export default ColorPickerBox;