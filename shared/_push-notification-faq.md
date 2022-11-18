<!-- props:
  linkTesting - Link to the Push Testing page
  linkLogs - Link to the Push Logs page
-->

## Delivery Condition Not Matched

Most of the time, not receiving push notifications results from a use case that the API does not handle. Our current API implementation supports push notifications under specific cases:

- The target user has at least one device registered with the Stream App.
- The target user is a member of the channel that will send notifications.
- The target user has **not muted** the channel the pushed message is from.
- The target user has **not muted** the user that created the pushed message.
- Push notifications are enabled in the channel type.
- If using `thread`, the user is part of the thread that messages are sent in (i.e previously posted at least one message or were mentioned in that thread)
- Message isn't sent with `skip_push=true` flag.

If one of these conditions is not met, then the API will not trigger any push. As a result, you will not receive any push notification AND you won't see any data on this push notification attempt in the Dashboard Push Logs.

## Device Registration

At least one device must be registered for a specific user in order to receive push notifications. This is also a push delivery condition and a mandatory step in the push integration logic.

One of the common reasons for not receiving a push notification on a device is the absence of a device token. Without this, a device cannot be registered on the Stream database.

:::warning
If this is the issue, it will not be reported in the <a href={props.linkLogs}>Dashboard Push logs</a>.
:::

This is why we recommend testing your push integration using the <a href={props.linkTesting}>Stream CLI tool</a> first, as it runs some checks such as having a registered device.

You can also check if a device is registered by retrieving the list of devices for a given user.

## Token Invalidation

Push provider token, or much commonly known as a registrationToken is a unique token string that is tied to each client app instance. The registration token is required for single device and device group messaging.

An existing registration token may cease to be valid in a number of scenarios, including:

- **If the registration token expires**. i.e. token is generated long time ago, not used according to provider timeout, etc.
- **If the client app is unregistered**, which can happen if the user uninstalls the application.
- **If the client app is updated** but the new version is **not configured to receive messages**. i.e. any configuration changes on provider settings such project id, host, etc. or your app asks for new permission on the device such as reading notifications on lock screen, etc.
- **If the operating system libraries are updated**. Some providers (Firebase and APN) are closed attached to system libraries and any update on them can cause a new token generation which should be registered to Chat API.
- **If client app is hard stopped and their cache is removed**.

Usually, when facing this issue, the Push Logs should report an Unregistered error (i.e your device isn't a valid location to send). This usually means that the token used is no longer valid and a new one must be provided.

For all these cases :

- **Check that push configuration is up-to-date**.
- **Check your refresh token logic** (sometimes integration issues can lead to the device not being registered with the latest token retrieved from the library such as race in async code).
- You will need to **remove this existing registration token** from the Stream (i.e Remove Device) and stop using it to send messages.
- **Add a new valid registration token** for that device (i.e Add Device).

## User Offline/Online Transition

Stream API supports user presence changes and provides offline/online statuses for users. Push notifications are only sent when a user does not have an active Websocket connection (i.e they are offline).

**However, when your app goes to the background or is killed, your device will keep the Websocket connection alive for up to 1 minute.** This means it can take up to 1 minute for the API to consider the user offline, and during this time the device will not receive any push notifications.

:::warning
If your app is created after 2022-01-18, push notifications are sent irrespective of online status and online users will can push notifications and it's a flexibility of the your app to handle it or ignore it according to the context.
:::

## Push Provider Drops Notification

Considering the above section on Push Logs, the dashboard reports the push provider response, but not the actual device delivery because it's controlled by the push provider and can take some time if device is online and has enough battery, and priority of the push notifications.

Therefore, there are cases where the dashboard reports push notifications have been successful (i.e. 200 responses), but you are still unable to see any push notifications on your device. In general, this behavior relates to push provider dropping the push notification after receiving and accepting the request.

When receiving a push request from Stream, push provider does:

1. Run protocols to validate it based on the authentication information (credentials, device ID, etc...) and format of the request and replies success on receipt.
2. Run further validation checks such as Message (payload) data & format while processing and on error, it can be ignored such as a mismatch for a data type i.e. a string for badge count.

If the notification message generated from configured templates and data does not respect the format or has wrong data, the push provider will drop the notification. In this case, the push provider does not provide enough information to Stream since it is hit after successful reception.

Related issues are mostly due to a bad template configuration.
