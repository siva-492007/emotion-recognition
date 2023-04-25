import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

const MyDocument = ({user}) => (
    <Document>
        <Page size="A4" style={{padding:"16pt", backgroundColor: "#f2f2f2"}}>
            <View style={{marginBottom: "30pt"}}>
                <Text style={{color: "#6990F2", textAlign: "center", fontSize: "24pt"}}>Medical Report</Text>
            </View>

            <View style={{marginBottom: "20pt"}}>
                <Text style={{fontSize: "18pt", fontWeight: "600"}}>PART A: Patient Information</Text>
            </View>
            
            <View style={{display: "flex", flexDirection: "row", marginBottom: "15pt"}}>
                <Text style={{width: "40%"}}>Full Name:</Text>
                <Text style={{width: "60%"}}>{user.title}. {user.fullName}</Text>
            </View>

            <View style={{display: "flex", flexDirection: "row", marginBottom: "15pt"}}>
                <Text style={{width: "40%"}}>Date of Birth:</Text>
                <Text style={{width: "60%"}}>{user.dob}</Text>
            </View>

            <View style={{display: "flex", flexDirection: "row", marginBottom: "15pt"}}>
                <Text style={{width: "40%"}}>Contact Number:</Text>
                <Text style={{width: "60%"}}>{user.mno}</Text>
            </View>

            <View style={{marginTop: "40pt", marginBottom: "20pt"}}>
                <Text style={{fontSize: "18pt", fontWeight: "600"}}>PART B: Medical Information</Text>
            </View>

            <View style={{display: "flex", flexDirection: "row", marginBottom: "15pt"}}>
                <Text style={{width: "40%"}}>Date of examination:</Text>
                <Text style={{width: "60%"}}>{user.date}</Text>
            </View>

            <View style={{display: "flex", flexDirection: "row", marginBottom: "15pt"}}>
                <Text style={{width: "40%"}}>Result:</Text>
                <Text style={{width: "60%"}}>{user.prediction}</Text>
            </View>

            <View style={{display: "flex", flexDirection: "row", marginBottom: "15pt"}}>
                <Text style={{width: "40%"}}>Percentage:</Text>
                <Text style={{width: "60%"}}>The modal predicted the emotion of the patient as {user.prediction} with {user.percentage}%</Text>
            </View>
            
            <Text 
                style={{position: "absolute", bottom: "30pt", left: "50%"}} 
                render={({pageNumber, totalPages}) => `${pageNumber} / ${totalPages}`}
            />
        </Page>
    </Document> 
);

export default MyDocument;