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
} from "@shopify/polaris";

import {
  LocationIcon,
  ReturnIcon,
  SettingsIcon,
} from "@shopify/polaris-icons";

import { useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../../shopify.server";

import { Skeleton } from './skeleton';
import { GMapForm } from './gmap';
import { RetailersForm } from './retailers';
import { B2BForm } from './b2b';
import { FaireForm } from './faire';

import {ActionDataType, tabs, defaultSettings, getDateBy, B2BDataType, FaireDataType} from "./defines";

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
      
      loaderData.settings.b2b.sync.start = getDateBy(loaderData.settings.b2b.sync.start);
      loaderData.settings.b2b.sync.end = getDateBy(loaderData.settings.b2b.sync.end);
      loaderData.settings.b2b.sync.last = getDateBy(loaderData.settings.b2b.sync.last);

      loaderData.settings.faire.sync.start = getDateBy(loaderData.settings.faire.sync.start);
      loaderData.settings.faire.sync.end = getDateBy(loaderData.settings.faire.sync.end);
      loaderData.settings.faire.sync.last = getDateBy(loaderData.settings.faire.sync.last);

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

  const [selectedTab, setSelectedTab] = useState('gmap');

  const handleTabChange = useCallback(
    (value: string) => {
      if (!loaderData || !isLoaded) return;
      setSelectedTab(value);
    },
    [selectedTab, loaderData, isLoaded],
  );

  const gmapUpdateAction = (key: string) => {
    setFormState({...formState, gmap: {key}});
  };

  const retailersUpdateAction = (id: string, checked: boolean) => {
    let retailers = formState.retailers;

    if (checked) {
      if (!retailers.includes(id)) retailers.push(id);
    } else {
      retailers = retailers.filter(function(item) {
        return item !== id
      })
    }

    setFormState({...formState, retailers});
  };

  const b2bUpdateAction = (b2b: B2BDataType) => {
    setFormState({...formState, b2b});
  }

  const faireUpdateAction = (faire: FaireDataType) => {
    setFormState({...formState, faire});
  }

  return (
    <Page title="Integrations">

      <Layout>
        <Layout.Section variant="oneThird">
          <Card>
            <Listbox accessibilityLabel="Integrations" onSelect={handleTabChange}>

              <Box paddingBlockEnd="200">
                <Text as='h5' variant='headingSm'>Map Providers</Text>
              </Box>

              <Bleed marginInline="200">
                <Listbox.Action value="gmap" selected={selectedTab == 'gmap'}>
                  <InlineStack gap="200">
                    <Icon source={LocationIcon} tone="base" />
                    <Text as="span" variant="bodyMd">Google Maps</Text>
                  </InlineStack>
                </Listbox.Action>
              </Bleed>

              <Box paddingBlockStart="200">
                <Bleed marginInline="400"><Divider /></Bleed>
              </Box>

              <Box paddingBlockStart="400" paddingBlockEnd="200">
              <Text as='h5' variant='headingSm'>Connected Integrations</Text>
              </Box>

              <Bleed marginInline="200">
                <Listbox.Action value="retailers" selected={selectedTab == 'retailers'}>
                  <InlineStack gap="200">
                    <Icon source={SettingsIcon} tone="base" />
                    <Text as="span" variant="bodyMd">Popular Retailers</Text>
                  </InlineStack>
                </Listbox.Action>
              

                <Listbox.Action value="b2b" selected={selectedTab == 'b2b'}>
                  <InlineStack gap="200">
                    <Icon source={SettingsIcon} tone="base" />
                    <Text as="span" variant="bodyMd">Shopify B2B</Text>
                  </InlineStack>
                </Listbox.Action>

                <Listbox.Action value="fair" selected={selectedTab == 'fair'}>
                  <InlineStack gap="200">
                    <Icon source={SettingsIcon} tone="base" />
                    <Text as="span" variant="bodyMd">Fair</Text>
                  </InlineStack>
                </Listbox.Action>
              </Bleed>
              
            </Listbox>
            
          </Card>
        </Layout.Section>
        <Layout.Section>

          {(!loaderData || !isLoaded) ? (
            <Card><Skeleton /></Card>
          ) : (
            <Box>
            {
              {
                'gmap': <GMapForm apikey={formState.gmap.key} updateAction={gmapUpdateAction} />,
                'retailers': <RetailersForm selected={formState.retailers} updateAction={retailersUpdateAction} />,
                // 'b2b': <B2BForm settings={formState.b2b} updateAction={b2bUpdateAction} />,
                // 'fair': <FaireForm settings={formState.faire} updateAction={faireUpdateAction} />,
              }[selectedTab]
            }
            </Box>
          )}

        </Layout.Section>
      </Layout>

    </Page>
    );
}
