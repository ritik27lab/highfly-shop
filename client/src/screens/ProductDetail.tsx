import React, { useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';

function ProductDetail() {

    const [image, setImage] = useState(null || '');

    const [selectedFile, setSelectedFile] = useState('');



    // const handleSubmit = async (e: any) => {
    //     e.preventDefault();

    //     if (!selectedFile) {
    //         alert('Please select an image file.');
    //         return;
    //     }

    //     const formData = new FormData();
    //     formData.append('image', selectedFile);

    //     try {
    //         const response = await fetch('http://localhost:7000/upload', {
    //             method: 'POST',
    //             body: formData,
    //         });
    //         if (response.ok) {
    //             alert('Image uploaded successfully.');
    //         } else {
    //             alert('Failed to upload image.');
    //         }
    //     } catch (error) {
    //         console.error('Error uploading image:', error);
    //     }
    // };



    const handleImageChange = async (e: any) => {
        const file = e.target.files[0];
        setSelectedFile(e.target.files[0]);

        // Upload the image to Imgbb
        // try {
        //     const formData = new FormData();
        //     formData.append('image', file);
        //     const response = await axios.post(
        //         'https://api.imgbb.com/1/upload?key=cc92e231e9ffc49693dbfa9f4495c202',
        //         formData
        //     );

        //     // Get the uploaded image URL from the response
        //     console.log("UIOPPP", image)
        //     const imageUrl = response.data.data.url;
        //     setImage(imageUrl);
        // } catch (error) {
        //     console.error('Error uploading image:', error);
        // }
    };



    const handleFormSubmit = async (e: any) => {
        e.preventDefault();

        const formData = new FormData();
        // formData.append('name', 'Sagar'); // Updated name
        // formData.append('email', 'block@racer.com');
        // formData.append('phoneNumber', '789800441');
        // formData.append('address', 'USA');





        // Assuming you have an input element with type="file" for selecting the image
        // Get the selected image file from the input element
        // const imageInput = document.querySelector('input[type="file"]');
        // if (imageInput && imageInput.files.length > 0) {
        //   formData.append('image', imageInput.files[0]);
        // }



        // try {
        //     const userId = '650a90f9dad1d4a372abe7d3'; // Replace with the user's ID for updating
        //     const response = await axios.put(`http://localhost:8000/user/${userId}`, { userId, formData }, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data',
        //         },
        //     });
        //     console.log('User updated:>>>>>>>', response.data);
        // } catch (error) {
        //     console.error('Error updating user:', error);
        // }
    };


    const handleUpload = (e: any) => {
        console.log('Uploading', selectedFile)
        const formData = new FormData();
        // setSelectedFile(e.target.files[0]);
        formData.append('file', selectedFile)
        axios.post('http://localhost:3000/user', formData)
            .then(res => console.log("WKHRA", res))
            .catch(error => console.log(error))
    }






    return (
        <section className="vh-100" style={{ backgroundColor: '#f4f5f7', width: '100%' }}>
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol lg="6" className="mb-4 mb-lg-0">
                        <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                            <MDBRow className="g-0">
                                <MDBCol md="4" className="gradient-custom text-center text-white"
                                    style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                    <MDBCardImage src={image !== null ? image : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"}
                                        alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />

                                    <MDBTypography tag="h5">Marie Horwitz</MDBTypography>
                                    <input type="file" accept="image/*" onChange={handleImageChange} />
                                    {/* <button onClick={() => handleImageChange()}>Upload Image</button> */}
                                    <MDBCardText>Web Designer</MDBCardText>
                                    <button onClick={handleUpload}>Update the data</button>
                                    {/* <button onClick={handleSubmit}>Update the data</button> */}
                                    {/* <button onClick={handleSubmit}>Update the data to local storage</button> */}
                                    <MDBIcon far icon="edit mb-5" />
                                </MDBCol>
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
            </MDBContainer>
        </section>
    );
}

export default ProductDetail;
