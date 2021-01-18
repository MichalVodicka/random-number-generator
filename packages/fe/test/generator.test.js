import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import {GET_RANDOM_NUMBER, RESET_RANDOM_NUMBER, CLEAR_ERROR, GET_ERROR, GET_RANDOM_NUMBER_LOADING} from '../src/action/types';
import { getNumber } from '../src/action/generatorAction';
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
jest.mock('axios', () => {
    return {
        post: jest.fn()
    };
});
describe('random number fetch', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });
    it('successfuly fetch random number', () => {
        const min = 1;
        const max = 100;
        const randomNumber = Math.floor(Math.random() * (+max - +min + 1)) + +min;
        axios.post.mockResolvedValueOnce({
            data: {success:true,msg:randomNumber}
        });
        const expectedActions = [
            { type: CLEAR_ERROR },
            { type: RESET_RANDOM_NUMBER },
            { type: GET_RANDOM_NUMBER_LOADING },
            {
                type: GET_RANDOM_NUMBER,
                payload: {
                    number:randomNumber
                }
            }
        ];
        const store = mockStore({});
        return store.dispatch(getNumber({min:min,max:max})).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            expect(axios.post).toBeCalledWith('/api/generator', {min:min,max:max});
        });
    });
    it('return error', () => {
        const min = "text";
        const max = 100;
        const mockedError = {
            response: {
                data: 'some error'
            }
        };
        axios.post.mockRejectedValueOnce(mockedError);

        const expectedActions = [
            { type: CLEAR_ERROR },
            { type: RESET_RANDOM_NUMBER },
            { type: GET_RANDOM_NUMBER_LOADING },
            {
                type: GET_ERROR,
                payload: mockedError.response.data
            }
        ];
        const store = mockStore({});
        return store.dispatch(getNumber({min:min,max:max})).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            expect(axios.post).toBeCalledWith('/api/generator', {min:min,max:max});
        });
    });
});
