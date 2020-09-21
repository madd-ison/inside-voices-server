app.post('/register', (req, res) => {
    const {username, password, confirmPassword} = req.body
    if (username.length < 6 || username.length > 20) {
     return res
       .status(400)
       .send('Username must be between 6 and 20 characters');
   }
  
   if (password.length < 8 || password.length > 36) {
     return res
       .status(400)
       .send('Password must be between 8 and 36 characters');
   }
  
   if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
     return res
       .status(400)
       .send('Password must be contain at least one digit');
   }
  
   if (!password.match(confirmPassword)) {
     return res
       .status(400)
       .send('Passwords do not match')
   }
  })
  
  app.post('/login', (req, res) => {
    const {username, password} = req.body
  
  })