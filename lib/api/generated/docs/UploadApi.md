# UploadApi

All URIs are relative to */api/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**uploadsDocumentsPost**](#uploadsdocumentspost) | **POST** /uploads/documents | Upload documents|
|[**uploadsImagesPost**](#uploadsimagespost) | **POST** /uploads/images | Upload images|
|[**uploadsPreviewDocumentsFilenameGet**](#uploadspreviewdocumentsfilenameget) | **GET** /uploads/preview/documents/{filename} | Preview a document|
|[**uploadsPreviewImagesFilenameGet**](#uploadspreviewimagesfilenameget) | **GET** /uploads/preview/images/{filename} | Preview an image|
|[**uploadsPreviewVideosFilenameGet**](#uploadspreviewvideosfilenameget) | **GET** /uploads/preview/videos/{filename} | Preview a video|
|[**uploadsVideoMultipartAbortPost**](#uploadsvideomultipartabortpost) | **POST** /uploads/video-multipart/abort | Cancel a direct video upload|
|[**uploadsVideoMultipartCompletePost**](#uploadsvideomultipartcompletepost) | **POST** /uploads/video-multipart/complete | Finish a direct video upload|
|[**uploadsVideoMultipartInitPost**](#uploadsvideomultipartinitpost) | **POST** /uploads/video-multipart/init | Start a direct video upload|

# **uploadsDocumentsPost**
> ModelsStandardFileUploadResponse uploadsDocumentsPost()

Upload one or more PDF files

### Example

```typescript
import {
    UploadApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new UploadApi(configuration);

let documents: File; //PDF files (default to undefined)

const { status, data } = await apiInstance.uploadsDocumentsPost(
    documents
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **documents** | [**File**] | PDF files | defaults to undefined|


### Return type

**ModelsStandardFileUploadResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Documents uploaded successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **uploadsImagesPost**
> ModelsStandardFileUploadResponse uploadsImagesPost()

Upload one or more image files

### Example

```typescript
import {
    UploadApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new UploadApi(configuration);

let images: File; //Image files (default to undefined)

const { status, data } = await apiInstance.uploadsImagesPost(
    images
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **images** | [**File**] | Image files | defaults to undefined|


### Return type

**ModelsStandardFileUploadResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Images uploaded successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **uploadsPreviewDocumentsFilenameGet**
> ModelsStandardFilePreviewResponse uploadsPreviewDocumentsFilenameGet()

Preview a document file without allowing download

### Example

```typescript
import {
    UploadApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new UploadApi(configuration);

let filename: string; //Document filename (default to undefined)

const { status, data } = await apiInstance.uploadsPreviewDocumentsFilenameGet(
    filename
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **filename** | [**string**] | Document filename | defaults to undefined|


### Return type

**ModelsStandardFilePreviewResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Document preview data |  -  |
|**400** | Bad request |  -  |
|**404** | File not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **uploadsPreviewImagesFilenameGet**
> ModelsStandardFilePreviewResponse uploadsPreviewImagesFilenameGet()

Preview an image file without allowing download

### Example

```typescript
import {
    UploadApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new UploadApi(configuration);

let filename: string; //Image filename (default to undefined)

const { status, data } = await apiInstance.uploadsPreviewImagesFilenameGet(
    filename
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **filename** | [**string**] | Image filename | defaults to undefined|


### Return type

**ModelsStandardFilePreviewResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Image preview data |  -  |
|**400** | Bad request |  -  |
|**404** | File not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **uploadsPreviewVideosFilenameGet**
> ModelsStandardFilePreviewResponse uploadsPreviewVideosFilenameGet()

Preview a video file without allowing download

### Example

```typescript
import {
    UploadApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new UploadApi(configuration);

let filename: string; //Video filename (default to undefined)

const { status, data } = await apiInstance.uploadsPreviewVideosFilenameGet(
    filename
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **filename** | [**string**] | Video filename | defaults to undefined|


### Return type

**ModelsStandardFilePreviewResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Video preview data |  -  |
|**400** | Bad request |  -  |
|**404** | File not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **uploadsVideoMultipartAbortPost**
> uploadsVideoMultipartAbortPost(request)

Discards an unfinished direct upload and the parts stored so far.

### Example

```typescript
import {
    UploadApi,
    Configuration,
    ModelsVideoMultipartAbortRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new UploadApi(configuration);

let request: ModelsVideoMultipartAbortRequest; //Upload to cancel

const { status, data } = await apiInstance.uploadsVideoMultipartAbortPost(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ModelsVideoMultipartAbortRequest**| Upload to cancel | |


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Upload cancelled |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **uploadsVideoMultipartCompletePost**
> ModelsStandardVideoUploadResponse uploadsVideoMultipartCompletePost(request)

Assembles the uploaded parts into the video and validates it. Returns the same data as the regular video upload endpoints.

### Example

```typescript
import {
    UploadApi,
    Configuration,
    ModelsVideoMultipartCompleteRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new UploadApi(configuration);

let request: ModelsVideoMultipartCompleteRequest; //Upload to complete

const { status, data } = await apiInstance.uploadsVideoMultipartCompletePost(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ModelsVideoMultipartCompleteRequest**| Upload to complete | |


### Return type

**ModelsStandardVideoUploadResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Video uploaded successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**501** | Direct upload unavailable |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **uploadsVideoMultipartInitPost**
> ModelsStandardVideoMultipartInitResponse uploadsVideoMultipartInitPost(request)

The only way to upload videos. Purpose \"submission\" and \"application\" are for creators, \"campaign_sample\" is for brands; admins may use any. Starts a multipart upload straight to storage and returns presigned URLs. PUT each part\'s bytes to its URL (parts can be sent in parallel and retried individually), then call the complete endpoint. Responds 501 when storage isn\'t configured for direct uploads.

### Example

```typescript
import {
    UploadApi,
    Configuration,
    ModelsVideoMultipartInitRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new UploadApi(configuration);

let request: ModelsVideoMultipartInitRequest; //Upload details

const { status, data } = await apiInstance.uploadsVideoMultipartInitPost(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ModelsVideoMultipartInitRequest**| Upload details | |


### Return type

**ModelsStandardVideoMultipartInitResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Upload started |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Purpose not allowed for this user type |  -  |
|**501** | Direct upload unavailable |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

