import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import axios from "axios";
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { personCircle } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { IonItem, IonLabel, IonInput, IonButton, IonIcon, IonAlert } from '@ionic/react';
import {HTTP} from '@ionic-native/http';

function validateEmail(email: string) {
//  const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
    const re = /[-a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;
    return re.test(String(email).toLowerCase());
}
const Login: React.FC = () => {
  const history = useHistory();
  //const [email, setEmail] = useState<string>("gdelcastil");
  //const [password, setPassword] = useState<string>("jdedoc");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [iserror, setIserror] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const handleLogin = () => {
    if (!email) {
        setMessage("Please enter a valid email");
        setIserror(true);
        return;
    }
    if (validateEmail(email) === false) {
        setMessage("Your email is invalid");
        setIserror(true);
        return;
    }

    if (!password || password.length < 6) {
        setMessage("Please enter your password");
        setIserror(true);
        return;
    }

    const loginData = {
        "username": email,
        "password": password
    }

/*
//==========================
// HTTP CALL USING AXIOS
//==========================

      const api = axios.create({
//      baseURL: `https://reqres.in/api`
      headers: { 
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,OPTIONS',
        'Access-Control-Allow-Headers' : 'Origin, Content-Type, Accept, Authorization,X-Requested-With',
        'Content-Type': 'application/json',
        'mode' : 'no-cors',
      },
      //baseURL: `http://10.1.252.3:5000/jderest/v2`
      baseURL: `http://10.1.4.9:8180/jderest/v2`
    })
    
    //api.post("/login", loginData)
    api.post("/tokenrequest", loginData)
        .then(res => {             
            //history.push("/dashboard/" + email);
            console.log(res);
            setMessage(res.data.userInfo.token);
            setIserror(true)
         })
         .catch(error=>{
            console.log(error.message);
            setMessage(error.message);
            setIserror(true)
         })
         */

//==========================
// HTTP CALL USING FETCH
//==========================
        /*
        //fetch('http://localhost:5000/jderest/v2/tokenrequest', {
        fetch('http://10.1.4.9:8180/jderest/v2/tokenrequest', {
          method: 'POST',
          headers: {
                   'Access-Control-Allow-Origin': '*',
                   'Content-Type': 'application/json',
                   //'Access-Control-Allow-Credentials': 'true',
                   // 'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,OPTIONS',
                   // 'Access-Control-Allow-Headers' : 'Origin, Content-Type, Accept, Authorization,X-Requested-With',
                   //mode:'no-cors'
          },

         body: JSON.stringify(loginData)
         }).then((response) => response.json())
         .then((responseJson) => {
                   console.log(responseJson);
                   setMessage(responseJson.userInfo.token);
                   setIserror(true);
        })
        .catch(error => {
                  console.error('Error: ', error);
                  setMessage('Failed to connect to AIS ' + error);
                  setIserror(true);
        });
        */

//==========================
// HTTP CALL USING IONIC NATIVE
//==========================

    HTTP.setServerTrustMode('default');
    HTTP.setDataSerializer('json');
    HTTP.setHeader('','Access-Control-Allow-Origin','*');
    HTTP.setHeader('','Content-Type','application/json');
    

    HTTP.post('http://10.1.4.9:8180/jderest/v2/tokenrequest', loginData, {})
    .then((responseJson) => {
      console.log(responseJson);
      setMessage(JSON.parse(responseJson.data).userInfo.token);
      setIserror(true);
    })
    .catch(error => {
        console.error('Error: ', error);
        setMessage('Failed to connect to AISxxx ' + error);
        setIserror(true);
    });

  };




  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding ion-text-center">
        <IonGrid>
        <IonRow>
          <IonCol>
            <IonAlert
                isOpen={iserror}
                onDidDismiss={() => setIserror(false)}
                cssClass="my-custom-class"
                header={"Error!"}
                message={message}
                buttons={["Dismiss"]}
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonIcon
                style={{ fontSize: "70px", color: "#0040ff" }}
                icon={personCircle}
            />
          </IonCol>
        </IonRow>
          <IonRow>
            <IonCol>
            <IonItem>
            <IonLabel position="floating"> Email</IonLabel>
            <IonInput
                type="email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
                >
            </IonInput>
            </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
            <IonItem>
              <IonLabel position="floating"> Password</IonLabel>
              <IonInput
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
                >
              </IonInput>
            </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <p style={{ fontSize: "small" }}>
                  By clicking LOGIN you agree to our <a href="/#">Policy</a>
              </p>
              <IonButton expand="block" onClick={handleLogin}>Login</IonButton>
              <p style={{ fontSize: "medium" }}>
                  Don't have an account? <a href="/#">Sign up!</a>
              </p>

            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
