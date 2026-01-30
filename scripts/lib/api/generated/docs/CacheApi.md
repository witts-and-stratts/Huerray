# CacheApi

All URIs are relative to */api/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**cacheClearDelete**](#cachecleardelete) | **DELETE** /cache/clear | Clear translation cache|
|[**cacheStatsGet**](#cachestatsget) | **GET** /cache/stats | Get translation cache statistics|

# **cacheClearDelete**
> ModelsStandardGenericResponse cacheClearDelete()

Clear all cached translation data (admin only)

### Example

```typescript
import {
    CacheApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CacheApi(configuration);

const { status, data } = await apiInstance.cacheClearDelete();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ModelsStandardGenericResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Cache cleared successfully |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden - admin only |  -  |
|**500** | Failed to clear cache |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **cacheStatsGet**
> ModelsStandardGenericResponse cacheStatsGet()

Get detailed statistics about translation cache usage and performance

### Example

```typescript
import {
    CacheApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CacheApi(configuration);

const { status, data } = await apiInstance.cacheStatsGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ModelsStandardGenericResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Cache statistics retrieved successfully |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

