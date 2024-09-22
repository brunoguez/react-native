import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Perfil from './Perfil';
import Feed from './Feed';
import Postar from './Postar';

const Navigation = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'feed', title: 'Feed', focusedIcon: 'image-text', unfocusedIcon: 'image-area' },
        { key: 'post', title: 'Postar', focusedIcon: 'plus-circle', unfocusedIcon: 'plus-circle-outline' },
        { key: 'notifications', title: 'Notificações', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
        { key: 'config', title: 'Configurações', focusedIcon: 'cog', unfocusedIcon: 'cog-outline' },
    ]);

    const navigateTo = (key) => {
        console.log(key)
        const indexKey = routes.findIndex(a => a.key == key) ?? 0
        setIndex(indexKey)
    }

    const FeedRoute = () => <Feed />;
    const PostRoute = () => <Postar navigate={navigateTo} />;
    const ConfiguracaoRoute = () => <Perfil navigateTo={navigateTo} />;
    const NotificationsRoute = () => <Text>Notificações</Text>;

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