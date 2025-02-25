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


export function Onboard() {
  
  const [activeStep, setActiveStep] = useState(0);
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
          { collapsibleContentRendererWithChild(0, (<BlockStack gap="200">
            <Box borderRadius="300" background="bg-surface-active" padding="200">
              <BlockStack gap="100">
                <RadioButton
                  label="Google Maps"
                  helpText="This app requires a Google Maps API Key in order to work correctly. Once you have your API Key, paste it in the Google Maps section on the Integrations Tab. If you need assistance setting up an API click, click the help article below."
                  id={`step${0}-option0`}
                  name={`step${0}-option0`}
                  checked={true}
                  onChange={() => {}}
                />
                <Box paddingInlineStart="600">
                  <ButtonGroup>
                    <Button onClick={() => {}} >Input API Key</Button>
                    <Button variant="secondary" onClick={() => {}}>API Key Setup Guide</Button>
                  </ButtonGroup>
                </Box>
              </BlockStack>
            </Box>

            <Box borderRadius="300" background="bg-surface-active" padding="200">
              <BlockStack gap="100">
                <RadioButton
                  label="Faire"
                  helpText="If you have a Faire account you want to connect, click below to navigate to the Integrations tab to input your Faire API Keys. Enable the integration and set your sync settings, then click the ‘Re-Sync Faire’ button to trigger the initial sync. If you need help finding your Faire API Key, click the help button below."
                  id={`step${0}-option1`}
                  name={`step${0}-option1`}
                  onChange={() => {}}
                />
                <Box paddingInlineStart="600">
                  <ButtonGroup>
                    <Button onClick={() => {}} >Input API Key</Button>
                    <Button variant="secondary" onClick={() => {}}>Find Faire API Key</Button>
                  </ButtonGroup>
                </Box>
              </BlockStack>
            </Box>

            <Box borderRadius="300" padding="200">
              <BlockStack gap="100">
                <RadioButton
                  label="Shopify B2B"
                  helpText="If you have Shopify B2B activated on this store, or are using it on an expansion store, the app can be configured to automatically pull Company locations to display on your map. Navigate to the Integrations tab to sync your Shopify B2B customers to your map. If you are using B2B in an expansion store, you must generate an API key within that store first."
                  id={`step${0}-option1`}
                  name={`step${0}-option2`}
                  onChange={() => {}}
                />
                <Box paddingInlineStart="600">
                  <ButtonGroup>
                    <Button onClick={() => {}} >Go to Integrations</Button>
                    <Button variant="secondary" onClick={() => {}}>Generate Shopify API Key</Button>
                  </ButtonGroup>
                </Box>
              </BlockStack>
            </Box>

            <Box borderRadius="300" padding="200">
              <BlockStack gap="100">
                <RadioButton
                  label="National Retailers"
                  helpText="If you sell your products in any national retailers, you can activate those locations to also display on your map. Those locations will be automatically updated for you if the integration is toggled on. We are actively adding new retailers upon request. If you do not see a national retailer that you’d like added, please request it below."
                  id={`step${0}-option3`}
                  name={`step${0}-option1`}
                  onChange={() => {}}
                />
                <Box paddingInlineStart="600">
                  <ButtonGroup>
                    <Button onClick={() => {}} >Go to Integrations</Button>
                    <Button variant="secondary" onClick={() => {}}>Request a Retailer</Button>
                  </ButtonGroup>
                </Box>
              </BlockStack>
            </Box>

            <Box borderRadius="300" padding="200">
              <BlockStack gap="100">
                <RadioButton
                  label="Manual Upload"
                  helpText="If you have a list of retailers you’d prefer to manually upload, download our CSV file template by clicking the button below. After you input your data into the required template, navigate to the ‘All Locations’ tab and click ‘Bulk Upload’ and upload your file from there."
                  id={`step${0}-option3`}
                  name={`step${0}-option1`}
                  onChange={() => {}}
                />
                <Box paddingInlineStart="600">
                  <ButtonGroup>
                    <Button onClick={() => {}} >Bulk Upload Template</Button>
                    <Button variant="secondary" url='locations'>All Locations</Button>
                  </ButtonGroup>
                </Box>
              </BlockStack>
            </Box>

          </BlockStack>)) }
          
        
          { collapsibleToggler(1, "Integrate Account to Gather Locations") }
          { collapsibleContentRenderer(1) }
        
          { collapsibleToggler(2, "Customize Your Map") }
          { collapsibleContentRenderer(2) }
        
          { collapsibleToggler(3, "Connect & Embed", "last") }
          { collapsibleContentRenderer(3) }
        </BlockStack>

      </BlockStack>
    </Card>
  );
}
