# ModelsCreateNotificationRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**action_url** | **string** |  | [optional] [default to undefined]
**entity_id** | **string** |  | [default to undefined]
**entity_type** | [**UtilsNotificationEntityType**](UtilsNotificationEntityType.md) |  | [default to undefined]
**event_name** | **string** |  | [default to undefined]
**event_type** | [**UtilsEventType**](UtilsEventType.md) |  | [default to undefined]
**message** | **string** |  | [default to undefined]
**metadata** | **string** |  | [optional] [default to undefined]
**priority** | [**UtilsPriority**](UtilsPriority.md) |  | [optional] [default to undefined]
**title** | **string** |  | [default to undefined]
**user_id** | **string** |  | [default to undefined]

## Example

```typescript
import { ModelsCreateNotificationRequest } from 'huerray-api';

const instance: ModelsCreateNotificationRequest = {
    action_url,
    entity_id,
    entity_type,
    event_name,
    event_type,
    message,
    metadata,
    priority,
    title,
    user_id,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
