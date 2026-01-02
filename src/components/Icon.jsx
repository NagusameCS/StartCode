// Material Icon component wrapper
// Usage: <Icon name="home" /> or <Icon name="settings" variant="outlined" />

const Icon = ({ name, variant = 'filled', className = '', size, style = {} }) => {
  const iconClass = variant === 'filled' 
    ? 'material-icons' 
    : variant === 'outlined' 
      ? 'material-icons-outlined' 
      : 'material-icons-round';

  const iconStyle = {
    fontSize: size || 'inherit',
    verticalAlign: 'middle',
    ...style
  };

  return (
    <span className={`${iconClass} ${className}`} style={iconStyle}>
      {name}
    </span>
  );
};

export default Icon;
