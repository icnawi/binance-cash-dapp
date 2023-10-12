export const Row = ({ classNames, children, isHeader }) => {
  return isHeader ? (
    <div className={classNames.row}>{children}</div>
  ) : (
    <div className={cn(classNames.row, classNames.txBox)}>{children}</div>
  );
};
