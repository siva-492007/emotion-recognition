import React, { useEffect } from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import MyDocument from './PDF';
import { useNavigate } from 'react-router-dom';

const Download = ({user, prediction, clearData}) => {
    const navigate = useNavigate();

    useEffect(() => {
        if(!prediction || !user) {
            navigate("/");
        }
    }, []);

    const today = new Date();
    const dateString = today.toLocaleDateString('en-IN');

    const myuser = {
        title: user?.title,
        fullName: user?.fullName,
        dob: user?.dob,
        mno: user?.mno,
        date: dateString,
        prediction: prediction?.prediction,
        percentage: prediction?.percentage,
    }

    const goBack = () => {
        clearData();
        navigate("/");
    }

    return (
        <div className="download-container">
            <PDFDownloadLink document={<MyDocument user={myuser} />} fileName='Report'>
                <button className='dbtn'>Download Report</button>
            </PDFDownloadLink>

            <p>Want to go back? <button className='cbtn' onClick={goBack}>Continue</button></p>
        </div>
    );
};

export default Download;