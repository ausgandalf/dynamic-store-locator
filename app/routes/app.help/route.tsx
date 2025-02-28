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

import { LoadingScreen } from 'app/components/LoadingScreen';

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
  const isLoading = nav.state === "loading";  

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

  const faqs = [
    {
      q: `My Google Maps API Key isn’t working - how do I fix it?`,
      a: `The most common reason your API key isn’t working is due to billing not being enabled. To enable billing on your project, go to: `,
    },
    {
      q: `How do I find my Faire API Key?`,
      a: `You can generate the API key directly from your Faire portal. In your Faire portal: 
            <ol>
              <li>Select the Integrations tab</li>
              <li>Locate the integration partner from the options listed under the Direct Integrations section and select the option you’re looking to connect</li>
              <li>Select Generate API Key</li>
            </ol>`,
    },
    {
      q: `When I sync or upload locations, does it overwrite existing information?`,
      a: `Yes. When you resync your location database with Faire or Shopify B2B, any new information for existing locations will overwrite old data during the sync. Your Faire or Shopify B2B data should be the source of accuracy and we recommend maintaining correct data in those platforms, then syncing it over to the app’s location database from there. If there is no data for a specific field in Faire or Shopify B2B and you add information in the app’s location database, then re-sync, it will not clear the field. The information you added will stay intact.`,
    },
    {
      q: `What if I don’t want to sync all my customers and only want specific locations?`,
      a: `You’ll need to set up the filtering in the Sync Settings for the platform. You can choose to only sync customers who have ordered within a specific time range, or with Shopify B2B you can only sync company location listings with orders. For Faire, you can also filter by store type. You cannot filter national retailer locations at this time. If a retailer is toggled on, all locations for that retailer will be synced. `,
    },
    {
      q: `How do I add tags to a location?`,
      a: `You can add tags in one of two ways. You can bulk tag locations on the ‘All Locations’ page by checking off the locations you wish to tag and then checking off the tags you wish to apply after clicking the ‘Add Tags’ button. Or, you can go into individual locations and add tags at the bottom of the location’s listing.`,
    },
    {
      q: `How do I hide or display specific locations?`,
      a: `You can control a location’s visibility in one of two ways. You can bulk edit locations on the ‘All Locations’ page by checking off the locations you wish to edit and then clicking ‘Set as Visible’ or ‘Set as Hidden’. Or, you can go into individual locations and click the ‘Visible’ icon next to the Location Editor header to change it to hidden, and vice versa.`,
    },
    {
      q: `How often does the Auto-Sync run?`,
      a: `If you set your Faire or Shopify B2B integration to sync automatically, new data will be synced every 24 hours. Any new information found for existing locations will automatically overwrite old data during the sync. If there is no new information for a location found during the sync, the existing data in any given field will stay as is. If any new locations are found, a new listing will be created in the locations database. Listings are not deleted through the sync. Any old or archived listings will need to be manually deleted or hidden from the map.`,
    },
    {
      q: `I don’t see a national retailer I want to show on my map - will there be more?`,
      a: `Yes! We are actively adding new retailers. Please <a href="http://www.h1-apps.com" target="_blank">CLICK HERE</a> to submit a retailer that you’d like to see included and we’ll add it to our list.`,
    }
  ];
  
  return !loaderData || !isLoaded ? (
      <Skeleton />
    ) : (
      <Page title="Help Center">
        {isLoading && (<LoadingScreen />)}
        <Box paddingBlockEnd='400'>
          <Layout>
            <Layout.Section>
              <BlockStack gap="400">
                <Faq items={faqs} />
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
        {/* <Box paddingBlockEnd='400'>
          <OtherApps />
        </Box> */}
        <script dangerouslySetInnerHTML={{ __html: `<script type="text/javascript">!function(e,t,n){function a(){var e=t.getElementsByTagName("script")[0],n=t.createElement("script");n.type="text/javascript",n.async=!0,n.src="https://beacon-v2.helpscout.net",e.parentNode.insertBefore(n,e)}if(e.Beacon=n=function(t,n,a){e.Beacon.readyQueue.push({method:t,options:n,data:a})},n.readyQueue=[],"complete"===t.readyState)return a();e.attachEvent?e.attachEvent("onload",a):e.addEventListener("load",a,!1)}(window,document,window.Beacon||function(){});</script> <script type="text/javascript">window.Beacon('init', 'c83a7528-fb5b-4e8a-a7b7-db3ee3449c94')</script>`}} />
      </Page>
    );
}
