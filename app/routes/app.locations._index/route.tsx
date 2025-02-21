import {useState, useEffect, useCallback} from 'react';
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher, useLoaderData, useActionData, useNavigation,useSubmit, redirect } from "@remix-run/react";
import {
  Page,
  Layout,
  BlockStack,
  Box,
  Button,
  Tabs,
  Card,
  Listbox,
  Icon,
  InlineStack,
  Text,
  Divider,
  Bleed,
  PageActions,
  TextField,
  IndexTable,
  IndexFilters,
  useSetIndexFiltersMode,
  useIndexResourceState,
  ChoiceList,
  RangeSlider,
  Badge,
  useBreakpoints,
  IndexFiltersProps, 
  TabProps,
  Thumbnail,
  EmptySearchResult,
  Grid,
} from "@shopify/polaris";

import {
  DeleteIcon,
  ExportIcon,
  ImportIcon,
  PlusCircleIcon,
  VariantIcon,
  FileIcon,
} from "@shopify/polaris-icons";

import { useNavigate } from '@remix-run/react';
import {Modal, TitleBar, useAppBridge} from '@shopify/app-bridge-react';
import { authenticate } from "../../shopify.server";

import { Skeleton } from './skeleton';

import { locations as defaultLocations, defaultSettings, ActionDataType, SettingsType } from "./defines";

import { formateDate, renderMarker } from 'app/components/Functions';
import { UploadBlock } from './upload';

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
    locations: defaultLocations,
    action: 'import',
  };

  const errors = undefined; // get action errors

  if (errors) {
    return Response.json({...defaultResponse, errors}, { status: 422 });
  }

  // TODO
  
  return Response.json({ ...defaultResponse });
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);
  // TODO - Load settings
  
  return Response.json({ locations: defaultLocations });

};


//////////////////////////////////////////////////////////////////////////////////

function disambiguateLabel(key: string, value: string | any[]): string {
  switch (key) {
    case 'source':
      return (value as string[]).map((val) => `${val}`).join(', ');
    default:
      return value as string;
  }
}

function isEmpty(value: string | string[]): boolean {
  if (Array.isArray(value)) {
    return value.length === 0;
  } else {
    return value === '' || value == null;
  }
}

