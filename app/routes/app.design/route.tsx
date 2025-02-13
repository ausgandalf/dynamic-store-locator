import {useState, useEffect, useCallback} from 'react';
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher, useLoaderData, useActionData, useNavigation,useSubmit } from "@remix-run/react";
import {
  Page,
  Layout,
  BlockStack,
  Box,
  Tabs,
  Card,
  Listbox,
  Icon,
  InlineStack,
  Text,
  Divider,
  Bleed,
  TextField,
  Select,
  PageActions,
  Button,
} from "@shopify/polaris";

import {
  SearchIcon,
  LocationIcon,
  ReturnIcon,
  SettingsIcon,
  ViewIcon,
  SaveIcon,
} from "@shopify/polaris-icons";

import { useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../../shopify.server";

import {ActionDataType, tabs, ThemeType, MapType, MarkerType, PopupType, SettingsType, defaultSettings} from "./defines";

import { Skeleton, SkeletonContent } from './skeleton';
import { MapPreviewer } from './preview';
import { ThemeBlock } from './theme';
import { MapBlock } from './map';
import { PopupBlock } from './popup';
import { MarkerBlock } from './marker';

export async function action({ request, params }) {
  const { session } = await authenticate.admin(request);
  const { shop } = session;

  /** @type {any} */
  const data = {
    ...Object.fromEntries(await request.formData()),
    shop,
  };
  
  const defaultResponse:ActionDataType = {
    errors: {},
    settings: false,
  };

  const errors = undefined; // get action errors

  if (errors) {
    return Response.json({...defaultResponse, errors}, { status: 422 });
  }

  // TODO - Save settings
  
  const settings = {
    // TODO
  };

  return Response.json({ ...defaultResponse, settings });
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);
  // TODO - Load settings
  
  const settings = defaultSettings;
  return Response.json({ settings });

};

export default function Index() {

  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const errors = actionData ? actionData.errors : {};
  const settings = actionData ? actionData.settings : false;

  const [isLoaded, setIsLoaded] = useState(false);
  const [formState, setFormState] = useState(defaultSettings);
  const [cleanFormState, setCleanFormState] = useState(defaultSettings);
  const isDirty = JSON.stringify(formState) !== JSON.stringify(cleanFormState);

  useEffect(() => {
    if (loaderData.settings) {
      setFormState(loaderData.settings);
    }
    setTimeout(() => setIsLoaded(true), 1000);
  }, [loaderData]);

  const shopify = useAppBridge();

  useEffect(() => {
    if (settings) {
      shopify.toast.show("The settings have been updated.");
      setFormState(settings);
    }
  }, [settings, shopify]);

  const nav = useNavigation();
  const isSaving =
    nav.state === "submitting" && nav.formData?.get("action") !== "delete";
  const isDeleting =
    nav.state === "submitting" && nav.formData?.get("action") === "delete";
    
  const submit = useSubmit();
  function handleSave() {
    const data = {
      // TODO - settings values
    };
  
    setCleanFormState({ ...formState });
    submit(data, { method: "post" });
  }

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = useCallback(
    (value: number) => {
      if (!loaderData || !isLoaded) return;
      setSelectedTab(value);
    },
    [selectedTab, loaderData, isLoaded],
  );

  const UpdateAction = (field: string, value: ThemeType|MapType|MarkerType|PopupType) => {
    setFormState({...formState, [field]: value});
  }

  return (
    <Box>

      {(!loaderData || !isLoaded) ? (
        <Skeleton />
      ) : (
        <MapPreviewer settings={formState} />
      )}

      <Page>

        <Box paddingBlockStart="400">
          <InlineStack align='space-between' gap="400">
            <Box>
              <Text as='h2' variant='headingLg'>Map Designer</Text>
            </Box>
            
            <InlineStack wrap={false} gap="200">
              <Button icon={ViewIcon}>Preview</Button>
              <div className='button-fixer button-fixer--green'>
                <Button icon={SaveIcon} variant='primary' disabled={!isDirty}>Save</Button>
              </div>
            </InlineStack>
          </InlineStack>
        </Box>
        
        <Box paddingBlockEnd='400'>
          <Bleed marginInline='200'>
            <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange}>
              {(!loaderData || !isLoaded) ? (
                <SkeletonContent />
              ) : (
                <Box paddingBlock="400" paddingInline="200">
                  {
                    {
                      // 0: <ThemeBlock settings={formState.theme} update={UpdateAction}/>,
                      // 1: <MapBlock settings={formState.map} update={UpdateAction} />,
                      2: <MarkerBlock settings={formState.marker} update={UpdateAction}  />,
                      3: <PopupBlock settings={formState.popup} update={UpdateAction} />,
                    }[selectedTab]
                  }
                </Box> 
              )}            
            </Tabs>
          </Bleed>
        </Box>
      </Page>
    </Box>
    );
}
