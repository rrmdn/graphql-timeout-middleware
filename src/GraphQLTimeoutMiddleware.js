// @flow
import invariant from 'invariant';

import GraphQLTimeoutContext from './GraphQLTimeoutContext';
import GraphQLTimeoutError from './GraphQLTimeoutError';

type ContextWithTimeout = {
  timeout: ?GraphQLTimeoutContext,
};

type Next = () => Promise<any>;

type ResolverInfo = Object & {
  fieldName: string,
  parentType: string,
};

type GraphQLMiddleware = (
  root: Object,
  args: Object,
  context: ContextWithTimeout,
  info: ResolverInfo,
  next: Next
) => Promise<Object>;

export default class GraphQLTimeoutMiddleware {
  static gqlTimeout(
    context: ContextWithTimeout,
    info: ResolverInfo
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      invariant(
        context.timeout,
        `Please include GraphQLTimeoutContext in context as "timeout"`
      );
      const calculatedTimeoutInMs = context.timeout.calculateTimeout(
        info.parentType
      );
      const field = `${info.parentType}.${info.fieldName}`;
      setTimeout(() => {
        reject(new GraphQLTimeoutError(field, calculatedTimeoutInMs));
      }, calculatedTimeoutInMs);
    });
  }
  static middleware(): GraphQLMiddleware {
    return (root, args, context, info, next) =>
      Promise.race([
        next(),
        GraphQLTimeoutMiddleware.gqlTimeout(context, info),
      ]);
  }
  static context(
    timeoutInMs: number = 15000,
    timeoutDecrementInMs: number = 50
  ): GraphQLTimeoutContext {
    return new GraphQLTimeoutContext(timeoutInMs, timeoutDecrementInMs);
  }
}
