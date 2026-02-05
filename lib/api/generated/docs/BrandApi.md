# BrandApi

All URIs are relative to */api/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**brandsGet**](#brandsget) | **GET** /brands | Get user brands|
|[**brandsGigsGet**](#brandsgigsget) | **GET** /brands/gigs | Search gigs for brand|
|[**brandsIdDelete**](#brandsiddelete) | **DELETE** /brands/{id} | Delete brand|
|[**brandsIdGet**](#brandsidget) | **GET** /brands/{id} | Get brand by ID|
|[**brandsIdStatusPut**](#brandsidstatusput) | **PUT** /brands/{id}/status | Update brand status|
|[**brandsPost**](#brandspost) | **POST** /brands | Create brand|
|[**brandsPut**](#brandsput) | **PUT** /brands | Update brand|
|[**brandsSearchCampaignsGet**](#brandssearchcampaignsget) | **GET** /brands/search/campaigns | Search campaigns for brand|
|[**brandsSearchCreatorsGet**](#brandssearchcreatorsget) | **GET** /brands/search/creators | Search creators for brand|
|[**brandsSearchGet**](#brandssearchget) | **GET** /brands/search | Search brands|
|[**brandsSearchVideoSubmissionsGet**](#brandssearchvideosubmissionsget) | **GET** /brands/search/video-submissions | Search video submissions for brand|

# **brandsGet**
> ModelsStandardBrandResponse brandsGet()

Get brands for the authenticated user

### Example

```typescript
import {
    BrandApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new BrandApi(configuration);

const { status, data } = await apiInstance.brandsGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ModelsStandardBrandResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Brands retrieved successfully |  -  |
|**401** | Unauthorized |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **brandsGigsGet**
> ModelsPaginatedGigBrandResponse brandsGigsGet()

Search gigs associated with the authenticated brand user

### Example

```typescript
import {
    BrandApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new BrandApi(configuration);

let ageMax: number; // (optional) (default to undefined)
let ageMin: number; // (optional) (default to undefined)
let brandId: string; // (optional) (default to undefined)
let campaignId: string; // (optional) (default to undefined)
let compensationMax: number; // (optional) (default to undefined)
let compensationMin: number; // (optional) (default to undefined)
let endDate: string; // (optional) (default to undefined)
let enforceSingleCreatorSubmission: boolean; // (optional) (default to undefined)
let enforceUniqueCreatorSubmission: boolean; // (optional) (default to undefined)
let genderRequirement: 'male' | 'female' | 'any'; // (optional) (default to undefined)
let gigCostMax: number; // (optional) (default to undefined)
let gigCostMin: number; // (optional) (default to undefined)
let limit: number; // (optional) (default to undefined)
let page: number; // (optional) (default to undefined)
let q: string; // (optional) (default to undefined)
let startDate: string; // (optional) (default to undefined)
let status: 'draft' | 'validated' | 'open' | 'in_progress' | 'returned' | 'completed'; // (optional) (default to undefined)

const { status, data } = await apiInstance.brandsGigsGet(
    ageMax,
    ageMin,
    brandId,
    campaignId,
    compensationMax,
    compensationMin,
    endDate,
    enforceSingleCreatorSubmission,
    enforceUniqueCreatorSubmission,
    genderRequirement,
    gigCostMax,
    gigCostMin,
    limit,
    page,
    q,
    startDate,
    status
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **ageMax** | [**number**] |  | (optional) defaults to undefined|
| **ageMin** | [**number**] |  | (optional) defaults to undefined|
| **brandId** | [**string**] |  | (optional) defaults to undefined|
| **campaignId** | [**string**] |  | (optional) defaults to undefined|
| **compensationMax** | [**number**] |  | (optional) defaults to undefined|
| **compensationMin** | [**number**] |  | (optional) defaults to undefined|
| **endDate** | [**string**] |  | (optional) defaults to undefined|
| **enforceSingleCreatorSubmission** | [**boolean**] |  | (optional) defaults to undefined|
| **enforceUniqueCreatorSubmission** | [**boolean**] |  | (optional) defaults to undefined|
| **genderRequirement** | [**&#39;male&#39; | &#39;female&#39; | &#39;any&#39;**]**Array<&#39;male&#39; &#124; &#39;female&#39; &#124; &#39;any&#39;>** |  | (optional) defaults to undefined|
| **gigCostMax** | [**number**] |  | (optional) defaults to undefined|
| **gigCostMin** | [**number**] |  | (optional) defaults to undefined|
| **limit** | [**number**] |  | (optional) defaults to undefined|
| **page** | [**number**] |  | (optional) defaults to undefined|
| **q** | [**string**] |  | (optional) defaults to undefined|
| **startDate** | [**string**] |  | (optional) defaults to undefined|
| **status** | [**&#39;draft&#39; | &#39;validated&#39; | &#39;open&#39; | &#39;in_progress&#39; | &#39;returned&#39; | &#39;completed&#39;**]**Array<&#39;draft&#39; &#124; &#39;validated&#39; &#124; &#39;open&#39; &#124; &#39;in_progress&#39; &#124; &#39;returned&#39; &#124; &#39;completed&#39;>** |  | (optional) defaults to undefined|


### Return type

**ModelsPaginatedGigBrandResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Gigs found successfully |  -  |
|**401** | Unauthorized |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **brandsIdDelete**
> ModelsStandardGenericResponse brandsIdDelete()

Delete a brand profile

### Example

```typescript
import {
    BrandApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new BrandApi(configuration);

let id: string; //Brand ID (default to undefined)

const { status, data } = await apiInstance.brandsIdDelete(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Brand ID | defaults to undefined|


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
|**200** | Brand deleted successfully |  -  |
|**400** | Bad request |  -  |
|**404** | Brand not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **brandsIdGet**
> ModelsStandardBrandResponse brandsIdGet()

Get a specific brand by ID

### Example

```typescript
import {
    BrandApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new BrandApi(configuration);

let id: string; //Brand ID (default to undefined)

const { status, data } = await apiInstance.brandsIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Brand ID | defaults to undefined|


### Return type

**ModelsStandardBrandResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Brand retrieved successfully |  -  |
|**400** | Bad request |  -  |
|**404** | Brand not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **brandsIdStatusPut**
> ModelsStandardBrandStatusUpdateResponse brandsIdStatusPut(request)

Admin updates brand status with comments

### Example

```typescript
import {
    BrandApi,
    Configuration,
    ModelsBrandStatusUpdateRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new BrandApi(configuration);

let id: string; //Brand ID (default to undefined)
let request: ModelsBrandStatusUpdateRequest; //Status update request

const { status, data } = await apiInstance.brandsIdStatusPut(
    id,
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ModelsBrandStatusUpdateRequest**| Status update request | |
| **id** | [**string**] | Brand ID | defaults to undefined|


### Return type

**ModelsStandardBrandStatusUpdateResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Brand status updated successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **brandsPost**
> ModelsStandardBrandResponse brandsPost(request)

Create a new brand profile for the authenticated user

### Example

```typescript
import {
    BrandApi,
    Configuration,
    ModelsBrandRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new BrandApi(configuration);

let request: ModelsBrandRequest; //Brand creation request

const { status, data } = await apiInstance.brandsPost(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ModelsBrandRequest**| Brand creation request | |


### Return type

**ModelsStandardBrandResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Brand created successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **brandsPut**
> ModelsStandardBrandResponse brandsPut(request)

Update brand profile for the authenticated user

### Example

```typescript
import {
    BrandApi,
    Configuration,
    ModelsBrandRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new BrandApi(configuration);

let request: ModelsBrandRequest; //Brand update request

const { status, data } = await apiInstance.brandsPut(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ModelsBrandRequest**| Brand update request | |


### Return type

**ModelsStandardBrandResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Brand updated successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **brandsSearchCampaignsGet**
> ModelsPaginatedCampaignResponse brandsSearchCampaignsGet()

Search campaigns for the authenticated brand user

### Example

```typescript
import {
    BrandApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new BrandApi(configuration);

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

const { status, data } = await apiInstance.brandsSearchCampaignsGet(
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
|**200** | Campaigns found successfully |  -  |
|**401** | Unauthorized |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **brandsSearchCreatorsGet**
> ModelsPaginatedCreatorResponse brandsSearchCreatorsGet()

Brand can search active and approved creators with advanced filters, matching preferred categories with brand category

### Example

```typescript
import {
    BrandApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new BrandApi(configuration);

let ageMax: number; // (optional) (default to undefined)
let ageMin: number; // (optional) (default to undefined)
let city: string; // (optional) (default to undefined)
let country: string; // (optional) (default to undefined)
let gender: 'male' | 'female' | 'any'; // (optional) (default to undefined)
let limit: number; // (optional) (default to undefined)
let page: number; // (optional) (default to undefined)
let preferredCategory: string; // (optional) (default to undefined)
let q: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.brandsSearchCreatorsGet(
    ageMax,
    ageMin,
    city,
    country,
    gender,
    limit,
    page,
    preferredCategory,
    q
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **ageMax** | [**number**] |  | (optional) defaults to undefined|
| **ageMin** | [**number**] |  | (optional) defaults to undefined|
| **city** | [**string**] |  | (optional) defaults to undefined|
| **country** | [**string**] |  | (optional) defaults to undefined|
| **gender** | [**&#39;male&#39; | &#39;female&#39; | &#39;any&#39;**]**Array<&#39;male&#39; &#124; &#39;female&#39; &#124; &#39;any&#39;>** |  | (optional) defaults to undefined|
| **limit** | [**number**] |  | (optional) defaults to undefined|
| **page** | [**number**] |  | (optional) defaults to undefined|
| **preferredCategory** | [**string**] |  | (optional) defaults to undefined|
| **q** | [**string**] |  | (optional) defaults to undefined|


### Return type

**ModelsPaginatedCreatorResponse**

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

# **brandsSearchGet**
> ModelsPaginatedBrandResponses brandsSearchGet()

Search brands with advanced filters (unrestricted for admins, restricted for others)

### Example

```typescript
import {
    BrandApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new BrandApi(configuration);

let brandId: string; // (optional) (default to undefined)
let category: 'technology' | 'software' | 'mobile_apps' | 'gaming' | 'artificial_intelligence' | 'cybersecurity' | 'blockchain' | 'ecommerce' | 'retail' | 'fashion' | 'luxury_goods' | 'jewelry' | 'footwear' | 'accessories' | 'healthcare' | 'wellness' | 'fitness' | 'nutrition' | 'mental_health' | 'pharmaceuticals' | 'medical_devices' | 'beauty' | 'skincare' | 'cosmetics' | 'haircare' | 'personal_care' | 'fragrance' | 'food' | 'beverage' | 'restaurant' | 'catering' | 'alcoholic_beverages' | 'organic_food' | 'supplements' | 'travel' | 'hospitality' | 'tourism' | 'accommodation' | 'transportation' | 'airlines' | 'entertainment' | 'media' | 'music' | 'movies' | 'streaming' | 'publishing' | 'podcasting' | 'finance' | 'banking' | 'insurance' | 'investment' | 'cryptocurrency' | 'accounting' | 'consulting' | 'education' | 'online_learning' | 'language_learning' | 'certification' | 'tutoring' | 'sports' | 'sports_equipment' | 'outdoor' | 'recreation' | 'esports' | 'home' | 'interior_design' | 'furniture' | 'appliances' | 'gardening' | 'pet_care' | 'automotive' | 'electric_vehicles' | 'motorcycles' | 'auto_parts' | 'real_estate' | 'construction' | 'architecture' | 'property_management' | 'non_profit' | 'social_impact' | 'environmental' | 'charity' | 'legal' | 'marketing' | 'advertising' | 'public_relations' | 'human_resources' | 'manufacturing' | 'industrial' | 'logistics' | 'supply_chain' | 'energy' | 'renewable_energy' | 'utilities' | 'oil_gas' | 'other'; // (optional) (default to undefined)
let city: string; // (optional) (default to undefined)
let companySize: 'startup' | 'small' | 'medium' | 'large' | 'enterprise'; // (optional) (default to undefined)
let country: string; // (optional) (default to undefined)
let createdAfter: string; // (optional) (default to undefined)
let createdBefore: string; // (optional) (default to undefined)
let limit: number; // (optional) (default to undefined)
let page: number; // (optional) (default to undefined)
let q: string; // (optional) (default to undefined)
let status: 'created' | 'pending_approval' | 'returned' | 'active' | 'inactive' | 'suspended' | 'deleted'; // (optional) (default to undefined)

const { status, data } = await apiInstance.brandsSearchGet(
    brandId,
    category,
    city,
    companySize,
    country,
    createdAfter,
    createdBefore,
    limit,
    page,
    q,
    status
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **brandId** | [**string**] |  | (optional) defaults to undefined|
| **category** | [**&#39;technology&#39; | &#39;software&#39; | &#39;mobile_apps&#39; | &#39;gaming&#39; | &#39;artificial_intelligence&#39; | &#39;cybersecurity&#39; | &#39;blockchain&#39; | &#39;ecommerce&#39; | &#39;retail&#39; | &#39;fashion&#39; | &#39;luxury_goods&#39; | &#39;jewelry&#39; | &#39;footwear&#39; | &#39;accessories&#39; | &#39;healthcare&#39; | &#39;wellness&#39; | &#39;fitness&#39; | &#39;nutrition&#39; | &#39;mental_health&#39; | &#39;pharmaceuticals&#39; | &#39;medical_devices&#39; | &#39;beauty&#39; | &#39;skincare&#39; | &#39;cosmetics&#39; | &#39;haircare&#39; | &#39;personal_care&#39; | &#39;fragrance&#39; | &#39;food&#39; | &#39;beverage&#39; | &#39;restaurant&#39; | &#39;catering&#39; | &#39;alcoholic_beverages&#39; | &#39;organic_food&#39; | &#39;supplements&#39; | &#39;travel&#39; | &#39;hospitality&#39; | &#39;tourism&#39; | &#39;accommodation&#39; | &#39;transportation&#39; | &#39;airlines&#39; | &#39;entertainment&#39; | &#39;media&#39; | &#39;music&#39; | &#39;movies&#39; | &#39;streaming&#39; | &#39;publishing&#39; | &#39;podcasting&#39; | &#39;finance&#39; | &#39;banking&#39; | &#39;insurance&#39; | &#39;investment&#39; | &#39;cryptocurrency&#39; | &#39;accounting&#39; | &#39;consulting&#39; | &#39;education&#39; | &#39;online_learning&#39; | &#39;language_learning&#39; | &#39;certification&#39; | &#39;tutoring&#39; | &#39;sports&#39; | &#39;sports_equipment&#39; | &#39;outdoor&#39; | &#39;recreation&#39; | &#39;esports&#39; | &#39;home&#39; | &#39;interior_design&#39; | &#39;furniture&#39; | &#39;appliances&#39; | &#39;gardening&#39; | &#39;pet_care&#39; | &#39;automotive&#39; | &#39;electric_vehicles&#39; | &#39;motorcycles&#39; | &#39;auto_parts&#39; | &#39;real_estate&#39; | &#39;construction&#39; | &#39;architecture&#39; | &#39;property_management&#39; | &#39;non_profit&#39; | &#39;social_impact&#39; | &#39;environmental&#39; | &#39;charity&#39; | &#39;legal&#39; | &#39;marketing&#39; | &#39;advertising&#39; | &#39;public_relations&#39; | &#39;human_resources&#39; | &#39;manufacturing&#39; | &#39;industrial&#39; | &#39;logistics&#39; | &#39;supply_chain&#39; | &#39;energy&#39; | &#39;renewable_energy&#39; | &#39;utilities&#39; | &#39;oil_gas&#39; | &#39;other&#39;**]**Array<&#39;technology&#39; &#124; &#39;software&#39; &#124; &#39;mobile_apps&#39; &#124; &#39;gaming&#39; &#124; &#39;artificial_intelligence&#39; &#124; &#39;cybersecurity&#39; &#124; &#39;blockchain&#39; &#124; &#39;ecommerce&#39; &#124; &#39;retail&#39; &#124; &#39;fashion&#39; &#124; &#39;luxury_goods&#39; &#124; &#39;jewelry&#39; &#124; &#39;footwear&#39; &#124; &#39;accessories&#39; &#124; &#39;healthcare&#39; &#124; &#39;wellness&#39; &#124; &#39;fitness&#39; &#124; &#39;nutrition&#39; &#124; &#39;mental_health&#39; &#124; &#39;pharmaceuticals&#39; &#124; &#39;medical_devices&#39; &#124; &#39;beauty&#39; &#124; &#39;skincare&#39; &#124; &#39;cosmetics&#39; &#124; &#39;haircare&#39; &#124; &#39;personal_care&#39; &#124; &#39;fragrance&#39; &#124; &#39;food&#39; &#124; &#39;beverage&#39; &#124; &#39;restaurant&#39; &#124; &#39;catering&#39; &#124; &#39;alcoholic_beverages&#39; &#124; &#39;organic_food&#39; &#124; &#39;supplements&#39; &#124; &#39;travel&#39; &#124; &#39;hospitality&#39; &#124; &#39;tourism&#39; &#124; &#39;accommodation&#39; &#124; &#39;transportation&#39; &#124; &#39;airlines&#39; &#124; &#39;entertainment&#39; &#124; &#39;media&#39; &#124; &#39;music&#39; &#124; &#39;movies&#39; &#124; &#39;streaming&#39; &#124; &#39;publishing&#39; &#124; &#39;podcasting&#39; &#124; &#39;finance&#39; &#124; &#39;banking&#39; &#124; &#39;insurance&#39; &#124; &#39;investment&#39; &#124; &#39;cryptocurrency&#39; &#124; &#39;accounting&#39; &#124; &#39;consulting&#39; &#124; &#39;education&#39; &#124; &#39;online_learning&#39; &#124; &#39;language_learning&#39; &#124; &#39;certification&#39; &#124; &#39;tutoring&#39; &#124; &#39;sports&#39; &#124; &#39;sports_equipment&#39; &#124; &#39;outdoor&#39; &#124; &#39;recreation&#39; &#124; &#39;esports&#39; &#124; &#39;home&#39; &#124; &#39;interior_design&#39; &#124; &#39;furniture&#39; &#124; &#39;appliances&#39; &#124; &#39;gardening&#39; &#124; &#39;pet_care&#39; &#124; &#39;automotive&#39; &#124; &#39;electric_vehicles&#39; &#124; &#39;motorcycles&#39; &#124; &#39;auto_parts&#39; &#124; &#39;real_estate&#39; &#124; &#39;construction&#39; &#124; &#39;architecture&#39; &#124; &#39;property_management&#39; &#124; &#39;non_profit&#39; &#124; &#39;social_impact&#39; &#124; &#39;environmental&#39; &#124; &#39;charity&#39; &#124; &#39;legal&#39; &#124; &#39;marketing&#39; &#124; &#39;advertising&#39; &#124; &#39;public_relations&#39; &#124; &#39;human_resources&#39; &#124; &#39;manufacturing&#39; &#124; &#39;industrial&#39; &#124; &#39;logistics&#39; &#124; &#39;supply_chain&#39; &#124; &#39;energy&#39; &#124; &#39;renewable_energy&#39; &#124; &#39;utilities&#39; &#124; &#39;oil_gas&#39; &#124; &#39;other&#39;>** |  | (optional) defaults to undefined|
| **city** | [**string**] |  | (optional) defaults to undefined|
| **companySize** | [**&#39;startup&#39; | &#39;small&#39; | &#39;medium&#39; | &#39;large&#39; | &#39;enterprise&#39;**]**Array<&#39;startup&#39; &#124; &#39;small&#39; &#124; &#39;medium&#39; &#124; &#39;large&#39; &#124; &#39;enterprise&#39;>** |  | (optional) defaults to undefined|
| **country** | [**string**] |  | (optional) defaults to undefined|
| **createdAfter** | [**string**] |  | (optional) defaults to undefined|
| **createdBefore** | [**string**] |  | (optional) defaults to undefined|
| **limit** | [**number**] |  | (optional) defaults to undefined|
| **page** | [**number**] |  | (optional) defaults to undefined|
| **q** | [**string**] |  | (optional) defaults to undefined|
| **status** | [**&#39;created&#39; | &#39;pending_approval&#39; | &#39;returned&#39; | &#39;active&#39; | &#39;inactive&#39; | &#39;suspended&#39; | &#39;deleted&#39;**]**Array<&#39;created&#39; &#124; &#39;pending_approval&#39; &#124; &#39;returned&#39; &#124; &#39;active&#39; &#124; &#39;inactive&#39; &#124; &#39;suspended&#39; &#124; &#39;deleted&#39;>** |  | (optional) defaults to undefined|


### Return type

**ModelsPaginatedBrandResponses**

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

# **brandsSearchVideoSubmissionsGet**
> ModelsPaginatedVideoSubmissionResponse brandsSearchVideoSubmissionsGet()

Brand can search video submissions for their campaigns

### Example

```typescript
import {
    BrandApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new BrandApi(configuration);

let campaignId: string; // (optional) (default to undefined)
let createdAfter: string; // (optional) (default to undefined)
let createdBefore: string; // (optional) (default to undefined)
let creatorId: string; // (optional) (default to undefined)
let gigId: string; // (optional) (default to undefined)
let limit: number; // (optional) (default to undefined)
let page: number; // (optional) (default to undefined)
let q: string; // (optional) (default to undefined)
let status: 'created' | 'pending_approval' | 'approved' | 'rejected' | 'accepted' | 'returned' | 'created' | 'pending_approval' | 'approved' | 'rejected' | 'accepted'; // (optional) (default to undefined)

const { status, data } = await apiInstance.brandsSearchVideoSubmissionsGet(
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

