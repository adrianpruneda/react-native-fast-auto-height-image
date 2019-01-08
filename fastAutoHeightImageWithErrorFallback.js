import React, { Component } from 'react';

import FastAutoHeightImage from './fastAutoHeightImage';

export default class ErrorableImage extends Component {
  static propTypes = {
    ...FastAutoHeightImage.propTypes,
    fallbackSource: FastAutoHeightImage.propTypes.source
  };

  state = { error: false };

  render() {
    const { source, fallbackSource, onError, ...restProps } = this.props;

    const shouldUseFallbackSource = this.state.error && fallbackSource;
    return (
      <FastAutoHeightImage
        source={shouldUseFallbackSource ? fallbackSource : source}
        onError={(error) => {
          // if an error hasn't already been seen, try to load the error image
          // instead
          if (!this.state.error) {
            this.setState({ error: true });
          }

          // also propagate to error handler if it is specified
          if (onError) {
            onError(error);
          }
        }}
        {...restProps}
      />
    );
  }
}
