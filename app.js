const express=require("express");
const app=express();
const admin=require("firebase-admin");
// const firebase=require('firebase/compat/app');
const { initializeApp }=require('firebase/app');
// // const auth=require('firebase/compat/auth');
// const firestore=require('firebase/compat/firestore');
// const { getAuth, createUserWithEmailAndPassword }=require("firebase/auth");
const credentials=require("./key.json");





// const firebaseApp = initializeApp(credentials);
// const auth = getAuth(firebaseApp);
admin.initializeApp({
    credential:admin.credential.cert(credentials)
});

// const db=admin.firestore();
app.use(express.json());
app.use(express.urlencoded({extended:true}));



// app.post('/login',async(req,res)=>{
//     try{
//        const data={
//     email:req.body.email,
//     password:req.body.password,
//    };
// if(!data){
//     res.status(400).json("email and password is required");
// }
//    const user=await admin.auth().createUser({
//           email:data.email,
//           password:data.password,
//           emailverified:false,
//           disabled:false
//    });
 
//    res.json(user);
// }catch(error){
//       console.log(error);
// }
// });


app.use('/signup',async (req,res)=>{
    try {
        const data={
            email:req.body.email,
            password:req.body.password,
           }; 
           console.log(data);

           
   const user=await admin.auth().generatePasswordResetLink(req.body.email);
   console.log("user" +user);
   res.status(200).json({data:user,msg:"sigin successfully"});
    } catch (error) {
        console.log(error);
    }
})

// app.post('/phone',async(req,res)=>{

//         try {
//           // Send verification code to user's phone number
//           const phone=req.body.phone
//           console.log("phone number"+phone);
//           const code = Math.floor(100000 + Math.random() * 900000).toString();
//           console.log(code);
//           const msg=await Messaging.sendSMS(phone, `Your verification code is: ${code}`);
//           console.log(msg);

        
//         } catch (error) {
//           // Error occurred while sending verification code
//           console.error('Error sending verification code:', error);
//           throw error;
//         }


//     });


// app.post('/create',async(req,res)=>{
//    const data={
//     email:req.body.email,
//     name:req.body.name

//    };
//    const response=await db.collection("users").add(data);
//    console.log(response);
//    res.send(response);
// });

// app.get('/get',async(req,res)=>{
//     const userdata=db.collection("users");
//     const response=await userdata.get();
//     const arr=[]
//      response.forEach(doc=> {
//         const dat = doc.data();
//         dat.id = doc.id;
//         arr.push(dat);
//      });
//      console.log(arr)
//      res.send(arr);
     
// });



// app.put('/update',async(req,res)=>{
//  const userdata=db.collection("users");

// const id=req.body.id;
// delete req.body.id;
// await userdata.doc(id).update(req.body);
// res.send("updated")
// });

// app.delete('/delete',async(req,res)=>{
//     const userdata=db.collection("users");
//     const id=req.body.id;
//     await userdata.doc(id).delete();
//     res.send("deleted");
// })



app.listen(3000,()=>{
    console.log("app listen in port 3000");
  })