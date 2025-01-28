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

interface UpdaterProps {
  status: number,
  install: () => void,
}

export function Updater({status, install} : UpdaterProps) {
  return (
    <Card>
      <BlockStack gap="400">
        <InlineStack wrap={false} align="start" gap="200">
          <Box width='20px'>
            <Icon source={MagicIcon}/>
          </Box>
          <BlockStack gap="100">
            <Text as="h2" variant="headingLg">New Version Available!</Text>
            <Text as="p">Version 2.1 has updated some key features including new theme options, and more custom pin options.</Text>
          </BlockStack>
        </InlineStack>
        <Text as="h3" variant="headingMd">Install Version 2.1 of H1 Store Locator</Text>
        <InlineStack wrap={false} align="start" blockAlign="center" gap="200">
          <Button icon={ImportIcon} disabled={!(status == 1)} onClick={install}>Install</Button>
          {(status == 0) && (
            <Text as="p" tone="disabled" variant="bodyXs">You have the latest version installed.</Text>
          )}
        </InlineStack>
      </BlockStack>
    </Card>
  );
}
