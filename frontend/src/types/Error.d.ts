interface IServerError<T> {
  data?: Partial<Record<keyof T, string>>;
  meta?: { message?: string };
}

export type { IServerError };
