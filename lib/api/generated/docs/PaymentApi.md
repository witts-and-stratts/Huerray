# PaymentApi

All URIs are relative to */api/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**paymentsIdDelete**](#paymentsiddelete) | **DELETE** /payments/{id} | Delete payment by ID|
|[**paymentsIdGet**](#paymentsidget) | **GET** /payments/{id} | Get payment by ID|
|[**paymentsIdStatusPut**](#paymentsidstatusput) | **PUT** /payments/{id}/status | Update payment status|
|[**paymentsPost**](#paymentspost) | **POST** /payments | Create payment batch|
|[**paymentsSearchGet**](#paymentssearchget) | **GET** /payments/search | Search payments|

# **paymentsIdDelete**
> ModelsStandardGenericResponse paymentsIdDelete()

Admin deletes a payment and all associated payment items

### Example

```typescript
import {
    PaymentApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new PaymentApi(configuration);

let id: string; //Payment ID (default to undefined)

const { status, data } = await apiInstance.paymentsIdDelete(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Payment ID | defaults to undefined|


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
|**200** | Payment deleted successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**404** | Payment not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **paymentsIdGet**
> ModelsStandardPaymentResponse paymentsIdGet()

Admin gets payment details by ID

### Example

```typescript
import {
    PaymentApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new PaymentApi(configuration);

let id: string; //Payment ID (default to undefined)

const { status, data } = await apiInstance.paymentsIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Payment ID | defaults to undefined|


### Return type

**ModelsStandardPaymentResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Payment retrieved successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **paymentsIdStatusPut**
> ModelsStandardPaymentResponse paymentsIdStatusPut(request)

Admin updates payment status

### Example

```typescript
import {
    PaymentApi,
    Configuration,
    ModelsUpdatePaymentStatusRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new PaymentApi(configuration);

let id: string; //Payment ID (default to undefined)
let request: ModelsUpdatePaymentStatusRequest; //Payment status update request

const { status, data } = await apiInstance.paymentsIdStatusPut(
    id,
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ModelsUpdatePaymentStatusRequest**| Payment status update request | |
| **id** | [**string**] | Payment ID | defaults to undefined|


### Return type

**ModelsStandardPaymentResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Payment status updated successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **paymentsPost**
> ModelsStandardPaymentResponse paymentsPost(request)

Admin creates a payment batch from selected payment items

### Example

```typescript
import {
    PaymentApi,
    Configuration,
    ModelsCreatePaymentRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new PaymentApi(configuration);

let request: ModelsCreatePaymentRequest; //Payment creation request

const { status, data } = await apiInstance.paymentsPost(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ModelsCreatePaymentRequest**| Payment creation request | |


### Return type

**ModelsStandardPaymentResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Payment created successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **paymentsSearchGet**
> ModelsPaginatedPaymentResponse paymentsSearchGet()

Admin searches payments with filters

### Example

```typescript
import {
    PaymentApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new PaymentApi(configuration);

let createdAfter: string; // (optional) (default to undefined)
let createdBefore: string; // (optional) (default to undefined)
let creatorId: string; // (optional) (default to undefined)
let limit: number; // (optional) (default to undefined)
let page: number; // (optional) (default to undefined)
let paymentStatus: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled'; // (optional) (default to undefined)
let search: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.paymentsSearchGet(
    createdAfter,
    createdBefore,
    creatorId,
    limit,
    page,
    paymentStatus,
    search
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createdAfter** | [**string**] |  | (optional) defaults to undefined|
| **createdBefore** | [**string**] |  | (optional) defaults to undefined|
| **creatorId** | [**string**] |  | (optional) defaults to undefined|
| **limit** | [**number**] |  | (optional) defaults to undefined|
| **page** | [**number**] |  | (optional) defaults to undefined|
| **paymentStatus** | [**&#39;pending&#39; | &#39;processing&#39; | &#39;completed&#39; | &#39;failed&#39; | &#39;cancelled&#39;**]**Array<&#39;pending&#39; &#124; &#39;processing&#39; &#124; &#39;completed&#39; &#124; &#39;failed&#39; &#124; &#39;cancelled&#39;>** |  | (optional) defaults to undefined|
| **search** | [**string**] |  | (optional) defaults to undefined|


### Return type

**ModelsPaginatedPaymentResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Payments retrieved successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

