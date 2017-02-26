import expect from 'expect';
import {formatAuthorsForSelectInput} from './selectors';

describe('Author selectors', () => {
  describe('formatAuthorsForSelectInput', () => {
    it('should return author data formatted for use in SelectInput', () => {
      const authors = [
        {id: 'cory-house', firstName: 'Cory', lastName: 'House'},
        {id: 'scott-allen', firstName: 'Scott', lastName: 'Allen'}
      ];

      const expected = [
        {value: 'cory-house', text: 'Cory House'},
        {value: 'scott-allen', text: 'Scott Allen'}
      ];

      expect(formatAuthorsForSelectInput(authors)).toEqual(expected);
    });
  });
});
