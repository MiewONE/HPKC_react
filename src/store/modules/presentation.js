const SET_PRESENTAION_LIST = 'presentation/SET_PRESENTATION_LIST';
const SET_PRESENTER = 'presentation/SET_PRESENTER';
const SET_ATTENDENT = 'presentation/SET_ATTENDENT';
const SET_ORDER = 'presentation/SET_ORDER';
const SET_RECOMMEND = 'presentation/SET_RECOMMEND';
export function setPresentationList(data) {
    return {
        type: SET_PRESENTAION_LIST,
        payload: data,
    };
}
export function setPresenter(data) {
    return {
        type: SET_PRESENTER,
        payload: data,
    };
}

export function setAttendent(data) {
    return {
        type: SET_ATTENDENT,
        payload: data,
    };
}
export function setOrder(data) {
    return {
        type: SET_ORDER,
        payload: data,
    };
}
export function setRecommed(data) {
    return {
        type: SET_RECOMMEND,
        payload: data,
    };
}
const initialPersentation = {
    ptList: [],
    order: 0,
    presenter: {
        _id: '',
        ptName: '',
        attendents: [],
        createdAt: '',
        joined_people: 0,
        resultVote: '',
    },
    recommend: 0,
};

export default function presentation(state = initialPersentation, action) {
    switch (action.type) {
        case SET_PRESENTAION_LIST:
            console.log(action.payload);
            return {
                ...state,
                ptList: [...action.payload],
            };
        case SET_PRESENTER:
            console.log(action.payload);
            return {
                ...state,
                presenter: action.payload,
            };
        case SET_ATTENDENT:
            return {
                ...state,
                attendents: action.payload,
            };
        case SET_ORDER:
            return {
                ...state,
                order: action.payload,
            };
        case SET_RECOMMEND:
            return {
                ...state,
                recommend: action.payload,
            };
        default:
            return state;
    }
}
