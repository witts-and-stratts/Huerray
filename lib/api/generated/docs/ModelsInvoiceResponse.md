# ModelsInvoiceResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**brand_city** | **string** |  | [optional] [default to undefined]
**brand_country** | **string** |  | [optional] [default to undefined]
**brand_id** | **string** |  | [optional] [default to undefined]
**brand_name** | **string** |  | [optional] [default to undefined]
**brand_number** | **string** |  | [optional] [default to undefined]
**brand_postal_code** | **string** |  | [optional] [default to undefined]
**brand_street** | **string** |  | [optional] [default to undefined]
**campaign_id** | **string** |  | [optional] [default to undefined]
**campaign_name** | **string** |  | [optional] [default to undefined]
**campaign_number** | **string** |  | [optional] [default to undefined]
**created_at** | **string** |  | [optional] [default to undefined]
**due_date** | **string** |  | [optional] [default to undefined]
**id** | **string** |  | [optional] [default to undefined]
**invoice_id** | **string** |  | [optional] [default to undefined]
**invoice_items** | [**Array&lt;ModelsInvoiceItemResponse&gt;**](ModelsInvoiceItemResponse.md) |  | [optional] [default to undefined]
**invoice_number** | **string** |  | [optional] [default to undefined]
**invoice_status** | **string** |  | [optional] [default to undefined]
**issued_date** | **string** |  | [optional] [default to undefined]
**item_count** | **number** |  | [optional] [default to undefined]
**notes** | **string** |  | [optional] [default to undefined]
**paid_date** | **string** |  | [optional] [default to undefined]
**pdf_path** | **string** |  | [optional] [default to undefined]
**subtotal** | [**ModelsMoney**](ModelsMoney.md) |  | [optional] [default to undefined]
**tax_amount** | [**ModelsMoney**](ModelsMoney.md) |  | [optional] [default to undefined]
**tax_rate** | **number** |  | [optional] [default to undefined]
**total** | [**ModelsMoney**](ModelsMoney.md) |  | [optional] [default to undefined]
**updated_at** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { ModelsInvoiceResponse } from 'huerray-api';

const instance: ModelsInvoiceResponse = {
    brand_city,
    brand_country,
    brand_id,
    brand_name,
    brand_number,
    brand_postal_code,
    brand_street,
    campaign_id,
    campaign_name,
    campaign_number,
    created_at,
    due_date,
    id,
    invoice_id,
    invoice_items,
    invoice_number,
    invoice_status,
    issued_date,
    item_count,
    notes,
    paid_date,
    pdf_path,
    subtotal,
    tax_amount,
    tax_rate,
    total,
    updated_at,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
