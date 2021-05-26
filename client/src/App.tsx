import { useSelector } from "react-redux";
import "./App.css";
import Auth from "./containers/Auth";
import Chat from "./containers/Chat";
import { SUBMIT_USERNAME } from "./store/types";

const App = () => {
  const { usernameSelected } = useSelector(
    (state: any) => state.setUsernameReducer
  );

  // toggling the state if username is selected


  // if username is selected then display Chat UI, else stay on the Auth page
  return <>{usernameSelected ? <Chat /> : <Auth />}</>;
};

export default App;
