import {useState, useCallback} from 'react';
import {DropZone} from '@shopify/polaris';
import {
  Text,
  Card,
  BlockStack,
  Box,
  Button,
  InlineStack,
  Icon,
  Collapsible,
  Select,
  TextField,
  Thumbnail,
} from "@shopify/polaris";

import {
  NoteIcon,
} from '@shopify/polaris-icons';

interface TicketFormProps {
  options: Array<any>,
  data: Object,
  setData:  Function,
  errors: Object,
  onSubmit: Function,
}

export const TicketForm = (props: TicketFormProps) => {
  const {options, data, setData, errors, onSubmit} = props;
  const [files, setFiles] = useState<File[]>([]);

  const handleDropZoneDrop = useCallback(
    (_dropFiles: File[], acceptedFiles: File[], _rejectedFiles: File[]) =>
      setFiles((files) => [...files, ...acceptedFiles]),
    [],
  );
  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/svg+xml'];
  const fileUpload = !files.length && <DropZone.FileUpload />;
  const uploadedFiles = files.length > 0 && (
    <div style={{padding: '10px'}}>
      <InlineStack gap='200'>
        {files.map((file, index) => (
          <BlockStack align="center" key={'file-thumb-' + file.name + '-' + index}>
            <Thumbnail
              size="small"
              alt={file.name}
              source={
                validImageTypes.includes(file.type)
                  ? window.URL.createObjectURL(file)
                  : NoteIcon
              }
            />
            <div>
              {file.name}{' '}
              <Text variant="bodySm" as="p">
                {file.size} bytes
              </Text>
            </div>
          </BlockStack>
        ))}
      </InlineStack>
    </div>
  );

  return (
    <Card>
      <BlockStack gap="400">
        <BlockStack gap="200">
          <Text as="h2" variant="headingLg">Submit A Ticket</Text>
          <Text as="p" variant="bodyMd">Need help? Submit a ticket, and our team will assist you soon.</Text>
        </BlockStack>
        
        <BlockStack gap="200">
          <Text as="h4" variant="headingMd" tone="subdued">Ticket Form</Text>
          <Box paddingInline="400">
            <BlockStack gap="200">
              <Box>
                <Select
                  id="type"
                  label="What is the reason for this request?"
                  options={options}
                  onChange={(type) => setData({ ...data, type })}
                  error={errors.title}
                  value={data.type}
                  requiredIndicator={true}
                />
              </Box>

              <Box>
                <TextField
                  id="issue"
                  label="Tell us more about your issue"
                  onChange={(issue) => setData({ ...data, issue })}
                  error={errors.issue}
                  value={data.issue}
                  autoComplete="off"
                />
              </Box>

              <Box>
                <DropZone onDrop={handleDropZoneDrop} label="Attach any files that may be helpful towards your issue">
                  {uploadedFiles}
                  {fileUpload}
                </DropZone>
              </Box>

              <div style={{paddingBlockStart: "20px", textAlign: "center"}}>
                <Button onClick={() => {onSubmit()}}>Submit My Ticket</Button>
              </div>
            </BlockStack>
          </Box>
          
        </BlockStack>

      </BlockStack>
    </Card>
  );
}