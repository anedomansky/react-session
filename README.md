# react-session

[![npm version](https://badge.fury.io/js/@anedomansky%2Fvue-loaders.svg)](https://badge.fury.io/js/@anedomansky%2Freact-session)

An easy-to-use session component with included warning and renewal modals.

## Features

- Session timer
- Session warning modal
- Session expired modal

## Installation

`npm install @anedomansky/react-session`

## Usage

```jsx
import Session from '@anedomansky/react-session';
import '/node_modules/@anedomansky/react-session/dist/style.css';

function App() {
  return (
    <div className="App">
      <Session
        additionalExpiredModalClasses="text-expired"
        additionalWarnModalClasses="text-warn"
        duration={10}
        expiredModalBtnText="Restart"
        expiredModalText="Session is expired!"
        expiredModalTitle="Expired Session!"
        onExpiredModalBtnClick={() => console.log('Expired button clicked')}
        onWarnModalBtnClick={() => console.log('Warn button clicked')}
        sessionInfoText="Duration"
        warnModalBtnText="Okay"
        warnModalText="Session is soon over."
        warnModalTitle="Attention!"
      />
    </div>
  )
}

export default App
```

## Props

| Name                          | Type                                                 | Default                         | Description                                                  |
| ----------------------------- | ---------------------------------------------------- | ------------------------------- | ------------------------------------------------------------ |
| additionalExpiredModalClasses | string                                               | ''                              | Additional CSS classes for the `<dialog>`-Element            |
| additionalWarnModalClasses    | string                                               | ''                              | Additional CSS classes for the `<dialog>`-Element            |
| duration                      | number                                               | 1800                            | The duration of the session in seconds                       |
| expiredModalBtnText           | string                                               | 'Reset'                         | The expired modal button text                                |
| expiredModalText              | string                                               | 'The session is expired!'       | The expired modal text                                       |
| expiredModalTitle             | string                                               | 'Expired!'                      | The expired modal title                                      |
| sessionInfoText               | string                                               | 'Session'                       | The text that is shown above the session timer               |
| onExpiredModalBtnClick        | (event: React.MouseEvent<HTMLButtonElement>) => void |                                 | Callback, triggered when the expired modal button is clicked |
| onWarnModalBtnClick           | (event: React.MouseEvent<HTMLButtonElement>) => void |                                 | Callback, triggered when the warn modal button is clicked    |
| warnModalBtnText              | string                                               | 'OK'                            | The warn modal button text                                   |
| warnModalText                 | string                                               | 'The session will soon expire!' | The warn modal text                                          |
| warnModalTitle                | string                                               | 'Warning!'                      | The warn modal title                                         |
