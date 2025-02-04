import {
  Text,
  Card,
  BlockStack,
  Box,
  InlineStack,
  Icon,
} from "@shopify/polaris";

import {
  StarFilledIcon,
} from '@shopify/polaris-icons';

import {IconLogo} from '../../res/icons'

export function About() {

  return (
    <Card>
      <BlockStack gap="400">
        <InlineStack gap="400" wrap={false} align="start">
          <Box>
            <div style={{ height:'90px',width:'90px',overflow:'hidden',borderRadius:'var(--p-border-radius-300)'}}>
              {<IconLogo />}
            </div>
          </Box>
          <BlockStack gap="200">
            <Text as="h2" variant="headingLg">H1: Dynamic Store Locator</Text>
            <InlineStack wrap={false} align="start" gap="100">
              <Text as="span">4.9</Text>
              <Box width='20px'>
                <Icon source={StarFilledIcon} tone="warning"/>
              </Box>
              <Text as="span">(398 reviews)</Text>
            </InlineStack>
            <Text as="p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc congue nunc ipsum.</Text>
          </BlockStack>
        </InlineStack>
      </BlockStack>
    </Card>
  );
}
