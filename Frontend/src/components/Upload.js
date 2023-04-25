import React, {useState} from 'react'
import axios from 'axios';
import { parse } from 'papaparse';
import {FaCloudUploadAlt, FaFileExcel} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Upload = ({setPrediction}) => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    if(!e.target) return;

    if(!e.target.files[0].name.endsWith(".csv")) {
      setError("Please upload a csv file");
      setFile(null);
      return;
    }
    setFile(e.target.files[0]);
    parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function(result) {
        const column = [];
        const values = [];

        result.data.map(d => {
          column.push(Object.keys(d));
          values.push(Object.values(d));
        })

        const csv = [];
        for(let i=0; i<values.length; i++) {
          const record = {};
          for(let j=0;j<values[i].length;j++) {
            record[column[0][j]] = values[i][j]
          }

          csv.push(record);
        }
        setData(csv);
      }
    })
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    setError("");
    if(data.length === 0) {
      setError("Please choose a file");
      return;
    }
    setLoading(true);

    const url = "http://127.0.0.1:9090/user/predict";
    
    try {
      const response = await axios.post(url, { data: {...data[0]} });
      setLoading(false);
      setData([]);
      setFile(null);
      console.log(response)
      setPrediction(response.data);
      navigate("/result")
    } catch(err) {
      setLoading(false);
      console.log(err.message);
    }
  }

  return (
    <div className="container">
      <form>
        <h2>Upload a csv file</h2>
        <div className="form-group">
          <input type="file" name="upload" id="upload" onChange={handleChange} hidden />
          <label htmlFor='upload'>
            <span><FaCloudUploadAlt /></span>
            <span>Browse file to upload</span>
          </label>
        </div>

        {
          file && (
            <div className="file-holder">
              <FaFileExcel />
              <span>{file.name}</span>
            </div>
          )
        }

        {
          error && (
            <div className="error-handler">
              {error}
            </div>
          )
        }

        <button className={loading ? "disable" : ""} onClick={submitHandler}>
          {
            loading ? "Recognizing..." : "Recognize"
          }
        </button>
      </form>
    </div>
  )
}

export default Upload;
