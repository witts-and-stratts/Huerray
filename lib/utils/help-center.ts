import { UtilsNotificationEntityType, UtilsPriority } from '@/lib/api/generated/models';

export type HelpRole = 'admin' | 'brand' | 'creator';

export const NO_RELATED_ENTITY_TYPE = 'none';

export const priorityOptions = [
  { value: UtilsPriority.PriorityLow, label: 'Low' },
  { value: UtilsPriority.PriorityNormal, label: 'Normal' },
  { value: UtilsPriority.PriorityHigh, label: 'High' },
  { value: UtilsPriority.PriorityUrgent, label: 'Urgent' },
];

export const allowedRelatedEntityTypesByRole: Record<HelpRole, UtilsNotificationEntityType[]> = {
  admin: Object.values( UtilsNotificationEntityType ),
  brand: Object.values( UtilsNotificationEntityType ).filter(
    ( value ) =>
      value !== UtilsNotificationEntityType.EntityUser &&
      value !== UtilsNotificationEntityType.EntityBrand &&
      value !== UtilsNotificationEntityType.EntityCase &&
      value !== UtilsNotificationEntityType.EntityPayment
  ),
  creator: Object.values( UtilsNotificationEntityType ).filter(
    ( value ) =>
      value !== UtilsNotificationEntityType.EntityUser &&
      value !== UtilsNotificationEntityType.EntityCreator &&
      value !== UtilsNotificationEntityType.EntityCampaign &&
      value !== UtilsNotificationEntityType.EntityCase &&
      value !== UtilsNotificationEntityType.EntityInvoice
  ),
};

export function getEntityLabel( value: UtilsNotificationEntityType ) {
  return value === UtilsNotificationEntityType.EntityVideoSubmission ? 'Video Submission' : value;
}

export function getFieldValue( entity: Record<string, unknown>, keys: string[] ) {
  for ( const key of keys ) {
    const value = entity[ key ];
    if ( typeof value === 'string' && value.trim() ) return value.trim();
    if ( typeof value === 'number' ) return String( value );
  }

  return '';
}

export function unwrapEntityResponse( response: unknown ) {
  if ( response && typeof response === 'object' && 'data' in response ) {
    return ( response as { data?: unknown; } ).data;
  }

  return response;
}

export function getRelatedEntitySummary( entity: unknown, fallbackId: string ) {
  const record = ( entity ?? {} ) as Record<string, unknown>;
  const user = ( record.user && typeof record.user === 'object' ? record.user : {} ) as Record<string, unknown>;
  const creator = ( record.creator && typeof record.creator === 'object' ? record.creator : {} ) as Record<string, unknown>;
  const firstName = getFieldValue( record, [ 'first_name' ] ) || getFieldValue( user, [ 'first_name' ] );
  const lastName = getFieldValue( record, [ 'last_name' ] ) || getFieldValue( user, [ 'last_name' ] );
  const creatorName = [
    getFieldValue( creator, [ 'first_name' ] ),
    getFieldValue( creator, [ 'last_name' ] ),
  ].filter( Boolean ).join( ' ' );
  const personName = [ firstName, lastName ].filter( Boolean ).join( ' ' );
  const title = getFieldValue( record, [
    'title',
    'campaign_name',
    'company_name',
    'brand_name',
    'invoice_number',
    'reference',
    'payment_id',
    'case_number',
    'video_filename',
    'username',
    'creator_name',
    'email',
  ] ) || personName || creatorName || fallbackId;
  const subtitle = getFieldValue( record, [
    'description',
    'company_description',
    'brand_name',
    'campaign_name',
    'creator_name',
    'email',
    'preferred_contact_email',
    'notes',
  ] ) || getFieldValue( user, [ 'email' ] ) || getFieldValue( creator, [ 'email' ] );
  const status = getFieldValue( record, [
    'status',
    'user_status',
    'creator_status',
    'brand_status',
    'campaign_status',
    'gig_status',
    'invoice_status',
    'payment_status',
  ] );

  return {
    title,
    subtitle,
    status,
    id: getFieldValue( record, [ 'id', 'brand_id', 'creator_id', 'campaign_id', 'payment_id', 'invoice_id' ] ) || fallbackId,
  };
}

export function getInitials( name?: string ) {
  if ( !name ) return '?';
  return name.split( ' ' ).map( word => word[ 0 ] ).join( '' ).toUpperCase().slice( 0, 2 );
}
