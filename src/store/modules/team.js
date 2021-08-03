const SET_TEAM_LIST = 'team/SETLIST';
const GET_TEAM_LIST = 'team/GETLIST';
export function setTeamList(teamList) {
    return {
        type: SET_TEAM_LIST,
        payload: teamList,
    };
}
export function getTeamList() {
    return {
        type: GET_TEAM_LIST,
    };
}

const initialTeam = {
    teamList: [],
};

export default function team(state = initialTeam, action) {
    switch (action.type) {
        case SET_TEAM_LIST:
            return {
                ...state,
                teamList: action.payload, // 배열로 넘어 와야함.
            };
        case GET_TEAM_LIST:
            return {};
        default:
            return state;
    }
}
