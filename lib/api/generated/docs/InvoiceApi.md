# InvoiceApi

All URIs are relative to */api/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**invoicesIdGet**](#invoicesidget) | **GET** /invoices/{id} | Get invoice by ID|
|[**invoicesIdPdfGet**](#invoicesidpdfget) | **GET** /invoices/{id}/pdf | Get invoice as PDF|
|[**invoicesIdResendPdfPost**](#invoicesidresendpdfpost) | **POST** /invoices/{id}/resend-pdf | Resend invoice PDF via email|
|[**invoicesIdStatusPut**](#invoicesidstatusput) | **PUT** /invoices/{id}/status | Update invoice status|
|[**invoicesPost**](#invoicespost) | **POST** /invoices | Create invoice for campaign|
|[**invoicesSearchGet**](#invoicessearchget) | **GET** /invoices/search | Search invoices (Admin &amp; Brands)|

# **invoicesIdGet**
> ModelsStandardInvoiceResponse invoicesIdGet()

Get detailed invoice information

### Example

```typescript
import {
    InvoiceApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new InvoiceApi(configuration);

let id: string; //Invoice ID (default to undefined)

const { status, data } = await apiInstance.invoicesIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Invoice ID | defaults to undefined|


### Return type

**ModelsStandardInvoiceResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Invoice found |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**404** | Invoice not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **invoicesIdPdfGet**
> File invoicesIdPdfGet()

Generate and stream the invoice as a PDF file

### Example

```typescript
import {
    InvoiceApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new InvoiceApi(configuration);

let id: string; //Invoice ID (default to undefined)

const { status, data } = await apiInstance.invoicesIdPdfGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Invoice ID | defaults to undefined|


### Return type

**File**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/pdf


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Invoice PDF |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**404** | Invoice not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **invoicesIdResendPdfPost**
> ModelsStandardInvoicePDFGeneratedResponse invoicesIdResendPdfPost()

Generate a PDF for an existing invoice and send it via email to the brand

### Example

```typescript
import {
    InvoiceApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new InvoiceApi(configuration);

let id: string; //Invoice ID (default to undefined)

const { status, data } = await apiInstance.invoicesIdResendPdfPost(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Invoice ID | defaults to undefined|


### Return type

**ModelsStandardInvoicePDFGeneratedResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | PDF sent successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**404** | Invoice not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **invoicesIdStatusPut**
> ModelsStandardInvoiceResponse invoicesIdStatusPut(request)

Update the status of an invoice (Admin only)

### Example

```typescript
import {
    InvoiceApi,
    Configuration,
    ModelsUpdateInvoiceRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new InvoiceApi(configuration);

let id: string; //Invoice ID (default to undefined)
let request: ModelsUpdateInvoiceRequest; //Invoice update request

const { status, data } = await apiInstance.invoicesIdStatusPut(
    id,
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ModelsUpdateInvoiceRequest**| Invoice update request | |
| **id** | [**string**] | Invoice ID | defaults to undefined|


### Return type

**ModelsStandardInvoiceResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Invoice updated successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |
|**404** | Invoice not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **invoicesPost**
> ModelsStandardInvoiceResponse invoicesPost(request)

Create an invoice for a completed campaign (Admin only)

### Example

```typescript
import {
    InvoiceApi,
    Configuration,
    ModelsCreateInvoiceRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new InvoiceApi(configuration);

let request: ModelsCreateInvoiceRequest; //Invoice creation request

const { status, data } = await apiInstance.invoicesPost(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ModelsCreateInvoiceRequest**| Invoice creation request | |


### Return type

**ModelsStandardInvoiceResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Invoice created successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **invoicesSearchGet**
> ModelsPaginatedInvoiceResponse invoicesSearchGet()

Search and filter invoices with pagination (Admin & Brands only)

### Example

```typescript
import {
    InvoiceApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new InvoiceApi(configuration);

let brandId: string; // (optional) (default to undefined)
let campaignId: string; // (optional) (default to undefined)
let createdAfter: string; // (optional) (default to undefined)
let createdBefore: string; // (optional) (default to undefined)
let invoiceStatus: 'draft' | 'issued' | 'sent' | 'paid' | 'overdue' | 'cancelled'; // (optional) (default to undefined)
let limit: number; // (optional) (default to undefined)
let page: number; // (optional) (default to undefined)
let search: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.invoicesSearchGet(
    brandId,
    campaignId,
    createdAfter,
    createdBefore,
    invoiceStatus,
    limit,
    page,
    search
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **brandId** | [**string**] |  | (optional) defaults to undefined|
| **campaignId** | [**string**] |  | (optional) defaults to undefined|
| **createdAfter** | [**string**] |  | (optional) defaults to undefined|
| **createdBefore** | [**string**] |  | (optional) defaults to undefined|
| **invoiceStatus** | [**&#39;draft&#39; | &#39;issued&#39; | &#39;sent&#39; | &#39;paid&#39; | &#39;overdue&#39; | &#39;cancelled&#39;**]**Array<&#39;draft&#39; &#124; &#39;issued&#39; &#124; &#39;sent&#39; &#124; &#39;paid&#39; &#124; &#39;overdue&#39; &#124; &#39;cancelled&#39;>** |  | (optional) defaults to undefined|
| **limit** | [**number**] |  | (optional) defaults to undefined|
| **page** | [**number**] |  | (optional) defaults to undefined|
| **search** | [**string**] |  | (optional) defaults to undefined|


### Return type

**ModelsPaginatedInvoiceResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Invoices found |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**403** | Forbidden |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

