import Search from "./compnents/Search";
import Reader from "./compnents/Reader";
import  Manga  from "./compnents/Manga";
import React from "react";


import {
    BrowserRouter as Router,
    Switch,
    Route
    
  } from "react-router-dom";
  import { QueryClient, QueryClientProvider } from "react-query";
  const queryClient = new QueryClient()


function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <div className="App">
  {/* Routes*/}    
  <Router>
    <Switch>
    <Route exact path="/" component={Search}/>
      <Route exact  path="/reader/:url" component={Reader}/>
      <Route exact path="/manga/:url/:back" component={Manga}/>
    </Switch>      
 </Router>   
    
    </div>

    </QueryClientProvider>

  );
}

export default App;
