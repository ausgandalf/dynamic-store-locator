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
  InlineStack,
  Thumbnail,
  Icon,
  DropZone,
  Bleed,
  Button,
} from "@shopify/polaris";
import { 
  XCircleIcon,
  XIcon, 
} from "@shopify/polaris-icons";

import { ColorPickerBox } from '../../components/ColorBox';
import { MarkerType, markerTypes, markerWidthList, markerHeightList } from './defines';

interface MarkerBlockProps {
  settings: MarkerType,
  update: Function,
  section?: string,
}
export const MarkerBlock = ({settings, update, section = ''} : MarkerBlockProps) => {
  
  const [data, setData] = useState(settings);
  
  const onUpdate = (field:string, value:(string|number)) => {
    const newData = {...data, [field]:value};
    setData(newData);
    update('marker', newData);
  }

  const onUpdateMarkerIcon = (icon:string) => {
    onUpdate('preset', icon);
  }

  const markerIconClass = (icon:string) => {
    let initialClass = 'markerTypeButton';
    if (section == 'location') initialClass += ' small ';
    return initialClass + ((icon == data.preset) ? ' active' : '');
  }

  const [files, setFiles] = useState<File[]>([]);

  const handleDropZoneDrop = (_dropFiles: File[], acceptedFiles: File[], _rejectedFiles: File[]) => {
    setFiles((files) => [...acceptedFiles]),
    onUpdate('custom', window.URL.createObjectURL(acceptedFiles[0]));
  };
  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/svg+xml'];

  const fileUpload = !files.length && <DropZone.FileUpload actionHint="Accepts .gif, .jpg, .png and .svg" />;
  const fileList = files.map((file, index) => (
    <InlineStack wrap={false} blockAlign='center' gap="200">
      <a href="#" onClick={(e) => {e.preventDefault(); setFiles([]); onUpdate('custom', '');}}>
        <Icon source={XCircleIcon} />
      </a>
      <Text as='span' variant='bodySm'>h1-logo1.svg</Text>
    </InlineStack>
  ));

  const uploadedFiles = files.length > 0 && (
    <div style={{padding: '0', height: '100%', display:'flex',alignItems:'center', justifyContent:'center'}}>
      <BlockStack gap="100" align='center'>
        {files.map((file, index) => (
          <BlockStack key={index} align='center' inlineAlign='center'>
            <Thumbnail
              size="medium"
              alt={file.name}
              source={
                validImageTypes.includes(file.type)
                  ? window.URL.createObjectURL(file)
                  : XIcon
              }
            />
            <Bleed marginBlockStart="200">
              <a onClick={(e) => {e.preventDefault(); e.stopPropagation(); setFiles([]); onUpdate('custom', '');}}>
                <Icon source={XIcon} />
              </a>
            </Bleed>
          </BlockStack>
        ))}
      </BlockStack>
    </div>
  );


  return (
    <Box>
      <Box paddingBlockEnd='200'>
        <BlockStack gap="100">
          <Text as="h5" variant="bodyMd" fontWeight='semibold'>Styled Marker</Text>
          <Text as="p" variant="bodySm">Choose a style and color for your location marker</Text>
        </BlockStack>
      </Box>
      <Grid columns={{xs: 1, sm: 1, md: 2, lg: 2, xl: 2}}>
        <Grid.Cell>
          <div className='rightBorderAboveMd' style={{minHeight:'100%', paddingRight:'20px', width:'100%'}}>
            <BlockStack gap="200">
              <InlineStack gap="100">
                {markerTypes.map(({value, icon}, index) => 
                  <a href="#" className={markerIconClass(value)} onClick={(e) => {e.preventDefault(); onUpdateMarkerIcon(value)}} key={value}>
                    {icon}
                  </a>
                )}
            </InlineStack>
              { data.preset == 'custom' && (
                <BlockStack gap="100">
                  <Text as='p' variant='bodyMd'>Add your custom marker</Text>
                  <Grid columns={{xs: 1, sm: 1, md: 2, lg: 2, xl: 2}}>
                    <Grid.Cell>
                    <DropZone onDrop={handleDropZoneDrop} allowMultiple={false}>
                      {uploadedFiles}
                      {fileUpload}
                    </DropZone>
                    </Grid.Cell>
                    <Grid.Cell>
                      <BlockStack gap="200">
                        <Text as='p' variant='bodyMd'>We support .gif, .jpg, .png, and .svg files up to 3MB</Text>
                        {fileList}
                      </BlockStack>
                    </Grid.Cell>
                  </Grid>
                </BlockStack>
              )}
            </BlockStack>
          </div>

        </Grid.Cell>

        <Grid.Cell>
          <BlockStack gap='200'>
            <ColorPickerBox disabled={data.preset == 'custom'} label='Marker Color' value={data.color} update={(color:string) => {onUpdate('color', color);}} />
            <BlockStack gap='100'>
              <Select
                label="marker height"
                requiredIndicator
                options={markerHeightList}
                onChange={(value: string) => onUpdate('height', value)}
                value={data.height}
              />
              <Select
                label="marker width"
                requiredIndicator
                options={markerWidthList}
                onChange={(value: string) => onUpdate('width', value)}
                value={data.width}
              />
            </BlockStack>
          </BlockStack>
        </Grid.Cell>

      </Grid>
    </Box>
  );
}
