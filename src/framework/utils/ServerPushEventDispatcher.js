import { getImessageBroker } from './InternalMessageBroker';

/** 기본적으로 사용해야 하는 이벤트 이름은 객체를 초기화할 때에 적용함 */
const eventNames = [ 'connected' ];

/** 여러 개의 URL로부터 Server Side Event를 받을 수 있도록 고려함 */
const dispatchers = new Map();

/** 서버로부터 Event를 받아서 Dispatch 하기 위한 객체 */
class ServerPushEventDispatcher {

    #url;
    #consumerMap;
    #sse;
    /** 서버로부터 이벤트가 도착했을 때에 Dispatch 여부의 설정 값 */
    #settings;

    constructor(props) {
        this.#url = props.url;
        this.#consumerMap = new Map();

        eventNames.forEach( eventName => {
            this.#consumerMap.set(eventName, []);
        });

        const imessageBroker = getImessageBroker();
        imessageBroker.addListener (
            "SSE_SETTINGS", 
            {
                name: "SSE_DISPATCHER",
                onMessage: ( message ) => {
                    this.#settings = message.settings
                }
            }
        );

        this.#initialize ( this.#url );
    }

    #initialize = ( url ) => {
        /** Server Side Event Source 객체를 생성함 */
        this.#sse = new EventSource ( url );

        eventNames.forEach ( eventName => {
            this.#addServerSideEventListener(eventName, event => {
                const { data } = event;
                this.#dispatchServerSideEvent ( eventName, data );
            });
        });
    }

    #addServerSideEventListener = ( eventName, onEvent ) => {
        this.#sse.addEventListener( eventName, onEvent );
    }

    #dispatchServerSideEvent = ( eventName, edata ) => {
        const flag = this.#settings[eventName];
        /** Client에서 Server로부터의 이벤트를 무시하도록 설정되어 있다면 전달하지 않음 */
        if( flag === false ) return;

        const consumers = this.#consumerMap.get( eventName );
        console.log("Event name [ ", eventName, + " ] consumers count: " + ( consumers.length ? consumers.length : 0 ) + "]");

        consumers.forEach ( consumer => {
            if( consumer.onMessage !== undefined && typeof(consumer.onMessage) === 'function' ) {
                consumer.onMessage ( edata );
            }
        });
    }

    getUrl = () => {
        return this.#url;
    }

    addConsumer = (eventName, consumer) => {
        let consumers = this.#consumerMap.get ( eventName );
        if(consumers === undefined || consumers === null) {
            this.#consumerMap.set(eventName, []);
        }
        this.#consumerMap.get(eventName).push(consumer);
        console.log("added event name: " + eventName + ", consumer name: " + consumer.name);
    }

    removeConsumer = (eventName, consumerName) => {
        const consumers=this.#consumerMap.get(eventName);
        this.#consumerMap.set(eventName, consumers.filter(consumer=>consumer.name!==consumerName));
        console.log("removed event name: " + eventName + ", consumer name: " + consumerName);
    }

    destroy = () => {
        this.#sse.close();
        console.log("Destroyed event source...");
    }
}

export const newServerPushEventDispatcher = ( url ) => {
    let dispatcher = dispatchers.get( url );
    if(dispatcher === null || dispatcher === undefined) {
        dispatcher = new ServerPushEventDispatcher({ url: url });
        dispatchers.set(url, dispatcher);
    }
    return dispatcher;
}

export const getServerPushEventDispatcher = (url) => {
    return dispatchers.get(url);
}

export const removeServerPushEventDispatcher = (url) => {
    const dispatcher = dispatchers.get(url);
    if(dispatcher !== null || dispatcher !== undefined) {
        dispatcher.destroy();
    }
    dispatcher.delete( url );
}