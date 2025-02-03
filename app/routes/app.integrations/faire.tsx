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
  List,
  Divider,
  ActionList,
  Popover,
  ActionListItemDescriptor,
  Tag,
} from "@shopify/polaris";

import {
  QuestionCircleIcon,
  StoreManagedIcon,
  RefreshIcon,
} from "@shopify/polaris-icons"

import { FaireDataType, storeTypes } from "./defines"
import { action } from './route';

interface FaireFormProps {
  settings: FaireDataType,
  updateAction: Function,
}

export function FaireForm(props:FaireFormProps) {
  const {settings, updateAction} = props;
  const [data, setData] = useState(settings);

  const [storeTypeActive, setStoreTypeActive] = useState(false);
  const toggleStoreTypeActive = useCallback(() => setStoreTypeActive((active) => !active), []);
  const storeTypeActiveActivator = (
    <BlockStack gap="200">
      <Text as='h5' variant='bodyMd' fontWeight='semibold'>Filter By Store Type</Text>
      <Button onClick={toggleStoreTypeActive} disclosure>
        <span style={{whiteSpace:"nowrap"}}>Select Types To Sync</span>
      </Button>
    </BlockStack>
  );

  const doUpdate = () => {
    updateAction(data);
  }

  const handleKeyChange = (key: string, value: string) => {
    setData({...data, [key]: value});
    doUpdate();
  };

  let startDate = data.sync?.start;
  if (!startDate) startDate = new Date();
  const [{month, year}, setDate] = useState({month: startDate.getMonth(), year: startDate.getFullYear()});

  const handleMonthChange = useCallback(
    (month: number, year: number) => setDate({month, year}),
    [],
  );

  const addTag = (type:string) => {
    let storeTypes = data.store_types;
    if (!storeTypes.includes(type)) storeTypes.push(type);
    setData({...data, store_types: storeTypes});
    doUpdate();
  }

  const actionList = ():ActionListItemDescriptor[] => {

    const actionArray = storeTypes.map(type => ({ 
      content: type,
      onAction: () => { addTag(type); toggleStoreTypeActive();  },
      disabled: data.store_types.includes(type),
    }));
    
    return actionArray;
  }

  const removeTag = (tag: string) => () => {
    let storeTypes = data.store_types;
    storeTypes = storeTypes.filter((previousTag) => previousTag !== tag);
    setData({...data, store_types:storeTypes});
    doUpdate();
  };

  const tagMarkup = data.store_types.map((type) => (
    <Box><Tag onRemove={removeTag(type)}><Box padding="100">{type}</Box></Tag></Box>
  ));

  return (
    <BlockStack gap="400">

      <Card>
        <BlockStack gap="400">

          <BlockStack gap="200">
            <InlineStack gap="200" blockAlign="center">
              <Text as="h4" variant="headingLg">Faire</Text>
              {data.enabled ? (
                <Badge progress="complete" tone="success">Enabled</Badge>
              ) : (
                <Badge progress="incomplete">Disabled</Badge>
              )}
            </InlineStack>
            <Text as="p">Automatically display and update the information for your Faire retailers on your map.</Text>
          </BlockStack>

          {!data.enabled && (
            <Banner tone="warning">
              <p style={{marginBlockEnd:"10px"}}>You must upgrade to the Business Pro Plan in order to have access to this feature.</p>
              <Button>Upgrade My Plan</Button>
            </Banner>
          )}

          <BlockStack gap="400">
            <BlockStack gap="200">
              
              <TextField
                id="faire_publickey"
                label="Shopify Faire Public API Key"
                onChange={(newValue:string) => {handleKeyChange('public_key', newValue)}}
                value={data.public_key}
                autoComplete="off"
                placeholder="Enter an Shopify Faire Public API Key."
                align='center'
                disabled={!data.enabled}
              />

              <TextField
                id="faire_privatekey"
                label="Shopify Faire Private API Key"
                type="password"
                onChange={(newValue:string) => {handleKeyChange('private_key', newValue)}}
                value={data.private_key}
                autoComplete="off"
                placeholder="Enter an Shopify Faire Private API Key."
                align='center'
                disabled={!data.enabled}
              />
              
            </BlockStack>
          </BlockStack>

          {!data.enabled && (
            <Banner title="How do I obtain a Faire API key?">

              <Box paddingBlockEnd="200">
                <Text as='p' variant='bodyMd'>You can generate the API key directly from your Faire portal.</Text>
              </Box>

              <Bleed marginInlineStart="400">
                <List type="number">
                  <List.Item>Select the Integrations tab</List.Item>
                  <List.Item>Locate the integration partner from the options listed under the Direct Integrations section and select the option you’re looking to connect</List.Item>
                  <List.Item>Select Generate API Key</List.Item>
                </List>
              </Bleed>
            </Banner>
          )}

        </BlockStack>
      </Card>
      
      {data.enabled && (
        <Card>
          
            <div style={{display:"flex", justifyContent:"space-between", columnGap: "20px", alignItems: "start"}}>
              <BlockStack gap="200">
                <Box>
                  <Text as="h4" variant="headingLg">Sync Settings</Text>
                </Box>
              </BlockStack>
              <BlockStack align='center'>
                <Box>
                  <Button variant='primary' icon={RefreshIcon}><span className='nowrap'>Re-sync Shopify Faire</span></Button>
                </Box>
                <Box padding="200">
                  <Text as='p' variant='bodyXs' fontWeight='semibold' tone='disabled'>Last synced: {data.sync?.last?.toLocaleDateString("en-US")}</Text>
                </Box>
              </BlockStack>
            </div>

            <BlockStack gap="400">
              <BlockStack gap="200">
                {/* <Bleed marginBlockStart="200"> */}
                <Box paddingBlockStart="200">
                  <InlineStack wrap={false} gap="200" blockAlign='end'>

                      <Popover
                        active={storeTypeActive}
                        activator={storeTypeActiveActivator}
                        autofocusTarget="first-node"
                        onClose={toggleStoreTypeActive}
                      >
                        <ActionList
                          actionRole="menuitem"
                          items={actionList()}
                        />
                      </Popover>
                    
                      <InlineStack gap="200">
                        {tagMarkup}
                      </InlineStack>

                  </InlineStack>
                </Box>
                {/* </Bleed> */}
              </BlockStack>

            <Divider />

            <Card>
              <DatePicker
                month={month}
                year={year}
                onChange={({start, end}) => {
                  setData({...data, ...{sync: {last: data.sync?.last, start, end}}});
                }}
                onMonthChange={handleMonthChange}
                selected={data.sync}
                multiMonth
                allowRange
              />
            </Card>

          </BlockStack>
        </Card>
      )}
          
    </BlockStack>
    
      
  );
}
