import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants, Notifications, Permissions, Location, TaskManager } from 'expo';

// You can import from local files
import AssetExample from './components/AssetExample';

async function getToken() {
  let { status } = await Permissions.askAsync(
    Permissions.NOTIFICATIONS,
  );
  if (status !== 'granted') {
    alert('Need Notifications')
    return;
  }
  let value = await Notifications.getExpoPushTokenAsync();
  /// Send this to a server
}

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default class App extends React.Component {
  componentDidMount() {
    getToken();
    this.getLocationAsync()
    this.listener = Notifications.addListener(this.handleNotification);
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      alert('no location access')
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  }

  handleNotification = () => {

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Change code in the editor and watch it change on your phone! Save to get a shareable url.
        </Text>
        <Card>
          <AssetExample />
        </Card>
      </View>
    );
  }
}

TaskManager.defineTask()

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
