// import React, { useState, useEffect, useRef } from 'react';
// import Peer from 'peerjs';

// const VoiceCallApp = () => {
//     const [peerId, setPeerId] = useState('');
//     const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
//     const [peer, setPeer] = useState(null);
//     const [callActive, setCallActive] = useState(false);

//     const remoteAudioRef = useRef(null);
//     const localStreamRef = useRef(null);

//     useEffect(() => {
//         const newPeer = new Peer();

//         newPeer.on('open', (id) => {
//             setPeerId(id);
//         });

//         newPeer.on('call', (call) => {
//             navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
//                 localStreamRef.current = stream;
//                 call.answer(stream);
//                 call.on('stream', (remoteStream) => {
//                     remoteAudioRef.current.srcObject = remoteStream;
//                     remoteAudioRef.current.play();
//                 });
//                 setCallActive(true);
//             });
//         });

//         setPeer(newPeer);

//         return () => {
//             if (peer) {
//                 peer.destroy();
//             }
//         };
//     }, []);

//     const call = (remotePeerId) => {
//         navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
//             localStreamRef.current = stream;
//             const call = peer.call(remotePeerId, stream);
//             call.on('stream', (remoteStream) => {
//                 remoteAudioRef.current.srcObject = remoteStream;
//                 remoteAudioRef.current.play();
//             });
//             setCallActive(true);
//         });
//     };

//     const endCall = () => {
//         if (localStreamRef.current) {
//             localStreamRef.current.getTracks().forEach((track) => track.stop());
//         }
//         setCallActive(false);
//     };

//     return (
//         <div style={{ textAlign: 'center', marginTop: '50px' }}>
//             <h1>Browser to Browser Voice Call</h1>
//             <p>Your ID: {peerId}</p>

//             <input
//                 type="text"
//                 value={remotePeerIdValue}
//                 onChange={(e) => setRemotePeerIdValue(e.target.value)}
//                 placeholder="Enter Remote Peer ID"
//             />
//             <button onClick={() => call(remotePeerIdValue)} disabled={callActive}>
//                 Call
//             </button>
//             <button onClick={endCall} disabled={!callActive}>
//                 End Call
//             </button>

//             <audio ref={remoteAudioRef} controls autoPlay></audio>
//         </div>
//     );
// };

// export default VoiceCallApp;



// import React, { useState, useEffect, useRef } from 'react';
// import Peer from 'peerjs';
// import { FaMicrophone, FaMicrophoneSlash, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

// const VoiceCallApp = () => {
//     const [peerId, setPeerId] = useState('');
//     const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
//     const [peer, setPeer] = useState(null);
//     const [callActive, setCallActive] = useState(false);
//     const [audioDevices, setAudioDevices] = useState([]);
//     const [selectedMic, setSelectedMic] = useState('');
//     const [selectedSpeaker, setSelectedSpeaker] = useState('');
//     const [micOn, setMicOn] = useState(true);
//     const [speakerOn, setSpeakerOn] = useState(true);

//     const remoteAudioRef = useRef(null);
//     const localStreamRef = useRef(null);

//     useEffect(() => {
//         const newPeer = new Peer();

//         newPeer.on('open', (id) => {
//             setPeerId(id);
//         });

//         newPeer.on('call', (call) => {
//             navigator.mediaDevices.getUserMedia({ audio: { deviceId: selectedMic ? { exact: selectedMic } : undefined } }).then((stream) => {
//                 localStreamRef.current = stream;
//                 call.answer(stream);
//                 call.on('stream', (remoteStream) => {
//                     remoteAudioRef.current.srcObject = remoteStream;
//                     remoteAudioRef.current.play();
//                 });
//                 setCallActive(true);
//             });
//         });

//         setPeer(newPeer);

//         navigator.mediaDevices.enumerateDevices().then((devices) => {
//             const audioDevices = devices.filter(device => device.kind === 'audioinput');
//             setAudioDevices(audioDevices);
//             if (audioDevices.length > 0) setSelectedMic(audioDevices[0].deviceId);
//         });

//         return () => {
//             if (peer) peer.destroy();
//         };
//     }, [selectedMic]);

