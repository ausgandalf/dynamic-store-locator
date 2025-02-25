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
  Grid,
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
          <BlockStack gap="400">
            <BlockStack gap="100">
              <Text as="h2" variant="headingMd">Simple Insights</Text>
              <Text as="p">Here’s a snapshot of how the Dynamic Store Locator is helping your customers.</Text>
            </BlockStack>

            <ButtonGroup variant="segmented">
              <Button pressed={activeInsightButtonIndex === 0} onClick={() => handleInsightButtonClick(0)}>Day</Button>
              <Button pressed={activeInsightButtonIndex === 1} onClick={() => handleInsightButtonClick(1)}>Week</Button>
              <Button pressed={activeInsightButtonIndex === 2} onClick={() => handleInsightButtonClick(2)}>Month</Button>
              <Button pressed={activeInsightButtonIndex === 3} onClick={() => handleInsightButtonClick(3)}>Year</Button>
            </ButtonGroup>
            
          </BlockStack>
        </InlineStack>
        
        <Grid>
          <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
            <div className='rightBorderAboveSm'>
              <BlockStack gap="200">
                <BlockStack gap="100">
                  <Text as="h5" alignment="center" variant="heading2xl">27</Text>
                  <Text as="p" alignment='center'>New Listings</Text>
                </BlockStack>
                <Divider />
                <BlockStack gap="100">
                  <Text as="h5" alignment="center" variant="heading2xl">237</Text>
                  <Text as="p" alignment='center'>Updated Listings</Text>
                </BlockStack>
              </BlockStack>
            </div>
          </Grid.Cell>
          <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
            <Box>
              <BlockStack gap="200">
                <BlockStack gap="100">
                  <Text as="h5" alignment="center" variant="heading2xl">121</Text>
                  <Text as="p" alignment='center'>Clicks</Text>
                </BlockStack>
                <Divider />
                <BlockStack gap="100">
                  <Text as="h5" alignment="center" variant="heading2xl">27</Text>
                  <Text as="p" alignment='center'>Page Views</Text>
                </BlockStack>
              </BlockStack>
            </Box>
          </Grid.Cell>
        </Grid>

      </BlockStack>
    </Card>
  );
}
