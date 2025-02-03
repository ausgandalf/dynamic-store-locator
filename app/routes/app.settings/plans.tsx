import { useAppBridge } from "@shopify/app-bridge-react";
import {
  Layout,
  Button,
  Card,
  FormLayout,
  Text,
  TextField,
  Select,
  BlockStack,
  Divider,
  Box,
  Tabs,
  InlineGrid,
  InlineStack,
  Icon,
  Badge,
} from "@shopify/polaris";

import {
  IncentiveIcon,
  CheckIcon,
  InfoIcon,
  StatusActiveIcon,
  ClipboardIcon,
} from '@shopify/polaris-icons';

import HBadge from "../../components/HBadge";
import { useState } from "react";

interface PlansProps {
  value?: string,
  updateAction: Function,
}
export function Plans({value, updateAction}:PlansProps) {

  const planButton = (index: string) => {
    return (index === value) ? 
      <Button icon={StatusActiveIcon} fullWidth={true} variant="primary" tone="success">Your Current Plan</Button>
    :
      <Button icon={IncentiveIcon} fullWidth={true} onClick={() => updateAction(index)}>Select Plan</Button>
    ;
  }

  const planPrice = (plan?: string) => {
    switch (plan) {
      case 'basic':
        return 0;
      case 'advanced':
        return 25;
      case 'business':
        return 50;
      default: 
        return 0;
    }
  }

  const benifits = {
    basic: [
      "Up to 10 Locations",
      "Custom Search Filters",
      "Google Maps Integration",
    ],
    advanced: [
      "Up to 1500 Locations",
      "Custom Search Filters",
      "Google Maps Integration",
      "Bulk Import",
      "Faire Integration",
    ],
    business: [
      "Unlimited Locations",
      "Custom Search Filters",
      "Google Maps Integration",
      "Bulk Import",
      "Faire Integration",
      "Major Retailer Locations",
      "Shopify B2B Integration",
      "Priority Support",
    ]
  }

  return (
    <Box paddingBlock="400">
      <BlockStack gap="400">
        <Layout>
          <Layout.Section>
            <InlineGrid columns={{xs:1, sm:1, md:3, lg:3, xl:3}} gap="400">
                
                <Card>
                  <BlockStack gap="500">
                    <Box>
                      <HBadge>Basic</HBadge>
                    </Box>
                    <Box>
                      <Text as="h3" variant="headingLg">H1: Dynamic Store Locator</Text>
                    </Box>
                    <Box>
                      <Text as="span" variant="headingLg">Free</Text>
                    </Box>
                    <Box>
                      <div style={{visibility: "hidden"}}>
                        <Badge tone="info">7-day free trial</Badge>
                      </div>
                    </Box>
                    <Box>
                      {planButton('basic')}
                    </Box>
                    <Box>
                      <ul className="list">
                        {benifits.basic.map((x, i) => 
                          <li>
                            <InlineStack>
                              <Box><Icon source={CheckIcon} tone="success" /></Box>
                              <Box><Text as="p" variant="bodyMd">{x}</Text></Box>
                              <Box><Icon source={InfoIcon} tone="base" /></Box>
                            </InlineStack>
                          </li>
                        )}
                      </ul>
                    </Box>
                  </BlockStack>
                </Card>

                <Card>
                  <BlockStack gap="500">
                    <Box>
                      <HBadge tone="blue">Advanced</HBadge>
                    </Box>
                    <Box>
                      <Text as="h3" variant="headingLg">H1: Dynamic Store Locator</Text>
                    </Box>
                    <Box>
                      <Text as="span" variant="bodyMd">USD</Text>
                      <Text as="span" variant="headingLg">$25</Text>
                      <Text as="span" variant="bodyMd">/month</Text>
                    </Box>
                    <Box>
                      <Badge tone="info">7-day free trial</Badge>
                    </Box>
                    <Box>
                      {planButton('advanced')}
                    </Box>
                    <Box>
                      <ul className="list">
                        {benifits.advanced.map((x, i) => 
                          <li>
                            <InlineStack>
                              <Box><Icon source={CheckIcon} tone="success" /></Box>
                              <Box><Text as="p" variant="bodyMd">{x}</Text></Box>
                              <Box><Icon source={InfoIcon} tone="base" /></Box>
                            </InlineStack>
                          </li>
                        )}
                      </ul>
                    </Box>
                  </BlockStack>
                </Card>

                <Card>
                  <BlockStack gap="500">
                    <Box>
                      <HBadge tone="purple">Business Plus</HBadge>
                    </Box>
                    <Box>
                      <Text as="h3" variant="headingLg">H1: Dynamic Store Locator</Text>
                    </Box>
                    <Box>
                      <Text as="span" variant="bodyMd">USD</Text>
                      <Text as="span" variant="headingLg">$50</Text>
                      <Text as="span" variant="bodyMd">/month</Text>
                    </Box>
                    <Box>
                      <Badge tone="info">7-day free trial</Badge>
                    </Box>
                    <Box>
                      {planButton('business')}
                    </Box>
                    <Box>
                      <ul className="list">
                        {benifits.business.map((x, i) => 
                          <li>
                            <InlineStack gap="100">
                              <Box><Icon source={CheckIcon} tone="success" /></Box>
                              <Box><Text as="p" variant="bodyMd">{x}</Text></Box>
                              <Box><Icon source={InfoIcon} tone="base" /></Box>
                            </InlineStack>
                          </li>
                        )}
                      </ul>
                    </Box>
                  </BlockStack>
                </Card>
              </InlineGrid>

          </Layout.Section>
        </Layout>
        
        { (value != 'basic') && ( <Divider /> )}

        { (value != 'basic') && (
        
          <Layout>
            <Layout.Section variant="oneThird">
              
              <div style={{marginTop: 'var(--p-space-500)'}}>
                <BlockStack>
                  <Text variant="headingLg" as="h2">Billing</Text>
                  <Text variant="bodyMd" as="p">Your monthly bill is ona a 30-day cycle. It includes your Shopify subscription, app charges, shipping labels, and transaction fees.</Text>
                </BlockStack>
              </div>
            </Layout.Section>
            <Layout.Section>
              <Card>
                <BlockStack>
                  <Text variant="headingMd" as="h4">Billing is active</Text>
                  <Text variant="bodyMd" as="p">Your next charge of <b>${planPrice(value)}</b> will occur on <b>February 17th, 2025</b></Text>
                </BlockStack>
              </Card>
            </Layout.Section>
          </Layout>

        )}
        
      </BlockStack>
    </Box>
    );
}
