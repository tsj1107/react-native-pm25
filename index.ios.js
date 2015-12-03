'use strict';

var React = require('react-native');
var { AppRegistry,
    ScrollView,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    View } = React;

var PM2_5_DATA = [
  {
    "aqi": 151,
    "area": "广州",
    "pm2_5": 106,
    "pm2_5_24h": 115,
    "quality": "良好",
    "time_point": "2013-04-16T11:00:00Z"
  },
  {
    "aqi": 151,
    "area": "杭州",
    "pm2_5": 223,
    "pm2_5_24h": 115,
    "quality": "中度污染",
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

var PM25 = React.createClass({
  getInitialState () {
    return {
      index: 0
    }
  },
  componentDidMount () {
    this.fetchData();
  },
  fetchData () {

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
            {PM2_5_DATA.map(createPanelRow)}
          </ScrollView>
          <DotsNav length={PM2_5_DATA.length} selectedIndex={this.state.index}/>
        </View>
    );
  }
});

var createPanelRow = (item, i) => <Panel area={item.area} index={i} key={i} pm25={item.pm2_5} quality={item.quality} />;

var Panel = React.createClass({
  shouldComponentUpdate (nextProps, nextState) {
    return false;
  },
  render () {
    return (
        <View style={[styles.panel, {backgroundColor: COLOR_ARR[this.props.index%(COLOR_ARR.length)]}]}>
          <Text style={{fontSize: 50, color: '#ffffff' }}>{this.props.area}</Text>
          <Text style={{fontSize: 100, color: '#ffffff', marginBottom: 30}}>
            {this.props.pm25}
          </Text>
          <Text style={{fontSize: 20, color: '#ffffff'}}>{this.props.quality}</Text>
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
        <View style={[styles.dot, { opacity: selected? 0.5 : 1 }]}></View>
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
    justifyContent: 'center'
  },
  img: {
    width: 64,
    height: 64
  }
});


AppRegistry.registerComponent('RNProject', () => PM25);
