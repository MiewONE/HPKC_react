const VOTING = "vote/VOTING";
const VOTED = "vote/VOTED";

export function voting()
{
    return {
        type : VOTING,
    }
}
export function voted()
{
    return {
        type : VOTED,
    }
}

const initialVote = {
    stateVote : false,
    ticket : 0
}

export default function vote(state= initialVote,action)
{
    switch(action.type)
    {
        case VOTING:
            return {
                stateVote : !state.stateVote
            }
        case VOTED:
            return {
                ticket : state.ticket + 1
            }
        default :
            return state;
    }
}