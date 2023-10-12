import { useTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';

import { useStyles } from './Tutorial.styles';
import { Column } from './column/column.jsx';

export const Tutorial = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const article = [
    {
      title: t('tutorialPage.article1.title'),
      points: [
        t('tutorialPage.article1.point1'),
        t('tutorialPage.article1.point2'),
        t('tutorialPage.article1.point3'),
        t('tutorialPage.article1.point4'),
        t('tutorialPage.article1.point5'),
        t('tutorialPage.article1.point6'),
        t('tutorialPage.article1.point7'),
      ],
    },
    {
      title: t('tutorialPage.article2.title'),
      points: [
        t('tutorialPage.article2.point1'),
        t('tutorialPage.article2.point2'),
        t('tutorialPage.article2.point3'),
        t('tutorialPage.article2.point4'),
        t('tutorialPage.article2.point5'),
        t('tutorialPage.article2.point6'),
      ],
    },
    {
      title: t('tutorialPage.article3.title'),
      points: [
        t('tutorialPage.article3.point1'),
        t('tutorialPage.article3.point2'),
        t('tutorialPage.article3.point3'),
        t('tutorialPage.article3.point4'),
        t('tutorialPage.article3.point5'),
        t('tutorialPage.article3.point6'),
        t('tutorialPage.article3.point7'),
        t('tutorialPage.article3.point8'),
        t('tutorialPage.article3.point9'),
        t('tutorialPage.article3.point10'),
      ],
    },
  ];

  return (
    <div className={classes.heroContainer}>
      <div className={classes.wrapper}>
        <div className={classes.columns}>
          <div className={cn(classes.column, classes.isHalfDesktop)}>
            {article.map(block => (
              <Column
                key={uuid()}
                header={block.title}
                points={block.points}
                classNames={classes}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
