import {useState, useEffect} from 'react';
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import {
  Page,
  Layout,
  BlockStack,
  Box,
} from "@shopify/polaris";

import { useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../../shopify.server";
import { Skeleton } from './skeleton';
import { About } from './about';
import { Updater } from './updater';
import { Insights } from './insights';
import { Onboard } from './onboad';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  return true;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  // TODO - install new version

  return {
    version: 2.1
  };
};

export default function Index() {

  const loaderData = useLoaderData<typeof loader>();
  const updater = useFetcher<typeof action>();
  const shopify = useAppBridge();
  
  const currentVersion = 2.0;
  const newVersion = 2.1;

  const [isLoaded, setIsLoaded] = useState(false);
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(currentVersion < newVersion ? 1 : 0);
  const installedVersion = updater.data?.version;

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 1000);
  }, [loaderData]);

  useEffect(() => {
    if (installedVersion) {
      shopify.toast.show("New version of H1 Store Locator app has been installed successfully.");
      setIsUpdateAvailable(installedVersion < newVersion ? 1 : 0);
    }
  }, [installedVersion, shopify]);
  const installUpdates = () => {
    setIsUpdateAvailable(2);
    updater.submit({}, { method: "POST" })
  };

  return !loaderData || !isLoaded ? (
      <Skeleton />
    ) : (
      <Page title="Welcome to H1: Dynamic Store Locator">
        <Box paddingBlockEnd='400'>
          <Layout>
            <Layout.Section variant="oneThird">
              <BlockStack gap="400">
                <About />
                <Updater />
                <Insights />
              </BlockStack>
            </Layout.Section>

            <Layout.Section>
              <Onboard />
            </Layout.Section>
          </Layout>
        </Box>
      </Page>
    );
}
