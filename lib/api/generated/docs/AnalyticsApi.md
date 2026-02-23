# AnalyticsApi

All URIs are relative to */api/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**analyticsBrandGet**](#analyticsbrandget) | **GET** /analytics/brand | Get brand analytics|
|[**analyticsBrandPeriodGet**](#analyticsbrandperiodget) | **GET** /analytics/brand/period | Get brand analytics by period|
|[**analyticsCreatorGet**](#analyticscreatorget) | **GET** /analytics/creator | Get creator analytics|
|[**analyticsCreatorPeriodGet**](#analyticscreatorperiodget) | **GET** /analytics/creator/period | Get creator analytics by period|
|[**analyticsPlatformGet**](#analyticsplatformget) | **GET** /analytics/platform | Get platform analytics|
|[**analyticsPlatformPeriodGet**](#analyticsplatformperiodget) | **GET** /analytics/platform/period | Get platform analytics by period|
|[**analyticsTimeSeriesGet**](#analyticstimeseriesget) | **GET** /analytics/time-series | Get analytics time series|

# **analyticsBrandGet**
> ModelsStandardBrandAnalyticsResponse analyticsBrandGet()

Get analytics for brand\'s performance

### Example

```typescript
import {
    AnalyticsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new AnalyticsApi(configuration);

const { status, data } = await apiInstance.analyticsBrandGet();
```

### Parameters
This endpoint does not have any parameters.


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
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **analyticsBrandPeriodGet**
> ModelsStandardBrandAnalyticsResponse analyticsBrandPeriodGet()

Get brand analytics for specific time periods (last_week, last_month, last_three_months, last_year)

### Example

```typescript
import {
    AnalyticsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new AnalyticsApi(configuration);

let period: string; //Period (last_week, last_month, last_three_months, last_year) (default to undefined)

const { status, data } = await apiInstance.analyticsBrandPeriodGet(
    period
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **period** | [**string**] | Period (last_week, last_month, last_three_months, last_year) | defaults to undefined|


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

Get analytics for creator\'s performance

### Example

```typescript
import {
    AnalyticsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new AnalyticsApi(configuration);

const { status, data } = await apiInstance.analyticsCreatorGet();
```

### Parameters
This endpoint does not have any parameters.


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
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **analyticsCreatorPeriodGet**
> ModelsStandardCreatorAnalyticsResponse analyticsCreatorPeriodGet()

Get creator analytics for specific time periods (last_week, last_month, last_three_months, last_year)

### Example

```typescript
import {
    AnalyticsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new AnalyticsApi(configuration);

let period: string; //Period (last_week, last_month, last_three_months, last_year) (default to undefined)

const { status, data } = await apiInstance.analyticsCreatorPeriodGet(
    period
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **period** | [**string**] | Period (last_week, last_month, last_three_months, last_year) | defaults to undefined|


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

# **analyticsPlatformGet**
> ModelsStandardPlatformAnalyticsResponse analyticsPlatformGet()

Get platform-wide analytics for admin users

### Example

```typescript
import {
    AnalyticsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new AnalyticsApi(configuration);

const { status, data } = await apiInstance.analyticsPlatformGet();
```

### Parameters
This endpoint does not have any parameters.


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
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **analyticsPlatformPeriodGet**
> ModelsStandardPlatformAnalyticsResponse analyticsPlatformPeriodGet()

Get platform analytics for specific time periods (last_week, last_month, last_three_months, last_year)

### Example

```typescript
import {
    AnalyticsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new AnalyticsApi(configuration);

let period: string; //Period (last_week, last_month, last_three_months, last_year) (default to undefined)

const { status, data } = await apiInstance.analyticsPlatformPeriodGet(
    period
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **period** | [**string**] | Period (last_week, last_month, last_three_months, last_year) | defaults to undefined|


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

