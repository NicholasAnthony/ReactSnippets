// As you are using redux then your redux store should keep track about when the api call is in progress or has completed or caught some error. So instead of passing any callback or promise, you should dispatch an action for each event like processing, success, error etc (which you are already doing in getprofile function). Though i would say you nicely distinguish between process, success, error. For example you getprofile method should roughly look like this

export function getUserProfile()
{
    return function(dispatch)
    {

        dispatch(userProfileProcessing());

        const request = axios
        ({
            url: "http://testapi/auth/v1/user/details",
            method: "get",
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
            }
        })

        .then(function(response) { dispatch(userProfileSuccess(response)); })
        .catch(function(error) {
            dispatch(userProfileError(response))
            console.log(error)
        });
    };
}
// It is just what i prefer. If you want it your way, that is also fine.

// Now everytime you dispatch any action, redux will update the reducer state. So thats the place where you can set/reset some flag to make the component aware of what is going on with api call. So your reducer might look like this:

//getUserProfileReducer.js
userProfileReducer = (state = {}, action) => {
   switch (action.type) {
        case 'USER_PROFILE_PROCESSING':
          return({
           ...state,
           processing: true,
           success: false,
           fail: false,
           userProfile: null,
          })
       case 'USER_PROFILE_SUCCESS':
          return({
           ...state,
           processing: false,
           success: true,
           fail: false,
           userProfile: action.userProfile,
          })
       case 'USER_PROFILE_Error':
          return({
           ...state,
           processing: false,
           success: false,
           fail: true,
           userProfile: null,
          })
}
// Now all you need to do is to access this state from you component so that you can take necessary action according to that. For that you can user mapStateToProps function which convert the redux state to prop of the component.

constructor(props)
 {
    super(props);
    this.state = {
        email: '',
        first_name: '',
        middle_name: '',
        country: '',
        country_code: '',
        mobile_number: '',
        gender: ''
    }
 }

componentWillReceiveProps(newProps){
   if(newProps.userProfileStatus.success){
   // The success flag is true so set the state
   const user = newProps.userProfileStatus;
        this.setState({
          email: user.email,
          first_name: user.first_name
        });
   }
   else if(newProps.userProfileStatus.processing){
       // Api call is in progress so do action according to that like show loader etc.
   }
}
componentDidMount()
{
    store.dispatch(getUserProfile())
}

render()
{
    return (
       ...
    )
}

const mapStateToProps = state => {
    return {
        userProfileStatus: state.userProfileReducer,
    }
}