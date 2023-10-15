const pb = require("./../proto/greet_pb");

exports.greet = (call, callback) => {
    console.log('Greet was invoked');

    const res = new pb.GreetResponse()
        .setResult(`Hello ${ call.request.getFirstName }`);

    // The callback sends the response, first we send the error then the response.
    callback(null, res);
}