import React from 'react';
//import ReactGA from 'react-ga';
import PropTypes from 'prop-types';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import Theme from '../src/UI/Theme';
import Header from '../src/UI/Header';
import Footer from '../src/UI/Footer';
import Fonts from '../src/UI/Fonts';
import {
  LazyLoadImage,
  LazyLoadComponent,
} from 'react-lazy-load-image-component';

//ReactGA.initialize();

export default class MyApp extends App {
  constructor(props) {
    super(props);

    this.state = { value: 0, selectedIndex: 0 };
  }
  setValue = index => {
    this.setState({ value: index });
  };
  setSelectedIndex = index => {
    this.setState({ selectedIndex: index });
  };
  componentDidMount() {
    Fonts();
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>My page</title>
          <meta
            name='viewport'
            content='minimum-scale=1, initial-scale=1, width=device-width'
          />
        </Head>
        <ThemeProvider theme={Theme}>
          <Header
            value={this.state.value}
            setValue={this.setValue}
            selectedIndex={this.state.selectedIndex}
            setSelectedIndex={this.setSelectedIndex}
          />
          <Component
            {...pageProps}
            setValue={this.setValue}
            setSelectedIndex={this.setSelectedIndex}
          />
          <LazyLoadComponent threshold={400}>
            <Footer
              setValue={this.setValue}
              setSelectedIndex={this.setSelectedIndex}
            />
          </LazyLoadComponent>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}
MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
