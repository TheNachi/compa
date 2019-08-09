import React, { Component } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ActionSheet from 'react-native-actionsheet';

const codes = {
  NG: {
    code: '+234',
    country: 'Nigeria',
  },
  US: {
    code: '+1',
    country: 'United States',
  },
};

const shortCodes = Object.keys(codes);
shortCodes.sort();

export default class CountryCodeSelector extends Component {
  state = {
    selectedCode: null,
  };

  getOptions() {
    const options = [];

    shortCodes.forEach(shortCode => {
      const { code, country } = codes[shortCode];
      options.push(`${country} (${code})`);
    });

    return options;
  }

  componentWillMount() {
    const { defaultCode } = this.props;

    this.setState({
      selectedCode: defaultCode ? codes[defaultCode] : codes[shortCodes[0]],
    });
  }

  onCodeSelected(index) {
    const selectedCode = codes[shortCodes[index]];
    this.setState({ selectedCode });

    const { onSelected } = this.props;
    if (typeof onSelected === 'function') {
      onSelected(selectedCode.code);
    }
  }

  render() {
    const options = this.getOptions();

    const { selectedCode } = this.state;

    return (
      <View>
        <TouchableOpacity
          style={styles.selectBtn}
          onPress={() => this.codesActionSheet.show()}
        >
          <Text>{selectedCode.code}</Text>
          <Feather name="chevron-down" color="#888" size={17} style={{ marginLeft: 5 }} />
        </TouchableOpacity>

        <ActionSheet
            ref={(e) => this.codesActionSheet = e}
            title="Select Country Code"
            options={[
              ...options,
              'Cancel'
            ]}
            onPress={(index) => {
              if (index == options.length) {
                return;
              }
              
              this.onCodeSelected(index);
            }}
            cancelButtonIndex={options.length}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  selectBtn: {
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f1f1f1',
    padding: 10,
    paddingLeft: 15,
    display: 'flex',
    flexDirection: 'row',
  },
});
