# TranslationApi

All URIs are relative to */api/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**translationLanguagesGet**](#translationlanguagesget) | **GET** /translation/languages | Get supported languages from DeepL API|
|[**translationTranslatePost**](#translationtranslatepost) | **POST** /translation/translate | Translate text using DeepL API|

# **translationLanguagesGet**
> ServiceStandardLanguagesResponse translationLanguagesGet()

Get list of supported languages for translation. Only accessible from web clients.

### Example

```typescript
import {
    TranslationApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new TranslationApi(configuration);

let type: 'source' | 'target'; //Language type: \'source\' or \'target\' (optional) (default to undefined)

const { status, data } = await apiInstance.translationLanguagesGet(
    type
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **type** | [**&#39;source&#39; | &#39;target&#39;**]**Array<&#39;source&#39; &#124; &#39;target&#39;>** | Language type: \&#39;source\&#39; or \&#39;target\&#39; | (optional) defaults to undefined|


### Return type

**ServiceStandardLanguagesResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Languages retrieved successfully |  -  |
|**403** | Access denied - web client only |  -  |
|**500** | Translation service error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **translationTranslatePost**
> ServiceStandardTranslateResponse translationTranslatePost(translation)

Proxy endpoint for DeepL translation API to bypass CORS restrictions. Only accessible from web clients.

### Example

```typescript
import {
    TranslationApi,
    Configuration,
    ServiceTranslateRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new TranslationApi(configuration);

let translation: ServiceTranslateRequest; //Translation request

const { status, data } = await apiInstance.translationTranslatePost(
    translation
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **translation** | **ServiceTranslateRequest**| Translation request | |


### Return type

**ServiceStandardTranslateResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Translation successful |  -  |
|**400** | Bad request |  -  |
|**403** | Access denied - web client only |  -  |
|**500** | Translation service error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

