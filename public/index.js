//global variables
var myAvatar;
var chatAvatar;
var microphoneDevice;
var speaker;
var camera;
var contact;


function chatroom(username, password) {
    navigator.mediaDevices.getUserMedia({audio: true, video: true}).then(function(stream) {

        /* Stream received which means that the user has authorized the application to access to the audio and video devices. Local stream can be stopped at this time */
        stream.getTracks().forEach(function(track) {
            track.stop();
        });
    
        /*  Get the list of available devices */
        navigator.mediaDevices.enumerateDevices().then(function(devices){
    
            /* Do something for each device (e.g. add it to a selector list) */
            devices.forEach(function(device) {
                switch (device.kind) {
                    case "audioinput":
                        // This is a device of type 'microphone'
                        microphoneDevice = device;
                        console.log("SEEME",microphoneDevice);
                    case "audiooutput":
                        // This is a device of type 'speaker'
                        speaker = device;
                        console.log("SEEME1",speaker);
                    case "videoinput":
                        // This is a device of type 'camera'
                        camera = device;
                        console.log("SEEME2",camera);
                    default:                 
                        break;
                }
            });
    
        }).catch(function(error) {
            /* In case of error when enumerating the devices */
            break;
        });
    }).catch(function(error) {
        /* In case of error when authorizing the application to access the media devices */
        break;
    });
    var associatedConversation = null;

    /* Wait for the page to load */

    console.log("[DEMO] :: Rainbow Application started!");


    // Update the variables below with your applicationID and applicationSecret strings
    var applicationID = "94b345a05e9b11ea9a6dcf004cf8c14e",
        applicationSecret = "8ycO5KW52qXJetWvAwnffdb7w4iyKD4q8Rw0iJkvt99WkNmhsOYxWSkmZwcg2KYo";

    /* Bootstrap the SDK */
    angular.bootstrap(document, ["sdk"]).get("rainbowSDK");

    /* Callback for handling the event 'RAINBOW_ONREADY' */
    var onReady = function onReady() {
        console.log("[DEMO] :: On SDK Ready !");
        // do something when the SDK is ready
        var myRainbowLogin = username;       // Replace by your login
        var myRainbowPassword = password; // Replace by your password


        // The SDK for Web is ready to be used, so you can sign in
        rainbowSDK.connection.signin(myRainbowLogin, myRainbowPassword)
            .then(function (account) {
                // Successfully signed to Rainbow and the SDK is started completely. Rainbow data could be retrieved.
                console.log(account);
            })
            .catch(function (err) {
                // An error occurs (e.g. bad credentials). Application could be informed that sign in has failed
                console.log(err);
            });
    };

    /* Callback for handling the event 'RAINBOW_ONCONNECTIONSTATECHANGED' */
    var onLoaded = function onLoaded() {
        console.log("[DEMO] :: On SDK Loaded !");

        // Activate full SDK log
        rainbowSDK.setVerboseLog(true);

        rainbowSDK
            .initialize(applicationID, applicationSecret)
            .then(function () {
                console.log("[DEMO] :: Rainbow SDK is initialized!");
            })
            .catch(function (err) {
                console.log("[DEMO] :: Something went wrong with the SDK...", err);
            });
    };
    var onSigned = function onSigned(event) {
        let account = event.detail;
        console.log("PSM onSigned")
        // Authentication has been performed successfully. Account information could be retrieved.
    };

    var onStarted = function onStarted(event, account) {
        // Do something once the SDK is ready to call Rainbow services
        var selectedContactId = "3da5e3e965cd4166b65e0b982758aa9b@sandbox-all-in-one-rbx-prod-1.rainbow.sbg";

        rainbowSDK.contacts.searchByJid(selectedContactId)
            .then(function (result) {
                contact = result;
                console.log("lucy",contact);
                return result
            })
            .then(result => rainbowSDK.conversations.openConversationForContact(result))
            .then(function (conversation) {
                associatedConversation = conversation;
                return conversation;
        
            })
            .then(conversation => rainbowSDK.im.getMessagesFromConversation(conversation, 30))
            .then(result => {
                if (result.messages){
                    var messages = result.messages;
                    for (var message in messages){
                        if (messages[message].from.loginEmail === username){
                            $('.card-body').append(getSendMessageHTML(messages[message].data,messages[message].from.avatar.src,messages[message].date));
                            myAvatar = messages[message].from.avatar.src;
                        }
                        else{
                            $('.card-body').append(getReceivedMessageHTML(messages[message].data,messages[message].from.avatar.src,messages[message].date));
                            chatAvatar = messages[message].from.avatar.src;
                        }

                    }
                }
                console.log(result)
            })
            .catch(function (err) {
                // An error occurs (e.g. bad credentials). Application could be informed that sign in has failed
                console.log(err);
            });
    };

    /* Listen to the SDK event RAINBOW_ONREADY */
    document.addEventListener(rainbowSDK.RAINBOW_ONREADY, onReady)

    /* Listen to the SDK event RAINBOW_ONLOADED */
    document.addEventListener(rainbowSDK.RAINBOW_ONLOADED, onLoaded)


    // Listen when the SDK is signed
    document.addEventListener(rainbowSDK.connection.RAINBOW_ONSIGNED, onSigned)

    // Listen when the SDK is started
    document.addEventListener(rainbowSDK.connection.RAINBOW_ONSTARTED, onStarted)

    /* Load the SDK */
    rainbowSDK.load();


    // New Message Received
    let onNewMessageReceived = function (event) {
        let message = event.detail.message.data;
        let conversation = event.detail.conversation;
        // Do something with the new message received
        $('.card-body').append(getReceivedMessageHTML(message, chatAvatar));
    };

    document.addEventListener(rainbowSDK.im.RAINBOW_ONNEWIMMESSAGERECEIVED, onNewMessageReceived)


    function getReceivedMessageHTML(message, avatar,timestamp) {
        return '<div class="d-flex justify-content-start mb-4"><div class="img_cont_msg"><img src="' + avatar + '" class="rounded-circle user_img_msg"></div><div class="msg_container">' + message + '<span class="msg_time">' + timestamp + '</span></div></div>'
    }
    function getSendMessageHTML(message, avatar,timestamp) {
        return '<div class="d-flex justify-content-end mb-4"><div class="msg_container_send">' + message + '<span class="msg_time_send">' + timestamp + '</span></div><div class="img_cont_msg"><img src="' + avatar + '" class="rounded-circle user_img_msg"></div></div>';
    }

    $('.send_btn').on('click', function () {
        // Send message
        if ($('#typeBar').val()===""){
            console.log("empty typebar")
        }   
        else{
            var message = $('#typeBar').val();
            $('.card-body').append(getSendMessageHTML(message, myAvatar));
            $('#typeBar').val("");
            rainbowSDK.im.sendMessageToConversation(associatedConversation, message);
        }
    });
        
    // do audio call
    $('.fa-phone').on('click', function () {
        
        //check browser compatability
        if(rainbowSDK.webRTC.canMakeAudioVideoCall()) {
            if(rainbowSDK.webRTC.hasAMicrophone()){
                console.log("can call and have microphone");
                /* Select the microphone to use */
                rainbowSDK.webRTC.useMicrophone(microphoneDevice.deviceId);
                /* Select the speaker to use */
                rainbowSDK.webRTC.useSpeaker(speaker.deviceId);
                console.log("speaker success");
                var callInAudio = function callInAudio() {
                    /* Call this API to call a contact using only audio stream*/
                    console.log("Contact ist",contact);
                    var res = rainbowSDK.webRTC.callInAudio(contact);
                    if(res.label === "OK") {
                        /* Your call has been correctly initiated. Waiting for the other peer to answer */
                        console.log("Calling initiated, waiting for peer to answer");
                    }
                };
                callInAudio();
            }
            else{
                console.log("has no microphone");
                }
        }   
        else{
            console.log("cannot make audiovideo call");
        }
    });
    // do video call
    $('.fa-video').on('click', function () {
        var Call = angular.element(document.querySelector('body')).injector().get('Call');
        var onWebRTCTrackChanged = function onWebRTCTrackChanged(event) {

            let call = event.detail;
        
            // Manage remote video
            if (call.remoteMedia & call.Media.VIDEO) {
                rainbowSDK.webRTC.showRemoteVideo(call);
            } else {
                rainbowSDK.webRTC.hideRemoteVideo(call);
            }
            // Manage local video
            if (call.localMedia & call.Media.VIDEO) {
                rainbowSDK.webRTC.showLocalVideo(call);
            } else {
                rainbowSDK.webRTC.hideLocalVideo(call);
            }
        };
        
        document.addEventListener(rainbowSDK.webRTC.RAINBOW_ONWEBRTCTRACKCHANGED, onWebRTCTrackChanged)
        //check browser compatability
        if(rainbowSDK.webRTC.canMakeAudioVideoCall()) {
            if(rainbowSDK.webRTC.hasAMicrophone()){
                console.log("can call and have microphone");
                /* Select the microphone to use */
                rainbowSDK.webRTC.useMicrophone(microphoneDevice.deviceId);
                /* Select the speaker to use */
                rainbowSDK.webRTC.useSpeaker(speaker.deviceId);
                rainbowSDK.webRTC.useCamera(camera.deviceId);
                console.log("speaker success");
                var callInVideo = function callInVideo(contact) {
                    console.log("video calling");
                    /* Call this API to call a contact using both audio and video streams*/
                    var res = rainbowSDK.webRTC.callInVideo(contact);
                    if(res.label === "OK") {
                        /* Your call has been correctly initiated. Waiting for the other peer to answer */
                        //display video

                        var addVideoToCall = function addVideoToCall(call) {
                            /* Call this API to try do add video to the call */
                            var res = rainbowSDK.webRTC.addVideoToCall(call);
                            rainbowSDK.webRTC.showLocalVideo();
                            rainbowSDK.webRTC.showRemoteVideo(call)
                        };
                        addVideoToCall(call);

                    }
                };
                callInVideo(contact);
            }
            else{
                console.log("has no microphone");
                }
        }   
        else{
            console.log("cannot make audiovideo call");
        }
    });
}
    


/*
    UI Interactions
*/

$(document).ready(function () {
    $('#loginbutton').on('click', function () {
        var username = $('#username').val();
        var password = $('#password').val();
        if (username.length>0 && password.length>0){
            chatroom(username, password);
            $('#login').hide();
            $('#chatfn').show();

        }

    });



});