import { useState, useCallback } from "react";
import {
  ActionList,
  Bleed,
  Box,
  Button,
  Card,
  DropZone,
  Grid,
  Icon,
  InlineStack,
  Select,
  Tag,
  Text,
  TextField,
  Thumbnail,
  BlockStack,
  Popover,
  ActionListItemDescriptor,
} from "@shopify/polaris";
import { ProductIcon, ProductFilledIcon } from "@shopify/polaris-icons";

import { availableTags } from "./defines";

interface TagsBlockProps {
  tags: Array<string>,
  update: Function,
}

export function TagsBlock({tags, update}:TagsBlockProps) {
  const [data, setData] = useState(tags);

  const [tagDropdownActive, setTagDropdownActive] = useState(false);
  const toggleTagDropdownActive = useCallback(() => setTagDropdownActive((active) => !active), []);
  const tagDropdownActiveActivator = (
    <BlockStack gap="200">
      <Button icon={ProductIcon} onClick={toggleTagDropdownActive} disclosure>
        <span style={{whiteSpace:"nowrap"}}>Add Tags</span>
      </Button>
    </BlockStack>
  );
  const actionList = ():ActionListItemDescriptor[] => {
  const addTag = (tag:string) => {
    let tags = [...data];
    if (!tags.includes(tag)) tags.push(tag);
    setData(tags);
    update('tags', tags);
  }
  const actionArray = availableTags.map(tag => ({ 
      content: tag,
      onAction: () => { addTag(tag); toggleTagDropdownActive();  },
      disabled: data.includes(tag),
    }));
    return actionArray;
  }

  const removeTag = (tag: string) => () => {
    let tags = [...data];
    tags = tags.filter((previousTag) => previousTag !== tag);
    setData(tags);
    update('tags', tags);
  };

  const tagMarkup = data.map((tag) => (
    <Box>
      <Tag onRemove={removeTag(tag)}>
        <Box padding="100">
          <InlineStack gap="100">
            <Icon source={ProductFilledIcon} />
            {tag}
          </InlineStack>
        </Box>
      </Tag>
    </Box>
  ));
  
  return (
    <Card>
      <BlockStack gap="200">
        <InlineStack align="space-between">
          <BlockStack gap="100">
            <Text as="h4" variant="headingMd">Tags</Text>
            <Text as="p" variant="bodySm" tone="subdued">Add tags to help filter your location</Text>
          </BlockStack>
          <InlineStack gap="100" blockAlign="center">
            <Popover
              active={tagDropdownActive}
              activator={tagDropdownActiveActivator}
              autofocusTarget="first-node"
              onClose={toggleTagDropdownActive}
            >
              <ActionList
                actionRole="menuitem"
                items={actionList()}
              />
            </Popover>
          </InlineStack>
        </InlineStack>
        
        <InlineStack gap="200">
          {tagMarkup}
        </InlineStack>
        
      </BlockStack>
    </Card>
  );
}
