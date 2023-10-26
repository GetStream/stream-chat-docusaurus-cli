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

| Setting Name | Type                                                                                                                    | Description                                                                                                                                                    |
| ------------ | ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`       | String `available`, `disabled` or `auto-on`                                                                             | available → recording can be requested <br />disabled → recording is disabled <br />auto-on → recording starts and stops automatically when user join the call |
| `quality`    | String `audio-only`, `360p`, `480p`, `720p`, `1080p`, `1440p`                                                           | Defines the resolution of the recording                                                                                                                        |
| `audio_only` | `boolean`                                                                                                               | If `true` the recordings will only contain audio                                                                                                               |
| `layout`     | object, for more information see the [API docs](https://getstream.io/video/docs/api/recording/calls/#recording-layouts) | Confoguration options for the recording application                                                                                                            |

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
