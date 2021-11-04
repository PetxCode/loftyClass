import { Header } from "./component/Header/Header";
import HomeScreen from "./component/home/HomeScreen";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Tasked from "./component/home/Tasked";
// import Register from "./component/Register/Register";
import PrivateRoute from "./component/Register/PrivateRoute";
import ProjectHeader from "./Project1/ProjectHeader";
import Register from "./Project1/Register/Register";
import Settings from "./Project1/Register/Setting";
function App() {
  return (
    <Router>
      <ProjectHeader />
      <Switch>
        <Route path="/register" exact component={Register} />
        <Route path="/setting" exact component={Settings} />

        {/* <PrivateRoute path="/" exact component={HomeScreen} />
        <Route path="/task" exact component={Tasked} />
        <Route path="/register" exact component={Register} /> */}
      </Switch>
    </Router>
  );
}

export default App;
