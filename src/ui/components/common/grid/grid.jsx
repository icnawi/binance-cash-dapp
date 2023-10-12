import { useStyles } from './Grid.styles';

export const Grid = ({ items = [], loading, columnLength = 5 }) => {
  const classes = useStyles();
  const firstColumn = items.slice(0, columnLength);
  const secondColumn = items.slice(columnLength, columnLength * 2);

  const renderItem = (item, index) => {
    return (
      <div key={`grid-${index}`} className={classes.row}>
        {item}
      </div>
    );
  };

  const renderSkeleton = (item, index) => {
    return <Skeleton key={`grid-loading-${index}`} animation="pulse" />;
  };

  return (
    <MuiGrid container spacing={3}>
      <MuiGrid item sm={6}>
        {loading ? Array(columnLength).fill('').map(renderSkeleton) : firstColumn.map(renderItem)}
      </MuiGrid>
      <MuiGrid item sm={6}>
        {loading ? Array(columnLength).fill('').map(renderSkeleton) : secondColumn.map(renderItem)}
      </MuiGrid>
    </MuiGrid>
  );
};
