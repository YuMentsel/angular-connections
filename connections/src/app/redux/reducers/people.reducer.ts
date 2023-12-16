import { createReducer, on } from '@ngrx/store';
import { addPeople } from '../actions/people.action';
import { PeopleState } from '../models/peopleState.model';

export const initialState: PeopleState = {
  people: [],
};

export const peopleReducer = createReducer(
  initialState,
  on(
    addPeople,
    (state, { people }): PeopleState => ({
      ...state,
      people: [...people],
    }),
  ),
);
