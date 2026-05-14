# UserApi

All URIs are relative to */api/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**usersIdDelete**](#usersiddelete) | **DELETE** /users/{id} | Delete user profile|
|[**usersIdGet**](#usersidget) | **GET** /users/{id} | Get user by ID|
|[**usersIdPut**](#usersidput) | **PUT** /users/{id} | Edit user details|
|[**usersPost**](#userspost) | **POST** /users | Create admin user|
|[**usersProfileGet**](#usersprofileget) | **GET** /users/profile | Get user profile|
|[**usersProfilePut**](#usersprofileput) | **PUT** /users/profile | Update user profile|
|[**usersSearchGet**](#userssearchget) | **GET** /users/search | Search users|

# **usersIdDelete**
> ModelsStandardUserResponse usersIdDelete()

Delete the profile of a user by ID (Admin)

### Example

```typescript
import {
    UserApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let id: string; //User UUID (default to undefined)

const { status, data } = await apiInstance.usersIdDelete(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | User UUID | defaults to undefined|


### Return type

**ModelsStandardUserResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Profile deleted successfully |  -  |
|**401** | Unauthorized |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **usersIdGet**
> ModelsStandardUserResponse usersIdGet()

Get a specific user by ID

### Example

```typescript
import {
    UserApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let id: string; //User UUID (default to undefined)

const { status, data } = await apiInstance.usersIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | User UUID | defaults to undefined|


### Return type

**ModelsStandardUserResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | User retrieved successfully |  -  |
|**400** | Bad request |  -  |
|**404** | User not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **usersIdPut**
> ModelsStandardUserResponse usersIdPut(request)

Admin edits user information including user type

### Example

```typescript
import {
    UserApi,
    Configuration,
    ModelsEditUserRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let id: string; //User ID (default to undefined)
let request: ModelsEditUserRequest; //User edit request

const { status, data } = await apiInstance.usersIdPut(
    id,
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ModelsEditUserRequest**| User edit request | |
| **id** | [**string**] | User ID | defaults to undefined|


### Return type

**ModelsStandardUserResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | User updated successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**404** | User not found |  -  |
|**422** | UnprocessableEntity |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **usersPost**
> ModelsStandardUserResponse usersPost(request)

Create a new admin user

### Example

```typescript
import {
    UserApi,
    Configuration,
    ModelsCreateAdminRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let request: ModelsCreateAdminRequest; //Admin creation request

const { status, data } = await apiInstance.usersPost(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ModelsCreateAdminRequest**| Admin creation request | |


### Return type

**ModelsStandardUserResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Admin user created successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **usersProfileGet**
> ModelsStandardUserResponse usersProfileGet()

Get the profile of the authenticated user

### Example

```typescript
import {
    UserApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

const { status, data } = await apiInstance.usersProfileGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ModelsStandardUserResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Profile retrieved successfully |  -  |
|**401** | Unauthorized |  -  |
|**404** | User not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **usersProfilePut**
> ModelsStandardUserResponse usersProfilePut(request)

Update the profile of the authenticated user

### Example

```typescript
import {
    UserApi,
    Configuration,
    ModelsUpdateUserRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let request: ModelsUpdateUserRequest; //Profile update request

const { status, data } = await apiInstance.usersProfilePut(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ModelsUpdateUserRequest**| Profile update request | |


### Return type

**ModelsStandardUserResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Profile updated successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **usersSearchGet**
> ModelsPaginatedUserResponse usersSearchGet()

Search users with advanced filters (unrestricted for admins, restricted for others)

### Example

```typescript
import {
    UserApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new UserApi(configuration);

let q: string; //Search query (name, username, email, phone) (optional) (default to undefined)
let userType: 'creator' | 'brand_user' | 'admin_user'; //User type filter (optional) (default to undefined)
let status: string; //User status filter (optional) (default to undefined)
let page: number; //Page number (optional) (default to 1)
let limit: number; //Items per page (optional) (default to 10)

const { status, data } = await apiInstance.usersSearchGet(
    q,
    userType,
    status,
    page,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **q** | [**string**] | Search query (name, username, email, phone) | (optional) defaults to undefined|
| **userType** | [**&#39;creator&#39; | &#39;brand_user&#39; | &#39;admin_user&#39;**]**Array<&#39;creator&#39; &#124; &#39;brand_user&#39; &#124; &#39;admin_user&#39;>** | User type filter | (optional) defaults to undefined|
| **status** | [**string**] | User status filter | (optional) defaults to undefined|
| **page** | [**number**] | Page number | (optional) defaults to 1|
| **limit** | [**number**] | Items per page | (optional) defaults to 10|


### Return type

**ModelsPaginatedUserResponse**

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

