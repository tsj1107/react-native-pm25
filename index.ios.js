'use strict';

var React = require('react-native');
var { AppRegistry,
      ScrollView,
      Text,
      StyleSheet,
      Image,
      View } = React;

var THUMBS = ['http://facebook.github.io/react/img/logo_og.png',
  'http://facebook.github.io/react/img/logo_og.png'];
var createThumbRow = (uri, i) => <Thumb key={i} uri={uri} />;

var ScrollViewSample = React.createClass({
  render: function() {
    return (
      <ScrollView
          automaticallyAdjustContentInsets={false}
          horizontal={true}>
        <Text>kkkkkk</Text>
        <View>
          <Image style={styles.img}
                 source={{uri: 'http://img0.imgtn.bdimg.com/it/u=3710103736,733712610&fm=21&gp=0.jpg'}}
              />
        </View>
        <View>
          <Image
              style={styles.img}
              source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
              />
        </View>
        {THUMBS.map(createThumbRow)}
      </ScrollView>
    );
  }
});

var Thumb = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return false;
  },
  render: function () {
    return (
        <View>
          <Image source={{uri: this.props.uri}}/>
        </View>
    );
  }
});

var styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#6A85B1',
    height: 300,
  },
  img: {
    width: 64,
    height: 64,
  }
});


AppRegistry.registerComponent('RNProject', () => ScrollViewSample);
