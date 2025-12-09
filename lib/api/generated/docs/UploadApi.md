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
|[**uploadsServeDocumentsFilenameGet**](#uploadsservedocumentsfilenameget) | **GET** /uploads/serve/documents/{filename} | Serve document file|
|[**uploadsServeImagesFilenameGet**](#uploadsserveimagesfilenameget) | **GET** /uploads/serve/images/{filename} | Serve image file|
|[**uploadsServeVideosFilenameGet**](#uploadsservevideosfilenameget) | **GET** /uploads/serve/videos/{filename} | Serve video file|
|[**uploadsVideoSubmissionPost**](#uploadsvideosubmissionpost) | **POST** /uploads/video-submission | Upload video submission|
|[**uploadsVideosPost**](#uploadsvideospost) | **POST** /uploads/videos | Upload videos|

# **uploadsApplicationVideoPost**
> ModelsStandardResponse uploadsApplicationVideoPost()

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

const { status, data } = await apiInstance.uploadsApplicationVideoPost(
    video
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **video** | [**File**] | Video file | defaults to undefined|


### Return type

**ModelsStandardResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

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
> ModelsStandardResponse uploadsDocumentsPost()

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

**ModelsStandardResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

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
> ModelsStandardResponse uploadsImagesPost()

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

**ModelsStandardResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

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
> ModelsStandardResponse uploadsPreviewDocumentsFilenameGet()

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

**ModelsStandardResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

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
> ModelsStandardResponse uploadsPreviewImagesFilenameGet()

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

**ModelsStandardResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

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
> ModelsStandardResponse uploadsPreviewVideosFilenameGet()

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

**ModelsStandardResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

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

# **uploadsServeDocumentsFilenameGet**
> File uploadsServeDocumentsFilenameGet()

Serve PDF document files for preview with controlled download permissions. Download is only allowed for admin users.

### Example

```typescript
import {
    UploadApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new UploadApi(configuration);

let filename: string; //Document filename (default to undefined)
let download: boolean; //Set to true to download the file (requires admin privileges) (optional) (default to undefined)

const { status, data } = await apiInstance.uploadsServeDocumentsFilenameGet(
    filename,
    download
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **filename** | [**string**] | Document filename | defaults to undefined|
| **download** | [**boolean**] | Set to true to download the file (requires admin privileges) | (optional) defaults to undefined|


### Return type

**File**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | PDF document file |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Document download not allowed for this user type |  -  |
|**404** | Document not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **uploadsServeImagesFilenameGet**
> File uploadsServeImagesFilenameGet()

Serve image files for preview with controlled download permissions. Download is only allowed for admin users.

### Example

```typescript
import {
    UploadApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new UploadApi(configuration);

let filename: string; //Image filename (default to undefined)
let download: boolean; //Set to true to download the file (requires admin privileges) (optional) (default to undefined)

const { status, data } = await apiInstance.uploadsServeImagesFilenameGet(
    filename,
    download
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **filename** | [**string**] | Image filename | defaults to undefined|
| **download** | [**boolean**] | Set to true to download the file (requires admin privileges) | (optional) defaults to undefined|


### Return type

**File**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Image file |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Image download not allowed for this user type |  -  |
|**404** | Image not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **uploadsServeVideosFilenameGet**
> File uploadsServeVideosFilenameGet()

Serve video files for preview with controlled download permissions. Download is only allowed for brand users and admins.

### Example

```typescript
import {
    UploadApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new UploadApi(configuration);

let filename: string; //Video filename (default to undefined)
let download: boolean; //Set to true to download the file (requires brand or admin privileges) (optional) (default to undefined)

const { status, data } = await apiInstance.uploadsServeVideosFilenameGet(
    filename,
    download
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **filename** | [**string**] | Video filename | defaults to undefined|
| **download** | [**boolean**] | Set to true to download the file (requires brand or admin privileges) | (optional) defaults to undefined|


### Return type

**File**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Video file |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Video download not allowed for this user type |  -  |
|**404** | Video not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **uploadsVideoSubmissionPost**
> ModelsStandardResponse uploadsVideoSubmissionPost()

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

const { status, data } = await apiInstance.uploadsVideoSubmissionPost(
    gigId,
    video
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **gigId** | [**string**] | Gig ID | defaults to undefined|
| **video** | [**File**] | Video file | defaults to undefined|


### Return type

**ModelsStandardResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

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
> ModelsStandardResponse uploadsVideosPost()

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

const { status, data } = await apiInstance.uploadsVideosPost(
    videos
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **videos** | [**File**] | Video files | defaults to undefined|


### Return type

**ModelsStandardResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

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

