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

  const retailers = [
    {
      id: "bestbuy",
      label: "Best Buy",
      icon: "/images/retailers/bestbuy.png",
    },
    {
      id: "costco",
      label: "Costco",
      icon: "/images/retailers/bestbuy.png",
    },
    {
      id: "cvs",
      label: "CVS",
      icon: "/images/retailers/bestbuy.png",
    },
    {
      id: "homedepot",
      label: "Home Depot",
      icon: "/images/retailers/bestbuy.png",
    },
    {
      id: "lowes",
      label: "Lowe's",
      icon: "/images/retailers/bestbuy.png",
    },
    {
      id: "officedepot",
      label: "Office Depot",
      icon: "/images/retailers/bestbuy.png",
    },
    {
      id: "rei",
      label: "REI",
      icon: "/images/retailers/bestbuy.png",
    },
    {
      id: "safeway",
      label: "Safeway",
      icon: "/images/retailers/bestbuy.png",
    },
    {
      id: "samsclub",
      label: "Sam's Club",
      icon: "/images/retailers/bestbuy.png",
    },
    {
      id: "target",
      label: "Target",
      icon: "/images/retailers/bestbuy.png",
    },
    {
      id: "tjmax",
      label: "TJMax",
      icon: "/images/retailers/bestbuy.png",
    },
    {
      id: "walgreens",
      label: "Walgreens",
      icon: "/images/retailers/bestbuy.png",
    },
    {
      id: "walmart",
      label: "Walmart",
      icon: "/images/retailers/bestbuy.png",
    },
    {
      id: "wholefoods",
      label: "Whole Foods",
      icon: "/images/retailers/bestbuy.png",
    },
  ];

  return (
    <Card>
      <BlockStack gap="400">

        <BlockStack gap="200">
          <InlineStack gap="200" blockAlign="center">
            <Text as="h4" variant="headingLg">Popular Retailers</Text>
            <Tooltip content="Here are popular retailers listed."><Icon source={QuestionCircleIcon} /></Tooltip>
          </InlineStack>
          <Text as="p">Select which popular retail stores to show on your map</Text>
        </BlockStack>

        <Box paddingBlockStart="400">

          <Grid columns={{xs: 2, sm: 3, md: 3, lg: 3, xl: 3}}>
            { retailers.map((x, i) => (
              <Grid.Cell>
                <Checkbox
                  id={x.id}
                  label={(<img src={x.icon} alt={x.label} style={{maxWidth: '100%'}} />)}
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
