interface TextListItemProps {
  text: string;
}

export function TextListItem( { text }: TextListItemProps ) {
  return (
    <li className='section-card__list-item'>
      <span className='section-card__list-icon icon-check' />
      <span className='section-card__list-text'>
        { text }
      </span>
    </li>
  );
}