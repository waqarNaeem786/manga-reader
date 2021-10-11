import Search from "./compnents/Search";
import Reader from "./compnents/Reader";
import  Manga  from "./compnents/Manga";
import React from "react";
import { ReactQueryDevtools } from 'react-query/devtools'



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

  <Router>
     <Switch>
       <Route exact path="/" component={Search}/> 
       <Route  path="/reader/:url" component={Reader}/>
        <Route  path="/manga/:url/:back" component={Manga}/>      
    </Switch>       
 </Router>   
    
    </div>
      <ReactQueryDevtools initialIsOpen={false} />

    </QueryClientProvider>

  );
}

export default App;
