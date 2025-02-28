import React, {useCallback, useState} from 'react';
import {
  Text,
  Card,
  BlockStack,
  Box,
  InlineStack,
  Icon,
  Collapsible,
} from "@shopify/polaris";

import {
  CaretUpIcon,
  CaretDownIcon,
} from '@shopify/polaris-icons';

interface FaqProps {
  items: [],
}

export const Faq = ({items} : FaqProps) => {

  const [activeStep, setActiveStep] = useState(0);
  const handleStepToggleClick = useCallback(
    (index: number) => {
      setActiveStep((activeStep === index) ? -1 : index);
      if (activeStep === index) return;
      setActiveStep(index);
    },
    [activeStep],
  );

  const collapsibleTogglerClassName = (index: number) => {
    return activeStep === index ? 'open' : '';
  };
  const collapsibleToggler = (index: number, title: string, text: string, buttonClass: string = '') => {
    return (
      <button 
        onClick={() => handleStepToggleClick(index)} 
        className={buttonClass + " toggler toggler--faq " + collapsibleTogglerClassName(index)} 
        style={{textAlign: 'left'}}
      >
        <InlineStack as="span" wrap={false} align="space-between">
          <div style={{width: 'calc(100% - 20px)'}}>
            <Text as="h4" variant="bodyMd" fontWeight="semibold">
              <div dangerouslySetInnerHTML={{__html: title}} />
            </Text>
            <Collapsible
              open={activeStep == index}
              id={`step${index}-collapsible`}
              transition={{duration: '500ms', timingFunction: 'ease-in-out'}}
              expandOnPrint
            >
              <Text as="p" variant="bodyMd">
                <div dangerouslySetInnerHTML={{__html: text}} style={{textOverflow:'ellipsis', overflow:'hidden'}} />
              </Text>
            </Collapsible>
          </div>
          <div style={{display:'flex',width: '20px'}}>
            <Icon source={activeStep === index ? CaretUpIcon : CaretDownIcon}></Icon>
          </div>
        </InlineStack>
      </button>
    )
  };

  const collapsibleContentRenderer = (index: number, title: string, description: string) => {
    return (
      <Collapsible
        open={activeStep == index}
        id={`step${index}-collapsible`}
        transition={{duration: '500ms', timingFunction: 'ease-in-out'}}
        expandOnPrint
      >
        <Box padding="200" background='bg-fill-active'>

          <InlineStack as="span" wrap={false} align="space-between">
            <Box>
              <Text as="h4" variant="bodyMd">{title}</Text>
              <Text as="h4" variant="bodyMd">{description}</Text>
            </Box>
            <Box width='20px'>
              <Icon source={activeStep === index ? CaretUpIcon : CaretDownIcon}></Icon>
            </Box>
          </InlineStack>

        </Box>
      </Collapsible>
    )
  };

  return (
    <Card>
      <BlockStack gap="400">
        <Text as="h2" variant="headingLg">Frequently Asked Questions</Text>
        
        <BlockStack>

          {items.map((x, i) => 
            <BlockStack key={'faq-' + i}>
              { collapsibleToggler(i, x.q, x.a) }
            </BlockStack>
          )}
          
        </BlockStack>

      </BlockStack>
    </Card>
  );
}