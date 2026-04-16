# AnalyticsApi

All URIs are relative to */api/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**analyticsBrandGet**](#analyticsbrandget) | **GET** /analytics/brand | Get brand analytics|
|[**analyticsCreatorGet**](#analyticscreatorget) | **GET** /analytics/creator | Get creator analytics|
|[**analyticsDelete**](#analyticsdelete) | **DELETE** /analytics | Delete all analytics data|
|[**analyticsPlatformGet**](#analyticsplatformget) | **GET** /analytics/platform | Get platform analytics|
|[**analyticsTimeSeriesGet**](#analyticstimeseriesget) | **GET** /analytics/time-series | Get analytics time series|

# **analyticsBrandGet**
> ModelsStandardBrandAnalyticsResponse analyticsBrandGet()

Get analytics for brand\'s performance. Admin can pass brand_id query param. Optionally filter by period or date range (mutually exclusive).

### Example

```typescript
import {
    AnalyticsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new AnalyticsApi(configuration);

let brandId: string; //Brand ID (admin only) (optional) (default to undefined)
let period: string; //Period (last_week, last_month, last_three_months, last_year) (optional) (default to undefined)
let startDate: string; //Start date for date range filter (YYYY-MM-DD) (optional) (default to undefined)
let endDate: string; //End date for date range filter (YYYY-MM-DD) (optional) (default to undefined)

const { status, data } = await apiInstance.analyticsBrandGet(
    brandId,
    period,
    startDate,
    endDate
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **brandId** | [**string**] | Brand ID (admin only) | (optional) defaults to undefined|
| **period** | [**string**] | Period (last_week, last_month, last_three_months, last_year) | (optional) defaults to undefined|
| **startDate** | [**string**] | Start date for date range filter (YYYY-MM-DD) | (optional) defaults to undefined|
| **endDate** | [**string**] | End date for date range filter (YYYY-MM-DD) | (optional) defaults to undefined|


### Return type

**ModelsStandardBrandAnalyticsResponse**

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

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **analyticsCreatorGet**
> ModelsStandardCreatorAnalyticsResponse analyticsCreatorGet()

Get analytics for creator\'s performance. Admin can pass creator_id query param. Optionally filter by period or date range (mutually exclusive).

### Example

```typescript
import {
    AnalyticsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new AnalyticsApi(configuration);

let creatorId: string; //Creator ID (admin only) (optional) (default to undefined)
let period: string; //Period (last_week, last_month, last_three_months, last_year) (optional) (default to undefined)
let startDate: string; //Start date for date range filter (YYYY-MM-DD) (optional) (default to undefined)
let endDate: string; //End date for date range filter (YYYY-MM-DD) (optional) (default to undefined)

const { status, data } = await apiInstance.analyticsCreatorGet(
    creatorId,
    period,
    startDate,
    endDate
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **creatorId** | [**string**] | Creator ID (admin only) | (optional) defaults to undefined|
| **period** | [**string**] | Period (last_week, last_month, last_three_months, last_year) | (optional) defaults to undefined|
| **startDate** | [**string**] | Start date for date range filter (YYYY-MM-DD) | (optional) defaults to undefined|
| **endDate** | [**string**] | End date for date range filter (YYYY-MM-DD) | (optional) defaults to undefined|


### Return type

**ModelsStandardCreatorAnalyticsResponse**

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

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **analyticsDelete**
> ModelsStandardResponseAny analyticsDelete()

Delete all platform, brand, and creator analytics metrics

### Example

```typescript
import {
    AnalyticsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new AnalyticsApi(configuration);

const { status, data } = await apiInstance.analyticsDelete();
```

### Parameters
This endpoint does not have any parameters.


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
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **analyticsPlatformGet**
> ModelsStandardPlatformAnalyticsResponse analyticsPlatformGet()

Get platform-wide analytics for admin users. Optionally filter by period or date range (mutually exclusive).

### Example

```typescript
import {
    AnalyticsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new AnalyticsApi(configuration);

let period: string; //Period (last_week, last_month, last_three_months, last_year) (optional) (default to undefined)
let startDate: string; //Start date for date range filter (YYYY-MM-DD) (optional) (default to undefined)
let endDate: string; //End date for date range filter (YYYY-MM-DD) (optional) (default to undefined)

const { status, data } = await apiInstance.analyticsPlatformGet(
    period,
    startDate,
    endDate
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **period** | [**string**] | Period (last_week, last_month, last_three_months, last_year) | (optional) defaults to undefined|
| **startDate** | [**string**] | Start date for date range filter (YYYY-MM-DD) | (optional) defaults to undefined|
| **endDate** | [**string**] | End date for date range filter (YYYY-MM-DD) | (optional) defaults to undefined|


### Return type

**ModelsStandardPlatformAnalyticsResponse**

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

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **analyticsTimeSeriesGet**
> ModelsStandardAnalyticsTimeSeriesResponse analyticsTimeSeriesGet()

Get time-series analytics data

### Example

```typescript
import {
    AnalyticsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new AnalyticsApi(configuration);

let metric: string; //Metric name (default to undefined)
let startDate: string; //Start date (YYYY-MM-DD) (default to undefined)
let endDate: string; //End date (YYYY-MM-DD) (default to undefined)

const { status, data } = await apiInstance.analyticsTimeSeriesGet(
    metric,
    startDate,
    endDate
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **metric** | [**string**] | Metric name | defaults to undefined|
| **startDate** | [**string**] | Start date (YYYY-MM-DD) | defaults to undefined|
| **endDate** | [**string**] | End date (YYYY-MM-DD) | defaults to undefined|


### Return type

**ModelsStandardAnalyticsTimeSeriesResponse**

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

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

