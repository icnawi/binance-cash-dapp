// const styles = {
//   row: {
//     display: 'flex',
//     marginLeft: '-.75rem',
//     marginRight: '-.75rem',
//     marginTop: '-.75rem',
//     '&:last-child': {
//       marginBottom: '-.75rem',
//     },
//   },
// };

export const Row = ({ classNames, children, isHeader }) => {
  return isHeader ? (
    <div className={classNames.row}>{children}</div>
  ) : (
    <div className={cn(classNames.row, classNames.txBox)}>{children}</div>
  );
};
