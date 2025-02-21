import { useState } from "react";
import { redirect } from "@remix-run/node";
import {
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { authenticate } from "../../shopify.server";
import {
  Box,
  Card,
  Bleed,
  Button,
  ChoiceList,
  Divider,
  EmptyState,
  Icon,
  InlineStack,
  InlineError,
  Layout,
  Page,
  Text,
  TextField,
  Thumbnail,
  BlockStack,
  PageActions,
  Badge,
  Grid,
  Select,
  Tooltip,
} from "@shopify/polaris";
import { QuestionCircleIcon, ViewIcon, HideIcon, FormsIcon } from "@shopify/polaris-icons";

import { sampleLocation, emptyLocation, LocationType, states, socialOptions, days } from "./defines";
import { LocationModel } from "app/models/Location.server";
import { SocialsBlock } from "./socials";
import { HrsBlock } from "./hrs";
import { LogoBlock } from "./logo";
import { MarkerBlock } from "../app.design/marker";
import { TagsBlock } from "./tags";

import { MapPreviewerRight } from "../app.design/preview_right";
import { locationCardDataType, defaultSettings } from "../app.design/defines";

export async function loader({ request, params }) {
  const { admin } = await authenticate.admin(request);

  if (params.id === "new") {
    return Response.json(emptyLocation);
  } else {
    return Response.json(sampleLocation);
  }
}

export async function action({ request, params }) {
  const { session } = await authenticate.admin(request);
  const { shop } = session;

  /** @type {any} */
  const data = {
    ...Object.fromEntries(await request.formData()),
    shop,
  };

  if (data.action === "delete") {
    // TODO - delete action
    return redirect("/app/locations");
  }

  const errors = LocationModel.validate(data);
  
  // TODO - Add or Update location
  const response =
    params.id === "new"
      ? await LocationModel.create({ data })
      : await LocationModel.update({ data });

  return redirect(`/app/locations/${response.location.id}`);
}

export default function Index() {
  const errors = useActionData()?.errors || {};

  const location:LocationType = useLoaderData();
  const [formState, setFormState] = useState(location);
  const [cleanFormState, setCleanFormState] = useState(location);
  const isDirty = JSON.stringify(formState) !== JSON.stringify(cleanFormState);

  const [settings, setSettings] = useState(defaultSettings);

  const nav = useNavigation();
  const isSaving =
    nav.state === "submitting" && nav.formData?.get("action") !== "delete";
  const isDeleting =
    nav.state === "submitting" && nav.formData?.get("action") === "delete";
  
  const submit = useSubmit();
  function handleSave() {
    // TODO
    const data = formState;

    setCleanFormState({ ...formState });
    submit(data, { method: "post" });
  }

  function formatTime(timeString: string) {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
  }

  const toggleVisible = () => {
    setFormState((formState) => {return {...formState, visible:!formState.visible}});
  }

  const visibleToggle = (formState.visible) ? (
    <Badge tone="success"><Button icon={ViewIcon} tone="success" variant="plain" onClick={toggleVisible}>Visible</Button></Badge>
  ) : (
    <Badge><Button icon={HideIcon} variant="plain" onClick={toggleVisible}>Hidden</Button></Badge>
  );

  const UpdateAction = (field: string, value: any) => {
    setFormState({...formState, [field]: value});
    if (field == 'marker') {
      setSettings({...settings, marker: value});
    }
  }

  const previewData = ():locationCardDataType => {
    const data = {
      hrs: (formState.hrs.map((x, i) => [days[i].substring(0,3), formatTime(x.from) + '  –  ' + formatTime(x.to), x.visible])).filter((x) => x[2]),
      location: formState.location,
      address: [formState.address.address1, formState.address.address2, formState.address.city, formState.address.state, formState.address.zipcode].filter((x) => (x != '')).join(','),
      phone: formState.phone,
      url: formState.website,
      logo: formState.logo,
      socials: formState.socials,
    };
    return data;
  }

  return (

    <Page 
      backAction={{content: 'All Locations', url: '/app/locations'}}
      title="Location Editor"
      titleMetadata={visibleToggle}
      compactTitle
      primaryAction={{content: 'Save', disabled: !isDirty}}
      secondaryActions={[
        {
          content: 'Delete',
          accessibilityLabel: 'Delete',
          onAction: () => alert('Delete action'),
        }
      ]}
    >
      <Grid>
        <Grid.Cell columnSpan={{xs: 6, sm: 4, md: 4, lg: 8, xl: 8}}>
          <BlockStack gap="400">

            <Card>
              <BlockStack gap="200">
                <InlineStack align="space-between">
                  <BlockStack gap="100">
                    <Text as="h4" variant="headingMd">Location Information</Text>
                    <Text as="p" variant="bodySm" tone="subdued">Customize your location information</Text>
                  </BlockStack>
                  <BlockStack gap="100" inlineAlign="end">
                    <Box>
                      <Badge tone="attention">Faire</Badge>
                    </Box>
                    <Text as="p" variant="bodySm" tone="subdued">Last Synced 1/20/24</Text>
                  </BlockStack>
                </InlineStack>

                <Box padding="200">
                  <BlockStack gap="200">
                    <TextField
                      label="Location Name"
                      type="text"
                      value={formState.location}
                      onChange={(newValue: string) => setFormState({...formState, location: newValue})}
                      autoComplete="off"
                    />

                    <TextField
                      label="Address1"
                      type="text"
                      value={formState.address.address1}
                      onChange={(newValue: string) => setFormState({...formState, address:{...formState.address, address1:newValue}})}
                      autoComplete="address-line1"
                    />

                    <TextField
                      label="Address2"
                      type="text"
                      value={formState.address.address2}
                      onChange={(newValue: string) => setFormState({...formState, address:{...formState.address, address2:newValue}})}
                      autoComplete="address-line2"
                    />

                    <Grid>
                      <Grid.Cell columnSpan={{xs:6, sm:6, md:2, lg:5}}>
                        <TextField
                          label="City"
                          requiredIndicator
                          type="text"
                          value={formState.address.city}
                          onChange={(newValue: string) => setFormState({...formState, address:{...formState.address, city:newValue}})}
                          autoComplete="address-level2"
                        />
                      </Grid.Cell>

                      <Grid.Cell columnSpan={{xs:6, sm:3, md:2, lg:2}}>
                        <Select
                          label="State"
                          requiredIndicator
                          options={states.map((x, i) => ({label: x.value, value: x.value}))}
                          value={formState.address.state}
                          onChange={(newValue: string) => setFormState({...formState, address:{...formState.address, state:newValue}})}
                        />
                      </Grid.Cell>

                      <Grid.Cell columnSpan={{xs:6, sm:3, md:2, lg:5}}>
                        <TextField
                          label="Zip Code"
                          requiredIndicator
                          type="text"
                          value={formState.address.zipcode}
                          onChange={(newValue: string) => setFormState({...formState, address:{...formState.address, zipcode:newValue}})}
                          autoComplete="postal-code"
                        />
                      </Grid.Cell>
                    </Grid>

                    <Grid>
                      <Grid.Cell columnSpan={{xs:6, sm:3, md:3, lg:6}}>
                        <TextField
                          label="Phone Number"
                          requiredIndicator
                          type="tel"
                          value={formState.phone}
                          onChange={(newValue: string) => setFormState({...formState, phone:newValue})}
                          autoComplete="tel"
                        />
                      </Grid.Cell>
                      <Grid.Cell columnSpan={{xs:6, sm:3, md:3, lg:6}}>
                        <TextField
                          label="Website URL"
                          requiredIndicator
                          type="url"
                          value={formState.website}
                          onChange={(newValue: string) => setFormState({...formState, website:newValue})}
                          autoComplete="url"
                        />
                      </Grid.Cell>
                    </Grid>

                  </BlockStack>
                </Box>
                
              </BlockStack>
            </Card>

            <SocialsBlock socials={formState.socials} update={UpdateAction}/>

            <HrsBlock hrs={formState.hrs} update={UpdateAction}/>

            <LogoBlock logo={formState.logo} update={UpdateAction}/>

            <Card>
              <BlockStack gap="200">
                <InlineStack align="space-between">
                  <BlockStack gap="100">
                    <Text as="h4" variant="headingMd">Location Marker</Text>
                  </BlockStack>
                  <InlineStack gap="100" blockAlign="center">
                    <Button onClick={() => {}}>Use Universal Pin</Button>
                    <Tooltip content="Load global settings"><Icon source={QuestionCircleIcon} /></Tooltip>
                  </InlineStack>
                </InlineStack>

                <MarkerBlock settings={formState.marker} update={UpdateAction} section="location"  />
              </BlockStack>
            </Card>

            <TagsBlock tags={formState.tags} update={UpdateAction}/>

          </BlockStack>
        </Grid.Cell>
        <Grid.Cell columnSpan={{xs: 6, sm: 2, md: 2, lg: 4, xl: 4}}>
          <div className="design-previewer design-previewer--location">
            <MapPreviewerRight settings={settings} data={previewData()} />
          </div>
        </Grid.Cell>
      </Grid>
    </Page>
  );
}
