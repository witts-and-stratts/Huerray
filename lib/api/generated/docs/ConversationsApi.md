# ConversationsApi

All URIs are relative to */api/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**conversationsByEntityGet**](#conversationsbyentityget) | **GET** /conversations/by-entity | Resolve the conversation for an entity|
|[**conversationsGet**](#conversationsget) | **GET** /conversations | List conversations|
|[**conversationsIdGet**](#conversationsidget) | **GET** /conversations/{id} | Get a conversation|
|[**conversationsIdMessagesGet**](#conversationsidmessagesget) | **GET** /conversations/{id}/messages | Get all messages in a conversation|
|[**conversationsIdMessagesPost**](#conversationsidmessagespost) | **POST** /conversations/{id}/messages | Post a message to a conversation|
|[**conversationsIdParticipantsPost**](#conversationsidparticipantspost) | **POST** /conversations/{id}/participants | Add participants to a conversation|
|[**conversationsIdParticipantsUserIdDelete**](#conversationsidparticipantsuseriddelete) | **DELETE** /conversations/{id}/participants/{userId} | Remove a participant from a conversation|
|[**conversationsMessagesGet**](#conversationsmessagesget) | **GET** /conversations/messages | Get the messages for an entity\&#39;s conversation|
|[**conversationsMessagesMessageIdDelete**](#conversationsmessagesmessageiddelete) | **DELETE** /conversations/messages/{messageId} | Delete a message (admin only)|
|[**conversationsMessagesMessageIdPut**](#conversationsmessagesmessageidput) | **PUT** /conversations/messages/{messageId} | Update a message (admin only)|
|[**conversationsMessagesPost**](#conversationsmessagespost) | **POST** /conversations/messages | Post a message to an entity\&#39;s conversation|

# **conversationsByEntityGet**
> ModelsStandardResponseModelsConversationResponse conversationsByEntityGet()


### Example

```typescript
import {
    ConversationsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new ConversationsApi(configuration);

let entityType: string; //Entity type (default to undefined)
let entityId: string; //Entity ID (UUID) (default to undefined)

const { status, data } = await apiInstance.conversationsByEntityGet(
    entityType,
    entityId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **entityType** | [**string**] | Entity type | defaults to undefined|
| **entityId** | [**string**] | Entity ID (UUID) | defaults to undefined|


### Return type

**ModelsStandardResponseModelsConversationResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**403** | Forbidden |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **conversationsGet**
> ModelsPaginatedResponseArrayModelsConversationResponse conversationsGet()

List conversations the caller participates in. Admin users see every conversation.

### Example

```typescript
import {
    ConversationsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new ConversationsApi(configuration);

let entityType: string; //Filter by (base) entity type (optional) (default to undefined)
let entityId: string; //Filter by entity ID (optional) (default to undefined)
let page: number; //Page (default 1) (optional) (default to undefined)
let limit: number; //Page size (default 20, max 100) (optional) (default to undefined)

const { status, data } = await apiInstance.conversationsGet(
    entityType,
    entityId,
    page,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **entityType** | [**string**] | Filter by (base) entity type | (optional) defaults to undefined|
| **entityId** | [**string**] | Filter by entity ID | (optional) defaults to undefined|
| **page** | [**number**] | Page (default 1) | (optional) defaults to undefined|
| **limit** | [**number**] | Page size (default 20, max 100) | (optional) defaults to undefined|


### Return type

**ModelsPaginatedResponseArrayModelsConversationResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **conversationsIdGet**
> ModelsStandardResponseModelsConversationResponse conversationsIdGet()


### Example

```typescript
import {
    ConversationsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new ConversationsApi(configuration);

let id: string; //Conversation ID (default to undefined)

const { status, data } = await apiInstance.conversationsIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Conversation ID | defaults to undefined|


### Return type

**ModelsStandardResponseModelsConversationResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**403** | Forbidden |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **conversationsIdMessagesGet**
> ModelsStandardResponseArrayModelsConversationMessageResponse conversationsIdMessagesGet()


### Example

```typescript
import {
    ConversationsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new ConversationsApi(configuration);

let id: string; //Conversation ID (default to undefined)

const { status, data } = await apiInstance.conversationsIdMessagesGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Conversation ID | defaults to undefined|


### Return type

**ModelsStandardResponseArrayModelsConversationMessageResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**403** | Forbidden |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **conversationsIdMessagesPost**
> ModelsStandardResponseModelsConversationMessageResponse conversationsIdMessagesPost(request)


### Example

```typescript
import {
    ConversationsApi,
    Configuration,
    ModelsPostConversationMessageRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new ConversationsApi(configuration);

let id: string; //Conversation ID (default to undefined)
let request: ModelsPostConversationMessageRequest; //Message

const { status, data } = await apiInstance.conversationsIdMessagesPost(
    id,
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ModelsPostConversationMessageRequest**| Message | |
| **id** | [**string**] | Conversation ID | defaults to undefined|


### Return type

**ModelsStandardResponseModelsConversationMessageResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Created |  -  |
|**403** | Forbidden |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **conversationsIdParticipantsPost**
> ModelsStandardResponseModelsConversationResponse conversationsIdParticipantsPost(request)

Any existing participant (or an admin) can add users. Added users are notified.

### Example

```typescript
import {
    ConversationsApi,
    Configuration,
    ModelsAddParticipantsRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new ConversationsApi(configuration);

let id: string; //Conversation ID (default to undefined)
let request: ModelsAddParticipantsRequest; //User IDs to add

const { status, data } = await apiInstance.conversationsIdParticipantsPost(
    id,
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ModelsAddParticipantsRequest**| User IDs to add | |
| **id** | [**string**] | Conversation ID | defaults to undefined|


### Return type

**ModelsStandardResponseModelsConversationResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**403** | Forbidden |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **conversationsIdParticipantsUserIdDelete**
> ModelsStandardResponseAny conversationsIdParticipantsUserIdDelete()

Admins may remove anyone; other users may only remove themselves.

### Example

```typescript
import {
    ConversationsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new ConversationsApi(configuration);

let id: string; //Conversation ID (default to undefined)
let userId: string; //User ID to remove (default to undefined)

const { status, data } = await apiInstance.conversationsIdParticipantsUserIdDelete(
    id,
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Conversation ID | defaults to undefined|
| **userId** | [**string**] | User ID to remove | defaults to undefined|


### Return type

**ModelsStandardResponseAny**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**403** | Forbidden |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **conversationsMessagesGet**
> ModelsStandardResponseArrayModelsConversationMessageResponse conversationsMessagesGet()

Resolves the conversation for an entity ref and returns all of its messages, oldest first.

### Example

```typescript
import {
    ConversationsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new ConversationsApi(configuration);

let entityType: string; //Entity type (brand, campaign, creator, video_submission, admin_campaign_approval, ...) (default to undefined)
let entityId: string; //Entity ID (UUID) (default to undefined)

const { status, data } = await apiInstance.conversationsMessagesGet(
    entityType,
    entityId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **entityType** | [**string**] | Entity type (brand, campaign, creator, video_submission, admin_campaign_approval, ...) | defaults to undefined|
| **entityId** | [**string**] | Entity ID (UUID) | defaults to undefined|


### Return type

**ModelsStandardResponseArrayModelsConversationMessageResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**403** | Forbidden |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **conversationsMessagesMessageIdDelete**
> ModelsStandardResponseAny conversationsMessagesMessageIdDelete()


### Example

```typescript
import {
    ConversationsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new ConversationsApi(configuration);

let messageId: string; //Message ID (default to undefined)

const { status, data } = await apiInstance.conversationsMessagesMessageIdDelete(
    messageId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **messageId** | [**string**] | Message ID | defaults to undefined|


### Return type

**ModelsStandardResponseAny**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **conversationsMessagesMessageIdPut**
> ModelsStandardResponseModelsConversationMessageResponse conversationsMessagesMessageIdPut(request)


### Example

```typescript
import {
    ConversationsApi,
    Configuration,
    ModelsEditMessageRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new ConversationsApi(configuration);

let messageId: string; //Message ID (default to undefined)
let request: ModelsEditMessageRequest; //Message edit

const { status, data } = await apiInstance.conversationsMessagesMessageIdPut(
    messageId,
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ModelsEditMessageRequest**| Message edit | |
| **messageId** | [**string**] | Message ID | defaults to undefined|


### Return type

**ModelsStandardResponseModelsConversationMessageResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **conversationsMessagesPost**
> ModelsStandardResponseModelsConversationMessageResponse conversationsMessagesPost(request)

Creates the conversation if needed and appends a message tagged with entity_type.

### Example

```typescript
import {
    ConversationsApi,
    Configuration,
    ModelsPostMessageRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new ConversationsApi(configuration);

let request: ModelsPostMessageRequest; //Message

const { status, data } = await apiInstance.conversationsMessagesPost(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ModelsPostMessageRequest**| Message | |


### Return type

**ModelsStandardResponseModelsConversationMessageResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Created |  -  |
|**403** | Forbidden |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

