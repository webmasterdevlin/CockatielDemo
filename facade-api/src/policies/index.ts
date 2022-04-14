// alternatively: const { Policy, ConsecutiveBreaker } = require('cockatiel');
import { Policy, ConsecutiveBreaker } from "cockatiel";

// Create a retry policy that'll try whatever function we execute 3
// times with a randomized exponential backoff.
export const retry = Policy.handleAll().retry().attempts(8).exponential();

// Create a circuit breaker that'll stop calling the executed function for 10
// seconds if it fails 2 times in a row. This can give time for e.g. a downstream service
// to recover without getting tons of traffic.
export const circuitBreaker = Policy.handleAll().circuitBreaker(
  10 * 1000,
  new ConsecutiveBreaker(2)
);

// Combine these! Create a policy that retries 8 times, calling through the circuit breaker
export const retryWithBreaker = Policy.wrap(retry, circuitBreaker);
