import { useTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';

export const Content = ({ points, className }) => {
  const { t } = useTranslation();
  return (
    <div className={className.content}>
      <List disablePadding className={className.list}>
        {points.map((point, idx) => (
          <div key={uuid()} className={className.block}>
            <p className={className.bullet}>{`${idx + 1}.`}&nbsp;</p>
            <ListItem className={className.listItem}>
              <ListItemText primary={point} />
            </ListItem>
          </div>
        ))}
      </List>
      <p className={className.done}>{t('done')}</p>
    </div>
  );
};
