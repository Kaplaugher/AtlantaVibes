export default function(state = {}, action){
	switch(action.type){
		case "POST_COMMENT":
			return action.payload;
		default:
			return state;
	}
}
