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

var PM25 = React.createClass({
  getInitialState () {
    return {
      index: 0
    }
  },
  onScrollAnimationEndHandler (SyntheticEvent) {
    var e = SyntheticEvent.nativeEvent;
    var screenW = Dimensions.get('window').width;
    var index = Math.floor(e.contentOffset.x/screenW);
    if(index <= -0) { index = 0; }
    this.setState({
      index: index
    })
  },
  render () {
    return (
        <View style={styles.container}>
          <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              pagingEnabled={true}
              automaticallyAdjustContentInsets={false}
              horizontal={true}
              onMomentumScrollEnd={this.onScrollAnimationEndHandler}>
            {THUMBS.map(createThumbRow)}
          </ScrollView>
          <DotsNav length={THUMBS.length} selectedIndex={this.state.index}/>
        </View>
    );
  }
});

var Thumb = React.createClass({
  shouldComponentUpdate (nextProps, nextState) {
    return false;
  },
  render () {
    return (
        <View style={styles.panel}>
          <Image style={styles.img} source={{uri: this.props.uri}}/>
        </View>
    );
  }
});

var DotsNav = React.createClass({
  render () {
    var currentIndex = this.props.selectedIndex || 0;
    var dots = [];
    for (var i = 0; i < this.props.length; i++) {
      dots.push(<Dot key={i} selected={(i === currentIndex) ? true : false}/>)
    }
    return (
        <View style={styles.dotWrapper}>
          <View style={[styles.dotInner, {width: 10*this.props.length}]}>
            {dots}
          </View>
        </View>
    )
  }
});

var Dot = React.createClass({
  render () {
    let selected = this.props.selected;
    return (
        <View style={[styles.dot, { backgroundColor: selected? 'red' : '#ffffff' }]}></View>
    )
  }
});

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000'
  },
  dotWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: Dimensions.get('window').width,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#000000'
  },
  dotInner: {
    flexDirection: 'row'
  },
  dot: {
    flex: 1,
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
