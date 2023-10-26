import CallCapabilities from './\_call-capabilities.md';
import CallTypeSettings from './\_call-type-settings.md';

The Video SDK uses a set of pre-defined call types that come with different default permissions and feature configurations.
Depending on your use case you can also extend those and use custom types that suit your needs.

Let's start with some clarification on naming.

**Call Type**: 4 default call types come with a set of pre-defined user roles
and capabilities that are assigned to these roles. These default types can be used but it's
also possible to define custom call types via the dashboard.

**User Role**: Users can have different roles (note: one user can have multiple roles).
Again, there are pre-defined user roles that each come with a certain set of capabilities. You can
use the existing user roles or define custom ones via the dashboard.

**Call Capabilities**: Each participant of a call has certain capabilities (such as `send-video` or `end-call`).
These are associated with a certain user role. The associations can be found further below and can also be customized
via the dashboard.

## Call Types

There are 4 pre-defined call types, these are:

- `default`: simple 1-1 calls for larger group video calling with sensible defaults
- `audio_room`: pre-configured for a workflow around requesting permissions in audio settings (speaking, etc.)
- `livestream`: access to calls is granted to all authenticated users, useful in one-to-many settings (such as livestreaming)
- `development`: should only be used for testing, permissions are open and everything is enabled (use carefully)

Before we go into more detail about what the different call types are for, let's take a look at some
of the concrete permissions and settings that each call type comes with.

Each call type comes with a set of settings. One important concept is called `backstage`. It
means that calls can be created but not directly joined. That means you can schedule a call. It would
then have `backstage` enabled until you call `goLive()` with it.

Now, let's take a look at each of the call types in more detail.

### Development

The `development` call type has all the permissions enabled and can be used during development. It's not recommended to use this call type in production, since all the participants in the calls would be able to do everything (blocking, muting everyone, etc).

For these call types, backstage is not enabled, therefore you don't have to explicitly call `goLive` for the call to be started.

### Default

The `default` call type can be used for different video-calling apps, such as 1-1 calls, group calls, or meetings with multiple people. Both video and audio are enabled, and backstage is disabled. It has permissions settings in place, where admins and hosts have elevated permissions over other types of users.

:::tip
The `default` type can be used in apps that use regular video calling. Follow [this tutorial](../../tutorials/video-calling) to learn more.
:::

### Audio Room

The `audio_room` call type is suitable for apps like Clubhouse or Twitter Spaces. It has a pre-configured workflow around requesting permissions to speak for regular listeners. Backstage is enabled, and new calls are going into backstage mode when created. You will need to explicitly call the `goLive` method to make the call active for all participants.

:::tip
You can find a guide on how to handle this and build an application with this [here](../../tutorials/audio-room).
:::

### Livestream

The `livestream` call type is configured to be used for live streaming apps. Access to calls is granted to all authenticated users, and backstage is enabled by default.

:::tip
To build an example application for this you can take a look at our [live streaming tutorial](../../tutorials/livestream).
:::

---

## Call type settings

Each call comes with a number of settings. Depending on the type of call these are enabled or disabled.

:::note
You can see a full table of which call type has which setting enabled in [the next chapter](#defaults-for-call-type-settings).
:::

First, we'll describe the different settings that exist in different categories.

<CallTypeSettings />

### Defaults for call type settings

|                            | audio-room | default                                            | livestream                                         | development                                       |
| -------------------------- | ---------- | -------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------- |
| **Audio**                  |            |                                                    |                                                    |                                                   |
| `access_request_enabled`   | ✅         | ✅                                                 | ❌                                                 | ✅                                                |
| `opus_dtx_enabled`         | ✅         | ✅                                                 | ✅                                                 | ✅                                                |
| `redundant_coding_enabled` | ✅         | ✅                                                 | ✅                                                 | ✅                                                |
| `mic_default_on`           | ❌         | ✅                                                 | ❌                                                 | ✅                                                |
| `speaker_default_on`       | ✅         | ✅                                                 | ✅                                                 | ✅                                                |
| `default_device`           | `speaker`  | `earpiece`                                         | `speaker`                                          | `earpiece`                                        |
| **Backstage**              |            |                                                    |                                                    |                                                   |
| `enabled`                  | ✅         | ❌                                                 | ✅                                                 | ❌                                                |
| **Video**                  |            |                                                    |                                                    |                                                   |
| `enabled`                  | ❌         | ✅                                                 | ✅                                                 | ✅                                                |
| `access_request_enabled`   | ❌         | ✅                                                 | ❌                                                 | ✅                                                |
| `target_resolution`        | N/A        | Width: 2560<br /> Height 1440<br />Bitrate 5000000 | Width: 1920<br />Height: 1080<br />Bitrate 3000000 | Width: 1920<br />Height 1080<br />Bitrate 3000000 |
| `camera_default_on`        | ❌         | ✅                                                 | ✅                                                 | ✅                                                |
| `camera_facing`            | front      | front                                              | front                                              | front                                             |
| **Screensharing**          |            |                                                    |                                                    |                                                   |
| `enabled`                  | ❌         | ✅                                                 | ✅                                                 | ✅                                                |
| `access_request_enabled`   | ❌         | ✅                                                 | ❌                                                 | ✅                                                |
| **Recording**              |            |                                                    |                                                    |                                                   |
| `mode`                     | available  | available                                          | available                                          | available                                         |
| `quality`                  | 720p       | 720p                                               | 720p                                               | 720p                                              |
| **Broadcasting**           |            |                                                    |                                                    |                                                   |
| `enabled`                  | ✅         | ✅                                                 | ✅                                                 | ✅                                                |
| `hls.auto_on`              | ❌         | ❌                                                 | ❌                                                 | ❌                                                |
| `hls.enabled`              | available  | available                                          | available                                          | available                                         |
| `hls.quality_tracks`       | [720p]     | [720p]                                             | [720p]                                             | [720p]                                            |
| **Geofencing**             |            |                                                    |                                                    |                                                   |
| `names`                    | []         | []                                                 | []                                                 | []                                                |
| **Transcriptions**         |            |                                                    |                                                    |                                                   |
| `mode`                     | available  | available                                          | available                                          | available                                         |
| **Ringing**                |            |                                                    |                                                    |                                                   |
| `incoming_call_timeout_ms` | 0          | 15000                                              | 0                                                  | 15000                                             |
| `auto_cancel_timeout_ms`   | 0          | 15000                                              | 0                                                  | 15000                                             |

## User roles

There are 5 pre-defined user roles, these are:

- `user`
- `moderator`
- `host`
- `admin`
- `call-member`

As mentioned before each user role is associated with a set of call capabilities. You can access the default roles and their capabilities in your [Stream Dashboard](https://dashboard.getstream.io/).

In general, it makes sense to have a solid setup of roles as it makes handling permissions and requests easier.

## Call Capabilities

A capability defines the actions that a certain user is allowed to perform on a call. There are many different
available (see a full list in the [next chapter](#default-settings)). Each user has a certain set of capabilities attached to them.
You can change these default capabilities in the dashboard. It is also possible to dynamically change these.

That means that if a user has permission to assign new capabilities they can assign them to other users.
This is our approach to an effective permission system.

:::tip
If you want to learn more about doing this, head over to the [Permissions and Capabilities](../../guides/permissions-and-moderation) chapter.
:::

### Default call capabilities

When a call is fetched from the API by a user, the response includes the list of actions that the user is allowed to perform on the call.

These are the following:

<CallCapabilities />
