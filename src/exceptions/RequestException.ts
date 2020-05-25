class RequestException implements Error {
  name: string;
  message: string;
  stack?: string;
  statusCode: number;
  constructor(statusCode: number, smessage?: string) {
    this.statusCode = statusCode;
  }
}

export default RequestException;