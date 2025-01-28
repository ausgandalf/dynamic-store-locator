import {useCallback, useState} from 'react';

import {
  Text,
  Card,
  Button,
  ButtonGroup,
  BlockStack,
  Box,
  Divider,
  InlineStack,
  Icon,
} from "@shopify/polaris";

import {
  LightbulbIcon,
} from '@shopify/polaris-icons';

export function Insights() {
  
  const [activeInsightButtonIndex, setActiveInsightButtonIndex] = useState(0);
  const handleInsightButtonClick = useCallback(
    (index: number) => {
      if (activeInsightButtonIndex === index) return;
      setActiveInsightButtonIndex(index);
    },
    [activeInsightButtonIndex],
  );
  
  return (
    <Card>
      <BlockStack gap="400">
        <InlineStack wrap={false} align="start" gap="200">
          <Box width='20px'>
            <Icon source={LightbulbIcon}/>
          </Box>
          <BlockStack gap="100">
            <Text as="h2" variant="headingMd">Simple Insights</Text>
            <Text as="p">Catch a glimpse of how your products are moving</Text>
          </BlockStack>
        </InlineStack>

        <ButtonGroup variant="segmented">
          <Button pressed={activeInsightButtonIndex === 0} onClick={() => handleInsightButtonClick(0)}>Day</Button>
          <Button pressed={activeInsightButtonIndex === 1} onClick={() => handleInsightButtonClick(1)}>Week</Button>
          <Button pressed={activeInsightButtonIndex === 2} onClick={() => handleInsightButtonClick(2)}>Month</Button>
          <Button pressed={activeInsightButtonIndex === 3} onClick={() => handleInsightButtonClick(3)}>Year</Button>
        </ButtonGroup>
        
        <InlineStack align='center'>
          <BlockStack gap="200">
            <BlockStack gap="100">
              <Text as="h5" alignment="center" variant="heading2xl">27</Text>
              <Text as="p" alignment='center'>New Listings</Text>
            </BlockStack>
            <Divider />
            <BlockStack gap="100">
              <Text as="h5" alignment="center" variant="heading2xl">237</Text>
              <Text as="p" alignment='center'>Page Views</Text>
            </BlockStack>
          </BlockStack>
          <div className="vline"></div>
          <BlockStack gap="200">
            <BlockStack gap="100">
              <Text as="h5" alignment="center" variant="heading2xl">121</Text>
              <Text as="p" alignment='center'>Clicks</Text>
            </BlockStack>
            <Divider />
            <BlockStack gap="100">
              <Text as="h5" alignment="center" variant="heading2xl">27</Text>
              <Text as="p" alignment='center'>New Listings</Text>
            </BlockStack>
          </BlockStack>
        </InlineStack>
      </BlockStack>
    </Card>
  );
}
