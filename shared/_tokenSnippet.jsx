import React from 'react';

const BASE_URL = 'https://stream-calls-dogfood.vercel.app/api/call/sample?';

async function callAPI(sampleApp) {
  const constructedUrl = constructUrl(sampleApp);
  const response = await fetch(constructedUrl);
  const resultObject = await response.json();
  return resultObject;
}

function constructUrl(sampleApp) {
  return (
    BASE_URL +
    new URLSearchParams({
      app_type: sampleApp,
    })
  );
}

export class TokenSnippet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sampleApp: props.sampleApp,
      userId: 'Loading ...',
      userName: 'Creating user name ...',
      callId: 'Creating random call ID ...',
      callType: 'Loading call type ...',
      apiKey: 'Waiting for an API key ...',
      token: 'Token is generated ...',
      deepLink: 'Link is created ...',
      displayStyle: props.displayStyle ?? 'full'
    };
  }

  componentDidMount() {
    callAPI(this.state.sampleApp).then((result) => {
      this.setState({
        ...this.state,
        ...result,
      });
    });
  }

  render() {

    const snippetStyle = {
      padding: '2rem',
      border: '2px solid #e3e3e3',
      borderRadius: '1rem',
      margin: '2rem 0',
    };

    const tableStyles = {
      width: '100%',
      overflowX: 'scroll',
    };

    const textStyle = {
      display: 'inline-block',
      marginBottom: '1rem',
    };

    const spanStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    };

    const linkStyle = {
      display: 'inline-block',
      background: '#005fff',
      color: 'white',
      padding: '0.25rem 1rem',
      borderRadius: '0.5rem',
    };
    const labelColumnStyle = {
      white_space: 'nowrap',
      width: '120px'
    }
    const valueColumnStyle = {
      width: '99%',
    }

    const joinCallSpan = (
        <span style={spanStyle}>
        For testing you can join the call on our web-app:{' '}
        <a
          target="_blank"
          rel="noreferrer noopener"
          href={`https://stream-video-demo.vercel.app/?id=${this.state.callId}`}
          style={linkStyle}
        >
          Join Call
        </a>
        </span>
      );

    const credentialsTable = (
      <div>
        <span style={textStyle}>
          Here are credentials to try out the app with:
        </span>
      <table style={tableStyles}>
        <col  style={labelColumnStyle} />

        <col  style={valueColumnStyle} />
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

        </div>
    );

    return (
      <div style={snippetStyle}>
        { this.state.displayStyle === 'full' && credentialsTable }
        { this.state.displayStyle === 'credentials' && credentialsTable }
        
        { this.state.displayStyle === 'full' && joinCallSpan }
        { this.state.displayStyle === 'join' && joinCallSpan }
      </div>
    );
  }
}
