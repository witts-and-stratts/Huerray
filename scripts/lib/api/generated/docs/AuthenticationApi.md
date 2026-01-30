# AuthenticationApi

All URIs are relative to */api/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**authChangePasswordPost**](#authchangepasswordpost) | **POST** /auth/change-password | Change user password|
|[**authLoginPost**](#authloginpost) | **POST** /auth/login | User login|
|[**authLogoutPost**](#authlogoutpost) | **POST** /auth/logout | User logout|
|[**authPasswordResetConfirmPost**](#authpasswordresetconfirmpost) | **POST** /auth/password-reset/confirm | Confirm password reset|
|[**authPasswordResetPost**](#authpasswordresetpost) | **POST** /auth/password-reset | Initiate password reset|
|[**authRefreshPost**](#authrefreshpost) | **POST** /auth/refresh | Refresh access token|
|[**authRegisterPost**](#authregisterpost) | **POST** /auth/register | Register a new user|
|[**authResendVerificationPost**](#authresendverificationpost) | **POST** /auth/resend-verification | Resend email verification|
|[**authVerifyEmailPost**](#authverifyemailpost) | **POST** /auth/verify-email | Verify email|

# **authChangePasswordPost**
> ModelsStandardGenericResponse authChangePasswordPost(password)

Change password for authenticated user

### Example

```typescript
import {
    AuthenticationApi,
    Configuration,
    ModelsChangePasswordRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

let password: ModelsChangePasswordRequest; //Password change data

const { status, data } = await apiInstance.authChangePasswordPost(
    password
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **password** | **ModelsChangePasswordRequest**| Password change data | |


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
|**200** | Password changed successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Unauthorized |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authLoginPost**
> ModelsStandardAuthResponse authLoginPost(credentials)

Authenticate user with username/email and password

### Example

```typescript
import {
    AuthenticationApi,
    Configuration,
    ModelsLoginRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

let credentials: ModelsLoginRequest; //User login credentials

const { status, data } = await apiInstance.authLoginPost(
    credentials
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **credentials** | **ModelsLoginRequest**| User login credentials | |


### Return type

**ModelsStandardAuthResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Login successful |  -  |
|**400** | Bad request |  -  |
|**401** | Invalid credentials |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authLogoutPost**
> ModelsStandardGenericResponse authLogoutPost()

Logout user and invalidate tokens

### Example

```typescript
import {
    AuthenticationApi,
    Configuration
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

const { status, data } = await apiInstance.authLogoutPost();
```

### Parameters
This endpoint does not have any parameters.


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
|**200** | Logout successful |  -  |
|**401** | Unauthorized |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authPasswordResetConfirmPost**
> ModelsStandardGenericResponse authPasswordResetConfirmPost(reset)

Reset password using reset token

### Example

```typescript
import {
    AuthenticationApi,
    Configuration,
    ModelsPasswordResetConfirmRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

let reset: ModelsPasswordResetConfirmRequest; //Password reset confirmation data

const { status, data } = await apiInstance.authPasswordResetConfirmPost(
    reset
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **reset** | **ModelsPasswordResetConfirmRequest**| Password reset confirmation data | |


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
|**200** | Password reset successful |  -  |
|**400** | Bad request |  -  |
|**401** | Invalid or expired token |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authPasswordResetPost**
> ModelsStandardGenericResponse authPasswordResetPost(email)

Send password reset email to user

### Example

```typescript
import {
    AuthenticationApi,
    Configuration,
    ModelsPasswordResetRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

let email: ModelsPasswordResetRequest; //Email for password reset

const { status, data } = await apiInstance.authPasswordResetPost(
    email
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **email** | **ModelsPasswordResetRequest**| Email for password reset | |


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
|**200** | Password reset email sent |  -  |
|**400** | Bad request |  -  |
|**404** | User not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authRefreshPost**
> ModelsStandardAuthResponse authRefreshPost(refresh)

Generate new access token using refresh token

### Example

```typescript
import {
    AuthenticationApi,
    Configuration,
    ModelsRefreshTokenRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

let refresh: ModelsRefreshTokenRequest; //Refresh token data

const { status, data } = await apiInstance.authRefreshPost(
    refresh
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **refresh** | **ModelsRefreshTokenRequest**| Refresh token data | |


### Return type

**ModelsStandardAuthResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Token refreshed successfully |  -  |
|**400** | Bad request |  -  |
|**401** | Invalid refresh token |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authRegisterPost**
> ModelsStandardAuthResponse authRegisterPost(user)

Register a new user with email and password

### Example

```typescript
import {
    AuthenticationApi,
    Configuration,
    ModelsRegisterRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

let user: ModelsRegisterRequest; //User registration data

const { status, data } = await apiInstance.authRegisterPost(
    user
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **user** | **ModelsRegisterRequest**| User registration data | |


### Return type

**ModelsStandardAuthResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | User registered successfully |  -  |
|**400** | Bad request |  -  |
|**409** | User already exists |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authResendVerificationPost**
> ModelsStandardGenericResponse authResendVerificationPost(request)

Resend email verification to user

### Example

```typescript
import {
    AuthenticationApi,
    Configuration,
    ModelsResendVerificationRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

let request: ModelsResendVerificationRequest; //Resend email verification request

const { status, data } = await apiInstance.authResendVerificationPost(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ModelsResendVerificationRequest**| Resend email verification request | |


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
|**200** | Email verification resent successfully |  -  |
|**400** | Bad request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authVerifyEmailPost**
> ModelsStandardGenericResponse authVerifyEmailPost(request)

Verify user email using token

### Example

```typescript
import {
    AuthenticationApi,
    Configuration,
    ModelsEmailVerificationRequest
} from 'huerray-api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

let request: ModelsEmailVerificationRequest; //Email verification request

const { status, data } = await apiInstance.authVerifyEmailPost(
    request
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ModelsEmailVerificationRequest**| Email verification request | |


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
|**200** | Email verified successfully |  -  |
|**400** | Bad request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

