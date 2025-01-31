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
  ChatIcon
} from '@shopify/polaris-icons';


export const Chat = () => {

  return (
    <Card>
      <BlockStack gap="400">

        <InlineStack wrap={false} align="start" gap="200">
          <Box width='20px'>
            <Icon source={ChatIcon}/>
          </Box>
          <BlockStack gap="200">
            <Text as="h2" variant="headingLg">Chat Live With An Online Rep</Text>
            <Text as="p" variant="bodySm">Our online team is available to help with questions or concerns you may have.</Text>
            <Box>
              <Button icon={ChatIcon} onClick={() => {}} accessibilityLabel="Open Live Chat">Open Live Chat</Button>
            </Box>
          </BlockStack>
        </InlineStack>

      </BlockStack>
    </Card>
  );
}
