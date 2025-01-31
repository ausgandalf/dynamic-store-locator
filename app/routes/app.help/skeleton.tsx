import {
  Card,
  BlockStack,
  Box,
  Grid,
  InlineStack,
  Layout,
  SkeletonPage,
  SkeletonDisplayText,
  SkeletonBodyText,
  SkeletonThumbnail,
  Divider,
} from "@shopify/polaris";

export const Skeleton = () => {
  return (
        <SkeletonPage>
          <SkeletonDisplayText size="large" />

            <Layout>
              <Layout.Section>
                <BlockStack gap="400">
                  <Card>
                    <BlockStack gap="400">
                      <InlineStack gap="200" wrap={false} align="start">
                        <Box width='90px'>
                          <SkeletonThumbnail size="large" />
                        </Box>
                        <BlockStack gap="200">
                          <SkeletonDisplayText size="large" />
                          <SkeletonBodyText lines={2} />
                        </BlockStack>
                      </InlineStack>
                    </BlockStack>
                  </Card>
    
                  <Card>
                    <BlockStack gap="400">
                      <InlineStack wrap={false} align="start" gap="200">
                        <Box width='20px'>
                          <SkeletonThumbnail size="extraSmall" />
                        </Box>
                        <BlockStack gap="100">
                          <SkeletonDisplayText size="large" />
                          <SkeletonBodyText lines={3} />
                        </BlockStack>
                      </InlineStack>
                      <SkeletonDisplayText size="medium" />
                      <SkeletonBodyText lines={1} />
                    </BlockStack>
                  </Card>
    
                  <Card>
                    <BlockStack gap="400">
                      <InlineStack wrap={false} align="start" gap="200">
                        <Box width='20px'>
                          <SkeletonThumbnail size="extraSmall" />
                        </Box>
                        <BlockStack gap="100">
                          <SkeletonDisplayText size="medium" />
                          <SkeletonBodyText lines={1} />
                        </BlockStack>
                      </InlineStack>

                      <InlineStack wrap={false} align="start" gap="200">
                        <SkeletonDisplayText size="medium" />
                        <SkeletonDisplayText size="medium" />
                        <SkeletonDisplayText size="medium" />
                        <SkeletonDisplayText size="medium" />
                      </InlineStack>
                      
                      <InlineStack align='center'>
                        <BlockStack gap="200">
                          <BlockStack gap="100">
                            <SkeletonDisplayText size="extraLarge" />
                            <SkeletonBodyText lines={1} />
                          </BlockStack>
                          <Divider />
                          <BlockStack gap="100">
                            <SkeletonDisplayText size="extraLarge" />
                            <SkeletonBodyText lines={1} />
                          </BlockStack>
                        </BlockStack>
                        <div className="vline"></div>
                        <BlockStack gap="200">
                          <BlockStack gap="100">
                            <SkeletonDisplayText size="extraLarge" />
                            <SkeletonBodyText lines={1} />
                          </BlockStack>
                          <Divider />
                          <BlockStack gap="100">
                            <SkeletonDisplayText size="extraLarge" />
                            <SkeletonBodyText lines={1} />
                          </BlockStack>
                        </BlockStack>
                      </InlineStack>
                    </BlockStack>
                  </Card>
                </BlockStack>
              </Layout.Section>
    
              <Layout.Section variant="oneThird">
                <Card>
                  <BlockStack gap="400">
                    
                    <InlineStack wrap={false} align="start" gap="200">
                      <Box width="20px">
                        <SkeletonThumbnail size="extraSmall" />
                      </Box>
                      <BlockStack gap="100">
                        <SkeletonDisplayText size="large" />
                        <SkeletonBodyText lines={2} />
                      </BlockStack>
                    </InlineStack>
                    
                    <BlockStack>
                      <SkeletonBodyText lines={8} />
                    </BlockStack>
    
                  </BlockStack>
                </Card>
              </Layout.Section>
            </Layout>


            
          <BlockStack gap="500">

            <Card>
              <Card>
                <SkeletonDisplayText size="medium" />
                <SkeletonBodyText />
              </Card>
            </Card>
    
          </BlockStack>
        </SkeletonPage >
    );
}
