# ModelsPaymentResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**created_at** | **string** |  | [optional] [default to undefined]
**creator_id** | **string** |  | [optional] [default to undefined]
**creator_name** | **string** |  | [optional] [default to undefined]
**id** | **string** |  | [optional] [default to undefined]
**item_count** | **number** |  | [optional] [default to undefined]
**notes** | **string** |  | [optional] [default to undefined]
**payment_date** | **string** |  | [optional] [default to undefined]
**payment_id** | **string** |  | [optional] [default to undefined]
**payment_items** | [**Array&lt;ModelsPaymentItemResponse&gt;**](ModelsPaymentItemResponse.md) |  | [optional] [default to undefined]
**payment_method** | **string** |  | [optional] [default to undefined]
**payment_status** | **string** |  | [optional] [default to undefined]
**reference** | **string** |  | [optional] [default to undefined]
**total** | [**ModelsMoney**](ModelsMoney.md) |  | [optional] [default to undefined]
**updated_at** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { ModelsPaymentResponse } from 'huerray-api';

const instance: ModelsPaymentResponse = {
    created_at,
    creator_id,
    creator_name,
    id,
    item_count,
    notes,
    payment_date,
    payment_id,
    payment_items,
    payment_method,
    payment_status,
    reference,
    total,
    updated_at,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
