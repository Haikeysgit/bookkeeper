/**
 * GraphQL Auth Guard - Protects GraphQL Endpoints
 * 
 * This guard adapts NestJS's JWT AuthGuard for GraphQL contexts.
 * It extracts the HTTP request from the GraphQL execution context,
 * allowing Passport to validate the JWT token on each GraphQL request.
 */

import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
    /**
     * Override to extract request from GraphQL context.
     * This is necessary because GraphQL doesn't use standard HTTP context.
     */
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
}
