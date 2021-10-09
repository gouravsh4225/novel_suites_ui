import "./App.scss";
import AppRoutes from "./AppRoutes";
import AppHeader from "./SharedComponents/AppHeader/AppHeader";
function App() {
  console.log("App is workinf");
  return (
    <div className="app-container">
      <AppHeader />
      <AppRoutes />
    </div>
  );
}

export default App;
