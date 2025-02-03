import PropTypes from 'prop-types';
import { ReactNode } from 'react';

const badgeStyle = (tone?: string) => {
  const defaultStyles = {
    display: "inline-flex",
    alignItems: "center",
    padding: "var(--p-space-050) var(--p-space-200)",
    backgroundColor: "var(--p-color-bg-fill-transparent-secondary)",
    borderRadius: "var(--p-border-radius-200)",
    color: "var(--p-color-text-secondary)",
    fontWeight: "var(--p-font-weight-medium)",
  };

  let overides = {};
  switch(tone) {
    case 'black':
      overides = {
        backgroundColor: '#303030',
        color: '#FFFFFF'
      };
      break;
    case  'blue':
      overides = {
        backgroundColor: '#005BD3',
        color: '#FFFFFF'
      };
      break;
    case 'purple':
      overides = {
        backgroundColor: '#8051FF',
        color: '#FFFFFF'
      };
      break;
    default:
      break;
  }
  
  return {...defaultStyles, ...overides};
}


interface BadgeProps {
  tone?: string,
  children?: ReactNode,
};

const HBadge = ({tone, children} : BadgeProps) => {
  return(
    <span
      style={badgeStyle(tone)}
    >
      <span className="Polaris-Text--root Polaris-Text--bodySm">{children}</span>
    </span>
  )
}

HBadge.propTypes = {
  tone: PropTypes.string,
  children: PropTypes.node,
};

HBadge.defaultProps = {
  tone: 'black',
};

export default HBadge;