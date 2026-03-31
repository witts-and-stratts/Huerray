# CreatorApi

All URIs are relative to */api/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**creatorsActiveGigsGet**](#creatorsactivegigsget) | **GET** /creators/active-gigs | Get active gigs for the logged-in creator|
|[**creatorsApplicationsGet**](#creatorsapplicationsget) | **GET** /creators/applications | Get creator applications|
|[**creatorsBankDetailsGet**](#creatorsbankdetailsget) | **GET** /creators/bank-details | Get creator bank details|
|[**creatorsBankDetailsPut**](#creatorsbankdetailsput) | **PUT** /creators/bank-details | Update creator bank details|
|[**creatorsIdBankDetailsGet**](#creatorsidbankdetailsget) | **GET** /creators/{id}/bank-details | Get creator bank details by creator ID (Admin only)|
|[**creatorsIdGet**](#creatorsidget) | **GET** /creators/{id} | Get creator by ID|
|[**creatorsIdProfilePut**](#creatorsidprofileput) | **PUT** /creators/{id}/profile | Admin update creator profile|
|[**creatorsIdProfileStatusPut**](#creatorsidprofilestatusput) | **PUT** /creators/{id}/profile-status | Update creator profile status|
|[**creatorsMatchingGigsGet**](#creatorsmatchinggigsget) | **GET** /creators/matching-gigs | Get matching gigs|
|[**creatorsPaymentItemsSearchGet**](#creatorspaymentitemssearchget) | **GET** /creators/payment-items/search | Search creator\&#39;s payment items|
|[**creatorsPaymentsIdGet**](#creatorspaymentsidget) | **GET** /creators/payments/{id} | Get creator\&#39;s payment by ID|
|[**creatorsPaymentsSearchGet**](#creatorspaymentssearchget) | **GET** /creators/payments/search | Search creator\&#39;s payments|
|[**creatorsProfileDraftPost**](#creatorsprofiledraftpost) | **POST** /creators/profile/draft | Save creator profile as draft|
|[**creatorsProfileGet**](#creatorsprofileget) | **GET** /creators/profile | Get creator profile|
|[**creatorsProfilePost**](#creatorsprofilepost) | **POST** /creators/profile | Create creator profile|
|[**creatorsProfilePut**](#creatorsprofileput) | **PUT** /creators/profile | Update creator profile|
|[**creatorsProfileSubmitPost**](#creatorsprofilesubmitpost) | **POST** /creators/profile/submit | Submit creator profile for admin approval|
|[**creatorsSearchGet**](#creatorssearchget) | **GET** /creators/search | Search creators|
|[**creatorsSearchGigsGet**](#creatorssearchgigsget) | **GET** /creators/search/gigs | Search gigs for creator|
|[**creatorsSearchVideoSubmissionsGet**](#creatorssearchvideosubmissionsget) | **GET** /creators/search/video-submissions | Search video submissions for creator|

# **creatorsActiveGigsGet**
> ModelsStandardGigCreatorListResponse creatorsActiveGigsGet()

Get all gigs that are in progress for which there is either an accepted invitation or accepted application

### Example

```typescript
import {
    CreatorApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CreatorApi(configuration);

const { status, data } = await apiInstance.creatorsActiveGigsGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ModelsStandardGigCreatorListResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | In-progress gigs retrieved successfully |  -  |
|**401** | Unauthorized |  -  |
|**404** | Creator profile not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **creatorsApplicationsGet**
> ModelsStandardGigApplicationResponses creatorsApplicationsGet()

Get applications submitted by the creator

### Example

```typescript
import {
    CreatorApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CreatorApi(configuration);

const { status, data } = await apiInstance.creatorsApplicationsGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ModelsStandardGigApplicationResponses**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Applications retrieved successfully |  -  |
|**401** | Unauthorized |  -  |
|**422** | Unprocessable entity |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **creatorsBankDetailsGet**
> ModelsStandardCreatorBankTaxDetailsResponse creatorsBankDetailsGet()

Get bank and tax details for the creator (limited info for security)

### Example

```typescript
import {
    CreatorApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CreatorApi(configuration);

const { status, data } = await apiInstance.creatorsBankDetailsGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ModelsStandardCreatorBankTaxDetailsResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Bank details retrieved successfully |  -  |
|**401** | Unauthorized |  -  |
|**404** | Creator profile not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **creatorsBankDetailsPut**
> ModelsStandardCreatorBankTaxDetailsResponse creatorsBankDetailsPut(request)

Update bank and tax details for the creator

### Example

```typescript
import {
    CreatorApi,
    Configuration,
    ModelsUpdateCreatorBankDetailsRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CreatorApi(configuration);

let request: ModelsUpdateCreatorBankDetailsRequest; //Bank and tax details

const { status, data } = await apiInstance.creatorsBankDetailsPut(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ModelsUpdateCreatorBankDetailsRequest**| Bank and tax details | |


### Return type

**ModelsStandardCreatorBankTaxDetailsResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Bank and tax details updated successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**404** | Creator profile not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **creatorsIdBankDetailsGet**
> ModelsStandardCreatorBankTaxDetailsResponse creatorsIdBankDetailsGet()

Get bank and tax details for a specific creator by their ID. This includes full sensitive information.

### Example

```typescript
import {
    CreatorApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CreatorApi(configuration);

let id: string; //Creator ID (default to undefined)

const { status, data } = await apiInstance.creatorsIdBankDetailsGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Creator ID | defaults to undefined|


### Return type

**ModelsStandardCreatorBankTaxDetailsResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Bank details retrieved successfully |  -  |
|**401** | Unauthorized |  -  |
|**404** | Creator profile not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **creatorsIdGet**
> ModelsStandardCreatorResponse creatorsIdGet()

Get creator profile by ID (public access)

### Example

```typescript
import {
    CreatorApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CreatorApi(configuration);

let id: string; //Creator UUID (default to undefined)

const { status, data } = await apiInstance.creatorsIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Creator UUID | defaults to undefined|


### Return type

**ModelsStandardCreatorResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Creator profile retrieved successfully |  -  |
|**400** | Bad request |  -  |
|**404** | Creator not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **creatorsIdProfilePut**
> ModelsStandardCreatorResponse creatorsIdProfilePut(request)

Admin updates creator profile fields without changing creator profile status

### Example

```typescript
import {
    CreatorApi,
    Configuration,
    ModelsAdminUpdateCreatorProfileRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CreatorApi(configuration);

let id: string; //Creator Profile ID (default to undefined)
let request: ModelsAdminUpdateCreatorProfileRequest; //Creator profile update data

const { status, data } = await apiInstance.creatorsIdProfilePut(
    id,
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ModelsAdminUpdateCreatorProfileRequest**| Creator profile update data | |
| **id** | [**string**] | Creator Profile ID | defaults to undefined|


### Return type

**ModelsStandardCreatorResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Creator profile updated successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**404** | Creator profile not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **creatorsIdProfileStatusPut**
> ModelsStandardCreatorStatusUpdateResponse creatorsIdProfileStatusPut(request)

Admin updates creator profile status with comments

### Example

```typescript
import {
    CreatorApi,
    Configuration,
    ModelsCreatorStatusUpdateRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CreatorApi(configuration);

let id: string; //Creator Profile ID (default to undefined)
let request: ModelsCreatorStatusUpdateRequest; //Status update request

const { status, data } = await apiInstance.creatorsIdProfileStatusPut(
    id,
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ModelsCreatorStatusUpdateRequest**| Status update request | |
| **id** | [**string**] | Creator Profile ID | defaults to undefined|


### Return type

**ModelsStandardCreatorStatusUpdateResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Creator profile status updated successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**422** | UnprocessableEntity |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **creatorsMatchingGigsGet**
> ModelsPaginatedGigCreatorResponse creatorsMatchingGigsGet()

Get gigs that match the creator\'s profile

### Example

```typescript
import {
    CreatorApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CreatorApi(configuration);

let brandId: string; // (optional) (default to undefined)
let enforceSingleCreatorSubmission: boolean; // (optional) (default to undefined)
let enforceUniqueCreatorSubmission: boolean; // (optional) (default to undefined)
let gender: string; // (optional) (default to undefined)
let limit: number; // (optional) (default to undefined)
let page: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.creatorsMatchingGigsGet(
    brandId,
    enforceSingleCreatorSubmission,
    enforceUniqueCreatorSubmission,
    gender,
    limit,
    page
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **brandId** | [**string**] |  | (optional) defaults to undefined|
| **enforceSingleCreatorSubmission** | [**boolean**] |  | (optional) defaults to undefined|
| **enforceUniqueCreatorSubmission** | [**boolean**] |  | (optional) defaults to undefined|
| **gender** | [**string**] |  | (optional) defaults to undefined|
| **limit** | [**number**] |  | (optional) defaults to undefined|
| **page** | [**number**] |  | (optional) defaults to undefined|


### Return type

**ModelsPaginatedGigCreatorResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Matching gigs retrieved successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**422** | Unprocessable entity |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **creatorsPaymentItemsSearchGet**
> ModelsPaginatedPaymentItemResponse creatorsPaymentItemsSearchGet()

Creator searches their own payment items

### Example

```typescript
import {
    CreatorApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CreatorApi(configuration);

let createdAfter: string; // (optional) (default to undefined)
let createdBefore: string; // (optional) (default to undefined)
let creatorId: string; // (optional) (default to undefined)
let itemStatus: 'pending' | 'included' | 'paid' | 'failed' | 'cancelled'; // (optional) (default to undefined)
let limit: number; // (optional) (default to undefined)
let page: number; // (optional) (default to undefined)
let paymentId: string; // (optional) (default to undefined)
let search: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.creatorsPaymentItemsSearchGet(
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

No authorization required

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

# **creatorsPaymentsIdGet**
> ModelsStandardPaymentResponse creatorsPaymentsIdGet()

Creator gets their own payment details by ID

### Example

```typescript
import {
    CreatorApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CreatorApi(configuration);

let id: string; //Payment ID (default to undefined)

const { status, data } = await apiInstance.creatorsPaymentsIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Payment ID | defaults to undefined|


### Return type

**ModelsStandardPaymentResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Payment retrieved successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **creatorsPaymentsSearchGet**
> ModelsPaginatedPaymentResponse creatorsPaymentsSearchGet()

Creator searches their own payments

### Example

```typescript
import {
    CreatorApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CreatorApi(configuration);

let createdAfter: string; // (optional) (default to undefined)
let createdBefore: string; // (optional) (default to undefined)
let creatorId: string; // (optional) (default to undefined)
let limit: number; // (optional) (default to undefined)
let page: number; // (optional) (default to undefined)
let paymentStatus: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled'; // (optional) (default to undefined)
let search: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.creatorsPaymentsSearchGet(
    createdAfter,
    createdBefore,
    creatorId,
    limit,
    page,
    paymentStatus,
    search
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createdAfter** | [**string**] |  | (optional) defaults to undefined|
| **createdBefore** | [**string**] |  | (optional) defaults to undefined|
| **creatorId** | [**string**] |  | (optional) defaults to undefined|
| **limit** | [**number**] |  | (optional) defaults to undefined|
| **page** | [**number**] |  | (optional) defaults to undefined|
| **paymentStatus** | [**&#39;pending&#39; | &#39;processing&#39; | &#39;completed&#39; | &#39;failed&#39; | &#39;cancelled&#39;**]**Array<&#39;pending&#39; &#124; &#39;processing&#39; &#124; &#39;completed&#39; &#124; &#39;failed&#39; &#124; &#39;cancelled&#39;>** |  | (optional) defaults to undefined|
| **search** | [**string**] |  | (optional) defaults to undefined|


### Return type

**ModelsPaginatedPaymentResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Payments retrieved successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **creatorsProfileDraftPost**
> ModelsStandardCreatorResponse creatorsProfileDraftPost(request)

Save creator profile data as draft for later completion

### Example

```typescript
import {
    CreatorApi,
    Configuration,
    ModelsCreateCreatorRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CreatorApi(configuration);

let request: ModelsCreateCreatorRequest; //Creator profile data

const { status, data } = await apiInstance.creatorsProfileDraftPost(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ModelsCreateCreatorRequest**| Creator profile data | |


### Return type

**ModelsStandardCreatorResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Creator profile draft saved successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **creatorsProfileGet**
> ModelsStandardCreatorResponse creatorsProfileGet()

Get the creator profile for the authenticated user

### Example

```typescript
import {
    CreatorApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CreatorApi(configuration);

const { status, data } = await apiInstance.creatorsProfileGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ModelsStandardCreatorResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Creator profile retrieved successfully |  -  |
|**401** | Unauthorized |  -  |
|**404** | Creator profile not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **creatorsProfilePost**
> ModelsStandardCreatorResponse creatorsProfilePost(request)

Create a new creator profile for the authenticated user

### Example

```typescript
import {
    CreatorApi,
    Configuration,
    ModelsCreateCreatorRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CreatorApi(configuration);

let request: ModelsCreateCreatorRequest; //Creator profile data

const { status, data } = await apiInstance.creatorsProfilePost(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ModelsCreateCreatorRequest**| Creator profile data | |


### Return type

**ModelsStandardCreatorResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Creator profile created successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **creatorsProfilePut**
> ModelsStandardCreatorResponse creatorsProfilePut(request)

Update the creator profile for the authenticated user

### Example

```typescript
import {
    CreatorApi,
    Configuration,
    ModelsUpdateCreatorRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CreatorApi(configuration);

let request: ModelsUpdateCreatorRequest; //Creator profile update data

const { status, data } = await apiInstance.creatorsProfilePut(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ModelsUpdateCreatorRequest**| Creator profile update data | |


### Return type

**ModelsStandardCreatorResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Creator profile updated successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**404** | Creator profile not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **creatorsProfileSubmitPost**
> ModelsStandardCreatorResponse creatorsProfileSubmitPost()

Submit creator profile for admin review and approval

### Example

```typescript
import {
    CreatorApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CreatorApi(configuration);

const { status, data } = await apiInstance.creatorsProfileSubmitPost();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ModelsStandardCreatorResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Creator profile submitted for approval successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **creatorsSearchGet**
> ModelsPaginatedCreatorResponse creatorsSearchGet()

Search creators with advanced filters (unrestricted for admins, restricted for others)

### Example

```typescript
import {
    CreatorApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CreatorApi(configuration);

let ageMax: number; // (optional) (default to undefined)
let ageMin: number; // (optional) (default to undefined)
let city: string; // (optional) (default to undefined)
let contentType: 'human-generated' | 'ai-generated'; // (optional) (default to undefined)
let country: string; // (optional) (default to undefined)
let createdAfter: string; // (optional) (default to undefined)
let createdBefore: string; // (optional) (default to undefined)
let gender: 'male' | 'female' | 'any'; // (optional) (default to undefined)
let limit: number; // (optional) (default to undefined)
let page: number; // (optional) (default to undefined)
let q: string; // (optional) (default to undefined)
let status: 'draft' | 'pending_approval' | 'returned' | 'approved' | 'rejected'; // (optional) (default to undefined)

const { status, data } = await apiInstance.creatorsSearchGet(
    ageMax,
    ageMin,
    city,
    contentType,
    country,
    createdAfter,
    createdBefore,
    gender,
    limit,
    page,
    q,
    status
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **ageMax** | [**number**] |  | (optional) defaults to undefined|
| **ageMin** | [**number**] |  | (optional) defaults to undefined|
| **city** | [**string**] |  | (optional) defaults to undefined|
| **contentType** | [**&#39;human-generated&#39; | &#39;ai-generated&#39;**]**Array<&#39;human-generated&#39; &#124; &#39;ai-generated&#39;>** |  | (optional) defaults to undefined|
| **country** | [**string**] |  | (optional) defaults to undefined|
| **createdAfter** | [**string**] |  | (optional) defaults to undefined|
| **createdBefore** | [**string**] |  | (optional) defaults to undefined|
| **gender** | [**&#39;male&#39; | &#39;female&#39; | &#39;any&#39;**]**Array<&#39;male&#39; &#124; &#39;female&#39; &#124; &#39;any&#39;>** |  | (optional) defaults to undefined|
| **limit** | [**number**] |  | (optional) defaults to undefined|
| **page** | [**number**] |  | (optional) defaults to undefined|
| **q** | [**string**] |  | (optional) defaults to undefined|
| **status** | [**&#39;draft&#39; | &#39;pending_approval&#39; | &#39;returned&#39; | &#39;approved&#39; | &#39;rejected&#39;**]**Array<&#39;draft&#39; &#124; &#39;pending_approval&#39; &#124; &#39;returned&#39; &#124; &#39;approved&#39; &#124; &#39;rejected&#39;>** |  | (optional) defaults to undefined|


### Return type

**ModelsPaginatedCreatorResponse**

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

# **creatorsSearchGigsGet**
> ModelsPaginatedGigCreatorResponse creatorsSearchGigsGet()

Creator can search available gigs with advanced filters

### Example

```typescript
import {
    CreatorApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CreatorApi(configuration);

let ageMax: number; // (optional) (default to undefined)
let ageMin: number; // (optional) (default to undefined)
let brandId: string; // (optional) (default to undefined)
let campaignId: string; // (optional) (default to undefined)
let compensationMax: number; // (optional) (default to undefined)
let compensationMin: number; // (optional) (default to undefined)
let contentType: 'human-generated' | 'ai-generated'; // (optional) (default to undefined)
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

const { status, data } = await apiInstance.creatorsSearchGigsGet(
    ageMax,
    ageMin,
    brandId,
    campaignId,
    compensationMax,
    compensationMin,
    contentType,
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
| **contentType** | [**&#39;human-generated&#39; | &#39;ai-generated&#39;**]**Array<&#39;human-generated&#39; &#124; &#39;ai-generated&#39;>** |  | (optional) defaults to undefined|
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

**ModelsPaginatedGigCreatorResponse**

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
|**422** | UnprocessableEntity |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **creatorsSearchVideoSubmissionsGet**
> ModelsPaginatedVideoSubmissionResponse creatorsSearchVideoSubmissionsGet()

Creator can search their own video submissions

### Example

```typescript
import {
    CreatorApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new CreatorApi(configuration);

let campaignId: string; // (optional) (default to undefined)
let createdAfter: string; // (optional) (default to undefined)
let createdBefore: string; // (optional) (default to undefined)
let creatorId: string; // (optional) (default to undefined)
let gigId: string; // (optional) (default to undefined)
let limit: number; // (optional) (default to undefined)
let page: number; // (optional) (default to undefined)
let q: string; // (optional) (default to undefined)
let status: 'created' | 'pending_approval' | 'approved' | 'rejected' | 'accepted' | 'returned' | 'created' | 'pending_approval' | 'approved' | 'rejected' | 'accepted'; // (optional) (default to undefined)

const { status, data } = await apiInstance.creatorsSearchVideoSubmissionsGet(
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
|**422** | UnprocessableEntity |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

