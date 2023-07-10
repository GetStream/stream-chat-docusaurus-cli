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

### Audio

| Setting Name               | Type                           | Description                                                                             |
| -------------------------- | ------------------------------ | --------------------------------------------------------------------------------------- |
| `access_request_enabled`   | Boolean                        | When `true` users that do not have permission to this feature can request access for it |
| `opus_dtx_enabled`         | Boolean                        | Enable OPUS DTX                                                                         |
| `redundant_coding_enabled` | Boolean                        | Enable redundant audio transmission                                                     |
| `mic_default_on`           | Boolean                        | When true the user will join with microphone enabled by default                         |
| `speaker_default_on`       | Boolean                        | When true the user will join with audio turned on by default                            |
| `default_device`           | String `speaker` or `earpiece` | The default audio device to use by default                                              |

### Backstage

| Setting Name | Type    | Description                                                                                                                     |
| ------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `enabled`    | Boolean | When backstage is enabled, calls will be in backstage mode when created and can be joined by user only after `goLive` is called |

### Video

| Setting Name             | Type                                 | Description                                                                      |
| ------------------------ | ------------------------------------ | -------------------------------------------------------------------------------- |
| `enabled`                | Boolean                              | Defines whether video is enabled for the call                                    |
| `access_request_enabled` | Boolean                              | When true users that do not permission to this feature can request access for it |
| `camera_default_on`      | Boolean                              | When true the camera will be turned on by when joining the call                  |
| `camera_facing`          | String `front`, `back` or `external` | When applicable, the camera that should be used by default                       |
| `target_resolution`      | Target Resolution Object             | The ideal resolution that video publishers should send                           |

The target resolution object is an advanced resolution. Changing this from the default values can lead to poor performance. This is how you define it:

| Setting Name | Type   | Description         |
| ------------ | ------ | ------------------- |
| `width`      | Number | The width in pixels |
| `height`     | Number | The hight in pixels |
| `bitrate`    | Number | The bitrate         |

### Screensharing

| Setting Name             | Type    | Description                                                                      |
| ------------------------ | ------- | -------------------------------------------------------------------------------- |
| `enabled`                | Boolean | Defines whether screensharing is enabled                                         |
| `access_request_enabled` | Boolean | When true users that do not permission to this feature can request access for it |

### Recording

| Setting Name | Type                                                          | Description                                                                                                                                                    |
| ------------ | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`       | String `available`, `disabled` or `auto-on`                   | available → recording can be requested <br />disabled → recording is disabled <br />auto-on → recording starts and stops automatically when user join the call |
| `quality`    | String `audio-only`, `360p`, `480p`, `720p`, `1080p`, `1440p` | Defines the resolution of the recording                                                                                                                        |

### Broadcasting

| Setting Name | Type                  | Description                             |
| ------------ | --------------------- | --------------------------------------- |
| `enabled`    | Boolean               | Defines whether broadcasting is enabled |
| `hls`        | HLS Settings (object) | Settings for HLS broadcasting           |

### HLS Settings

| Setting Name     | Type                                                          | Description                                                       |
| ---------------- | ------------------------------------------------------------- | ----------------------------------------------------------------- |
| `enabled`        | Boolean                                                       | Defines whether HLS is enabled or not                             |
| `auto_on`        | Boolean                                                       | When true HLS streaming will start as soon as users join the call |
| `quality_tracks` | String `audio-only`, `360p`, `480p`, `720p`, `1080p`, `1440p` | The tracks to publish for the HLS stream (up to three tracks)     |

### Geofencing

| Setting Name | Type                                                                                                                                                                                      | Description                                                     |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `names`      | List of one or more of these strings `european_union`, `iran_north_korea_syria_exclusion`, `china_exclusion`, `russia_exclusion`, `belarus_exclusion`, `india`, `united_states`, `canada` | The list of geofences that are used for the calls of these type |

### Transcription

| Setting Name          | Type                                        | Description         |
| --------------------- | ------------------------------------------- | ------------------- |
| `mode`                | String `available`, `disabled` or `auto-on` | Not implemented yet |
| `closed_caption_mode` | String                                      | Not implemented yet |

### Ringing

| Setting Name               | Type   | Description                                                                         |
| -------------------------- | ------ | ----------------------------------------------------------------------------------- |
| `incoming_call_timeout_ms` | Number | How long should the SDK display the incoming call screen before discarding the call |
| `auto_cancel_timeout_ms`   | Number | How long should the caller wait for others to accept the call before canceling      |

### Push Notifications Settings

| Setting Name        | Type                               | Description                                                 |
| ------------------- | ---------------------------------- | ----------------------------------------------------------- |
| `enabled`           | Boolean                            |                                                             |
| `call_live_started` | Event Notification Settings Object | The notification settings used for call_live_started events |
| `session_started`   | Event Notification Settings Object | The notification settings used for session_started events   |
| `call_notification` | Event Notification Settings Object | The notification settings used for call_notification events |
| `call_ring`         | Event Notification Settings Object | The notification settings used for call_ring events         |

In order to define the _event notification settings object_, here is the structure of how it should look:

| Setting Name | Type                 | Description                        |
| ------------ | -------------------- | ---------------------------------- |
| `enabled`    | Boolean              | Whether this object is enabled     |
| `apns`       | APNS Settings Object | The settings for APN notifications |

### APNS Settings Object

Remote notifications can only be customized if your application implements a Notification Service Extension. For simple customizations you can change the title and body fields at the call type level. Both title and body fields are handlebars templates with call and user objects available in their scope.

| Setting Name | Type     | Description                                                 |
| ------------ | -------- | ----------------------------------------------------------- |
| title        | Template | The string template for the title field of the notification |
| body         | Template | The string template for the body field of the notification  |

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

As mentioned before each user role is associated with a set of call capabilities. If you want to view a full list of associations go to the [Default settings](#default-settings) chapter.

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

- `join-call`
- `read-call`
- `create-call`
- `join-ended-call`
- `join-backstage`
- `update-call`
- `update-call-settings`
- `screenshare`
- `send-video`
- `send-audio`
- `start-record-call`
- `stop-record-call`
- `start-broadcast-call`
- `stop-broadcast-call`
- `end-call`
- `mute-users`
- `update-call-permissions`
- `block-users`
- `create-reaction`
