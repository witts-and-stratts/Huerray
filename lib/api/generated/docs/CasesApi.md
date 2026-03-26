# CasesApi

All URIs are relative to */api/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**casesGet**](#casesget) | **GET** /cases | Search cases|
|[**casesIdAssignPut**](#casesidassignput) | **PUT** /cases/{id}/assign | Assign case to admin|
|[**casesIdGet**](#casesidget) | **GET** /cases/{id} | Get case by ID|
|[**casesIdMessagesGet**](#casesidmessagesget) | **GET** /cases/{id}/messages | Get case messages|
|[**casesIdMessagesPost**](#casesidmessagespost) | **POST** /cases/{id}/messages | Add message to case|
|[**casesIdStatusPut**](#casesidstatusput) | **PUT** /cases/{id}/status | Update case status|
|[**casesPost**](#casespost) | **POST** /cases | Create a new case|

# **casesGet**
> ModelsPaginatedCaseResponse casesGet()

Search cases with optional filters and pagination

### Example

```typescript
import {
    CasesApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CasesApi(configuration);

let q: string; //Search query (optional) (default to undefined)
let status: string; //Case status (optional) (default to undefined)
let priority: string; //Case priority (optional) (default to undefined)
let relatedEntityType: string; //Related entity type (optional) (default to undefined)
let page: number; //Page number (optional) (default to 1)
let limit: number; //Items per page (optional) (default to 10)

const { status, data } = await apiInstance.casesGet(
    q,
    status,
    priority,
    relatedEntityType,
    page,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **q** | [**string**] | Search query | (optional) defaults to undefined|
| **status** | [**string**] | Case status | (optional) defaults to undefined|
| **priority** | [**string**] | Case priority | (optional) defaults to undefined|
| **relatedEntityType** | [**string**] | Related entity type | (optional) defaults to undefined|
| **page** | [**number**] | Page number | (optional) defaults to 1|
| **limit** | [**number**] | Items per page | (optional) defaults to 10|


### Return type

**ModelsPaginatedCaseResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **casesIdAssignPut**
> ModelsStandardCaseResponse casesIdAssignPut(request)

Assign a case to an admin user (admin-only endpoint)

### Example

```typescript
import {
    CasesApi,
    Configuration,
    ModelsAssignCaseRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CasesApi(configuration);

let id: string; //Case ID (default to undefined)
let request: ModelsAssignCaseRequest; //Case assignment payload

const { status, data } = await apiInstance.casesIdAssignPut(
    id,
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ModelsAssignCaseRequest**| Case assignment payload | |
| **id** | [**string**] | Case ID | defaults to undefined|


### Return type

**ModelsStandardCaseResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **casesIdGet**
> ModelsStandardCaseResponse casesIdGet()

Retrieve a single case by ID if the requester has access

### Example

```typescript
import {
    CasesApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CasesApi(configuration);

let id: string; //Case ID (default to undefined)

const { status, data } = await apiInstance.casesIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Case ID | defaults to undefined|


### Return type

**ModelsStandardCaseResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **casesIdMessagesGet**
> ModelsStandardCaseMessageListResponse casesIdMessagesGet()

Retrieve all messages in a case thread for authorized participants

### Example

```typescript
import {
    CasesApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CasesApi(configuration);

let id: string; //Case ID (default to undefined)

const { status, data } = await apiInstance.casesIdMessagesGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Case ID | defaults to undefined|


### Return type

**ModelsStandardCaseMessageListResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **casesIdMessagesPost**
> ModelsStandardCaseMessageResponse casesIdMessagesPost(request)

Create a message in a case thread for authorized participants

### Example

```typescript
import {
    CasesApi,
    Configuration,
    ModelsCreateCaseMessageRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CasesApi(configuration);

let id: string; //Case ID (default to undefined)
let request: ModelsCreateCaseMessageRequest; //Case message payload

const { status, data } = await apiInstance.casesIdMessagesPost(
    id,
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ModelsCreateCaseMessageRequest**| Case message payload | |
| **id** | [**string**] | Case ID | defaults to undefined|


### Return type

**ModelsStandardCaseMessageResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Created |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **casesIdStatusPut**
> ModelsStandardCaseResponse casesIdStatusPut(request)

Update the status of a case when requester has permission

### Example

```typescript
import {
    CasesApi,
    Configuration,
    ModelsUpdateCaseStatusRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CasesApi(configuration);

let id: string; //Case ID (default to undefined)
let request: ModelsUpdateCaseStatusRequest; //Case status update payload

const { status, data } = await apiInstance.casesIdStatusPut(
    id,
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ModelsUpdateCaseStatusRequest**| Case status update payload | |
| **id** | [**string**] | Case ID | defaults to undefined|


### Return type

**ModelsStandardCaseResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **casesPost**
> ModelsStandardCaseResponse casesPost(request)

Create a support case for the authenticated user (admin, brand, or creator)

### Example

```typescript
import {
    CasesApi,
    Configuration,
    ModelsCreateCaseRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CasesApi(configuration);

let request: ModelsCreateCaseRequest; //Case creation payload

const { status, data } = await apiInstance.casesPost(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ModelsCreateCaseRequest**| Case creation payload | |


### Return type

**ModelsStandardCaseResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Created |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

