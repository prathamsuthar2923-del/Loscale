import { Link } from 'react-router-dom';

const base =
  'inline-flex items-center justify-center gap-2 font-semibold uppercase tracking-wide text-sm transition-opacity hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed';

const variants = {
  dark: 'bg-black text-white px-6 py-4',
  light: 'bg-white text-black px-6 py-4',
  accent: 'bg-accent text-white px-6 py-4 rounded-full',
  outline: 'border border-black/20 text-black px-6 py-4',
};

export default function Button({ as, to, href, variant = 'dark', className = '', children, ...rest }) {
  const classes = `${base} ${variants[variant] || variants.dark} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  const Component = as || 'button';
  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
}
