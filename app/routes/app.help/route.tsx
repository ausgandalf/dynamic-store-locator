import {useState, useEffect} from 'react';
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher, useLoaderData, useActionData, useNavigation,useSubmit } from "@remix-run/react";
import {
  Page,
  Layout,
  BlockStack,
  Box,
} from "@shopify/polaris";

import { useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../../shopify.server";

import { validateTicket } from "../../models/Ticket.server";
import { Skeleton } from './skeleton';
import { Faq } from './faq';
import { TicketForm } from './form';
import { Chat } from './chat';
import { OtherApps } from './other_apps';

interface ActionDataType {
  errors: Object,
  ticket: Object,
}

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
    ticket: false,
  };
  const errors = validateTicket(data);

  if (errors) {
    return Response.json({...defaultResponse, errors}, { status: 422 });
  }

  // TODO Ticket creation
  // const ticket = await db.tickets.create({ data });
  const ticket = {
    id: 1,
  };

  return Response.json({ ...defaultResponse, ticket });
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  return true;
};

export default function Index() {

  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const errors = actionData ? actionData.errors : {};
  const ticket = actionData ? actionData.ticket : false;

  const options = [
    {label: 'Today', value: 'today'},
    {label: 'Yesterday', value: 'yesterday'},
    {label: 'Last 7 days', value: 'lastWeek'},
  ];
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [formState, setFormState] = useState({});
  const [cleanFormState, setCleanFormState] = useState({});
  const isDirty = JSON.stringify(formState) !== JSON.stringify(cleanFormState);

  const shopify = useAppBridge();
  
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 1000);
  }, [loaderData]);

  useEffect(() => {
    if (ticket) {
      shopify.toast.show("The ticket has been submitted. Ticket Number is " + ticket.id + " for future reference.");
      setFormState({});
    }
  }, [ticket, shopify]);

  const nav = useNavigation();
  const isSaving =
    nav.state === "submitting" && nav.formData?.get("action") !== "delete";
  const isDeleting =
    nav.state === "submitting" && nav.formData?.get("action") === "delete";
    
  const submit = useSubmit();
  function handleSave() {
    const data = {
      type: formState.type,
      issue: formState.issue || "",
      file: formState.file,
    };
  
    setCleanFormState({ ...formState });
    submit(data, { method: "post" });
  }
  
  return !loaderData || !isLoaded ? (
      <Skeleton />
    ) : (
      <Page title="Help Center">
        <Box paddingBlockEnd='400'>
          <Layout>
            <Layout.Section>
              <BlockStack gap="400">
                <Faq />
              </BlockStack>
            </Layout.Section>

            <Layout.Section variant="oneThird">
              <BlockStack gap="400">
                <TicketForm options={options} data={formState} setData={setFormState} errors={errors} onSubmit={handleSave} />
                <Chat />
              </BlockStack>
            </Layout.Section>
          </Layout>
        </Box>
        <Box paddingBlockEnd='400'>
          <OtherApps />
        </Box>
      </Page>
    );
}
