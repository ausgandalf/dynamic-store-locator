import {useState, useCallback} from 'react';
import {
  Layout,
  Card,
  FormLayout,
  Select,
  Box,
} from "@shopify/polaris";

interface LanguageFormProps {
  options: Array<any>,
  value: string,
  updateAction: Function,
}

export function LanguageForm(props: LanguageFormProps) {
  const {options, value, updateAction} = props;

  const handleLangChange = useCallback(
    (newValue:string) => {
      // TODO update language setting
      updateAction(newValue);
    },
    [],
  );

  return (
    <Box paddingBlock="400">
      <Layout>
        <Layout.AnnotatedSection
          id="langSettings"
          title="Change Language"
          description="Change the language of the app. Select the desired language from the dropdown list."
        >
          <Card>
            <FormLayout>
              <Select
                id="lang"
                label="Select Language"
                options={options}
                onChange={handleLangChange}
                value={value}
                requiredIndicator={true}
              />
            </FormLayout>
          </Card>
        </Layout.AnnotatedSection>
      </Layout>
    </Box>
    );
}
