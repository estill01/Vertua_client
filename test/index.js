// TODO WIP
console.log("-- Test Suite : START --")

// TODO need to start the emulators from ../firebase

let db = firebaseApp.firestore()
if (location.hostname === 'localhost') {
	db.settings({
		host: "localhost:8080",
		ssl: false
	})
}

firebase.functions().useFunctionsEmulator("http://localhost:5001")
