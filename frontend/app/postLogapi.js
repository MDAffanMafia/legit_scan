import axios from 'axios';
import React from 'react';
import {Text} from 'react-native';
export const  mySyncGetRequest=async()=>{
   const response= await fetch(' http://10.0.2.2:8000/hello');
   console.log("hello")
   const resJson =await response.json();
   return resJson;
};
export const  mySyncPostRequest=async()=>{
    const response= await fetch('http://10.0.2.2:8000/login',
    {
        method: 'POST',
        body: JSON.stringify({
            username: 'affan',
          password: '123',
        }),
        headers: {
            'Content-Type': 'application/json',
            
        },
      })
      response.catch((error) => {
        console.log('There was an error:', error);
      });
    const resJson =await response.json();
    console.log(resJson);
    return resJson;
 };