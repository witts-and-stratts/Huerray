# CampaignsApi

All URIs are relative to */api/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**campaignsIdApplicationsGet**](#campaignsidapplicationsget) | **GET** /campaigns/{id}/applications | Get campaign applications|
|[**campaignsIdApprovePut**](#campaignsidapproveput) | **PUT** /campaigns/{id}/approve | Admin approve campaign|
|[**campaignsIdDecisionPut**](#campaignsiddecisionput) | **PUT** /campaigns/{id}/decision | Brand decision on campaign|
|[**campaignsIdDelete**](#campaignsiddelete) | **DELETE** /campaigns/{id} | Delete campaign|
|[**campaignsIdGet**](#campaignsidget) | **GET** /campaigns/{id} | Get campaign by ID|
|[**campaignsIdPut**](#campaignsidput) | **PUT** /campaigns/{id} | Update campaign|
|[**campaignsIdStatusPut**](#campaignsidstatusput) | **PUT** /campaigns/{id}/status | Update campaign status|
|[**campaignsIdVideoSubmissionsGet**](#campaignsidvideosubmissionsget) | **GET** /campaigns/{id}/video-submissions | Get video submissions by campaign ID|
|[**campaignsPost**](#campaignspost) | **POST** /campaigns | Create a new campaign|
|[**campaignsSearchGet**](#campaignssearchget) | **GET** /campaigns/search | Search campaigns|

# **campaignsIdApplicationsGet**
> ModelsStandardGigApplicationResponses campaignsIdApplicationsGet()

Get all applications for a campaign\'s gigs

### Example

```typescript
import {
    CampaignsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CampaignsApi(configuration);

let id: string; //Campaign ID (default to undefined)

const { status, data } = await apiInstance.campaignsIdApplicationsGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Campaign ID | defaults to undefined|


### Return type

**ModelsStandardGigApplicationResponses**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **campaignsIdApprovePut**
> ModelsStandardCampaignResponse campaignsIdApprovePut(request)

Admin approve or reject a campaign

### Example

```typescript
import {
    CampaignsApi,
    Configuration,
    ModelsAdminCampaignApprovalRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CampaignsApi(configuration);

let id: string; //Campaign ID (default to undefined)
let request: ModelsAdminCampaignApprovalRequest; //Campaign approval request

const { status, data } = await apiInstance.campaignsIdApprovePut(
    id,
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ModelsAdminCampaignApprovalRequest**| Campaign approval request | |
| **id** | [**string**] | Campaign ID | defaults to undefined|


### Return type

**ModelsStandardCampaignResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Campaign approved successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**404** | Campaign not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **campaignsIdDecisionPut**
> ModelsStandardCampaignResponse campaignsIdDecisionPut(request)

Brand accepts or declines approved campaign

### Example

```typescript
import {
    CampaignsApi,
    Configuration,
    ModelsBrandCampaignDecisionRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CampaignsApi(configuration);

let id: string; //Campaign ID (default to undefined)
let request: ModelsBrandCampaignDecisionRequest; //Decision request

const { status, data } = await apiInstance.campaignsIdDecisionPut(
    id,
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ModelsBrandCampaignDecisionRequest**| Decision request | |
| **id** | [**string**] | Campaign ID | defaults to undefined|


### Return type

**ModelsStandardCampaignResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Campaign decision recorded successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **campaignsIdDelete**
> ModelsStandardGenericResponse campaignsIdDelete()

Delete a campaign

### Example

```typescript
import {
    CampaignsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CampaignsApi(configuration);

let id: string; //Campaign ID (default to undefined)

const { status, data } = await apiInstance.campaignsIdDelete(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Campaign ID | defaults to undefined|


### Return type

**ModelsStandardGenericResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Campaign deleted successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **campaignsIdGet**
> ModelsStandardCampaignResponse campaignsIdGet()

Get a specific campaign by its ID

### Example

```typescript
import {
    CampaignsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CampaignsApi(configuration);

let id: string; //Campaign ID (default to undefined)

const { status, data } = await apiInstance.campaignsIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Campaign ID | defaults to undefined|


### Return type

**ModelsStandardCampaignResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Campaign details |  -  |
|**400** | Bad request |  -  |
|**404** | Campaign not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **campaignsIdPut**
> ModelsStandardCampaignResponse campaignsIdPut(request)

Update an existing campaign

### Example

```typescript
import {
    CampaignsApi,
    Configuration,
    ModelsUpdateCampaignRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CampaignsApi(configuration);

let id: string; //Campaign ID (default to undefined)
let request: ModelsUpdateCampaignRequest; //Campaign update request

const { status, data } = await apiInstance.campaignsIdPut(
    id,
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ModelsUpdateCampaignRequest**| Campaign update request | |
| **id** | [**string**] | Campaign ID | defaults to undefined|


### Return type

**ModelsStandardCampaignResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Campaign updated successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **campaignsIdStatusPut**
> ModelsStandardGenericResponse campaignsIdStatusPut(request)

Update campaign status

### Example

```typescript
import {
    CampaignsApi,
    Configuration,
    ModelsCampaignStatusUpdateRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CampaignsApi(configuration);

let id: string; //Campaign ID (default to undefined)
let request: ModelsCampaignStatusUpdateRequest; //Status update request

const { status, data } = await apiInstance.campaignsIdStatusPut(
    id,
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ModelsCampaignStatusUpdateRequest**| Status update request | |
| **id** | [**string**] | Campaign ID | defaults to undefined|


### Return type

**ModelsStandardGenericResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Campaign status updated successfully |  -  |
|**400** | Bad request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **campaignsIdVideoSubmissionsGet**
> ModelsStandardVideoSubmissionResponses campaignsIdVideoSubmissionsGet()

Get all video submissions associated with a campaign

### Example

```typescript
import {
    CampaignsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CampaignsApi(configuration);

let id: string; //Campaign ID (default to undefined)

const { status, data } = await apiInstance.campaignsIdVideoSubmissionsGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Campaign ID | defaults to undefined|


### Return type

**ModelsStandardVideoSubmissionResponses**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **campaignsPost**
> ModelsStandardCampaignResponse campaignsPost(request)

Create a new campaign for a brand

### Example

```typescript
import {
    CampaignsApi,
    Configuration,
    ModelsCreateCampaignRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CampaignsApi(configuration);

let request: ModelsCreateCampaignRequest; //Campaign creation request

const { status, data } = await apiInstance.campaignsPost(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ModelsCreateCampaignRequest**| Campaign creation request | |


### Return type

**ModelsStandardCampaignResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Campaign created successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **campaignsSearchGet**
> ModelsPaginatedCampaignResponse campaignsSearchGet()

Admin can search all campaigns with advanced filters but restricted for Brands

### Example

```typescript
import {
    CampaignsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CampaignsApi(configuration);

let allowMultiple: boolean; // (optional) (default to undefined)
let brandId: string; // (optional) (default to undefined)
let category: 'mobile_phones' | 'laptops' | 'gadgets' | 'electronics' | 'smart_watch' | 'headphones' | 'gaming' | 'software' | 'fashion' | 'clothing' | 'footwear' | 'accessories' | 'jewelry' | 'watches' | 'bags' | 'sunglasses' | 'beauty' | 'perfumes' | 'cosmetics' | 'skincare' | 'haircare' | 'makeup' | 'nail_care' | 'personal_care' | 'food' | 'beverage' | 'snacks' | 'restaurant' | 'alcohol' | 'coffee' | 'tea' | 'health_food' | 'fitness' | 'wellness' | 'supplements' | 'medical' | 'yoga' | 'gym' | 'sports' | 'home' | 'decor' | 'furniture' | 'kitchen' | 'appliances' | 'gardening' | 'pets' | 'books' | 'travel' | 'hotels' | 'tourism' | 'events' | 'entertainment' | 'movies' | 'music' | 'finance' | 'banking' | 'insurance' | 'education' | 'services' | 'cars' | 'motorcycles' | 'auto_parts' | 'other'; // (optional) (default to undefined)
let contentType: 'video' | 'image' | 'pdf'; // (optional) (default to undefined)
let createdAfter: string; // (optional) (default to undefined)
let createdBefore: string; // (optional) (default to undefined)
let limit: number; // (optional) (default to undefined)
let maxCreators: number; // (optional) (default to undefined)
let maxDuration: number; // (optional) (default to undefined)
let maxVideos: number; // (optional) (default to undefined)
let minCreators: number; // (optional) (default to undefined)
let minDuration: number; // (optional) (default to undefined)
let minVideos: number; // (optional) (default to undefined)
let page: number; // (optional) (default to undefined)
let q: string; // (optional) (default to undefined)
let status: 'created' | 'pending_approval' | 'returned' | 'gigs_approved' | 'running' | 'completed' | 'deactivated'; // (optional) (default to undefined)
let videoFormat: 'mp4' | 'mov' | 'avi' | 'mkv' | 'webm' | 'mp4' | 'mov' | 'avi' | 'mkv' | 'webm'; // (optional) (default to undefined)

const { status, data } = await apiInstance.campaignsSearchGet(
    allowMultiple,
    brandId,
    category,
    contentType,
    createdAfter,
    createdBefore,
    limit,
    maxCreators,
    maxDuration,
    maxVideos,
    minCreators,
    minDuration,
    minVideos,
    page,
    q,
    status,
    videoFormat
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **allowMultiple** | [**boolean**] |  | (optional) defaults to undefined|
| **brandId** | [**string**] |  | (optional) defaults to undefined|
| **category** | [**&#39;mobile_phones&#39; | &#39;laptops&#39; | &#39;gadgets&#39; | &#39;electronics&#39; | &#39;smart_watch&#39; | &#39;headphones&#39; | &#39;gaming&#39; | &#39;software&#39; | &#39;fashion&#39; | &#39;clothing&#39; | &#39;footwear&#39; | &#39;accessories&#39; | &#39;jewelry&#39; | &#39;watches&#39; | &#39;bags&#39; | &#39;sunglasses&#39; | &#39;beauty&#39; | &#39;perfumes&#39; | &#39;cosmetics&#39; | &#39;skincare&#39; | &#39;haircare&#39; | &#39;makeup&#39; | &#39;nail_care&#39; | &#39;personal_care&#39; | &#39;food&#39; | &#39;beverage&#39; | &#39;snacks&#39; | &#39;restaurant&#39; | &#39;alcohol&#39; | &#39;coffee&#39; | &#39;tea&#39; | &#39;health_food&#39; | &#39;fitness&#39; | &#39;wellness&#39; | &#39;supplements&#39; | &#39;medical&#39; | &#39;yoga&#39; | &#39;gym&#39; | &#39;sports&#39; | &#39;home&#39; | &#39;decor&#39; | &#39;furniture&#39; | &#39;kitchen&#39; | &#39;appliances&#39; | &#39;gardening&#39; | &#39;pets&#39; | &#39;books&#39; | &#39;travel&#39; | &#39;hotels&#39; | &#39;tourism&#39; | &#39;events&#39; | &#39;entertainment&#39; | &#39;movies&#39; | &#39;music&#39; | &#39;finance&#39; | &#39;banking&#39; | &#39;insurance&#39; | &#39;education&#39; | &#39;services&#39; | &#39;cars&#39; | &#39;motorcycles&#39; | &#39;auto_parts&#39; | &#39;other&#39;**]**Array<&#39;mobile_phones&#39; &#124; &#39;laptops&#39; &#124; &#39;gadgets&#39; &#124; &#39;electronics&#39; &#124; &#39;smart_watch&#39; &#124; &#39;headphones&#39; &#124; &#39;gaming&#39; &#124; &#39;software&#39; &#124; &#39;fashion&#39; &#124; &#39;clothing&#39; &#124; &#39;footwear&#39; &#124; &#39;accessories&#39; &#124; &#39;jewelry&#39; &#124; &#39;watches&#39; &#124; &#39;bags&#39; &#124; &#39;sunglasses&#39; &#124; &#39;beauty&#39; &#124; &#39;perfumes&#39; &#124; &#39;cosmetics&#39; &#124; &#39;skincare&#39; &#124; &#39;haircare&#39; &#124; &#39;makeup&#39; &#124; &#39;nail_care&#39; &#124; &#39;personal_care&#39; &#124; &#39;food&#39; &#124; &#39;beverage&#39; &#124; &#39;snacks&#39; &#124; &#39;restaurant&#39; &#124; &#39;alcohol&#39; &#124; &#39;coffee&#39; &#124; &#39;tea&#39; &#124; &#39;health_food&#39; &#124; &#39;fitness&#39; &#124; &#39;wellness&#39; &#124; &#39;supplements&#39; &#124; &#39;medical&#39; &#124; &#39;yoga&#39; &#124; &#39;gym&#39; &#124; &#39;sports&#39; &#124; &#39;home&#39; &#124; &#39;decor&#39; &#124; &#39;furniture&#39; &#124; &#39;kitchen&#39; &#124; &#39;appliances&#39; &#124; &#39;gardening&#39; &#124; &#39;pets&#39; &#124; &#39;books&#39; &#124; &#39;travel&#39; &#124; &#39;hotels&#39; &#124; &#39;tourism&#39; &#124; &#39;events&#39; &#124; &#39;entertainment&#39; &#124; &#39;movies&#39; &#124; &#39;music&#39; &#124; &#39;finance&#39; &#124; &#39;banking&#39; &#124; &#39;insurance&#39; &#124; &#39;education&#39; &#124; &#39;services&#39; &#124; &#39;cars&#39; &#124; &#39;motorcycles&#39; &#124; &#39;auto_parts&#39; &#124; &#39;other&#39;>** |  | (optional) defaults to undefined|
| **contentType** | [**&#39;video&#39; | &#39;image&#39; | &#39;pdf&#39;**]**Array<&#39;video&#39; &#124; &#39;image&#39; &#124; &#39;pdf&#39;>** |  | (optional) defaults to undefined|
| **createdAfter** | [**string**] |  | (optional) defaults to undefined|
| **createdBefore** | [**string**] |  | (optional) defaults to undefined|
| **limit** | [**number**] |  | (optional) defaults to undefined|
| **maxCreators** | [**number**] |  | (optional) defaults to undefined|
| **maxDuration** | [**number**] |  | (optional) defaults to undefined|
| **maxVideos** | [**number**] |  | (optional) defaults to undefined|
| **minCreators** | [**number**] |  | (optional) defaults to undefined|
| **minDuration** | [**number**] |  | (optional) defaults to undefined|
| **minVideos** | [**number**] |  | (optional) defaults to undefined|
| **page** | [**number**] |  | (optional) defaults to undefined|
| **q** | [**string**] |  | (optional) defaults to undefined|
| **status** | [**&#39;created&#39; | &#39;pending_approval&#39; | &#39;returned&#39; | &#39;gigs_approved&#39; | &#39;running&#39; | &#39;completed&#39; | &#39;deactivated&#39;**]**Array<&#39;created&#39; &#124; &#39;pending_approval&#39; &#124; &#39;returned&#39; &#124; &#39;gigs_approved&#39; &#124; &#39;running&#39; &#124; &#39;completed&#39; &#124; &#39;deactivated&#39;>** |  | (optional) defaults to undefined|
| **videoFormat** | [**&#39;mp4&#39; | &#39;mov&#39; | &#39;avi&#39; | &#39;mkv&#39; | &#39;webm&#39; | &#39;mp4&#39; | &#39;mov&#39; | &#39;avi&#39; | &#39;mkv&#39; | &#39;webm&#39;**]**Array<&#39;mp4&#39; &#124; &#39;mov&#39; &#124; &#39;avi&#39; &#124; &#39;mkv&#39; &#124; &#39;webm&#39; &#124; &#39;mp4&#39; &#124; &#39;mov&#39; &#124; &#39;avi&#39; &#124; &#39;mkv&#39; &#124; &#39;webm&#39;>** |  | (optional) defaults to undefined|


### Return type

**ModelsPaginatedCampaignResponse**

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
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

