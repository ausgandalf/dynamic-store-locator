import { Link } from "@remix-run/react";
import { NavMenu } from "@shopify/app-bridge-react";

export function Navigation() {
  return (
    <NavMenu>
      <Link to="/app/" rel="home">Home</Link>
      <Link to="/app/locations">All Locations</Link>
      <Link to="/app/design">Map Designer</Link>
      <Link to="/app/integrations">Integrations</Link>
      <Link to="/app/settings">Settings</Link>
      <Link to="/app/help">Help Center</Link>
    </NavMenu>
  )
}