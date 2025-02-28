import { useState } from "react";
import {
  Card,
  Button,
  Text,
  TextField,
  BlockStack,
} from "@shopify/polaris";
import { ViewIcon, HideIcon } from "@shopify/polaris-icons";

import { OperationHrType, states, socialOptions, days } from "./defines";

interface HrsBlockProps {
  hrs: Array<OperationHrType>,
  update: Function,
}

export function HrsBlock({hrs, update}:HrsBlockProps) {
  const [data, setData] = useState(hrs);
  
  const onUpdate = (day:number, field: string, value:(string|boolean)) => {
    let newData = [...data];
    let dayData = {...newData[day]};
    dayData[field] = value;
    newData[day] = dayData;
    setData(newData);

    update('hrs', newData);
  }

  return (
    <Card>
      <BlockStack gap="200">
        <Text as="h4" variant="headingMd">Hours of Operation</Text>
        
        <table>
          <thead>
            <th></th>
            <th><Text as="span" variant="bodySm">Open</Text></th>
            <th><Text as="span" variant="bodySm">Close</Text></th>
            <th></th>
          </thead>
          <tbody>
          {data.map((x, i) => (
            <tr key={'hr-tr-' + i}>
              <td>{days[i]}</td>
              <td>
                {x.visible ? (
                  <TextField
                    label="Open"
                    labelHidden
                    type="time"
                    value={x.from}
                    onChange={(newValue: string) => onUpdate(i, 'from', newValue)}
                    autoComplete="off"
                  />
                ) : (
                  <TextField
                    label="Open"
                    labelHidden
                    disabled
                    readOnly
                    type="text"
                    value='closed'
                    autoComplete="off"
                  />
                )}
              </td>
              <td>
              {x.visible ? (
                  <TextField
                    label="Close"
                    labelHidden
                    type="time"
                    value={x.to}
                    onChange={(newValue: string) => onUpdate(i, 'to', newValue)}
                    autoComplete="off"
                  />
                ) : (
                  <TextField
                    label="Open"
                    labelHidden
                    disabled
                    readOnly
                    type="text"
                    value='closed'
                    autoComplete="off"
                  />
                )}
              </td>
              <td>
                <Button icon={x.visible ? ViewIcon : HideIcon} accessibilityLabel="Toggle" variant="plain" onClick={() => onUpdate(i, 'visible', !x.visible)}></Button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
        
      </BlockStack>
    </Card>
  );
}
