import { Tag } from '../../types/tag';
import chroma from 'chroma-js';
import styles from './TagBlock.module.css';

interface ITagBlockProps {
  tag: Tag;
}

export const TagBlock = ({ tag }: ITagBlockProps) => {
  return (
    <div
      style={{ backgroundColor: tag.color, color: chroma.contrast(tag.color, 'white') > 2 ? '#eaeaea' : '#4a4a4a' }}
      className={styles.root}
    >
      {tag.name}
    </div>
  );
};
