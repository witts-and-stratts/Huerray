# ModelsConversationResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**created_at** | **string** |  | [optional] [default to undefined]
**entity_id** | **string** |  | [optional] [default to undefined]
**entity_type** | **string** |  | [optional] [default to undefined]
**id** | **string** |  | [optional] [default to undefined]
**last_message** | [**ModelsConversationMessageResponse**](ModelsConversationMessageResponse.md) |  | [optional] [default to undefined]
**message_count** | **number** |  | [optional] [default to undefined]
**participants** | [**Array&lt;ModelsConversationParticipantResponse&gt;**](ModelsConversationParticipantResponse.md) |  | [optional] [default to undefined]
**scope_id** | **string** |  | [optional] [default to undefined]
**updated_at** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { ModelsConversationResponse } from 'huerray-api';

const instance: ModelsConversationResponse = {
    created_at,
    entity_id,
    entity_type,
    id,
    last_message,
    message_count,
    participants,
    scope_id,
    updated_at,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
