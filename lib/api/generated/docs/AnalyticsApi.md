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
> AnalyticsBrandGet200Response analyticsBrandGet()

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

**AnalyticsBrandGet200Response**

### Authorization

[BearerAuth](../README.md#BearerAuth)

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
> AnalyticsBrandGet200Response analyticsBrandPeriodGet()

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

**AnalyticsBrandGet200Response**

### Authorization

[BearerAuth](../README.md#BearerAuth)

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
> AnalyticsCreatorGet200Response analyticsCreatorGet()

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

**AnalyticsCreatorGet200Response**

### Authorization

[BearerAuth](../README.md#BearerAuth)

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
> AnalyticsCreatorGet200Response analyticsCreatorPeriodGet()

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

**AnalyticsCreatorGet200Response**

### Authorization

[BearerAuth](../README.md#BearerAuth)

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
> AnalyticsPlatformGet200Response analyticsPlatformGet()

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

**AnalyticsPlatformGet200Response**

### Authorization

[BearerAuth](../README.md#BearerAuth)

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
> AnalyticsPlatformGet200Response analyticsPlatformPeriodGet()

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

**AnalyticsPlatformGet200Response**

### Authorization

[BearerAuth](../README.md#BearerAuth)

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
> AnalyticsTimeSeriesGet200Response analyticsTimeSeriesGet()

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

**AnalyticsTimeSeriesGet200Response**

### Authorization

[BearerAuth](../README.md#BearerAuth)

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

