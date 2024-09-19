import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Feed from './Feed';
import Perfil from './Perfil';

const FeedRoute = () => <Feed />;

const PostRoute = () => <Text>Postar</Text>;

const ConfiguracaoRoute = () => <Perfil />;

const NotificationsRoute = () => <Text>Notificações</Text>;

const Navigation = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'feed', title: 'Feed', focusedIcon: 'image-text', unfocusedIcon: 'image-area' },
        { key: 'post', title: 'Postar', focusedIcon: 'plus-circle', unfocusedIcon: 'plus-circle-outline' },
        { key: 'notifications', title: 'Notificações', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
        { key: 'config', title: 'Configurações', focusedIcon: 'cog', unfocusedIcon: 'cog-outline' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        feed: FeedRoute,
        post: PostRoute,
        config: ConfiguracaoRoute,
        notifications: NotificationsRoute,
    });

    return (
        <BottomNavigation
            style={{ width: '100%' }}
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
};

export default Navigation;