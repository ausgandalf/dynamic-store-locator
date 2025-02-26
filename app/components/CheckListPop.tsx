import {useState, useCallback, ReactNode} from 'react';
import {
  Text,
  Button,
  BlockStack,
  ActionList,
  Popover,
  OptionList,
  InlineStack,
} from "@shopify/polaris";

import { OptionDescriptor } from '@shopify/polaris/build/ts/src/types';

interface CheckListPopProps {
    label: string,
    options: OptionDescriptor[],
    suffix?: ReactNode,
    onChange: Function,
}

export const CheckListPop = ({label, options, onChange, suffix} : CheckListPopProps ) => {

    const [popActive, setPopActive] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);

    const togglePopActive = useCallback(() => setPopActive((active) => !active), []);
    const popActiveActivator = (
        <BlockStack gap="200">
            <a onClick={togglePopActive}>
                <InlineStack wrap={false} gap='050'>
                    <span style={{whiteSpace:"nowrap"}}>{label}</span>
                    {suffix}
                </InlineStack>
            </a>
        </BlockStack>
    );
    
    return (
        <Popover
            active={popActive}
            activator={popActiveActivator}
            autofocusTarget="first-node"
            onClose={togglePopActive}
            >
            <OptionList
                onChange={(selected: string[]) => {setSelected(selected); onChange(selected)}}
                options={options}
                selected={selected}
                allowMultiple
            />
        </Popover>
    )
}