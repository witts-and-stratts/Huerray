# ModelsCreateCreatorRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**application_video** | [**ModelsContentMedia**](ModelsContentMedia.md) |  | [default to undefined]
**bank_account_name** | **string** | Bank &amp; Tax Details | [optional] [default to undefined]
**bank_account_number** | **string** |  | [optional] [default to undefined]
**bank_address** | **string** |  | [optional] [default to undefined]
**bank_name** | **string** |  | [optional] [default to undefined]
**bank_routing_number** | **string** |  | [optional] [default to undefined]
**bio** | **string** |  | [optional] [default to undefined]
**city** | **string** |  | [default to undefined]
**country** | [**UtilsCountryCode**](UtilsCountryCode.md) |  | [default to undefined]
**date_of_birth** | **string** |  | [default to undefined]
**gender** | **string** | Personal Details | [default to undefined]
**instagram_handle** | **string** |  | [optional] [default to undefined]
**phone_number** | **string** | Creator Profile Fields | [optional] [default to undefined]
**portfolio** | **string** | JSON array of portfolio URLs | [optional] [default to undefined]
**preferred_categories** | [**Array&lt;UtilsBrandCategory&gt;**](UtilsBrandCategory.md) | Categories | [optional] [default to undefined]
**profile_image** | [**ModelsContentMedia**](ModelsContentMedia.md) | URL to creator\&#39;s profile image | [optional] [default to undefined]
**state** | **string** |  | [default to undefined]
**street** | **string** |  | [optional] [default to undefined]
**tax_country** | [**UtilsCountryCode**](UtilsCountryCode.md) |  | [optional] [default to undefined]
**tax_id** | **string** |  | [optional] [default to undefined]
**tiktok_handle** | **string** |  | [optional] [default to undefined]
**twitter_handle** | **string** |  | [optional] [default to undefined]
**youtube_handle** | **string** |  | [optional] [default to undefined]
**zipcode** | **string** |  | [default to undefined]

## Example

```typescript
import { ModelsCreateCreatorRequest } from 'huerray-api';

const instance: ModelsCreateCreatorRequest = {
    application_video,
    bank_account_name,
    bank_account_number,
    bank_address,
    bank_name,
    bank_routing_number,
    bio,
    city,
    country,
    date_of_birth,
    gender,
    instagram_handle,
    phone_number,
    portfolio,
    preferred_categories,
    profile_image,
    state,
    street,
    tax_country,
    tax_id,
    tiktok_handle,
    twitter_handle,
    youtube_handle,
    zipcode,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
