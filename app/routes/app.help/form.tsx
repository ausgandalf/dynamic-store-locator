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
} from "@shopify/polaris";

import {
  CaretUpIcon,
  CaretDownIcon,
} from '@shopify/polaris-icons';

interface TicketFormProps {
  options: Array<any>,
  data: Object,
  setData:  Function,
  errors: Object,
  onSubmit: Function,
}

export const TicketForm = (props: TicketFormProps) => {
  let {options, data, setData, errors, onSubmit} = props;

  return (
    <Card>
      <BlockStack gap="400">
        <BlockStack gap="200">
          <Text as="h2" variant="headingLg">Submit A Ticket</Text>
          <Text as="p" variant="bodyMd">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et arcu ut felis auctor eleifend vel eget purus.</Text>
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
                <DropZone label="Attach any files that may be helpful towards your issue">
                  <DropZone.FileUpload />
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