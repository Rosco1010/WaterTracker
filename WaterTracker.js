import React, { Component } from 'react';
import { StyleSheet, Text, SafeAreaView, Button, AsyncStorage } from 'react-native';
import { store, addDailyWater, resetDailyWater, logState } from './store';
import { connect } from 'react-redux';

class WaterTracker extends Component {
  _storeData = async () => {
    try {
      await AsyncStorage.setItem((new Date()).toLocaleString(), `${this.state.cupsDrankToday} / ${this.state.amtCupsToDrink}, goal met: ${this.state.isWaterGoalMet}`);
    }
    catch (error) {
      console.log(error);
    }
  }

  render() {
    const isWaterGoalMet = this.props.cupsDrankToday >= this.props.amtCupsToDrink;
    return (
      <SafeAreaView style={styles.waterTracker}>
        { isWaterGoalMet && <Text style={styles.goal}>You've reached your goal for today!</Text> }
        <Text style={styles.tracker}>{this.props.cupsDrankToday} / {this.props.amtCupsToDrink}</Text>
        <Button
          style={styles.button}
          onPress={this.props.addDailyWater}
          title='I drank a cup of water!'
        />
        <Button
          onPress={this.props.resetDailyWater}
          title='Reset cups drank'
        />
        <Button
          onPress={this._storeData}
          title='Save Water Data'
        />
        <Button
          onPress={() => { console.log(store.getState());} }
          title='LOG STATE'
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  waterTracker: {
    flex: 1,
    backgroundColor: '#a8c9ff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  goal: {
    color: 'red',
  },
  tracker: {
    color: 'white',
  },
  button: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
  }
});

const mapStateToProps = (state) => ({
  cupsDrankToday: state.dailyWater.current,
  amtCupsToDrink: state.dailyWater.goal,
});

const mapDispatchToProps = () => ({
  addDailyWater,
  resetDailyWater,
});

export default connect(mapStateToProps, mapDispatchToProps())(WaterTracker);
