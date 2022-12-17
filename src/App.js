import logo from './logo.svg';
import './App.css';
import Component from './Component';
import Flow from './Flow'
import CustomNodeFlow from './CustomNodeFlow';

function App() {
  return (
    <div className="App" >
    <div  style = {{width : '100%' ,height :'50vh'}}>

    <Flow/>

    </div>
    <div  style = {{width : '100%' ,height :'50vh'}}>

<CustomNodeFlow/>
    </div>
    </div>
  );
}

export default App;
