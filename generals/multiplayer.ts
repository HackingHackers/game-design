import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3t2ZPGTvDDyeTwKrhwc8oLfxmqZfv50Y",
  authDomain: "game-design-a5db5.firebaseapp.com",
  projectId: "game-design-a5db5",
  storageBucket: "game-design-a5db5.appspot.com",
  messagingSenderId: "724075777037",
  appId: "1:724075777037:web:5adbb883a3bcb5e2379944",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const pc = new RTCPeerConnection({
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
});

let ch = pc.createDataChannel("game", { negotiated: true, id: 0 });

function signIn() {
  if (auth.currentUser) {
    return;
  }

  const email = prompt("Email");
  const password = prompt("Password");

  if (!email || !password) {
    alert("Invalid email or password");
    return;
  }

  signInWithEmailAndPassword(auth, email, password);
}

export function init(str: string) {
  signIn();

  if (str === "create") {
    createConn().then((id) => {
      console.log(`Game created with ID: ${id}`);
    });
  } else if (str.startsWith("answer")) {
    const id = str.split(" ")[1];
    answerConn(id);
  }

  ch.onopen = () => {
    let i = 0;
    setInterval(() => {
      ch.send("ping" + i++);
    }, 1000);
  };
  ch.onmessage = (event) => {
    console.log(event.data);
  };
}

async function createConn() {
  const gameDoc = doc(collection(db, "games"));
  const offerCandidates = collection(gameDoc, "offerCandidates");
  const answerCandidates = collection(gameDoc, "answerCandidates");

  // Get ICE candidates for caller, save to db
  pc.onicecandidate = (event) => {
    event.candidate && addDoc(offerCandidates, event.candidate.toJSON());
  };

  // Create and store offer
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  await setDoc(gameDoc, { offer });

  // Listen for remote answer
  onSnapshot(gameDoc, (doc) => {
    const data = doc.data();
    if (!pc.currentRemoteDescription && data?.answer) {
      pc.setRemoteDescription(data.answer);
    }
  });

  // Listen for remote ICE candidates
  onSnapshot(answerCandidates, (snapshot) => {
    for (const change of snapshot.docChanges()) {
      if (change.type === "added") {
        pc.addIceCandidate(change.doc.data());
      }
    }
  });

  return gameDoc.id;
}

async function answerConn(id: string) {
  const gameDoc = doc(db, "games", id);
  const offerCandidates = collection(gameDoc, "offerCandidates");
  const answerCandidates = collection(gameDoc, "answerCandidates");

  pc.onicecandidate = (event) => {
    event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
  };

  const gameData = await getDoc(gameDoc);
  if (!gameData.exists()) {
    alert("Game not found");
    return;
  }
  const offer = gameData.data().offer;
  await pc.setRemoteDescription(offer);

  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);
  await updateDoc(gameDoc, { answer });

  onSnapshot(offerCandidates, (snapshot) => {
    for (const change of snapshot.docChanges()) {
      if (change.type === "added") {
        pc.addIceCandidate(change.doc.data());
      }
    }
  });
}
