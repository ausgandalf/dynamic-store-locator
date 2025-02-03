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
} from "@shopify/polaris";

import {
  QuestionCircleIcon,
  StoreManagedIcon,
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

  return (
  
    <BlockStack gap="400">

      <BlockStack gap="200">
        <InlineStack gap="200" blockAlign="center">
          <Text as="h4" variant="headingLg">Shopify B2B</Text>
          <Badge progress="complete" tone="success">Enabled</Badge>
          <Badge progress="incomplete">Disabled</Badge>
        </InlineStack>
        <Text as="p">Automatically display and update the information for your Shopify B2B customers on your map.</Text>
      </BlockStack>

      <Box paddingBlockStart="400">
        <BlockStack gap="200">
          <Text as="h6" variant="headingMd">Shopify B2B Account</Text>
          
        </BlockStack>
      
      </Box>

    </BlockStack>
    
    );
}
