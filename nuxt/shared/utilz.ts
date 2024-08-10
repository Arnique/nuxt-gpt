import { H3Event } from 'h3'
import type { IApiResponse } from './types'

export function isObject(value: any) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function isArray(value: any) {
  return Array.isArray(value);
}

export function isString(value: any) {
  return typeof value === 'string';
}

export function isEmpty(value: any) {
  if (value === null || value === undefined) {
      return true;
  }
  
  if (isString(value)) {
      return value.trim().length === 0;
  }
  
  if (isArray(value)) {
      return value.length === 0;
  }
  
  if (isObject(value)) {
      return Object.keys(value).length === 0;
  }
  
  return false;
}

export function toApiResponse<T>(event: H3Event, data: T, statusCode = 200): IApiResponse<T> {
  setResponseStatus(event, statusCode)

  return {
    success: true,
    data
  }
}

export class ApiError {
  message: string
  statusCode: number
  code: string

  constructor(message: string, statusCode: number, code: string) {
    this.message = message
    this.statusCode = statusCode
    this.code = code
  }
}

export function getApiError(error: any) {
  const message = isString(error) ? error : error?.message
  const statusCode = isObject(error) && error?.statusCode ? error.statusCode : 500
  const code = isObject(error) && error?.code ? error.code : null

  return {
    message,
    statusCode,
    code
  }
}

export function toApiErrorResponse(event: H3Event, error: any) {
  const err = getApiError(error)
  setResponseStatus(event, err.statusCode)
  return err
}

export async function awaiter<T>(promise: Promise<T>)
  : Promise<[any, null] | [null, T]> {
  try {
    const data = await promise
    return [null, data]
  } catch (err: any) {
    return [err, null]
  }
}

export function tryMe<T>(func: () => T): [Error | null, T | null] {
  try {
    const result = func();
    return [null, result];
  } catch (error) {
    return [error as Error, null];
  }
}