import { TextListItem } from './TextListItem';

interface TextListProps {
  list: Array<string>;
}

export function TextList( { list }: TextListProps ) {
  return (
    <ul className="section-card__list">
      { list.map( ( text, index ) => <TextListItem key={ index } text={ text } /> ) }
    </ul>
  );
}