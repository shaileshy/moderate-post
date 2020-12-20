export const ACTION_TYPES = {
    GET_POSTS: "GET_POSTS",
    SELECT_POST: "SELECT_POST",
    ADD_COMMENTS: "ADD_COMMENTS",
    REMOVE_TODO: "REMOVE_TODO",
    DO_TODO: "DO_TODO",
    UNDO_TODO: "UNDO_TODO",
    TOTAL_COUNT: "TOTAL_COUNT",
    EDIT_TODO: "EDIT_TODO"
  };

export function moderateReducer (state, action) {
    switch (action.type){
        case ACTION_TYPES.GET_POSTS:
            const post = action.payload.map( val => {return  { ...val, attachComment: [] };} )
            return post;

        case ACTION_TYPES.SELECT_POST:
            let selectedPost = null;


            state.filter(post => {
                if(post.id === action.payload){
                    selectedPost = post
                    return selectedPost
                }
                return null;
            })

            return selectedPost;

        case ACTION_TYPES.ADD_COMMENTS:
            const updatedState = state.map((val) => {
                if(val.id === action.id){
                    console.log('Action Payload', action.payload);
                    console.log(action.payload);
                    console.log('Value is', val);
                    console.log(val.attachComment.push(action.payload))
                  return [ ...val.attachComment, action.payload];
                }
                return val
              })
              return updatedState;
        default:
            return state;
    }
}