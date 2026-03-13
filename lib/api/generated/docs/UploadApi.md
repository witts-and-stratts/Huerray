# UploadApi

All URIs are relative to */api/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**uploadsApplicationVideoPost**](#uploadsapplicationvideopost) | **POST** /uploads/application-video | Upload application video|
|[**uploadsDocumentsPost**](#uploadsdocumentspost) | **POST** /uploads/documents | Upload documents|
|[**uploadsImagesPost**](#uploadsimagespost) | **POST** /uploads/images | Upload images|
|[**uploadsPreviewDocumentsFilenameGet**](#uploadspreviewdocumentsfilenameget) | **GET** /uploads/preview/documents/{filename} | Preview a document|
|[**uploadsPreviewImagesFilenameGet**](#uploadspreviewimagesfilenameget) | **GET** /uploads/preview/images/{filename} | Preview an image|
|[**uploadsPreviewVideosFilenameGet**](#uploadspreviewvideosfilenameget) | **GET** /uploads/preview/videos/{filename} | Preview a video|
|[**uploadsVideoSubmissionPost**](#uploadsvideosubmissionpost) | **POST** /uploads/video-submission | Upload video submission|
|[**uploadsVideosPost**](#uploadsvideospost) | **POST** /uploads/videos | Upload videos|

# **uploadsApplicationVideoPost**
> ModelsStandardApplicationVideoUploadResponse uploadsApplicationVideoPost()

Upload an application video with unique naming for creator profile

### Example

```typescript
import {
    UploadApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new UploadApi(configuration);

let video: File; //Video file (default to undefined)
let thumbnailWidth: number; //Optional thumbnail width in pixels (optional) (default to undefined)
let thumbnailHeight: number; //Optional thumbnail height in pixels (optional) (default to undefined)

const { status, data } = await apiInstance.uploadsApplicationVideoPost(
    video,
    thumbnailWidth,
    thumbnailHeight
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **video** | [**File**] | Video file | defaults to undefined|
| **thumbnailWidth** | [**number**] | Optional thumbnail width in pixels | (optional) defaults to undefined|
| **thumbnailHeight** | [**number**] | Optional thumbnail height in pixels | (optional) defaults to undefined|


### Return type

**ModelsStandardApplicationVideoUploadResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Application video uploaded successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

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
let thumbnailWidth: number; //Optional thumbnail width in pixels (optional) (default to undefined)
let thumbnailHeight: number; //Optional thumbnail height in pixels (optional) (default to undefined)

const { status, data } = await apiInstance.uploadsDocumentsPost(
    documents,
    thumbnailWidth,
    thumbnailHeight
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **documents** | [**File**] | PDF files | defaults to undefined|
| **thumbnailWidth** | [**number**] | Optional thumbnail width in pixels | (optional) defaults to undefined|
| **thumbnailHeight** | [**number**] | Optional thumbnail height in pixels | (optional) defaults to undefined|


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

# **uploadsVideoSubmissionPost**
> ModelsStandardVideoSubmissionUploadResponse uploadsVideoSubmissionPost()

Upload a video file for a gig submission with unique naming

### Example

```typescript
import {
    UploadApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new UploadApi(configuration);

let gigId: string; //Gig ID (default to undefined)
let video: File; //Video file (default to undefined)
let thumbnailWidth: number; //Optional thumbnail width in pixels (optional) (default to undefined)
let thumbnailHeight: number; //Optional thumbnail height in pixels (optional) (default to undefined)

const { status, data } = await apiInstance.uploadsVideoSubmissionPost(
    gigId,
    video,
    thumbnailWidth,
    thumbnailHeight
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **gigId** | [**string**] | Gig ID | defaults to undefined|
| **video** | [**File**] | Video file | defaults to undefined|
| **thumbnailWidth** | [**number**] | Optional thumbnail width in pixels | (optional) defaults to undefined|
| **thumbnailHeight** | [**number**] | Optional thumbnail height in pixels | (optional) defaults to undefined|


### Return type

**ModelsStandardVideoSubmissionUploadResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Video uploaded successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **uploadsVideosPost**
> ModelsStandardFileUploadResponse uploadsVideosPost()

Upload one or more video files

### Example

```typescript
import {
    UploadApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new UploadApi(configuration);

let videos: File; //Video files (default to undefined)
let thumbnailWidth: number; //Optional thumbnail width in pixels (optional) (default to undefined)
let thumbnailHeight: number; //Optional thumbnail height in pixels (optional) (default to undefined)

const { status, data } = await apiInstance.uploadsVideosPost(
    videos,
    thumbnailWidth,
    thumbnailHeight
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **videos** | [**File**] | Video files | defaults to undefined|
| **thumbnailWidth** | [**number**] | Optional thumbnail width in pixels | (optional) defaults to undefined|
| **thumbnailHeight** | [**number**] | Optional thumbnail height in pixels | (optional) defaults to undefined|


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
|**200** | Videos uploaded successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

