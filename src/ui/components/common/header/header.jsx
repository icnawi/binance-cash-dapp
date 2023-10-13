import { Navigation } from './navigation/navigation.jsx';

// const styles = {
//   container: {
//     minHeight: '3.25rem',
//     paddingTop: 20,
//     paddingLeft: '1.5rem',
//     paddingRight: '1.5rem',
//   },
// };

export const Header = () => {
  return (
    <div className={classes.container}>
      <Navigation />
    </div>
  );
};
