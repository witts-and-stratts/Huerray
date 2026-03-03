# CommentsApi

All URIs are relative to */api/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**commentsGet**](#commentsget) | **GET** /comments | Get comments for an entity|
|[**commentsIdDelete**](#commentsiddelete) | **DELETE** /comments/{id} | Delete a comment|
|[**commentsIdPut**](#commentsidput) | **PUT** /comments/{id} | Update a comment|
|[**commentsPost**](#commentspost) | **POST** /comments | Add a new comment|

# **commentsGet**
> ModelsStandardResponseArrayModelsCommentResponse commentsGet()

Get all comments for a specific entity type and ID. Valid entity types: brand, campaign, creator, video_submission, admin_campaign_approval, brand_campaign_decision, video_submission_status_update, brand_video_decision

### Example

```typescript
import {
    CommentsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CommentsApi(configuration);

let entityType: string; //Entity type (brand, campaign, creator, video_submission, admin_campaign_approval, brand_campaign_decision, video_submission_status_update, brand_video_decision) (default to undefined)
let entityId: string; //Entity ID (UUID) (default to undefined)

const { status, data } = await apiInstance.commentsGet(
    entityType,
    entityId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **entityType** | [**string**] | Entity type (brand, campaign, creator, video_submission, admin_campaign_approval, brand_campaign_decision, video_submission_status_update, brand_video_decision) | defaults to undefined|
| **entityId** | [**string**] | Entity ID (UUID) | defaults to undefined|


### Return type

**ModelsStandardResponseArrayModelsCommentResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Comments retrieved successfully |  -  |
|**400** | Bad request |  -  |
|**422** | Unprocessable entity |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **commentsIdDelete**
> ModelsStandardResponseAny commentsIdDelete()

Delete a comment by its ID (Admin only)

### Example

```typescript
import {
    CommentsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CommentsApi(configuration);

let id: string; //Comment ID (default to undefined)

const { status, data } = await apiInstance.commentsIdDelete(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Comment ID | defaults to undefined|


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
|**200** | Comment deleted successfully |  -  |
|**401** | Unauthorized |  -  |
|**422** | Unprocessable entity |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **commentsIdPut**
> ModelsStandardResponseModelsCommentResponse commentsIdPut(request)

Update an existing comment (Admin only)

### Example

```typescript
import {
    CommentsApi,
    Configuration,
    ModelsCommentEditRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CommentsApi(configuration);

let id: string; //Comment ID (default to undefined)
let request: ModelsCommentEditRequest; //Comment edit request

const { status, data } = await apiInstance.commentsIdPut(
    id,
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ModelsCommentEditRequest**| Comment edit request | |
| **id** | [**string**] | Comment ID | defaults to undefined|


### Return type

**ModelsStandardResponseModelsCommentResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Comment updated successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**422** | Unprocessable entity |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **commentsPost**
> ModelsStandardResponseModelsCommentResponse commentsPost(request)

Add a new comment to an entity (brand, campaign, creator, or video_submission)

### Example

```typescript
import {
    CommentsApi,
    Configuration,
    ModelsCommentRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CommentsApi(configuration);

let request: ModelsCommentRequest; //Comment request

const { status, data } = await apiInstance.commentsPost(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ModelsCommentRequest**| Comment request | |


### Return type

**ModelsStandardResponseModelsCommentResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Comment added successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**422** | Unprocessable entity |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