//     const call = (remotePeerId) => {
//         navigator.mediaDevices.getUserMedia({ audio: { deviceId: selectedMic ? { exact: selectedMic } : undefined } }).then((stream) => {
//             localStreamRef.current = stream;
//             const call = peer.call(remotePeerId, stream);
//             call.on('stream', (remoteStream) => {
//                 remoteAudioRef.current.srcObject = remoteStream;
//                 remoteAudioRef.current.play();
//             });
//             setCallActive(true);
//         });
//     };

//     const endCall = () => {
//         if (localStreamRef.current) {
//             localStreamRef.current.getTracks().forEach((track) => track.stop());
//         }
//         setCallActive(false);
//     };

//     const toggleMic = () => {
//         if (localStreamRef.current) {
//             localStreamRef.current.getAudioTracks().forEach(track => track.enabled = !micOn);
//         }
//         setMicOn(!micOn);
//     };

//     const toggleSpeaker = () => {
//         if (remoteAudioRef.current) {
//             remoteAudioRef.current.muted = speakerOn;
//         }
//         setSpeakerOn(!speakerOn);
//     };

//     return (
//         <div style={{ textAlign: 'center', marginTop: '50px' }}>
//             <h1>Browser to Browser Voice Call</h1>
//             <p>Your ID: {peerId}</p>

//             <div>
//                 <label>Microphone: </label>
//                 <select onChange={(e) => setSelectedMic(e.target.value)} value={selectedMic}>
//                     {audioDevices.map((device) => (
//                         <option key={device.deviceId} value={device.deviceId}>{device.label || 'Microphone'}</option>
//                     ))}
//                 </select>
//             </div>

//             <div style={{ marginTop: '20px' }}>
//                 <FaMicrophone onClick={toggleMic} style={{ cursor: 'pointer', color: micOn ? 'green' : 'gray' }} size={30} />
//                 <FaVolumeUp onClick={toggleSpeaker} style={{ cursor: 'pointer', color: speakerOn ? 'blue' : 'gray', marginLeft: '20px' }} size={30} />
//             </div>

//             <input
//                 type="text"
//                 value={remotePeerIdValue}
//                 onChange={(e) => setRemotePeerIdValue(e.target.value)}
//                 placeholder="Enter Remote Peer ID"
//                 style={{ marginTop: '20px' }}
//             />
//             <button onClick={() => call(remotePeerIdValue)} disabled={callActive}>
//                 Call
//             </button>
//             <button onClick={endCall} disabled={!callActive}>
//                 End Call
//             </button>

//             <audio ref={remoteAudioRef} controls autoPlay></audio>
//         </div>
//     );
// };

// export default VoiceCallApp;


