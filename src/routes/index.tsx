import { NavigationContainer } from '@react-navigation/native';

import TabRoutes from './drawer.routes';
import DrawerRoutes from './drawer.routes';

export default function Routes(){
   return (
    <NavigationContainer>
       <DrawerRoutes />
    </NavigationContainer>
   )
}
    
