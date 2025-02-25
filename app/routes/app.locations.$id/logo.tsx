import { useState } from "react";
import {
  Bleed,
  Box,
  Button,
  Card,
  DropZone,
  Grid,
  Icon,
  InlineStack,
  Select,
  Text,
  TextField,
  Thumbnail,
  BlockStack,
} from "@shopify/polaris";
import { XCircleIcon, XIcon, DeleteIcon } from "@shopify/polaris-icons";

import { SocialsType, socialOptions } from "./defines";

interface LogoBlockProps {
  logo: string,
  update: Function,
}

export function LogoBlock({logo, update}:LogoBlockProps) {
  const [data, setData] = useState(logo);
  
  const [files, setFiles] = useState<File[]>([]);
  
  const handleDropZoneDrop = (_dropFiles: File[], acceptedFiles: File[], _rejectedFiles: File[]) => {
    setFiles((files) => [...acceptedFiles]),
    update('logo', window.URL.createObjectURL(acceptedFiles[0]));
  };
  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/svg+xml'];

  const fileUpload = !files.length && <DropZone.FileUpload actionHint="Accepts .gif, .jpg, .png and .svg" />;
  const fileList = files.map((file, index) => (
    <InlineStack wrap={false} blockAlign='center' gap="200">
      <a href="#" onClick={(e) => {e.preventDefault(); setFiles([]); update('logo', '');}}>
        <Icon source={XCircleIcon} />
      </a>
      <Text as='span' variant='bodySm'>{file.name}</Text>
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
              <a onClick={(e) => {e.preventDefault(); e.stopPropagation(); setFiles([]); update('logo', '');}}>
                <Icon source={XIcon} />
              </a>
            </Bleed>
          </BlockStack>
        ))}
      </BlockStack>
    </div>
  );

  return (
    <Card>
      <BlockStack gap="200">
        
        <BlockStack gap="100">
          <Text as="h4" variant="headingMd">Add a logo for this location</Text>
          <Text as="p" variant="bodySm" tone="subdued">Add your Company Logo to this location</Text>
        </BlockStack>
          
        <BlockStack gap="100">
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
        
      </BlockStack>
    </Card>
  );
}
