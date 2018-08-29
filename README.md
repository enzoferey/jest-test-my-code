# jest-test-my-code

Test code server side with Jest

This is for demonstration purposes, feel free to fork it and adapt it to your use case.

## Usage

1. Clone repository
2. Start server running `npm start`
3. Make a POST request with an `application/json` body like:

```json
{
  "code": "your code stringified here"
}
```

## Notes

The method used right now is to expose user code in the global object through Jest's `setupFrameworkFile`, creating one setup file per user.

Another option could be to write received code to `__tests__/tmp/<user_token>/index.js`, clone the test file to that same directory and use the default export of `index.js` as the test function.
