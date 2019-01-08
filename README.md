# react-native-fast-auto-height-image
Fork of react-native-auto-height-image to use react-native-fast-image.

This component provides you a simple way to load a remote image and automatically set `Image` height to the image dimension which fits the provided width.

ReactNative `Image` component needs users to set both `width` and `height` props.

## Installation

`yarn add react-native-auto-height-image`

`npm install react-native-auto-height-image`

`follow the instructions for [react-native-fast-image]('https://github.com/DylanVann/react-native-fast-image')`

## Usage

Use local or remote files:

```js
import React, { Component } from 'react';
import FastAutoHeightImage from 'react-native-fast-auto-height-image';

import image from 'gallifrey-falls.png';

export default class Demo extends Component {
  render() {
    return (
      <View>

        <FastAutoHeightImage
          width={100}
          source={image}
        />

        <FastAutoHeightImage
          width={100}
          source={{uri: 'http://placehold.it/350x150'}}
        />

      </View>
    );
  }
}
```

You can even specify fallback images for when the source fails to load:

```js
import React, { Component } from 'react';
import FastAutoHeightImage from 'react-native-fast-auto-height-image';

import image from 'gallifrey-falls.png';

export default class Demo extends Component {
  render() {
    return (
      <FastAutoHeightImage
        width={100}
        source={{uri: 'https://vivaxy.github.io/404'}}
        fallbackSource={image}
      />
    );
  }
}
```

### Props

| name               | type             | isRequired    | default           | description                                                           |
| ---                | ---              | ---           | ---               | ---                                                                   |
| `width`            | number           | ✔             | N/A               | image width to fit                                                    |
| `source`           | number or object | ✔             | N/A               | local (i.e. require/import) or remote image ({uri: '...'})            |
| `fallbackSource`   | number or object | ✖             | N/A               | local (i.e. require/import) or remote image ({uri: '...'})            |
| `onHeightChange`   | func             | ✖             | (height) => {}    | called when updating image height, the argument `height` might be `0` |

Other image props except `resizeMode` are accepted.

## Change Log

[Change log](./CHANGELOG.md)

## Contributing

[Contributing](./CONTRIBUTING.md)

## Licence

[MIT](./LICENSE)

## Contributors

[Contributors](https://github.com/vivaxy/react-native-auto-height-image/graphs/contributors)
