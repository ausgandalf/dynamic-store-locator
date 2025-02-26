import {useState, useEffect} from 'react';

import {
  Text,
  Card,
  Button,
  BlockStack,
  Box,
  InlineStack,
  Icon,
} from "@shopify/polaris";

import {
  MagicIcon,
  ImportIcon,
} from '@shopify/polaris-icons';

export function Updater() {
  return (
    <Card>
      <BlockStack gap="400">
        <InlineStack wrap={false} align="start" gap="200">
          <Box width='20px'>
            <Icon source={MagicIcon}/>
          </Box>
          <BlockStack gap="100">
            
            <Text as="h2" variant="headingLg">Give Us Your Feedback!</Text>
            <Text as="p">We want to hear from you. How can we make this app better? Schedule a feedback interview with our team or leave us a review! </Text>
            <InlineStack gap="200">
              <Button>Schedule Call</Button>
              <Button>Post Review</Button>
            </InlineStack>

          </BlockStack>
        </InlineStack>
      </BlockStack>
    </Card>
  );
}
