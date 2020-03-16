import React, { Component } from "react"
const { Provider, Consumer } = React.createContext()

class FunklyContextProvider extends Component {
  state = { code: "", blockXml: "" };

  render() {
      return (
          <Provider
              value={{ editorState: this.state, setCode: (code) => this.setState({ code }), setBlockXml: (blockXml) => this.setState({ blockXml }) }}
          >
              {this.props.children}
          </Provider>
      )
  }
}

export { FunklyContextProvider, Consumer as FunklyContextConsumer }
