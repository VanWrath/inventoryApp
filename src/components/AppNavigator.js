//Manages Navigation between screens.
import { createStackNavigator } from 'react-navigation';
import Home from './Home';
import List from './List';
import Details from './Details';
import NewCollection from './NewCollection';
import NewItem from './NewItem';
import EditItem from './EditItem';
import EditList from './EditList';

const AppNavigator = createStackNavigator(
	{
		Home          : { screen: Home },
		List          : { screen: List },
		Details       : { screen: Details },
		NewCollection : { screen: NewCollection },
		NewItem       : { screen: NewItem },
		EditItem      : { screen: EditItem },
		EditList      : { screen: EditList }
	},
	{
		initialRouteName         : 'Home',
		/* Header Styles */
		defaultNavigationOptions : {
			headerStyle     : {
				backgroundColor : 'white' //'#66b3ff'
			},
			headerTintColor : 'black'
		}
	}
);

export default AppNavigator;
