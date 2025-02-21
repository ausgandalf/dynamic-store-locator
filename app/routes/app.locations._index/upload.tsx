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

interface UploadBlockProps {
  file: string,
  update: Function,
}

export function UploadBlock({file, update}:UploadBlockProps) {
  const [data, setData] = useState(file);
  
  const [files, setFiles] = useState<File[]>([]);
  
  const handleDropZoneDrop = (_dropFiles: File[], acceptedFiles: File[], _rejectedFiles: File[]) => {
    setFiles((files) => [...acceptedFiles]),
    update('logo', window.URL.createObjectURL(acceptedFiles[0]));
  };
  const validFileTypes = ['text/csv'];

  const fileUpload = !files.length && <DropZone.FileUpload actionHint="Click to choose a file, or drag/drop your .csv file here" />;
  const fileList = files.map((file, index) => (
    <InlineStack wrap={false} blockAlign='center' gap="200">
      <a href="#" onClick={(e) => {e.preventDefault(); setFiles([]); update('file', '');}}>
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
                validFileTypes.includes(file.type)
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
   
    <BlockStack gap="100">
      
      <DropZone onDrop={handleDropZoneDrop} allowMultiple={false}>
        {uploadedFiles}
        {fileUpload}
      </DropZone>

      <BlockStack gap="200">
        {fileList}
      </BlockStack>
        
    </BlockStack>
  );
}
