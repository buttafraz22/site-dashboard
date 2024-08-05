import React from 'react';
import { render, screen, fireEvent, waitFor } from '../utils/test-utils';
import Login from '../../scenes/auth/Login';
import { MemoryRouter } from 'react-router-dom';
import { server } from '../__mocks__/handlers';
import { http, HttpResponse } from 'msw';

describe('Verifies that Login Component Works Correctly', () => {
    it('Loads the component', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        expect(screen.getByText('Sign in to our platform')).toBeInTheDocument();
    })

    it('Simulates correct Login', async () => {
        server.use(
            http.post('/api/auth/login/', (req, res) => {
                return HttpResponse.json({
                    username: 'testuser',
                    token: 'dummy-jwt-token',
                });
            })
        );

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/Your Username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/Your password/i), { target: { value: 'password' } });

        // Simulate form submission
        fireEvent.click(screen.getByRole('button', { name: /Login to your account/i }));

        const loaderElement = screen.getByText((content, element) => element.classList.contains('loader'));

        await waitFor(() => {
            expect(loaderElement).toBeInTheDocument(); // Ensure the loading animation is present after user click
        });

    })
});
