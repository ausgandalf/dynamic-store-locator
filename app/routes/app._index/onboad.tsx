import {useCallback, useState} from 'react';
import {
  Text,
  Card,
  Button,
  ButtonGroup,
  BlockStack,
  Box,
  InlineStack,
  Icon,
  RadioButton,
  Collapsible,
} from "@shopify/polaris";

import {
  IncentiveIcon,
  CaretUpIcon,
  CaretDownIcon,
} from '@shopify/polaris-icons';

import { TodoChecker } from 'app/components/TodoChecker';
import { sleep } from 'app/components/Functions';
import { describe } from 'node:test';

export function Onboard() {
  const taskStatusDefault = {
    google: 0,
    faire: 0,
    b2b: 0,
    retailers: 0,
    manual: 0,
    filters: 0,
    designs: 0,
    review: 0,
    locations: 0,
    install: 0,
    embed:0,
  };

  const [activeStep, setActiveStep] = useState(0);
  const [taskStatus, setTaskStatus] = useState(taskStatusDefault);

  const updateTaskStatus = async (key:string, status:number) => {
    setTaskStatus({...taskStatus, [key]: 2});
    await sleep(1000);
    setTaskStatus({...taskStatus, [key]: status});
  }

  const handleStepToggleClick = useCallback(
    (index: number) => {
      // setActiveStep((activeStep === index) ? -1 : index);
      if (activeStep === index) return;
      setActiveStep(index);
    },
    [activeStep],
  );

  const collapsibleTogglerClassName = (index: number) => {
    return activeStep === index ? 'open' : '';
  };
  const collapsibleToggler = (index: number, title: string, buttonClass: string = '') => {
    return (
      <button onClick={() => handleStepToggleClick(index)} className={buttonClass + " toggler " + collapsibleTogglerClassName(index)}>
        <InlineStack as="span" wrap={false} align="space-between">
          <Text as="h4" variant="bodyMd">{title}</Text>
          <Box width='20px'>
            <Icon source={activeStep === index ? CaretUpIcon : CaretDownIcon}></Icon>
          </Box>
        </InlineStack>
      </button>
    )
  };

  const collapsibleContentRenderer = (index: number) => {
    return (
      <Collapsible
        open={activeStep == index}
        id={`step${index}-collapsible`}
        transition={{duration: '500ms', timingFunction: 'ease-in-out'}}
        expandOnPrint
      >
        <Box padding="200">
          <BlockStack gap="200">
            <Box borderRadius="300" background="bg-surface-active" padding="200">
              <BlockStack gap="100">
                <RadioButton
                  label="Completed Action"
                  helpText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pretium sem magna, vitae bibendum sem porttitor ut."
                  id={`step${index}-option0`}
                  name={`step${index}-option0`}
                  checked={true}
                  onChange={() => {}}
                />
                <InlineStack>
                  <ButtonGroup>
                    <Button onClick={() => {}} accessibilityLabel="Primary Primary Button">Primary Button</Button>
                    <Button variant="secondary" onClick={() => {}} accessibilityLabel="Secondary Button">Secondary Button</Button>
                  </ButtonGroup>
                </InlineStack>
              </BlockStack>
            </Box>

            <Box borderRadius="300" background="bg-surface-active" padding="200">
              <BlockStack gap="100">
                <RadioButton
                  label="Currently Working On This Action"
                  helpText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pretium sem magna, vitae bibendum sem porttitor ut."
                  id={`step${index}-option1`}
                  name={`step${index}-option1`}
                  onChange={() => {}}
                />
                <InlineStack>
                  <ButtonGroup>
                    <Button onClick={() => {}} accessibilityLabel="Open Live Chat">Open Live Chat</Button>
                    <Button variant="secondary" onClick={() => {}} accessibilityLabel="Secondary Button">Secondary Button</Button>
                  </ButtonGroup>
                </InlineStack>
              </BlockStack>
            </Box>

            <Box borderRadius="300" padding="200">
              <BlockStack gap="100">
                <RadioButton
                  label="Next Action In The Process"
                  helpText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pretium sem magna, vitae bibendum sem porttitor ut."
                  id={`step${index}-option2`}
                  name={`step${index}-option2`}
                  onChange={() => {}}
                />
              </BlockStack>
            </Box>

          </BlockStack>
        </Box>
      </Collapsible>
    )
  };

  const collapsibleContentRendererWithChild = (index: number, child) => {
    return (
      <Collapsible
        open={activeStep == index}
        id={`step${index}-collapsible`}
        transition={{duration: '500ms', timingFunction: 'ease-in-out'}}
        expandOnPrint
      >
        <Box padding="200">
          {child}
        </Box>
      </Collapsible>
    )
  };

  const step0Tasks = [
    {
      key: 'google',
      title: 'Google Maps',
      description: 'This app requires a Google Maps API Key in order to work correctly. Once you have your API Key, paste it in the Google Maps section on the Integrations Tab. If you need assistance setting up an API click, click the help article below.',
      buttons: (
        <ButtonGroup>
          <Button onClick={() => {}} >Input API Key</Button>
          <Button variant="secondary" onClick={() => {}}>API Key Setup Guide</Button>
        </ButtonGroup>
      ),
    },
    {
      key: 'faire',
      title: 'Faire',
      description: 'If you have a Faire account you want to connect, click below to navigate to the Integrations tab to input your Faire API Keys. Enable the integration and set your sync settings, then click the ‘Re-Sync Faire’ button to trigger the initial sync. If you need help finding your Faire API Key, click the help button below.',
      buttons: (
        <ButtonGroup>
          <Button onClick={() => {}} >Input API Key</Button>
          <Button variant="secondary" onClick={() => {}}>Find Faire API Key</Button>
        </ButtonGroup>
      ),
    },
    {
      key: 'b2b',
      title: 'Shopify B2B',
      description: 'If you have Shopify B2B activated on this store, or are using it on an expansion store, the app can be configured to automatically pull Company locations to display on your map. Navigate to the Integrations tab to sync your Shopify B2B customers to your map. If you are using B2B in an expansion store, you must generate an API key within that store first.',
      buttons: (
        <ButtonGroup>
          <Button url='integrations'>Go to Integrations</Button>
          <Button variant="secondary" onClick={() => {}}>Generate Shopify API Key</Button>
        </ButtonGroup>
      ),
    },
    {
      key: 'retailers',
      title: 'National Retailers',
      description: 'If you sell your products in any national retailers, you can activate those locations to also display on your map. Those locations will be automatically updated for you if the integration is toggled on. We are actively adding new retailers upon request. If you do not see a national retailer that you’d like added, please request it below.',
      buttons: (
        <ButtonGroup>
          <Button url='integrations'>Go to Integrations</Button>
          <Button variant="secondary" onClick={() => {}}>Request a Retailer</Button>
        </ButtonGroup>
      ),
    },
    {
      key: 'manual',
      title: 'Manual Upload',
      description: 'If you have a list of retailers you’d prefer to manually upload, download our CSV file template by clicking the button below. After you input your data into the required template, navigate to the ‘All Locations’ tab and click ‘Bulk Upload’ and upload your file from there.',
      buttons: (
        <ButtonGroup>
          <Button onClick={() => {}} >Bulk Upload Template</Button>
          <Button variant="secondary" url='locations'>All Locations</Button>
        </ButtonGroup>
      ),
    }
  ];
  
  const step1Tasks = [
    {
      key: 'filters',
      title: 'Setup Search Filters',
      description: 'After you have all your location data imported into the app, next setup your search filters. Go to settings > search filters and add in helpful filters that will allow your customers to easily find the locations they are looking for.',
      buttons: (
        <ButtonGroup>
          <Button onClick={() => {}} >Set up Search Filters</Button>
        </ButtonGroup>
      ),
    },
    {
      key: 'designs',
      title: 'Select Map Design Options',
      description: 'In the Map Designer tab, you can select your primary map colors and fonts and determine your map size and load location. You can also set a universal map marker and style your popup to make it easier to create a cohesive looking map for all locations.',
      buttons: (
        <ButtonGroup>
          <Button url='design'>Go to Map Designer</Button>
        </ButtonGroup>
      ),
    },
  ];

  const step2Tasks = [
    {
      key: 'review',
      title: 'Review Synced Locations',
      description: 'In the All Locations table, review the data that has been synced through 3rd party integrations and hide certain locations or bulk update the tags for better search and filtering on your map. ',
      buttons: (
        <ButtonGroup>
          <Button url='locations'>View All Locations</Button>
        </ButtonGroup>
      ),
    },
    {
      key: 'locations',
      title: 'Update Individual Locations',
      description: 'Click into individual locations to add to or update any imported or synced data to ensure your store locator is as accurate as possible, or review how a location will look on your live site.',
      buttons: (
        <ButtonGroup>
          <Button url='locations'>View All Locations</Button>
        </ButtonGroup>
      ),
    },
  ];

  const step3Tasks = [
    {
      key: 'install',
      title: 'Install the Map Using App Blocks',
      description: 'You can place your map through the Shopify CMS by going to ‘Online Store’ and then click ‘Customize’ next to the theme where you want to install the map. Click ‘Add Section’ and select the H1 Dynamic Store Locator app from the app options.',
      buttons: (
        <ButtonGroup>
          <Button onClick={() => {}} >Open Shopify CMS</Button>
        </ButtonGroup>
      ),
    },
    {
      key: 'embed',
      title: 'Install the Map Using an Embed Code ',
      description: 'Go to settings > installation to access the embed code for your map. Once you copy the code, you can paste it into any page on your site.',
      buttons: (
        <ButtonGroup>
          <Button onClick={() => {}} >Find Embed Code</Button>
        </ButtonGroup>
      ),
    },
  ];

  const renderTaskListBlock = (tasks : []) => {
    return tasks.map((x, i) => (
      <Box borderRadius="300" padding="200">
        <BlockStack gap="100">
          <InlineStack gap="100" wrap={false}>
            <Box minWidth='20px' paddingBlockStart="025">
              <TodoChecker 
                state={taskStatus[x.key]} 
                key={'task-status-' + x.key + '-' + taskStatus[x.key]} 
                onComplete={() => {updateTaskStatus(x.key, 1);}} 
                onIncomplete={() => {updateTaskStatus(x.key, 0);}} 
              />
            </Box>
            <BlockStack gap="200">
              <Text as='h6' variant='bodyMd' fontWeight='medium'>{x.title}</Text>
              <Text as='p' variant='bodyMd'>{x.description}</Text>
              {x.buttons}
            </BlockStack>
          </InlineStack>
        </BlockStack>
      </Box>
    ));
  }

  return (
    <Card>
      <BlockStack gap="400">
        
        <InlineStack wrap={false} align="start" gap="200">
          <Box width="20px">
            <Icon source={IncentiveIcon}/>
          </Box>
          <BlockStack gap="100">
            <Text as="h2" variant="headingLg">Getting Started with H1: Dynamic Store Locator</Text>
            <Text as="p">A step-by-step guide to configuring the app to suit your business needs.</Text>
          </BlockStack>
        </InlineStack>
        
        <BlockStack>
          
          { collapsibleToggler(0, "Setup Locations & Integrations") }
          { collapsibleContentRendererWithChild(0, (
            <BlockStack gap="200">
              {renderTaskListBlock(step0Tasks)}
            </BlockStack>
          )) }
          
        
          { collapsibleToggler(1, "Design Your Map") }
          { collapsibleContentRendererWithChild(1, (
            <BlockStack gap="200">
              {renderTaskListBlock(step1Tasks)}
            </BlockStack>
          )) }
        
          { collapsibleToggler(2, "Manage Your Locations") }
          { collapsibleContentRendererWithChild(2, (
            <BlockStack gap="200">
              {renderTaskListBlock(step2Tasks)}
            </BlockStack>
          )) }
        
          { collapsibleToggler(3, "Add Your Map To Your Store", "last") }
          { collapsibleContentRendererWithChild(3, (
            <BlockStack gap="200">
              {renderTaskListBlock(step3Tasks)}
            </BlockStack>
          )) }
        </BlockStack>

      </BlockStack>
    </Card>
  );
}
