import { ApplicationError } from '@/protocols';

export function nonexistentError(): ApplicationError {
  return {
    name: 'NonExistentError',
    message: 'This zip code does not exist.',
  };
}
