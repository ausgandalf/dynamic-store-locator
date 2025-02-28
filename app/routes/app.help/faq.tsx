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
  items?: number,
}

const defaultProps: FaqProps = {
  items: 7,
}


export const Faq = (props : FaqProps) => {
  props = {...defaultProps, ...props}

  const [activeStep, setActiveStep] = useState(1);
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
  const collapsibleToggler = (index: number, title: string, buttonClass: string = '') => {
    return (
      <button 
        onClick={() => handleStepToggleClick(index)} 
        className={buttonClass + " toggler toggler--faq " + collapsibleTogglerClassName(index)} 
        style={{textAlign: 'left'}}
      >
        <InlineStack as="span" wrap={false} align="space-between">
          <div style={{width: 'calc(100% - 20px)'}}>
            <Text as="h4" variant="bodyMd" fontWeight="semibold">{title}</Text>
            <Collapsible
              open={activeStep == index}
              id={`step${index}-collapsible`}
              transition={{duration: '500ms', timingFunction: 'ease-in-out'}}
              expandOnPrint
            >
              <Text as="p" variant="bodyMd">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eleifend lorem malesuada mauris volutpat, in cursus eros faucibus. Nullam urna lorem, vestibulum vel ullamcorper vitae, finibus a nisl. Donec faucibus turpis nisi.</Text>
              <Text as="p" variant="bodyMd">Sed non hendrerit neque, at rhoncus magna. Vivamus risus nunc, accumsan et pulvinar eu, pellentesque vitae lacus. Vestibulum augue erat, luctus eu placerat in, rhoncus id enim. Fusce vitae posuere eros. Donec egestas massa eget viverra luctus. Donec eu rutrum metus. Ut posuere scelerisque leo vel condimentum. Nunc iaculis at leo ut dapibus. Curabitur et pretium nibh. Etiam sem quam, laoreet eget turpis nec, varius hendrerit ante.</Text>
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

          {[...Array(props.items)].map((x, i) => 
            <BlockStack key={'faq-' + i}>
              { collapsibleToggler(i, "How do I update information about a specific location?") }
            </BlockStack>
          )}
          
        </BlockStack>

      </BlockStack>
    </Card>
  );
}