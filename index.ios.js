'use strict';

var React = require('react-native');
var { AppRegistry,
    ScrollView,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    View } = React;

var THUMBS = ['http://facebook.github.io/react/img/logo_og.png',
  'https://t.alipayobjects.com/images/T11rdgXbFkXXXXXXXX.png',
  'http://facebook.github.io/react/img/logo_og.png',
  'https://t.alipayobjects.com/images/T11rdgXbFkXXXXXXXX.png',
  'http://facebook.github.io/react/img/logo_og.png',
  'https://t.alipayobjects.com/images/T11rdgXbFkXXXXXXXX.png',
  'http://facebook.github.io/react/img/logo_og.png',
  'https://t.alipayobjects.com/images/T11rdgXbFkXXXXXXXX.png',
  'http://facebook.github.io/react/img/logo_og.png'];

var createThumbRow = (uri, i) => <Thumb key={i} uri={uri}/>;
var createDotRow = (uri, i) => function () {
  if (i === 0) {
    return <Dot selected={true} />
  } else {
    return <Dot />
  }
};
var PM25 = React.createClass({
  render: function () {
    return (
        <View style={{backgroundColor: '#000000'}}>
          <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              pagingEnabled={true}
              automaticallyAdjustContentInsets={false}
              horizontal={true}>
            {THUMBS.map(createThumbRow)}
          </ScrollView>
          <View>
            {THUMBS.map(createDotRow)}
          </View>
        </View>
    );
  }
});

var Thumb = React.createClass({
  shouldComponentUpdate: function (nextProps, nextState) {
    return false;
  },
  render: function () {
    return (
        <View style={styles.panel}>
          <Image style={styles.img} source={{uri: this.props.uri}}/>
        </View>
    );
  }
});

var Dot = React.createClass({
  propTypes: {
    selected: false
  },
  render: function () {
    let selected = this.props.selected;
    return (
        <View style={[styles.dot, { backgroundColor: selected? '#f3f3f3' : '#ffffff' }]}></View>
    )
  }
});

var styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5
  },
  panel: {
    backgroundColor: '#cccccc',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    width: 64,
    height: 64
  }
});


AppRegistry.registerComponent('RNProject', () => PM25);
