import { Header } from "./component/Header/Header";
import HomeScreen from "./component/home/HomeScreen";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Tasked from "./component/home/Tasked";
import Register from "./component/Register/Register";
import PrivateRoute from "./component/Register/PrivateRoute";
function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <PrivateRoute path="/" exact component={HomeScreen} />
        <Route path="/task" exact component={Tasked} />
        <Route path="/register" exact component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
