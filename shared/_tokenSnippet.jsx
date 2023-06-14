import React from 'react';
import './tokenSnippet.css';

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
      loadingFinished: false,
      sampleApp: props.sampleApp,
      userId: 'Loading ...',
      userName: 'Creating user name ...',
      callId: 'Creating random call ID ...',
      callType: 'Loading call type ...',
      apiKey: 'Waiting for an API key ...',
      token: 'Token is generated ...',
      deepLink: 'Link is created ...',
      displayStyle: props.displayStyle ?? 'full',
    };
  }

  componentDidMount() {
    callAPI(this.state.sampleApp).then((result) => {
      this.setState({
        ...this.state,
        loadingFinished: true,
        ...result,
      });
    });
  }

  render() {
    const showTable =
      this.state.displayStyle === 'full' ||
      this.state.displayStyle === 'credentials';

    const showJoinLink =
      this.state.displayStyle === 'full' || this.state.displayStyle === 'join';

    return (
      <div className="snippetStyle">
        {showTable && (
          <div>
            <p>Here are credentials to try out the app with:</p>
            <table className="snippetTable">
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
                  <td className="tokenStyle">
                    <span> {this.state.token}</span>
                    {this.state.loadingFinished && (
                      <button
                        onClick={() =>
                          navigator.clipboard.writeText(this.state.token)
                        }
                      >
                        Copy
                      </button>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>User ID</td>
                  <td>{this.state.userId}</td>
                </tr>
                <tr>
                  <td>Call ID</td>
                  <td>{this.state.callId}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {showJoinLink && (
          <span className="joinCallRow">
            For testing you can join the call on our web-app:{' '}
            <a
              target="_blank"
              rel="noreferrer noopener"
              href={this.state.deepLink}
              className="joinCallLink"
            >
              Join Call
            </a>
          </span>
        )}
      </div>
    );
  }
}
