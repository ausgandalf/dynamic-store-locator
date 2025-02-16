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
  Card,
  Bleed,
  Button,
  ChoiceList,
  Divider,
  EmptyState,
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
} from "@shopify/polaris";
import { ViewIcon, HideIcon } from "@shopify/polaris-icons";


import { sampleLocation, emptyLocation, LocationType } from "./defines";
import { LocationModel } from "app/models/Location.server";

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

  const toggleVisible = () => {
    setFormState((formState) => {return {...formState, visible:!formState.visible}});
  }

  const visibleToggle = (formState.visible) ? (
    <Badge tone="success"><Button icon={ViewIcon} tone="success" variant="plain" onClick={toggleVisible}>Visible</Button></Badge>
  ) : (
    <Badge><Button icon={HideIcon} variant="plain" onClick={toggleVisible}>Hidden</Button></Badge>
  );

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
      <Grid columns={{sm: 3}}>
        <Grid.Cell columnSpan={{xs: 6, sm: 4, md: 4, lg: 8, xl: 8}}>
          <Card>
            <p>Info</p>
          </Card>
        </Grid.Cell>
        <Grid.Cell columnSpan={{xs: 6, sm: 2, md: 2, lg: 4, xl: 4}}>
          <Card>
            <p>Preview</p>
          </Card>
        </Grid.Cell>
      </Grid>
    </Page>
  );
}
