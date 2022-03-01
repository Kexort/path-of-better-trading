import React, { Component } from 'react';
import './app.css';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default class App extends Component {
  state = { loading: false, text: "https://pastebin.com/WhWjXGga", build: null }

  componentDidMount() {
  }

  handleChange = (event) => {
    this.setState({
      text: event.target.value,
    });
  };

  handleClick = () => {
    this.setState({ loading: !this.state.loading });
    this.fetchAPI(this.state.text);
  }

  fetchAPI(param) {
    fetch('api/parse?paste=' + param).then(response => response.json()
      .then((data) => {
        this.setState({ build: data, loading: false });
      }));
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div>
          <br />
          <br />
          <TextField sx={{ width: '40%' }} id="outlined-basic" label="Pastebin" variant="outlined" onChange={this.handleChange} value={this.state.text} />
          <br />
          <br />
          {/* <Button onClick={this.buttonHandler} variant="contained">Let&apos;s go!</Button> */}
          <LoadingButton
            onClick={this.handleClick}
            loading={this.state.loading}
            loadingIndicator="Loading..."
            variant="outlined"
          >
            Let&apos;s go!
          </LoadingButton>
          <br />
          <br />
          {JSON.stringify(this.state.build?.parsed.PathOfBuilding.Items.Item)}
        </div>
      </ThemeProvider>
    );
  }
}
