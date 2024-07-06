import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const ParamId = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return Number(request.params.id);
  },
);
