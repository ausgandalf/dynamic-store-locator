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
        
    <BlockStack gap="400">
    
          <SkeletonDisplayText size="large" />
    
          <Box>
              <BlockStack gap="200">
                <Box padding="200">
                  <BlockStack gap="100">
                    <SkeletonDisplayText size="medium" />
                    <SkeletonBodyText lines={2} />
                  </BlockStack>
                </Box>
                <Box paddingInline="200">
                  <SkeletonBodyText lines={1} />
                </Box>
              </BlockStack>
    
          </Box>
        </BlockStack>
    );
}
