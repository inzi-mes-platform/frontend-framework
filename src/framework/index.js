/**
 * npm 리엑트 컴포넌트 만들고 배포하기
 * https://tecoble.techcourse.co.kr/post/2021-07-13-react-component-npm-publishing/
 */

/**
 * framework에서 제공하는 기능
 * PutTogether - Custom router, memu, header, footer, themes 제공
 * Redux 적용을 위한 addReducer, removeReducer 기능 제공 (Reducer를 동적으로 관리할 수 있음)
 * Server side event consumer 관리 (등록, 삭제) - SSE: 서버로부터의 Push 메시지
 * Internal Message Broker 얻어오기: UI 컴포넌트간 메시지를 주고 받을 수 있음음
 */

import PutTogether from './PutTogether';

import { addReducer, removeReducer } from './store';
import { getImessageBroker } from './utils/InternalMessageBroker';
import { getServerPushEventDispatcher, newServerPushEventDispatcher, removeServerPushEventDispatcher } from './utils/ServerPushEventDispatcher';
import RestTemplate, { createRestTemplate } from './utils/RestTemplate';
import { getIcon, registerIcon, registerIcons } from './icons';

export default PutTogether;

export {
    addReducer,
    removeReducer,
}

export {
    getImessageBroker
}

/**
 * add new Server Side Event consumer
 * 
 * @param { string } url 
 * @param { string } eventName 
 * @param { name: string, onMessage: function } consumer
 */
export const addSseConsumer = (url, eventName, consumer) => {
    const dispatcher = newServerPushEventDispatcher(url);
    dispatcher.addConsumer(eventName, consumer);
}

/**
 * remove existing consumer named consumerName
 * 
 * @param { string } url 
 * @param { string } eventName 
 * @param { string } consumerName 
 * @returns no return
 */
export const removeSseConsumer = (url, eventName, consumerName) => {
    const dispatcher = getServerPushEventDispatcher(url);
    if(dispatcher === null || dispatcher === undefined) return;

    dispatcher.removeConsumer(eventName, consumerName);
}

export { removeServerPushEventDispatcher }
export { RestTemplate, createRestTemplate }

export { 
    getIcon, 
    registerIcon, 
    registerIcons 
}
