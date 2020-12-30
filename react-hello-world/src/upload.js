import React, { useState } from 'react'
import { Button } from "@material-ui/core"
import firebase from "firebase"
import { storage, db } from "./firebase"
import './upload.css'
import Textarea from 'react-expanding-textarea'
import { Link } from 'react-router-dom'

function upload({lang, username, closemodal, viewwhichuser, viewsinglepost}) {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const handleChange = (e) => {
        // this will pick the FIRST file selected (to avoid selecting many)
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        // This is what uploads the image to Firebase
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // progress function
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress)
            },
            (error) => {
                // Error function
                console.log(error);
                alert(error.message);
            },
            () => {
                // complete function ...
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        // Post image URL inside db
                        db.collection("items").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            name: name,
                            description: description,
                            price: price,
                            imageUrl: url,
                            imagename: image.name
                        });
                        window.location.href='/user'
                    })
            }
        )
    }
                 return (
        <div>
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
           <li className="navbar-item">
               <Link to ="/user" className="nav-link">Show Items</Link>
           </li>
           <li className="navbar-item">
               <Link to ="/upload" className="nav-link">Add New Items</Link>
           </li>
            </ul>
        </div>
        </nav>
        <div className="imageupload">
            <h1>{lang}</h1>
            <p>Progress-Bar</p>
            <progress className="imageupload__progress" value={progress} max="100" />
            <br /><br />
            
            <Textarea type="text" placeholder={lang ? 'Ajoutez une description':'Enter the name...'} onChange={event => setName(event.target.value)}/>
            <br/>
            <Textarea type="text" placeholder={lang ? 'Ajoutez une description':'Enter a description about the product...'} onChange={event => setDescription(event.target.value)}/>
            <br/>
            <Textarea type="text" placeholder={lang ? 'Ajoutez une description':'Enter the price...'} onChange={event => setPrice(event.target.value)}/>

            <input type="file" onChange={handleChange} />
            <Button onClick={handleUpload}>
                {lang ? "Publier":"Upload"} 
            </Button>
        </div>
        </div>
    )
}

export default upload