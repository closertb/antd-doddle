export interface AnyObject {
  [propName: string]: any
};

export interface Result {
  loading: boolean
  error?: Error | Error []
  data: any
  forceUpdate?: () => void
};

export interface Head {
  url: string
  method?: string
  http?: AnyObject
  request?: AnyObject
  data: any
  [propName: string]: any
};

export interface Options {
  lazy: boolean,
  skip?: boolean,
  prompt?: boolean,
  trigger?: any
  callback?: () => void
}