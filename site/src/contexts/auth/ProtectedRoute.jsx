import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

/**
 * 
 * @param {children} Children The Children of the protected Route Component. One child
 * for each protected route.
 * @param {redirectTo} redirectTo The fallback URL to where the application should redirect
 * in case of user not being authenticated. Typically, this would be '/login' or
 * something of the likes.
 *  
 * @sample-usage <Route path='/your-path-to-actual-component/' 
            element={
              <ProtectedRoute>
                <Component />   <--- Actual Component Comes here
              </ProtectedRoute>
            }
          />
 * 
 * 
 * @returns The child if the user is authenticated, else login component.
 */


const ProtectedRoute = ({ children, redirectTo }) => {
  const isAuthenticated = useAuth(); 

  return isAuthenticated? children : <Navigate to={redirectTo}/>
};

export default ProtectedRoute;
