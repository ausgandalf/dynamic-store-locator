import {useState, useCallback} from 'react';
import {
  Layout,
  Card,
  FormLayout,
  Text,
  Select,
  Box,
  Button,
  Tabs,
  TextField,
  Icon,
  BlockStack,
  Tooltip,
  Link,
  InlineStack,
  Grid,
  Checkbox,
  Thumbnail,
  ChoiceList,
  Badge,
  OptionList,
  Bleed,
  Banner,
  InlineGrid,
  DatePicker,
} from "@shopify/polaris";

import {
  QuestionCircleIcon,
  StoreManagedIcon,
  RefreshIcon,
} from "@shopify/polaris-icons"

interface B2BFormProps {
  updateAction: Function,
}

export function B2BForm(props:B2BFormProps) {
  const {updateAction} = props;

  const handleChange = (newChecked: boolean, id: string) => {
    // TODO
    updateAction(id, newChecked);
  };

  const [{month, year}, setDate] = useState({month: 1, year: 2018});
  const [selectedDates, setSelectedDates] = useState({
    start: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
    end: new Date('Sat Feb 10 2018 00:00:00 GMT-0500 (EST)'),
  });

  const handleMonthChange = useCallback(
    (month: number, year: number) => setDate({month, year}),
    [],
  );

  return (
    <BlockStack gap="400">

      <Card>
        <BlockStack gap="400">

          <BlockStack gap="200">
            <InlineStack gap="200" blockAlign="center">
              <Text as="h4" variant="headingLg">Shopify B2B</Text>
              <Badge progress="complete" tone="success">Enabled</Badge>
              <Badge progress="incomplete">Disabled</Badge>
            </InlineStack>
            <Text as="p">Automatically display and update the information for your Shopify B2B customers on your map.</Text>
          </BlockStack>

          <Box paddingBlockStart="200">
            <BlockStack gap="200">
              <Text as="h6" variant="headingMd">Shopify B2B Account</Text>
              
              <Bleed marginInline="200">
                <OptionList
                  onChange={(selected: string[]) => {}}
                  options={[
                    {value: 'inside', label: 'My B2B customers are in this Shopify account'},
                    {value: 'outside', label: 'My B2B customers are in another Shopify account'},
                  ]}
                  selected={[]}
                  allowMultiple
                />
              </Bleed>
              
            </BlockStack>
          </Box>

          <Box>
            <BlockStack gap="200">
              <Text as="h6" variant="headingMd">Shopify API Key</Text>
              
              <TextField
                id="b2b_publickey"
                label="Shopify B2B Public API Key"
                onChange={(newValue:string) => {}}
                value=""
                autoComplete="off"
                placeholder="Enter an Shopify B2B Public API Key."
                align='center'
              />

              <TextField
                id="b2b_privatekey"
                label="Shopify B2B Private API Key"
                onChange={(newValue:string) => {}}
                value=""
                autoComplete="off"
                placeholder="Enter an Shopify B2B Private API Key."
                align='center'
              />
              
            </BlockStack>

          </Box>

          <Box>
            <Banner tone="warning">
              <p style={{marginBlockEnd:"10px"}}>In order to test that your API Key credentials are valid, please verify your connection using the button below.</p>
              <Button>Verify Connection</Button>
            </Banner>
          </Box>

          </BlockStack>
      </Card>

      <Card>
        <BlockStack gap="400">
          <div style={{display:"flex", justifyContent:"space-between"}}>
            <BlockStack gap="200">
              <Box>
                <Text as="h4" variant="headingLg">Sync Settings</Text>
              </Box>

              <Box>
                <InlineGrid>
                  <Checkbox
                    id="sync-all"
                    label="Sync All Company Locations"
                    checked={false}
                    onChange={handleChange}
                  />
                  <Checkbox
                    id="sync-orders"
                    label="Only Sync Company Locations with Orders"
                    checked={true}
                    onChange={handleChange}
                  />
                </InlineGrid>
              </Box>
            </BlockStack>

            <BlockStack align='center'>
              <Box>
                <Button variant='primary' icon={RefreshIcon}>Re-sync Shopify B2B</Button>
              </Box>
              <Box padding="200">
                <Text as='p' variant='bodyXs' fontWeight='semibold' tone='disabled'>Last synced: 07/22/2024</Text>
              </Box>
            </BlockStack>
          </div>

          <BlockStack gap="200">
            <Text as='h6' variant='bodyMd' fontWeight='semibold'>Set Order Date Range</Text>
            <ChoiceList
              allowMultiple
              title="Set Order Date Range"
              titleHidden
              choices={[
                {
                  label: 'All-time',
                  value: 'all-time',
                },
                {
                  label: 'Custom Defined Date Range',
                  value: 'ranged',
                },
              ]}
              selected={[]}
              onChange={(selected:[]) => {}}
            />

          </BlockStack>

          <Card>
            <DatePicker
              month={month}
              year={year}
              onChange={setSelectedDates}
              onMonthChange={handleMonthChange}
              selected={selectedDates}
              multiMonth
              allowRange
            />
          </Card>


        </BlockStack>
      </Card>
          
    </BlockStack>
    
      
  );
}
