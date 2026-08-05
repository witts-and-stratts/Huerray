import { Box, Button, Flex, Stack, Tab, TabList, Text, Tooltip, useToast } from '@sanity/ui';
import { TranslateIcon } from '@sanity/icons';
import { useCallback, useState } from 'react';
import { ObjectInputProps, set } from 'sanity';
import { supportedLanguages } from '../schemaTypes/localizedTypes';

const API_URL = 'https://backend.huerray.de/api/v1/translation/translate';

export function TranslationInput( props: ObjectInputProps ) {
  const { onChange, value, renderField } = props;
  const [ isTranslating, setIsTranslating ] = useState( false );
  const [ activeTab, setActiveTab ] = useState( 'en' );
  const toast = useToast();

  const handleTranslate = useCallback( async () => {
    const sourceText = ( value as any )?.en;
    if ( !sourceText ) {
      toast.push( {
        title: 'Source text missing',
        description: 'Please enter English text first.',
        status: 'warning',
      } );
      return;
    }

    setIsTranslating( true );
    const targetLangs = supportedLanguages.filter(l => !l.isDefault).map(l => l.id);

    try {
      for ( const lang of targetLangs ) {
        let result: any;

        if ( typeof sourceText === 'string' ) {
          const response = await fetch( API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( {
              source_lang: 'EN',
              target_lang: lang.toUpperCase(),
              text: [ sourceText ],
            } ),
          } );
          if ( !response.ok ) throw new Error( `API error: ${ response.statusText }` );
          const data = await response.json();
          result = data?.data?.translations?.[ 0 ]?.text || data?.translations?.[ 0 ]?.text;
        } else if ( Array.isArray( sourceText ) ) {
          // Handle block content
          const blocks = JSON.parse( JSON.stringify( sourceText ) );
          const textsToTranslate: string[] = [];

          blocks.forEach( ( block: any ) => {
            if ( block._type === 'block' && block.children ) {
              block.children.forEach( ( child: any ) => {
                if ( child._type === 'span' && child.text ) {
                  textsToTranslate.push( child.text );
                }
              } );
            }
          } );

          if ( textsToTranslate.length > 0 ) {
            const response = await fetch( API_URL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify( {
                source_lang: 'EN',
                target_lang: lang.toUpperCase(),
                text: textsToTranslate,
              } ),
            } );
            if ( !response.ok ) throw new Error( `API error: ${ response.statusText }` );
            const data = await response.json();
            const translations = data?.data?.translations || data?.translations;

            let index = 0;
            blocks.forEach( ( block: any ) => {
              if ( block._type === 'block' && block.children ) {
                block.children.forEach( ( child: any ) => {
                  if ( child._type === 'span' && child.text ) {
                    child.text = translations[ index++ ]?.text || child.text;
                  }
                } );
              }
            } );
          }
          result = blocks;
        }

        if ( result ) {
          onChange( set( result, [ lang ] ) );
        }
      }

      toast.push( {
        title: 'Translation complete',
        status: 'success',
      } );
    } catch ( error: any ) {
      console.error( 'Translation failed:', error );
      toast.push( {
        title: 'Translation failed',
        description: error.message,
        status: 'error',
      } );
    } finally {
      setIsTranslating( false );
    }
  }, [ value, onChange, toast ] );

  const customRenderField = useCallback(
    (fieldProps: any) => {
      const fieldName = fieldProps?.name;

      // `renderField` is inherited by every nested field in the form tree (e.g. the
      // fields inside a Video Embed / Callout / CTA block in the Portable Text editor).
      // Only the language fields owned by *this* input may be filtered by the tab —
      // everything deeper must fall through to the default renderer, otherwise those
      // nested editors render blank.
      const isLanguageField = supportedLanguages.some((lang) => lang.id === fieldName);
      const isDirectChild =
        Array.isArray(fieldProps?.path) && fieldProps.path.length === (props.path?.length ?? 0) + 1;

      if (!isLanguageField || !isDirectChild) {
        return renderField(fieldProps);
      }

      // Only render the field if it matches the active tab
      if (fieldName !== activeTab) {
        return null;
      }

      // Hide the title since it's already shown in the tab
      const fieldPropsWithNoTitle = { ...fieldProps, title: '' };

      const translateButton = (
        <Tooltip
          content={<Text size={1}>Auto-translate to all languages</Text>}
          padding={2}
          placement="top"
          portal
        >
          <Button
            fontSize={[1, 1, 2]}
            icon={TranslateIcon}
            loading={isTranslating}
            mode="ghost"
            onClick={handleTranslate}
            padding={2}
          />
        </Tooltip>
      );

      if (fieldName === 'en') {
        const isLargeField =
          fieldProps.schemaType.name === 'text' ||
          fieldProps.schemaType.name === 'blockContent' ||
          Array.isArray(fieldProps.value);

        if (isLargeField) {
          return renderField({
            ...fieldPropsWithNoTitle,
            children: (
              <Box style={{ position: 'relative' }}>
                {fieldProps.children}
                <Box
                  style={{
                    position: 'absolute',
                    right: '4px',
                    bottom: '4px',
                    zIndex: 10,
                  }}
                >
                  {translateButton}
                </Box>
              </Box>
            ),
          });
        }

        return renderField({
          ...fieldPropsWithNoTitle,
          children: (
            <Flex align="center" gap={3}>
              <Box flex={1}>{fieldProps.children}</Box>
              {translateButton}
            </Flex>
          ),
        });
      }

      return renderField(fieldPropsWithNoTitle);
    },
    [renderField, handleTranslate, isTranslating, activeTab, props.path]
  );

  return (
    <Stack space={4}>
      <TabList space={1}>
        {supportedLanguages.map((lang) => (
          <Tab
            aria-controls={`${lang.id}-panel`}
            id={`${lang.id}-tab`}
            key={lang.id}
            label={lang.title}
            onClick={() => setActiveTab(lang.id)}
            selected={activeTab === lang.id}
          />
        ))}
      </TabList>
      
      <Box id={`${activeTab}-panel`} role="tabpanel" aria-labelledby={`${activeTab}-tab`}>
        {props.renderDefault({ ...props, renderField: customRenderField })}
      </Box>
    </Stack>
  );
}

