Push notifications can be configured to receive updates when the application is closed or on the background, or even app is in a different contextual screen, a perfect way to stay up to date with changes in your chat in real time. Stream Chat sends push notification to channel members that are not online and have at least one registered device. Push notifications are only sent for new messages and not for other events. You can use [Webhooks](https://getstream.io/chat/docs/android/webhooks_overview) to send push notifications on other types of events.

To receive push notifications from Stream Chat, you'll need to:

1. Configure your push notification provider on the [Stream Dashboard](https://dashboard.getstream.io/).
2. Add the client-side integration for the chosen provider in your app.

## Push Delivery Rules

Push message delivery behaves according to these rules:

- Push notifications are sent only for new messages.
- Only channel members receive push messages.
- Members receive push notifications regardless of their online status.
- Replies inside a [thread](https://getstream.io/chat/docs/threads/) are only sent to users that are part of that thread:
  - They posted at least one message
  - They were mentioned
- Messages from muted users are not sent.
- Messages from mutes channels are not sent.
- Messages are sent to all registered devices for a user (up to 25).
- The message doesn't contain the flag `skip_push` as true.
- `push_notifications` is enabled (default) on the channel type for message is sent.

:::info
If you would like get push notifications only when users are offline, please contact to support.
:::

:::caution
Push notifications require membership. Watching a channel isn't enough.
:::
