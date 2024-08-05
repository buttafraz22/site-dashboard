import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "../scenes/global/LandingPage"
import Login from "../scenes/auth/Login"
import Register from "../scenes/auth/Register"
import ForgetPassword from "../scenes/auth/ForgetPassword"
import ProtectedRoute from "../contexts/auth/ProtectedRoute"
import PostAuth from "../scenes/global/PostAuth"


export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<LandingPage />} />
                <Route path='/dashboard/*'
                    element={
                        <ProtectedRoute>
                            <PostAuth />
                        </ProtectedRoute>
                    }
                />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/register' element={<Register />} />
                <Route path='/forget-password/:username' element={<ForgetPassword />} />
            </Routes>
        </Router>
    );
}