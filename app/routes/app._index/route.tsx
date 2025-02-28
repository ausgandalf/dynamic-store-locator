import {useState, useEffect, useCallback} from 'react';
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher, useLoaderData, useNavigation, useNavigate } from "@remix-run/react";

import {
  Page,
  Layout,
  BlockStack,
  Box,
  Button,
} from "@shopify/polaris";

import { useAppBridge } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";
import { getRedirect } from 'app/components/Functions';

import { authenticate } from "../../shopify.server";

import { Skeleton } from './skeleton';
import { About } from './about';
import { Updater } from './updater';
import { Insights } from './insights';
import { Onboard } from './onboad';

import { LoadingScreen } from 'app/components/LoadingScreen';
import { sleep } from 'app/components/Functions';
import { getActiveThemeId } from 'app/models/App.server';

const taskStatusDefault = {
  google: 0,
  faire: 0,
  b2b: 0,
  retailers: 0,
  manual: 0,
  filters: 0,
  designs: 0,
  review: 0,
  locations: 0,
  install: 0,
  embed:0,
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin, session } = await authenticate.admin(request);
  const theme = await getActiveThemeId(admin.graphql);
  return Response.json({ status:taskStatusDefault, theme });
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

  // useEffect(() => {
  //   console.log(shopify, shopify.config, shopify.environment);
  // }, [shopify]);
  
  const currentVersion = 2.0;
  const newVersion = 2.1;

  const [isLoaded, setIsLoaded] = useState(false);
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(currentVersion < newVersion ? 1 : 0);
  const installedVersion = updater.data?.version;

  const [taskStatus, setTaskStatus] = useState(taskStatusDefault);

  const navigate = useNavigate();

  const nav = useNavigation();
  const isSaving =
    nav.state === "submitting" && nav.formData?.get("action") !== "save";
  const isDeleting =
    nav.state === "submitting" && nav.formData?.get("action") === "delete";
  const isLoading = nav.state === "loading";

  useEffect(() => {
    if (loaderData.status) {
      setTaskStatus(loaderData.status);
    }
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

  const updateTaskStatus = async (key:string, status:number) => {
     // TODO
    setTaskStatus({...taskStatus, [key]: 2});
    await sleep(500);
    setTaskStatus({...taskStatus, [key]: status});
  }

  const goToThemeEditor = useCallback(() => {
    const redirect = getRedirect(shopify);
    redirect.dispatch(
      Redirect.Action.ADMIN_PATH,
      `/themes/${loaderData.theme ? loaderData.theme : '-'}/editor`
    );
    // window.location.href = `https://${shopify.config.shop}/admin/themes/${loaderData.theme ? loaderData.theme : '-'}/editor`;
  },[loaderData, shopify])

  return !loaderData || !isLoaded ? (
      <Skeleton />
    ) : (
      <Page title="Welcome to H1: Dynamic Store Locator">
        {isLoading && (<LoadingScreen />)}
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
              <Onboard status={taskStatus} update={updateTaskStatus} goToThemeEditor={goToThemeEditor} key={JSON.stringify(taskStatus)} />
            </Layout.Section>
          </Layout>
        </Box>
      </Page>
    );
}
