import React from "react";
import ReactDOM from "react-dom";
import '../node_modules/react-vis/dist/style.css';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, DiscreteColorLegend } from 'react-vis';

const parseCSV = (file, delimiter, callback) => {
  var data = {};
  var reader = new FileReader();
  reader.onload = function () {
    var lines = this.result.split('\n');
    for (let i = 0; i < lines.length; i++) {
      var headers = lines[i].split(",");
      data[headers[0]] = [];
      for (var j = 1; j < headers.length; j++) {
        let [x, y] = [...headers[j].split("|")];
        data[headers[0]].push({ x, y });
      }
    }
    console.log(data);
    callback(data); // TODO : Validation 
  }
  reader.readAsText(file);
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
  }

  onChangeHandler = (event) => {
    parseCSV(event.target.files[0], ',', (result) => {
      this.setState({ data: result })
    })
  }

  render() {
    return (
      <div>
        <input type="file" onChange={this.onChangeHandler} />
        <XYPlot
          width={600}
          height={600}>
          <HorizontalGridLines />
          {
            Object.keys(this.state.data).map((a) => {
              return (
                <LineSeries key={Math.random()}
                  data={[...this.state.data[a]]} />
              )
            })
          }
          <XAxis />
          <YAxis />
          <DiscreteColorLegend
            orientation="vertical"
            width={300}
            items={Object.keys(this.state.data)}
          />
        </XYPlot>
      </div>
    );
  }
};
export default App;
ReactDOM.render(<App />, document.getElementById("app"));