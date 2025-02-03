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
  Page,
} from "@shopify/polaris";

export const Skeleton = () => {
  return (
        
            <Box paddingBlock="400">
              <Layout>
                <Layout.AnnotatedSection
                  id="langSettings"
                  title="Change Language"
                  description="Change the language of the app. Select the desired language from the dropdown list."
                >
                  <Card>
                    <BlockStack gap="400">
                      <SkeletonDisplayText size="medium" />
                      <SkeletonBodyText lines={1}></SkeletonBodyText>
                    </BlockStack>
                  </Card>
                </Layout.AnnotatedSection>
              </Layout>
            </Box>
    );
}
