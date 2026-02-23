# NotificationsApi

All URIs are relative to */api/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**notificationsGet**](#notificationsget) | **GET** /notifications | Get user notifications|
|[**notificationsIdDelete**](#notificationsiddelete) | **DELETE** /notifications/{id} | Delete notification|
|[**notificationsIdReadPut**](#notificationsidreadput) | **PUT** /notifications/{id}/read | Mark notification as read|
|[**notificationsPost**](#notificationspost) | **POST** /notifications | Create a new notification (Admin only)|
|[**notificationsReadAllPut**](#notificationsreadallput) | **PUT** /notifications/read-all | Mark all notifications as read|
|[**notificationsStatsGet**](#notificationsstatsget) | **GET** /notifications/stats | Get notification statistics|

# **notificationsGet**
> ModelsStandardNotificationListResponse notificationsGet()

Get notifications for the authenticated user with pagination

### Example

```typescript
import {
    NotificationsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new NotificationsApi(configuration);

let page: number; //Page number (optional) (default to 1)
let perPage: number; //Items per page (optional) (default to 10)
let unreadOnly: boolean; //Get only unread notifications (optional) (default to false)

const { status, data } = await apiInstance.notificationsGet(
    page,
    perPage,
    unreadOnly
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] | Page number | (optional) defaults to 1|
| **perPage** | [**number**] | Items per page | (optional) defaults to 10|
| **unreadOnly** | [**boolean**] | Get only unread notifications | (optional) defaults to false|


### Return type

**ModelsStandardNotificationListResponse**

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
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **notificationsIdDelete**
> ModelsStandardGenericResponse notificationsIdDelete()

Delete a specific notification

### Example

```typescript
import {
    NotificationsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new NotificationsApi(configuration);

let id: string; //Notification ID (default to undefined)

const { status, data } = await apiInstance.notificationsIdDelete(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Notification ID | defaults to undefined|


### Return type

**ModelsStandardGenericResponse**

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
|**404** | Not Found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **notificationsIdReadPut**
> ModelsStandardGenericResponse notificationsIdReadPut()

Mark a specific notification as read

### Example

```typescript
import {
    NotificationsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new NotificationsApi(configuration);

let id: number; //Notification ID (default to undefined)

const { status, data } = await apiInstance.notificationsIdReadPut(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | Notification ID | defaults to undefined|


### Return type

**ModelsStandardGenericResponse**

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
|**404** | Not Found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **notificationsPost**
> ModelsStandardNotificationResponse notificationsPost(notification)

Create a new notification for a user

### Example

```typescript
import {
    NotificationsApi,
    Configuration,
    ModelsCreateNotificationRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new NotificationsApi(configuration);

let notification: ModelsCreateNotificationRequest; //Notification data

const { status, data } = await apiInstance.notificationsPost(
    notification
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **notification** | **ModelsCreateNotificationRequest**| Notification data | |


### Return type

**ModelsStandardNotificationResponse**

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
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **notificationsReadAllPut**
> ModelsStandardGenericResponse notificationsReadAllPut()

Mark all notifications as read for the authenticated user

### Example

```typescript
import {
    NotificationsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new NotificationsApi(configuration);

const { status, data } = await apiInstance.notificationsReadAllPut();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ModelsStandardGenericResponse**

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
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **notificationsStatsGet**
> ModelsStandardNotificationResponse notificationsStatsGet()

Get notification statistics for the authenticated user

### Example

```typescript
import {
    NotificationsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new NotificationsApi(configuration);

const { status, data } = await apiInstance.notificationsStatsGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ModelsStandardNotificationResponse**

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
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

