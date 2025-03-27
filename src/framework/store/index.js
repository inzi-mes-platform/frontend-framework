// React component 라이브러리 만들어서 npm registry에 올리는 방법
// https://tecoble.techcourse.co.kr/post/2021-07-13-react-component-npm-publishing/

// import { add, store, persistor } from './dynamic-store-management';
import { addReducer, removeReducer, store, persistor } from './dynamic-persist-store-management';

// const initialState = {};

// const store = configure(initialState);

// 추후 persist 고려 필요
// import { PersistGate } from 'redux-persist/integration/react'
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
// import storageSession from 'redux-persist/lib/storage/session'
// let persistor = persistStore(store);
// let persistor;

export {
    addReducer, removeReducer, store, persistor
}
