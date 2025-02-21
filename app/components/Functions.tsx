
export const getDateBy = (offset?: string|number|undefined) : Date|any => {
  const type = typeof offset;
  if (['string', 'number', 'undefined'].indexOf(type) === -1) return offset;
  if (typeof offset == 'string') return new Date(offset);
  if (typeof offset == 'string') return new Date(offset);
  let date = new Date();
  if (!offset) return date;
  date.setDate(date.getDate() + offset);
  return date;
}

export const formateDate = (date: string|Date, style: number) : string => {
  if (typeof date == 'string') date = new Date(date);
  switch (style) {
    default:
      return date.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })
      break;
  }
}

export function formatTime(timeString: string) {
  const [hourString, minute] = timeString.split(":");
  const hour = +hourString % 24;
  return (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
}

import { MarkerType } from "app/routes/app.design/defines";
import { IconMarkerDefault, IconMarkerPin, IconMarkerStarred, IconMarkerFlag, IconMarkerBanner, IconMarkerCustom } from 'app/res/icons';

export const renderMarker = (marker:MarkerType, markerStyle?: {}) => {
  switch (marker.preset) {
    case "default":
      return (<IconMarkerDefault color1={marker.color} />);
      break;
    case "pin":
      return (<IconMarkerPin color1={marker.color} />);
      break;
    case "starred":
      return (<IconMarkerStarred color1={marker.color} />);
      break;
    case "flag":
      return (<IconMarkerFlag color1={marker.color} />);
      break;
    case "banner":
      return (<IconMarkerBanner color1={marker.color} />);
      break;
    case "custom":
      if (marker.custom != '') return (<img src={marker.custom} style={markerStyle} />);
    default:
      return (<IconMarkerDefault color1={marker.color} />);
      break;
  }
};