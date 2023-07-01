import React, { useEffect, useState } from 'react';
import { CTable, CButton, CCard, CCardBody, CCardHeader } from '@coreui/react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory as history } from 'react-router-dom'
import axios from 'axios'

const data = [
  {
    id: 1,
    aspek: "Memahami tools",
    justifikasi: "Sudah cukup bagus dalam mendalami tools",
    letterValue: "A",
    value: null
  }
  // Data lainnya...
];

const NilaiIndustriById = () => {
  const {id} = useParams()
  const [tableData, setTableData] = useState(data)
  const [form, setForm] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('');

  axios.defaults.withCredentials = true

  // initial
  useEffect(() => {
    getDataForm()
  }, [history])

  useEffect(() => {
    console.log("data form ==>",form)
  },[form])

  const getDataForm = async () => {
    axios.defaults.withCredentials = true
    await axios
      .get(`${process.env.REACT_APP_API_GATEWAY_URL}grade/evaluation/${id}`)
      .then(function (response) {
        setForm(response.data.data)
        setIsLoading(false)
      })
      .catch(function (error) {
        if (error.toJSON().status >= 300 && error.toJSON().status <= 399) {
          history.push({
            pathname: '/login',
            state: {
              session: true,
            },
          })
        } else if (error.toJSON().status >= 400 && error.toJSON().status <= 499) {
          history.push('/404')
        } else if (error.toJSON().status >= 500 && error.toJSON().status <= 599) {
          history.push('/500')
        }
      })
  }

  const handleInputChange = (e, record) => {
    const { value } = e.target;
    const updateData = form.map((item) => {
      if (item.id === record.id) {
        return { ...item, numericValue: value };
      }
      return item;
    });
    setForm(updateData)
  };

  const handleSubmit = () => {
    // Validasi input tidak boleh kosong
    const isInputValid = form.every((record) => record.numericValue !== null && record.numericValue !== '');

    if (isInputValid) {
      // Lakukan update data
      axios.put(`${process.env.REACT_APP_API_GATEWAY_URL}grade/evaluation/${id}`, form)
        .then((response) => {
          console.log(response.data);
          setErrorMessage('');
        })
        .catch((error) => {
          console.error(error);
          setErrorMessage('Terjadi kesalahan saat mengirim data');
        });
      // setErrorMessage('');
    } else {
      setErrorMessage('Input tidak boleh kosong');
    }
  };

  return (
    <>
    <CCard>
      <CCardHeader>
        <h4>Form Evaluasi Industri</h4>
      </CCardHeader>
      <CCardBody>
        <CTable striped bordered hover>
          <thead>
            <tr>
              <th className="text-center align-middle">No</th>
              <th className="text-center align-middle">Nama Aspek</th>
              <th style={{ width: '10%' }} className="text-center align-middle">Huruf</th>
              <th style={{ width: '10%' }} className="text-center align-middle">Angka</th>
            </tr>
          </thead>
          <tbody>
            {form.map((record,index) => (
              <React.Fragment key={record.id}>
                <tr>
                  <td className="text-center align-middle" rowSpan={2}>{index+1}</td>
                  <td>{record.aspectName}</td>
                  <td className="text-center align-middle" rowSpan={2}>
                    <b>{record.letterValue}</b>
                  </td>
                  <td rowSpan={2} >
                    <input
                      style={{textAlign: "center"}}
                      type="number"
                      className="form-control"
                      value={record.numericValue || ''}
                      onChange={(e) => handleInputChange(e, record)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Justifikasi:</b> 
                    <p>
                      {record.justification}
                    </p>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </CTable>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
          <CButton onClick={handleSubmit} color="primary">Submit</CButton>
          {errorMessage && <div className="text-danger">{errorMessage}</div>}

        </div>
      </CCardBody>
    </CCard>
    </>
  );
};

export default NilaiIndustriById;
