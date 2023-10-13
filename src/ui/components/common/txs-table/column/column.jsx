// const flexMixin = flex => ({
//   flex,
//   display: 'flex',
//   alignItems: 'center',
//   padding: '.75rem',
// });
//
// const blockMixin = () => ({
//   display: 'block',
//   flex: 'none',
//   padding: '.75rem',
// });
//
// const styles = {
//   cell: {
//     '&.is-time': {
//       width: '15%',
//       '&.is-header': {
//         ...flexMixin('none'),
//       },
//       '&:not(.is-header)': {
//         ...blockMixin(),
//       },
//     },
//     '&.is-amount': {
//       width: '14%',
//       '&.is-header': {
//         ...flexMixin('none'),
//       },
//       '&:not(.is-header)': {
//         ...blockMixin(),
//       },
//     },
//     '&.is-deposit': {
//       width: '14.5%',
//       '&.is-header': {
//         ...flexMixin('none'),
//       },
//       '&:not(.is-header)': {
//         ...blockMixin(),
//       },
//     },
//     '&.is-hash': {
//       width: '12.5%',
//       '&.is-header': {
//         ...flexMixin('1 1 0'),
//       },
//       '&:not(.is-header)': {
//         flex: '1 1 0',
//         display: 'block',
//         padding: '.75rem',
//       },
//     },
//     '&.is-status': {
//       width: '12%',
//       '&.is-header': {
//         ...flexMixin('none'),
//       },
//       '&:not(.is-header)': {
//         ...blockMixin(),
//       },
//     },
//     // '&.is-reward': {
//     // 	alignItems: 'center',
//     // 	display: 'inline-flex',
//     // 	flex: '1 1 0',
//     // 	padding: '.75rem',
//     // 	'&:not(.is-header)': {
//     // 		justifyContent: 'space-between',
//     // 	},
//     // },
//     '&.column-buttons': {
//       width: 145,
//       padding: '.75rem',
//       '&.is-header': {
//         ...flexMixin('none'),
//       },
//       '&:not(.is-header)': {
//         display: 'inline-flex',
//         flex: 'none',
//       },
//     },
//   },
// };
export const Column = ({ className, children }) => {
  return <div className={cn(classes.cell, className)}>{children}</div>;
};
