import React from 'react';

const url = 'https://stream-calls-dogfood.vercel.app/api/auth/create-token?';

async function tokenProvider(userId, apiKey) {
  const constructedUrl = constructUrl(userId, apiKey);
  const response = await fetch(constructedUrl);
  const resultObject = await response.json();
  let token = resultObject.token;
  return token;
}

function constructUrl(userId, apiKey) {
  return (
    url +
    new URLSearchParams({
      api_key: apiKey,
      user_id: userId,
    })
  );
}

export class TokenSnippet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: 'Loading token...',
      userId: props.name ?? 'testUser',
      apiKey: getAPIKey(props.sampleApp),
      callType: getCallType(props.sampleApp),
      callId: 'Loading call ID...',
      sampleApp: props.sampleApp ?? 'audio-sample',
    };
  }

  componentDidMount() {
    tokenProvider(this.state.userId, getAPIKey(this.state.sampleApp)).then(
      (token) => {
        this.setState({ ...this.state, token: token });
      }
    );
  }

  render() {
    const snippetStyle = {
      padding: '2rem',
      border: '2px solid #e3e3e3',
      'border-radius': '1rem',
      margin: '2rem 0',
    };

    const tableStyles = {
      width: '100%',
      'overflow-x': 'scroll',
    };

    const textStyle = {
      display: 'inline-block',
      'margin-bottom': '1rem',
    };

    const spanStyle = {
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'space-between',
    };

    const linkStyle = {
      display: 'inline-block',
      background: '#005fff',
      color: 'white',
      padding: '0.25rem 1rem',
      'border-radius': '0.5rem',
    };

    return (
      <div style={snippetStyle}>
        <span style={textStyle}>
          Here are credentials to try out the app with:
        </span>
        <table style={tableStyles}>
          <thead>
            <tr>
              <th>Property</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>API Key</td>
              <td>{this.state.apiKey}</td>
            </tr>
            <tr>
              <td>Token</td>
              <td style={tableStyles}>{this.state.token}</td>
            </tr>
            <tr>
              <td>User ID</td>
              <td>{this.state.userId}</td>
            </tr>
            <tr>
              <td>Call ID</td>
              <td>{this.state.callId}</td>
            </tr>
            <tr>
              <td>Call Type</td>
              <td>{this.state.callType}</td>
            </tr>
          </tbody>
        </table>
        <span style={spanStyle}>
          For testing you can join the call on our web-app:{' '}
          <a
            taret="_blank"
            rel="noreferrer noopener"
            href={`https://stream-video-demo.vercel.app/?id=${this.state.callId}`}
            style={linkStyle}
          >
            Join Call
          </a>
        </span>
      </div>
    );
  }
}

function getAPIKey(sampleApp) {
  let apiKey = '';
  if (sampleApp === 'audio-sample') {
    apiKey = 'hd8szvscpxvd';
  }

  return apiKey;
}

function getCallType(sampleApp) {
  let callType = '';
  if (sampleApp === 'audio-sample') {
    callType = 'audio_room';
  }

  return callType;
}
