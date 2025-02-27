import {useState, useCallback, ReactNode} from 'react';
import {
  Box,
  Button,
  BlockStack,
  ActionList,
  Popover,
  OptionList,
  InlineStack,
  Spinner,
  Tooltip,
} from "@shopify/polaris";

import { OptionDescriptor } from '@shopify/polaris/build/ts/src/types';

import { IconDottedCircle, IconLinedCircle, IconCircledCheck } from 'app/res/icons';

interface TodoCheckerProps {
    state: number, // 0: init, 1: done, 2: loading,
    onComplete?: Function,
    onIncomplete?: Function,
}

const defaultTodoCheckerProps = {
    state: 0,
    onComplete: () => {},
    onIncomplete: () => {},
}

export const TodoChecker = ( defaultTodoCheckerProps : TodoCheckerProps ) => {
    const {state, onComplete, onIncomplete} = defaultTodoCheckerProps;
    const [status, setStatus] = useState(state);
    
    return (
        <InlineStack>
            {(status == 0) && (
                <Tooltip content="Mark as done">
                    <Button variant='plain' onClick={() => onComplete()}>
                        <span className='hoverWrapper'>
                            <span className='normal'><IconDottedCircle /></span>
                            <span className='hover'><IconLinedCircle /></span>
                        </span>
                    </Button>
                </Tooltip>
            )}

            {(status == 1) && (
                <Tooltip content="Mark as not done">
                    <Button variant='plain' onClick={() => onIncomplete()}>
                        <span className='hoverWrapper'>
                            <span className='normal'><IconCircledCheck /></span>
                            <span className='hover'><IconCircledCheck color2='#ccc' /></span>
                        </span>
                    </Button>
                </Tooltip>
            )}

            {(status == 2) && (
                <Box><Spinner accessibilityLabel="Processing..." size="small" /></Box>
            )}
        </InlineStack>
    )
}