const users =[
	{username: 'alice', apiKey: 'alice@123'},
  {username: 'bob', apiKey: 'bob@123'},
  {username: 'charlie', apiKey: 'charlie@123'}
];

const userTracking = (req, res, next) => {
    // console.log(req.query.apiKey);
    let userLogger = users.find((user) =>
        user.apiKey === req.query.apiKey);
    // console.log(userLogger.apiKey);
    if(!userLogger) {
        res.send("API Key is not correct!");        
    }
    console.log(`User ${userLogger.username} is logging`);
    next();  
  };
  
  module.exports = userTracking;