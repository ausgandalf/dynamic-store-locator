import {useState, useCallback} from 'react';
import {
  Layout,
  Card,
  FormLayout,
  TextField,
  IndexTable,
  InlineStack,
  Text,
  Select,
  BlockStack,
  Box,
  Tabs,
  Button,
} from "@shopify/polaris";

import {
  EditIcon,
  DeleteIcon,
  PlusIcon,
} from '@shopify/polaris-icons';

import {Modal, TitleBar, useAppBridge} from '@shopify/app-bridge-react';

export interface FilterType {
  id: string,
  label: string,
  tag: string,
}

interface FiltersFormProps {
  filters: Array<FilterType>,
  deleteAction: Function,
  updateAction: Function,
}

export function FiltersForm(props: FiltersFormProps) {

  const {filters, deleteAction, updateAction} = props;

  const defaultFilter:FilterType = {id: "", label:"", tag:""};
  const [newFilterLabel, setNewFilterLabel] = useState("");
  const [currentFilter, setCurrentFilter] = useState(defaultFilter);
  const [errors, setErrors] = useState({});
  const [addFilterErrors, setAddFilterErrors] = useState({});

  const resetErrors = () => {
    setErrors({});
    setAddFilterErrors({});
  };

  const editFilter = useCallback((filter:FilterType) => {
    setCurrentFilter(filter);
    resetErrors();
    document.getElementById('filter-modal').show();
  }, [currentFilter],);
  
  const deleteFilter =(filter:FilterType) => {
    deleteAction(filter);
    resetErrors();
  };

  const resetFilter = () => {
    setCurrentFilter(defaultFilter);
    resetErrors();
    document.getElementById('filter-modal').hide();
  }

  const updateFilter = () => {
    // TODO Upate Action
    if (currentFilter.label == '') {
      setErrors({...errors, label:"The filter should not be empty."});
      return;
    }
    updateAction(currentFilter);
    resetErrors();
    document.getElementById('filter-modal').hide();
  }

  const addFilter = () => {
    // TODO Upate Action
    if (newFilterLabel == '') {
      setAddFilterErrors({...addFilterErrors, label:"The filter should not be empty."});
      return;
    }
    resetErrors();
    setNewFilterLabel("");
    updateAction({...defaultFilter, label:newFilterLabel});
  }

  const addButtonVAlign = () => {
    return addFilterErrors.label ? "center" : "end";
  }

  const filterModalTitle = () => {
    if (currentFilter.id == "") {
      return "Create New Filter";
    } else {
      return "Update Filter";
    }
  }

  const handleModalFilterLabelChange = useCallback(
    (newLabel: string) => {
      setCurrentFilter({...currentFilter, label:newLabel});
    },
    [currentFilter],
  );

  const resourceName = {
    singular: 'filter',
    plural: 'filters',
  };
  const rowMarkup = filters.map(
    (
      {id, label, tag},
      index,
    ) => (
      <IndexTable.Row id={id} key={id} position={index}>
        <IndexTable.Cell>
          <Text variant="bodyMd" as="span">
            {label}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell className='cell--icon'>
          <Button variant='plain' icon={EditIcon} accessibilityLabel="Edit" onClick={() => editFilter({id, label, tag})} />
        </IndexTable.Cell>
        <IndexTable.Cell className='cell--icon'>
          <Button variant='plain' icon={DeleteIcon} accessibilityLabel="Delete" onClick={() => deleteFilter({id, label, tag})} />
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <Box paddingBlock="400">
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack>
              <Text as='p' variant='bodyMd'>Search filters will show up as checkboxes to help your customers narrow down their searches based of the features they’re looking for. Add filters like “Wheelchair Accessible”, “Open 24-Hours”, “Wi-Fi Available” etc...</Text>
              <Box padding="400">
                <BlockStack gap="200">
                  <FormLayout>
                    <InlineStack wrap={false} align="start" gap="200">
                      <Box width='100%'>
                        <TextField
                          label="Add a Filter"
                          value={newFilterLabel}
                          onChange={(newLabel) => {setAddFilterErrors({}); setNewFilterLabel(newLabel);}}
                          clearButton
                          onClearButtonClick={() => setNewFilterLabel("")}
                          autoComplete="off"
                          error={addFilterErrors.label}
                        />
                      </Box>
                      <BlockStack align={addButtonVAlign()}><Button icon={PlusIcon} onClick={addFilter}>Add</Button></BlockStack>
                    </InlineStack>
                  </FormLayout>

                  <IndexTable
                    condensed={false}
                    resourceName={resourceName}
                    itemCount={filters.length}
                    headings={[
                      {title: 'Filter'},
                      {title: 'Edit'},
                      {title: 'Delete'},
                    ]}
                    selectable={false}
                  >
                    {rowMarkup}
                  </IndexTable>
                </BlockStack>
              </Box>
              
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>

      <Modal id="filter-modal">
        <Box padding="400">
          <FormLayout>
            <TextField
              id="label"
              label="Filter"
              value={currentFilter.label}
              onChange={handleModalFilterLabelChange}
              autoComplete="off"
              error={errors.label}
            />
          </FormLayout>
        </Box>

        <TitleBar title={filterModalTitle()}>
          <button variant="primary" onClick={updateFilter}>Save</button>
          <button onClick={resetFilter}>Cancel</button>
        </TitleBar>
      </Modal>
    </Box>

    );
}
