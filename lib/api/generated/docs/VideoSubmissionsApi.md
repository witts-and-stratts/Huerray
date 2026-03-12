# VideoSubmissionsApi

All URIs are relative to */api/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**videosCampaignCampaignIdGet**](#videoscampaigncampaignidget) | **GET** /videos/campaign/{campaignId} | Get video submissions by campaign|
|[**videosGigGigIdGet**](#videosgiggigidget) | **GET** /videos/gig/{gigId} | Get video submissions by gig|
|[**videosIdDecisionPut**](#videosiddecisionput) | **PUT** /videos/{id}/decision | Brand makes decision on video submission|
|[**videosIdGet**](#videosidget) | **GET** /videos/{id} | Get video submission by ID|
|[**videosIdPut**](#videosidput) | **PUT** /videos/{id} | Update video submission|
|[**videosIdStatusPut**](#videosidstatusput) | **PUT** /videos/{id}/status | Update video submission status|
|[**videosIdSubmitPut**](#videosidsubmitput) | **PUT** /videos/{id}/submit | Submit video for approval|
|[**videosMySubmissionsGet**](#videosmysubmissionsget) | **GET** /videos/my-submissions | Get creator\&#39;s video submissions|
|[**videosPost**](#videospost) | **POST** /videos | Create video submission|
|[**videosSearchGet**](#videossearchget) | **GET** /videos/search | Search video submissions (Admin only)|

# **videosCampaignCampaignIdGet**
> ModelsStandardVideoSubmissionResponses videosCampaignCampaignIdGet()

Get video submissions for all gigs in a specific campaign with role-based filtering

### Example

```typescript
import {
    VideoSubmissionsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new VideoSubmissionsApi(configuration);

let campaignId: string; //Campaign ID (default to undefined)

const { status, data } = await apiInstance.videosCampaignCampaignIdGet(
    campaignId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **campaignId** | [**string**] | Campaign ID | defaults to undefined|


### Return type

**ModelsStandardVideoSubmissionResponses**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of video submissions for the campaign |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**404** | Campaign not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **videosGigGigIdGet**
> ModelsStandardVideoSubmissionResponses videosGigGigIdGet()

Get video submissions for a specific gig with role-based filtering

### Example

```typescript
import {
    VideoSubmissionsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new VideoSubmissionsApi(configuration);

let gigId: string; //Gig ID (default to undefined)

const { status, data } = await apiInstance.videosGigGigIdGet(
    gigId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **gigId** | [**string**] | Gig ID | defaults to undefined|


### Return type

**ModelsStandardVideoSubmissionResponses**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of video submissions for the gig |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**404** | Gig not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **videosIdDecisionPut**
> ModelsStandardVideoSubmissionResponse videosIdDecisionPut(data)

Brand accepts or rejects an approved video submission

### Example

```typescript
import {
    VideoSubmissionsApi,
    Configuration,
    ModelsBrandVideoDecisionRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new VideoSubmissionsApi(configuration);

let id: string; //Video Submission ID (default to undefined)
let data: ModelsBrandVideoDecisionRequest; //Brand decision data

const { status, data } = await apiInstance.videosIdDecisionPut(
    id,
    data
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **data** | **ModelsBrandVideoDecisionRequest**| Brand decision data | |
| **id** | [**string**] | Video Submission ID | defaults to undefined|


### Return type

**ModelsStandardVideoSubmissionResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Video submission decision made successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden - not authorized to make decision |  -  |
|**404** | Video submission not found |  -  |
|**422** | UnprocessableEntity |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **videosIdGet**
> ModelsStandardVideoSubmissionResponse videosIdGet()

Get a specific video submission by its ID

### Example

```typescript
import {
    VideoSubmissionsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new VideoSubmissionsApi(configuration);

let id: string; //Video Submission ID (default to undefined)

const { status, data } = await apiInstance.videosIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Video Submission ID | defaults to undefined|


### Return type

**ModelsStandardVideoSubmissionResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Video submission retrieved successfully |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**404** | Video submission not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **videosIdPut**
> ModelsStandardVideoSubmissionResponse videosIdPut(submission)

Creator updates their video submission

### Example

```typescript
import {
    VideoSubmissionsApi,
    Configuration,
    ModelsUpdateVideoSubmissionRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new VideoSubmissionsApi(configuration);

let id: string; //Video Submission ID (default to undefined)
let submission: ModelsUpdateVideoSubmissionRequest; //Video submission update data

const { status, data } = await apiInstance.videosIdPut(
    id,
    submission
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **submission** | **ModelsUpdateVideoSubmissionRequest**| Video submission update data | |
| **id** | [**string**] | Video Submission ID | defaults to undefined|


### Return type

**ModelsStandardVideoSubmissionResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Video submission updated successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden - not owner |  -  |
|**404** | Video submission not found |  -  |
|**422** | UnprocessableEntity |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **videosIdStatusPut**
> ModelsStandardVideoSubmissionResponse videosIdStatusPut(request)

Admin updates video submission status (approve/reject)

### Example

```typescript
import {
    VideoSubmissionsApi,
    Configuration,
    ModelsVideoSubmissionStatusUpdateRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new VideoSubmissionsApi(configuration);

let id: string; //Video Submission ID (default to undefined)
let request: ModelsVideoSubmissionStatusUpdateRequest; //Status update request

const { status, data } = await apiInstance.videosIdStatusPut(
    id,
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ModelsVideoSubmissionStatusUpdateRequest**| Status update request | |
| **id** | [**string**] | Video Submission ID | defaults to undefined|


### Return type

**ModelsStandardVideoSubmissionResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**404** | Video submission not found |  -  |
|**422** | UnprocessableEntity |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **videosIdSubmitPut**
> ModelsStandardVideoSubmissionResponse videosIdSubmitPut()

Creator submits their video submission for admin approval

### Example

```typescript
import {
    VideoSubmissionsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new VideoSubmissionsApi(configuration);

let id: string; //Video Submission ID (default to undefined)

const { status, data } = await apiInstance.videosIdSubmitPut(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Video Submission ID | defaults to undefined|


### Return type

**ModelsStandardVideoSubmissionResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Video submission submitted for approval successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden - not owner |  -  |
|**404** | Video submission not found |  -  |
|**422** | UnprocessableEntity |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **videosMySubmissionsGet**
> ModelsPaginatedVideoSubmissionResponse videosMySubmissionsGet()

Get all video submissions by the authenticated creator

### Example

```typescript
import {
    VideoSubmissionsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new VideoSubmissionsApi(configuration);

let gigId: string; //Filter by Gig ID (optional) (default to undefined)
let status: string; //Filter by status (optional) (default to undefined)

const { status, data } = await apiInstance.videosMySubmissionsGet(
    gigId,
    status
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **gigId** | [**string**] | Filter by Gig ID | (optional) defaults to undefined|
| **status** | [**string**] | Filter by status | (optional) defaults to undefined|


### Return type

**ModelsPaginatedVideoSubmissionResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Paginated list of creator\&#39;s video submissions |  -  |
|**401** | Unauthorized |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **videosPost**
> ModelsStandardVideoSubmissionResponse videosPost(submission)

Creator submits a video to a gig

### Example

```typescript
import {
    VideoSubmissionsApi,
    Configuration,
    ModelsCreateVideoSubmissionRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new VideoSubmissionsApi(configuration);

let submission: ModelsCreateVideoSubmissionRequest; //Video submission data

const { status, data } = await apiInstance.videosPost(
    submission
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **submission** | **ModelsCreateVideoSubmissionRequest**| Video submission data | |


### Return type

**ModelsStandardVideoSubmissionResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Video submission created successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**404** | Gig not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **videosSearchGet**
> ModelsPaginatedVideoSubmissionResponse videosSearchGet()

Admin can search all video submissions with advanced filters

### Example

```typescript
import {
    VideoSubmissionsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new VideoSubmissionsApi(configuration);

let campaignId: string; // (optional) (default to undefined)
let createdAfter: string; // (optional) (default to undefined)
let createdBefore: string; // (optional) (default to undefined)
let creatorId: string; // (optional) (default to undefined)
let gigId: string; // (optional) (default to undefined)
let limit: number; // (optional) (default to undefined)
let page: number; // (optional) (default to undefined)
let q: string; // (optional) (default to undefined)
let status: 'created' | 'pending_approval' | 'approved' | 'rejected' | 'accepted' | 'returned' | 'created' | 'pending_approval' | 'approved' | 'rejected' | 'accepted'; // (optional) (default to undefined)

const { status, data } = await apiInstance.videosSearchGet(
    campaignId,
    createdAfter,
    createdBefore,
    creatorId,
    gigId,
    limit,
    page,
    q,
    status
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **campaignId** | [**string**] |  | (optional) defaults to undefined|
| **createdAfter** | [**string**] |  | (optional) defaults to undefined|
| **createdBefore** | [**string**] |  | (optional) defaults to undefined|
| **creatorId** | [**string**] |  | (optional) defaults to undefined|
| **gigId** | [**string**] |  | (optional) defaults to undefined|
| **limit** | [**number**] |  | (optional) defaults to undefined|
| **page** | [**number**] |  | (optional) defaults to undefined|
| **q** | [**string**] |  | (optional) defaults to undefined|
| **status** | [**&#39;created&#39; | &#39;pending_approval&#39; | &#39;approved&#39; | &#39;rejected&#39; | &#39;accepted&#39; | &#39;returned&#39; | &#39;created&#39; | &#39;pending_approval&#39; | &#39;approved&#39; | &#39;rejected&#39; | &#39;accepted&#39;**]**Array<&#39;created&#39; &#124; &#39;pending_approval&#39; &#124; &#39;approved&#39; &#124; &#39;rejected&#39; &#124; &#39;accepted&#39; &#124; &#39;returned&#39; &#124; &#39;created&#39; &#124; &#39;pending_approval&#39; &#124; &#39;approved&#39; &#124; &#39;rejected&#39; &#124; &#39;accepted&#39;>** |  | (optional) defaults to undefined|


### Return type

**ModelsPaginatedVideoSubmissionResponse**

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
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

