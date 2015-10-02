import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { compose, createStore, combineReducers} from 'redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

import { addFriend, deleteFriend, starFriend } from '../actions/FriendsActions';
import FriendListApp from './FriendListApp';
import * as reducers from '../reducers/friendlist';



const finalCreateStore = compose(
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore)


const reducer = combineReducers(reducers);
const store = finalCreateStore(reducer);

store.dispatch(addFriend('Michael Brandt'));

store.dispatch(deleteFriend(1));

store.dispatch(starFriend(4));

export default class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          {() => <FriendListApp /> }
        </Provider>

        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
      </div>
    );
  }
}
