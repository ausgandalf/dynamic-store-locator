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
} from "@shopify/polaris";

import {
  InfoIcon,
  ClipboardIcon,
} from '@shopify/polaris-icons';

export function Installation() {
  const shopify = useAppBridge();
  const codeObj = `(example code) <div id='storerocket-widget' style='width:100%;' data-storerocket-env='p' data-storerocket-id='dQ8dwjPJr1'><p style='text-align:center;font-size:13px;padding:10px;'>Store locator is loading from StoreRocket <a target='_blank' href='https://storerocket.io' style='font-size:13px;'>Store Locator App</a>..</p></div><script>(function(){var a=document.createElement('script');a.type='text/javascript';a.async=!0;a.src='https://cdn.storerocket.io/js/widget-mb.js';var b=document.getElementsByTagName('script')[0];b.parentNode.insertBefore(a,b);}());</script>`;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeObj).then(() => {
      shopify.toast.show("Copied into clipboard.", {duration: 2000});
    });
  }

  return (
    <Box paddingBlock="400">
      <BlockStack gap="400">
        <Layout>
          <Layout.Section variant="oneThird">
            <Box padding="200">
              <BlockStack gap="200">
                <Text as="span" variant="bodySm">Option 1:</Text>
                <Text as="h4" variant="headingMd">Add App Block</Text>
                <Text as="span" variant="bodyMd">Recommended</Text>
              </BlockStack>  
            </Box>
          </Layout.Section>
          <Layout.Section>
            <Card>
              <BlockStack gap="500">
                
                <InlineGrid columns={{xs:1, sm:['oneThird', 'twoThirds']}} gap="400">
                  <BlockStack>
                    <Text as="span" variant="bodySm">Step 1</Text>
                    <Text as="h5" variant="headingMd">Find the App</Text>
                  </BlockStack>
                  <BlockStack>
                    <Text as="span" variant="bodyMd">Find the application from your devices app store and click install</Text>
                  </BlockStack>
                </InlineGrid>
                
                <Divider />

                <InlineGrid columns={{xs:1, sm:['oneThird', 'twoThirds']}} gap="400">
                  <BlockStack>
                    <Text as="span" variant="bodySm">Step 2</Text>
                    <Text as="h5" variant="headingMd">Connect Your Shopify</Text>
                  </BlockStack>
                  <BlockStack>
                    <Text as="span" variant="bodyMd">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et arcu ut felis auctor eleifend vel eget purus. Etiam interdum arcu mauris, eu accumsan eros rutrum non.</Text>
                  </BlockStack>
                </InlineGrid>

                <Divider />

                <InlineGrid columns={{xs:1, sm:['oneThird', 'twoThirds']}} gap="400">
                  <BlockStack>
                    <Text as="span" variant="bodySm">Step 3</Text>
                    <Text as="h5" variant="headingMd">Third Step Here</Text>
                  </BlockStack>
                  <BlockStack>
                    <Text as="span" variant="bodyMd">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et arcu ut felis auctor eleifend vel eget purus. Etiam interdum arcu mauris, eu accumsan eros rutrum non.</Text>
                  </BlockStack>
                </InlineGrid>

                <Divider />

                <InlineGrid columns={{xs:1, sm:['oneThird', 'twoThirds']}} gap="400">
                  <BlockStack>
                    <Text as="span" variant="bodySm">Step 4</Text>
                    <Text as="h5" variant="headingMd">Final Step Here</Text>
                  </BlockStack>
                  <BlockStack>
                    <Text as="span" variant="bodyMd">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et arcu ut felis auctor eleifend vel eget purus. Etiam interdum arcu mauris, eu accumsan eros rutrum non.</Text>
                  </BlockStack>
                </InlineGrid>

              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>

        <Layout>
          <Layout.Section variant="oneThird">
            <Box padding="200">
              <BlockStack gap="200">
                <Text as="span" variant="bodySm">Option 2:</Text>
                <Text as="h4" variant="headingMd">HTML Embed</Text>
                <Text as="span" variant="bodyMd">Copy and paste the code snippet into an HTML block of the page where you wish the store locator to be visible.</Text>
              </BlockStack>  
            </Box>
          </Layout.Section>
          <Layout.Section>
            <Card background="bg-surface-magic">
              <InlineStack wrap={false}>
                <Box width='20px'><Icon source={InfoIcon} tone="magic"/></Box>
                <Box>
                  <Text as="p" variant='bodyMd'><code style={{ wordBreak:'break-all' }}>{ codeObj }</code></Text>
                </Box>
                <BlockStack align='end'><Box width='20px'><Button variant="plain" accessibilityLabel="Copy to Clipboard" onClick={copyToClipboard}><Icon source={ClipboardIcon} tone="magic" /></Button></Box></BlockStack>
              </InlineStack>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Box>
    );
}