export default function Index() {

  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const errors = actionData ? actionData.errors : {};
  const actionType = actionData ? actionData.action : '';

  const [isLoaded, setIsLoaded] = useState(false);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (loaderData.locations) {
      setLocations(loaderData.locations);
    }
    setTimeout(() => setIsLoaded(true), 1000);
  }, [loaderData]);

  const shopify = useAppBridge();

  useEffect(() => {
    if (actionType) {
      shopify.toast.show(`Action ${actionType} is complete.`);
    }
  }, [actionType, shopify]);

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
  
    submit(data, { method: "post" });
  }

  //////////////////////////////////////////////////////////////////////////////////

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const [itemStrings, setItemStrings] = useState(Array<string>);
  const deleteView = (index: number) => {
    const newItemStrings = [...itemStrings];
    newItemStrings.splice(index, 1);
    setItemStrings(newItemStrings);
    setSelected(0);
  };

  const duplicateView = async (name: string) => {
    setItemStrings([...itemStrings, name]);
    setSelected(itemStrings.length);
    await sleep(1);
    return true;
  };

  const tabs: TabProps[] = itemStrings.map((item, index) => ({
    content: item,
    index,
    onAction: () => {},
    id: `${item}-${index}`,
    isLocked: index === 0,
    actions:
      index === 0
        ? []
        : [
            {
              type: 'rename',
              onAction: () => {},
              onPrimaryAction: async (value: string): Promise<boolean> => {
                const newItemsStrings = tabs.map((item, idx) => {
                  if (idx === index) {
                    return value;
                  }
                  return item.content;
                });
                await sleep(1);
                setItemStrings(newItemsStrings);
                return true;
              },
            },
            {
              type: 'duplicate',
              onPrimaryAction: async (value: string): Promise<boolean> => {
                await sleep(1);
                duplicateView(value);
                return true;
              },
            },
            {
              type: 'edit',
            },
            {
              type: 'delete',
              onPrimaryAction: async () => {
                await sleep(1);
                deleteView(index);
                return true;
              },
            },
          ],
  }));
  const [selected, setSelected] = useState(0);
  const onCreateNewView = async (value: string) => {
    await sleep(500);
    setItemStrings([...itemStrings, value]);
    setSelected(itemStrings.length);
    return true;
  };
  const sortOptions: IndexFiltersProps['sortOptions'] = [
    {label: 'Store Name', value: 'location asc', directionLabel: 'A-Z'},
    {label: 'Store Name', value: 'location desc', directionLabel: 'Z-A'},
    {label: 'Added', value: 'added asc', directionLabel: 'Ascending'},
    {label: 'Added', value: 'added desc', directionLabel: 'Descending'},
    {label: 'Updated', value: 'updated asc', directionLabel: 'Ascending'},
    {label: 'Updated', value: 'updated desc', directionLabel: 'Descending'},
  ];
  const [sortSelected, setSortSelected] = useState(['location asc']);
  const {mode, setMode} = useSetIndexFiltersMode();
  const onHandleCancel = () => {};

  const onHandleSave = async () => {
    await sleep(1);
    return true;
  };

  const primaryAction: IndexFiltersProps['primaryAction'] =
    selected === 0
      ? {
          type: 'save-as',
          onAction: onCreateNewView,
          disabled: false,
          loading: false,
        }
      : {
          type: 'save',
          onAction: onHandleSave,
          disabled: false,
          loading: false,
        };
  const [sourceFilter, setSourceFilter] = useState<string[] | undefined>(
    undefined,
  );
  const [visibilityFilter, setVisibilityFilter] = useState<string[] | undefined>(
    undefined,
  );
  const [queryValue, setQueryValue] = useState('');

  const handleSourceFilterChange = useCallback(
    (value: string[]) => setSourceFilter(value),
    [],
  );
  const handleVisibilityFilterChange = useCallback(
    (value: string[]) => setVisibilityFilter(value),
    [],
  );
  const handleFiltersQueryChange = useCallback(
    (value: string) => setQueryValue(value),
    [],
  );
  const handleSourceFilterRemove = useCallback(
    () => setSourceFilter(undefined),
    [],
  );
  const handleVisibilityFilterRemove = useCallback(
    () => setVisibilityFilter(undefined),
    [],
  );

  const handleQueryValueRemove = useCallback(() => setQueryValue(''), []);
  const handleFiltersClearAll = useCallback(() => {
    handleSourceFilterRemove();
    handleVisibilityFilterRemove();
    handleQueryValueRemove();
  }, [
    handleSourceFilterRemove,
    handleVisibilityFilterRemove,
    handleQueryValueRemove,
  ]);

  const filters = [
    {
      key: 'source',
      label: 'Source',
      filter: (
        <ChoiceList
          title="Source"
          titleHidden
          choices={[
            {label: 'Manual', value: 'Manual'},
            {label: 'Faire', value: 'Faire'},
            {label: 'Retailer', value: 'Retailer'},
          ]}
          selected={sourceFilter || []}
          onChange={handleSourceFilterChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
    {
      key: 'visibility',
      label: 'Visibility',
      filter: (
        <ChoiceList
          title="Source"
          titleHidden
          choices={[
            {label: 'Visible', value: 'visible'},
            {label: 'Hidden', value: 'hidden'},
          ]}
          selected={visibilityFilter || []}
          onChange={handleVisibilityFilterChange}
        />
      ),
      shortcut: true,
    },
  ];

  const appliedFilters: IndexFiltersProps['appliedFilters'] = [];
  if (sourceFilter && !isEmpty(sourceFilter)) {
    const key = 'source';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, sourceFilter),
      onRemove: handleSourceFilterRemove,
    });
  }

  if (visibilityFilter && !isEmpty(visibilityFilter)) {
    const key = 'visibility';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, visibilityFilter),
      onRemove: handleVisibilityFilterRemove,
    });
  }

  const emptyStateMarkup = (
    <EmptySearchResult
      title={'No customers yet'}
      description={'Try changing the filters or search term'}
      withIllustration
    />
  );
  
  const resourceName = {
    singular: 'location',
    plural: 'locations',
  };

  const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(locations);

  const renderSource = (source:string) => {
    switch (source) {
      case 'Manual':
        return (<Badge tone="info">Manual</Badge>);
        break;
      case 'Faire':
        return (<Badge tone="attention">Faire</Badge>);
        break;
      case 'Retailerr':
        return (<Badge tone="warning">Faire</Badge>);
        break;
      default:
        return (<Badge>{source}</Badge>);
        break;
    }
  }

  const rowMarkup = locations.map(
    (
      {id, location, address, source, marker, visible, added, updated},
      index,
    ) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <BlockStack gap="100">
            <Text variant="bodyMd" as="span">{location}</Text>
            <Text variant="bodyXs" as="span">{[address.address1, address.address2, address.city, address.state, address.zipcode].filter((x) => (x != '')).join(',')}</Text>  
          </BlockStack>
        </IndexTable.Cell>
        <IndexTable.Cell>{renderSource(source)}</IndexTable.Cell>
        <IndexTable.Cell>
          <BlockStack align='center' inlineAlign='center'>
            <Card padding="200">
              <div className="markerWrapper" style={{width: '24px'}}>
                {renderMarker(marker)}
              </div>
            </Card>
          </BlockStack>
        </IndexTable.Cell>
        <IndexTable.Cell>
          {visible ? (<Badge tone="success">Visible</Badge>) : (<Badge>Hidden</Badge>)}
        </IndexTable.Cell>
        <IndexTable.Cell>{formateDate(added)}</IndexTable.Cell>
        <IndexTable.Cell>{formateDate(updated)}</IndexTable.Cell>
        <IndexTable.Cell>
          <Button variant="plain" icon={DeleteIcon} accessibilityLabel="Delete" />
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Button variant="plain" url={'./' + id}>Edit</Button>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  //////////////////////////////////////////////////////////////////////////////////

  const importModalTitle = () => {
    return (
      <InlineStack gap="100">
        <Icon source={ImportIcon} />
        <Text variant='headingMd' as="h4">Bulk Import Your Locations</Text>
      </InlineStack>
    )
  }

  const UpdateAction = (field: string, value: any) => {
    // TODO
  }

  return (
    <Page 
      title="All Locations"
      primaryAction={{
        content: 'Add Location',
        icon: PlusCircleIcon,
        url: '/app/locations/new',
      }}
      secondaryActions={[
        {
          content: 'Export',
          icon: ExportIcon,
          disabled: true,
        },
        {
          content: 'Import',
          icon: ImportIcon,
          onAction() {
            document.getElementById('import-modal').show();
          },
        },
        {
          content: 'Delete',
          disabled: selectedResources.length < 1,
        },
      ]}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <IndexFilters
              sortOptions={sortOptions}
              sortSelected={sortSelected}
              queryValue={queryValue}
              queryPlaceholder="Searching in all"
              onQueryChange={handleFiltersQueryChange}
              onQueryClear={() => setQueryValue('')}
              onSort={setSortSelected}
              primaryAction={primaryAction}
              cancelAction={{
                onAction: onHandleCancel,
                disabled: false,
                loading: false,
              }}
              tabs={tabs}
              selected={selected}
              onSelect={setSelected}
              canCreateNewView
              onCreateNewView={onCreateNewView}
              filters={filters}
              appliedFilters={appliedFilters}
              onClearAll={handleFiltersClearAll}
              mode={mode}
              setMode={setMode}
            />
            <IndexTable
              condensed={useBreakpoints().smDown}
              resourceName={resourceName}
              itemCount={locations.length}
              emptyState={emptyStateMarkup}
              selectedItemsCount={
                allResourcesSelected ? 'All' : selectedResources.length
              }
              onSelectionChange={handleSelectionChange}
              headings={[
                {title: 'Store Name'},
                {title: 'Source'},
                {title: 'Map Marker'},
                {title: 'Visibility'},
                {title: 'Added'},
                {title: 'Updated'},
                {title: ''},
                {title: ''},
              ]}
              pagination={{
                hasNext: true,
                onNext: () => {},
              }}
            >
              {rowMarkup}
            </IndexTable>
          </Card>
        </Layout.Section>
      </Layout>
      
      <Modal id="import-modal">
        <Box padding="400">
          <Grid>
            <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 4, xl: 4}}>
              <div className='rightBorderAboveSm'>
                <BlockStack gap='200'>
                  <Text as='h4' variant='headingMd'>Download the template</Text>
                  <Text as='p' variant='bodyMd'>Download the .csv template below to add in your locations all in one shot!</Text>
                  <Box>
                    <Button icon={FileIcon}>Download the .csv Template</Button>
                  </Box>
                </BlockStack>
              </div>
            </Grid.Cell>
            <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 4, xl: 4}}>
              <BlockStack gap='200'>
                <Text as='h4' variant='headingMd'>Upload Your List</Text>
                <Text as='p' variant='bodyMd'>When your list is ready, select or drag/drop your template below to upload your locations to Store Locator</Text>
                <Box>
                  <UploadBlock file='' update={UpdateAction} />
                </Box>
              </BlockStack>
            </Grid.Cell>
          </Grid>
        </Box>

        <TitleBar>
          <Button icon={ImportIcon} variant="primary" onClick={() => {}}>Import My Address List</Button>
        </TitleBar>
      </Modal>
      
    </Page>
    );
}
