# PaymentItemsApi

All URIs are relative to */api/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**paymentItemsPost**](#paymentitemspost) | **POST** /payment-items | Create payment item|
|[**paymentItemsSearchGet**](#paymentitemssearchget) | **GET** /payment-items/search | Search payment items|

# **paymentItemsPost**
> ModelsStandardPaymentItemResponse paymentItemsPost(request)

Admin creates a payment item for a gig and creator

### Example

```typescript
import {
    PaymentItemsApi,
    Configuration,
    ModelsCreatePaymentItemRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new PaymentItemsApi(configuration);

let request: ModelsCreatePaymentItemRequest; //Payment item creation request

const { status, data } = await apiInstance.paymentItemsPost(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ModelsCreatePaymentItemRequest**| Payment item creation request | |


### Return type

**ModelsStandardPaymentItemResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Payment item created successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **paymentItemsSearchGet**
> ModelsPaginatedPaymentItemResponse paymentItemsSearchGet()

Admin searches payment items with filters

### Example

```typescript
import {
    PaymentItemsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new PaymentItemsApi(configuration);

let createdAfter: string; // (optional) (default to undefined)
let createdBefore: string; // (optional) (default to undefined)
let creatorId: string; // (optional) (default to undefined)
let itemStatus: 'pending' | 'included' | 'paid' | 'failed' | 'cancelled'; // (optional) (default to undefined)
let limit: number; // (optional) (default to undefined)
let page: number; // (optional) (default to undefined)
let paymentId: string; // (optional) (default to undefined)
let search: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.paymentItemsSearchGet(
    createdAfter,
    createdBefore,
    creatorId,
    itemStatus,
    limit,
    page,
    paymentId,
    search
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createdAfter** | [**string**] |  | (optional) defaults to undefined|
| **createdBefore** | [**string**] |  | (optional) defaults to undefined|
| **creatorId** | [**string**] |  | (optional) defaults to undefined|
| **itemStatus** | [**&#39;pending&#39; | &#39;included&#39; | &#39;paid&#39; | &#39;failed&#39; | &#39;cancelled&#39;**]**Array<&#39;pending&#39; &#124; &#39;included&#39; &#124; &#39;paid&#39; &#124; &#39;failed&#39; &#124; &#39;cancelled&#39;>** |  | (optional) defaults to undefined|
| **limit** | [**number**] |  | (optional) defaults to undefined|
| **page** | [**number**] |  | (optional) defaults to undefined|
| **paymentId** | [**string**] |  | (optional) defaults to undefined|
| **search** | [**string**] |  | (optional) defaults to undefined|


### Return type

**ModelsPaginatedPaymentItemResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Payment items retrieved successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

