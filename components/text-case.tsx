

export function TextCapitalize( { children }: { children: string; } ) {
  const words = children.split( ' ' );
  const capitalizedWords = words.map( ( word ) => word.charAt( 0 ).toUpperCase() + word.slice( 1 ) );
  return <>{ capitalizedWords.join( ' ' ) }</>;
}

export function SentenceCase( { children }: { children: string; } ) {
  if ( !children ) return null;
  // Break text into sentences and capitalize each sentence
  const sentences = children.split( '. ' );
  const sentecedCase = sentences.map( ( sentence ) => sentence.charAt( 0 ).toUpperCase() + sentence.slice( 1 ) ).join( '. ' );
  return <>{ sentecedCase }</>;
}