import React, { useState, useEffect, useRef } from 'react';
import Peer from 'peerjs';
import { FaMicrophone, FaMicrophoneSlash, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const VoiceCallApp = () => {
    const [peerId, setPeerId] = useState('');
    const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
    const [peer, setPeer] = useState(null);
    const [callActive, setCallActive] = useState(false);
    const [audioDevices, setAudioDevices] = useState([]);
    const [outputDevices, setOutputDevices] = useState([]);
    const [selectedMic, setSelectedMic] = useState('');
    const [selectedSpeaker, setSelectedSpeaker] = useState('');
    const [micOn, setMicOn] = useState(true);
    const [speakerOn, setSpeakerOn] = useState(true);

    const remoteAudioRef = useRef(null);
    const localStreamRef = useRef(null);

    useEffect(() => {
        const newPeer = new Peer();

        newPeer.on('open', (id) => {
            setPeerId(id);
        });

        newPeer.on('call', (call) => {
            navigator.mediaDevices.getUserMedia({
                audio: { deviceId: selectedMic ? { exact: selectedMic } : undefined }
            }).then((stream) => {
                localStreamRef.current = stream;
                call.answer(stream);
                call.on('stream', (remoteStream) => {
                    remoteAudioRef.current.srcObject = remoteStream;
                    remoteAudioRef.current.play();
                    if (selectedSpeaker) {
                        remoteAudioRef.current.setSinkId(selectedSpeaker);
                    }
                });
                setCallActive(true);
            });
        });

        setPeer(newPeer);

        // Get available audio devices
        navigator.mediaDevices.enumerateDevices().then((devices) => {
            const audioInputs = devices.filter(device => device.kind === 'audioinput');
            const audioOutputs = devices.filter(device => device.kind === 'audiooutput');
            setAudioDevices(audioInputs);
            setOutputDevices(audioOutputs);
            if (audioInputs.length > 0) setSelectedMic(audioInputs[0].deviceId);
            if (audioOutputs.length > 0) setSelectedSpeaker(audioOutputs[0].deviceId);
        });

        return () => {
            if (peer) peer.destroy();
        };
    }, []);

    const call = (remotePeerId) => {
        navigator.mediaDevices.getUserMedia({
            audio: { deviceId: selectedMic ? { exact: selectedMic } : undefined }
        }).then((stream) => {
            localStreamRef.current = stream;
            const call = peer.call(remotePeerId, stream);
            call.on('stream', (remoteStream) => {
                remoteAudioRef.current.srcObject = remoteStream;
                remoteAudioRef.current.play();
                if (selectedSpeaker) {
                    remoteAudioRef.current.setSinkId(selectedSpeaker);
                }
            });
            setCallActive(true);
        });
    };

    const endCall = () => {
        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach((track) => track.stop());
        }
        setCallActive(false);
    };

    const toggleMic = () => {
        if (localStreamRef.current) {
            localStreamRef.current.getAudioTracks().forEach(track => track.enabled = !micOn);
        }
        setMicOn(!micOn);
    };

    const toggleSpeaker = () => {
        if (remoteAudioRef.current) {
            remoteAudioRef.current.muted = speakerOn;
        }
        setSpeakerOn(!speakerOn);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Browser to Browser Voice Call</h1>
            <p>Your ID: {peerId || 'Generating ID...'}</p>

            {/* Microphone Selection */}
            <div>
                <label>Microphone: </label>
                <select onChange={(e) => setSelectedMic(e.target.value)} value={selectedMic}>
                    {audioDevices.map((device) => (
                        <option key={device.deviceId} value={device.deviceId}>
                            {device.label || 'Microphone'}
                        </option>
                    ))}
                </select>
            </div>

            {/* Speaker Selection */}
            <div style={{ marginTop: '10px' }}>
                <label>Speaker: </label>
                <select onChange={(e) => setSelectedSpeaker(e.target.value)} value={selectedSpeaker}>
                    {outputDevices.map((device) => (
                        <option key={device.deviceId} value={device.deviceId}>
                            {device.label || 'Speaker'}
                        </option>
                    ))}
                </select>
            </div>

            {/* Control Icons */}
            <div style={{ marginTop: '20px' }}>
                {micOn ? (
                    <FaMicrophone onClick={toggleMic} style={{ cursor: 'pointer', color: 'green' }} size={30} />
                ) : (
                    <FaMicrophoneSlash onClick={toggleMic} style={{ cursor: 'pointer', color: 'gray' }} size={30} />
                )}

                {speakerOn ? (
                    <FaVolumeUp onClick={toggleSpeaker} style={{ cursor: 'pointer', color: 'blue', marginLeft: '20px' }} size={30} />
                ) : (
                    <FaVolumeMute onClick={toggleSpeaker} style={{ cursor: 'pointer', color: 'gray', marginLeft: '20px' }} size={30} />
                )}
            </div>

            {/* Call Controls */}
            <input
                type="text"
                value={remotePeerIdValue}
                onChange={(e) => setRemotePeerIdValue(e.target.value)}
                placeholder="Enter Remote Peer ID"
                style={{ marginTop: '20px' }}
            />
            <button onClick={() => call(remotePeerIdValue)} disabled={callActive} style={{ marginLeft: '10px' }}>
                Call
            </button>
            <button onClick={endCall} disabled={!callActive} style={{ marginLeft: '10px' }}>
                End Call
            </button>

            <audio ref={remoteAudioRef} controls autoPlay></audio>
        </div>
    );
};

export default VoiceCallApp;
