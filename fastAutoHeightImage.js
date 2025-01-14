/**
 * @since 2017-04-11 19:10:08
 * @author vivaxy
 */

import React, { PureComponent } from 'react';
import { Text, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { View, Spinner } from 'native-base';

import { getImageSizeFitWidth, getImageSizeFitWidthFromCache } from './cache';
import { NOOP, DEFAULT_HEIGHT } from './helpers';

// remove `resizeMode` props from `Image.propTypes`
const { resizeMode, ...ImagePropTypes } = Image.propTypes;

export default class Hoja extends PureComponent {
  static propTypes = {
    ...ImagePropTypes,
    width: PropTypes.number.isRequired,
    onHeightChange: PropTypes.func
  };

  static defaultProps = {
    onHeightChange: NOOP
  };

  constructor(props) {
    super(props);
    this.setInitialImageHeight();
  }

  async componentDidMount() {
    this.hasMounted = true;
    await this.updateImageHeight(this.props);
  }

  async componentDidUpdate(nextProps) {
    await this.updateImageHeight(nextProps);
  }

  componentWillUnmount() {
    this.hasMounted = false;
  }

  setInitialImageHeight() {
    const { source, width, onHeightChange } = this.props;
    const { height = DEFAULT_HEIGHT } = getImageSizeFitWidthFromCache(
      source,
      width
    );
    this.state = { height, spinner: true };
    this.styles = StyleSheet.create({ image: { width, height } });
    
    onHeightChange(height);
  }

  async updateImageHeight(props) {
    if (
      this.state.height === DEFAULT_HEIGHT ||
      this.props.width !== props.width ||
      this.props.source !== props.source
    ) {
      // image height could not be `0`
      const { source, width, onHeightChange } = props;
      try {
        const { height } = await getImageSizeFitWidth(source, width);
        this.styles = StyleSheet.create({ image: { width, height } });
        if (this.hasMounted) {
          // guard `this.setState` to be valid
          this.setState({ height });
	
     	 
     
          onHeightChange(height);
        }
      } catch (ex) {
        if (this.props.onError) {
          this.props.onError(ex);
        }
      }
    }
  }

  render() {
    // remove `width` prop from `restProps`
    const { source, style, width, ...restProps } = this.props;
    return (<View>{this.state.spinner && <Spinner color='rgba(150, 150, 150, 1)'/>}
     <this.props.FastImage
        source={source}
        style={[this.styles.image, style]}
        onLoad={e => this.setState({ spinner: false }) }
        {...restProps}
      /></View>
      
    );
  }
}
