import {useState, useEffect, useCallback} from 'react';
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher, useLoaderData, useActionData, useNavigation,useSubmit } from "@remix-run/react";
import {
  Page,
  Layout,
  BlockStack,
  Box,
  Tabs,
} from "@shopify/polaris";

import { useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../../shopify.server";

import { validateSettings } from "../../models/Settings.server";
import { Skeleton } from './skeleton';
import { LanguageForm } from './language';
import { FiltersForm } from './filters';
import { Plans } from './plans';
import { Installation } from './install';
import {ActionDataType, initFilters, SettingsType, defaultSettings, tabs, languageList} from "./defines";

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

  const errors = validateSettings(data);

  if (errors) {
    return Response.json({...defaultResponse, errors}, { status: 422 });
  }

  // TODO - Save settings
  
  const settings = {
    lang: "de",
  };

  return Response.json({ ...defaultResponse, settings });
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);
  // TODO - Load settings
  
  const settings = {
    lang: "de",
    filters: initFilters,
    plan: "business",
  };
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
    (selectedTabIndex: number) => setSelectedTab(selectedTabIndex),
    [selectedTab],
  );

  const updateLanguageAction = (lang:string) => {
    setFormState({...formState, lang});
  };

  const [filterIndex, setFilterIndex] = useState(formState.filters.length + 1);
  const updateFilterAction = (filter:FilterType) => {
    if (filter.id === "") {
      // Add Action
      setFormState({...formState, filters: [...formState.filters, {id:filterIndex, label: filter.label, tag: ""}]})
      setFilterIndex(filterIndex + 1);
    } else {
      // Update Action
      const newFilters = formState.filters.map(obj => { 
        if (obj.id === filter.id) {
            return { ...obj, label: filter.label, tag: "" };
        }
        return obj;
      });
      setFormState({...formState, filters: newFilters});
      // setFilters(newFilters);
    }
  }

  const deleteFilterAction = (filter:FilterType) => {
    if (filter.id != "") {
      const newFilters = formState.filters.filter((item) => item.id !== filter.id);
      setFormState({...formState, filters: newFilters});
      // setFilters(newFilters);
    }
  }

  const updatePlanAction = (plan:string) => {
    setFormState({...formState, plan});
  };

  return (
    <Page title="Settings">
      <Box paddingBlockEnd='400'>
        {(!loaderData || !isLoaded) ? (
          <Tabs tabs={tabs} selected={0}>
            <Skeleton />
          </Tabs>
        ) : (
          <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange}>
            {
              {
                0: <LanguageForm options={languageList} value={formState.lang} updateAction={updateLanguageAction} />,
                1: <FiltersForm filters={formState.filters} updateAction={updateFilterAction} deleteAction={deleteFilterAction} />,
                2: <Plans value={formState.plan} updateAction={updatePlanAction} />,
                3: <Installation />,
              }[selectedTab]
            }
          </Tabs>
        )}
      
      </Box>
    </Page>
    );
}
