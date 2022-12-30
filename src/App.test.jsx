// // render and screen lets us find what was rendered
// import {render, screen} from '@testing-library/react';
// //userEvent lets us type into our inputs, and click on buttons
// import userEvent from'@testing-library/user-event';
// //App is the page we are integrating testing
// import App from './App';

// test('integration test', async() =>{
//     const USER = 'some-username';
//     const PASS = 'some-password';
//     const user = userEvent.setup();
//     render(<App/>);

//     const userInput = screen.getByLabelText(/username/i);
//     await user.type(userInput, USER);

//     const passwordInput = screen.getByLabelText(/password/i);
//     await user.type(passwordInput, PASS);

//     const submitButton = screen.getByText(/submit/i);
//     await user.click(submitButton);

//     expect(await screen.findByText(/your username/i)).toBeInTheDocument();
//     expect(await screen.findByText(/your password/i)).toBeInTheDocument();
// });

// // import { render, screen } from '@testing-library/react';

// // import App from './App';

// // describe('App', () => {
// //   it('renders headline', () => {
// //     render(<App/>);

// //     screen.debug();

// //     // check if App components renders headline
// //   });
// // });