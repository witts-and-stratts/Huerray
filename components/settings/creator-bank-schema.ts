import { z } from 'zod/v4';

export type CreatorBankMessages = {
  bankNameRequired: string;
  bankAccountNameRequired: string;
  bankAccountNumberRequired: string;
  bankRoutingNumberRequired: string;
};

export const getCreatorBankSchema = ( messages: CreatorBankMessages ) => z.object( {
  bankName: z.string().trim().min( 1, messages.bankNameRequired ),
  bankAccountNumber: z.string().trim().min( 1, messages.bankAccountNumberRequired ),
  bankRoutingNumber: z.string().trim().min( 1, messages.bankRoutingNumberRequired ),
  taxId: z.string(),
  taxCountry: z.string(),
  bankAccountName: z.string().trim().min( 1, messages.bankAccountNameRequired ),
  bankAddress: z.string(),
} );

export const creatorBankSchema = getCreatorBankSchema( {
  bankNameRequired: 'Bank name is required',
  bankAccountNameRequired: 'Account holder name is required',
  bankAccountNumberRequired: 'Account number is required',
  bankRoutingNumberRequired: 'Routing number or SWIFT code is required',
} );

export type CreatorBankSettings = z.infer<typeof creatorBankSchema>;
