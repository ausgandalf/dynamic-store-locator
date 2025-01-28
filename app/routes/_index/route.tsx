import { useState } from "react";

import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { login } from "../../shopify.server";

import {
  AppProvider as PolarisAppProvider,
  Page,
  Text,
  Card,
  BlockStack,
  Button,
  TextField,
  Box,
  FormLayout,
  Grid,
} from "@shopify/polaris";
import polarisTranslations from "@shopify/polaris/locales/en.json";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";

import { Skeleton } from "./skeleton";
import { Navigation } from "app/navs";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");
  if ( shop ) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }

  return { polarisTranslations, shop, showForm: Boolean(login)};
};

export default function App() {
  const loaderData = useLoaderData<typeof loader>();
  const [shop, setShop] = useState("");

  return (
    <PolarisAppProvider i18n={loaderData.polarisTranslations}>

      {!loaderData ? (
        <Skeleton />
      ) : (
        <Page title="Welcome to H1: Dynamic Store Locator">
          <BlockStack gap="500">
            { loaderData.showForm && (
              <Card>
                <Card>
                  <Form method="post" action="/auth/login">
                    <FormLayout>
                      <Text variant="headingMd" as="h2">
                        Log in
                      </Text>
                      <TextField
                        type="text"
                        name="shop"
                        label="Shop domain"
                        helpText="example.myshopify.com"
                        value=''
                        onChange={setShop}
                        autoComplete="on"
                      />
                      <Button submit>Log in</Button>
                    </FormLayout>
                  </Form>
                </Card>
              </Card>
            )}
    
            <Grid columns={{xs: 1, sm: 1, md: 2, lg: 3, xl: 3}}>
              <Grid.Cell>
                <Card roundedAbove="sm">
                  <Text as="h2" variant="headingSm">
                    Product feature
                  </Text>
                  <Box paddingBlockStart="200">
                    <Text as="p" variant="bodyMd">
                    Some detail about your feature and its benefit to your customer.
                    </Text>
                  </Box>
                </Card>
              </Grid.Cell>
              <Grid.Cell>
                <Card roundedAbove="sm">
                  <Text as="h2" variant="headingSm">
                    Product feature
                  </Text>
                  <Box paddingBlockStart="200">
                    <Text as="p" variant="bodyMd">
                    Some detail about your feature and its benefit to your customer.
                    </Text>
                  </Box>
                </Card>
              </Grid.Cell>
              <Grid.Cell>
                <Card roundedAbove="sm">
                  <Text as="h2" variant="headingSm">
                    Product feature
                  </Text>
                  <Box paddingBlockStart="200">
                    <Text as="p" variant="bodyMd">
                    Some detail about your feature and its benefit to your customer.
                    </Text>
                  </Box>
                </Card>
              </Grid.Cell>
            </Grid>
          </BlockStack>
        </Page>
      ) }
    </PolarisAppProvider>      
    );
}
