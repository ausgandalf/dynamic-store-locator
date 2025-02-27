import type { HeadersFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import appStyles from "../app.css?url";

import { authenticate } from "../shopify.server";
import { Navigation } from "app/navs";

import {
  Box,
  Text,
  Link as PolarisLink,
} from "@shopify/polaris";

export const links = () => [
  { rel: "stylesheet", href: polarisStyles },
  { rel: "stylesheet", href: appStyles }
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  return { apiKey: process.env.SHOPIFY_API_KEY || "" };
};

export default function App() {
  const { apiKey } = useLoaderData<typeof loader>();

  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <Navigation />
      <Outlet />
      <Box padding="500">
        <Text as="p" variant="bodyMd" alignment="center">
          ©2025 &nbsp;
          <PolarisLink url="https://www.h1-apps.com/" target="_blank">H1 Web Development</PolarisLink>.
          &nbsp; All Rights Reserved.
        </Text>
      </Box>
    </AppProvider>
  );
}

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};
