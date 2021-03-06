'use strict';

var React = require('react-native');
var { AppRegistry,
    ScrollView,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    View,
    Animated} = React;

var PM2_5_DATA = [
  {
    "aqi": 151,
    "area": "广州",
    "pm2_5": 106,
    "pm2_5_24h": 115,
    "quality": "良",
    "time_point": "2013-04-16T11:00:00Z"
  },
  {
    "aqi": 151,
    "area": "杭州",
    "pm2_5": 223,
    "pm2_5_24h": 115,
    "quality": "优",
    "time_point": "2013-04-16T11:00:00Z"
  },
  {
    "aqi": 151,
    "area": "上海",
    "pm2_5": 250,
    "pm2_5_24h": 115,
    "quality": "中度污染",
    "time_point": "2013-04-16T11:00:00Z"
  }
];

var COLOR_ARR = ['#219161', '#842210', '#8959a8'];
var QULITY_ICON_MAP = {
  '优': 'Y^o^Y',
  '良': '(^o^)/~',
  '轻度污染': '⊙︿⊙',
  '中度污染': '⊙﹏⊙',
  '严重污染': '⊙﹏⊙‖∣'
}

var PM25 = React.createClass({
  getInitialState () {
    return {
      index: 0,
      horizontal: true
    }
  },
  switchLayout () {
    this.setState({
      horizontal: !this.state.horizontal
    })
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
  createPanelRow (item, i) {
    return (
        <Panel area={item.area}
               index={i}
               key={i}
               pm25={item.pm2_5}
               quality={item.quality}
               horizontal={this.state.horizontal} />
    );
  },
  render () {
    return (
        <View style={styles.container}>
          <ScrollView
              style={styles.scrollView}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              pagingEnabled={this.state.horizontal}
              automaticallyAdjustContentInsets={false}
              horizontal={this.state.horizontal}
              onMomentumScrollEnd={this.onScrollAnimationEndHandler}>
            {PM2_5_DATA.map(this.createPanelRow)}
          </ScrollView>
          {this.state.horizontal ? (
              <DotsNav length={PM2_5_DATA.length} selectedIndex={this.state.index}/>
          ) : null}
          <Text onPress={this.switchLayout} style={{position: 'absolute', top: 30, right: 0, color: '#ffffff', backgroundColor: 'none'}}>⊙﹏⊙b汗</Text>
        </View>
    );
  }
});

var Panel = React.createClass({
  getInitialState () {
    return {
      horizontal: this.props.horizontal
    }
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      horizontal: nextProps.horizontal
    })
  },
  shouldComponentUpdate (nextProps) {
    return (nextProps.horizontal !== this.props.horizontal)
  },
  componentDidMount () {
    this.fetchData();
  },
  fetchData () {

  },
  render () {
    var renderStyle = {
      backgroundColor: COLOR_ARR[this.props.index%(COLOR_ARR.length)]
    };

    if(!this.state.horizontal){
      renderStyle['position'] = 'absolute';
      renderStyle['top'] = this.props.index * 100;
      renderStyle['alignItems'] = 'flex-start';
      renderStyle['height'] = 100;
      renderStyle['flexDirection'] = 'row';
      renderStyle['paddingTop'] = 30;
      renderStyle['paddingLeft'] = 20;
    }
    return (
      this.state.horizontal ? (
        <Animated.View style={[styles.panel, renderStyle]}>
          <Text style={{fontSize: 50, color: '#ffffff' }}>{this.props.area}</Text>
          <Text style={{fontSize: 100, color: '#ffffff' }}>
            {this.props.pm25}
          </Text>
          <Text style={{fontSize: 30, color: '#ffffff' }}>{QULITY_ICON_MAP[this.props.quality]}</Text>
        </Animated.View>
      ) : (
        <Animated.View style={[styles.panel, renderStyle]}>
          <Text style={{fontSize: 30, color: '#ffffff', flex: 1 }}>{this.props.area}</Text>
          <Text style={{fontSize: 30, color: '#ffffff', flex: 1 }}>
            {this.props.pm25}
          </Text>
          <Text style={{fontSize: 30, color: '#ffffff', flex: 1 }}>{QULITY_ICON_MAP[this.props.quality]}</Text>
        </Animated.View>
      )
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
        <View style={[styles.dot, { opacity: selected? 0.5 : 1 }]}></View>
    )
  }
});

var styles = StyleSheet.create({
  scrollView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  container: {
    backgroundColor: '#000000'
  },
  dotWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    position: 'absolute',
    height: 30,
    bottom: 0,
    backgroundColor: 'none'
  },
  dotInner: {
    flexDirection: 'row'
  },
  dot: {
    flex: 1,
    height: 10,
    margin: 1,
    borderRadius: 5,
    backgroundColor: '#ffffff'
  },
  panel: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 150
  },
  img: {
    width: 64,
    height: 64
  }
});


AppRegistry.registerComponent('RNProject', () => PM25);
