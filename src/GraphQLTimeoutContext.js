// @flow

export default class GraphQLTimeoutContext {
  timeoutInMs: number;
  timeoutDecrementInMs: number;
  executionStartTimestamp: number;
  parentTypes: Array<string>;
  constructor(timeoutInMs: number, timeoutDecrementInMs: number) {
    this.timeoutInMs = timeoutInMs;
    this.timeoutDecrementInMs = timeoutDecrementInMs;
    this.executionStartTimestamp = Date.now();
    this.parentTypes = [];
  }
  calculateTimeout(parentType: string): number {
    if (this.parentTypes.indexOf(parentType) === -1) {
      this.parentTypes.push(parentType);
    }
    const depth = this.parentTypes.indexOf(parentType);
    const elampedTimeInMs = Date.now() - this.executionStartTimestamp;
    const timeoutDecrementInMsForDepth = this.timeoutDecrementInMs * depth;
    const calculated =
      this.timeoutInMs - elampedTimeInMs - timeoutDecrementInMsForDepth;
    return calculated;
  }
}
