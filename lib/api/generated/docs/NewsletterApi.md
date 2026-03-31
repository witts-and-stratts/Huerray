# NewsletterApi

All URIs are relative to */api/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**newsletterSearchGet**](#newslettersearchget) | **GET** /newsletter/search | Search newsletter subscriptions|
|[**newsletterSignupPost**](#newslettersignuppost) | **POST** /newsletter/signup | Newsletter signup|
|[**newsletterUnsubscribeGet**](#newsletterunsubscribeget) | **GET** /newsletter/unsubscribe | Unsubscribe from newsletter|

# **newsletterSearchGet**
> ModelsPaginatedNewsletterSubscriptionResponse newsletterSearchGet()

Search newsletter subscriptions using all available filters (Admin only)

### Example

```typescript
import {
    NewsletterApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new NewsletterApi(configuration);

let createdAfter: string; // (optional) (default to undefined)
let createdBefore: string; // (optional) (default to undefined)
let limit: number; // (optional) (default to undefined)
let page: number; // (optional) (default to undefined)
let q: string; // (optional) (default to undefined)
let status: 'active' | 'unsubscribed'; // (optional) (default to undefined)
let subscribedAfter: string; // (optional) (default to undefined)
let subscribedBefore: string; // (optional) (default to undefined)
let unsubscribedAfter: string; // (optional) (default to undefined)
let unsubscribedBefore: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.newsletterSearchGet(
    createdAfter,
    createdBefore,
    limit,
    page,
    q,
    status,
    subscribedAfter,
    subscribedBefore,
    unsubscribedAfter,
    unsubscribedBefore
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createdAfter** | [**string**] |  | (optional) defaults to undefined|
| **createdBefore** | [**string**] |  | (optional) defaults to undefined|
| **limit** | [**number**] |  | (optional) defaults to undefined|
| **page** | [**number**] |  | (optional) defaults to undefined|
| **q** | [**string**] |  | (optional) defaults to undefined|
| **status** | [**&#39;active&#39; | &#39;unsubscribed&#39;**]**Array<&#39;active&#39; &#124; &#39;unsubscribed&#39;>** |  | (optional) defaults to undefined|
| **subscribedAfter** | [**string**] |  | (optional) defaults to undefined|
| **subscribedBefore** | [**string**] |  | (optional) defaults to undefined|
| **unsubscribedAfter** | [**string**] |  | (optional) defaults to undefined|
| **unsubscribedBefore** | [**string**] |  | (optional) defaults to undefined|


### Return type

**ModelsPaginatedNewsletterSubscriptionResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Newsletter subscriptions found |  -  |
|**400** | Bad request |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **newsletterSignupPost**
> ModelsStandardNewsletterSignupResponse newsletterSignupPost(request)

Subscribe potential customers to newsletters

### Example

```typescript
import {
    NewsletterApi,
    Configuration,
    ModelsNewsletterSignupRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new NewsletterApi(configuration);

let request: ModelsNewsletterSignupRequest; //Newsletter signup request

const { status, data } = await apiInstance.newsletterSignupPost(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ModelsNewsletterSignupRequest**| Newsletter signup request | |


### Return type

**ModelsStandardNewsletterSignupResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Newsletter signup successful |  -  |
|**400** | Bad request |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **newsletterUnsubscribeGet**
> ModelsStandardNewsletterUnsubscribeResponse newsletterUnsubscribeGet()

Unsubscribe using token from newsletter email link

### Example

```typescript
import {
    NewsletterApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new NewsletterApi(configuration);

let email: string; //Subscriber email (default to undefined)

const { status, data } = await apiInstance.newsletterUnsubscribeGet(
    email
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **email** | [**string**] | Subscriber email | defaults to undefined|


### Return type

**ModelsStandardNewsletterUnsubscribeResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Unsubscribed successfully |  -  |
|**400** | Bad request |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

