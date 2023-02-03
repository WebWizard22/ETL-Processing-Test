export interface InputJSON {
  ts: number;
  u: string;
  e: Array<{ [key: string]: any }>;
}

export interface OutputJSON {
  timestamp: number;
  url_object: {
    domain: string | null;
    path: string | null;
    query_object: { [key: string]: string | string[] | undefined };
    hash: string | null;
  };
  ec: { [key: string]: any };
}