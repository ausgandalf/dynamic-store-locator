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
  IndexFiltersMode,
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

import { formateDate, renderMarker, renderSource } from 'app/components/Functions';
import { UploadBlock } from './upload';

import { LoadingScreen } from 'app/components/LoadingScreen';

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
    case 'query':
      return 'Search for: ' + value;
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
  const navigate = useNavigate();

  const [isLoaded, setIsLoaded] = useState(false);
  const [locations, setLocations] = useState([]);
  const [page ,setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [queryValue, setQueryValue] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortColumn, setSortColumn] = useState(null);

  const filteredLocations = [...locations].filter((row, index) => {
    if (queryValue == '') return true;
    const str = JSON.stringify(Object.values(row));
    return str.toLowerCase().indexOf(queryValue.toLowerCase()) != -1;
  });

  const columnMapper = {
    '1': 'location',
    '2': 'source',
    '4': 'visible',
    '5': 'added',
    '6': 'updated',
  }
  const maxPage = Math.floor((filteredLocations.length - 1) / perPage) + 1;
  const sortedLocations = [...filteredLocations].sort((a, b) => {
    const column = columnMapper[sortColumn];
    const directionLabels = {
      '1': 'descending',
      '2': 'descending',
      '4': 'ascending',
      '5': 'ascending',
      '6': 'ascending',
    };
    if (column) {
      if (a[column] < b[column]) {
        return sortDirection === directionLabels[sortColumn] ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return sortDirection === directionLabels[sortColumn] ? 1 : -1;
      }
    }
    return 0;
  });
  const pagedLocations = sortedLocations.slice(page * perPage, Math.min(locations.length, (page + 1) * perPage ));

  const handleSort = useCallback((column, direction) => {
    setSortDirection(direction);
    setSortColumn(column);
  }, [sortColumn, sortDirection]);


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
    nav.state === "submitting" && nav.formData?.get("action") !== "save";
  const isDeleting =
    nav.state === "submitting" && nav.formData?.get("action") === "delete";
  const isLoading = nav.state === "loading";
    
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
  
  const sortOptions: IndexFiltersProps['sortOptions'] = [
    {label: 'Store Name', value: 'location asc', directionLabel: 'A-Z'},
    {label: 'Store Name', value: 'location desc', directionLabel: 'Z-A'},
    {label: 'Added', value: 'added asc', directionLabel: 'Ascending'},
    {label: 'Added', value: 'added desc', directionLabel: 'Descending'},
    {label: 'Updated', value: 'updated asc', directionLabel: 'Ascending'},
    {label: 'Updated', value: 'updated desc', directionLabel: 'Descending'},
  ];
  const [sortSelected, setSortSelected] = useState(['location asc']);
  const {mode, setMode} = useSetIndexFiltersMode(IndexFiltersMode.Filtering);
  const onHandleCancel = () => {};

  const onHandleSave = async () => {
    await sleep(1);
    return true;
  };

  const [sourceFilter, setSourceFilter] = useState<string[] | undefined>(
    undefined,
  );
  const [visibilityFilter, setVisibilityFilter] = useState<string[] | undefined>(
    undefined,
  );

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

  if (queryValue && !isEmpty(queryValue)) {
    const key = 'query';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, queryValue),
      onRemove: handleQueryValueRemove,
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
    useIndexResourceState(pagedLocations);

  const onEditClick = (e, id) => {
    e.preventDefault(); 
    e.stopPropagation();
    navigate(`./${id}`);
  }

  const onDeleteClick = (e, id) => {
    e.preventDefault(); 
    e.stopPropagation();
    // TODO
  }

  const rowMarkup = pagedLocations.map(
    (
      {id, location, address, source, marker, visible, added, updated},
      index,
    ) => (
      <IndexTable.Row
        id={id}
        key={'location_' + id + '_' + index}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Text variant="bodyXs" as="span">{page * perPage + index + 1}</Text>  
        </IndexTable.Cell>
        <IndexTable.Cell>
          <a onClick={(e)=>onEditClick(e, id)} className='locationTitleLink'>
            <BlockStack gap="100">
              <Text variant="bodyMd" as="span">{location}</Text>
              <Text variant="bodyXs" as="span">{[address.address1, address.address2, address.city, address.state, address.zipcode].filter((x) => (x != '')).join(',')}</Text>  
            </BlockStack>
          </a>
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
          <a onClick={(e)=>onDeleteClick(e, id)}><Button variant="plain" icon={DeleteIcon} accessibilityLabel="Delete" /></a>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <a onClick={(e)=>onEditClick(e, id)}><Button variant="plain">Edit</Button></a>
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
      {isLoading && (<LoadingScreen />)}
      <Card>
        <IndexFilters
          // sortOptions={sortOptions}
          sortSelected={sortSelected}
          queryValue={queryValue}
          queryPlaceholder="Searching in All Locations"
          onQueryChange={handleFiltersQueryChange}
          onQueryClear={() => setQueryValue('')}
          onSort={setSortSelected}
          tabs={[]}
          selected={0}
          filters={filters}
          appliedFilters={appliedFilters}
          onClearAll={handleFiltersClearAll}
          mode={mode}
          setMode={setMode}
        />
        <IndexTable
          condensed={useBreakpoints().smDown}
          resourceName={resourceName}
          itemCount={pagedLocations.length}
          emptyState={emptyStateMarkup}
          selectedItemsCount={
            allResourcesSelected ? 'All' : selectedResources.length
          }
          onSelectionChange={handleSelectionChange}
          sortable={[false, true, true, false, true, true, true, false, false]}
          sortColumnIndex={sortColumn}
          sortDirection={sortDirection}
          onSort={handleSort}
          headings={[
            {title: 'No'},
            {title: 'Store Name', id:'location'},
            {title: 'Source', id:'source'},
            {title: 'Map Marker'},
            {title: 'Visibility', id:'visible'},
            {title: 'Added', id:'added'},
            {title: 'Updated', id:'updated'},
            {title: ''},
            {title: ''},
          ]}
          pagination={{
            hasPrevious: (page > 0),
            onPrevious: () => setPage((page) => Math.max(0, page - 1)),
            hasNext: (page < (maxPage - 1)),
            onNext: () => setPage((page) => Math.min(maxPage - 1, page + 1)),
          }}
        >
          {rowMarkup}
        </IndexTable>
      </Card>
      
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

        <TitleBar title='Bulk Import Your Locations'>
          <button variant="primary" onClick={() => {}}>'Import Location List</button>
        </TitleBar>
      </Modal>
      
    </Page>
    );
}
