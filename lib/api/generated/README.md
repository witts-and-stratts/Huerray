## huerray-api@1.0

This generator creates TypeScript/JavaScript client that utilizes [axios](https://github.com/axios/axios). The generated Node module can be used in the following environments:

Environment
* Node.js
* Webpack
* Browserify

Language level
* ES5 - you must have a Promises/A+ library installed
* ES6

Module system
* CommonJS
* ES6 module system

It can be used in both TypeScript and JavaScript. In TypeScript, the definition will be automatically resolved via `package.json`. ([Reference](https://www.typescriptlang.org/docs/handbook/declaration-files/consumption.html))

### Building

To build and compile the typescript sources to javascript use:
```
npm install
npm run build
```

### Publishing

First build the package then run `npm publish`

### Consuming

navigate to the folder of your consuming project and run one of the following commands.

_published:_

```
npm install huerray-api@1.0 --save
```

_unPublished (not recommended):_

```
npm install PATH_TO_GENERATED_PACKAGE --save
```

### Documentation for API Endpoints

All URIs are relative to */api/v1*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*AnalyticsApi* | [**analyticsBrandGet**](docs/AnalyticsApi.md#analyticsbrandget) | **GET** /analytics/brand | Get brand analytics
*AnalyticsApi* | [**analyticsBrandPeriodGet**](docs/AnalyticsApi.md#analyticsbrandperiodget) | **GET** /analytics/brand/period | Get brand analytics by period
*AnalyticsApi* | [**analyticsCreatorGet**](docs/AnalyticsApi.md#analyticscreatorget) | **GET** /analytics/creator | Get creator analytics
*AnalyticsApi* | [**analyticsCreatorPeriodGet**](docs/AnalyticsApi.md#analyticscreatorperiodget) | **GET** /analytics/creator/period | Get creator analytics by period
*AnalyticsApi* | [**analyticsPlatformGet**](docs/AnalyticsApi.md#analyticsplatformget) | **GET** /analytics/platform | Get platform analytics
*AnalyticsApi* | [**analyticsPlatformPeriodGet**](docs/AnalyticsApi.md#analyticsplatformperiodget) | **GET** /analytics/platform/period | Get platform analytics by period
*AnalyticsApi* | [**analyticsTimeSeriesGet**](docs/AnalyticsApi.md#analyticstimeseriesget) | **GET** /analytics/time-series | Get analytics time series
*AuthenticationApi* | [**authChangePasswordPost**](docs/AuthenticationApi.md#authchangepasswordpost) | **POST** /auth/change-password | Change user password
*AuthenticationApi* | [**authLoginPost**](docs/AuthenticationApi.md#authloginpost) | **POST** /auth/login | User login
*AuthenticationApi* | [**authLogoutPost**](docs/AuthenticationApi.md#authlogoutpost) | **POST** /auth/logout | User logout
*AuthenticationApi* | [**authPasswordResetConfirmPost**](docs/AuthenticationApi.md#authpasswordresetconfirmpost) | **POST** /auth/password-reset/confirm | Confirm password reset
*AuthenticationApi* | [**authPasswordResetPost**](docs/AuthenticationApi.md#authpasswordresetpost) | **POST** /auth/password-reset | Initiate password reset
*AuthenticationApi* | [**authRefreshPost**](docs/AuthenticationApi.md#authrefreshpost) | **POST** /auth/refresh | Refresh access token
*AuthenticationApi* | [**authRegisterPost**](docs/AuthenticationApi.md#authregisterpost) | **POST** /auth/register | Register a new user
*AuthenticationApi* | [**authResendVerificationPost**](docs/AuthenticationApi.md#authresendverificationpost) | **POST** /auth/resend-verification | Resend email verification
*AuthenticationApi* | [**authVerifyEmailPost**](docs/AuthenticationApi.md#authverifyemailpost) | **POST** /auth/verify-email | Verify email
*BrandApi* | [**brandsGet**](docs/BrandApi.md#brandsget) | **GET** /brands | Get user brands
*BrandApi* | [**brandsGigsGet**](docs/BrandApi.md#brandsgigsget) | **GET** /brands/gigs | Search gigs for brand
*BrandApi* | [**brandsIdDelete**](docs/BrandApi.md#brandsiddelete) | **DELETE** /brands/{id} | Delete brand
*BrandApi* | [**brandsIdGet**](docs/BrandApi.md#brandsidget) | **GET** /brands/{id} | Get brand by ID
*BrandApi* | [**brandsIdStatusPut**](docs/BrandApi.md#brandsidstatusput) | **PUT** /brands/{id}/status | Update brand status
*BrandApi* | [**brandsPost**](docs/BrandApi.md#brandspost) | **POST** /brands | Create brand
*BrandApi* | [**brandsPut**](docs/BrandApi.md#brandsput) | **PUT** /brands | Update brand
*BrandApi* | [**brandsSearchCampaignsGet**](docs/BrandApi.md#brandssearchcampaignsget) | **GET** /brands/search/campaigns | Search campaigns for brand
*BrandApi* | [**brandsSearchCreatorsGet**](docs/BrandApi.md#brandssearchcreatorsget) | **GET** /brands/search/creators | Search creators for brand
*BrandApi* | [**brandsSearchGet**](docs/BrandApi.md#brandssearchget) | **GET** /brands/search | Search brands
*BrandApi* | [**brandsSearchVideoSubmissionsGet**](docs/BrandApi.md#brandssearchvideosubmissionsget) | **GET** /brands/search/video-submissions | Search video submissions for brand
*CacheApi* | [**cacheClearDelete**](docs/CacheApi.md#cachecleardelete) | **DELETE** /cache/clear | Clear translation cache
*CacheApi* | [**cacheStatsGet**](docs/CacheApi.md#cachestatsget) | **GET** /cache/stats | Get translation cache statistics
*CampaignsApi* | [**campaignsIdApplicationsGet**](docs/CampaignsApi.md#campaignsidapplicationsget) | **GET** /campaigns/{id}/applications | Get campaign applications
*CampaignsApi* | [**campaignsIdApprovePut**](docs/CampaignsApi.md#campaignsidapproveput) | **PUT** /campaigns/{id}/approve | Admin approve campaign
*CampaignsApi* | [**campaignsIdDecisionPut**](docs/CampaignsApi.md#campaignsiddecisionput) | **PUT** /campaigns/{id}/decision | Brand decision on campaign
*CampaignsApi* | [**campaignsIdDelete**](docs/CampaignsApi.md#campaignsiddelete) | **DELETE** /campaigns/{id} | Delete campaign
*CampaignsApi* | [**campaignsIdGet**](docs/CampaignsApi.md#campaignsidget) | **GET** /campaigns/{id} | Get campaign by ID
*CampaignsApi* | [**campaignsIdInvitationsGet**](docs/CampaignsApi.md#campaignsidinvitationsget) | **GET** /campaigns/{id}/invitations | Get gig invitations by campaign
*CampaignsApi* | [**campaignsIdPut**](docs/CampaignsApi.md#campaignsidput) | **PUT** /campaigns/{id} | Update campaign
*CampaignsApi* | [**campaignsIdStatusPut**](docs/CampaignsApi.md#campaignsidstatusput) | **PUT** /campaigns/{id}/status | Update campaign status
*CampaignsApi* | [**campaignsIdSubmitPost**](docs/CampaignsApi.md#campaignsidsubmitpost) | **POST** /campaigns/{id}/submit | Submit campaign for approval
*CampaignsApi* | [**campaignsIdVideoSubmissionsGet**](docs/CampaignsApi.md#campaignsidvideosubmissionsget) | **GET** /campaigns/{id}/video-submissions | Get video submissions by campaign ID
*CampaignsApi* | [**campaignsPost**](docs/CampaignsApi.md#campaignspost) | **POST** /campaigns | Create a new campaign
*CampaignsApi* | [**campaignsSearchGet**](docs/CampaignsApi.md#campaignssearchget) | **GET** /campaigns/search | Search campaigns
*CasesApi* | [**casesGet**](docs/CasesApi.md#casesget) | **GET** /cases | Search cases
*CasesApi* | [**casesIdAssignPut**](docs/CasesApi.md#casesidassignput) | **PUT** /cases/{id}/assign | Assign case to admin
*CasesApi* | [**casesIdGet**](docs/CasesApi.md#casesidget) | **GET** /cases/{id} | Get case by ID
*CasesApi* | [**casesIdMessagesGet**](docs/CasesApi.md#casesidmessagesget) | **GET** /cases/{id}/messages | Get case messages
*CasesApi* | [**casesIdMessagesPost**](docs/CasesApi.md#casesidmessagespost) | **POST** /cases/{id}/messages | Add message to case
*CasesApi* | [**casesIdStatusPut**](docs/CasesApi.md#casesidstatusput) | **PUT** /cases/{id}/status | Update case status
*CasesApi* | [**casesPost**](docs/CasesApi.md#casespost) | **POST** /cases | Create a new case
*CommentsApi* | [**commentsGet**](docs/CommentsApi.md#commentsget) | **GET** /comments | Get comments for an entity
*CommentsApi* | [**commentsIdDelete**](docs/CommentsApi.md#commentsiddelete) | **DELETE** /comments/{id} | Delete a comment
*CommentsApi* | [**commentsIdPut**](docs/CommentsApi.md#commentsidput) | **PUT** /comments/{id} | Update a comment
*CommentsApi* | [**commentsPost**](docs/CommentsApi.md#commentspost) | **POST** /comments | Add a new comment
*CreatorApi* | [**creatorsActiveGigsGet**](docs/CreatorApi.md#creatorsactivegigsget) | **GET** /creators/active-gigs | Get active gigs for the logged-in creator
*CreatorApi* | [**creatorsApplicationsGet**](docs/CreatorApi.md#creatorsapplicationsget) | **GET** /creators/applications | Get creator applications
*CreatorApi* | [**creatorsBankDetailsGet**](docs/CreatorApi.md#creatorsbankdetailsget) | **GET** /creators/bank-details | Get creator bank details
*CreatorApi* | [**creatorsBankDetailsPut**](docs/CreatorApi.md#creatorsbankdetailsput) | **PUT** /creators/bank-details | Update creator bank details
*CreatorApi* | [**creatorsIdBankDetailsGet**](docs/CreatorApi.md#creatorsidbankdetailsget) | **GET** /creators/{id}/bank-details | Get creator bank details by creator ID (Admin only)
*CreatorApi* | [**creatorsIdGet**](docs/CreatorApi.md#creatorsidget) | **GET** /creators/{id} | Get creator by ID
*CreatorApi* | [**creatorsIdProfileStatusPut**](docs/CreatorApi.md#creatorsidprofilestatusput) | **PUT** /creators/{id}/profile-status | Update creator profile status
*CreatorApi* | [**creatorsMatchingGigsGet**](docs/CreatorApi.md#creatorsmatchinggigsget) | **GET** /creators/matching-gigs | Get matching gigs
*CreatorApi* | [**creatorsPaymentItemsSearchGet**](docs/CreatorApi.md#creatorspaymentitemssearchget) | **GET** /creators/payment-items/search | Search creator\&#39;s payment items
*CreatorApi* | [**creatorsPaymentsIdGet**](docs/CreatorApi.md#creatorspaymentsidget) | **GET** /creators/payments/{id} | Get creator\&#39;s payment by ID
*CreatorApi* | [**creatorsPaymentsSearchGet**](docs/CreatorApi.md#creatorspaymentssearchget) | **GET** /creators/payments/search | Search creator\&#39;s payments
*CreatorApi* | [**creatorsProfileDraftPost**](docs/CreatorApi.md#creatorsprofiledraftpost) | **POST** /creators/profile/draft | Save creator profile as draft
*CreatorApi* | [**creatorsProfileGet**](docs/CreatorApi.md#creatorsprofileget) | **GET** /creators/profile | Get creator profile
*CreatorApi* | [**creatorsProfilePost**](docs/CreatorApi.md#creatorsprofilepost) | **POST** /creators/profile | Create creator profile
*CreatorApi* | [**creatorsProfilePut**](docs/CreatorApi.md#creatorsprofileput) | **PUT** /creators/profile | Update creator profile
*CreatorApi* | [**creatorsProfileSubmitPost**](docs/CreatorApi.md#creatorsprofilesubmitpost) | **POST** /creators/profile/submit | Submit creator profile for admin approval
*CreatorApi* | [**creatorsSearchGet**](docs/CreatorApi.md#creatorssearchget) | **GET** /creators/search | Search creators
*CreatorApi* | [**creatorsSearchGigsGet**](docs/CreatorApi.md#creatorssearchgigsget) | **GET** /creators/search/gigs | Search gigs for creator
*CreatorApi* | [**creatorsSearchVideoSubmissionsGet**](docs/CreatorApi.md#creatorssearchvideosubmissionsget) | **GET** /creators/search/video-submissions | Search video submissions for creator
*GigsApi* | [**gigsApplicationsApplicationIdStatusPut**](docs/GigsApi.md#gigsapplicationsapplicationidstatusput) | **PUT** /gigs/applications/{applicationId}/status | Update application status
*GigsApi* | [**gigsCampaignsCampaignIdGet**](docs/GigsApi.md#gigscampaignscampaignidget) | **GET** /gigs/campaigns/{campaign_id} | Get gigs by campaign
*GigsApi* | [**gigsIdApplicationsGet**](docs/GigsApi.md#gigsidapplicationsget) | **GET** /gigs/{id}/applications | Get gig applications
*GigsApi* | [**gigsIdApplyPost**](docs/GigsApi.md#gigsidapplypost) | **POST** /gigs/{id}/apply | Apply to gig
*GigsApi* | [**gigsIdDelete**](docs/GigsApi.md#gigsiddelete) | **DELETE** /gigs/{id} | Delete gig
*GigsApi* | [**gigsIdGet**](docs/GigsApi.md#gigsidget) | **GET** /gigs/{id} | Get gig by ID
*GigsApi* | [**gigsIdInvitationsGet**](docs/GigsApi.md#gigsidinvitationsget) | **GET** /gigs/{id}/invitations | Get gig invitations
*GigsApi* | [**gigsIdInvitePost**](docs/GigsApi.md#gigsidinvitepost) | **POST** /gigs/{id}/invite | Invite creator to gig
*GigsApi* | [**gigsIdPut**](docs/GigsApi.md#gigsidput) | **PUT** /gigs/{id} | Update gig
*GigsApi* | [**gigsIdStatusPut**](docs/GigsApi.md#gigsidstatusput) | **PUT** /gigs/{id}/status | Update gig status
*GigsApi* | [**gigsInvitationsGet**](docs/GigsApi.md#gigsinvitationsget) | **GET** /gigs/invitations | Get creator invitations
*GigsApi* | [**gigsInvitationsInvitationIdRespondPut**](docs/GigsApi.md#gigsinvitationsinvitationidrespondput) | **PUT** /gigs/invitations/{invitationId}/respond | Respond to gig invitation
*GigsApi* | [**gigsPost**](docs/GigsApi.md#gigspost) | **POST** /gigs | Create a new gig
*GigsApi* | [**gigsSearchGet**](docs/GigsApi.md#gigssearchget) | **GET** /gigs/search | Search gigs
*InvoiceApi* | [**invoicesIdGeneratePdfPost**](docs/InvoiceApi.md#invoicesidgeneratepdfpost) | **POST** /invoices/{id}/generate-pdf | Generate PDF for existing invoice
*InvoiceApi* | [**invoicesIdGet**](docs/InvoiceApi.md#invoicesidget) | **GET** /invoices/{id} | Get invoice by ID
*InvoiceApi* | [**invoicesIdStatusPut**](docs/InvoiceApi.md#invoicesidstatusput) | **PUT** /invoices/{id}/status | Update invoice status
*InvoiceApi* | [**invoicesPost**](docs/InvoiceApi.md#invoicespost) | **POST** /invoices | Create invoice for campaign
*InvoiceApi* | [**invoicesSearchGet**](docs/InvoiceApi.md#invoicessearchget) | **GET** /invoices/search | Search invoices (Admin &amp; Brands)
*NotificationsApi* | [**notificationsGet**](docs/NotificationsApi.md#notificationsget) | **GET** /notifications | Get user notifications
*NotificationsApi* | [**notificationsIdDelete**](docs/NotificationsApi.md#notificationsiddelete) | **DELETE** /notifications/{id} | Delete notification
*NotificationsApi* | [**notificationsIdReadPut**](docs/NotificationsApi.md#notificationsidreadput) | **PUT** /notifications/{id}/read | Mark notification as read
*NotificationsApi* | [**notificationsPost**](docs/NotificationsApi.md#notificationspost) | **POST** /notifications | Create a new notification (Admin only)
*NotificationsApi* | [**notificationsReadAllPut**](docs/NotificationsApi.md#notificationsreadallput) | **PUT** /notifications/read-all | Mark all notifications as read
*NotificationsApi* | [**notificationsStatsGet**](docs/NotificationsApi.md#notificationsstatsget) | **GET** /notifications/stats | Get notification statistics
*PaymentApi* | [**paymentsIdDelete**](docs/PaymentApi.md#paymentsiddelete) | **DELETE** /payments/{id} | Delete payment by ID
*PaymentApi* | [**paymentsIdGet**](docs/PaymentApi.md#paymentsidget) | **GET** /payments/{id} | Get payment by ID
*PaymentApi* | [**paymentsIdStatusPut**](docs/PaymentApi.md#paymentsidstatusput) | **PUT** /payments/{id}/status | Update payment status
*PaymentApi* | [**paymentsPost**](docs/PaymentApi.md#paymentspost) | **POST** /payments | Create payment batch
*PaymentApi* | [**paymentsSearchGet**](docs/PaymentApi.md#paymentssearchget) | **GET** /payments/search | Search payments
*PaymentItemsApi* | [**paymentItemsPost**](docs/PaymentItemsApi.md#paymentitemspost) | **POST** /payment-items | Create payment item
*PaymentItemsApi* | [**paymentItemsSearchGet**](docs/PaymentItemsApi.md#paymentitemssearchget) | **GET** /payment-items/search | Search payment items
*SystemApi* | [**healthGet**](docs/SystemApi.md#healthget) | **GET** /health | Health check
*TranslationApi* | [**translationLanguagesGet**](docs/TranslationApi.md#translationlanguagesget) | **GET** /translation/languages | Get supported languages from DeepL API
*TranslationApi* | [**translationTranslatePost**](docs/TranslationApi.md#translationtranslatepost) | **POST** /translation/translate | Translate text using DeepL API
*UploadApi* | [**uploadsApplicationVideoPost**](docs/UploadApi.md#uploadsapplicationvideopost) | **POST** /uploads/application-video | Upload application video
*UploadApi* | [**uploadsDocumentsPost**](docs/UploadApi.md#uploadsdocumentspost) | **POST** /uploads/documents | Upload documents
*UploadApi* | [**uploadsImagesPost**](docs/UploadApi.md#uploadsimagespost) | **POST** /uploads/images | Upload images
*UploadApi* | [**uploadsPreviewDocumentsFilenameGet**](docs/UploadApi.md#uploadspreviewdocumentsfilenameget) | **GET** /uploads/preview/documents/{filename} | Preview a document
*UploadApi* | [**uploadsPreviewImagesFilenameGet**](docs/UploadApi.md#uploadspreviewimagesfilenameget) | **GET** /uploads/preview/images/{filename} | Preview an image
*UploadApi* | [**uploadsPreviewVideosFilenameGet**](docs/UploadApi.md#uploadspreviewvideosfilenameget) | **GET** /uploads/preview/videos/{filename} | Preview a video
*UploadApi* | [**uploadsVideoSubmissionPost**](docs/UploadApi.md#uploadsvideosubmissionpost) | **POST** /uploads/video-submission | Upload video submission
*UploadApi* | [**uploadsVideosPost**](docs/UploadApi.md#uploadsvideospost) | **POST** /uploads/videos | Upload videos
*UserApi* | [**usersIdDelete**](docs/UserApi.md#usersiddelete) | **DELETE** /users/{id} | Delete user profile
*UserApi* | [**usersIdGet**](docs/UserApi.md#usersidget) | **GET** /users/{id} | Get user by ID
*UserApi* | [**usersIdPut**](docs/UserApi.md#usersidput) | **PUT** /users/{id} | Edit user details
*UserApi* | [**usersPost**](docs/UserApi.md#userspost) | **POST** /users | Create admin user
*UserApi* | [**usersProfileGet**](docs/UserApi.md#usersprofileget) | **GET** /users/profile | Get user profile
*UserApi* | [**usersProfilePut**](docs/UserApi.md#usersprofileput) | **PUT** /users/profile | Update user profile
*UserApi* | [**usersSearchGet**](docs/UserApi.md#userssearchget) | **GET** /users/search | Search users
*VideoSubmissionsApi* | [**videosCampaignCampaignIdGet**](docs/VideoSubmissionsApi.md#videoscampaigncampaignidget) | **GET** /videos/campaign/{campaignId} | Get video submissions by campaign
*VideoSubmissionsApi* | [**videosGigGigIdGet**](docs/VideoSubmissionsApi.md#videosgiggigidget) | **GET** /videos/gig/{gigId} | Get video submissions by gig
*VideoSubmissionsApi* | [**videosIdDecisionPut**](docs/VideoSubmissionsApi.md#videosiddecisionput) | **PUT** /videos/{id}/decision | Brand makes decision on video submission
*VideoSubmissionsApi* | [**videosIdDelete**](docs/VideoSubmissionsApi.md#videosiddelete) | **DELETE** /videos/{id} | Delete video submission
*VideoSubmissionsApi* | [**videosIdGet**](docs/VideoSubmissionsApi.md#videosidget) | **GET** /videos/{id} | Get video submission by ID
*VideoSubmissionsApi* | [**videosIdPut**](docs/VideoSubmissionsApi.md#videosidput) | **PUT** /videos/{id} | Update video submission
*VideoSubmissionsApi* | [**videosIdStatusPut**](docs/VideoSubmissionsApi.md#videosidstatusput) | **PUT** /videos/{id}/status | Update video submission status
*VideoSubmissionsApi* | [**videosIdSubmitPut**](docs/VideoSubmissionsApi.md#videosidsubmitput) | **PUT** /videos/{id}/submit | Submit video for approval
*VideoSubmissionsApi* | [**videosMySubmissionsGet**](docs/VideoSubmissionsApi.md#videosmysubmissionsget) | **GET** /videos/my-submissions | Get creator\&#39;s video submissions
*VideoSubmissionsApi* | [**videosPost**](docs/VideoSubmissionsApi.md#videospost) | **POST** /videos | Create video submission
*VideoSubmissionsApi* | [**videosSearchGet**](docs/VideoSubmissionsApi.md#videossearchget) | **GET** /videos/search | Search video submissions (Admin only)


### Documentation For Models

 - [ModelsAdminCampaignApprovalRequest](docs/ModelsAdminCampaignApprovalRequest.md)
 - [ModelsAnalyticsTimeSeriesData](docs/ModelsAnalyticsTimeSeriesData.md)
 - [ModelsAnalyticsTimeSeriesResponse](docs/ModelsAnalyticsTimeSeriesResponse.md)
 - [ModelsApplicationVideoUploadResponse](docs/ModelsApplicationVideoUploadResponse.md)
 - [ModelsAssignCaseRequest](docs/ModelsAssignCaseRequest.md)
 - [ModelsAuthResponse](docs/ModelsAuthResponse.md)
 - [ModelsBrandAnalyticsResponse](docs/ModelsBrandAnalyticsResponse.md)
 - [ModelsBrandCampaignDecisionRequest](docs/ModelsBrandCampaignDecisionRequest.md)
 - [ModelsBrandRequest](docs/ModelsBrandRequest.md)
 - [ModelsBrandResponse](docs/ModelsBrandResponse.md)
 - [ModelsBrandStatusUpdateRequest](docs/ModelsBrandStatusUpdateRequest.md)
 - [ModelsBrandStatusUpdateResponse](docs/ModelsBrandStatusUpdateResponse.md)
 - [ModelsBrandVideoDecisionRequest](docs/ModelsBrandVideoDecisionRequest.md)
 - [ModelsCampaignBrandResponse](docs/ModelsCampaignBrandResponse.md)
 - [ModelsCampaignResponse](docs/ModelsCampaignResponse.md)
 - [ModelsCampaignStatusUpdateRequest](docs/ModelsCampaignStatusUpdateRequest.md)
 - [ModelsCaseMessageResponse](docs/ModelsCaseMessageResponse.md)
 - [ModelsCaseResponse](docs/ModelsCaseResponse.md)
 - [ModelsCaseUserSummary](docs/ModelsCaseUserSummary.md)
 - [ModelsChangePasswordRequest](docs/ModelsChangePasswordRequest.md)
 - [ModelsCommentEditRequest](docs/ModelsCommentEditRequest.md)
 - [ModelsCommentRequest](docs/ModelsCommentRequest.md)
 - [ModelsCommentResponse](docs/ModelsCommentResponse.md)
 - [ModelsContentMedia](docs/ModelsContentMedia.md)
 - [ModelsCreateAdminRequest](docs/ModelsCreateAdminRequest.md)
 - [ModelsCreateCampaignRequest](docs/ModelsCreateCampaignRequest.md)
 - [ModelsCreateCaseMessageRequest](docs/ModelsCreateCaseMessageRequest.md)
 - [ModelsCreateCaseRequest](docs/ModelsCreateCaseRequest.md)
 - [ModelsCreateCreatorRequest](docs/ModelsCreateCreatorRequest.md)
 - [ModelsCreateGigRequest](docs/ModelsCreateGigRequest.md)
 - [ModelsCreateInvoiceRequest](docs/ModelsCreateInvoiceRequest.md)
 - [ModelsCreateNotificationRequest](docs/ModelsCreateNotificationRequest.md)
 - [ModelsCreatePaymentItemRequest](docs/ModelsCreatePaymentItemRequest.md)
 - [ModelsCreatePaymentRequest](docs/ModelsCreatePaymentRequest.md)
 - [ModelsCreateVideoSubmissionRequest](docs/ModelsCreateVideoSubmissionRequest.md)
 - [ModelsCreatorAnalyticsResponse](docs/ModelsCreatorAnalyticsResponse.md)
 - [ModelsCreatorBankTaxDetailsResponse](docs/ModelsCreatorBankTaxDetailsResponse.md)
 - [ModelsCreatorResponse](docs/ModelsCreatorResponse.md)
 - [ModelsCreatorStatusUpdateRequest](docs/ModelsCreatorStatusUpdateRequest.md)
 - [ModelsCreatorStatusUpdateResponse](docs/ModelsCreatorStatusUpdateResponse.md)
 - [ModelsEditUserRequest](docs/ModelsEditUserRequest.md)
 - [ModelsEmailVerificationRequest](docs/ModelsEmailVerificationRequest.md)
 - [ModelsErrorInfo](docs/ModelsErrorInfo.md)
 - [ModelsFilePreviewResponse](docs/ModelsFilePreviewResponse.md)
 - [ModelsFileUploadResponse](docs/ModelsFileUploadResponse.md)
 - [ModelsGigApplicationRequest](docs/ModelsGigApplicationRequest.md)
 - [ModelsGigApplicationResponse](docs/ModelsGigApplicationResponse.md)
 - [ModelsGigBrandListResponse](docs/ModelsGigBrandListResponse.md)
 - [ModelsGigBrandResponse](docs/ModelsGigBrandResponse.md)
 - [ModelsGigCreatorListResponse](docs/ModelsGigCreatorListResponse.md)
 - [ModelsGigCreatorResponse](docs/ModelsGigCreatorResponse.md)
 - [ModelsGigInvitationRequest](docs/ModelsGigInvitationRequest.md)
 - [ModelsGigInvitationResponse](docs/ModelsGigInvitationResponse.md)
 - [ModelsGigInvitationResponseRequest](docs/ModelsGigInvitationResponseRequest.md)
 - [ModelsGigResponse](docs/ModelsGigResponse.md)
 - [ModelsGigStatusUpdateRequest](docs/ModelsGigStatusUpdateRequest.md)
 - [ModelsHealthResponse](docs/ModelsHealthResponse.md)
 - [ModelsInvoiceItemResponse](docs/ModelsInvoiceItemResponse.md)
 - [ModelsInvoicePDFGeneratedResponse](docs/ModelsInvoicePDFGeneratedResponse.md)
 - [ModelsInvoiceResponse](docs/ModelsInvoiceResponse.md)
 - [ModelsLoginRequest](docs/ModelsLoginRequest.md)
 - [ModelsMessage](docs/ModelsMessage.md)
 - [ModelsMoney](docs/ModelsMoney.md)
 - [ModelsNotificationListResponse](docs/ModelsNotificationListResponse.md)
 - [ModelsNotificationResponse](docs/ModelsNotificationResponse.md)
 - [ModelsPaginatedBrandResponses](docs/ModelsPaginatedBrandResponses.md)
 - [ModelsPaginatedCampaignResponse](docs/ModelsPaginatedCampaignResponse.md)
 - [ModelsPaginatedCaseResponse](docs/ModelsPaginatedCaseResponse.md)
 - [ModelsPaginatedCreatorResponse](docs/ModelsPaginatedCreatorResponse.md)
 - [ModelsPaginatedGigBrandResponse](docs/ModelsPaginatedGigBrandResponse.md)
 - [ModelsPaginatedGigCreatorResponse](docs/ModelsPaginatedGigCreatorResponse.md)
 - [ModelsPaginatedGigResponse](docs/ModelsPaginatedGigResponse.md)
 - [ModelsPaginatedInvoiceResponse](docs/ModelsPaginatedInvoiceResponse.md)
 - [ModelsPaginatedPaymentItemResponse](docs/ModelsPaginatedPaymentItemResponse.md)
 - [ModelsPaginatedPaymentResponse](docs/ModelsPaginatedPaymentResponse.md)
 - [ModelsPaginatedUserResponse](docs/ModelsPaginatedUserResponse.md)
 - [ModelsPaginatedVideoSubmissionResponse](docs/ModelsPaginatedVideoSubmissionResponse.md)
 - [ModelsPagination](docs/ModelsPagination.md)
 - [ModelsPasswordResetConfirmRequest](docs/ModelsPasswordResetConfirmRequest.md)
 - [ModelsPasswordResetRequest](docs/ModelsPasswordResetRequest.md)
 - [ModelsPaymentItemResponse](docs/ModelsPaymentItemResponse.md)
 - [ModelsPaymentResponse](docs/ModelsPaymentResponse.md)
 - [ModelsPlatformAnalyticsResponse](docs/ModelsPlatformAnalyticsResponse.md)
 - [ModelsRefreshTokenRequest](docs/ModelsRefreshTokenRequest.md)
 - [ModelsRegisterRequest](docs/ModelsRegisterRequest.md)
 - [ModelsResendVerificationRequest](docs/ModelsResendVerificationRequest.md)
 - [ModelsStandardAnalyticsTimeSeriesResponse](docs/ModelsStandardAnalyticsTimeSeriesResponse.md)
 - [ModelsStandardApplicationVideoUploadResponse](docs/ModelsStandardApplicationVideoUploadResponse.md)
 - [ModelsStandardAuthResponse](docs/ModelsStandardAuthResponse.md)
 - [ModelsStandardBrandAnalyticsResponse](docs/ModelsStandardBrandAnalyticsResponse.md)
 - [ModelsStandardBrandResponse](docs/ModelsStandardBrandResponse.md)
 - [ModelsStandardBrandStatusUpdateResponse](docs/ModelsStandardBrandStatusUpdateResponse.md)
 - [ModelsStandardCampaignResponse](docs/ModelsStandardCampaignResponse.md)
 - [ModelsStandardCaseMessageListResponse](docs/ModelsStandardCaseMessageListResponse.md)
 - [ModelsStandardCaseMessageResponse](docs/ModelsStandardCaseMessageResponse.md)
 - [ModelsStandardCaseResponse](docs/ModelsStandardCaseResponse.md)
 - [ModelsStandardCreatorAnalyticsResponse](docs/ModelsStandardCreatorAnalyticsResponse.md)
 - [ModelsStandardCreatorBankTaxDetailsResponse](docs/ModelsStandardCreatorBankTaxDetailsResponse.md)
 - [ModelsStandardCreatorResponse](docs/ModelsStandardCreatorResponse.md)
 - [ModelsStandardCreatorStatusUpdateResponse](docs/ModelsStandardCreatorStatusUpdateResponse.md)
 - [ModelsStandardErrorResponse](docs/ModelsStandardErrorResponse.md)
 - [ModelsStandardFilePreviewResponse](docs/ModelsStandardFilePreviewResponse.md)
 - [ModelsStandardFileUploadResponse](docs/ModelsStandardFileUploadResponse.md)
 - [ModelsStandardGenericResponse](docs/ModelsStandardGenericResponse.md)
 - [ModelsStandardGigApplicationResponse](docs/ModelsStandardGigApplicationResponse.md)
 - [ModelsStandardGigApplicationResponses](docs/ModelsStandardGigApplicationResponses.md)
 - [ModelsStandardGigBrandListResponse](docs/ModelsStandardGigBrandListResponse.md)
 - [ModelsStandardGigCreatorListResponse](docs/ModelsStandardGigCreatorListResponse.md)
 - [ModelsStandardGigInvitationResponse](docs/ModelsStandardGigInvitationResponse.md)
 - [ModelsStandardGigResponse](docs/ModelsStandardGigResponse.md)
 - [ModelsStandardInvoicePDFGeneratedResponse](docs/ModelsStandardInvoicePDFGeneratedResponse.md)
 - [ModelsStandardInvoiceResponse](docs/ModelsStandardInvoiceResponse.md)
 - [ModelsStandardNotificationListResponse](docs/ModelsStandardNotificationListResponse.md)
 - [ModelsStandardNotificationResponse](docs/ModelsStandardNotificationResponse.md)
 - [ModelsStandardPaymentItemResponse](docs/ModelsStandardPaymentItemResponse.md)
 - [ModelsStandardPaymentResponse](docs/ModelsStandardPaymentResponse.md)
 - [ModelsStandardPlatformAnalyticsResponse](docs/ModelsStandardPlatformAnalyticsResponse.md)
 - [ModelsStandardResponseAny](docs/ModelsStandardResponseAny.md)
 - [ModelsStandardResponseArrayModelsCommentResponse](docs/ModelsStandardResponseArrayModelsCommentResponse.md)
 - [ModelsStandardResponseModelsCommentResponse](docs/ModelsStandardResponseModelsCommentResponse.md)
 - [ModelsStandardUserResponse](docs/ModelsStandardUserResponse.md)
 - [ModelsStandardVideoSubmissionResponse](docs/ModelsStandardVideoSubmissionResponse.md)
 - [ModelsStandardVideoSubmissionResponses](docs/ModelsStandardVideoSubmissionResponses.md)
 - [ModelsStandardVideoSubmissionUploadResponse](docs/ModelsStandardVideoSubmissionUploadResponse.md)
 - [ModelsUpdateCampaignRequest](docs/ModelsUpdateCampaignRequest.md)
 - [ModelsUpdateCaseStatusRequest](docs/ModelsUpdateCaseStatusRequest.md)
 - [ModelsUpdateCreatorBankDetailsRequest](docs/ModelsUpdateCreatorBankDetailsRequest.md)
 - [ModelsUpdateCreatorRequest](docs/ModelsUpdateCreatorRequest.md)
 - [ModelsUpdateGigApplicationRequest](docs/ModelsUpdateGigApplicationRequest.md)
 - [ModelsUpdateGigRequest](docs/ModelsUpdateGigRequest.md)
 - [ModelsUpdateInvoiceRequest](docs/ModelsUpdateInvoiceRequest.md)
 - [ModelsUpdatePaymentStatusRequest](docs/ModelsUpdatePaymentStatusRequest.md)
 - [ModelsUpdateUserRequest](docs/ModelsUpdateUserRequest.md)
 - [ModelsUpdateVideoSubmissionRequest](docs/ModelsUpdateVideoSubmissionRequest.md)
 - [ModelsUserResponse](docs/ModelsUserResponse.md)
 - [ModelsVideoSubmissionResponse](docs/ModelsVideoSubmissionResponse.md)
 - [ModelsVideoSubmissionStatusUpdateRequest](docs/ModelsVideoSubmissionStatusUpdateRequest.md)
 - [ModelsVideoSubmissionUploadResponse](docs/ModelsVideoSubmissionUploadResponse.md)
 - [ServiceLanguage](docs/ServiceLanguage.md)
 - [ServiceLanguagesResponse](docs/ServiceLanguagesResponse.md)
 - [ServiceStandardLanguagesResponse](docs/ServiceStandardLanguagesResponse.md)
 - [ServiceStandardTranslateResponse](docs/ServiceStandardTranslateResponse.md)
 - [ServiceTranslateRequest](docs/ServiceTranslateRequest.md)
 - [ServiceTranslateResponse](docs/ServiceTranslateResponse.md)
 - [ServiceTranslation](docs/ServiceTranslation.md)
 - [UtilsBrandCategory](docs/UtilsBrandCategory.md)
 - [UtilsBrandStatus](docs/UtilsBrandStatus.md)
 - [UtilsCampaignCategory](docs/UtilsCampaignCategory.md)
 - [UtilsCampaignStatus](docs/UtilsCampaignStatus.md)
 - [UtilsCompanySize](docs/UtilsCompanySize.md)
 - [UtilsContentType](docs/UtilsContentType.md)
 - [UtilsCountryCode](docs/UtilsCountryCode.md)
 - [UtilsCreatorStatus](docs/UtilsCreatorStatus.md)
 - [UtilsCurrency](docs/UtilsCurrency.md)
 - [UtilsEntityType](docs/UtilsEntityType.md)
 - [UtilsEventType](docs/UtilsEventType.md)
 - [UtilsGender](docs/UtilsGender.md)
 - [UtilsGigApplicationStatus](docs/UtilsGigApplicationStatus.md)
 - [UtilsGigInvitationStatus](docs/UtilsGigInvitationStatus.md)
 - [UtilsGigStatus](docs/UtilsGigStatus.md)
 - [UtilsInvoiceStatus](docs/UtilsInvoiceStatus.md)
 - [UtilsNotificationEntityType](docs/UtilsNotificationEntityType.md)
 - [UtilsPaymentItemStatus](docs/UtilsPaymentItemStatus.md)
 - [UtilsPaymentStatus](docs/UtilsPaymentStatus.md)
 - [UtilsPriority](docs/UtilsPriority.md)
 - [UtilsVideoFormat](docs/UtilsVideoFormat.md)
 - [UtilsVideoFormatOption](docs/UtilsVideoFormatOption.md)
 - [UtilsVideoSubmissionStatus](docs/UtilsVideoSubmissionStatus.md)


<a id="documentation-for-authorization"></a>
## Documentation For Authorization


Authentication schemes defined for the API:
<a id="BearerAuth"></a>
### BearerAuth

- **Type**: API key
- **API key parameter name**: Authorization
- **Location**: HTTP header

