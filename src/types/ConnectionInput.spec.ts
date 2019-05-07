import { ConnectionInputForward } from './ConnectionInput';
import { ValidationError } from 'runtypes';

describe('ConnectionInputForward', () => {
  const validate = (arg: any) => ConnectionInputForward.check(arg);

  describe('arg is empty object', () => {
    const arg = {};

    it('fails validation', () => {
      expect(() => validate(arg)).toThrow(ValidationError);
    });
  });

  describe('arg containing first only', () => {
    const arg = { first: 3 };

    it('validates arg', () => {
      expect(validate(arg)).toBe(arg);
    });
  });

  describe('arg containing after only', () => {
    const arg = { after: 'foo' };

    it('validates arg', () => {
      expect(validate(arg)).toBe(arg);
    });
  });

  describe('arg containing first and after', () => {
    const arg = { first: 3, after: 'foo' };

    it('validates arg', () => {
      expect(validate(arg)).toBe(arg);
    });
  });

  describe('arg containing additional attributes', () => {
    const arg = { first: 3, after: 'foo', last: 5 };

    it('validates arg', () => {
      expect(validate(arg)).toBe(arg);
    });
  });

  describe('arg containing unknown attributes', () => {
    const arg = { last: 3, before: 'foo' };

    it('fails validation', () => {
      expect(() => validate(arg)).toThrow(ValidationError);
    });
  });

  describe('arg containing invalid value for first', () => {
    const arg = { first: 'bar', after: 'foo' };

    it('fails validation', () => {
      expect(() => validate(arg)).toThrow(ValidationError);
    });
  });

});
