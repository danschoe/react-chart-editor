import React, {Component} from 'react';
import PropTypes from 'prop-types';
import plotly from 'plotly.js/dist/plotly';
import PlotlyEditor from 'react-chart-editor';
import CustomEditor from './CustomEditor';
import {localizeString} from 'react-chart-editor/lib';
import 'react-chart-editor/lib/react-chart-editor.css';

const dataSources = {
  col1: [1, 2, 3], // eslint-disable-line no-magic-numbers
  col2: [4, 3, 2], // eslint-disable-line no-magic-numbers
  col3: [17, 13, 9], // eslint-disable-line no-magic-numbers
};
const dataSourceOptions = Object.keys(dataSources).map(name => ({
  value: name,
  label: name,
}));

const config = {editable: true};

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        {
          type: 'scatter',
          x: dataSources.col1,
          y: dataSources.col2,
          marker: {color: dataSources.col3},
        },
      ],
      layout: {},
      frames: [],
    };
  }

  getChildContext() {
    return {
      localize: key => localizeString({}, 'en', key),
    };
  }

  render() {
    return (
      <div className="app">
        <PlotlyEditor
          data={this.state.data}
          layout={this.state.layout}
          config={config}
          frames={this.state.frames}
          dataSources={dataSources}
          dataSourceOptions={dataSourceOptions}
          plotly={plotly}
          onUpdate={(data, layout, frames) =>
            this.setState({data, layout, frames})
          }
          useResizeHandler
          debug
          advancedTraceTypeSelector
        >
          <CustomEditor />
        </PlotlyEditor>
      </div>
    );
  }
}

App.childContextTypes = {
  localize: PropTypes.func,
};

export default App;
