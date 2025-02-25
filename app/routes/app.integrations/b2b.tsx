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
  RadioButton,
} from "@shopify/polaris";

import {
  QuestionCircleIcon,
  StoreManagedIcon,
  RefreshIcon,
} from "@shopify/polaris-icons"

import { B2BDataType, getDateBy } from "./defines"

interface B2BFormProps {
  settings: B2BDataType,
  updateAction: Function,
}

export function B2BForm(props:B2BFormProps) {
  const {settings, updateAction} = props;
  const [data, setData] = useState(settings);

  const doUpdate = () => {
    updateAction(data);
  }
  
  const b2bLocations = ():string[] => {
    let selected = [];
    if (data.is_customers_here) selected.push('inside');
    if (data.is_customers_out) selected.push('outside');
    return selected;
  };

  const handleKeyChange = (key: string, value: string) => {
    setData({...data, [key]: value});
    doUpdate();
  };

  const handleInsideOutsideChange = (selected: Array<string>) => {
    setData({...data, is_customers_here: selected.includes('inside'), is_customers_out: selected.includes('outside')});
    doUpdate();
  };

  const handleSynTypeChange = (newChecked: boolean, id: string) => {
    if (id == 'sync-all') {
      setData({...data, sync_type: newChecked ? 0 : 1});
    } else if(id == 'sync-orders') {
      setData({...data, sync_type: newChecked ? 1 : 0});
    }
    doUpdate();
  };

  const handleSynMethodChange = (newChecked: boolean, id: string) => {
    if (id == 'sync-auto') {
      setData({...data, sync_method: newChecked ? 1 : 0});
    } else if(id == 'sync-manual') {
      setData({...data, sync_method: newChecked ? 0 : 1});
    }
    doUpdate();
  };

  const handleDateRangeTypeChange = (newChecked: boolean, id: string) => {
    switch (id) {
      case 'range-all':
        setData({...data, range_type: newChecked ? 0 : 1});
        break;
      case 'range-last-30days':
        setData({...data, range_type: newChecked ? 21 : 0});
        break;
      case 'range-last-6months':
        setData({...data, range_type: newChecked ? 22 : 0});
        break;
      case 'range-last-year':
        setData({...data, range_type: newChecked ? 23 : 0});
        break;
      case 'range-some':
        setData({...data, range_type: newChecked ? 1 : 0});
        break;
    }
    doUpdate();
  };

  let startDate = data.sync?.start;
  if (!startDate) startDate = new Date();
  
  const [{month, year}, setDate] = useState({month: startDate.getMonth(), year: startDate.getFullYear()});

  const handleMonthChange = useCallback(
    (month: number, year: number) => setDate({month, year}),
    [],
  );

  const onEnabledBadgeClick = (e) => {
    e.preventDefault();
    setData({...data, enabled: !data.enabled});
    doUpdate();
  }

  return (
    <BlockStack gap="400">

      <Card>
        <BlockStack gap="400">

          <BlockStack gap="200">
            <InlineStack gap="200" blockAlign="center">
              <Text as="h4" variant="headingLg">Shopify B2B</Text>
              {data.enabled ? (
                <a href="#" onClick={onEnabledBadgeClick}><Badge progress="complete" tone="success">Enabled</Badge></a>
              ) : (
                <a href="#" onClick={onEnabledBadgeClick}><Badge progress="incomplete">Disabled</Badge></a>
              )}
            </InlineStack>
            <Text as="p">Automatically display and update the information for your Shopify B2B customers on your map.</Text>
          </BlockStack>
          
          <Box paddingBlockStart="200">
            <BlockStack gap="200">
              <Text as="h6" variant="headingMd">Shopify B2B Account</Text>
              
              <Bleed marginInline="200">
                <ChoiceList
                  title="Shopify B2B Account"
                  titleHidden
                  onChange={handleInsideOutsideChange}
                  choices={[
                    {value: 'inside', label: 'My B2B customers are in this Shopify account'},
                    {value: 'outside', label: 'My B2B customers are in another Shopify account'},
                  ]}
                  selected={b2bLocations()}
                />
              </Bleed>
              
            </BlockStack>
          </Box>

          {data.is_customers_out && (
            <BlockStack gap="400">
              <BlockStack gap="200">
                <Text as="h6" variant="headingMd">Shopify API Key</Text>
                
                <TextField
                  id="b2b_publickey"
                  label="Shopify B2B Public API Key"
                  onChange={(newValue:string) => {handleKeyChange('public_key', newValue)}}
                  value={data.public_key}
                  autoComplete="off"
                  placeholder="Enter an Shopify B2B Public API Key."
                  align='center'
                />

                <TextField
                  id="b2b_privatekey"
                  label="Shopify B2B Private API Key"
                  type="password"
                  onChange={(newValue:string) => {handleKeyChange('private_key', newValue)}}
                  value={data.private_key}
                  autoComplete="off"
                  placeholder="Enter an Shopify B2B Private API Key."
                  align='center'
                />
                
              </BlockStack>

              <Banner tone="warning">
                <p style={{marginBlockEnd:"10px"}}>In order to test that your API Key credentials are valid, please verify your connection using the button below.</p>
                <Button>Verify Connection</Button>
              </Banner>
            </BlockStack>
          )}

          </BlockStack>
      </Card>
      
      {data.enabled && (
        <Card>
          <BlockStack gap="400">
            <BlockStack gap="200">
              <div style={{display:"flex", justifyContent:"space-between", columnGap: "20px", alignItems: "start"}}>
                <BlockStack gap="200">
                  <Text as="h4" variant="headingLg">Sync Settings</Text>
                  <Text as="p" variant="bodyMd" tone='subdued'>Click the Re-Sync button after making changes to dynamically update the locations shown on your map.</Text>
                </BlockStack>
                <BlockStack align='center'>
                  <Box>
                    <Button variant='primary' icon={RefreshIcon}>Re-sync Shopify B2B</Button>
                  </Box>
                  <Box padding="200">
                    <Text as='p' variant='bodyXs' fontWeight='semibold' tone='disabled'>Last synced: {data.sync?.last?.toLocaleDateString("en-US")}</Text>
                  </Box>
                </BlockStack>
              </div>

              <Box>
                <InlineStack gap="200">
                  <InlineStack gap="100" blockAlign='center'>
                    <RadioButton
                      id="sync-auto"
                      label="Sync Automatically"
                      checked={data.sync_method == 1}
                      onChange={handleSynMethodChange}
                    />
                    <Tooltip content="Location information will be automatically synced every 24 hours. New listings will be automatically added and made active on your map."><Icon source={QuestionCircleIcon} /></Tooltip>
                  </InlineStack>

                  <InlineStack gap="100" blockAlign='center'>
                    <RadioButton
                      id="sync-manual"
                      label="Sync Manually"
                      checked={data.sync_method == 0}
                      onChange={handleSynMethodChange}
                    />
                    <Tooltip content="Location information will only be updated when you manually click the 'Re-Sync' button."><Icon source={QuestionCircleIcon} /></Tooltip>
                  </InlineStack>

                </InlineStack>
              </Box>
              
            </BlockStack>
            
            <BlockStack gap="200">
              <Text as='h6' variant='bodyMd' fontWeight='semibold'>Shopify Company Locations</Text>
              <Box>
                <InlineStack gap="200">
                  <RadioButton
                    id="sync-all"
                    label="Sync All Company Locations"
                    checked={data.sync_type == 0}
                    onChange={handleSynTypeChange}
                  />
                  <RadioButton
                    id="sync-orders"
                    label="Only Sync Company Locations with Orders"
                    checked={data.sync_type == 1}
                    onChange={handleSynTypeChange}
                  />
                </InlineStack>
              </Box>
            </BlockStack>

            {(data.sync_type == 1) && (
            <Box>
              <BlockStack gap="200">
                <InlineStack gap="100">
                  <Text as='h6' variant='bodyMd' fontWeight='semibold'>Set Order Date Range</Text>
                  <Tooltip content="If you only want to sync companies that ordered within a certain period of time, set the order date range below. Otherwise, all company locations will be synced."><Icon source={QuestionCircleIcon} /></Tooltip>
                </InlineStack>

                <Box>
                  <InlineGrid>
                    <RadioButton
                      id="range-all"
                      label="All time"
                      checked={data.range_type == 0}
                      onChange={handleDateRangeTypeChange}
                    />
                    <RadioButton
                      id="range-last-30days"
                      label=" Last 30 Days"
                      checked={data.range_type == 21}
                      onChange={handleDateRangeTypeChange}
                    />
                    <RadioButton
                      id="range-last-6months"
                      label="Last 6 months"
                      checked={data.range_type == 22}
                      onChange={handleDateRangeTypeChange}
                    />
                    <RadioButton
                      id="range-last-year"
                      label="Last Year"
                      checked={data.range_type == 23}
                      onChange={handleDateRangeTypeChange}
                    />
                    <RadioButton
                      id="range-some"
                      label="Custom Date Range"
                      checked={data.range_type == 1}
                      onChange={handleDateRangeTypeChange}
                    />
                  </InlineGrid>
                </Box>

              </BlockStack>
              
              {(data.range_type == 1) && (
                <Card>
                  <DatePicker
                    month={month}
                    year={year}
                    onChange={({start, end}) => {
                      setData({...data, ...{sync: {last: data.sync?.last, start, end}}});
                    }}
                    onMonthChange={handleMonthChange}
                    selected={data.sync ? data.sync : null}
                    multiMonth
                    allowRange
                  />
                </Card>
              )}
            </Box>
            )}

          </BlockStack>
        </Card>
      )}
          
    </BlockStack>
    
      
  );
}
