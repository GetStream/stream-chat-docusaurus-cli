If you're interested in leveraging different push configurations per each build type of your app (eg `Production`, `Staging`), you can do so via adding the new `multi-bundle` push configuration in [Push Notifications tab](https://dashboard.getstream.io/app/APP_ID/chat/push) in your Stream Dashboard.

We're using bundle naming from APN but actually, it just a name for a configuration of a push provider you can save into your Stream app and since there can be multiple of them, we're calling it `multi-bundle` (i.e. _user named configuration_).

You can add new multi-bundle configuration by tapping on `New Configuration` under `Push Notifications` tab and by selecting your preferred push notification provider (eg. `APN`, `Firebase`, `Huawei`, `Xiaomi`...).

Once created, fill in the following details:

- `Name of your configuration` - this name will be used in `addDevice` registration call.
- Description - Some description to identify where it will be used. This is optional.
- Provider Settings - Credentials for the provider selected.
- Templates - Templates for the custom payload generation. This is optional but in some cases, it might be necessary to wake up the app in the background.

and `enable` the push configuration by tapping `Enabled` toggle on top right.
Once done, save the new push configuration.

:::caution
For backward compatibility, push provider configurations can be added via `UpdateAppSettings` endpoint but this is deprecated and might be removed in the future because it's not possible to add multiple configurations via this endpoint. There can only be one configuration per provider type since there is no name (i.e. bundle) specified for the configuration.

If your application is old, you might have old configurations saved in your Stream app. Dashboard shows them and let you edit them but you can't add new ones without a name from dashboard (API still supports nameless `single-bundle` configurations). That's why if you add a new configuration via dashboard, be sure to use its name while adding a device to Stream app for a user.
:::
