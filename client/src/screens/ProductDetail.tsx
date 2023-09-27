import React, { useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';
import '../App.css';
function ProductDetail() {

    const [image, setImage] = useState(null || '');
    const [imagePreview, setImagePreview] = useState(null || '');

    const [selectedFile, setSelectedFile] = useState('');








    // const handleImageChange = async (e: any) => {
    //     const file = e.target.files[0];
    //     setSelectedFile(e.target.files[0]);

    //     // Upload the image to Imgbb
    //     // try {
    //     //     const formData = new FormData();
    //     //     formData.append('image', file);
    //     //     const response = await axios.post(
    //     //         'https://api.imgbb.com/1/upload?key=cc92e231e9ffc49693dbfa9f4495c202',
    //     //         formData
    //     //     );

    //     //     // Get the uploaded image URL from the response
    //     //     console.log("UIOPPP", image)
    //     //     const imageUrl = response.data.data.url;
    //     //     setImage(imageUrl);
    //     // } catch (error) {
    //     //     console.error('Error uploading image:', error);
    //     // }
    // };


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        address: '',
        image: null, // To store the selected image file
    });

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({
    //         ...formData,
    //         [name]: value,
    //     });
    // };

    const handleImageChange = (e: any) => {
        // const file = e.target.files[0];
        setFormData({
            ...formData,
            // image: file,
        });
        // console.log("IMAGE HANDLER", formData, file)
    };


    const handleSubmit = async (e: any) => {
        // console.log("EEEE", e)
        // e.preventDefault();
        // setSelectedFile('e.target.files[0]');
        // try {

        //     const formDataToSend =
        //         // {
        //         //     "name": "Johhny Indian ",
        //         //     "email": "johnny@qwert123y.com",
        //         //     "phoneNumber": 4857436,
        //         //     "address": "India",
        //         //     "image": selectedFile
        //         // }
        //         new FormData();
        //     formDataToSend.append('name', 'formData.name');
        //     formDataToSend.append('email', 'formData.email');
        //     formDataToSend.append('phoneNumber', '8319041599');
        //     formDataToSend.append('address', 'formData.address');
        //     formDataToSend.append('image', 'selectedFile');

        //     console.log("API HITTER---> ", formDataToSend)

        //     // const response = await fetch('http://localhost:8000/user/', {
        //     //     method: 'POST',
        //     //     body: formDataToSend,
        //     // });

        await axios.post('http://localhost:8000/user/', {
            method: 'POST',
            body:
            //  formDataToSend
            {
                name: "Johhny Indian ",
                email: "johnny@qwert123y.com",
                phoneNumber: 4857436,
                address: "India",
                image: 'selectedFile'
            }

        })

        //     if (response.status == 200) {
        //         // Successfully uploaded data
        //         console.log('Data uploaded successfully');
        //     } else {
        //         // Handle error
        //         console.error('Failed to upload data');
        //     }
        // } catch (error) {
        //     console.error(error);
        // }
    };

    // const [image, setImage] = useState(null);
    const [allImage, setAllImage] = useState<any>(null);

    React.useEffect(() => {
        getImage();
    }, []);



    const submitImageAlpha = async (e: any) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("image", image);

        const result = await axios.post(
            "http://localhost:8000/upload-image",
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
    };

    const onInputChange = async (e: any) => {
        console.log(e.target.files[0]);
        setImage(e.target.files[0]);


        // Upload the image to Imgbb
        try {
            const formData = new FormData();
            formData.append('image', e.target.files[0]);
            const response = await axios.post(
                'https://api.imgbb.com/1/upload?key=cc92e231e9ffc49693dbfa9f4495c202',
                formData
            );

            // Get the uploaded image URL from the response
            console.log("UIOPPP", image)
            const imageUrl = response.data.data.url;
            setImagePreview(imageUrl)
        } catch (error) {
            console.error('Error uploading image:', error);
        }

    };

    const getImage = async () => {
        const result = await axios.get("http://localhost:8000/get-image");
        console.log("EV MAX", result.data);
        setAllImage(result.data.data);
    };


    console.log("IMAGE", allImage)

    return (
        <section className="vh-100" style={{ backgroundColor: '#f4f5f7', width: '100%' }}>

            <div>
                <form onSubmit={submitImageAlpha}>
                    <input type="file" accept="image/*" onChange={onInputChange}></input>
                    <button type="submit">Submit</button>
                </form>

            </div>

            <MDBRow className="justify-content-center align-items-center h-100">
                <MDBCol lg="6" className="mb-4 mb-lg-0">
                    <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                        <MDBRow className="g-0">

                            <div
                                className='circleCi'
                                id='circleCi'
                                style={{ borderRadius: 10, borderColor: 'red', borderWidth: 50 }}>
                                <MDBCardImage src={imagePreview !== null ? imagePreview : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"}
                                    alt="Avatar" className="my-5" style={{ width: '80px', height: '80px', borderRadius: '40px', borderWidth: 50, borderColor: 'red', marginTop: 50 }} />

                                <MDBTypography tag="h5">Marie Horwitz</MDBTypography>
                      
                                <MDBIcon far icon="edit mb-5" />
                            </div>


                            <MDBCol md="8">
                                <MDBCardBody className="p-4">
                                    <MDBTypography tag="h6">Information</MDBTypography>
                                    <hr className="mt-0 mb-4" />
                                    <MDBRow className="pt-1">
                                        <MDBCol size="6" className="mb-3">
                                            <MDBTypography tag="h6">Email</MDBTypography>
                                            <MDBCardText className="text-muted">info@example.com</MDBCardText>
                                        </MDBCol>
                                        <MDBCol size="6" className="mb-3">
                                            <MDBTypography tag="h6">Phone</MDBTypography>
                                            <MDBCardText className="text-muted">123 456 789</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>

                                    <MDBTypography tag="h6">Information</MDBTypography>
                                    <hr className="mt-0 mb-4" />

                                    <div className="d-flex justify-content-start">
                                        <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                                        <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                                        <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                                    </div>
                                </MDBCardBody>
                            </MDBCol>
                        </MDBRow>
                    </MDBCard>
                </MDBCol>
            </MDBRow>

        </section>
    );
}

export default ProductDetail;
