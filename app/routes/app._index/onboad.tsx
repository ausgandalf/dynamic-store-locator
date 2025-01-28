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
  
  const [activeStep, setActiveStep] = useState(1);
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

  return (
    <Card>
      <BlockStack gap="400">
        
        <InlineStack wrap={false} align="start" gap="200">
          <Box width="20px">
            <Icon source={IncentiveIcon}/>
          </Box>
          <BlockStack gap="100">
            <Text as="h2" variant="headingLg">Getting Started with H1: Dynamic Store Locator</Text>
            <Text as="p">Version 2.1 has updated some key features including new theme options, and more custom pin options.</Text>
          </BlockStack>
        </InlineStack>
        
        <BlockStack>
          { collapsibleToggler(0, "Setup Your Account") }
          { collapsibleContentRenderer(0) }
        
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
