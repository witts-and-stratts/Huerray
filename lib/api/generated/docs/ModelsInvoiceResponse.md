# ModelsInvoiceResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**brand_id** | **string** |  | [optional] [default to undefined]
**brand_name** | **string** |  | [optional] [default to undefined]
**campaign_id** | **string** |  | [optional] [default to undefined]
**campaign_name** | **string** |  | [optional] [default to undefined]
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
**total** | [**ModelsMoney**](ModelsMoney.md) |  | [optional] [default to undefined]
**updated_at** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { ModelsInvoiceResponse } from 'huerray-api';

const instance: ModelsInvoiceResponse = {
    brand_id,
    brand_name,
    campaign_id,
    campaign_name,
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
    total,
    updated_at,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
