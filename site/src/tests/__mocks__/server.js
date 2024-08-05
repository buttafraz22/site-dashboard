import { server } from './handlers';


beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
