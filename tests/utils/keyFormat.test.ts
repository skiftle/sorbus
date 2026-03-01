import { describe, expect, it } from 'vitest';

import { resolveKeyTransform } from '../../src/utils/keyFormat';

describe('resolveKeyTransform', () => {
  describe('camel', () => {
    const transform = resolveKeyTransform('camel');

    it('converts snake_case', () => {
      expect(transform('user_name')).toBe('userName');
    });

    it('converts kebab-case', () => {
      expect(transform('due-on')).toBe('dueOn');
    });

    it('leaves camelCase unchanged', () => {
      expect(transform('userName')).toBe('userName');
    });

    it('preserves ALL-CAPS keys', () => {
      expect(transform('OP')).toBe('OP');
      expect(transform('AND')).toBe('AND');
      expect(transform('NOT')).toBe('NOT');
    });
  });

  describe('snake', () => {
    const transform = resolveKeyTransform('snake');

    it('converts camelCase', () => {
      expect(transform('userName')).toBe('user_name');
    });

    it('converts PascalCase', () => {
      expect(transform('InvoiceNumber')).toBe('invoice_number');
    });

    it('converts kebab-case', () => {
      expect(transform('due-on')).toBe('due_on');
    });

    it('handles consecutive uppercase letters', () => {
      expect(transform('HTMLParser')).toBe('html_parser');
    });

    it('leaves snake_case unchanged', () => {
      expect(transform('user_name')).toBe('user_name');
    });

    it('preserves ALL-CAPS keys', () => {
      expect(transform('OP')).toBe('OP');
      expect(transform('AND')).toBe('AND');
    });
  });

  describe('pascal', () => {
    const transform = resolveKeyTransform('pascal');

    it('converts snake_case', () => {
      expect(transform('user_name')).toBe('UserName');
    });

    it('converts camelCase', () => {
      expect(transform('userName')).toBe('UserName');
    });

    it('converts kebab-case', () => {
      expect(transform('due-on')).toBe('DueOn');
    });
  });

  describe('kebab', () => {
    const transform = resolveKeyTransform('kebab');

    it('converts camelCase', () => {
      expect(transform('userName')).toBe('user-name');
    });

    it('converts PascalCase', () => {
      expect(transform('InvoiceNumber')).toBe('invoice-number');
    });

    it('converts snake_case', () => {
      expect(transform('user_name')).toBe('user-name');
    });
  });
});
