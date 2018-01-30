// @flow

export default class GraphQLTimeoutError extends Error {
  constructor(field: string, waitingDurationInMs: number) {
    super(
      `GraphQL Timeout Error: ${field} has timed out after waiting for ${waitingDurationInMs}ms`
    );
  }
}
