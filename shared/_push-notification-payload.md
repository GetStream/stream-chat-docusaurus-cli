Push notifications are delivered as data payloads that the SDK can use to convert into the same data types that are received when working with the APIs.

When a message received by the Chat API, according to the delivery rules, it kicks a job that sends a regular data message (as below) to configured push providers on your app. According to the battery and the online status of the device, push providers deliver this payload to the actual devices. When a device receives the payload, it's passed to the SDK which connects to Chat API to receive regular message and channel records and unmarshals them into in-memory objects and gives control to you by passing these objects. At this point, your application can use these objects to generate any push notification to be shown to the user.

This is the main payload which will be sent to each configured provider:

```javascript
{
  "sender": "stream.chat",
  "type": "message.new",
  "version": "v2",
  "message_id": "d152f6c1-8c8c-476d-bfd6-59c15c20548a",
  "id": "d152f6c1-8c8c-476d-bfd6-59c15c20548a",
  "channel_type": "messaging",
  "channel_id": "company-chat",
  "cid": "messaging:company-chat"
}
```
