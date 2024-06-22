import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    host
      .switchToHttp()
      .getResponse()
      .status(exception.getStatus())
      .sendFile('/index.html', { root: 'public' });
  }
}
