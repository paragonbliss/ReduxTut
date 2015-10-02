import React from 'react';
import { createStore as initialCreateStore, compose } from 'redux';
import { devTools, persistState } from 'redux-devtools';

export let createStore = initialCreateStore;

if (__DEV__) {
  createStore = compose(
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(initialCreateStore);

export function renderDevTools(store) {
  if (__DEV__) {
    let {DevTools, DebugPanel, LogMonitor} = require('redux-devtools/lib/react');
    return (
      <DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
    );
  }
  return null;
}
