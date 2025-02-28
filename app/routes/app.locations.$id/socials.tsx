import { useState } from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  InlineStack,
  Select,
  Text,
  TextField,
  BlockStack,
} from "@shopify/polaris";
import { PlusCircleIcon, DeleteIcon } from "@shopify/polaris-icons";

import { SocialsType, socialOptions } from "./defines";

interface SocialsBlockProps {
  socials: Array<SocialsType>,
  update: Function,
}

export function SocialsBlock({socials, update}:SocialsBlockProps) {
  const [data, setData] = useState(socials);
  
  return (
    <Card>
      <BlockStack gap="200">
        <InlineStack align="space-between">
          <BlockStack gap="100">
            <Text as="h4" variant="headingMd">Social Media</Text>
            <Text as="p" variant="bodySm" tone="subdued">Customize your location information</Text>
          </BlockStack>
          <BlockStack gap="100" inlineAlign="end">
            <Box>
              <Button icon={PlusCircleIcon} onClick={() => {
                let newData = [...data, {
                  type: 'in',
                  url: '',
                }];
                setData(newData);
                update('socials', newData);
              }}>Add Social Media</Button>
            </Box>
          </BlockStack>
        </InlineStack>

        <Box padding="200">
          <BlockStack gap="200">
            {data.map((x, i) => (
              <Grid key={'social-row-' + x.type + '-' + i}>
                <Grid.Cell columnSpan={{xs: 6, sm:2, md:2, lg:4}}>
                    <Select
                      label="Social media"
                      labelHidden
                      options={socialOptions}
                      onChange={(newValue) => {
                        let newData = structuredClone(data);
                        newData[i].type = newValue;
                        setData(newData);
                        update('socials', newData);
                      }}
                      value={x.type}
                    />
                </Grid.Cell>
                <Grid.Cell columnSpan={{xs: 6, sm:4, md:4, lg:8}}>
                  <InlineStack wrap={false} gap="200">
                    <TextField
                      label="Social media URL"
                      labelHidden
                      type="url"
                      value={x.url}
                      onChange={(newValue: string) => {
                        let newData = structuredClone(data);
                        newData[i].url = newValue;
                        setData(newData);
                        update('socials', newData);
                      }}
                      autoComplete="off"
                    />
                    <Button icon={DeleteIcon} accessibilityLabel="Delete" onClick={() => {
                      let newData = structuredClone(data);
                      newData.splice(i, 1);
                      setData(newData);
                      update('socials', newData);
                    }}></Button>
                  </InlineStack>
                </Grid.Cell>
              </Grid>
            ))}
          </BlockStack>
        </Box>
        
      </BlockStack>
    </Card>
  );
}
