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
  InlineGrid,
} from "@shopify/polaris";

export const Skeleton = () => {
  return (
        <SkeletonPage>
          <Layout>

          <Layout.Section>
              <Card>
                <BlockStack gap="400">
                  <SkeletonDisplayText size="large" />
                  <SkeletonBodyText lines={20} />
                </BlockStack>
              </Card>
            </Layout.Section>

            <Layout.Section variant="oneThird">
              <BlockStack gap="400">
                <Card>
                  <BlockStack gap="400">
                    <SkeletonDisplayText size="large" />
                    <SkeletonBodyText lines={2} />
                    <SkeletonBodyText lines={12} />
                  </BlockStack>
                </Card>
  
                <Card>
                  <BlockStack gap="400">
                    <InlineStack wrap={false} align="start" gap="200">
                      <Box width='20px'>
                        <SkeletonThumbnail size="extraSmall" />
                      </Box>
                      <Box width='100%'>
                        <BlockStack gap="100">
                          <SkeletonDisplayText size="large" />
                          <SkeletonBodyText lines={2} />
                        </BlockStack>
                      </Box>
                    </InlineStack>
                  </BlockStack>
                </Card>
  
              </BlockStack>
            </Layout.Section>
          </Layout>

          <Box paddingBlockStart="400">
            <Card>
              <BlockStack gap="500">
                <SkeletonDisplayText size="medium" />
                <SkeletonBodyText />
                <Box padding="400">
                  <Grid columns={{xs: 1, sm: 1, md: 2, lg: 2, xl: 2}} gap={{xs: "40px", sm: "40px", md: "40px", lg: "40px", xl: "40px"}}>
                    {[...Array(4)].map((x, i) => 
                      <InlineStack gap="200" wrap={false} align="start" key={'block-' + i}>
                        <Box width='90px'>
                          <SkeletonThumbnail size="large" />
                        </Box>
                        <Box width='100%'>
                          <BlockStack gap="400">
                            <SkeletonDisplayText size="large" />
                            <SkeletonBodyText lines={2} />
                          </BlockStack>
                        </Box>
                      </InlineStack>
                    )}
                  </Grid>
                </Box>
              </BlockStack>
            </Card>
          </Box>

        </SkeletonPage >
    );
}
