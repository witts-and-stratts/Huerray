import { z } from 'zod/v4';

export type CreatorBankMessages = {
  bankNameRequired: string;
  bankAccountNameRequired: string;
  bankAccountNumberRequired: string;
  bankRoutingNumberRequired: string;
  taxIdRequired: string;
  taxCountryRequired: string;
};

export const getCreatorBankSchema = ( messages: CreatorBankMessages ) => z.object( {
  bankName: z.string().trim().min( 1, messages.bankNameRequired ),
  bankAccountNumber: z.string().trim().min( 1, messages.bankAccountNumberRequired ),
  bankRoutingNumber: z.string().trim().min( 1, messages.bankRoutingNumberRequired ),
  taxId: z.string().trim().min( 1, messages.taxIdRequired ),
  taxCountry: z.string().trim().min( 1, messages.taxCountryRequired ),
  bankAccountName: z.string().trim().min( 1, messages.bankAccountNameRequired ),
  bankAddress: z.string(),
} );

export const creatorBankSchema = getCreatorBankSchema( {
  bankNameRequired: 'Bank name is required',
  bankAccountNameRequired: 'Account holder name is required',
  bankAccountNumberRequired: 'Account number is required',
  bankRoutingNumberRequired: 'Routing number or SWIFT code is required',
  taxIdRequired: 'Tax ID is required',
  taxCountryRequired: 'Tax country is required',
} );

export type CreatorBankSettings = z.infer<typeof creatorBankSchema>;
