## Reserved concurrency

- The reserved capacity is deducted from the overall capacity for the AWS account in a given Region. The Lambda function always has `the reserved capacity available exclusively for its own invocations`.
- The reserved capacity restricts `the maximum number of concurrency invocations` for that function. Synchronous requests arriving in excess of the reserved capacity limit fail with a throttling error.

## Provisioned Concurrency 
Provisioned Concurrency is a Lambda feature that prepares concurrent execution environments in advance of invocations.<br>
缩短冷启动

## Requests and concurrency

One instance of a Lambda function handles one request at a time. When the number of requests increase, Lambda creates more instances of your function to process traffic.
