import {useState, useCallback} from 'react';
import {
  Layout,
  Card,
  FormLayout,
  Text,
  Select,
  Box,
  Button,
  Tabs,
  TextField,
  Icon,
  BlockStack,
  Tooltip,
  Link,
  InlineStack,
  Grid,
  Checkbox,
  Thumbnail,
  ChoiceList,
} from "@shopify/polaris";

import {
  QuestionCircleIcon,
  StoreManagedIcon,
} from "@shopify/polaris-icons"

import { retailers } from './defines';

interface RetailersFormProps {
  selected: Array<string>,
  updateAction: Function,
}

export function RetailersForm(props:RetailersFormProps) {
  const {selected, updateAction} = props;

  const handleChange = (newChecked: boolean, id: string) => {
    // TODO
    updateAction(id, newChecked);
  };

  return (
    <Card>
      <BlockStack gap="400">

        <BlockStack gap="200">
          <InlineStack gap="200" blockAlign="center">
            <Text as="h4" variant="headingLg">National Retailers</Text>
            <Tooltip content="If an integration is toggled on, all locations nationwide for that retailer will display on your map. If there are new or closed locations for a retailer, they will be updated automatically on your map."><Icon source={QuestionCircleIcon} /></Tooltip>
          </InlineStack>
          <Text as="p">Select which popular retail stores to show on your map</Text>
        </BlockStack>

        <Box paddingBlockStart="400">

          <Grid columns={{xs: 2, sm: 3, md: 3, lg: 3, xl: 3}}>
            { retailers.map((x, i) => (
              <Grid.Cell>
                <Checkbox
                  id={x.id}
                  label={(<img src={x.icon} alt={x.label} style={{marginLeft: '10px', maxWidth: '100%', width:'120px', maxHeight: '42px', objectFit:'contain'}} />)}
                  checked={selected?.includes(x.id)}
                  onChange={handleChange}
                />
              </Grid.Cell>
            ))}
          </Grid>

        </Box>

        <Box>
          <Card>
            <InlineStack wrap={false} gap="200" blockAlign='center'>
              <Box background="bg-fill-info" padding="100" borderRadius='200'>
                <Icon source={StoreManagedIcon} />
              </Box>
              <div className='responsiveStack'>
                <Box>
                  <Text as='p' variant='bodyMd'>We are actively adding new retailers! Not seeing a retailer you need? Submit a request for one here!</Text>
                </Box>
                <Box>
                  <Button><span style={{whiteSpace:'nowrap'}}>Request a Retailer</span></Button>
                </Box>
              </div>
            </InlineStack>
          </Card>
        </Box>
      </BlockStack>
    </Card>
    );
}
