import {
  Card,
  BlockStack,
  Box,
  Grid,
  SkeletonPage,
  SkeletonDisplayText,
  SkeletonBodyText,
} from "@shopify/polaris";

interface SkeletonProps {
  cells?: number,
}

const defaultProps: SkeletonProps = {
  cells: 3,
}

export const Skeleton = (props:SkeletonProps) => {
  props = {...defaultProps, ...props}
  
  return (
        <SkeletonPage>
          <SkeletonDisplayText size="large" />
          <BlockStack gap="500">

            <Card>
              <Card>
                <SkeletonDisplayText size="medium" />
                <SkeletonBodyText />
              </Card>
            </Card>
    
            <Grid columns={{xs: 1, sm: 1, md: 2, lg: 3, xl: 3}}>

              {[...Array(props.cells)].map((x, i) =>
                <Grid.Cell>
                  <Card roundedAbove="sm">
                    <SkeletonDisplayText size="small" />
                    <Box paddingBlockStart="200">
                      <SkeletonBodyText />
                    </Box>
                  </Card>
                </Grid.Cell>
              )}
              
            </Grid>
          </BlockStack>
        </SkeletonPage >
    );
}
