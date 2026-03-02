# GigsApi

All URIs are relative to */api/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**gigsApplicationsApplicationIdStatusPut**](#gigsapplicationsapplicationidstatusput) | **PUT** /gigs/applications/{applicationId}/status | Update application status|
|[**gigsCampaignsCampaignIdGet**](#gigscampaignscampaignidget) | **GET** /gigs/campaigns/{campaign_id} | Get gigs by campaign|
|[**gigsIdApplicationsGet**](#gigsidapplicationsget) | **GET** /gigs/{id}/applications | Get gig applications|
|[**gigsIdApplyPost**](#gigsidapplypost) | **POST** /gigs/{id}/apply | Apply to gig|
|[**gigsIdDelete**](#gigsiddelete) | **DELETE** /gigs/{id} | Delete gig|
|[**gigsIdGet**](#gigsidget) | **GET** /gigs/{id} | Get gig by ID|
|[**gigsIdInvitationsGet**](#gigsidinvitationsget) | **GET** /gigs/{id}/invitations | Get gig invitations|
|[**gigsIdInvitePost**](#gigsidinvitepost) | **POST** /gigs/{id}/invite | Invite creator to gig|
|[**gigsIdPut**](#gigsidput) | **PUT** /gigs/{id} | Update gig|
|[**gigsIdStatusPut**](#gigsidstatusput) | **PUT** /gigs/{id}/status | Update gig status|
|[**gigsInvitationsGet**](#gigsinvitationsget) | **GET** /gigs/invitations | Get creator invitations|
|[**gigsInvitationsInvitationIdRespondPut**](#gigsinvitationsinvitationidrespondput) | **PUT** /gigs/invitations/{invitationId}/respond | Respond to gig invitation|
|[**gigsPost**](#gigspost) | **POST** /gigs | Create a new gig|
|[**gigsSearchGet**](#gigssearchget) | **GET** /gigs/search | Search gigs|

# **gigsApplicationsApplicationIdStatusPut**
> ModelsStandardGigApplicationResponse gigsApplicationsApplicationIdStatusPut(request)

Brand updates the status of a gig application

### Example

```typescript
import {
    GigsApi,
    Configuration,
    ModelsUpdateGigApplicationRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new GigsApi(configuration);

let applicationId: string; //Application ID (default to undefined)
let request: ModelsUpdateGigApplicationRequest; //Status update request

const { status, data } = await apiInstance.gigsApplicationsApplicationIdStatusPut(
    applicationId,
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ModelsUpdateGigApplicationRequest**| Status update request | |
| **applicationId** | [**string**] | Application ID | defaults to undefined|


### Return type

**ModelsStandardGigApplicationResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Application status updated successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**404** | Brand profile not found |  -  |
|**422** | UnprocessableEntity |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **gigsCampaignsCampaignIdGet**
> ModelsStandardGigBrandListResponse gigsCampaignsCampaignIdGet()

Get all gigs for a specific campaign

### Example

```typescript
import {
    GigsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new GigsApi(configuration);

let campaignId: string; //Campaign ID (default to undefined)

const { status, data } = await apiInstance.gigsCampaignsCampaignIdGet(
    campaignId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **campaignId** | [**string**] | Campaign ID | defaults to undefined|


### Return type

**ModelsStandardGigBrandListResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of gigs for campaign |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **gigsIdApplicationsGet**
> ModelsStandardGigApplicationResponses gigsIdApplicationsGet()

Get all applications for a specific gig

### Example

```typescript
import {
    GigsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new GigsApi(configuration);

let id: string; //Gig ID (default to undefined)

const { status, data } = await apiInstance.gigsIdApplicationsGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Gig ID | defaults to undefined|


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
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**404** | Gig not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **gigsIdApplyPost**
> ModelsStandardGigApplicationResponse gigsIdApplyPost(application)

Creator applies to a gig

### Example

```typescript
import {
    GigsApi,
    Configuration,
    ModelsGigApplicationRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new GigsApi(configuration);

let id: string; //Gig ID (default to undefined)
let application: ModelsGigApplicationRequest; //Application data

const { status, data } = await apiInstance.gigsIdApplyPost(
    id,
    application
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **application** | **ModelsGigApplicationRequest**| Application data | |
| **id** | [**string**] | Gig ID | defaults to undefined|


### Return type

**ModelsStandardGigApplicationResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Successfully applied to gig |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**404** | Creator profile not found |  -  |
|**422** | UnprocessableEntity |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **gigsIdDelete**
> ModelsStandardGenericResponse gigsIdDelete()

Delete a gig (Admin only)

### Example

```typescript
import {
    GigsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new GigsApi(configuration);

let id: string; //Gig ID (default to undefined)

const { status, data } = await apiInstance.gigsIdDelete(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Gig ID | defaults to undefined|


### Return type

**ModelsStandardGenericResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Gig deleted successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**404** | Gig not found |  -  |
|**422** | UnprocessableEntity |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **gigsIdGet**
> ModelsStandardGigResponse gigsIdGet()

Get a specific gig by its ID

### Example

```typescript
import {
    GigsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new GigsApi(configuration);

let id: string; //Gig ID (default to undefined)

const { status, data } = await apiInstance.gigsIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Gig ID | defaults to undefined|


### Return type

**ModelsStandardGigResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Gig details |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**404** | Gig not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **gigsIdInvitationsGet**
> ModelsStandardGigInvitationResponse gigsIdInvitationsGet()

Get all invitations for a specific gig with role-based access

### Example

```typescript
import {
    GigsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new GigsApi(configuration);

let id: string; //Gig ID (default to undefined)

const { status, data } = await apiInstance.gigsIdInvitationsGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Gig ID | defaults to undefined|


### Return type

**ModelsStandardGigInvitationResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Invitations retrieved successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**404** | Gig/Creator not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **gigsIdInvitePost**
> ModelsStandardGigInvitationResponse gigsIdInvitePost(invitation)

Brand invites a creator to apply for a gig

### Example

```typescript
import {
    GigsApi,
    Configuration,
    ModelsGigInvitationRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new GigsApi(configuration);

let id: string; //Gig ID (default to undefined)
let invitation: ModelsGigInvitationRequest; //Invitation data

const { status, data } = await apiInstance.gigsIdInvitePost(
    id,
    invitation
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **invitation** | **ModelsGigInvitationRequest**| Invitation data | |
| **id** | [**string**] | Gig ID | defaults to undefined|


### Return type

**ModelsStandardGigInvitationResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Creator invited successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**404** | Brand profile not found |  -  |
|**422** | UnprocessableEntity |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **gigsIdPut**
> ModelsStandardGigResponse gigsIdPut(gig)

Update a gig (Admin only)

### Example

```typescript
import {
    GigsApi,
    Configuration,
    ModelsUpdateGigRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new GigsApi(configuration);

let id: string; //Gig ID (default to undefined)
let gig: ModelsUpdateGigRequest; //Gig update data

const { status, data } = await apiInstance.gigsIdPut(
    id,
    gig
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **gig** | **ModelsUpdateGigRequest**| Gig update data | |
| **id** | [**string**] | Gig ID | defaults to undefined|


### Return type

**ModelsStandardGigResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Gig updated successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**404** | Gig not found |  -  |
|**422** | UnprocessableEntity |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **gigsIdStatusPut**
> ModelsStandardGenericResponse gigsIdStatusPut(status)

Update gig status (Admin only)

### Example

```typescript
import {
    GigsApi,
    Configuration,
    ModelsGigStatusUpdateRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new GigsApi(configuration);

let id: string; //Gig ID (default to undefined)
let status: ModelsGigStatusUpdateRequest; //Gig status update

const { status, data } = await apiInstance.gigsIdStatusPut(
    id,
    status
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **status** | **ModelsGigStatusUpdateRequest**| Gig status update | |
| **id** | [**string**] | Gig ID | defaults to undefined|


### Return type

**ModelsStandardGenericResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Gig status updated successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**404** | Gig not found |  -  |
|**422** | UnprocessableEntity |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **gigsInvitationsGet**
> ModelsStandardGigInvitationResponse gigsInvitationsGet()

Get all invitations for the authenticated creator

### Example

```typescript
import {
    GigsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new GigsApi(configuration);

const { status, data } = await apiInstance.gigsInvitationsGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ModelsStandardGigInvitationResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Invitations retrieved successfully |  -  |
|**401** | Unauthorized |  -  |
|**404** | Creator profile not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **gigsInvitationsInvitationIdRespondPut**
> ModelsStandardGigInvitationResponse gigsInvitationsInvitationIdRespondPut(request)

Creator accepts or declines a gig invitation

### Example

```typescript
import {
    GigsApi,
    Configuration,
    ModelsGigInvitationResponseRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new GigsApi(configuration);

let invitationId: string; //Invitation ID (default to undefined)
let request: ModelsGigInvitationResponseRequest; //Invitation response

const { status, data } = await apiInstance.gigsInvitationsInvitationIdRespondPut(
    invitationId,
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ModelsGigInvitationResponseRequest**| Invitation response | |
| **invitationId** | [**string**] | Invitation ID | defaults to undefined|


### Return type

**ModelsStandardGigInvitationResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Response recorded successfully |  -  |
|**400** | Bad request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **gigsPost**
> ModelsStandardGigResponse gigsPost(gig)

Create a new gig for a campaign

### Example

```typescript
import {
    GigsApi,
    Configuration,
    ModelsCreateGigRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new GigsApi(configuration);

let gig: ModelsCreateGigRequest; //Gig creation data

const { status, data } = await apiInstance.gigsPost(
    gig
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **gig** | **ModelsCreateGigRequest**| Gig creation data | |


### Return type

**ModelsStandardGigResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Gig created successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **gigsSearchGet**
> ModelsPaginatedGigResponse gigsSearchGet()

Admin can search all gigs with advanced filters

### Example

```typescript
import {
    GigsApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new GigsApi(configuration);

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

const { status, data } = await apiInstance.gigsSearchGet(
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

**ModelsPaginatedGigResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of gigs matching search |  -  |
|**400** | Bad request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

