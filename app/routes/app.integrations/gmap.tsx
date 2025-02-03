import {useState, useCallback} from 'react';
import {
  Layout,
  Card,
  FormLayout,
  Text,
  Select,
  Box,
  Tabs,
  TextField,
  Icon,
  BlockStack,
  Tooltip,
  Link,
  InlineStack,
} from "@shopify/polaris";

import {
  QuestionCircleIcon
} from "@shopify/polaris-icons"

interface GMapFormProps {
  apikey?: string,
  updateAction: Function,
}

export function GMapForm(props: GMapFormProps) {
  const {apikey, updateAction} = props;

  const handleKeyChange = useCallback(
    (newValue:string) => {
      // TODO update language setting
      updateAction(newValue);
    },
    [],
  );

  return (
    <Card>
      
      <BlockStack gap="400">
        <InlineStack gap="200" blockAlign="center">
          <Text as="h4" variant="headingLg">Google Maps</Text>
          <Tooltip content="Google map integration option"><Icon source={QuestionCircleIcon} /></Tooltip>
        </InlineStack>

        <Box>
          <BlockStack gap="200">
            <Box padding="200">
              <BlockStack gap="100">
                <Text as="h6" variant="headingMd">API Key Connection</Text>
                <Text as="h6" variant="bodyMd">In order to use Google Maps on your site you must sign up for an API Key with Google. <Link url='#'>Click here</Link> to get an API key and paste it below when you have created one.</Text>
              </BlockStack>
            </Box>
            <Box paddingInline="200">
              <TextField
                id="gmapkey"
                label="Google Map API Key"
                labelHidden
                onChange={handleKeyChange}
                value={apikey}
                autoComplete="off"
                placeholder="Enter an API Key for your map"
                align='center'
              />
            </Box>
          </BlockStack>
        </Box>
      </BlockStack>

    </Card>
    );
}
