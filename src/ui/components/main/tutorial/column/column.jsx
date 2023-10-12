import { Content } from './content/content.jsx';
import { Title } from './title/title.jsx';

export const Column = ({ header, points, classNames }) => {
  return (
    <>
      <Title className={classNames.title}>{header}</Title>
      <Content className={classNames} points={points} />
    </>
  );
};
