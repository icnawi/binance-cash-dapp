import { useStyles } from './Column.styles';

export const Column = ({ className, children }) => {
  const classes = useStyles();
  return <div className={cn(classes.cell, className)}>{children}</div>;
};
