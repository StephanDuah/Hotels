const https = require('https');

const Pusher = require('pusher')



exports.charge = async(req,res) => {
     const params = JSON.stringify({
  "amount": "" + req.body.price + "00",
  "email": req.body.email,
  "currency": "GHS",
  "mobile_money": { 
    "phone": "0551234987", 
    "provider": "mtn"
  } 
})
    const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/charge',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.TEST_SECRET}`,
      'Content-Type': 'application/json'
    }
  }

  const req2 = https.request(options, (paystackResponse) => {
   
    let data = '';
    paystackResponse.on('data', (chunk) => {
      data += chunk;
    });

    paystackResponse.on('end', () => {
      console.log(JSON.parse(data));
      res.send(JSON.parse(data)); // Send the Paystack response back to the client
    });
  });

  req2.on('error', (error) => {
    console.error(error);
    res.status(500).send(e); // Send an error response back to the client
  });

  req2.write(params);
  req2.end();
    

    
}
  



exports.webhook =  (req,res) => {
    const event = req.body;
   


const pusher = new Pusher({
  appId: process.env.PUSHER_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true
});


console.log(event)
   if(event.event === "charge.success"){
      
      pusher.trigger("my-channel", "my-event", {
      message: "success"
   });

   console.log("pushed")
   }

   
      res.status(200).send("success") 
}

