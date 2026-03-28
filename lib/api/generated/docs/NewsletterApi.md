# NewsletterApi

All URIs are relative to */api/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**newsletterSignupPost**](#newslettersignuppost) | **POST** /newsletter/signup | Newsletter signup|
|[**newsletterUnsubscribeGet**](#newsletterunsubscribeget) | **GET** /newsletter/unsubscribe | Unsubscribe from newsletter|

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

let token: string; //Unsubscribe token (default to undefined)

const { status, data } = await apiInstance.newsletterUnsubscribeGet(
    token
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **token** | [**string**] | Unsubscribe token | defaults to undefined|


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

