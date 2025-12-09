# ModelsCreateGigRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**age_max** | **number** |  | [optional] [default to undefined]
**age_min** | **number** |  | [optional] [default to undefined]
**ambience** | **string** |  | [optional] [default to undefined]
**campaign_id** | **string** |  | [default to undefined]
**compensation** | **number** | Amount per video | [default to undefined]
**content_guidelines** | **string** |  | [optional] [default to undefined]
**enforce_single_creator_submission** | **boolean** |  | [optional] [default to undefined]
**enforce_unique_creator_submission** | **boolean** |  | [optional] [default to undefined]
**gender_requirement** | **string** |  | [optional] [default to undefined]
**gig_cost** | **number** | Total | [default to undefined]
**number_of_videos** | **number** |  | [default to undefined]
**posting_end_date** | **string** |  | [default to undefined]
**posting_start_date** | **string** |  | [default to undefined]
**requirements** | **string** |  | [optional] [default to undefined]
**title** | **string** |  | [default to undefined]
**video_duration_in_seconds** | **number** | in seconds | [default to undefined]

## Example

```typescript
import { ModelsCreateGigRequest } from 'huerray-api';

const instance: ModelsCreateGigRequest = {
    age_max,
    age_min,
    ambience,
    campaign_id,
    compensation,
    content_guidelines,
    enforce_single_creator_submission,
    enforce_unique_creator_submission,
    gender_requirement,
    gig_cost,
    number_of_videos,
    posting_end_date,
    posting_start_date,
    requirements,
    title,
    video_duration_in_seconds,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
