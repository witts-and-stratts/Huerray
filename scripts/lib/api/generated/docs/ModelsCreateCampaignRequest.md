# ModelsCreateCampaignRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**allow_multiple_videos** | **boolean** |  | [optional] [default to undefined]
**campaign_documents** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**campaign_images** | **Array&lt;string&gt;** |  | [optional] [default to undefined]
**campaign_name** | **string** |  | [default to undefined]
**category** | [**UtilsCampaignCategory**](UtilsCampaignCategory.md) |  | [default to undefined]
**content_type** | [**UtilsContentType**](UtilsContentType.md) |  | [default to undefined]
**description** | **string** |  | [default to undefined]
**donts** | **string** |  | [optional] [default to undefined]
**dos** | **string** |  | [optional] [default to undefined]
**keywords** | **string** |  | [optional] [default to undefined]
**number_of_creators_wanted** | **number** |  | [default to undefined]
**number_of_videos_wanted** | **number** |  | [default to undefined]
**product_image_url** | **string** |  | [optional] [default to undefined]
**product_url** | **string** |  | [optional] [default to undefined]
**tone_of_voice** | **string** |  | [optional] [default to undefined]
**video_duration_in_seconds_in_seconds** | **number** | in seconds | [default to undefined]
**video_format** | [**UtilsVideoFormat**](UtilsVideoFormat.md) |  | [default to undefined]

## Example

```typescript
import { ModelsCreateCampaignRequest } from 'huerray-api';

const instance: ModelsCreateCampaignRequest = {
    allow_multiple_videos,
    campaign_documents,
    campaign_images,
    campaign_name,
    category,
    content_type,
    description,
    donts,
    dos,
    keywords,
    number_of_creators_wanted,
    number_of_videos_wanted,
    product_image_url,
    product_url,
    tone_of_voice,
    video_duration_in_seconds_in_seconds,
    video_format,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
