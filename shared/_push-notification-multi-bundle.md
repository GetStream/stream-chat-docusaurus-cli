If you're interested in leveraging different push configurations per each build type of your app (eg `Production`, `Staging`), you can do so via adding the new `multi-bundle` push configuration in [Push Notifications tab](https://dashboard.getstream.io/app/APP_ID/chat/push) in your Stream Dashboard.

You can add new multi-bundle configuration by tapping on `New Configuration` under `Push Notifications` tab and by selecting your preferred push notification provider (eg. `APN`, `Firebase`, `Huawei`, `Xiaomi`...).

Once created, fill in the following details:
* `Name of your configuration` - this name will be used in `addDevice` registration call.
* Description - Some description to identify where it will be used.
* Provider Settings - Credentials for the provider selected.

and `enable` the push configuration by tapping `Enabled` toggle on top right.
Once done, save the new push configuration.
